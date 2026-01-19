'use client';

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
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            padding: '1rem',
          }}
        >
          <div style={{ maxWidth: '32rem', width: '100%' }}>
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '2rem',
              }}
            >
              {/* Error Icon */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    backgroundColor: '#fee2e2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    style={{ width: '2rem', height: '2rem', color: '#dc2626' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Message */}
              <h1
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}
              >
                Application Error
              </h1>

              <p
                style={{
                  color: '#6b7280',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                A critical error occurred. Please refresh the page or try again later.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <div
                  style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '0.5rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                      color: '#1f2937',
                      wordBreak: 'break-word',
                    }}
                  >
                    {error.message || 'Unknown error'}
                  </p>
                  {error.digest && (
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={reset}
                  style={{
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    fontWeight: '500',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
                >
                  Try Again
                </button>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/"
                  style={{
                    backgroundColor: '#e5e7eb',
                    color: '#111827',
                    fontWeight: '500',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#d1d5db')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                >
                  Go Home
                </a>
              </div>

              {/* Help Text */}
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  textAlign: 'center',
                  marginTop: '1.5rem',
                }}
              >
                If this problem persists, please{' '}
                <a
                  href="/contact"
                  style={{ color: '#4f46e5', textDecoration: 'underline' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#4338ca')}
                  onMouseOut={e => (e.currentTarget.style.color = '#4f46e5')}
                >
                  contact support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
