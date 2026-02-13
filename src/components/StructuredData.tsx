'use client';

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
  const schemaType = typeof data['@type'] === 'string' ? data['@type'] : 'unknown';

  return (
    <script
      type="application/ld+json"
      data-schema-type={schemaType}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
