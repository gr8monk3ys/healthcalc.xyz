'use client';

import React, { useEffect, useState } from 'react';
import AdUnit from '@/components/AdUnit';
import { useCookieConsent } from '@/components/CookieConsent';
import { shouldLoadAdSense } from '@/lib/adsense';

interface AdBlockProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidth?: boolean;
  className?: string;
}

export default function AdBlock({
  slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT,
  format = 'auto',
  fullWidth = true,
  className = '',
}: AdBlockProps) {
  const { advertising } = useCookieConsent();

  // AdUnit renders nothing without advertising consent or in an automated
  // browser. Rendering the "Advertisement" label anyway left an orphan caption
  // over empty space, which reads as a broken page. Resolve the same
  // conditions here so the label only ever appears with an ad under it.
  const [adsAllowed, setAdsAllowed] = useState(false);
  useEffect(() => {
    setAdsAllowed(shouldLoadAdSense(window));
  }, []);

  if (!slot || !advertising || !adsAllowed) return null;

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 flex flex-col items-center gap-1.5 ${className}`}
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
        Advertisement
      </span>
      <AdUnit slot={slot} format={format} fullWidth={fullWidth} />
    </aside>
  );
}
