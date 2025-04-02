'use client';

import { useState, useEffect, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'useDynamicImport' });

/**
 * Hook for dynamically importing components only when needed
 * This helps reduce the initial bundle size and improve FCP times
 *
 * @param importFn Function that returns a dynamic import (e.g., () => import('@/components/HeavyComponent'))
 * @param loadOnMount Whether to load the component immediately on mount
 * @param loadOnVisible Whether to load the component when it becomes visible in viewport
 * @returns Object containing the dynamically loaded component and loading state
 */
export function useDynamicImport<T = Record<string, unknown>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  { loadOnMount = false, loadOnVisible = true } = {}
) {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  // Function to load the component
  const loadComponent = useCallback(async () => {
    if (Component || isLoading) return;

    setIsLoading(true);

    try {
      const loadedModule = await importFn();
      setComponent(() => loadedModule.default);
    } catch (err) {
      logger.logError('Failed to dynamically load component', err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [Component, isLoading, importFn]);

  // Load on mount if specified
  useEffect(() => {
    if (loadOnMount) {
      loadComponent();
    }
  }, [loadOnMount, loadComponent]);

  // Load when visible if specified
  useEffect(() => {
    if (!loadOnVisible || !ref || Component) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadComponent();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load when within 200px of viewport
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, loadOnVisible, Component, loadComponent]);

  return {
    Component,
    isLoading,
    error,
    ref: setRef,
    load: loadComponent,
  };
}
