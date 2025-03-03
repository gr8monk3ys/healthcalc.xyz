'use client';

import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface CanonicalUrlProps {
  path?: string;
  baseUrl?: string;
}

/**
 * CanonicalUrl component for setting the canonical URL
 * Helps prevent duplicate content issues for SEO
 */
export default function CanonicalUrl({
  path,
  baseUrl = 'https://www.healthcheck.com',
}: CanonicalUrlProps) {
  const pathname = usePathname();
  
  // Use provided path or current pathname
  const canonicalPath = path || pathname || '';
  
  // Normalize path (remove trailing slash except for homepage)
  const normalizedPath = canonicalPath === '/' 
    ? '/' 
    : canonicalPath.endsWith('/') 
      ? canonicalPath.slice(0, -1) 
      : canonicalPath;
  
  // Construct full canonical URL
  const canonicalUrl = `${baseUrl}${normalizedPath}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
