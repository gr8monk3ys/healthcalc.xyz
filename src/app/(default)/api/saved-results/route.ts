import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/utils/rateLimit';
import { verifyCsrf } from '@/utils/csrf';
import {
  clearSavedResults,
  isSavedResultsPostgresConfigured,
  listSavedResults,
  upsertSavedResult,
} from '@/lib/db/savedResults';
import { getSupabaseServerClient } from '@/lib/supabase/server';

const saveSchema = z.object({
  calculatorType: z.string().min(1).max(80),
  calculatorName: z.string().min(1).max(140),
  data: z.record(z.string(), z.unknown()).refine(d => JSON.stringify(d).length <= 10240, {
    message: 'Data payload must not exceed 10 KB',
  }),
});

type ApiSavedResult = {
  id: string;
  calculatorType: string;
  calculatorName: string;
  date: string;
  data: Record<string, unknown>;
};

function toApiResult(row: Awaited<ReturnType<typeof upsertSavedResult>>): ApiSavedResult {
  return {
    id: row.resultKey,
    calculatorType: row.calculatorType,
    calculatorName: row.calculatorName,
    date: row.createdAt,
    data: row.data,
  };
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

/**
 * Cookie name used to store the anonymous session UUID. HttpOnly so JS
 * cannot read or tamper with it, scoped per-browser to prevent data leakage
 * between different anonymous visitors.
 */
const ANON_COOKIE_NAME = '_hc_anon';

/**
 * Reads the anonymous session cookie and returns a namespaced user ID.
 * If no valid cookie exists, generates a new UUID. The caller is responsible
 * for setting the cookie on the response when isNew is true.
 */
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
async function resolveUserId(request: NextRequest): Promise<{ userId: string; isNew: boolean }> {
  const authenticatedId = await getAuthenticatedUserId();
  if (authenticatedId) {
    return { userId: authenticatedId, isNew: false };
  }
  return getAnonymousSession(request);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const rateLimitResult = rateLimit(request, { limit: 30, routeKey: 'saved-results-get' });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const { userId, isNew } = await resolveUserId(request);
  const rows = await listSavedResults(userId, 30);
  const results: ApiSavedResult[] = rows.map(row => ({
    id: row.resultKey,
    calculatorType: row.calculatorType,
    calculatorName: row.calculatorName,
    date: row.createdAt,
    data: row.data,
  }));

  const response = NextResponse.json({ success: true, results }, { status: 200 });
  if (isNew) setAnonCookie(response, userId);
  return response;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const rateLimitResult = rateLimit(request, { limit: 10, routeKey: 'saved-results-post' });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const raw = await request.json().catch(() => null);
  const parsed = saveSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid input';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  const { userId, isNew } = await resolveUserId(request);
  const saved = await upsertSavedResult(userId, parsed.data);
  const response = NextResponse.json(
    { success: true, result: toApiResult(saved) },
    { status: 200 }
  );
  if (isNew) setAnonCookie(response, userId);
  return response;
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const rateLimitResult = rateLimit(request, { limit: 10, routeKey: 'saved-results-delete' });
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const { userId, isNew } = await resolveUserId(request);
  const deleted = await clearSavedResults(userId);
  const response = NextResponse.json({ success: true, deleted }, { status: 200 });
  if (isNew) setAnonCookie(response, userId);
  return response;
}
