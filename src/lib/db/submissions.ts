import fs from 'node:fs';
import path from 'node:path';
import { Pool } from 'pg';
import { createLogger } from '@/utils/logger';

type DatabaseSync = import('node:sqlite').DatabaseSync;

type SubmissionProvider = 'mailchimp' | 'convertkit' | 'resend' | 'none';
type SubmissionOperation = 'newsletter' | 'contact' | 'embed-request' | 'counts';
export type SubmissionStorageDriver = 'sqlite' | 'postgres';

interface BaseSubmissionInput {
  provider: SubmissionProvider;
  status: string;
  error?: string;
}

export interface NewsletterSubmissionInput extends BaseSubmissionInput {
  email: string;
  source?: string;
}

export interface ContactSubmissionInput extends BaseSubmissionInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmbedRequestSubmissionInput extends BaseSubmissionInput {
  name: string;
  email: string;
  website: string;
  calculator: string;
  calculatorSlug: string;
  notes: string;
}

export interface SubmissionCounts {
  newsletter: number;
  contact: number;
  embedRequests: number;
}

export interface SubmissionWriteResult {
  success: boolean;
  driver: SubmissionStorageDriver;
  error?: string;
}

const logger = createLogger({ component: 'SubmissionStore' });
const LOCAL_SQLITE_DB_PATH = path.join(process.cwd(), '.data', 'healthcheck.sqlite');
const SERVERLESS_SQLITE_DB_PATH = path.join('/tmp', 'healthcheck.sqlite');
const DEFAULT_RETENTION_DAYS = 365;
const DEFAULT_RETENTION_SWEEP_MS = 15 * 60 * 1000;
const ZERO_COUNTS: SubmissionCounts = {
  newsletter: 0,
  contact: 0,
  embedRequests: 0,
};

const SQLITE_SCHEMA_SQL = `
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;
  CREATE TABLE IF NOT EXISTS newsletter_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    source TEXT DEFAULT '',
    provider TEXT NOT NULL,
    status TEXT NOT NULL,
    error TEXT DEFAULT '',
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_newsletter_created_at
    ON newsletter_submissions(created_at DESC);
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    provider TEXT NOT NULL,
    status TEXT NOT NULL,
    error TEXT DEFAULT '',
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_contact_created_at
    ON contact_submissions(created_at DESC);
  CREATE TABLE IF NOT EXISTS embed_request_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT DEFAULT '',
    calculator TEXT DEFAULT '',
    calculator_slug TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    provider TEXT NOT NULL,
    status TEXT NOT NULL,
    error TEXT DEFAULT '',
    created_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_embed_created_at
    ON embed_request_submissions(created_at DESC);
`;

const POSTGRES_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS newsletter_submissions (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT '',
    provider TEXT NOT NULL,
    status TEXT NOT NULL,
    error TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS idx_newsletter_created_at
    ON newsletter_submissions(created_at DESC);
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    provider TEXT NOT NULL,
    status TEXT NOT NULL,
    error TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS idx_contact_created_at
    ON contact_submissions(created_at DESC);
  CREATE TABLE IF NOT EXISTS embed_request_submissions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT NOT NULL DEFAULT '',
    calculator TEXT NOT NULL DEFAULT '',
    calculator_slug TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    provider TEXT NOT NULL,
    status TEXT NOT NULL,
    error TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS idx_embed_created_at
    ON embed_request_submissions(created_at DESC);
`;

let sqliteDb: DatabaseSync | null = null;
let postgresPool: Pool | null = null;
let postgresInitPromise: Promise<void> | null = null;
let sentryModulePromise: Promise<typeof import('@sentry/nextjs') | null> | null = null;
const lastRetentionSweep: Partial<Record<SubmissionStorageDriver, number>> = {};

function isTrue(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

export function isSubmissionPersistenceStrictModeEnabled(): boolean {
  return isTrue(process.env.SUBMISSIONS_PERSISTENCE_STRICT);
}

function getSubmissionStorageDriver(): SubmissionStorageDriver {
  const configured = process.env.SUBMISSIONS_DB_DRIVER?.trim().toLowerCase();
  if (configured === 'postgres' || configured === 'sqlite') {
    return configured;
  }

  if (configured) {
    logger.warn('Invalid submissions DB driver configured. Falling back to auto-detect.', {
      configured,
      supportedDrivers: ['sqlite', 'postgres'],
    });
  }

  return getPostgresConnectionString(false) ? 'postgres' : 'sqlite';
}

function getSqliteDbPath(): string {
  const configuredPath = process.env.SQLITE_DB_PATH?.trim();
  if (configuredPath) return configuredPath;

  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT) {
    return SERVERLESS_SQLITE_DB_PATH;
  }

  return LOCAL_SQLITE_DB_PATH;
}

function getPostgresConnectionString(required: boolean): string | null {
  const connection =
    process.env.SUBMISSIONS_POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim();
  if (connection) return connection;
  if (required) {
    throw new Error(
      'Missing Postgres connection string. Set SUBMISSIONS_POSTGRES_URL or DATABASE_URL.'
    );
  }
  return null;
}

function getPostgresMaxConnections(): number {
  const configured = Number.parseInt(process.env.SUBMISSIONS_POSTGRES_MAX_CONNECTIONS ?? '', 10);
  if (!Number.isFinite(configured) || configured <= 0) return 10;
  return configured;
}

function getRetentionDays(): number {
  const configured = Number.parseInt(process.env.SUBMISSIONS_RETENTION_DAYS ?? '', 10);
  if (!Number.isFinite(configured)) return DEFAULT_RETENTION_DAYS;
  if (configured <= 0) return 0;
  return configured;
}

function getRetentionSweepMs(): number {
  const configured = Number.parseInt(process.env.SUBMISSIONS_RETENTION_SWEEP_MS ?? '', 10);
  if (!Number.isFinite(configured) || configured <= 0) return DEFAULT_RETENTION_SWEEP_MS;
  return configured;
}

function normalizeOptional(value: string | undefined): string {
  return value?.trim() ?? '';
}

function nowIso(): string {
  return new Date().toISOString();
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function errorCode(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null;
  if (!('code' in error)) return null;
  return String((error as { code?: unknown }).code ?? '');
}

function ensureSqliteDatabase(): DatabaseSync {
  if (sqliteDb) return sqliteDb;

  // Lazy-load node:sqlite so that Bun (which lacks this built-in) doesn't
  // fail at module-import time when the postgres driver is selected.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync: Ctor } = require('node:sqlite') as typeof import('node:sqlite');

  const sqlitePath = getSqliteDbPath();
  fs.mkdirSync(path.dirname(sqlitePath), { recursive: true });
  sqliteDb = new Ctor(sqlitePath);
  sqliteDb.exec(SQLITE_SCHEMA_SQL);
  return sqliteDb;
}

function createPostgresPool(): Pool {
  return new Pool({
    connectionString: getPostgresConnectionString(true) ?? undefined,
    max: getPostgresMaxConnections(),
    ssl: process.env.PGSSLMODE === 'disable' ? false : undefined,
  });
}

async function ensurePostgresDatabase(): Promise<Pool> {
  if (!postgresPool) {
    postgresPool = createPostgresPool();
  }

  if (!postgresInitPromise) {
    postgresInitPromise = postgresPool.query(POSTGRES_SCHEMA_SQL).then(() => undefined);
  }

  await postgresInitPromise;
  return postgresPool;
}

async function getSentryModule(): Promise<typeof import('@sentry/nextjs') | null> {
  if (!sentryModulePromise) {
    sentryModulePromise = import('@sentry/nextjs').catch(() => null);
  }
  return sentryModulePromise;
}

async function reportPersistenceFailure(
  operation: SubmissionOperation,
  driver: SubmissionStorageDriver,
  error: unknown
): Promise<void> {
  const message = errorMessage(error);
  const code = errorCode(error);

  logger.error('Submission persistence failed', {
    operation,
    driver,
    error: message,
    ...(code ? { code } : {}),
  });

  const sentry = await getSentryModule();
  if (!sentry) return;

  sentry.withScope(scope => {
    scope.setLevel('error');
    scope.setTag('submissions.operation', operation);
    scope.setTag('submissions.driver', driver);
    if (code) {
      scope.setExtra('errorCode', code);
    }
    scope.setExtra('errorMessage', message);
    sentry.captureException(error instanceof Error ? error : new Error(message));
  });
}

function shouldRunRetentionSweep(driver: SubmissionStorageDriver): boolean {
  const retentionDays = getRetentionDays();
  if (retentionDays <= 0) return false;

  const now = Date.now();
  const last = lastRetentionSweep[driver] ?? 0;
  const interval = getRetentionSweepMs();
  if (now - last < interval) return false;

  lastRetentionSweep[driver] = now;
  return true;
}

function runSqliteRetentionSweep(database: DatabaseSync): void {
  const retentionDays = getRetentionDays();
  if (retentionDays <= 0 || !shouldRunRetentionSweep('sqlite')) return;

  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();
  database.prepare('DELETE FROM newsletter_submissions WHERE created_at < ?').run(cutoff);
  database.prepare('DELETE FROM contact_submissions WHERE created_at < ?').run(cutoff);
  database.prepare('DELETE FROM embed_request_submissions WHERE created_at < ?').run(cutoff);
}

async function runPostgresRetentionSweep(pool: Pool): Promise<void> {
  const retentionDays = getRetentionDays();
  if (retentionDays <= 0 || !shouldRunRetentionSweep('postgres')) return;

  await pool.query(
    "DELETE FROM newsletter_submissions WHERE created_at < NOW() - ($1::int * INTERVAL '1 day')",
    [retentionDays]
  );
  await pool.query(
    "DELETE FROM contact_submissions WHERE created_at < NOW() - ($1::int * INTERVAL '1 day')",
    [retentionDays]
  );
  await pool.query(
    "DELETE FROM embed_request_submissions WHERE created_at < NOW() - ($1::int * INTERVAL '1 day')",
    [retentionDays]
  );
}

async function executeWrite(
  operation: SubmissionOperation,
  sqliteWriter: (database: DatabaseSync) => void,
  postgresWriter: (pool: Pool) => Promise<void>
): Promise<SubmissionWriteResult> {
  const driver = getSubmissionStorageDriver();

  try {
    if (driver === 'postgres') {
      const pool = await ensurePostgresDatabase();
      await postgresWriter(pool);
      await runPostgresRetentionSweep(pool);
    } else {
      const database = ensureSqliteDatabase();
      sqliteWriter(database);
      runSqliteRetentionSweep(database);
    }

    return { success: true, driver };
  } catch (error) {
    await reportPersistenceFailure(operation, driver, error);
    return {
      success: false,
      driver,
      error: errorMessage(error),
    };
  }
}

export async function saveNewsletterSubmission(
  input: NewsletterSubmissionInput
): Promise<SubmissionWriteResult> {
  const email = input.email.trim().toLowerCase();
  const source = normalizeOptional(input.source);
  const provider = input.provider;
  const status = input.status;
  const error = normalizeOptional(input.error);
  const createdAt = nowIso();

  return executeWrite(
    'newsletter',
    database => {
      const statement = database.prepare(`
        INSERT INTO newsletter_submissions (
          email,
          source,
          provider,
          status,
          error,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?)
      `);
      statement.run(email, source, provider, status, error, createdAt);
    },
    async pool => {
      await pool.query(
        `
          INSERT INTO newsletter_submissions (
            email,
            source,
            provider,
            status,
            error,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [email, source, provider, status, error, createdAt]
      );
    }
  );
}

export async function saveContactSubmission(
  input: ContactSubmissionInput
): Promise<SubmissionWriteResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const subject = input.subject.trim();
  const message = input.message.trim();
  const provider = input.provider;
  const status = input.status;
  const error = normalizeOptional(input.error);
  const createdAt = nowIso();

  return executeWrite(
    'contact',
    database => {
      const statement = database.prepare(`
        INSERT INTO contact_submissions (
          name,
          email,
          subject,
          message,
          provider,
          status,
          error,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      statement.run(name, email, subject, message, provider, status, error, createdAt);
    },
    async pool => {
      await pool.query(
        `
          INSERT INTO contact_submissions (
            name,
            email,
            subject,
            message,
            provider,
            status,
            error,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [name, email, subject, message, provider, status, error, createdAt]
      );
    }
  );
}

export async function saveEmbedRequestSubmission(
  input: EmbedRequestSubmissionInput
): Promise<SubmissionWriteResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const website = input.website.trim();
  const calculator = input.calculator.trim();
  const calculatorSlug = input.calculatorSlug.trim();
  const notes = input.notes.trim();
  const provider = input.provider;
  const status = input.status;
  const error = normalizeOptional(input.error);
  const createdAt = nowIso();

  return executeWrite(
    'embed-request',
    database => {
      const statement = database.prepare(`
        INSERT INTO embed_request_submissions (
          name,
          email,
          website,
          calculator,
          calculator_slug,
          notes,
          provider,
          status,
          error,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      statement.run(
        name,
        email,
        website,
        calculator,
        calculatorSlug,
        notes,
        provider,
        status,
        error,
        createdAt
      );
    },
    async pool => {
      await pool.query(
        `
          INSERT INTO embed_request_submissions (
            name,
            email,
            website,
            calculator,
            calculator_slug,
            notes,
            provider,
            status,
            error,
            created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
        [
          name,
          email,
          website,
          calculator,
          calculatorSlug,
          notes,
          provider,
          status,
          error,
          createdAt,
        ]
      );
    }
  );
}

export async function getSubmissionCounts(): Promise<SubmissionCounts> {
  const driver = getSubmissionStorageDriver();

  try {
    if (driver === 'postgres') {
      const pool = await ensurePostgresDatabase();
      const [newsletter, contact, embedRequests] = await Promise.all([
        pool.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM newsletter_submissions'),
        pool.query<{ count: string }>('SELECT COUNT(*)::text AS count FROM contact_submissions'),
        pool.query<{ count: string }>(
          'SELECT COUNT(*)::text AS count FROM embed_request_submissions'
        ),
      ]);

      return {
        newsletter: Number.parseInt(newsletter.rows[0]?.count ?? '0', 10),
        contact: Number.parseInt(contact.rows[0]?.count ?? '0', 10),
        embedRequests: Number.parseInt(embedRequests.rows[0]?.count ?? '0', 10),
      };
    }

    const database = ensureSqliteDatabase();
    const newsletter = database
      .prepare('SELECT COUNT(*) AS count FROM newsletter_submissions')
      .get() as { count: number };
    const contact = database.prepare('SELECT COUNT(*) AS count FROM contact_submissions').get() as {
      count: number;
    };
    const embedRequests = database
      .prepare('SELECT COUNT(*) AS count FROM embed_request_submissions')
      .get() as { count: number };

    return {
      newsletter: newsletter.count,
      contact: contact.count,
      embedRequests: embedRequests.count,
    };
  } catch (error) {
    await reportPersistenceFailure('counts', driver, error);
    return ZERO_COUNTS;
  }
}

export async function resetSubmissionStoreForTests(): Promise<void> {
  if (sqliteDb) {
    sqliteDb.close();
    sqliteDb = null;
  }

  if (postgresPool) {
    await postgresPool.end();
    postgresPool = null;
  }

  postgresInitPromise = null;
  delete lastRetentionSweep.sqlite;
  delete lastRetentionSweep.postgres;
}
