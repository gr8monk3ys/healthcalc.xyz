'use client';

import React from 'react';
import { Metadata } from 'next';
import { SearchPage } from '@/components/Search';
import StructuredData from '@/components/StructuredData';
import CanonicalUrl from '@/components/CanonicalUrl';

// Metadata for the search page
export const metadata: Metadata = {
  title: 'Search | HealthCheck',
  description: 'Search for health and fitness calculators, articles, and information on HealthCheck.',
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
      <CanonicalUrl path="/search" />
      
      <SearchPage />
      
      {/* Structured data for breadcrumb */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://www.healthcheck.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Search',
              'item': 'https://www.healthcheck.com/search'
            }
          ]
        }}
      />
      
      {/* Structured data for search action */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'url': 'https://www.healthcheck.com/',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://www.healthcheck.com/search?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        }}
      />
    </>
  );
}
