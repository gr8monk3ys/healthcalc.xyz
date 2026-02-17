/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';

function makeRequest(method: 'GET' | 'POST' | 'DELETE', body?: unknown): NextRequest {
  type NextRequestInit = NonNullable<ConstructorParameters<typeof NextRequest>[1]>;
  const init: NextRequestInit = { method };
  if (body !== undefined) {
    init.headers = { 'Content-Type': 'application/json' };
    init.body = JSON.stringify(body);
  }
  return new NextRequest('http://localhost/api/saved-results', init);
}

type SavedResultRowMock = {
  resultKey: string;
  calculatorType: string;
  calculatorName: string;
  createdAt: string;
  data: Record<string, unknown>;
};

async function loadRoute(options?: { postgresConfigured?: boolean; csrfOk?: boolean }) {
  const postgresConfigured = options?.postgresConfigured ?? true;
  const csrfOk = options?.csrfOk ?? true;

  vi.resetModules();

  const verifyCsrf = vi.fn(() => csrfOk);
  vi.doMock('@/utils/csrf', () => ({ verifyCsrf }));

  const listSavedResults = vi.fn(async () => [] as SavedResultRowMock[]);
  const upsertSavedResult = vi.fn(
    async () =>
      ({
        resultKey: 'bmi-abc',
        calculatorType: 'bmi',
        calculatorName: 'BMI',
        createdAt: '2026-02-15T00:00:00.000Z',
        data: { bmi: 25 },
      }) as SavedResultRowMock
  );
  const clearSavedResults = vi.fn(async () => 0);
  const isSavedResultsPostgresConfigured = vi.fn(() => postgresConfigured);

  vi.doMock('@/lib/db/savedResults', () => ({
    listSavedResults,
    upsertSavedResult,
    clearSavedResults,
    isSavedResultsPostgresConfigured,
  }));

  const route = await import('./route');

  return {
    GET: route.GET,
    POST: route.POST,
    DELETE: route.DELETE,
    mocks: {
      verifyCsrf,
      listSavedResults,
      upsertSavedResult,
      clearSavedResults,
      isSavedResultsPostgresConfigured,
    },
  };
}

describe('GET /api/saved-results', () => {
  it('should return 503 when Postgres is not configured', async () => {
    const { GET } = await loadRoute({ postgresConfigured: false });
    const res = await GET();
    expect(res.status).toBe(503);
  });

  it('should return saved results on success', async () => {
    const { GET, mocks } = await loadRoute();
    mocks.listSavedResults.mockResolvedValueOnce([
      {
        resultKey: 'bmi-abc',
        calculatorType: 'bmi',
        calculatorName: 'BMI',
        createdAt: '2026-02-15T00:00:00.000Z',
        data: { bmi: 25 },
      },
    ]);

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.results).toHaveLength(1);
    expect(json.results[0]).toMatchObject({
      id: 'bmi-abc',
      calculatorType: 'bmi',
      calculatorName: 'BMI',
    });
  });
});

describe('POST /api/saved-results', () => {
  it('should return 403 on CSRF failure', async () => {
    const { POST } = await loadRoute({ csrfOk: false });
    const res = await POST(
      makeRequest('POST', {
        calculatorType: 'bmi',
        calculatorName: 'BMI',
        data: { bmi: 25 },
      })
    );
    expect(res.status).toBe(403);
  });

  it('should return 503 when Postgres is not configured', async () => {
    const { POST } = await loadRoute({ postgresConfigured: false });
    const res = await POST(
      makeRequest('POST', {
        calculatorType: 'bmi',
        calculatorName: 'BMI',
        data: { bmi: 25 },
      })
    );
    expect(res.status).toBe(503);
  });

  it('should return 400 for invalid input', async () => {
    const { POST } = await loadRoute();
    const res = await POST(
      makeRequest('POST', { calculatorType: '', calculatorName: '', data: {} })
    );
    expect(res.status).toBe(400);
  });

  it('should upsert a saved result on success', async () => {
    const { POST, mocks } = await loadRoute();
    const res = await POST(
      makeRequest('POST', {
        calculatorType: 'bmi',
        calculatorName: 'BMI',
        data: { bmi: 25 },
      })
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.result).toMatchObject({
      id: 'bmi-abc',
      calculatorType: 'bmi',
      calculatorName: 'BMI',
    });
    expect(mocks.upsertSavedResult).toHaveBeenCalledTimes(1);
  });
});

describe('DELETE /api/saved-results', () => {
  it('should return 403 on CSRF failure', async () => {
    const { DELETE } = await loadRoute({ csrfOk: false });
    const res = await DELETE(makeRequest('DELETE'));
    expect(res.status).toBe(403);
  });

  it('should clear saved results on success', async () => {
    const { DELETE, mocks } = await loadRoute();
    mocks.clearSavedResults.mockResolvedValueOnce(3);

    const res = await DELETE(makeRequest('DELETE'));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.deleted).toBe(3);
  });
});
