import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Age Calculator | HealthCheck',
  description: 'Calculate your exact age in years, months, and days.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/age',
  },
  openGraph: {
    title: 'Age Calculator | HealthCheck',
    description: 'Calculate your exact age in years, months, and days.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/age',
    images: [
      {
        url: '/images/calculators/age-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Age Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator | HealthCheck',
    description: 'Calculate your exact age in years, months, and days.',
    images: ['/images/calculators/age-calculator.jpg'],
  },
};

export default function AgeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
