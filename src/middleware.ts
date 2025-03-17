import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function runs on every request
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname, search, hostname } = url;
  let shouldRedirect = false;
  let redirectTo = '';
  
  // Helper for constructing canonical URLs
  const getCanonicalURL = (path: string): string => {
    // Remove trailing slash unless it's the homepage
    const cleanPath = path === '/' ? path : path.endsWith('/') ? path.slice(0, -1) : path;
    // Remove index.html or index.php
    const finalPath = cleanPath.replace(/\/index\.(html|php)$/, '');
    return `https://www.heathcheck.info${finalPath}${search}`;
  };

  // Handle www vs non-www redirection (prefer www)
  if (!hostname.startsWith('www.') && !hostname.includes('localhost') && !hostname.includes('127.0.0.1')) {
    shouldRedirect = true;
    const wwwHostname = `www.${hostname}`;
    redirectTo = `https://${wwwHostname}${pathname}${search}`;
  }

  // Handle trailing slashes for non-root URLs
  if (pathname !== '/' && pathname.endsWith('/') && !pathname.endsWith('/index.html')) {
    shouldRedirect = true;
    redirectTo = `https://${hostname}${pathname.slice(0, -1)}${search}`;
  }

  // Handle index.html or index.php
  if (pathname.endsWith('/index.html') || pathname.endsWith('/index.php')) {
    shouldRedirect = true;
    redirectTo = `https://${hostname}${pathname.replace(/\/index\.(html|php)$/, '')}${search}`;
  }

  // If we need to redirect, do it
  if (shouldRedirect) {
    // Use 301 permanent redirect for better SEO
    return NextResponse.redirect(redirectTo, { status: 301 });
  }

  // For requests that don't need redirection, add canonical link HTTP header
  // This provides additional SEO benefit alongside the HTML canonical links
  const response = NextResponse.next();
  
  // Add rel="canonical" HTTP header for HTML responses
  const canonicalURL = getCanonicalURL(pathname);
  response.headers.set('Link', `<${canonicalURL}>; rel="canonical"`);
  
  return response;
}
