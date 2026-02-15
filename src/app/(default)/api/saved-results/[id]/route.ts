import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { verifyCsrf } from '@/utils/csrf';
import { clerkEnabled } from '@/utils/auth';
import { deleteSavedResult, isSavedResultsPostgresConfigured } from '@/lib/db/savedResults';

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: Props): Promise<NextResponse> {
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

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }

  const deleted = await deleteSavedResult(userId, id);
  return NextResponse.json({ success: true, deleted }, { status: 200 });
}
