'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  caption?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  isLCP?: boolean; // Mark if this is likely to be the Largest Contentful Paint element
}

/**
 * OptimizedImage component for better performance and SEO
 * Extends Next.js Image with additional features like captions and fallbacks
 * Improves Core Web Vitals by optimizing LCP and CLS
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  quality = 85,
  caption,
  loading = 'lazy',
  fetchPriority = 'auto',
  isLCP = false,
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Use true priority if explicitly set or if marked as LCP element
  const shouldPrioritize = priority || isLCP;
  
  // If we're prioritizing, also use eager loading
  const effectiveLoading = shouldPrioritize ? 'eager' : loading;
  
  // For LCP images, we want the highest fetch priority
  const effectiveFetchPriority = shouldPrioritize ? 'high' : fetchPriority;
  
  // For important images (priority/LCP), preload them with a higher quality
  const effectiveQuality = shouldPrioritize ? Math.min(quality + 10, 100) : quality;

  // Reset error state if src changes
  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);

  // Determine if the image is external (not from our domain)
  const isExternal = src.startsWith('http') && !src.includes('heathcheck.info');

  // Placeholder image for errors
  const fallbackSrc = '/images/placeholder.jpg';
  
  // If this is an LCP image, use a simplified rendering without transition effects
  // This helps reduce layout shifts and paint time
  if (isLCP) {
    return (
      <figure className={`relative ${className}`}>
        <div
          className="overflow-hidden rounded-lg bg-gray-50"
          style={
            !fill && width && height
              ? { aspectRatio: `${width}/${height}` }
              : undefined
          }
        >
          <Image
            src={!error ? src : fallbackSrc}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            priority={true}
            quality={effectiveQuality}
            sizes={sizes}
            loading="eager"
            fetchPriority="high"
            className="rounded-lg"
            onError={() => setError(true)}
            unoptimized={isExternal} // Don't optimize external images
          />
        </div>
        
        {caption && (
          <figcaption className="text-sm text-gray-500 mt-2 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // Standard rendering for non-LCP images
  return (
    <figure className={`relative ${className}`} ref={ref}>
      <div
        className={`overflow-hidden rounded-lg ${
          !loaded && !error ? 'bg-gray-100' : ''
        }`}
        style={
          !fill && width && height
            ? { aspectRatio: `${width}/${height}` }
            : undefined
        }
      >
        {/* Show placeholder immediately to prevent layout shift */}
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      
        {!error ? (
          <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            priority={shouldPrioritize}
            quality={effectiveQuality}
            sizes={sizes}
            loading={effectiveLoading}
            fetchPriority={effectiveFetchPriority}
            className={`rounded-lg transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            unoptimized={isExternal} // Don't optimize external images
          />
        ) : (
          <div className="relative">
            <Image
              src={fallbackSrc}
              alt="Image could not be loaded"
              width={fill ? undefined : width}
              height={fill ? undefined : height}
              fill={fill}
              sizes={sizes}
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm p-2 text-center">
              Image could not be loaded
            </div>
          </div>
        )}
      </div>
      
      {caption && (
        <figcaption className="text-sm text-gray-500 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Helper function to generate image metadata for SEO
 * Use this in page metadata for important images
 */
export function generateImageMetadata(
  src: string,
  alt: string,
  width: number,
  height: number
) {
  // Ensure src is an absolute URL
  const absoluteSrc = src.startsWith('http')
    ? src
    : `https://www.heathcheck.info${src.startsWith('/') ? '' : '/'}${src}`;

  return {
    url: absoluteSrc,
    width,
    height,
    alt,
  };
}

/**
 * Preload critical images that might impact LCP
 * Add this to the <head> section of important pages
 */
export function PreloadLCPImage({ src }: { src: string }) {
  // Skip for external images
  if (src.startsWith('http') && !src.includes('heathcheck.info')) {
    return null;
  }
  
  return (
    <>
      <link
        rel="preload"
        href={src}
        as="image"
        type="image/webp"
        fetchPriority="high"
      />
    </>
  );
}
