import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import {
  defaultLocale,
  getLocaleFromAcceptLanguage,
  getLocaleFromPathname,
  isLocalizablePath,
  localeCookieName,
  normalizeLocale,
  prefixPathWithLocale,
  stripLocaleFromPathname,
  supportedLocales,
  type SupportedLocale,
} from '@/i18n/config';

const EMBEDDABLE_CALCULATOR_PATHS = new Set(CALCULATOR_CATALOG.map(calc => `/${calc.slug}`));

const localizedProtectedRoutes = [
  '/saved-results(.*)',
  ...supportedLocales
    .filter(locale => locale !== defaultLocale)
    .map(locale => `/${locale}/saved-results(.*)`),
];

const isProtectedRoute = createRouteMatcher(localizedProtectedRoutes);
const hasClerkKeys = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

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
    `script-src 'self' 'unsafe-inline'${unsafeEval} https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://va.vercel-scripts.com https://challenges.cloudflare.com https://clerk.healthcalc.xyz https://*.clerk.accounts.dev https://*.adtrafficquality.google`,
    "worker-src 'self' blob:",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com https://va.vercel-scripts.com https://clerk.healthcalc.xyz https://*.clerk.accounts.dev https://clerk-telemetry.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://google.com https://*.adtrafficquality.google",
    'frame-src https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://challenges.cloudflare.com',
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
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  } else {
    response.headers.delete('X-Frame-Options');
  }
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set('Vary', 'Accept-Language, Cookie');
  return response;
}

function setLocaleCookie(response: NextResponse, locale: SupportedLocale): void {
  response.cookies.set(localeCookieName, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
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
  const localeFromCookie = normalizeLocale(request.cookies.get(localeCookieName)?.value);
  const localeFromHeader = getLocaleFromAcceptLanguage(request.headers.get('accept-language'));
  const preferredLocale = localeFromCookie ?? localeFromHeader ?? defaultLocale;

  if (!isLocalizablePath(url.pathname)) {
    return NextResponse.next({
      request: {
        headers: withRequestLocaleHeader(request, localeFromCookie ?? defaultLocale),
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

  // Non-default locale paths are real routes (e.g. "/es/bmi"). Keep the URL as-is.
  if (localeFromPath) {
    const response = NextResponse.next({
      request: {
        headers: withRequestLocaleHeader(request, localeFromPath),
      },
    });
    setLocaleCookie(response, localeFromPath);
    return response;
  }

  // Keep users on locale-prefixed routes once a non-default locale is selected.
  if (preferredLocale !== defaultLocale) {
    url.pathname = prefixPathWithLocale(url.pathname, preferredLocale);
    const response = NextResponse.redirect(url, 307);
    setLocaleCookie(response, preferredLocale);
    return response;
  }

  return NextResponse.next({
    request: {
      headers: withRequestLocaleHeader(request, defaultLocale),
    },
  });
}

function applySecurityAndCanonicalization(request: NextRequest): NextResponse {
  const canonicalRedirect = getCanonicalRedirect(request);
  if (canonicalRedirect) {
    return applySecurityHeaders(
      request,
      NextResponse.redirect(canonicalRedirect.url, canonicalRedirect.status)
    );
  }

  return applySecurityHeaders(request, handleLocaleRouting(request));
}

const withClerk = clerkMiddleware(async (auth, request: NextRequest) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }

  return applySecurityAndCanonicalization(request);
});

export default function middleware(request: NextRequest) {
  if (!hasClerkKeys) {
    return applySecurityAndCanonicalization(request);
  }

  return (withClerk as unknown as (req: NextRequest) => NextResponse)(request);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
