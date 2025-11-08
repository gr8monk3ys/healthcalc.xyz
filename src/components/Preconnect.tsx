'use client';

import React from 'react';
import Head from 'next/head';

interface PreconnectProps {
  domains?: string[];
}

/**
 * Preconnect component for establishing early connections to external domains
 * Improves performance by reducing connection setup time
 * Helps with Core Web Vitals (LCP, FID, CLS)
 */
export default function Preconnect({ domains = [] }: PreconnectProps) {
  // Default domains to preconnect to
  const defaultDomains = [
    'https://www.google-analytics.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  // Combine default and custom domains, removing duplicates
  const allDomains = Array.from(new Set([...defaultDomains, ...domains]));

  return (
    <Head>
      {allDomains.map(domain => (
        <React.Fragment key={domain}>
          <link rel="preconnect" href={domain} />
          <link rel="dns-prefetch" href={domain} />
        </React.Fragment>
      ))}
    </Head>
  );
}
