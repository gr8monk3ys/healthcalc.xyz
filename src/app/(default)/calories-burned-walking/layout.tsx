import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calories Burned Walking Calculator | HealthCheck',
  description: 'Estimate calories burned while walking based on speed and time.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/calories-burned-walking',
  },
  openGraph: {
    title: 'Calories Burned Walking Calculator | HealthCheck',
    description: 'Estimate calories burned while walking based on speed and time.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/calories-burned-walking',
    images: [
      {
        url: '/images/calculators/calories-burned-walking-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calories Burned Walking Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calories Burned Walking Calculator | HealthCheck',
    description: 'Estimate calories burned while walking based on speed and time.',
    images: ['/images/calculators/calories-burned-walking-calculator.jpg'],
  },
};

export default function CaloriesBurnedWalkingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
