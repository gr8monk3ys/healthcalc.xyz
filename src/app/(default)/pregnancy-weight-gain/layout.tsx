import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pregnancy Weight Gain Calculator | HealthCheck',
  description: 'Estimate recommended pregnancy weight gain by BMI.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/pregnancy-weight-gain',
  },
  openGraph: {
    title: 'Pregnancy Weight Gain Calculator | HealthCheck',
    description: 'Estimate recommended pregnancy weight gain by BMI.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/pregnancy-weight-gain',
    images: [
      {
        url: '/images/calculators/pregnancy-weight-gain-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Pregnancy Weight Gain Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy Weight Gain Calculator | HealthCheck',
    description: 'Estimate recommended pregnancy weight gain by BMI.',
    images: ['/images/calculators/pregnancy-weight-gain-calculator.jpg'],
  },
};

export default function PregnancyWeightGainLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
