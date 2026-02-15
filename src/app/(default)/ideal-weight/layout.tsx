import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator | HealthCheck',
  description:
    'Estimate your ideal weight range using popular formulas like Devine, Hamwi, Robinson, and Miller.',
  keywords:
    'ideal weight calculator, devine formula, hamwi formula, robinson formula, miller formula, healthy weight range',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/ideal-weight',
  },
  openGraph: {
    title: 'Ideal Weight Calculator | HealthCheck',
    description:
      'Estimate your ideal weight range using popular formulas like Devine, Hamwi, Robinson, and Miller.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/ideal-weight',
    images: [
      {
        url: '/images/calculators/ideal-weight-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Ideal Weight Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideal Weight Calculator | HealthCheck',
    description:
      'Estimate your ideal weight range using popular formulas like Devine, Hamwi, Robinson, and Miller.',
    images: ['/images/calculators/ideal-weight-calculator.jpg'],
  },
};

export default function IdealWeightLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
