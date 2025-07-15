import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Fat Intake Calculator | HealthCheck',
  description: 'Calculate daily fat intake from calories or targets.',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Fat Intake Calculator | HealthCheck',
    description: 'Calculate daily fat intake from calories or targets.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/fat-intake-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fat Intake Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fat Intake Calculator | HealthCheck',
    description: 'Calculate daily fat intake from calories or targets.',
    images: ['/images/calculators/fat-intake-calculator.jpg'],
  },
};

export default function FatIntakeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
