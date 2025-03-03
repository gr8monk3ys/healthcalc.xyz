'use client';

import React from 'react';
import Image from 'next/image';
import { generateImageMetadata } from '@/utils/seo';

interface SEOImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  caption?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
  addMetadata?: boolean;
}

/**
 * SEOImage component for optimized images with proper alt text
 * Improves SEO by providing proper image metadata and accessibility
 */
export default function SEOImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  caption,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  addMetadata = true,
}: SEOImageProps) {
  // Ensure alt text is provided
  if (!alt) {
    console.warn('SEOImage: Alt text is required for accessibility and SEO');
  }

  // Generate image metadata for structured data
  const imageMetadata = addMetadata
    ? generateImageMetadata(src, alt, width, height)
    : null;

  return (
    <figure className={`relative ${className}`}>
      <div
        className="overflow-hidden rounded-lg"
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          sizes={sizes}
          loading={loading}
          className="rounded-lg w-full h-auto"
        />
      </div>
      
      {caption && (
        <figcaption className="text-sm text-gray-500 mt-2 text-center">
          {caption}
        </figcaption>
      )}
      
      {/* Add structured data for the image */}
      {addMetadata && imageMetadata && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ImageObject',
              contentUrl: imageMetadata.url,
              width: imageMetadata.width,
              height: imageMetadata.height,
              caption: caption || alt,
            }),
          }}
        />
      )}
    </figure>
  );
}
