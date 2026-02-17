import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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
 * Resolve the owner key for saved results. When Supabase auth is
 * available and the user is signed in, use their user ID. Otherwise
 * fall back to the anonymous static key for backwards compatibility.
 */
const ANONYMOUS_USER_ID = 'anonymous';

async function resolveUserId(): Promise<string> {
  const authenticatedId = await getAuthenticatedUserId();
  return authenticatedId ?? ANONYMOUS_USER_ID;
}

export async function GET(): Promise<NextResponse> {
  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const userId = await resolveUserId();
  const rows = await listSavedResults(userId, 30);
  const results: ApiSavedResult[] = rows.map(row => ({
    id: row.resultKey,
    calculatorType: row.calculatorType,
    calculatorName: row.calculatorName,
    date: row.createdAt,
    data: row.data,
  }));

  return NextResponse.json({ success: true, results }, { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
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

  const userId = await resolveUserId();
  const saved = await upsertSavedResult(userId, parsed.data);
  return NextResponse.json({ success: true, result: toApiResult(saved) }, { status: 200 });
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const userId = await resolveUserId();
  const deleted = await clearSavedResults(userId);
  return NextResponse.json({ success: true, deleted }, { status: 200 });
}
