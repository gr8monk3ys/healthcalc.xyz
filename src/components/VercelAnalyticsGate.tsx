'use client';

import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useCookieConsent } from '@/components/CookieConsent';

export default function VercelAnalyticsGate(): React.JSX.Element | null {
  const { analytics } = useCookieConsent();
  if (!analytics) return null;
  return <Analytics />;
}
