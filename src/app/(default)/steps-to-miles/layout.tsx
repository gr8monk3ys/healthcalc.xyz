import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Steps to Miles Calculator | HealthCheck',
  description: 'Convert daily steps into miles or kilometers.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/steps-to-miles',
  },
  openGraph: {
    title: 'Steps to Miles Calculator | HealthCheck',
    description: 'Convert daily steps into miles or kilometers.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/steps-to-miles',
    images: [
      {
        url: '/images/calculators/steps-to-miles-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Steps to Miles Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steps to Miles Calculator | HealthCheck',
    description: 'Convert daily steps into miles or kilometers.',
    images: ['/images/calculators/steps-to-miles-calculator.jpg'],
  },
};

export default function StepsToMilesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
