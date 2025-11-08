import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Unit Converter | Measurement Conversions | HealthCheck',
  description:
    'Convert between different units of measurement for weight, height, volume, temperature, and energy. Easy-to-use unit conversion tool.',
  keywords:
    'unit converter, measurement conversion, weight converter, height converter, metric to imperial, kg to lbs, cm to feet',
  alternates: {
    canonical: 'https://www.heathcheck.info/conversions',
  },
  openGraph: {
    title: 'Unit Converter | Measurement Conversions | HealthCheck',
    description:
      'Convert between different units of measurement for weight, height, volume, temperature, and energy. Easy-to-use unit conversion tool.',
    type: 'website',
    url: 'https://www.heathcheck.info/conversions',
    images: [
      {
        url: '/images/og-image.jpg',
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
      'Convert between different units for weight, height, volume, temperature, and energy.',
    images: ['/images/og-image.jpg'],
  },
};

export default function ConversionsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
