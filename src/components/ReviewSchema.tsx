'use client';

import React from 'react';
import StructuredData from '@/components/StructuredData';
import { getPublicSiteUrl, toAbsoluteUrl } from '@/lib/site';

interface ReviewSchemaProps {
  productName: string;
  description: string;
  image?: string;
  url?: string;
  brand?: string;
  sku?: string;
  mpn?: string;
  gtin?: string;
  category?: string;
  price?: number;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  reviewCount: number;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  reviews?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    ratingValue: number;
  }>;
}

/**
 * ReviewSchema component for implementing schema markup for product reviews
 * Helps with rich snippets in search results
 */
export default function ReviewSchema({
  productName,
  description,
  image = '',
  url = '',
  brand = '',
  sku = '',
  mpn = '',
  gtin = '',
  category = '',
  price,
  priceCurrency = 'USD',
  availability = 'InStock',
  reviewCount,
  ratingValue,
  bestRating = 5,
  worstRating = 1,
  reviews = [],
}: ReviewSchemaProps) {
  // Base URL for absolute URLs
  const baseUrl = getPublicSiteUrl();

  // Ensure image URL is absolute
  const imageUrl = image ? (image.startsWith('http') ? image : toAbsoluteUrl(image)) : '';

  // Ensure product URL is absolute
  const productUrl = url ? (url.startsWith('http') ? url : toAbsoluteUrl(url)) : '';

  // Generate aggregate rating schema
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: ratingValue,
    reviewCount: reviewCount,
    bestRating: bestRating,
    worstRating: worstRating,
  };

  // Generate review schema for individual reviews
  const reviewsSchema = reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: bestRating,
      worstRating: worstRating,
    },
  }));

  // Generate offers schema if price is provided
  const offers = price
    ? {
        '@type': 'Offer',
        price: price,
        priceCurrency: priceCurrency,
        availability: `https://schema.org/${availability}`,
        url: productUrl || baseUrl,
      }
    : undefined;

  // Generate complete product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: description,
    image: imageUrl,
    aggregateRating: aggregateRating,
    review: reviewsSchema.length > 0 ? reviewsSchema : undefined,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    sku: sku || undefined,
    mpn: mpn || undefined,
    gtin: gtin || undefined,
    category: category || undefined,
    offers: offers,
  };

  // Remove undefined properties
  const cleanSchema = JSON.parse(JSON.stringify(productSchema));

  return <StructuredData data={cleanSchema} />;
}
