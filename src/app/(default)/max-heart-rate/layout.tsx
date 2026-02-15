import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Max Heart Rate Calculator | HealthCheck',
  description: 'Estimate max heart rate using age-based formulas.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/max-heart-rate',
  },
  openGraph: {
    title: 'Max Heart Rate Calculator | HealthCheck',
    description: 'Estimate max heart rate using age-based formulas.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/max-heart-rate',
    images: [
      {
        url: '/images/calculators/max-heart-rate-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Max Heart Rate Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Max Heart Rate Calculator | HealthCheck',
    description: 'Estimate max heart rate using age-based formulas.',
    images: ['/images/calculators/max-heart-rate-calculator.jpg'],
  },
};

export default function MaxHeartRateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
