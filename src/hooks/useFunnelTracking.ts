'use client';

import { useCallback } from 'react';
import { track as vercelTrack } from '@vercel/analytics';
import { useCookieConsent } from '@/components/CookieConsent';

export type FunnelEvent =
  | 'calculator_complete'
  | 'results_share_copy_link'
  | 'results_share_download_image'
  | 'newsletter_subscribe'
  | 'affiliate_click';

export type FunnelEventProps = Record<string, string | number | boolean | undefined>;

function stripUndefined(props: FunnelEventProps): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) continue;
    cleaned[key] = value;
  }
  return cleaned;
}

export function useFunnelTracking(): {
  canTrack: boolean;
  trackEvent: (name: FunnelEvent, props?: FunnelEventProps) => void;
} {
  const { analytics } = useCookieConsent();

  const canTrack = analytics && process.env.NODE_ENV === 'production';

  const trackEvent = useCallback(
    (name: FunnelEvent, props: FunnelEventProps = {}) => {
      if (!canTrack) return;
      const payload = stripUndefined(props);

      try {
        vercelTrack(name, payload);
      } catch {
        // Ignore tracking errors.
      }

      // Optional GA4 bridge (loaded after consent via CookieConsentProvider).
      try {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtag === 'function') {
          gtag('event', name, payload);
        }
      } catch {
        // Ignore tracking errors.
      }
    },
    [canTrack]
  );

  return { canTrack, trackEvent };
}
