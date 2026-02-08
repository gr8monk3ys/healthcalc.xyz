'use client';

import React from 'react';
import Link from 'next/link';
import { SavedResultsList } from '@/components/SaveResult';
import { useAuth } from '@/context/AuthContext';

export default function SavedResultsPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-bold">Saved Results</h1>
      <p className="mb-8 text-gray-600">
        Keep your favorite calculator outputs here so you can revisit them any time.
      </p>

      {!isAuthenticated ? (
        <div className="neumorph rounded-lg p-6">
          <h2 className="mb-2 text-xl font-semibold">You are not signed in</h2>
          <p className="mb-4 text-gray-700">
            Use the Sign In button in the header to sign in or create an account. Saved results are
            stored locally in your browser.
          </p>
          <Link href="/" className="text-accent font-medium hover:underline">
            Go back home →
          </Link>
        </div>
      ) : (
        <SavedResultsList />
      )}
    </div>
  );
}
