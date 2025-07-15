import type { Metadata } from 'next';
import BMICalculatorClient from '@/components/calculators/bmi/BMICalculatorClient';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';
import { getBMICopy } from '@/i18n/pages/bmi';
import { notFound, redirect } from 'next/navigation';

interface LocalizedBMIPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedBMIPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = getBMICopy(locale);
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    keywords: copy.meta.keywords,
  };
}

export default async function LocalizedBMIPage({ params }: LocalizedBMIPageProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/bmi');
  }

  return <BMICalculatorClient copy={getBMICopy(locale)} />;
}
