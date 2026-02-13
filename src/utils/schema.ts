/**
 * Utility functions for creating structured data schemas
 * These can be used in both client and server components
 */
import { getPublicSiteUrl, toAbsoluteUrl } from '@/lib/site';

const siteUrl = getPublicSiteUrl();

/**
 * Creates Organization schema for the website
 */
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HealthCheck',
    url: siteUrl,
    logo: toAbsoluteUrl('/icons/icon-512x512.png'),
    sameAs: [
      // Add social media profiles when available
      // 'https://www.facebook.com/healthcheck',
      // 'https://www.twitter.com/healthcheck',
      // 'https://www.instagram.com/healthcheck',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@healthcalc.xyz',
      url: toAbsoluteUrl('/contact'),
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
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
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
    mainEntity: questions.map(q => ({
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
    image: imageUrl || toAbsoluteUrl('/images/og-image.jpg'),
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
        url: toAbsoluteUrl('/icons/icon-512x512.png'),
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
