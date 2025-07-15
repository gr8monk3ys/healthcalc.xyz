import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/utils/rateLimit';
import { verifyCsrf } from '@/utils/csrf';
import { deleteSavedResult, isSavedResultsPostgresConfigured } from '@/lib/db/savedResults';
import {
  applySavedResultsSessionCookie,
  resolveSavedResultsSession,
} from '@/lib/savedResultsSession';

interface Props {
  params: Promise<{ id: string }>;
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

  const session = await resolveSavedResultsSession(request);
  const deleted = await deleteSavedResult(session.userId, id);
  const response = NextResponse.json({ success: true, deleted }, { status: 200 });
  return applySavedResultsSessionCookie(response, session);
}
