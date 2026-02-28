import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { buildLanguageAlternates } from '@/i18n/alternates';

export const metadata: Metadata = {
  title: 'Printable Health Report | HealthCheck',
  description:
    'Generate a printable report from your saved HealthCheck results, including body composition, nutrition, cardio, and hydration highlights.',
  alternates: {
    ...buildLanguageAlternates('/report'),
  },
  openGraph: {
    title: 'Printable Health Report | HealthCheck',
    description:
      'Generate a printable report from your saved HealthCheck results, including body composition, nutrition, cardio, and hydration highlights.',
    type: 'website',
    url: './',
  },
};

export default function ReportLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
