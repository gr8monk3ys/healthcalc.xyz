/**
 * Performance utility functions for optimizing Core Web Vitals
 */

import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'Performance' });

// Type definitions for browser APIs
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface NetworkInformation {
  saveData: boolean;
  effectiveType: string;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

/**
 * Defers loading of non-critical resources
 * @param callback - The callback to execute after the main thread is idle
 * @param timeout - The maximum time to wait before executing the callback
 */
export function deferLoadingOf(callback: () => void, timeout: number = 2000): void {
  if (typeof window === 'undefined') return;

  if ('requestIdleCallback' in window) {
    // Use requestIdleCallback if available
    window.requestIdleCallback(() => callback(), { timeout });
  } else {
    // Fallback to setTimeout
    setTimeout(callback, 20);
  }
}

/**
 * Prefetches a page to improve navigation performance
 * @param href - The URL to prefetch
 */
export function prefetchPage(href: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = 'document';
  document.head.appendChild(link);
}

/**
 * Preloads an image to improve LCP (Largest Contentful Paint)
 * @param src - The image source URL
 * @param isPriority - Whether the image is a priority image
 */
export function preloadImage(src: string, isPriority: boolean = false): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = isPriority ? 'preload' : 'prefetch';
  link.href = src;
  link.as = 'image';
  document.head.appendChild(link);
}

/**
 * Preconnects to a domain to reduce connection setup time
 * @param domain - The domain to preconnect to
 * @param crossOrigin - Whether to include crossorigin attribute
 */
export function preconnectToDomain(domain: string, crossOrigin: boolean = true): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  if (crossOrigin) {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);

  // Also add DNS prefetch as a fallback
  const dnsLink = document.createElement('link');
  dnsLink.rel = 'dns-prefetch';
  dnsLink.href = domain;
  document.head.appendChild(dnsLink);
}

/**
 * Measures and reports Core Web Vitals metrics
 * This is a simplified version - in production, you'd use a more robust solution
 */
export function measureCoreWebVitals(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Measure LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      // Send to analytics if configured
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-expect-error - gtag is not typed
        window.gtag('event', 'web_vitals', { metric: 'LCP', value: lastEntry.startTime });
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        // Use type assertion for PerformanceEventTiming
        const fidEntry = entry as PerformanceEventTiming;
        const delay = fidEntry.processingStart - fidEntry.startTime;
        // Send to analytics if configured
        if (typeof window !== 'undefined' && 'gtag' in window) {
          // @ts-expect-error - gtag is not typed
          window.gtag('event', 'web_vitals', { metric: 'FID', value: delay });
        }
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Measure CLS (Cumulative Layout Shift)
    let cumulativeLayoutShift = 0;
    const clsObserver = new PerformanceObserver(entryList => {
      for (const entry of entryList.getEntries()) {
        // Only count layout shifts without recent user input
        const layoutShiftEntry = entry as LayoutShiftEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          cumulativeLayoutShift += layoutShiftEntry.value;
        }
      }
      // Send to analytics if configured
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-expect-error - gtag is not typed
        window.gtag('event', 'web_vitals', { metric: 'CLS', value: cumulativeLayoutShift });
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    logger.logError('Error measuring Core Web Vitals', e);
  }
}

/**
 * Optimizes image loading based on viewport and connection
 * @param imageElement - The image element to optimize
 * @param src - The image source URL
 * @param lowQualitySrc - A low quality placeholder image
 */
export function optimizeImageLoading(
  imageElement: HTMLImageElement,
  src: string,
  lowQualitySrc?: string
): void {
  if (typeof window === 'undefined') return;

  // Check if the browser supports IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Check connection speed
            const connection = (navigator as NavigatorWithConnection).connection;
            const isSlowConnection =
              connection &&
              (connection.saveData ||
                connection.effectiveType.includes('2g') ||
                connection.effectiveType.includes('slow-2g'));

            // Load appropriate image based on connection
            if (isSlowConnection && lowQualitySrc) {
              imageElement.src = lowQualitySrc;
            } else {
              imageElement.src = src;
            }

            // Stop observing once loaded
            observer.unobserve(imageElement);
          }
        });
      },
      {
        rootMargin: '200px', // Start loading when image is 200px from viewport
        threshold: 0.01,
      }
    );

    observer.observe(imageElement);
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    imageElement.src = src;
  }
}

/**
 * Reduces layout shifts by reserving space for elements before they load
 * @param element - The element to reserve space for
 * @param width - The width of the element
 * @param height - The height of the element
 * @param aspectRatio - The aspect ratio of the element (width/height)
 */
export function reserveSpaceFor(
  element: HTMLElement,
  width?: number,
  height?: number,
  aspectRatio?: number
): void {
  if (!element) return;

  if (width && height) {
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  } else if (width && aspectRatio) {
    element.style.width = `${width}px`;
    element.style.height = `${width / aspectRatio}px`;
  } else if (height && aspectRatio) {
    element.style.height = `${height}px`;
    element.style.width = `${height * aspectRatio}px`;
  }
}
