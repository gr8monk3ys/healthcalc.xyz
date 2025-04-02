'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from 'react';
import { getSupabaseBrowserClient, isSupabaseEnabled } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  supabaseEnabled: boolean;
  signIn: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

type AuthAction =
  | {
      type: 'resolve';
      user: AuthUser | null;
    }
  | {
      type: 'sign-out';
    };

function mapSupabaseUser(su: SupabaseUser): AuthUser {
  return {
    id: su.id,
    email: su.email ?? '',
    name: su.user_metadata?.name ?? su.email ?? '',
    createdAt: su.created_at,
  };
}

interface AuthProviderProps {
  children: ReactNode;
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'resolve':
      return {
        user: action.user,
        isLoading: false,
      };
    case 'sign-out':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

/**
 * AuthProvider that integrates with Supabase Auth when env vars are set,
 * and falls back to an unauthenticated stub when they are not.
 */
export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const enabled = isSupabaseEnabled();
  const [authState, dispatchAuthState] = useReducer(authReducer, {
    user: null,
    isLoading: enabled,
  });
  const { user, isLoading } = authState;

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    async function hydrateAuth() {
      const supabase = await getSupabaseBrowserClient();
      if (!supabase) {
        if (!cancelled) {
          dispatchAuthState({ type: 'resolve', user: null });
        }
        return;
      }

      const { data } = await supabase.auth.getUser();
      if (!cancelled) {
        dispatchAuthState({
          type: 'resolve',
          user: data.user ? mapSupabaseUser(data.user) : null,
        });
      }

      if (cancelled) {
        return;
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (cancelled) {
          return;
        }
        dispatchAuthState({
          type: 'resolve',
          user: session?.user ? mapSupabaseUser(session.user) : null,
        });
      });

      if (cancelled) {
        subscription.unsubscribe();
        return;
      }

      unsubscribe = () => {
        subscription.unsubscribe();
      };
    }

    void hydrateAuth();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [enabled]);

  const signIn = useCallback(
    async (email: string): Promise<{ error: string | null }> => {
      if (!enabled) {
        return { error: 'Authentication is not configured.' };
      }

      const supabase = await getSupabaseBrowserClient();
      if (!supabase) {
        return { error: 'Authentication is not configured.' };
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // After clicking the magic link, redirect back to the site.
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    },
    [enabled]
  );

  const signOut = useCallback(async (): Promise<void> => {
    const supabase = await getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    dispatchAuthState({ type: 'sign-out' });
  }, []);

  const value: AuthContextState = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    supabaseEnabled: enabled,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
