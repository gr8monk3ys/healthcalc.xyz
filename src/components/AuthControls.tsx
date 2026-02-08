'use client';

import React from 'react';
import Link from 'next/link';
import { clerkEnabled } from '@/utils/auth';

function ClerkAuthControls(): React.JSX.Element {
  // Dynamic import to avoid loading Clerk when not configured
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } = require('@clerk/nextjs');

  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton mode="redirect">
            <button
              type="button"
              className="rounded-full border border-accent/20 bg-white px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
            >
              Log in
            </button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <button
              type="button"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Sign up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-2">
          <Link
            href="/saved-results"
            className="rounded-full border border-accent/20 bg-white px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
          >
            Saved results
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </>
  );
}

function FallbackAuthControls(): React.JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="rounded-full border border-accent/20 bg-white px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
      >
        Log in
      </Link>
      <Link
        href="/sign-up"
        className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        Sign up
      </Link>
    </div>
  );
}

export default function AuthControls(): React.JSX.Element {
  if (clerkEnabled) {
    return <ClerkAuthControls />;
  }

  return <FallbackAuthControls />;
}
