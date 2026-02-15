import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Steps to Calories Calculator | HealthCheck',
  description: 'Estimate calories burned from steps using stride length and duration.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/steps-to-calories',
  },
  openGraph: {
    title: 'Steps to Calories Calculator | HealthCheck',
    description: 'Estimate calories burned from steps using stride length and duration.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/steps-to-calories',
    images: [
      {
        url: '/images/calculators/steps-to-calories-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Steps to Calories Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steps to Calories Calculator | HealthCheck',
    description: 'Estimate calories burned from steps using stride length and duration.',
    images: ['/images/calculators/steps-to-calories-calculator.jpg'],
  },
};

export default function StepsToCaloriesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
