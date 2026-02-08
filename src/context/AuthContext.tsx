'use client';

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { clerkEnabled } from '@/utils/auth';

// Conditionally import useUser only when Clerk is enabled
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let useUser: () => { isSignedIn: boolean | undefined; user: any };

if (clerkEnabled) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const clerk = require('@clerk/nextjs');
  useUser = clerk.useUser;
} else {
  useUser = () => ({ isSignedIn: undefined, user: null });
}

export interface AuthUser {
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const { isSignedIn, user: clerkUser } = useUser();

  const user: AuthUser | null = useMemo(() => {
    if (!isSignedIn || !clerkUser) {
      return null;
    }

    return {
      email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
      name:
        clerkUser.fullName ??
        clerkUser.firstName ??
        clerkUser.primaryEmailAddress?.emailAddress ??
        '',
      createdAt: clerkUser.createdAt
        ? new Date(clerkUser.createdAt).toISOString()
        : new Date().toISOString(),
    };
  }, [isSignedIn, clerkUser]);

  const value = useMemo<AuthContextState>(
    () => ({
      user,
      isAuthenticated: Boolean(isSignedIn),
    }),
    [user, isSignedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
