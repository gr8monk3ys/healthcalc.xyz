import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Refreshes the Supabase auth session by reading/writing cookies on the
 * request/response pair. Call this from the existing proxy middleware to
 * keep auth tokens fresh without a full page reload.
 *
 * When Supabase env vars are not set this is a no-op -- it returns the
 * response unchanged.
 */
export async function updateSupabaseSession(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Forward cookie writes to both the request (so downstream server
        // code sees fresh values) and the outgoing response.
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser() triggers a token refresh when the access token has expired.
  // We intentionally discard the result -- the side-effect of refreshing
  // cookies is what matters here.
  await supabase.auth.getUser();

  return response;
}
