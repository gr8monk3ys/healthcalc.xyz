import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Resting Heart Rate Calculator | HealthCheck',
  description: 'Evaluate your resting heart rate and fitness category.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/resting-heart-rate',
  },
  openGraph: {
    title: 'Resting Heart Rate Calculator | HealthCheck',
    description: 'Evaluate your resting heart rate and fitness category.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/resting-heart-rate',
    images: [
      {
        url: '/images/calculators/resting-heart-rate-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Resting Heart Rate Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resting Heart Rate Calculator | HealthCheck',
    description: 'Evaluate your resting heart rate and fitness category.',
    images: ['/images/calculators/resting-heart-rate-calculator.jpg'],
  },
};

export default function RestingHeartRateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
