'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useCookieConsent } from '@/components/CookieConsent';

const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => mod.Analytics), {
  ssr: false,
});

export default function VercelAnalyticsGate(): React.JSX.Element | null {
  const { analytics } = useCookieConsent();
  if (!analytics) return null;
  return <Analytics />;
}
