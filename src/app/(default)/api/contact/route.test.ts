/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/utils/csrf', () => ({
  verifyCsrf: vi.fn(() => true),
}));

vi.mock('@/utils/rateLimit', () => ({
  rateLimit: vi.fn(() => ({ success: true, remaining: 9, headers: {} })),
}));

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

const validBody = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'question',
  message: 'This is a valid test message with enough characters.',
};

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  let POST: (req: NextRequest) => Promise<Response>;
  let verifyCsrf: ReturnType<typeof vi.fn>;
  let rateLimit: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
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

    const route = await import('./route');
    POST = route.POST;

    const csrfMod = await import('@/utils/csrf');
    verifyCsrf = csrfMod.verifyCsrf as unknown as ReturnType<typeof vi.fn>;

    const rlMod = await import('@/utils/rateLimit');
    rateLimit = rlMod.rateLimit as unknown as ReturnType<typeof vi.fn>;

    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'sqlite');
  });

  it('should accept valid submission and return success', async () => {
    const res = await POST(makeRequest(validBody));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBeDefined();
  });

  it('should reject missing name with 400', async () => {
    const { name: _, ...noName } = validBody;
    const res = await POST(makeRequest(noName));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject name too short with 400', async () => {
    const res = await POST(makeRequest({ ...validBody, name: 'A' }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('2 characters');
  });

  it('should reject invalid email with 400', async () => {
    const res = await POST(makeRequest({ ...validBody, email: 'bad' }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject invalid subject with 400', async () => {
    const res = await POST(makeRequest({ ...validBody, subject: 'invalid' }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should accept all valid subject values', async () => {
    for (const subject of ['question', 'feedback', 'bug', 'feature', 'other']) {
      const res = await POST(makeRequest({ ...validBody, subject }));
      const data = await res.json();
      expect(data.success).toBe(true);
    }
  });

  it('should reject message shorter than 10 characters', async () => {
    const res = await POST(makeRequest({ ...validBody, message: 'Short' }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('10 characters');
  });

  it('should return 403 on CSRF failure', async () => {
    verifyCsrf.mockReturnValue(false);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(403);
  });

  it('should return 429 on rate limit', async () => {
    rateLimit.mockReturnValue({
      success: false,
      remaining: 0,
      headers: { 'Retry-After': '60' },
    });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
  });

  it('should return 503 when strict persistence mode is enabled and storage fails', async () => {
    const dbMod = await import('@/lib/db/submissions');
    await dbMod.resetSubmissionStoreForTests();

    vi.stubEnv('SUBMISSIONS_PERSISTENCE_STRICT', 'true');
    vi.stubEnv('SQLITE_DB_PATH', '/tmp');

    const res = await POST(makeRequest(validBody));
    const data = await res.json();

    expect(res.status).toBe(503);
    expect(data.success).toBe(false);
    expect(data.error).toContain('temporarily unavailable');
  });
});
