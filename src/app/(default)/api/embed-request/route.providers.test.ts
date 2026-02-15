/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/embed-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function loadRoute() {
  vi.resetModules();

  vi.doMock('@/utils/csrf', () => ({
    verifyCsrf: vi.fn(() => true),
  }));
  vi.doMock('@/utils/rateLimit', () => ({
    rateLimit: vi.fn(() => ({ success: true, remaining: 4, headers: {} })),
  }));
  vi.doMock('@/utils/logger', () => ({
    createLogger: () => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    }),
  }));

  return import('./route');
}

describe('POST /api/embed-request provider integrations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('CONVERTKIT_API_KEY', '');
    vi.stubEnv('CONVERTKIT_FORM_ID', '');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'sqlite');
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('submits to ConvertKit when config is present', async () => {
    vi.stubEnv('CONVERTKIT_API_KEY', 'ck_key');
    vi.stubEnv('CONVERTKIT_FORM_ID', 'form_42');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(
      makeRequest({
        name: 'Jane',
        email: 'jane@example.com',
        website: 'https://example.com',
        calculator: 'BMI',
        calculatorSlug: 'bmi',
        notes: 'Please send embed instructions.',
      })
    );
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.convertkit.com/v3/forms/form_42/subscribe',
      expect.objectContaining({ method: 'POST' })
    );

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const payload = JSON.parse(String(requestInit?.body));
    expect(payload.fields.source).toBe('embed-request');
    expect(payload.fields.calculatorSlug).toBe('bmi');
  });

  it('returns 502 when ConvertKit rejects request', async () => {
    vi.stubEnv('CONVERTKIT_API_KEY', 'ck_key');
    vi.stubEnv('CONVERTKIT_FORM_ID', 'form_42');
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'ConvertKit failure',
    }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'jane@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(502);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Failed to submit request');
  });
});
