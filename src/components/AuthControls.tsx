'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { clerkEnabled } from '@/utils/auth';

/**
 * Dynamically loaded Clerk auth controls - client-side only to avoid SSG issues.
 */
const ClerkAuthControls = clerkEnabled
  ? dynamic(() => import('@/components/ClerkAuthControls'), {
      ssr: false,
      loading: () => (
        <div className="flex items-center gap-2">
          <div className="h-9 w-16 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-9 w-20 rounded-full bg-gray-200 animate-pulse" />
        </div>
      ),
    })
  : null;

function FallbackAuthControls(): React.JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="elevated-pill rounded-full px-4 py-2 text-sm font-semibold text-accent transition-all hover:-translate-y-0.5"
      >
        Log in
      </Link>
      <Link
        href="/sign-up"
        className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
      >
        Sign up
      </Link>
    </div>
  );
}

export default function AuthControls(): React.JSX.Element {
  if (ClerkAuthControls) {
    return <ClerkAuthControls />;
  }

  return <FallbackAuthControls />;
}
