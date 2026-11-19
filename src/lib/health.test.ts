import { afterEach, describe, expect, it, vi } from 'vitest';
import { createHealthCalcs } from './health';

describe('createHealthCalcs', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("accepts the Postgres URL name that Vercel's integrations provision", () => {
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'postgres');
    vi.stubEnv('DATABASE_URL', '');
    vi.stubEnv('SUBMISSIONS_POSTGRES_URL', '');
    vi.stubEnv('POSTGRES_URL', 'postgres://user:pass@host/db');

    expect(createHealthCalcs().persistenceDatabaseConfigured).toBe(true);
  });

  it('reports no database when no connection string is set', () => {
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'postgres');
    vi.stubEnv('DATABASE_URL', '');
    vi.stubEnv('SUBMISSIONS_POSTGRES_URL', '');
    vi.stubEnv('POSTGRES_URL', '');

    expect(createHealthCalcs().persistenceDatabaseConfigured).toBe(false);
  });
});
