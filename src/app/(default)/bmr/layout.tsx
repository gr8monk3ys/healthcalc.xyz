import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'BMR Calculator | HealthCheck',
  description:
    'Calculate your basal metabolic rate using popular formulas like Mifflin-St Jeor and Katch-McArdle.',
  keywords:
    'BMR calculator, basal metabolic rate, Mifflin-St Jeor, Katch-McArdle, calories at rest',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/bmr',
  },
  openGraph: {
    title: 'BMR Calculator | HealthCheck',
    description:
      'Calculate your basal metabolic rate using popular formulas like Mifflin-St Jeor and Katch-McArdle.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/bmr',
    images: [
      {
        url: '/images/calculators/bmr-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'BMR Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMR Calculator | HealthCheck',
    description:
      'Calculate your basal metabolic rate using popular formulas like Mifflin-St Jeor and Katch-McArdle.',
    images: ['/images/calculators/bmr-calculator.jpg'],
  },
};

export default function BMRLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
