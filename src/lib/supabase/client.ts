import type { SupabaseClient } from '@supabase/supabase-js';

let browserClientPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Returns true when the required Supabase environment variables are set.
 * Safe to call on both client and server.
 */
export function isSupabaseEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

/**
 * Creates (or returns a cached) Supabase browser client for use in
 * client components. Returns null when Supabase env vars are not set,
 * allowing the app to fall back to localStorage-only behaviour.
 */
export async function getSupabaseBrowserClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseEnabled()) {
    return null;
  }

  if (!browserClientPromise) {
    browserClientPromise = import('@supabase/ssr')
      .then(({ createBrowserClient }) =>
        createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
      )
      .catch(() => null);
  }

  return browserClientPromise;
}
