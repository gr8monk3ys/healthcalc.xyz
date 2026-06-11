/**
 * @vitest-environment node
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from './proxy';

function makeRequest(url: string, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest(url, { headers: new Headers(headers) });
}

describe('proxy', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('canonical host redirects', () => {
    it('301-redirects the legacy domain to the canonical host', () => {
      vi.stubEnv('NEXT_PUBLIC_CANONICAL_HOST', 'www.healthcalc.xyz');
      const response = proxy(makeRequest('https://heathcheck.info/bmi'));

      expect(response.status).toBe(301);
      expect(response.headers.get('location')).toBe('https://www.healthcalc.xyz/bmi');
    });

    it('308-redirects apex to the canonical www host', () => {
      vi.stubEnv('NEXT_PUBLIC_CANONICAL_HOST', 'www.healthcalc.xyz');
      const response = proxy(makeRequest('https://healthcalc.xyz/tdee'));

      expect(response.status).toBe(308);
      expect(response.headers.get('location')).toBe('https://www.healthcalc.xyz/tdee');
    });

    it('does not redirect vercel preview hosts', () => {
      vi.stubEnv('NEXT_PUBLIC_CANONICAL_HOST', 'www.healthcalc.xyz');
      const response = proxy(makeRequest('https://preview-abc.vercel.app/bmi'));

      expect(response.status).toBe(200);
    });
  });

  describe('trailing slash removal', () => {
    it('301-redirects paths with a trailing slash', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/bmi/'));

      expect(response.status).toBe(301);
      expect(new URL(response.headers.get('location') ?? '').pathname).toBe('/bmi');
    });

    it('resolves repeated trailing slashes in a single hop', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/bmi//'));

      expect(response.status).toBe(301);
      expect(new URL(response.headers.get('location') ?? '').pathname).toBe('/bmi');
    });

    it('preserves query parameters when stripping the trailing slash', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/bmi/?embed=1'));

      const location = new URL(response.headers.get('location') ?? '');
      expect(location.pathname).toBe('/bmi');
      expect(location.searchParams.get('embed')).toBe('1');
    });

    it('does not redirect the root path', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/'));

      expect(response.status).toBe(200);
    });
  });

  describe('locale routing', () => {
    it('308-redirects explicit default-locale prefix to the unprefixed path', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/en/bmi'));

      expect(response.status).toBe(308);
      expect(new URL(response.headers.get('location') ?? '').pathname).toBe('/bmi');
    });

    it('302-redirects non-default locales to English until translations ship', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/es/bmi'));

      expect(response.status).toBe(302);
      expect(new URL(response.headers.get('location') ?? '').pathname).toBe('/bmi');
    });

    it('serves unprefixed paths without redirecting', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/bmi'));

      expect(response.status).toBe(200);
    });
  });

  describe('security headers', () => {
    it('sets the full security header set on normal pages', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/bmi'));

      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
      expect(response.headers.get('Permissions-Policy')).toContain('camera=()');
      const csp = response.headers.get('Content-Security-Policy') ?? '';
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("frame-ancestors 'self'");
      expect(csp).toContain("object-src 'none'");
    });

    it('sets security headers on redirects too', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/es/bmi'));

      expect(response.status).toBe(302);
      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('Content-Security-Policy')).toBeTruthy();
    });

    it('allows framing for the embed API', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/api/embed/bmi'));

      expect(response.headers.get('X-Frame-Options')).toBeNull();
      const csp = response.headers.get('Content-Security-Policy') ?? '';
      expect(csp).not.toContain("frame-ancestors 'self';");
    });

    it('allows framing for calculator pages requested with ?embed=1', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/bmi?embed=1'));

      expect(response.headers.get('X-Frame-Options')).toBeNull();
    });

    it('keeps frame protection for non-calculator pages even with ?embed=1', () => {
      const response = proxy(makeRequest('https://www.healthcalc.xyz/about?embed=1'));

      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
    });

    it('honors EMBED_FRAME_ANCESTORS for embeddable routes', () => {
      vi.stubEnv('EMBED_FRAME_ANCESTORS', 'https://partner.example');
      const response = proxy(makeRequest('https://www.healthcalc.xyz/api/embed/bmi'));

      const csp = response.headers.get('Content-Security-Policy') ?? '';
      expect(csp).toContain('frame-ancestors https://partner.example');
    });
  });
});
