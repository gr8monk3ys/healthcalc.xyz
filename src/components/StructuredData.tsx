'use client';

import { useEffect } from 'react';
// Import schema utility functions for re-export
import * as schemaUtils from '@/utils/schema';

// Re-export all schema utility functions
export const {
  createOrganizationSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createArticleSchema,
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
  useEffect(() => {
    // Only add structured data on the client side
    if (typeof window !== 'undefined') {
      // Remove any existing structured data with the same @type to avoid duplicates
      const existingScripts = document.querySelectorAll(`script[type="application/ld+json"]`);

      existingScripts.forEach(script => {
        try {
          const scriptData = JSON.parse(script.textContent || '{}');
          if (scriptData['@type'] === data['@type']) {
            script.remove();
          }
        } catch (e) {
          // If parsing fails, leave the script alone
          console.error('Error parsing existing JSON-LD:', e);
        }
      });
    }
  }, [data]);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
