import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { buildLanguageAlternates } from '@/i18n/alternates';

export const metadata: Metadata = {
  // Shows only the visitor's own saved data, so crawlers see an empty page.
  robots: { index: false, follow: true },
  title: 'Printable Health Report | HealthCalc',
  description:
    'Generate a printable report from your saved HealthCalc results, including body composition, nutrition, cardio, and hydration highlights.',
  alternates: {
    ...buildLanguageAlternates('/report'),
  },
  openGraph: {
    title: 'Printable Health Report | HealthCalc',
    description:
      'Generate a printable report from your saved HealthCalc results, including body composition, nutrition, cardio, and hydration highlights.',
    type: 'website',
    url: './',
  },
};

export default function ReportLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
