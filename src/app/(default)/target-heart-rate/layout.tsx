import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Target Heart Rate Calculator | HealthCheck',
  description: 'Calculate target heart rate zones for cardio training.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/target-heart-rate',
  },
  openGraph: {
    title: 'Target Heart Rate Calculator | HealthCheck',
    description: 'Calculate target heart rate zones for cardio training.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/target-heart-rate',
    images: [
      {
        url: '/images/calculators/target-heart-rate-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Target Heart Rate Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Heart Rate Calculator | HealthCheck',
    description: 'Calculate target heart rate zones for cardio training.',
    images: ['/images/calculators/target-heart-rate-calculator.jpg'],
  },
};

export default function TargetHeartRateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
