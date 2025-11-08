/**
 * Next.js Instrumentation File
 *
 * This file is automatically loaded by Next.js when the server starts.
 * It's used to initialize Sentry and other monitoring tools on the server side.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

import * as Sentry from '@sentry/nextjs';

/**
 * onRequestError is called when an unhandled error occurs in the server
 * This helps capture server-side errors automatically
 */
export async function onRequestError(
  error: Error,
  request: {
    method: string;
    url: string;
    headers: Headers;
  }
) {
  // Capture the error with Sentry
  Sentry.captureException(error, {
    contexts: {
      nextjs: {
        request: {
          method: request.method,
          url: request.url,
          headers: Object.fromEntries(request.headers.entries()),
        },
      },
    },
  });
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation
    const { init } = await import('@sentry/nextjs');
    const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

    if (SENTRY_DSN) {
      init({
        dsn: SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        debug: false,
        environment: process.env.NODE_ENV,

        ignoreErrors: [
          'Script error',
          'Script error.',
          'NetworkError',
          'Network request failed',
          'Failed to fetch',
          'Load failed',
          'ECONNRESET',
          'ENOTFOUND',
          'ETIMEDOUT',
        ],

        beforeSend(event, hint) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Sentry captured error (server):', hint.originalException || event);
          }

          if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SENTRY_DEV_ENABLED) {
            return null;
          }

          return event;
        },
      });
    } else {
      console.warn('Sentry DSN not configured. Server-side error tracking is disabled.');
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    const { init } = await import('@sentry/nextjs');
    const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

    if (SENTRY_DSN) {
      init({
        dsn: SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        debug: false,
        environment: process.env.NODE_ENV,
      });
    }
  }
}
