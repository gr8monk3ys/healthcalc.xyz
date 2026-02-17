import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrf } from '@/utils/csrf';
import { deleteSavedResult, isSavedResultsPostgresConfigured } from '@/lib/db/savedResults';
import { getSupabaseServerClient } from '@/lib/supabase/server';

interface Props {
  params: Promise<{ id: string }>;
}

const ANONYMOUS_USER_ID = 'anonymous';

async function resolveUserId(): Promise<string> {
  try {
    const supabase = await getSupabaseServerClient();
    if (!supabase) return ANONYMOUS_USER_ID;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? ANONYMOUS_USER_ID;
  } catch {
    return ANONYMOUS_USER_ID;
  }
}

export async function DELETE(request: NextRequest, { params }: Props): Promise<NextResponse> {
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
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

  const userId = await resolveUserId();
  const deleted = await deleteSavedResult(userId, id);
  return NextResponse.json({ success: true, deleted }, { status: 200 });
}
