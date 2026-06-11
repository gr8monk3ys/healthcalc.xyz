import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Shared session resolution for the saved-results API routes.
 *
 * Owner keys are either a Supabase user ID (authenticated) or a per-browser
 * anonymous UUID stored in an HttpOnly cookie. This module is the single
 * source of truth — the route handlers under api/saved-results must not
 * re-implement cookie or session logic.
 */

/**
 * Cookie name used to store the anonymous session UUID. HttpOnly so JS
 * cannot read or tamper with it, scoped per-browser to prevent data leakage
 * between different anonymous visitors.
 */
export const ANON_COOKIE_NAME = '_hc_anon';

export interface SavedResultsSession {
  userId: string;
  /** True when a new anonymous UUID was generated for this request. */
  isNew: boolean;
  /**
   * True when the request is authenticated but still carries an anonymous
   * cookie left over from before login. The cookie should be removed so a
   * year-long anon session can't linger on a shared browser.
   */
  staleAnonCookie: boolean;
}

/**
 * Attempt to extract an authenticated user ID from the Supabase session
 * present in the request cookies. Returns null when Supabase is not
 * configured or the user is not authenticated.
 */
async function getAuthenticatedUserId(): Promise<string | null> {
  try {
    const supabase = await getSupabaseServerClient();
    if (!supabase) return null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

function getAnonymousSession(request: NextRequest): { userId: string; isNew: boolean } {
  const existing = request.cookies.get(ANON_COOKIE_NAME)?.value;
  if (existing && /^[0-9a-f-]{36}$/.test(existing)) {
    return { userId: `anon_${existing}`, isNew: false };
  }
  const newId = crypto.randomUUID();
  return { userId: `anon_${newId}`, isNew: true };
}

function setAnonCookie(response: NextResponse, userId: string): void {
  const uuid = userId.slice('anon_'.length);
  response.cookies.set(ANON_COOKIE_NAME, uuid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
}

/**
 * Resolve the owner key for saved results. When Supabase auth is available
 * and the user is signed in, use their user ID. Otherwise use a per-browser
 * anonymous session ID derived from a cookie so each visitor's data is
 * isolated from other anonymous visitors.
 */
export async function resolveSavedResultsSession(
  request: NextRequest
): Promise<SavedResultsSession> {
  const authenticatedId = await getAuthenticatedUserId();
  if (authenticatedId) {
    const staleAnonCookie = Boolean(request.cookies.get(ANON_COOKIE_NAME)?.value);
    return { userId: authenticatedId, isNew: false, staleAnonCookie };
  }
  return { ...getAnonymousSession(request), staleAnonCookie: false };
}

/**
 * Apply anonymous-cookie bookkeeping to a response: set the cookie for new
 * anonymous sessions, remove it for authenticated users that still carry one.
 */
export function applySavedResultsSessionCookie(
  response: NextResponse,
  session: SavedResultsSession
): NextResponse {
  if (session.isNew) {
    setAnonCookie(response, session.userId);
  } else if (session.staleAnonCookie) {
    response.cookies.delete(ANON_COOKIE_NAME);
  }
  return response;
}
