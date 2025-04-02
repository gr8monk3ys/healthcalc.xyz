import { act, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { getSupabaseBrowserClient, isSupabaseEnabled } = vi.hoisted(() => ({
  getSupabaseBrowserClient: vi.fn(),
  isSupabaseEnabled: vi.fn(),
}));

vi.mock('@/lib/supabase/client', () => ({
  getSupabaseBrowserClient,
  isSupabaseEnabled,
}));

import { AuthProvider } from './AuthContext';

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isSupabaseEnabled.mockReturnValue(true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not register an auth listener after unmount while hydration is pending', async () => {
    const getUserDeferred = createDeferred<{ data: { user: null } }>();
    const unsubscribe = vi.fn();
    const onAuthStateChange = vi.fn(() => ({
      data: { subscription: { unsubscribe } },
    }));

    getSupabaseBrowserClient.mockResolvedValue({
      auth: {
        getUser: vi.fn(() => getUserDeferred.promise),
        onAuthStateChange,
      },
    });

    const { unmount } = render(
      <AuthProvider>
        <div>child</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getSupabaseBrowserClient).toHaveBeenCalledTimes(1);
    });

    unmount();

    await act(async () => {
      getUserDeferred.resolve({ data: { user: null } });
      await getUserDeferred.promise;
    });

    expect(onAuthStateChange).not.toHaveBeenCalled();
    expect(unsubscribe).not.toHaveBeenCalled();
  });

  it('unsubscribes the auth listener on unmount after registration', async () => {
    const unsubscribe = vi.fn();
    const onAuthStateChange = vi.fn(() => ({
      data: { subscription: { unsubscribe } },
    }));

    getSupabaseBrowserClient.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
        onAuthStateChange,
      },
    });

    const { unmount } = render(
      <AuthProvider>
        <div>child</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(onAuthStateChange).toHaveBeenCalledTimes(1);
    });

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
