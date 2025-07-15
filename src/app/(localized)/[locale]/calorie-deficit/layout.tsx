import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';
import { isLocaleIndexable } from '@/i18n/indexing';
import { buildLanguageAlternates } from '@/i18n/alternates';
import { getCalorieDeficitMetaCopy } from '@/i18n/pages/calorieDeficit';

interface LocalizedCalorieDeficitLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocalizedCalorieDeficitLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = getCalorieDeficitMetaCopy(locale);
  const indexable = isLocaleIndexable(locale);

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: {
      ...buildLanguageAlternates('/calorie-deficit'),
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        }
      : {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        },
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: 'website',
      url: './',
      images: [
        {
          url: '/images/calculators/calorie-deficit-calculator.jpg',
          width: 1200,
          height: 630,
          alt: copy.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: ['/images/calculators/calorie-deficit-calculator.jpg'],
    },
  };
}

export default async function LocalizedCalorieDeficitLayout({
  children,
  params,
}: LocalizedCalorieDeficitLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }
  return <>{children}</>;
}
