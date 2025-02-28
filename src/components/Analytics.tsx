'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Function to track events (exported for use in other components)
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, string | number | boolean> = {}
) => {
  // Only run in production
  if (process.env.NODE_ENV !== 'production') return;

  // This is where you would integrate with your analytics provider
  
  // Example for Google Analytics (GA4)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore - gtag is not typed
    window.gtag('event', eventName, eventParams);
  }
};

// Client component that uses useSearchParams
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Track page view
    trackPageView(url);
  }, [pathname, searchParams]);

  // Function to track page views
  const trackPageView = (url: string) => {
    // This is where you would integrate with your analytics provider
    // For example, Google Analytics, Plausible, Fathom, etc.
    
    // Example for Google Analytics (GA4)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore - gtag is not typed
      window.gtag('config', 'G-MEASUREMENT_ID', {
        page_path: url,
      });
    }
  };

  // This component doesn't render anything
  return null;
}

/**
 * Analytics component for tracking page views and user interactions
 * This is a client-side component that should be included in the layout
 */
export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}
