/**
 * @vitest-environment node
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/client-errors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost',
    },
    body: JSON.stringify(body),
  });
}

describe('POST /api/client-errors', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  async function loadRoute(options?: {
    csrf?: boolean;
    rateLimitSuccess?: boolean;
    headers?: Record<string, string>;
  }) {
    const logger = {
      error: vi.fn(),
      warn: vi.fn(),
      info: vi.fn(),
    };

    vi.doMock('@/utils/csrf', () => ({
      verifyCsrf: vi.fn(() => options?.csrf ?? true),
    }));
    vi.doMock('@/utils/rateLimit', () => ({
      rateLimit: vi.fn(() => ({
        success: options?.rateLimitSuccess ?? true,
        remaining: 19,
        headers: options?.headers ?? {},
      })),
    }));
    vi.doMock('@/utils/logger', () => ({
      createLogger: () => logger,
    }));

    const route = await import('./route');
    return { POST: route.POST, logger };
  }

  it('accepts valid reports and logs sanitized metadata', async () => {
    const { POST, logger } = await loadRoute();

    const response = await POST(
      makeRequest({
        message: '   Client exploded   ',
        name: 'TypeError',
        digest: 'abc123',
        url: 'https://www.healthcalc.xyz/bmi?tab=result',
        source: 'global-error',
        timestamp: '2026-03-11T00:00:00.000Z',
      })
    );

    expect(response.status).toBe(204);
    expect(logger.error).toHaveBeenCalledWith(
      'Client error report received',
      expect.objectContaining({
        message: 'Client exploded',
        name: 'TypeError',
        digest: 'abc123',
        source: 'global-error',
        url: 'https://www.healthcalc.xyz/bmi?tab=result',
        path: '/api/client-errors',
      })
    );
  });

  it('rejects invalid payloads', async () => {
    const { POST, logger } = await loadRoute();
    const response = await POST(makeRequest({ message: '   ' }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('rejects non-string payload fields without throwing', async () => {
    const { POST, logger } = await loadRoute();
    const response = await POST(
      makeRequest({ message: 123, url: { href: 'https://example.com' } })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      ok: false,
      error: 'Invalid error payload',
    });
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('rejects invalid origins', async () => {
    const { POST } = await loadRoute({ csrf: false });
    const response = await POST(makeRequest({ message: 'boom' }));

    expect(response.status).toBe(403);
  });

  it('honors rate limiting headers', async () => {
    const { POST } = await loadRoute({
      rateLimitSuccess: false,
      headers: { 'Retry-After': '60' },
    });
    const response = await POST(makeRequest({ message: 'boom' }));

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('60');
  });
});
