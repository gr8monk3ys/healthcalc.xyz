import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Adjusted Body Weight Calculator | HealthCheck',
  description: 'Estimate adjusted body weight using height and current weight.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/adjusted-body-weight',
  },
  openGraph: {
    title: 'Adjusted Body Weight Calculator | HealthCheck',
    description: 'Estimate adjusted body weight using height and current weight.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/adjusted-body-weight',
    images: [
      {
        url: '/images/calculators/adjusted-body-weight-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Adjusted Body Weight Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adjusted Body Weight Calculator | HealthCheck',
    description: 'Estimate adjusted body weight using height and current weight.',
    images: ['/images/calculators/adjusted-body-weight-calculator.jpg'],
  },
};

export default function AdjustedBodyWeightLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
