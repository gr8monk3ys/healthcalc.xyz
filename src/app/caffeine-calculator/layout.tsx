import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Caffeine Intake Calculator | HealthCheck',
  description:
    'Calculate your daily caffeine intake, check safe limits, and get personalized pre-workout dose recommendations based on your body weight and sensitivity.',
  keywords:
    'caffeine calculator, daily caffeine intake, safe caffeine limit, pre-workout caffeine, coffee caffeine, caffeine metabolism, caffeine sensitivity',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/caffeine-calculator',
  },
  openGraph: {
    title: 'Caffeine Intake Calculator | HealthCheck',
    description:
      'Calculate your daily caffeine intake, check safe limits, and get personalized pre-workout dose recommendations based on your body weight and sensitivity.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/caffeine-calculator',
    images: [
      {
        url: '/images/calculators/caffeine-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Caffeine Intake Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caffeine Intake Calculator | HealthCheck',
    description:
      'Calculate your daily caffeine intake, check safe limits, and get personalized pre-workout dose recommendations based on your body weight and sensitivity.',
    images: ['/images/calculators/caffeine-calculator.jpg'],
  },
};

export default function CaffeineCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
