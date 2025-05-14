'use client';

import { useId } from 'react';
import Script from 'next/script';

// Import schema utility functions for re-export
import * as schemaUtils from '@/utils/schema';

// Re-export all schema utility functions
export const {
  createOrganizationSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createCalculatorSchema,
} = schemaUtils;

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Component for adding structured data (JSON-LD) to pages
 * This helps search engines better understand the content and can improve rich snippets
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const schemaType = typeof data['@type'] === 'string' ? data['@type'] : 'unknown';
  const scriptId = useId().replace(/:/g, '-');
  const schemaJson = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <Script
      id={`structured-data-${schemaType}-${scriptId}`}
      type="application/ld+json"
      data-schema-type={schemaType}
      strategy="afterInteractive"
    >
      {schemaJson}
    </Script>
  );
}
