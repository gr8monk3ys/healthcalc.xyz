'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

export default function AuthProviderBoundary({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}
