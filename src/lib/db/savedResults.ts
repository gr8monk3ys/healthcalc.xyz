import { Pool } from 'pg';
import { createLogger } from '@/utils/logger';
import { computeSavedResultKey } from '@/utils/savedResultsKey';

const logger = createLogger({ component: 'SavedResultsStore' });

interface SavedResultRow {
  resultKey: string;
  calculatorType: string;
  calculatorName: string;
  createdAt: string;
  data: Record<string, unknown>;
}

interface SaveSavedResultInput {
  calculatorType: string;
  calculatorName: string;
  data: Record<string, unknown>;
}

const POSTGRES_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS user_saved_results (
    user_id TEXT NOT NULL,
    result_key TEXT NOT NULL,
    calculator_type TEXT NOT NULL,
    calculator_name TEXT NOT NULL,
    data_json JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, result_key)
  );
  CREATE INDEX IF NOT EXISTS idx_user_saved_results_user_created
    ON user_saved_results(user_id, created_at DESC);
`;

let pool: Pool | null = null;
let initPromise: Promise<void> | null = null;

function has(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function getPostgresConnectionString(required: boolean): string | null {
  const connection =
    process.env.SAVED_RESULTS_POSTGRES_URL?.trim() ||
    process.env.SUBMISSIONS_POSTGRES_URL?.trim() ||
    process.env.DATABASE_URL?.trim();
  if (connection) return connection;
  if (required) {
    throw new Error(
      'Missing Postgres connection string. Set SAVED_RESULTS_POSTGRES_URL, SUBMISSIONS_POSTGRES_URL, or DATABASE_URL.'
    );
  }
  return null;
}

function getPostgresMaxConnections(): number {
  const configured = Number.parseInt(process.env.SAVED_RESULTS_POSTGRES_MAX_CONNECTIONS ?? '', 10);
  if (!Number.isFinite(configured) || configured <= 0) return 10;
  return configured;
}

function createPostgresPool(): Pool {
  const connectionString = getPostgresConnectionString(true) ?? undefined;
  return new Pool({
    connectionString,
    max: getPostgresMaxConnections(),
    ssl: process.env.PGSSLMODE === 'disable' ? false : undefined,
  });
}

async function getPool(): Promise<Pool> {
  if (!pool) {
    pool = createPostgresPool();
    initPromise = pool
      .query(POSTGRES_SCHEMA_SQL)
      .then(() => undefined)
      .catch(error => {
        initPromise = null;
        logger.error('Failed to initialize saved results schema', { error: String(error) });
        throw error;
      });
  }

  if (initPromise) {
    await initPromise;
  }

  return pool;
}

export function isSavedResultsPostgresConfigured(): boolean {
  return (
    has(process.env.SAVED_RESULTS_POSTGRES_URL) ||
    has(process.env.SUBMISSIONS_POSTGRES_URL) ||
    has(process.env.DATABASE_URL)
  );
}

export async function listSavedResults(
  userId: string,
  limit: number = 30
): Promise<SavedResultRow[]> {
  const db = await getPool();
  const result = await db.query(
    `
      SELECT result_key, calculator_type, calculator_name, data_json, created_at
      FROM user_saved_results
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `,
    [userId, limit]
  );

  return result.rows.map(row => ({
    resultKey: String(row.result_key),
    calculatorType: String(row.calculator_type),
    calculatorName: String(row.calculator_name),
    createdAt: new Date(row.created_at).toISOString(),
    data: (row.data_json ?? {}) as Record<string, unknown>,
  }));
}

export async function upsertSavedResult(
  userId: string,
  input: SaveSavedResultInput
): Promise<SavedResultRow> {
  const db = await getPool();
  const resultKey = computeSavedResultKey(input.calculatorType, input.data);

  const res = await db.query(
    `
      INSERT INTO user_saved_results (user_id, result_key, calculator_type, calculator_name, data_json)
      VALUES ($1, $2, $3, $4, $5::jsonb)
      ON CONFLICT (user_id, result_key)
      DO UPDATE SET
        calculator_name = EXCLUDED.calculator_name,
        data_json = EXCLUDED.data_json
      RETURNING created_at
    `,
    [userId, resultKey, input.calculatorType, input.calculatorName, JSON.stringify(input.data)]
  );

  const createdAt = res.rows[0]?.created_at
    ? new Date(res.rows[0].created_at).toISOString()
    : new Date().toISOString();

  return {
    resultKey,
    calculatorType: input.calculatorType,
    calculatorName: input.calculatorName,
    createdAt,
    data: input.data,
  };
}

export async function deleteSavedResult(userId: string, resultKey: string): Promise<boolean> {
  const db = await getPool();
  const res = await db.query(
    `
      DELETE FROM user_saved_results
      WHERE user_id = $1 AND result_key = $2
    `,
    [userId, resultKey]
  );
  return (res.rowCount ?? 0) > 0;
}

export async function clearSavedResults(userId: string): Promise<number> {
  const db = await getPool();
  const res = await db.query(
    `
      DELETE FROM user_saved_results
      WHERE user_id = $1
    `,
    [userId]
  );
  return res.rowCount ?? 0;
}

async function _resetSavedResultsStoreForTests(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
  initPromise = null;
}
