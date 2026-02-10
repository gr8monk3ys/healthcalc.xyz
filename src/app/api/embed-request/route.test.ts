/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/utils/csrf', () => ({
  verifyCsrf: vi.fn(() => true),
}));

vi.mock('@/utils/rateLimit', () => ({
  rateLimit: vi.fn(() => ({ success: true, remaining: 4, headers: {} })),
}));

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/embed-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/embed-request', () => {
  let POST: (req: NextRequest) => Promise<Response>;
  let verifyCsrf: ReturnType<typeof vi.fn>;
  let rateLimit: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
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

    const route = await import('./route');
    POST = route.POST;

    const csrfMod = await import('@/utils/csrf');
    verifyCsrf = csrfMod.verifyCsrf as unknown as ReturnType<typeof vi.fn>;

    const rlMod = await import('@/utils/rateLimit');
    rateLimit = rlMod.rateLimit as unknown as ReturnType<typeof vi.fn>;
  });

  it('should accept valid submission with all fields', async () => {
    const res = await POST(
      makeRequest({
        name: 'Jane Doe',
        email: 'jane@example.com',
        website: 'https://example.com',
        calculator: 'BMI',
        calculatorSlug: 'bmi',
        notes: 'I want to embed the BMI calculator.',
      })
    );
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBeDefined();
  });

  it('should accept submission with only email', async () => {
    const res = await POST(makeRequest({ email: 'jane@example.com' }));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should reject invalid email with 400', async () => {
    const res = await POST(makeRequest({ email: 'not-valid' }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBeDefined();
  });

  it('should reject missing email with 400', async () => {
    const res = await POST(makeRequest({ name: 'Jane' }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should return 403 on CSRF failure', async () => {
    verifyCsrf.mockReturnValue(false);
    const res = await POST(makeRequest({ email: 'jane@example.com' }));
    expect(res.status).toBe(403);
  });

  it('should return 429 on rate limit', async () => {
    rateLimit.mockReturnValue({
      success: false,
      remaining: 0,
      headers: { 'Retry-After': '60' },
    });
    const res = await POST(makeRequest({ email: 'jane@example.com' }));
    expect(res.status).toBe(429);
  });
});
