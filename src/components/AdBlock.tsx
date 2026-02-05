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
    <div className={`my-8 flex justify-center ${className}`}>
      <AdUnit slot={slot} format={format} fullWidth={fullWidth} />
    </div>
  );
}
