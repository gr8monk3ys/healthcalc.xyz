/**
 * @vitest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('supabase browser client helpers', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unmock('@supabase/ssr');
  });

  it('returns null when Supabase is not configured', async () => {
    const clientModule = await import('./client');

    expect(clientModule.isSupabaseEnabled()).toBe(false);
    await expect(clientModule.getSupabaseBrowserClient()).resolves.toBeNull();
  });

  it('creates and caches the browser client when Supabase is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');

    const browserClient = { auth: { getUser: vi.fn() } };
    const createBrowserClient = vi.fn(() => browserClient);
    vi.doMock('@supabase/ssr', () => ({ createBrowserClient }));

    const clientModule = await import('./client');

    expect(clientModule.isSupabaseEnabled()).toBe(true);
    await expect(clientModule.getSupabaseBrowserClient()).resolves.toBe(browserClient);
    await expect(clientModule.getSupabaseBrowserClient()).resolves.toBe(browserClient);
    expect(createBrowserClient).toHaveBeenCalledTimes(1);
    expect(createBrowserClient).toHaveBeenCalledWith('https://example.supabase.co', 'anon-key');
  });

  it('falls back to null when the browser client import fails', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');

    vi.doMock('@supabase/ssr', () => {
      throw new Error('failed to load supabase browser client');
    });

    const clientModule = await import('./client');
    await expect(clientModule.getSupabaseBrowserClient()).resolves.toBeNull();
  });
});
