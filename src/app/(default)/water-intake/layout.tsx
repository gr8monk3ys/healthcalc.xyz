import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Water Intake Calculator | HealthCheck',
  description: 'Calculate your daily water intake based on body weight and activity level.',
  keywords:
    'water intake calculator, hydration, daily water, how much water to drink, hydration calculator',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/water-intake',
  },
  openGraph: {
    title: 'Water Intake Calculator | HealthCheck',
    description: 'Calculate your daily water intake based on body weight and activity level.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/water-intake',
    images: [
      {
        url: '/images/calculators/water-intake-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Water Intake Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Intake Calculator | HealthCheck',
    description: 'Calculate your daily water intake based on body weight and activity level.',
    images: ['/images/calculators/water-intake-calculator.jpg'],
  },
};

export default function WaterIntakeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
