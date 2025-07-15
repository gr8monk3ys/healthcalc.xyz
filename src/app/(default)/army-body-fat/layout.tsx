import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Army Body Fat Calculator | HealthCheck',
  description: 'Estimate body fat percentage using U.S. Army circumference method.',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Army Body Fat Calculator | HealthCheck',
    description: 'Estimate body fat percentage using U.S. Army circumference method.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/army-body-fat-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Army Body Fat Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Army Body Fat Calculator | HealthCheck',
    description: 'Estimate body fat percentage using U.S. Army circumference method.',
    images: ['/images/calculators/army-body-fat-calculator.jpg'],
  },
};

export default function ArmyBodyFatLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
