import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calories Burned Cycling Calculator | HealthCheck',
  description: 'Estimate calories burned while cycling based on speed and time.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/calories-burned-cycling',
  },
  openGraph: {
    title: 'Calories Burned Cycling Calculator | HealthCheck',
    description: 'Estimate calories burned while cycling based on speed and time.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/calories-burned-cycling',
    images: [
      {
        url: '/images/calculators/calories-burned-cycling-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calories Burned Cycling Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calories Burned Cycling Calculator | HealthCheck',
    description: 'Estimate calories burned while cycling based on speed and time.',
    images: ['/images/calculators/calories-burned-cycling-calculator.jpg'],
  },
};

export default function CaloriesBurnedCyclingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
