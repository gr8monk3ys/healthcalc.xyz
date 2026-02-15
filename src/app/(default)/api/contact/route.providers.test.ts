/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'bug',
  message: 'This is a valid test message that has enough characters.',
};

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
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
    rateLimit: vi.fn(() => ({ success: true, remaining: 9, headers: {} })),
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

describe('POST /api/contact provider integrations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('CONTACT_EMAIL', '');
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'sqlite');
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('sends contact emails via Resend and escapes user content', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_key');
    vi.stubEnv('CONTACT_EMAIL', 'support@healthcalc.xyz');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(
      makeRequest({
        ...validBody,
        name: `Jane <script>alert('x')</script>`,
        message: 'Line one\n<script>alert(1)</script>',
      })
    );
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({ method: 'POST' })
    );

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const payload = JSON.parse(String(requestInit?.body));

    expect(payload.to).toBe('support@healthcalc.xyz');
    expect(payload.from).toBe('HealthCheck Contact <noreply@healthcalc.xyz>');
    expect(payload.subject).toContain('Bug Report');
    expect(payload.subject).toContain(`Jane <script>alert('x')</script>`);
    expect(payload.html).toContain('&lt;script&gt;alert(&#039;x&#039;)&lt;/script&gt;');
    expect(payload.html).toContain('Line one<br />&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('uses RESEND_FROM_EMAIL when configured', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_key');
    vi.stubEnv('RESEND_FROM_EMAIL', 'HealthCalc <hello@healthcalc.xyz>');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest(validBody));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    const requestInit = fetchMock.mock.calls[0]?.[1];
    const payload = JSON.parse(String(requestInit?.body));
    expect(payload.from).toBe('HealthCalc <hello@healthcalc.xyz>');
  });

  it('returns 500 when Resend fails', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_key');
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Resend rejected request',
    }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest(validBody));
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Failed to send message');
  });

  it('returns 503 in production when no provider is configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const { POST } = await loadRoute();
    const res = await POST(makeRequest(validBody));
    const data = await res.json();

    expect(res.status).toBe(503);
    expect(data.success).toBe(false);
    expect(data.error).toContain('temporarily unavailable');
  });

  it('returns 500 when request JSON parsing throws', async () => {
    const malformed = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{',
    });

    const { POST } = await loadRoute();
    const res = await POST(malformed);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toContain('An error occurred');
  });
});
