import React from 'react';
import Head from 'next/head';

interface MetadataProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

/**
 * Metadata component for SEO optimization
 * This component should be included in all pages to ensure consistent SEO
 */
export default function Metadata({
  title,
  description,
  keywords = 'health calculator, fitness calculator, weight management, body fat, BMI, TDEE',
  ogImage = '/images/og-image.jpg',
  ogUrl,
  canonical,
}: MetadataProps) {
  // Ensure title has site name
  const fullTitle = title.includes('HealthCheck') ? title : `${title} | HealthCheck`;
  
  // Default canonical URL if not provided
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Default OG URL if not provided
  const ogFullUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  return (
    <Head>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical link */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogFullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogFullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional metadata */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#f0f2f5" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
