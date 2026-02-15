import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calories Burned Swimming Calculator | HealthCheck',
  description: 'Estimate calories burned while swimming based on intensity and time.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/calories-burned-swimming',
  },
  openGraph: {
    title: 'Calories Burned Swimming Calculator | HealthCheck',
    description: 'Estimate calories burned while swimming based on intensity and time.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/calories-burned-swimming',
    images: [
      {
        url: '/images/calculators/calories-burned-swimming-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calories Burned Swimming Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calories Burned Swimming Calculator | HealthCheck',
    description: 'Estimate calories burned while swimming based on intensity and time.',
    images: ['/images/calculators/calories-burned-swimming-calculator.jpg'],
  },
};

export default function CaloriesBurnedSwimmingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
