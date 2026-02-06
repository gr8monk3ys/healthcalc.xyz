'use client';

import React from 'react';
import Link from 'next/link';
import { SavedResultsList } from '@/components/SaveResult';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { clerkEnabled } from '@/utils/auth';

export default function SavedResultsPage() {
  if (!clerkEnabled) {
    return (
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Saved Results</h1>
        <p className="mb-8 text-gray-600">
          Clerk auth is not configured yet. Add Clerk environment variables to enable account-based
          saved results.
        </p>
        <SavedResultsList />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-bold">Saved Results</h1>
      <p className="mb-8 text-gray-600">
        Keep your favorite calculator outputs here so you can revisit them any time.
      </p>

      <SignedOut>
        <div className="neumorph rounded-lg p-6">
          <h2 className="mb-2 text-xl font-semibold">You are not signed in</h2>
          <p className="mb-4 text-gray-700">
            Sign in to save and access your results. Saved results are tied to your Clerk account in
            this browser.
          </p>
          <div className="flex items-center gap-4">
            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-dark"
              >
                Sign in
              </button>
            </SignInButton>
            <Link href="/" className="text-accent font-medium hover:underline">
              Go back home →
            </Link>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <SavedResultsList />
      </SignedIn>
    </div>
  );
}
