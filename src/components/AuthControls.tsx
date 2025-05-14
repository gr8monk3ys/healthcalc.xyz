'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import AuthProviderBoundary from '@/components/providers/AuthProviderBoundary';
import { useLocale } from '@/context/LocaleContext';
import { useAuth } from '@/context/AuthContext';

const UserMenu = dynamic(() => import('@/components/auth/UserMenu'), {
  ssr: false,
  loading: () => (
    <div className="elevated-pill flex h-9 items-center rounded-full px-4 py-2 text-sm font-semibold text-accent">
      Account
    </div>
  ),
});

function AuthControlsContent(): React.JSX.Element {
  const { t } = useLocale();
  const { supabaseEnabled } = useAuth();

  if (supabaseEnabled) {
    return (
      <div className="flex items-center gap-2">
        <UserMenu />
      </div>
    );
  }

  // Fallback: simple link when Supabase is not configured.
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/saved-results"
        className="elevated-pill rounded-full px-4 py-2 text-sm font-semibold text-accent transition-all hover:-translate-y-0.5"
      >
        {t('auth.login')}
      </Link>
    </div>
  );
}

export default function AuthControls(): React.JSX.Element {
  return (
    <AuthProviderBoundary>
      <AuthControlsContent />
    </AuthProviderBoundary>
  );
}
