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
 * This helps search engines better understand the content and can improve rich snippets.
 *
 * A plain inline <script type="application/ld+json">: it is data, not code, so
 * it needs no loading strategy, and rendering it directly (no client boundary,
 * no next/script) puts it in the server HTML where crawlers read it.
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const schemaType = typeof data['@type'] === 'string' ? data['@type'] : 'unknown';
  const schemaJson = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      data-schema-type={schemaType}
      dangerouslySetInnerHTML={{ __html: schemaJson }}
    />
  );
}
