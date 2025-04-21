/**
 * @vitest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type MockedSubmissionsModule = typeof import('./submissions');

interface LoadResult {
  submissions: MockedSubmissionsModule;
  poolCtor: ReturnType<typeof vi.fn>;
  poolInstance: {
    query: ReturnType<typeof vi.fn>;
    end: ReturnType<typeof vi.fn>;
  };
  sentry: {
    withScope: ReturnType<typeof vi.fn>;
    captureException: ReturnType<typeof vi.fn>;
  };
}

function createPoolMocks() {
  const query = vi.fn(async (sql: string) => {
    if (sql.includes('SELECT COUNT(*)::text AS count FROM newsletter_submissions')) {
      return { rows: [{ count: '2' }] };
    }
    if (sql.includes('SELECT COUNT(*)::text AS count FROM contact_submissions')) {
      return { rows: [{ count: '3' }] };
    }
    if (sql.includes('SELECT COUNT(*)::text AS count FROM embed_request_submissions')) {
      return { rows: [{ count: '5' }] };
    }
    return { rows: [] };
  });

  const end = vi.fn(async () => undefined);
  const poolInstance = { query, end };
  const poolCtor = vi.fn(function MockPool() {
    return poolInstance;
  });

  return { poolCtor, poolInstance };
}

async function loadPostgresModule(env: {
  driver?: string;
  databaseUrl?: string;
  retentionDays?: string;
  retentionSweepMs?: string;
  strict?: string;
}): Promise<LoadResult> {
  vi.resetModules();

  if (env.driver !== undefined) vi.stubEnv('SUBMISSIONS_DB_DRIVER', env.driver);
  if (env.databaseUrl !== undefined) vi.stubEnv('DATABASE_URL', env.databaseUrl);
  if (env.retentionDays !== undefined) vi.stubEnv('SUBMISSIONS_RETENTION_DAYS', env.retentionDays);
  if (env.retentionSweepMs !== undefined) {
    vi.stubEnv('SUBMISSIONS_RETENTION_SWEEP_MS', env.retentionSweepMs);
  }
  if (env.strict !== undefined) vi.stubEnv('SUBMISSIONS_PERSISTENCE_STRICT', env.strict);

  const { poolCtor, poolInstance } = createPoolMocks();
  const sentry = {
    withScope: vi.fn((callback: (scope: Record<string, ReturnType<typeof vi.fn>>) => void) => {
      callback({
        setLevel: vi.fn(),
        setTag: vi.fn(),
        setExtra: vi.fn(),
      });
    }),
    captureException: vi.fn(),
  };

  vi.doMock('pg', () => ({ Pool: poolCtor }));
  vi.doMock('@sentry/nextjs', () => sentry);
  vi.doMock('@/utils/logger', () => ({
    createLogger: () => ({
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      logError: vi.fn(),
    }),
  }));

  const submissions = await import('./submissions');
  return { submissions, poolCtor, poolInstance, sentry };
}

describe('Submission store (Postgres)', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(async () => {
    try {
      const submissions = await import('./submissions');
      await submissions.resetSubmissionStoreForTests();
    } catch {
      // Ignore module-load errors in teardown.
    }
    vi.unstubAllEnvs();
  });

  it('writes newsletter records through Postgres when auto-detected', async () => {
    const { submissions, poolCtor, poolInstance } = await loadPostgresModule({
      driver: 'invalid-driver',
      databaseUrl: 'postgres://user:pass@localhost:5432/healthcheck',
      retentionDays: '0',
    });

    const result = await submissions.saveNewsletterSubmission({
      email: 'test@example.com',
      source: 'blog',
      provider: 'mailchimp',
      status: 'subscribed',
    });

    expect(result).toMatchObject({ success: true, driver: 'postgres' });
    expect(poolCtor).toHaveBeenCalledTimes(1);
    expect(poolInstance.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO newsletter_submissions'),
      expect.any(Array)
    );
  });

  it('reads aggregate counts from Postgres', async () => {
    const { submissions, poolInstance } = await loadPostgresModule({
      driver: 'postgres',
      databaseUrl: 'postgres://user:pass@localhost:5432/healthcheck',
      retentionDays: '0',
    });

    const counts = await submissions.getSubmissionCounts();

    expect(counts).toEqual({
      newsletter: 2,
      contact: 3,
      embedRequests: 5,
    });
    expect(poolInstance.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT COUNT(*)::text AS count FROM newsletter_submissions')
    );
  });

  it('applies retention cleanup queries in Postgres when enabled', async () => {
    const { submissions, poolInstance } = await loadPostgresModule({
      driver: 'postgres',
      databaseUrl: 'postgres://user:pass@localhost:5432/healthcheck',
      retentionDays: '7',
      retentionSweepMs: '0',
    });

    await submissions.saveContactSubmission({
      name: 'Jane',
      email: 'jane@example.com',
      subject: 'feedback',
      message: 'This is a retention sweep test message.',
      provider: 'resend',
      status: 'sent',
    });

    expect(poolInstance.query).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM newsletter_submissions'),
      [7]
    );
    expect(poolInstance.query).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM contact_submissions'),
      [7]
    );
    expect(poolInstance.query).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM embed_request_submissions'),
      [7]
    );
  });

  it('captures persistence failures with Sentry metadata', async () => {
    const { submissions, poolInstance, sentry } = await loadPostgresModule({
      driver: 'postgres',
      databaseUrl: 'postgres://user:pass@localhost:5432/healthcheck',
      retentionDays: '0',
    });

    poolInstance.query.mockRejectedValueOnce(new Error('database unavailable'));

    const result = await submissions.saveNewsletterSubmission({
      email: 'test@example.com',
      provider: 'none',
      status: 'queued',
    });

    expect(result.success).toBe(false);
    expect(result.driver).toBe('postgres');
    expect(result.error).toContain('database unavailable');
    expect(sentry.withScope).toHaveBeenCalled();
    expect(sentry.captureException).toHaveBeenCalled();
  });

  it('reports strict-mode state from environment values', async () => {
    const { submissions } = await loadPostgresModule({
      driver: 'postgres',
      databaseUrl: 'postgres://user:pass@localhost:5432/healthcheck',
      strict: 'true',
      retentionDays: '0',
    });

    expect(submissions.isSubmissionPersistenceStrictModeEnabled()).toBe(true);

    vi.stubEnv('SUBMISSIONS_PERSISTENCE_STRICT', 'false');
    expect(submissions.isSubmissionPersistenceStrictModeEnabled()).toBe(false);
  });

  it('closes the Postgres pool during test reset', async () => {
    const { submissions, poolInstance } = await loadPostgresModule({
      driver: 'postgres',
      databaseUrl: 'postgres://user:pass@localhost:5432/healthcheck',
      retentionDays: '0',
    });

    await submissions.saveEmbedRequestSubmission({
      name: 'Jane',
      email: 'jane@example.com',
      website: 'https://example.com',
      calculator: 'BMI',
      calculatorSlug: 'bmi',
      notes: 'Please follow up.',
      provider: 'convertkit',
      status: 'submitted',
    });

    await submissions.resetSubmissionStoreForTests();
    expect(poolInstance.end).toHaveBeenCalledTimes(1);
  });
});
