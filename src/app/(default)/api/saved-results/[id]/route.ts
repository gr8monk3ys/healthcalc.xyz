import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/utils/rateLimit';
import { verifyCsrf } from '@/utils/csrf';
import { deleteSavedResult, isSavedResultsPostgresConfigured } from '@/lib/db/savedResults';
import { getSupabaseServerClient } from '@/lib/supabase/server';

interface Props {
  params: Promise<{ id: string }>;
}

const ANON_COOKIE_NAME = '_hc_anon';

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

async function resolveUserId(request: NextRequest): Promise<{ userId: string; isNew: boolean }> {
  try {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.id) return { userId: user.id, isNew: false };
    }
  } catch {
    // Supabase not configured or session invalid — fall through to anon
  }
  return getAnonymousSession(request);
}

export async function DELETE(request: NextRequest, { params }: Props): Promise<NextResponse> {
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

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }
  if (id.length > 100 || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return NextResponse.json({ success: false, error: 'Invalid id format' }, { status: 400 });
  }

  const { userId, isNew } = await resolveUserId(request);
  const deleted = await deleteSavedResult(userId, id);
  const response = NextResponse.json({ success: true, deleted }, { status: 200 });
  if (isNew) setAnonCookie(response, userId);
  return response;
}
