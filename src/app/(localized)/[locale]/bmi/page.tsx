import BMICalculatorClient from '@/components/calculators/bmi/BMICalculatorClient';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';
import { getBMICopy } from '@/i18n/pages/bmi';
import { notFound, redirect } from 'next/navigation';

interface LocalizedBMIPageProps {
  params: Promise<{ locale: string }>;
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
