/**
 * @vitest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

interface CookieMutation {
  name: string;
  value: string;
  options?: Record<string, unknown>;
}

interface ServerClientOptions {
  cookies: {
    getAll: () => Array<{ name: string; value: string }>;
    setAll: (cookiesToSet: CookieMutation[]) => void;
  };
}

describe('supabase server client helpers', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unmock('@supabase/ssr');
    vi.unmock('next/headers');
  });

  it('returns null when Supabase is not configured', async () => {
    const serverModule = await import('./server');
    await expect(serverModule.getSupabaseServerClient()).resolves.toBeNull();
  });

  it('creates a server client and proxies cookie reads and writes', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');

    const cookieStore = {
      getAll: vi.fn(() => [{ name: 'sb-access-token', value: 'token' }]),
      set: vi.fn(),
    };
    const cookies = vi.fn(async () => cookieStore);
    const createServerClient = vi.fn((url: string, key: string, options: ServerClientOptions) => ({
      url,
      key,
      options,
    }));

    vi.doMock('next/headers', () => ({ cookies }));
    vi.doMock('@supabase/ssr', () => ({ createServerClient }));

    const serverModule = await import('./server');
    const client = await serverModule.getSupabaseServerClient();

    expect(cookies).toHaveBeenCalledTimes(1);
    expect(createServerClient).toHaveBeenCalledTimes(1);
    expect(client).toMatchObject({
      url: 'https://example.supabase.co',
      key: 'anon-key',
    });

    const options = createServerClient.mock.calls[0]?.[2];
    expect(options.cookies.getAll()).toEqual([{ name: 'sb-access-token', value: 'token' }]);
    options.cookies.setAll([
      {
        name: 'sb-refresh-token',
        value: 'refresh',
        options: { httpOnly: true },
      },
    ]);
    expect(cookieStore.set).toHaveBeenCalledWith('sb-refresh-token', 'refresh', {
      httpOnly: true,
    });
  });

  it('swallows cookie write failures from read-only stores', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');

    const cookieStore = {
      getAll: vi.fn(() => []),
      set: vi.fn(() => {
        throw new Error('read only');
      }),
    };
    const cookies = vi.fn(async () => cookieStore);
    const createServerClient = vi.fn((url: string, key: string, options: ServerClientOptions) => ({
      url,
      key,
      options,
    }));

    vi.doMock('next/headers', () => ({ cookies }));
    vi.doMock('@supabase/ssr', () => ({ createServerClient }));

    const serverModule = await import('./server');
    await serverModule.getSupabaseServerClient();

    const options = createServerClient.mock.calls[0]?.[2];
    expect(() =>
      options.cookies.setAll([
        {
          name: 'sb-refresh-token',
          value: 'refresh',
          options: { secure: true },
        },
      ])
    ).not.toThrow();
  });
});
