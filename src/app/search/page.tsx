import React from 'react';
import { Metadata } from 'next';
import { SearchPage } from '@/components/Search';
import StructuredData from '@/components/StructuredData';

// Metadata for the search page
export const metadata: Metadata = {
  title: 'Search | HealthCheck',
  description:
    'Search for health and fitness calculators, articles, and information on HealthCheck.',
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Search page component
 * Uses the SearchPage component from @/components/Search
 */
export default function Search() {
  return (
    <>
      <SearchPage />

      {/* Structured data for breadcrumb */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.heathcheck.info/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Search',
              item: 'https://www.heathcheck.info/search',
            },
          ],
        }}
      />

      {/* Structured data for search action */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: 'https://www.heathcheck.info/',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://www.heathcheck.info/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        }}
      />
    </>
  );
}
