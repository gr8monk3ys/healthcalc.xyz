import { describe, it, expect, afterEach } from 'vitest';
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

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
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

  it('should allow request when neither Origin nor Referer is present', () => {
    const req = makeRequest({ host: 'localhost' });
    expect(verifyCsrf(req)).toBe(true);
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

  it('should allow request when no host can be determined', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const req = makeRequest({});
    expect(verifyCsrf(req)).toBe(true);
  });
});
