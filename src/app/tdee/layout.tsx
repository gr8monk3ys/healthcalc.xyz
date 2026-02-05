import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'TDEE Calculator | HealthCheck',
  description: 'Estimate TDEE and daily calorie needs based on activity level and goals.',
  keywords:
    'TDEE calculator, total daily energy expenditure, calorie calculator, BMR calculator, daily calorie needs',
  alternates: {
    canonical: 'https://www.heathcheck.info/tdee',
  },
  openGraph: {
    title: 'TDEE Calculator | HealthCheck',
    description: 'Estimate TDEE and daily calorie needs based on activity level and goals.',
    type: 'website',
    url: 'https://www.heathcheck.info/tdee',
    images: [
      {
        url: '/images/calculators/tdee-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'TDEE Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Calculator | HealthCheck',
    description: 'Estimate TDEE and daily calorie needs based on activity level and goals.',
    images: ['/images/calculators/tdee-calculator.jpg'],
  },
};

export default function TDEELayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
