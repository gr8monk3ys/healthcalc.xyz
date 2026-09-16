'use client';

import { useEffect } from 'react';

/**
 * Reports a 404 hit to Google Analytics (when the consent-gated gtag loader
 * has run). Kept as its own tiny client island so `not-found.tsx` can stay a
 * server component: Next ships the not-found chunk on every route, and the
 * old client-side page dragged `next/script` internals into the home page's
 * first-load JavaScript.
 */
export default function NotFoundTracker(): null {
  useEffect(() => {
    // Only run in production and if analytics is available
    if (process.env.NODE_ENV === 'production' && 'gtag' in window) {
      // @ts-expect-error - gtag is not typed
      window.gtag('event', '404_error', {
        event_category: 'error',
        event_label: window.location.pathname,
        non_interaction: true,
      });
    }
  }, []);

  return null;
}
