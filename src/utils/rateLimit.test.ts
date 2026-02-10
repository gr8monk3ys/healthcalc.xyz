import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

describe('rateLimit', () => {
  let rateLimit: typeof import('./rateLimit').rateLimit;

  function makeRequest(ip?: string): NextRequest {
    const headers: Record<string, string> = {};
    if (ip) {
      headers['x-forwarded-for'] = ip;
    }
    return new NextRequest('http://localhost/api/test', {
      method: 'POST',
      headers: new Headers(headers),
    });
  }

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.resetModules();
    const mod = await import('./rateLimit');
    rateLimit = mod.rateLimit;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow first request with correct remaining count', () => {
    const result = rateLimit(makeRequest('1.2.3.4'));
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9);
  });

  it('should allow requests within the limit', () => {
    for (let i = 0; i < 10; i++) {
      const result = rateLimit(makeRequest('1.2.3.4'));
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(9 - i);
    }
  });

  it('should reject request exceeding the limit', () => {
    for (let i = 0; i < 10; i++) {
      rateLimit(makeRequest('1.2.3.4'));
    }
    const result = rateLimit(makeRequest('1.2.3.4'));
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should include standard rate limit headers', () => {
    const result = rateLimit(makeRequest('1.2.3.4'));
    expect(result.headers['X-RateLimit-Limit']).toBe('10');
    expect(result.headers['X-RateLimit-Remaining']).toBe('9');
    expect(result.headers['X-RateLimit-Reset']).toBeDefined();
  });

  it('should include Retry-After header when rate limited', () => {
    for (let i = 0; i < 10; i++) {
      rateLimit(makeRequest('1.2.3.4'));
    }
    const result = rateLimit(makeRequest('1.2.3.4'));
    expect(result.headers['Retry-After']).toBeDefined();
    expect(Number(result.headers['Retry-After'])).toBeGreaterThan(0);
  });

  it('should use custom limit and windowMs', () => {
    const opts = { limit: 3, windowMs: 30_000 };
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(makeRequest('1.2.3.4'), opts).success).toBe(true);
    }
    expect(rateLimit(makeRequest('1.2.3.4'), opts).success).toBe(false);
  });

  it('should track different routeKeys independently', () => {
    for (let i = 0; i < 3; i++) {
      rateLimit(makeRequest('1.2.3.4'), { limit: 3, routeKey: 'newsletter' });
    }
    expect(rateLimit(makeRequest('1.2.3.4'), { limit: 3, routeKey: 'newsletter' }).success).toBe(
      false
    );

    // Contact route should still work for the same IP
    expect(rateLimit(makeRequest('1.2.3.4'), { limit: 3, routeKey: 'contact' }).success).toBe(true);
  });

  it('should track different IPs independently', () => {
    const opts = { limit: 2 };
    for (let i = 0; i < 2; i++) {
      rateLimit(makeRequest('10.0.0.1'), opts);
    }
    expect(rateLimit(makeRequest('10.0.0.1'), opts).success).toBe(false);
    expect(rateLimit(makeRequest('10.0.0.2'), opts).success).toBe(true);
  });

  it('should reset after window expires', () => {
    const opts = { limit: 2, windowMs: 60_000 };
    for (let i = 0; i < 2; i++) {
      rateLimit(makeRequest('1.2.3.4'), opts);
    }
    expect(rateLimit(makeRequest('1.2.3.4'), opts).success).toBe(false);

    vi.advanceTimersByTime(61_000);
    expect(rateLimit(makeRequest('1.2.3.4'), opts).success).toBe(true);
  });

  it('should fall back to unknown when no IP info available', () => {
    const req = new NextRequest('http://localhost/api/test', {
      method: 'POST',
    });
    const result = rateLimit(req);
    expect(result.success).toBe(true);
  });
});
