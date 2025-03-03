'use client';

import React from 'react';
import Head from 'next/head';

interface SocialMetaProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * SocialMeta component for implementing Open Graph and Twitter card metadata
 * Improves appearance of shared links on social media platforms
 */
export default function SocialMeta({
  title,
  description,
  url = '',
  image = '/images/og-image.jpg',
  type = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@healthcheck',
  twitterCreator = '@healthcheck',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SocialMetaProps) {
  // Base URL for absolute URLs
  const baseUrl = 'https://www.healthcheck.com';
  
  // Ensure image URL is absolute
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  
  // Ensure page URL is absolute
  const pageUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`) : baseUrl;
  
  return (
    <Head>
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="HealthCheck" />
      <meta property="og:locale" content="en_US" />
      
      {/* Additional Open Graph tags for articles */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.length > 0 && 
        tags.map((tag, index) => (
          <meta key={`tag-${index}`} property="article:tag" content={tag} />
        ))
      }
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Image dimensions for Twitter (if available) */}
      <meta name="twitter:image:alt" content={title} />
    </Head>
  );
}
