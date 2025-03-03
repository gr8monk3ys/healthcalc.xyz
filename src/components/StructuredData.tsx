'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
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
      const existingScripts = document.querySelectorAll(
        `script[type="application/ld+json"]`
      );
      
      existingScripts.forEach((script) => {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper functions to create common schema types

/**
 * Creates Organization schema for the website
 */
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HealthCheck',
    url: 'https://www.healthcheck.com',
    logo: 'https://www.healthcheck.com/icons/icon-512x512.png',
    sameAs: [
      // Add social media profiles when available
      // 'https://www.facebook.com/healthcheck',
      // 'https://www.twitter.com/healthcheck',
      // 'https://www.instagram.com/healthcheck',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@healthcheck.com',
      url: 'https://www.healthcheck.com/contact',
    },
  };
}

/**
 * Creates WebSite schema for the website
 */
export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HealthCheck',
    url: 'https://www.healthcheck.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.healthcheck.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Creates BreadcrumbList schema for navigation
 */
export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Creates FAQPage schema for calculator pages
 */
export function createFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/**
 * Creates Article schema for blog posts
 */
export function createArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl || 'https://www.healthcheck.com/images/og-image.jpg',
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HealthCheck',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.healthcheck.com/icons/icon-512x512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Creates SoftwareApplication schema for calculator tools
 */
export function createCalculatorSchema({
  name,
  description,
  url,
  applicationCategory = 'HealthApplication',
  operatingSystem = 'Web',
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    applicationCategory: applicationCategory,
    operatingSystem: operatingSystem,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: url,
  };
}
