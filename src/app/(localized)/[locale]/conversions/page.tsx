import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import MeasurementConversionsClient from '@/components/conversions/MeasurementConversionsClient';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';
import { getConversionsCopy } from '@/i18n/pages/conversions';

interface LocalizedConversionsProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedConversionsProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = getConversionsCopy(locale);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: copy.metaKeywords,
    alternates: { canonical: './' },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: 'website',
      url: './',
      images: [
        {
          url: '/images/calculators/conversions-calculator.jpg',
          width: 1200,
          height: 630,
          alt: copy.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: ['/images/calculators/conversions-calculator.jpg'],
    },
  };
}

export default async function LocalizedConversionsPage({ params }: LocalizedConversionsProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/conversions');
  }

  return <MeasurementConversionsClient copy={getConversionsCopy(locale)} />;
}
