'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

/**
 * DEPRECATED: This component is no longer needed with Next.js App Router.
 * Canonical URLs are now configured in the metadata export in layout.tsx and page.tsx files
 * through the metadataBase and alternates.canonical properties.
 * 
 * Example:
 * ```
 * export const metadata = {
 *   metadataBase: new URL('https://www.heathcheck.info'),
 *   alternates: {
 *     canonical: '/path',
 *   }
 * };
 * ```
 */
export default function CanonicalUrl() {
  console.warn('CanonicalUrl component is deprecated with Next.js App Router. Use metadata export instead.');
  return null;
}
