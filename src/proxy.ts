import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import {
  defaultLocale,
  getLocaleFromPathname,
  isLocalizablePath,
  localeCookieName,
  stripLocaleFromPathname,
  type SupportedLocale,
} from '@/i18n/config';

const EMBEDDABLE_CALCULATOR_PATHS = new Set(CALCULATOR_CATALOG.map(calc => `/${calc.slug}`));

function isEmbedAllowedRequest(request: NextRequest): boolean {
  const url = request.nextUrl;

  if (url.pathname.startsWith('/api/embed/')) {
    return true;
  }

  if (url.searchParams.get('embed') !== '1') {
    return false;
  }

  const pathWithoutLocale = stripLocaleFromPathname(url.pathname);
  return EMBEDDABLE_CALCULATOR_PATHS.has(pathWithoutLocale);
}

function getEmbedFrameAncestors(): string {
  const configured = process.env.EMBED_FRAME_ANCESTORS?.trim();
  if (configured) return configured;

  // Default: allow same-origin preview + embedding on HTTPS sites.
  return "'self' https:";
}

function buildContentSecurityPolicy(frameAncestors: string): string {
  const unsafeEval = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '';

  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${unsafeEval} https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://va.vercel-scripts.com https://*.adtrafficquality.google`,
    "worker-src 'self' blob:",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.sentry.io https://*.ingest.sentry.io https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://google.com https://*.adtrafficquality.google",
    'frame-src https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com',
    "object-src 'none'",
    "base-uri 'self'",
    `frame-ancestors ${frameAncestors}`,
    "form-action 'self'",
  ]
    .join('; ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function applySecurityHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const embedAllowed = isEmbedAllowedRequest(request);

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Content-Security-Policy',
    buildContentSecurityPolicy(embedAllowed ? getEmbedFrameAncestors() : "'self'")
  );
  // Allow framing for intentionally embeddable experiences (calculator widgets + /api/embed).
  if (!embedAllowed) {
    response.headers.set('X-Frame-Options', 'DENY');
  } else {
    response.headers.delete('X-Frame-Options');
  }
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Vary', 'Accept-Language, Cookie');
  return response;
}

function setLocaleCookie(response: NextResponse, locale: SupportedLocale): void {
  response.cookies.set(localeCookieName, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: true,
  });
}

function withRequestLocaleHeader(request: NextRequest, locale: SupportedLocale): Headers {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hc-locale', locale);
  return requestHeaders;
}

function getCanonicalRedirect(request: NextRequest): { url: URL; status: 301 | 308 } | null {
  const url = request.nextUrl.clone();
  const canonicalHost = process.env.NEXT_PUBLIC_CANONICAL_HOST?.trim().toLowerCase();
  const currentHost = url.host.toLowerCase();
  const normalizeHost = (host: string) => host.replace(/^www\./, '');

  if (canonicalHost && currentHost) {
    // Redirect old domain (heathcheck.info) to new domain (healthcalc.xyz)
    const oldDomains = ['heathcheck.info', 'www.heathcheck.info'];
    if (oldDomains.includes(currentHost)) {
      url.host = canonicalHost;
      url.protocol = 'https:';
      return { url, status: 301 };
    }

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
      return { url, status: 308 };
    }
  }

  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return { url, status: 301 };
  }

  return null;
}

function handleLocaleRouting(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const localeFromPath = getLocaleFromPathname(url.pathname);

  if (!isLocalizablePath(url.pathname)) {
    return NextResponse.next({
      request: {
        headers: withRequestLocaleHeader(request, defaultLocale),
      },
    });
  }

  // Canonicalize explicit default locale prefix ("/en/...") to non-prefixed URLs.
  if (localeFromPath === defaultLocale) {
    url.pathname = stripLocaleFromPathname(url.pathname);
    const response = NextResponse.redirect(url, 308);
    setLocaleCookie(response, defaultLocale);
    return response;
  }

  // Non-default locale paths redirect to the English version with 302 (temporary).
  // Translations are not yet complete for most pages, so serving localized URLs
  // with mixed English/translated content confuses users and search engines.
  // Use 302 so crawlers do not cache the redirect permanently -- we can remove
  // this once translations ship.
  // TODO: Re-enable localized routing when translations are complete
  if (localeFromPath) {
    url.pathname = stripLocaleFromPathname(url.pathname);
    const response = NextResponse.redirect(url, 302);
    setLocaleCookie(response, defaultLocale);
    return response;
  }

  // All non-prefixed paths serve as English. We no longer redirect users to
  // locale-prefixed routes based on cookie or Accept-Language header since
  // translations are incomplete. The Accept-Language detection infrastructure
  // is preserved in i18n/config.ts for future use.
  return NextResponse.next({
    request: {
      headers: withRequestLocaleHeader(request, defaultLocale),
    },
  });
}

export function proxy(request: NextRequest): NextResponse {
  const canonicalRedirect = getCanonicalRedirect(request);
  if (canonicalRedirect) {
    return applySecurityHeaders(
      request,
      NextResponse.redirect(canonicalRedirect.url, canonicalRedirect.status)
    );
  }

  return applySecurityHeaders(request, handleLocaleRouting(request));
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
