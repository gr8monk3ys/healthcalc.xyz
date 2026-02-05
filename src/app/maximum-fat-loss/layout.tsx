import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Maximum Fat Loss Calculator | HealthCheck',
  description: 'Calculate optimal cutting calories to maximize fat loss while preserving muscle.',
  keywords:
    'maximum fat loss calculator, optimal calorie deficit, fat loss calculator, muscle preservation, cutting calculator',
  alternates: {
    canonical: 'https://www.heathcheck.info/maximum-fat-loss',
  },
  openGraph: {
    title: 'Maximum Fat Loss Calculator | HealthCheck',
    description: 'Calculate optimal cutting calories to maximize fat loss while preserving muscle.',
    type: 'website',
    url: 'https://www.heathcheck.info/maximum-fat-loss',
    images: [
      {
        url: '/images/calculators/maximum-fat-loss-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Maximum Fat Loss Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maximum Fat Loss Calculator | HealthCheck',
    description: 'Calculate optimal cutting calories to maximize fat loss while preserving muscle.',
    images: ['/images/calculators/maximum-fat-loss-calculator.jpg'],
  },
};

export default function MaximumFatLossLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
