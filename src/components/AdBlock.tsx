'use client';

import React from 'react';
import AdUnit from '@/components/AdUnit';

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
  if (!slot) return null;

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
