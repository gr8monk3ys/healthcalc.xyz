'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import Accordion from '@/components/ui/Accordion';
import { ResultsEmailCapture } from '@/components/ResultsEmailCapture';
import { toAbsoluteUrl } from '@/lib/site';
import { ResultsShareBar, ResultsShareProvider } from '@/components/ResultsShare';
import { useLocale } from '@/context/LocaleContext';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';
import { useChainState } from '@/hooks/useChainState';
import { getChainById, getChainsForCalculator } from '@/constants/calculatorChains';
import ChainProgressBar from '@/components/chains/ChainProgressBar';
import ChainContinueButton from '@/components/chains/ChainContinueButton';
import { buildSharedResultToken, type ShareResultContext } from '@/utils/resultSharing';

function formatTemplate(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return out;
}

const EMPTY_HASHTAGS: string[] = [];
const FAQ_SKELETON_ROWS = ['faq-1', 'faq-2', 'faq-3'];
const ARTICLE_SKELETON_ROWS = ['article-1', 'article-2', 'article-3'];

function readIsEmbedFromLocation(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return new URLSearchParams(window.location.search).get('embed') === '1';
}

// Dynamic imports for below-the-fold components (performance optimization)
const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => (
    <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
      <div className="space-y-4">
        {FAQ_SKELETON_ROWS.map(rowId => (
          <div key={rowId} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
    </div>
  ),
});

const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'), {
  loading: () => (
    <div className="neumorph p-6 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  ),
});

const RelatedArticles = dynamic(() => import('@/components/RelatedArticles'), {
  loading: () => (
    <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6" />
      <div className="space-y-6">
        {ARTICLE_SKELETON_ROWS.map(rowId => (
          <div key={rowId} className="p-4 rounded-lg neumorph">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
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
interface CalculatorPageLayoutProps {
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
  /** Whether to show the results email capture component (true when results are displayed) */
  showResultsCapture?: boolean;
  /** Newsletter signup title */
  newsletterTitle?: string;
  /** Newsletter signup description */
  newsletterDescription?: string;
  /** Data to pass to the next chain step (age, weight, etc.) */
  chainResultData?: Record<string, string | number>;
  /** Optional result payload used to generate shareable prefilled URLs */
  shareResultContext?: ShareResultContext;
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
function CalculatorPageLayoutContent({
  title,
  description,
  calculatorSlug,
  shareTitle,
  shareDescription,
  shareHashtags = EMPTY_HASHTAGS,
  faqs,
  faqTitle,
  relatedArticles,
  structuredData,
  understandingSection,
  showResultsCapture = false,
  newsletterTitle,
  newsletterDescription,
  chainResultData,
  shareResultContext,
  children,
}: CalculatorPageLayoutProps): React.ReactElement {
  const socialTitle = shareTitle || title;
  const socialDescription = shareDescription || description;
  const { localizePath, t } = useLocale();
  const { trackEvent } = useFunnelTracking();
  const { chainState, isInChain, exitChain } = useChainState();
  const [isEmbed, setIsEmbed] = useState(false);
  const hasTrackedResultRef = useRef(false);

  // Determine if this calculator is the current chain step
  const chainDef = chainState ? getChainById(chainState.chainId) : undefined;
  const isCurrentChainStep =
    isInChain &&
    chainState !== null &&
    chainDef !== undefined &&
    chainDef.steps[chainState.currentStepIndex]?.slug === calculatorSlug;

  const availableChains = !isInChain ? getChainsForCalculator(calculatorSlug) : [];
  const shareToken = useMemo(() => {
    if (!shareResultContext) return undefined;
    return buildSharedResultToken(shareResultContext);
  }, [shareResultContext]);

  useEffect(() => {
    const syncEmbedFlag = () => {
      setIsEmbed(readIsEmbedFromLocation());
    };

    syncEmbedFlag();
    window.addEventListener('popstate', syncEmbedFlag);
    return () => {
      window.removeEventListener('popstate', syncEmbedFlag);
    };
  }, []);

  useEffect(() => {
    if (isEmbed) return;

    if (showResultsCapture && !hasTrackedResultRef.current) {
      trackEvent('calculator_complete', {
        calculator: calculatorSlug,
      });
      hasTrackedResultRef.current = true;
      return;
    }

    if (!showResultsCapture) {
      hasTrackedResultRef.current = false;
    }
  }, [calculatorSlug, isEmbed, showResultsCapture, trackEvent]);

  if (isEmbed) {
    const poweredByTemplate = t('calculator.embed.poweredBy');
    const token = '{brand}';
    const brandLink = (
      <Link href={localizePath(`/${calculatorSlug}`)} className="text-accent hover:underline">
        HealthCheck
      </Link>
    );
    let poweredByContent: React.ReactNode;
    if (poweredByTemplate.includes(token)) {
      const [before, after] = poweredByTemplate.split(token);
      poweredByContent = (
        <>
          {before}
          {brandLink}
          {after ?? ''}
        </>
      );
    } else {
      poweredByContent = (
        <>
          {poweredByTemplate} {brandLink}
        </>
      );
    }

    return (
      <ErrorBoundary>
        <ResultsShareProvider>
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-sm text-gray-600 mb-6 dark:text-gray-400">{description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{poweredByContent}</div>
          </div>
        </ResultsShareProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ResultsShareProvider>
        <div className="max-w-4xl mx-auto">
          {isCurrentChainStep && chainState && (
            <ChainProgressBar chainState={chainState} onExit={exitChain} />
          )}
          <Breadcrumb />

          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">{children}</div>

          {showResultsCapture && <div id="results" className="sr-only" aria-hidden="true" />}

          {showResultsCapture && (
            <ResultsShareBar
              calculatorSlug={calculatorSlug}
              title={socialTitle}
              shareToken={shareToken}
              className="mb-8"
            />
          )}

          {showResultsCapture && isCurrentChainStep && chainResultData && (
            <ChainContinueButton calculatorSlug={calculatorSlug} resultData={chainResultData} />
          )}

          {showResultsCapture && (
            <ResultsEmailCapture
              source={`calculator-${calculatorSlug}`}
              className="mb-8 animate-fade-in"
            />
          )}

          <AdBlock slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} format="rectangle" />

          <div className="mb-6">
            <SocialShare
              url={localizePath(`/${calculatorSlug}`)}
              title={socialTitle}
              description={socialDescription}
              hashtags={shareHashtags}
            />
          </div>

          <Accordion title={t('calculator.embed.title')} defaultOpen={false}>
            <EmbedCalculator calculatorSlug={calculatorSlug} title={title} />
          </Accordion>

          <RelatedCalculators
            currentSlug={calculatorSlug}
            title={t('calculator.relatedCalculators.title')}
          />

          {availableChains.length > 0 && (
            <div className="my-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-60">
                Guided Workflows
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {availableChains.map(chain => (
                  <Link
                    key={chain.id}
                    href={`/chains?start=${chain.id}`}
                    className="glass-panel rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg block"
                  >
                    <p className="font-medium text-sm">{chain.name}</p>
                    <p className="mt-1 text-xs opacity-60">{chain.description}</p>
                    <p className="mt-2 text-xs text-[var(--accent)] font-medium">
                      {chain.steps.length} steps &middot; Start workflow &rarr;
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <RelatedGuides title={t('calculator.relatedGuides.title')} />

          <Suspense
            fallback={
              <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6" />
                <div className="space-y-4">
                  {FAQ_SKELETON_ROWS.map(rowId => (
                    <div key={rowId} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
                  ))}
                </div>
              </div>
            }
          >
            <FAQSection
              faqs={faqs}
              title={
                faqTitle ||
                formatTemplate(t('calculator.faq.titleTemplate'), {
                  topic: title.replace(' Calculator', ''),
                })
              }
              className="mb-8"
            />
          </Suspense>

          {understandingSection}

          <Suspense
            fallback={
              <div className="neumorph p-6 rounded-lg my-8 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6" />
                <div className="space-y-6">
                  {ARTICLE_SKELETON_ROWS.map(rowId => (
                    <div key={rowId} className="p-4 rounded-lg neumorph">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2" />
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <RelatedArticles
              currentSlug=""
              articles={relatedArticles}
              title={t('calculator.relatedArticles.title')}
              className="my-8"
            />
          </Suspense>

          <Suspense
            fallback={
              <div className="neumorph p-6 rounded-lg animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
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
              url: toAbsoluteUrl(localizePath(`/${calculatorSlug}`)),
            })}
          />
          <StructuredData data={createFAQSchema(faqs)} />
        </div>
      </ResultsShareProvider>
    </ErrorBoundary>
  );
}

function CalculatorPageLayout(props: CalculatorPageLayoutProps): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <CalculatorPageLayoutContent {...props} />
    </Suspense>
  );
}

export default CalculatorPageLayout;
