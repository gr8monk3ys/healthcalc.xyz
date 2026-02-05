import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js middleware for security headers and URL canonicalization.
 * Runs on every request that matches the config matcher.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  const canonicalHost = process.env.NEXT_PUBLIC_CANONICAL_HOST?.trim().toLowerCase();
  const currentHost = url.host.toLowerCase();
  const normalizeHost = (host: string) => host.replace(/^www\./, '');

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // Canonical host redirect to prevent redirect loops between apex/www.
  if (canonicalHost && currentHost) {
    const isSameRootDomain = normalizeHost(currentHost) === normalizeHost(canonicalHost);
    if (
      isSameRootDomain &&
      currentHost !== canonicalHost &&
      !currentHost.includes('localhost') &&
      !currentHost.includes('127.0.0.1') &&
      !currentHost.endsWith('.vercel.app')
    ) {
      url.host = canonicalHost;
      url.protocol = 'https:';
      return NextResponse.redirect(url, 308);
    }
  }

  // URL canonicalization - remove trailing slashes (except for root)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  // Note: www to non-www redirects should be configured in Vercel dashboard
  // under Settings > Domains to avoid redirect loops

  return response;
}

/**
 * Configure which paths the middleware runs on.
 * Excludes static files, images, and Next.js internals.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
