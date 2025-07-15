import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';
import { isLocaleIndexable } from '@/i18n/indexing';
import { buildLanguageAlternates } from '@/i18n/alternates';
import { getBodyFatMetaCopy } from '@/i18n/pages/bodyFat';

interface LocalizedBodyFatLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedBodyFatLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = getBodyFatMetaCopy(locale);
  const indexable = isLocaleIndexable(locale);

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: {
      ...buildLanguageAlternates('/body-fat'),
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
          url: '/images/calculators/body-fat-calculator.jpg',
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
      images: ['/images/calculators/body-fat-calculator.jpg'],
    },
  };
}

export default async function LocalizedBodyFatLayout({
  children,
  params,
}: LocalizedBodyFatLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }
  return <>{children}</>;
}
