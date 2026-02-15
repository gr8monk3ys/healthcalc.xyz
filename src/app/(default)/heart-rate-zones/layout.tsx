import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Heart Rate Zones Calculator | HealthCheck',
  description:
    'Calculate personalized heart rate training zones using percent max or Karvonen method.',
  keywords:
    'heart rate zones calculator, training zones, max heart rate, karvonen, endurance training',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/heart-rate-zones',
  },
  openGraph: {
    title: 'Heart Rate Zones Calculator | HealthCheck',
    description:
      'Calculate personalized heart rate training zones using percent max or Karvonen method.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/heart-rate-zones',
    images: [
      {
        url: '/images/calculators/heart-rate-zones-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Heart Rate Zones Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heart Rate Zones Calculator | HealthCheck',
    description:
      'Calculate personalized heart rate training zones using percent max or Karvonen method.',
    images: ['/images/calculators/heart-rate-zones-calculator.jpg'],
  },
};

export default function HeartRateZonesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
