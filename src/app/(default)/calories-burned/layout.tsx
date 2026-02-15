import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calories Burned Calculator | HealthCheck',
  description: 'Estimate calories burned from workouts using weight, duration, and activity.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/calories-burned',
  },
  openGraph: {
    title: 'Calories Burned Calculator | HealthCheck',
    description: 'Estimate calories burned from workouts using weight, duration, and activity.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/calories-burned',
    images: [
      {
        url: '/images/calculators/calories-burned-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calories Burned Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calories Burned Calculator | HealthCheck',
    description: 'Estimate calories burned from workouts using weight, duration, and activity.',
    images: ['/images/calculators/calories-burned-calculator.jpg'],
  },
};

export default function CaloriesBurnedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
