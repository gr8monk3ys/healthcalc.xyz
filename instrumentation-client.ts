/**
 * Client-side Instrumentation File
 *
 * This file configures Sentry for client-side error tracking in the browser.
 * Sentry DSN should be set in .env.local as NEXT_PUBLIC_SENTRY_DSN
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    replaysOnErrorSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // You can remove this option if you're not planning to use the Sentry Session Replay feature:
    integrations: [
      Sentry.replayIntegration({
        // Additional Replay configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Environment
    environment: process.env.NODE_ENV,

    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      // Facebook borked
      'fb_xd_fragment',
      // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
      // reduce this. (thanks @acdha)
      'bmi_SafeAddOnload',
      'EBCallBackMessageReceived',
      // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
      'conduitPage',
      // Generic error messages
      'Script error',
      'Script error.',
      // Network errors
      'NetworkError',
      'Network request failed',
      'Failed to fetch',
      'Load failed',
      // Chunk loading errors (usually from outdated cached bundles)
      'ChunkLoadError',
      'Loading chunk',
      'Loading CSS chunk',
    ],

    // Ignore errors from browser extensions
    denyUrls: [
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extension:\/\//i,
      // Firefox extensions
      /^moz-extension:\/\//i,
      // Safari extensions
      /^safari-extension:\/\//i,
    ],

    // Custom event processing
    beforeSend(event, hint) {
      // Filter out errors from development
      if (process.env.NODE_ENV === 'development') {
        console.error('Sentry captured error:', hint.originalException || event);
      }

      // Don't send events in development unless explicitly enabled
      if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SENTRY_DEV_ENABLED) {
        return null;
      }

      return event;
    },
  });
} else {
  console.warn('Sentry DSN not configured. Error tracking is disabled.');
}

/**
 * Export onRouterTransitionStart for Next.js App Router integration
 * This hook is called when a navigation starts in the App Router
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
