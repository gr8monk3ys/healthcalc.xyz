'use client';

import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs';

interface AuthContextState {
  user: { email: string; name: string } | null;
  isAuthenticated: boolean;
  signIn: () => never;
  signUp: () => never;
  signOut: () => Promise<void>;
}

/**
 * Backward-compatible auth hook shim.
 * Auth is now managed by Clerk.
 */
export function useAuth(): AuthContextState {
  const { user } = useUser();
  const { signOut } = useClerkAuth();

  return {
    user: user
      ? {
          email: user.primaryEmailAddress?.emailAddress ?? '',
          name: user.fullName ?? user.firstName ?? 'User',
        }
      : null,
    isAuthenticated: Boolean(user),
    signIn: () => {
      throw new Error('Direct signIn is deprecated. Use Clerk SignInButton or <SignIn />.');
    },
    signUp: () => {
      throw new Error('Direct signUp is deprecated. Use Clerk SignUpButton or <SignUp />.');
    },
    signOut,
  };
}
