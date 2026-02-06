import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/saved-results(.*)']);
const hasClerkKeys = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

function applySecurityAndCanonicalization(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  const canonicalHost = process.env.NEXT_PUBLIC_CANONICAL_HOST?.trim().toLowerCase();
  const currentHost = url.host.toLowerCase();
  const normalizeHost = (host: string) => host.replace(/^www\./, '');

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

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

  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return response;
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
