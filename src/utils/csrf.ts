import { NextRequest } from 'next/server';

/**
 * Verify CSRF protection by checking Origin and Referer headers against
 * allowed hosts. This prevents cross-site request forgery by ensuring
 * requests originate from the same site (including apex/www variants).
 *
 * Allowed hosts are resolved in this order:
 * 1. NEXT_PUBLIC_SITE_URL host and NEXT_PUBLIC_CANONICAL_HOST (if set)
 * 2. Request Host header fallback — non-production only. The Host header is
 *    attacker-influenced behind some proxy configurations, so production
 *    fails closed when no canonical host is configured.
 *
 * The function checks request headers in order of reliability:
 * 1. Origin header (most reliable, set by browsers on cross-origin requests)
 * 2. Referer header (fallback, may contain full URL path)
 * 3. If neither is present, reject the request. Modern browsers always send
 *    at least Origin or Referer on same-origin POST requests, so missing
 *    both headers is suspicious and likely indicates a forged request.
 */
function normalizeHost(host: string): string {
  return host
    .trim()
    .toLowerCase()
    .replace(/^www\./, '');
}

function parseHostFromUrl(url: string): string | null {
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return null;
  }
}

function parseHostFromSiteUrl(siteUrl: string | undefined): string | null {
  if (!siteUrl) return null;
  return parseHostFromUrl(siteUrl);
}

export function verifyCsrf(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host')?.trim().toLowerCase() || null;
  const siteHost = parseHostFromSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const canonicalHost = process.env.NEXT_PUBLIC_CANONICAL_HOST?.trim().toLowerCase() || null;
  const configuredHosts = [siteHost, canonicalHost].filter((value): value is string =>
    Boolean(value)
  );
  const isProductionRuntime =
    (process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? '').trim().toLowerCase() === 'production';
  const fallbackHosts = !isProductionRuntime && host ? [host] : [];
  const allowedHosts = new Set(configuredHosts.length > 0 ? configuredHosts : fallbackHosts);
  const allowedRootHosts = new Set(Array.from(allowedHosts, normalizeHost));

  if (allowedHosts.size === 0) {
    if (isProductionRuntime && configuredHosts.length === 0) {
      console.error(
        '[csrf] NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_CANONICAL_HOST not configured — rejecting request'
      );
    }
    return false; // Fail-secure: reject if we can't verify
  }

  function isAllowed(headerValue: string): boolean {
    const headerHost = parseHostFromUrl(headerValue);
    if (!headerHost) return false;
    return allowedHosts.has(headerHost) || allowedRootHosts.has(normalizeHost(headerHost));
  }

  // Check Origin header (most reliable)
  if (origin) {
    return isAllowed(origin);
  }

  // Fallback: check Referer header
  if (referer) {
    return isAllowed(referer);
  }

  // No Origin or Referer - reject. Modern browsers always send at least one
  // of these headers on same-origin POST requests.
  return false;
}
