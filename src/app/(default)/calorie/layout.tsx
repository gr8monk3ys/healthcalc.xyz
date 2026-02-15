import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calorie Calculator | HealthCheck',
  description: 'Find your daily calories for maintenance, fat loss, or muscle gain in minutes.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/calorie',
  },
  openGraph: {
    title: 'Calorie Calculator | HealthCheck',
    description: 'Find your daily calories for maintenance, fat loss, or muscle gain in minutes.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/calorie',
    images: [
      {
        url: '/images/calculators/calorie-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calorie Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Calculator | HealthCheck',
    description: 'Find your daily calories for maintenance, fat loss, or muscle gain in minutes.',
    images: ['/images/calculators/calorie-calculator.jpg'],
  },
};

export default function CalorieLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
