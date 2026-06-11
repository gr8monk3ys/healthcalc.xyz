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
import {
  applySavedResultsSessionCookie,
  resolveSavedResultsSession,
} from '@/lib/savedResultsSession';

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

  const session = await resolveSavedResultsSession(request);
  const rows = await listSavedResults(session.userId, 30);
  const results: ApiSavedResult[] = rows.map(row => ({
    id: row.resultKey,
    calculatorType: row.calculatorType,
    calculatorName: row.calculatorName,
    date: row.createdAt,
    data: row.data,
  }));

  const response = NextResponse.json({ success: true, results }, { status: 200 });
  return applySavedResultsSessionCookie(response, session);
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

  const session = await resolveSavedResultsSession(request);
  const saved = await upsertSavedResult(session.userId, parsed.data);
  const response = NextResponse.json(
    { success: true, result: toApiResult(saved) },
    { status: 200 }
  );
  return applySavedResultsSessionCookie(response, session);
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

  const session = await resolveSavedResultsSession(request);
  const deleted = await clearSavedResults(session.userId);
  const response = NextResponse.json({ success: true, deleted }, { status: 200 });
  return applySavedResultsSessionCookie(response, session);
}
