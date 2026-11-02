'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { BeforeSendEvent } from '@vercel/analytics/react';
import { useCookieConsent } from '@/components/CookieConsent';
import { withoutQueryString } from '@/lib/analyticsRedaction';

const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => mod.Analytics), {
  ssr: false,
});

export default function VercelAnalyticsGate(): React.JSX.Element | null {
  const { analytics } = useCookieConsent();

  // Unmounting <Analytics /> does not unload its script, so a visitor who
  // withdraws consent mid-session is covered by dropping events as they leave.
  const consented = useRef(analytics);
  useEffect(() => {
    consented.current = analytics;
  }, [analytics]);

  const beforeSend = useCallback(
    (event: BeforeSendEvent) => (consented.current ? withoutQueryString(event) : null),
    []
  );

  if (!analytics) return null;
  return <Analytics beforeSend={beforeSend} />;
}
