import { describe, it, expect, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { verifyCsrf } from './csrf';

function makeRequest(headers: Record<string, string>): NextRequest {
  return new NextRequest('http://localhost/api/test', {
    method: 'POST',
    headers: new Headers(headers),
  });
}

describe('verifyCsrf', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const originalCanonicalHost = process.env.NEXT_PUBLIC_CANONICAL_HOST;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }

    if (originalCanonicalHost === undefined) {
      delete process.env.NEXT_PUBLIC_CANONICAL_HOST;
    } else {
      process.env.NEXT_PUBLIC_CANONICAL_HOST = originalCanonicalHost;
    }
  });

  it('should allow request when Origin matches host', () => {
    const req = makeRequest({
      origin: 'http://localhost',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(true);
  });

  it('should reject request when Origin does not match host', () => {
    const req = makeRequest({
      origin: 'http://evil.com',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(false);
  });

  it('should allow request when Referer matches host (no Origin)', () => {
    const req = makeRequest({
      referer: 'http://localhost/some-page',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(true);
  });

  it('should reject request when Referer does not match host (no Origin)', () => {
    const req = makeRequest({
      referer: 'http://evil.com/some-page',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(false);
  });

  it('should reject request when neither Origin nor Referer is present', () => {
    const req = makeRequest({ host: 'localhost' });
    expect(verifyCsrf(req)).toBe(false);
  });

  it('should reject request with invalid Origin URL', () => {
    const req = makeRequest({
      origin: 'not-a-valid-url',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(false);
  });

  it('should reject request with invalid Referer URL', () => {
    const req = makeRequest({
      referer: 'not-a-valid-url',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(false);
  });

  it('should use NEXT_PUBLIC_SITE_URL when set', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.healthcalc.xyz';
    const req = makeRequest({
      origin: 'https://www.healthcalc.xyz',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(true);
  });

  it('should reject when Origin does not match NEXT_PUBLIC_SITE_URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.healthcalc.xyz';
    const req = makeRequest({
      origin: 'http://localhost',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(false);
  });

  it('should reject request when no host can be determined (fail-secure)', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_CANONICAL_HOST;
    const req = makeRequest({});
    expect(verifyCsrf(req)).toBe(false);
  });

  it('should allow apex host when NEXT_PUBLIC_SITE_URL uses www', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.healthcalc.xyz';
    const req = makeRequest({
      origin: 'https://healthcalc.xyz',
      host: 'healthcalc.xyz',
    });
    expect(verifyCsrf(req)).toBe(true);
  });

  it('should allow www host when NEXT_PUBLIC_SITE_URL uses apex', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://healthcalc.xyz';
    const req = makeRequest({
      origin: 'https://www.healthcalc.xyz',
      host: 'www.healthcalc.xyz',
    });
    expect(verifyCsrf(req)).toBe(true);
  });

  it('should use NEXT_PUBLIC_CANONICAL_HOST when NEXT_PUBLIC_SITE_URL is not set', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_CANONICAL_HOST = 'healthcalc.xyz';
    const req = makeRequest({
      origin: 'https://www.healthcalc.xyz',
      host: 'localhost',
    });
    expect(verifyCsrf(req)).toBe(true);
  });

  it('should reject Host header fallback in production (fail-closed)', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_CANONICAL_HOST;
    vi.stubEnv('NODE_ENV', 'production');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      const req = makeRequest({
        origin: 'https://healthcalc.xyz',
        host: 'healthcalc.xyz',
      });
      expect(verifyCsrf(req)).toBe(false);
      expect(consoleError).toHaveBeenCalled();
    } finally {
      consoleError.mockRestore();
      vi.unstubAllEnvs();
    }
  });

  it('should allow Host header fallback outside production', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_CANONICAL_HOST;
    const req = makeRequest({
      origin: 'http://localhost:3000',
      host: 'localhost:3000',
    });
    expect(verifyCsrf(req)).toBe(true);
  });

  it('should reject unrelated subdomains even when root domain is allowed', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://healthcalc.xyz';
    const req = makeRequest({
      origin: 'https://foo.healthcalc.xyz',
      host: 'healthcalc.xyz',
    });
    expect(verifyCsrf(req)).toBe(false);
  });
});
