import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Lean Body Mass Calculator | HealthCheck',
  description: 'Estimate lean body mass using weight, height, and sex.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/lean-body-mass',
  },
  openGraph: {
    title: 'Lean Body Mass Calculator | HealthCheck',
    description: 'Estimate lean body mass using weight, height, and sex.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/lean-body-mass',
    images: [
      {
        url: '/images/calculators/lean-body-mass-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Lean Body Mass Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lean Body Mass Calculator | HealthCheck',
    description: 'Estimate lean body mass using weight, height, and sex.',
    images: ['/images/calculators/lean-body-mass-calculator.jpg'],
  },
};

export default function LeanBodyMassLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
