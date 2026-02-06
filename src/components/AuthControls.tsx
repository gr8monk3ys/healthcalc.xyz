'use client';

import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { clerkEnabled } from '@/utils/auth';

export default function AuthControls() {
  if (!clerkEnabled) {
    return (
      <Link
        href="/saved-results"
        className="rounded-full border border-accent/20 bg-white px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
      >
        Saved results
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <SignInButton mode="modal">
          <button
            type="button"
            className="rounded-full border border-accent/20 bg-white px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
          >
            Log in
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button
            type="button"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Sign up
          </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <Link
          href="/saved-results"
          className="hidden rounded-full border border-accent/20 bg-white px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5 sm:inline-block"
        >
          Saved results
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
