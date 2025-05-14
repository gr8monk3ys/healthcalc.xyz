'use client';

import React from 'react';
import AuthProviderBoundary from '@/components/providers/AuthProviderBoundary';
import { SavedResultsProvider } from '@/context/SavedResultsContext';

export default function AuthSavedResultsProviders({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <AuthProviderBoundary>
      <SavedResultsProvider>{children}</SavedResultsProvider>
    </AuthProviderBoundary>
  );
}
