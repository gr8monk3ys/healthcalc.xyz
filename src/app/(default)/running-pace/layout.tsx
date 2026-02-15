import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Running Pace Calculator | HealthCheck',
  description: 'Calculate your running pace per mile or kilometer plus average speed.',
  keywords: 'running pace calculator, pace per mile, pace per km, running speed, race pace',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/running-pace',
  },
  openGraph: {
    title: 'Running Pace Calculator | HealthCheck',
    description: 'Calculate your running pace per mile or kilometer plus average speed.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/running-pace',
    images: [
      {
        url: '/images/calculators/running-pace-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Running Pace Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Running Pace Calculator | HealthCheck',
    description: 'Calculate your running pace per mile or kilometer plus average speed.',
    images: ['/images/calculators/running-pace-calculator.jpg'],
  },
};

export default function RunningPaceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
