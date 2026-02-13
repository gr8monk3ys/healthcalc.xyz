'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StructuredData, { createBreadcrumbSchema } from './StructuredData';
import { toAbsoluteUrl } from '@/lib/site';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  customItems?: BreadcrumbItem[];
  homeLabel?: string;
  className?: string;
}

/**
 * Breadcrumb component for navigation and SEO
 * Automatically generates breadcrumbs based on the current path
 * Can be customized with specific items if needed
 */
export default function Breadcrumb({
  customItems,
  homeLabel = 'Home',
  className = '',
}: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items based on the current path
  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    // If custom items are provided, use those
    if (customItems) {
      return [{ name: homeLabel, path: '/' }, ...customItems];
    }

    // Otherwise, generate from the pathname
    const pathSegments = pathname.split('/').filter(Boolean);

    // Start with home
    const items: BreadcrumbItem[] = [{ name: homeLabel, path: '/' }];

    // Add each path segment
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;

      // Format the segment name (convert-to-readable)
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      items.push({ name, path: currentPath });
    });

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  // Create schema items for structured data
  const schemaItems = breadcrumbItems.map(item => ({
    name: item.name,
    url: toAbsoluteUrl(item.path),
  }));

  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm mb-4 ${className}`}>
        <ol className="flex flex-wrap items-center space-x-1">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <span className="mx-1 text-gray-400" aria-hidden="true">
                  /
                </span>
              )}

              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-600" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="text-accent hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Add structured data for breadcrumbs */}
      <StructuredData data={createBreadcrumbSchema(schemaItems)} />
    </>
  );
}
