'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Breadcrumb from '@/components/Breadcrumb';
import SocialShare from '@/components/SocialShare';
import StructuredData, {
  createCalculatorSchema,
  createFAQSchema,
} from '@/components/StructuredData';
import RelatedCalculators from '@/components/RelatedCalculators';
import EmbedCalculator from '@/components/calculators/EmbedCalculator';
import AdBlock from '@/components/AdBlock';
import RelatedGuides from '@/components/RelatedGuides';

// Dynamic imports for below-the-fold components (performance optimization)
const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => (
    <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-12 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  ),
});

const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'), {
  loading: () => (
    <div className="neumorph p-6 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-10 bg-gray-200 rounded mb-4" />
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  ),
});

const RelatedArticles = dynamic(() => import('@/components/RelatedArticles'), {
  loading: () => (
    <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 rounded-lg neumorph">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  ),
});

/**
 * Represents a FAQ item with question and answer
 */
interface FAQ {
  question: string;
  answer: string;
}

/**
 * Represents a related article for cross-linking
 */
interface RelatedArticle {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
}

/**
 * Props for the CalculatorPageLayout component
 */
export interface CalculatorPageLayoutProps {
  /** Page title displayed as h1 heading */
  title: string;
  /** Page description displayed below the title */
  description: string;
  /** URL slug for the calculator (used for social sharing and structured data) */
  calculatorSlug: string;
  /** Social sharing title for meta tags */
  shareTitle?: string;
  /** Social sharing description for meta tags */
  shareDescription?: string;
  /** Hashtags for social media sharing */
  shareHashtags?: string[];
  /** Array of FAQ items for the FAQ section */
  faqs: FAQ[];
  /** Title for the FAQ section */
  faqTitle?: string;
  /** Array of related articles for cross-linking */
  relatedArticles: RelatedArticle[];
  /** Structured data for SEO (Schema.org JSON-LD) */
  structuredData: Record<string, unknown>;
  /** Optional understanding section component (varies per calculator) */
  understandingSection?: React.ReactNode;
  /** Newsletter signup title */
  newsletterTitle?: string;
  /** Newsletter signup description */
  newsletterDescription?: string;
  /** The main content (calculator form and result display) */
  children: React.ReactNode;
}

/**
 * Reusable layout component for calculator pages.
 *
 * This component provides a consistent structure for all calculator pages,
 * including:
 * - Error boundary wrapper for graceful error handling
 * - Breadcrumb navigation
 * - Title and description section
 * - Social sharing buttons
 * - Main content grid for calculator form and results
 * - FAQ section with structured data
 * - Understanding/educational section (optional, varies per calculator)
 * - Related articles for cross-linking
 * - Newsletter signup
 * - Structured data for SEO
 *
 * Performance optimizations:
 * - Dynamic imports for below-the-fold components (FAQSection, NewsletterSignup, RelatedArticles)
 * - Suspense boundaries with skeleton loading states
 */
export function CalculatorPageLayout({
  title,
  description,
  calculatorSlug,
  shareTitle,
  shareDescription,
  shareHashtags = [],
  faqs,
  faqTitle,
  relatedArticles,
  structuredData,
  understandingSection,
  newsletterTitle = 'Get Health & Wellness Tips',
  newsletterDescription = 'Subscribe to receive the latest health insights and evidence-based wellness advice delivered to your inbox.',
  children,
}: CalculatorPageLayoutProps): React.ReactElement {
  const socialTitle = shareTitle || title;
  const socialDescription = shareDescription || description;
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get('embed') === '1';

  if (isEmbed) {
    return (
      <ErrorBoundary>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-gray-600 mb-6">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
          <div className="mt-4 text-xs text-gray-500">
            Powered by{' '}
            <Link href={`/${calculatorSlug}`} className="text-accent hover:underline">
              HealthCheck
            </Link>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="mb-6">
          <SocialShare
            url={`/${calculatorSlug}`}
            title={socialTitle}
            description={socialDescription}
            hashtags={shareHashtags}
          />
        </div>

        <EmbedCalculator calculatorSlug={calculatorSlug} title={title} className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">{children}</div>

        <AdBlock slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} format="rectangle" />

        <RelatedCalculators currentSlug={calculatorSlug} />

        <RelatedGuides />

        <Suspense
          fallback={
            <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          }
        >
          <FAQSection
            faqs={faqs}
            title={
              faqTitle || `Frequently Asked Questions About ${title.replace(' Calculator', '')}`
            }
            className="mb-8"
          />
        </Suspense>

        {understandingSection}

        <Suspense
          fallback={
            <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 rounded-lg neumorph">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <RelatedArticles
            currentSlug=""
            articles={relatedArticles}
            title="Related Articles"
            className="my-8"
          />
        </Suspense>

        <Suspense
          fallback={
            <div className="neumorph p-6 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-10 bg-gray-200 rounded mb-4" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          }
        >
          <NewsletterSignup
            title={newsletterTitle}
            description={newsletterDescription}
            className="my-8"
          />
        </Suspense>

        <StructuredData data={structuredData} />
        <StructuredData
          data={createCalculatorSchema({
            name: title,
            description,
            url: `https://www.heathcheck.info/${calculatorSlug}`,
          })}
        />
        <StructuredData data={createFAQSchema(faqs)} />
      </div>
    </ErrorBoundary>
  );
}

export default CalculatorPageLayout;
