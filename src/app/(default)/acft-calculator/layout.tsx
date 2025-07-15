import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ACFT Score Calculator | HealthCheck',
  description:
    'Calculate your Army Combat Fitness Test (ACFT) score across all 6 events. Get your total score, event-by-event breakdown, pass/fail status, and personalized training recommendations.',
  keywords:
    'ACFT calculator, army fitness test, ACFT scoring, military fitness, army PT test, combat fitness test score',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'ACFT Score Calculator | HealthCheck',
    description:
      'Calculate your Army Combat Fitness Test (ACFT) score across all 6 events. Get your total score, event-by-event breakdown, pass/fail status, and personalized training recommendations.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/acft-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'ACFT Score Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACFT Score Calculator | HealthCheck',
    description:
      'Calculate your Army Combat Fitness Test (ACFT) score across all 6 events. Get your total score, event-by-event breakdown, pass/fail status, and personalized training recommendations.',
    images: ['/images/calculators/acft-calculator.jpg'],
  },
};

export default function ACFTCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
