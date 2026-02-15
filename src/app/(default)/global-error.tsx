'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'GlobalError', level: 'critical' });

/**
 * Global error boundary for app-level errors
 * This catches errors that occur in the root layout
 * Must define its own <html> and <body> tags
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errortsx
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.logError('Critical global error occurred', error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <main className="min-h-screen flex items-center justify-center p-4">
          <section className="w-full max-w-xl neumorph border border-accent/10 rounded-neumorph p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-3">Application Error</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              A critical error occurred. Please refresh the page or try again later.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 rounded-lg bg-primary-dark/60">
                <p className="text-sm font-mono break-words">{error.message || 'Unknown error'}</p>
                {error.digest && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={reset}
                className="w-full rounded-lg bg-accent text-white font-semibold px-4 py-3 hover:bg-accent-dark transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="w-full rounded-lg bg-primary-dark text-center font-semibold px-4 py-3 hover:opacity-90 transition-opacity"
              >
                Go Home
              </Link>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
              If this problem persists, please{' '}
              <Link href="/contact" className="text-accent underline underline-offset-2">
                contact support
              </Link>
              .
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}
