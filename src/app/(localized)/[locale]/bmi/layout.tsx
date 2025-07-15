import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';
import { isLocaleIndexable } from '@/i18n/indexing';
import { getBMICopy } from '@/i18n/pages/bmi';
import { buildLanguageAlternates } from '@/i18n/alternates';

interface LocalizedBMILayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedBMILayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = getBMICopy(locale);
  const indexable = isLocaleIndexable(locale);

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    keywords: copy.meta.keywords,
    alternates: {
      ...buildLanguageAlternates('/bmi'),
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
      title: copy.meta.title,
      description: copy.meta.description,
      type: 'website',
      url: './',
      images: [
        {
          url: '/images/calculators/bmi-calculator.jpg',
          width: 1200,
          height: 630,
          alt: copy.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.meta.title,
      description: copy.meta.description,
      images: ['/images/calculators/bmi-calculator.jpg'],
    },
  };
}

export default async function LocalizedBMILayout({ children, params }: LocalizedBMILayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }
  return <>{children}</>;
}
