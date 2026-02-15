/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function clearProviderEnv() {
  vi.stubEnv('MAILCHIMP_API_KEY', '');
  vi.stubEnv('MAILCHIMP_AUDIENCE_ID', '');
  vi.stubEnv('CONVERTKIT_API_KEY', '');
  vi.stubEnv('CONVERTKIT_FORM_ID', '');
  vi.stubEnv('RESEND_API_KEY', '');
  vi.stubEnv('RESEND_AUDIENCE_ID', '');
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

describe('POST /api/newsletter provider integrations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearProviderEnv();
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'sqlite');
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('subscribes via Mailchimp when configured', async () => {
    vi.stubEnv('MAILCHIMP_API_KEY', 'abc123-us5');
    vi.stubEnv('MAILCHIMP_AUDIENCE_ID', 'aud_1');
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com', source: 'blog' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://us5.api.mailchimp.com/3.0/lists/aud_1/members',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('returns success for existing Mailchimp members', async () => {
    vi.stubEnv('MAILCHIMP_API_KEY', 'abc123-us5');
    vi.stubEnv('MAILCHIMP_AUDIENCE_ID', 'aud_1');
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ title: 'Member Exists' }),
    }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('already subscribed');
  });

  it('returns 500 for Mailchimp API errors', async () => {
    vi.stubEnv('MAILCHIMP_API_KEY', 'abc123-us5');
    vi.stubEnv('MAILCHIMP_AUDIENCE_ID', 'aud_1');
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ title: 'Bad Request' }),
    }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
  });

  it('subscribes via ConvertKit when configured', async () => {
    vi.stubEnv('CONVERTKIT_API_KEY', 'ck_key');
    vi.stubEnv('CONVERTKIT_FORM_ID', '12345');
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.convertkit.com/v3/forms/12345/subscribe',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('returns 500 for ConvertKit API errors', async () => {
    vi.stubEnv('CONVERTKIT_API_KEY', 'ck_key');
    vi.stubEnv('CONVERTKIT_FORM_ID', '12345');
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'ConvertKit failed',
    }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
  });

  it('subscribes via Resend when configured', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_key');
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud_99');
    global.fetch = vi.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.resend.com/audiences/aud_99/contacts',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('returns 500 for Resend API errors', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_key');
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud_99');
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Resend failed',
    }) as unknown as typeof fetch;

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
  });

  it('returns 503 in production when no provider is configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');

    const { POST } = await loadRoute();
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    const data = await res.json();

    expect(res.status).toBe(503);
    expect(data.success).toBe(false);
    expect(data.error).toContain('temporarily unavailable');
  });
});
