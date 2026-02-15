import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Carb Intake Calculator | HealthCheck',
  description: 'Calculate daily carbohydrate intake from calories or targets.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/carb-intake',
  },
  openGraph: {
    title: 'Carb Intake Calculator | HealthCheck',
    description: 'Calculate daily carbohydrate intake from calories or targets.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/carb-intake',
    images: [
      {
        url: '/images/calculators/carb-intake-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Carb Intake Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carb Intake Calculator | HealthCheck',
    description: 'Calculate daily carbohydrate intake from calories or targets.',
    images: ['/images/calculators/carb-intake-calculator.jpg'],
  },
};

export default function CarbIntakeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
