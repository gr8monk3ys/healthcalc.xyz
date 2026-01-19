'use client';

import React, { Suspense } from 'react';
import { useDynamicImport } from '@/hooks/useDynamicImport';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'DynamicComponent' });

interface DynamicComponentProps {
  importFn: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>;
  loading?: React.ReactNode;
  fallback?: React.ReactNode;
  loadOnMount?: boolean;
  loadOnVisible?: boolean;
  props?: Record<string, unknown>;
}

/**
 * Component for dynamically loading other components
 * Helps improve initial page load performance by code splitting
 *
 * @example
 * // Basic usage
 * <DynamicComponent
 *   importFn={() => import('@/components/HeavyComponent')}
 *   loading={<LoadingSpinner />}
 *   props={{ someValue: 123 }}
 * />
 *
 * @example
 * // Only load when scrolled into view
 * <DynamicComponent
 *   importFn={() => import('@/components/LowPriorityWidget')}
 *   loadOnMount={false}
 *   loadOnVisible={true}
 * />
 */
export default function DynamicComponent({
  importFn,
  loading = <div className="animate-pulse h-32 w-full bg-gray-100 rounded-lg"></div>,
  fallback = (
    <div className="p-4 border border-red-200 bg-red-50 text-red-500 rounded-lg">
      Failed to load component
    </div>
  ),
  loadOnMount = true,
  loadOnVisible = true,
  props = {},
}: DynamicComponentProps) {
  const { Component, isLoading, error, ref } = useDynamicImport(importFn, {
    loadOnMount,
    loadOnVisible,
  });

  return (
    <div ref={ref}>
      {isLoading && loading}
      {error && fallback}
      {Component && <Component {...props} />}
    </div>
  );
}

/**
 * Utility to create a lazy loaded component with Suspense
 * Use this for components that should be code-split but render immediately
 *
 * @example
 * const LazyHeavyComponent = createLazyComponent(() => import('@/components/HeavyComponent'));
 *
 * // Then in your JSX
 * <LazyHeavyComponent prop1="value" />
 */
export function createLazyComponent<T extends Record<string, unknown> = Record<string, unknown>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallback: React.ReactNode = (
    <div className="animate-pulse h-20 w-full bg-gray-100 rounded-lg"></div>
  )
) {
  const LazyComponent = React.lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      logger.logError('Failed to load component', error);
      return {
        default: () => (
          <div className="p-4 border border-red-200 bg-red-50 text-red-500 rounded-lg">
            Failed to load component
          </div>
        ),
      };
    }
  });

  return function WrappedLazyComponent(props: T & React.JSX.IntrinsicAttributes) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Loading fallback component for blog posts
 * Shows a skeleton loader while blog content is being loaded
 */
export function BlogLoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}
