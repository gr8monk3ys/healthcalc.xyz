import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Unit Converter | Measurement Conversions | HealthCheck',
  description:
    'Convert weight, height, volume, temperature, and energy units quickly and accurately.',
  keywords:
    'unit converter, measurement conversion, weight converter, height converter, metric to imperial, kg to lbs, cm to feet',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/conversions',
  },
  openGraph: {
    title: 'Unit Converter | Measurement Conversions | HealthCheck',
    description:
      'Convert weight, height, volume, temperature, and energy units quickly and accurately.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/conversions',
    images: [
      {
        url: '/images/calculators/conversions-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Unit Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter | Measurement Conversions',
    description:
      'Convert weight, height, volume, temperature, and energy units quickly and accurately.',
    images: ['/images/calculators/conversions-calculator.jpg'],
  },
};

export default function ConversionsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
