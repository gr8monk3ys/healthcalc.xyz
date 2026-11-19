'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';
import {
  type CalculatorType,
  type AffiliateProduct,
  type ProductCategory,
  AFFILIATE_CATEGORY_CONFIG,
  AFFILIATE_DISCLOSURE,
  getProductsForCalculator,
  getGuidesForCalculator,
} from '@/constants/affiliates';

interface AffiliateLinksProps {
  calculatorType: CalculatorType;
  title?: string;
  maxProducts?: number;
  showDisclosure?: boolean;
  className?: string;
}

interface ProductCardProps {
  product: AffiliateProduct;
  calculatorType: CalculatorType;
}

interface GuideCardProps {
  title: string;
  description: string;
  href: string;
  category: ProductCategory;
  calculatorType: CalculatorType;
}

/**
 * Renders an icon based on the product category
 */
function CategoryIcon({ category }: { category: ProductCategory }) {
  const iconConfig = AFFILIATE_CATEGORY_CONFIG[category];

  const iconPaths: Record<string, React.ReactNode> = {
    watch: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    scale: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    ),
    utensils: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
    smartphone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    ),
    pill: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    ),
    dumbbell: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    ),
  };

  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {iconPaths[iconConfig.icon] || iconPaths.watch}
    </svg>
  );
}

/**
 * Individual product card component
 */
function ProductCard({ product, calculatorType }: ProductCardProps) {
  const { trackEvent } = useFunnelTracking();

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() =>
        trackEvent('affiliate_click', {
          calculator: calculatorType,
          kind: 'product',
          product: product.id,
          category: product.category,
        })
      }
      className="glass-panel-strong block rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label={`View ${product.name} on Amazon`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          <CategoryIcon category={product.category} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-sm font-semibold">{product.name}</h4>
            {product.badge && (
              <span className="flex-shrink-0 inline-block bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">
                {product.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </a>
  );
}

function GuideCard({ title, description, href, category, calculatorType }: GuideCardProps) {
  const { trackEvent } = useFunnelTracking();

  return (
    <Link
      href={href}
      onClick={() =>
        trackEvent('affiliate_click', {
          calculator: calculatorType,
          kind: 'guide',
          destination: href,
          category,
        })
      }
      className="glass-panel block rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          <CategoryIcon category={category} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {description}
          </p>
          <span className="text-xs text-accent font-medium mt-2 inline-flex items-center gap-1">
            Read the guide
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * AffiliateLinks component displays contextually relevant affiliate product recommendations
 * based on the calculator type being used.
 *
 * @param calculatorType - The type of calculator (e.g., 'bmi', 'tdee', 'body-fat')
 * @param title - Optional custom title for the section
 * @param maxProducts - Maximum number of products to display (default: 6)
 * @param showDisclosure - Whether to show the affiliate disclosure (default: true)
 * @param className - Additional CSS classes
 */
export default function AffiliateLinks({
  calculatorType,
  title = 'Recommended Products',
  maxProducts = 6,
  showDisclosure = true,
  className = '',
}: AffiliateLinksProps) {
  const products = useMemo(
    () => getProductsForCalculator(calculatorType, maxProducts),
    [calculatorType, maxProducts]
  );
  const guides = useMemo(() => getGuidesForCalculator(calculatorType, 2), [calculatorType]);

  if (products.length === 0 && guides.length === 0) {
    return null;
  }

  return (
    <section
      className={`glass-panel rounded-3xl p-7 md:p-8 ${className}`}
      aria-labelledby="affiliate-products-heading"
    >
      <h3 id="affiliate-products-heading" className="text-xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Tools and resources to help you achieve your health and fitness goals
      </p>

      {guides.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-3 border-t-4 border-ink pt-2 text-base">Top Guides</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {guides.map(guide => (
              <GuideCard
                key={guide.slug}
                title={guide.title}
                description={guide.description}
                href={`/blog/${guide.slug}`}
                category={guide.category}
                calculatorType={calculatorType}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {products.map(product => (
          <ProductCard key={product.id} product={product} calculatorType={calculatorType} />
        ))}
      </div>

      {showDisclosure && (
        <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-700/60">
          <p className="text-xs text-gray-500 dark:text-gray-500 italic">
            {AFFILIATE_DISCLOSURE.short}
          </p>
        </div>
      )}
    </section>
  );
}
