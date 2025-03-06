'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

interface DynamicComponentProps {
  componentPath: string;
  fallback?: React.ReactNode;
  props?: Record<string, any>;
}

/**
 * DynamicComponent wrapper for lazy loading components
 * @param componentPath - Path to the component to load dynamically
 * @param fallback - Fallback component to show while loading
 * @param props - Props to pass to the component
 */
export default function DynamicComponent({
  componentPath,
  fallback = <DefaultLoadingFallback />,
  props = {},
}: DynamicComponentProps): React.JSX.Element {
  // Dynamically import the component
  const DynamicComponent = dynamic(() => import(componentPath), {
    loading: () => <>{fallback}</>,
    ssr: false, // Disable server-side rendering for calculator components
  });

  return (
    <Suspense fallback={fallback}>
      <DynamicComponent {...props} />
    </Suspense>
  );
}

/**
 * Default loading fallback component
 */
export function DefaultLoadingFallback(): React.JSX.Element {
  return (
    <div className="w-full p-8 rounded-lg neumorph animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6 mb-8"></div>
      <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
      <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
}

/**
 * Calculator loading fallback component
 */
export function CalculatorLoadingFallback(): React.JSX.Element {
  return (
    <div className="w-full p-8 rounded-lg neumorph animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded w-full mb-8"></div>
      <div className="h-20 bg-gray-200 rounded w-full"></div>
    </div>
  );
}

/**
 * Blog content loading fallback component
 */
export function BlogLoadingFallback(): React.JSX.Element {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
      <div className="h-64 bg-gray-200 rounded w-full mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
    </div>
  );
}
