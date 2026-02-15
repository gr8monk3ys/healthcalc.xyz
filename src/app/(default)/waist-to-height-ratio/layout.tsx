import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Waist-to-Height Ratio Calculator | HealthCheck',
  description: 'Calculate your waist-to-height ratio to assess body shape and health risk.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/waist-to-height-ratio',
  },
  openGraph: {
    title: 'Waist-to-Height Ratio Calculator | HealthCheck',
    description: 'Calculate your waist-to-height ratio to assess body shape and health risk.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/waist-to-height-ratio',
    images: [
      {
        url: '/images/calculators/waist-to-height-ratio-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Waist-to-Height Ratio Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waist-to-Height Ratio Calculator | HealthCheck',
    description: 'Calculate your waist-to-height ratio to assess body shape and health risk.',
    images: ['/images/calculators/waist-to-height-ratio-calculator.jpg'],
  },
};

export default function WaistToHeightRatioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
