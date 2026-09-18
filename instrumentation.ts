/**
 * Next.js Instrumentation File
 *
 * This file is automatically loaded by Next.js when the server starts.
 * It's used to initialize Sentry and other monitoring tools on the server side.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

import * as Sentry from '@sentry/nextjs';
import { sentryEnvironmentTag, shouldReportToSentry } from '@/lib/monitoring';

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
  // Nothing was initialised outside a deploy, so this would be a no-op that
  // still walks the whole event through the SDK. Skip it outright.
  if (!shouldReportToSentry(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN)) {
    return;
  }

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
    const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

    // Deployed Vercel apps only. NODE_ENV is 'production' for a local
    // `next build && next start` too, so the beforeSend guard below never
    // stopped a local production build from spending the shared org error
    // quota. See src/lib/monitoring.ts.
    if (shouldReportToSentry(SENTRY_DSN)) {
      init({
        dsn: SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        debug: false,
        environment: sentryEnvironmentTag(),

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

          if (
            process.env.NODE_ENV === 'development' &&
            !process.env.NEXT_PUBLIC_SENTRY_DEV_ENABLED &&
            process.env.NEXT_PUBLIC_SENTRY_FORCE_ENABLE !== '1'
          ) {
            return null;
          }

          return event;
        },
      });
    } else if (process.env.NODE_ENV !== 'production') {
      console.warn('Sentry is off here: no DSN, or this is not a deployed environment.');
    }
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    const { init } = await import('@sentry/nextjs');
    const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

    if (shouldReportToSentry(SENTRY_DSN)) {
      init({
        dsn: SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        debug: false,
        environment: sentryEnvironmentTag(),
      });
    }
  }
}
