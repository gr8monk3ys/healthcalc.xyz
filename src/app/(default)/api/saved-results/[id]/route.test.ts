/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';

function makeRequest(method: 'DELETE'): NextRequest {
  return new NextRequest('http://localhost/api/saved-results/bmi-abc', { method });
}

async function loadRoute(options?: { postgresConfigured?: boolean; csrfOk?: boolean }) {
  const postgresConfigured = options?.postgresConfigured ?? true;
  const csrfOk = options?.csrfOk ?? true;

  vi.resetModules();

  const verifyCsrf = vi.fn(() => csrfOk);
  vi.doMock('@/utils/csrf', () => ({ verifyCsrf }));

  const deleteSavedResult = vi.fn(async () => true);
  const isSavedResultsPostgresConfigured = vi.fn(() => postgresConfigured);

  vi.doMock('@/lib/db/savedResults', () => ({
    deleteSavedResult,
    isSavedResultsPostgresConfigured,
  }));

  const route = await import('./route');

  return {
    DELETE: route.DELETE,
    mocks: {
      verifyCsrf,
      deleteSavedResult,
      isSavedResultsPostgresConfigured,
    },
  };
}

describe('DELETE /api/saved-results/[id]', () => {
  it('should return 403 on CSRF failure', async () => {
    const { DELETE } = await loadRoute({ csrfOk: false });
    const res = await DELETE(makeRequest('DELETE'), { params: Promise.resolve({ id: 'bmi-abc' }) });
    expect(res.status).toBe(403);
  });

  it('should return 503 when Postgres is not configured', async () => {
    const { DELETE } = await loadRoute({ postgresConfigured: false });
    const res = await DELETE(makeRequest('DELETE'), { params: Promise.resolve({ id: 'bmi-abc' }) });
    expect(res.status).toBe(503);
  });

  it('should return 400 when id is missing', async () => {
    const { DELETE } = await loadRoute();
    const res = await DELETE(makeRequest('DELETE'), { params: Promise.resolve({ id: '' }) });
    expect(res.status).toBe(400);
  });

  it('should delete a saved result on success', async () => {
    const { DELETE, mocks } = await loadRoute();
    mocks.deleteSavedResult.mockResolvedValueOnce(true);

    const res = await DELETE(makeRequest('DELETE'), { params: Promise.resolve({ id: 'bmi-abc' }) });
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.deleted).toBe(true);
    expect(mocks.deleteSavedResult).toHaveBeenCalledWith('anonymous', 'bmi-abc');
  });
});
