import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { verifyCsrf } from '@/utils/csrf';
import { clerkEnabled } from '@/utils/auth';
import {
  clearSavedResults,
  isSavedResultsPostgresConfigured,
  listSavedResults,
  upsertSavedResult,
} from '@/lib/db/savedResults';

const saveSchema = z.object({
  calculatorType: z.string().min(1).max(80),
  calculatorName: z.string().min(1).max(140),
  data: z.record(z.string(), z.unknown()),
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

export async function GET(): Promise<NextResponse> {
  if (!clerkEnabled) {
    return NextResponse.json(
      { success: false, error: 'Authentication is not configured.' },
      { status: 501 }
    );
  }

  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

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

  if (!clerkEnabled) {
    return NextResponse.json(
      { success: false, error: 'Authentication is not configured.' },
      { status: 501 }
    );
  }

  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const raw = await request.json().catch(() => null);
  const parsed = saveSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? 'Invalid input';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  const saved = await upsertSavedResult(userId, parsed.data);
  return NextResponse.json({ success: true, result: toApiResult(saved) }, { status: 200 });
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  if (!clerkEnabled) {
    return NextResponse.json(
      { success: false, error: 'Authentication is not configured.' },
      { status: 501 }
    );
  }

  if (!isSavedResultsPostgresConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Saved results database is not configured.' },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const deleted = await clearSavedResults(userId);
  return NextResponse.json({ success: true, deleted }, { status: 200 });
}
