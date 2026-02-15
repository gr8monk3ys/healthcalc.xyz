import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calories Burned Running Calculator | HealthCheck',
  description: 'Estimate calories burned while running based on speed and time.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/calories-burned-running',
  },
  openGraph: {
    title: 'Calories Burned Running Calculator | HealthCheck',
    description: 'Estimate calories burned while running based on speed and time.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/calories-burned-running',
    images: [
      {
        url: '/images/calculators/calories-burned-running-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calories Burned Running Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calories Burned Running Calculator | HealthCheck',
    description: 'Estimate calories burned while running based on speed and time.',
    images: ['/images/calculators/calories-burned-running-calculator.jpg'],
  },
};

export default function CaloriesBurnedRunningLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
