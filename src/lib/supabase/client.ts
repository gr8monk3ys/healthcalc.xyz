import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

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
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!isSupabaseEnabled()) {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return browserClient;
}
