import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Handles the redirect from a Supabase magic link email.
 * Exchanges the auth code for a session, then redirects to /saved-results.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');

  if (code) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(new URL('/saved-results', origin));
      }
    }
  }

  // If something went wrong, redirect to the home page.
  return NextResponse.redirect(new URL('/', origin));
}
