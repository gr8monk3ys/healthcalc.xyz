'use client';

import React, { useEffect, useRef } from 'react';
import { createLogger } from '@/utils/logger';
import { getAdSensePublisherId } from '@/lib/adsense';

const logger = createLogger({ component: 'AdUnit' });

interface AdUnitProps {
  /**
   * Ad slot ID from Google AdSense
   * Format: "1234567890"
   */
  slot: string;

  /**
   * Ad format - determines the ad size and behavior
   * - 'auto': Responsive, automatically adjusts to container
   * - 'rectangle': 300x250 medium rectangle
   * - 'horizontal': 728x90 leaderboard
   * - 'vertical': 160x600 wide skyscraper
   */
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';

  /**
   * Optional: Full width responsive ads
   */
  fullWidth?: boolean;

  /**
   * Optional: Custom class name for styling
   */
  className?: string;

  /**
   * Optional: Test mode - shows placeholder instead of real ads
   */
  testMode?: boolean;
}

/**
 * Google AdSense ad unit component
 *
 * Usage:
 * 1. Sign up for Google AdSense at https://www.google.com/adsense
 * 2. Get approved and create ad units
 * 3. Optionally override NEXT_PUBLIC_ADSENSE_PUBLISHER_ID in env
 * 4. Use this component with your ad slot IDs
 *
 * Example:
 * <AdUnit slot="1234567890" format="rectangle" />
 */
export default function AdUnit({
  slot,
  format = 'auto',
  fullWidth = false,
  className = '',
  testMode = false,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Only run on client side and in production
    if (typeof window === 'undefined') return;
    if (testMode) return;
    if (isAdLoaded.current) return;

    try {
      // Check if adsbygoogle is available
      const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
      if (adsbygoogle && adRef.current) {
        adsbygoogle.push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      logger.logError('AdSense error', error);
    }
  }, [testMode]);

  // Get ad dimensions based on format
  const getAdStyle = (): React.CSSProperties => {
    switch (format) {
      case 'rectangle':
        return { display: 'block', width: '300px', height: '250px' };
      case 'horizontal':
        return { display: 'block', width: '728px', height: '90px', maxWidth: '100%' };
      case 'vertical':
        return { display: 'block', width: '160px', height: '600px' };
      case 'auto':
      default:
        return { display: 'block' };
    }
  };

  // Test mode placeholder
  if (testMode || process.env.NODE_ENV === 'development') {
    const placeholderStyle: React.CSSProperties = {
      ...getAdStyle(),
      backgroundColor: '#f0f0f0',
      border: '2px dashed #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontSize: '14px',
      minHeight: format === 'auto' ? '100px' : undefined,
      width: format === 'auto' ? '100%' : getAdStyle().width,
    };

    return (
      <div className={`ad-unit ${className}`} style={placeholderStyle}>
        <div className="text-center p-4">
          <p className="font-medium">Ad Placeholder</p>
          <p className="text-xs text-gray-500">Slot: {slot}</p>
          <p className="text-xs text-gray-500">Format: {format}</p>
        </div>
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={getAdStyle()}
      data-ad-client={getAdSensePublisherId()}
      data-ad-slot={slot}
      data-ad-format={format === 'auto' ? 'auto' : undefined}
      data-full-width-responsive={fullWidth ? 'true' : undefined}
    />
  );
}

/**
 * Predefined ad placements for common locations.
 * Configure slot IDs via environment variables in .env.local:
 * - NEXT_PUBLIC_ADSENSE_SLOT_RESULT
 * - NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR
 * - NEXT_PUBLIC_ADSENSE_SLOT_CONTENT
 * - NEXT_PUBLIC_ADSENSE_SLOT_RESPONSIVE
 */
export const AdPlacements = {
  /** Below calculator results - rectangle format works well */
  RESULT_BOTTOM: {
    format: 'rectangle' as const,
    slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT || '',
  },

  /** Sidebar ad - vertical format */
  SIDEBAR: {
    format: 'vertical' as const,
    slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
  },

  /** Between content sections - horizontal format */
  CONTENT_BREAK: {
    format: 'horizontal' as const,
    slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT || '',
  },

  /** Responsive ad that fits any container */
  RESPONSIVE: {
    format: 'auto' as const,
    slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESPONSIVE || '',
    fullWidth: true,
  },
};
