'use client';

import React from 'react';
import { AFFILIATE_DISCLOSURE } from '@/constants/affiliates';

interface AffiliateDisclosureProps {
  className?: string;
  variant?: 'short' | 'full';
}

export default function AffiliateDisclosure({
  className = '',
  variant = 'full',
}: AffiliateDisclosureProps) {
  const text = variant === 'short' ? AFFILIATE_DISCLOSURE.short : AFFILIATE_DISCLOSURE.full;

  return (
    <div className={`neumorph p-6 rounded-lg my-8 bg-gray-50 dark:bg-gray-800 ${className}`}>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>Disclosure:</strong> {text}
      </p>
    </div>
  );
}
