import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShareRedirectClient from '@/components/share/ShareRedirectClient';
import {
  buildSharedResultSummary,
  decodeSharedResultToken,
  isSupportedShareCalculator,
  type ShareCalculatorSlug,
} from '@/utils/resultSharing';
import { toAbsoluteUrl } from '@/lib/site';
import { defaultLocale, isSupportedLocale } from '@/i18n/config';

interface ShareRouteParams {
  calculator: string;
  locale?: string;
}

interface SharePageProps {
  params: Promise<ShareRouteParams>;
  searchParams: Promise<{ r?: string | string[] }>;
}

const CALCULATOR_LABELS: Record<ShareCalculatorSlug, string> = {
  bmi: 'BMI Calculator',
  tdee: 'TDEE Calculator',
  'calorie-deficit': 'Calorie Deficit Calculator',
  'body-fat': 'Body Fat Calculator',
  macro: 'Macro Calculator',
  'fitness-age': 'Fitness Age Quiz',
};

function getToken(value: string | string[] | undefined): string | null {
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && value.length > 0) return value[0];
  return null;
}

function getLocalePrefix(locale: string | undefined): string {
  if (!locale || !isSupportedLocale(locale) || locale === defaultLocale) {
    return '';
  }

  return `/${locale}`;
}

export async function generateMetadata({
  params,
  searchParams,
}: SharePageProps): Promise<Metadata> {
  const { calculator, locale } = await params;
  if (!isSupportedShareCalculator(calculator)) {
    return {
      title: 'Shared Result | HealthCheck',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const resolvedSearchParams = await searchParams;
  const token = getToken(resolvedSearchParams.r);
  const payload = decodeSharedResultToken(token);
  const localePrefix = getLocalePrefix(locale);

  const summary =
    payload && payload.c === calculator
      ? buildSharedResultSummary(payload)
      : {
          title: `${CALCULATOR_LABELS[calculator]} | Shared Result`,
          description: 'Open this shared calculator result on HealthCheck.',
          secondaryValue: CALCULATOR_LABELS[calculator],
        };

  const ogImage = toAbsoluteUrl(
    token ? `/api/og/${calculator}?r=${encodeURIComponent(token)}` : `/api/og/${calculator}`
  );
  const sharePath = token
    ? `${localePrefix}/share/${calculator}?r=${encodeURIComponent(token)}`
    : `${localePrefix}/share/${calculator}`;

  return {
    title: `${summary.title} | HealthCheck`,
    description: summary.description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${localePrefix}/${calculator}`,
    },
    openGraph: {
      title: summary.title,
      description: summary.description,
      type: 'website',
      url: toAbsoluteUrl(sharePath),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: summary.secondaryValue,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: summary.title,
      description: summary.description,
      images: [ogImage],
    },
  };
}

export default async function SharePage({ params, searchParams }: SharePageProps) {
  const { calculator, locale } = await params;
  if (!isSupportedShareCalculator(calculator)) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const token = getToken(resolvedSearchParams.r);
  const localePrefix = getLocalePrefix(locale);

  const payload = decodeSharedResultToken(token);
  const validToken = payload && payload.c === calculator ? token : null;

  const targetPath = validToken
    ? `${localePrefix}/${calculator}?r=${encodeURIComponent(validToken)}`
    : `${localePrefix}/${calculator}`;

  const title = validToken ? 'Opening shared result' : `Open ${CALCULATOR_LABELS[calculator]}`;

  const description = validToken
    ? 'This shared link includes prefilled inputs and will open the calculator with results.'
    : 'The shared token was missing or invalid. Opening the calculator directly.';

  return <ShareRedirectClient targetPath={targetPath} title={title} description={description} />;
}
