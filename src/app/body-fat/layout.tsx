import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
  description:
    'Estimate body fat percentage with Navy, BMI, or manual inputs and see fat vs lean mass.',
  keywords:
    'body fat calculator, body fat percentage, navy method, body composition, fat mass, lean mass, body fat measurement, healthy body fat, body fat categories, fitness calculator',
  alternates: {
    canonical: 'https://www.heathcheck.info/body-fat',
  },
  openGraph: {
    title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
    description:
      'Estimate body fat percentage with Navy, BMI, or manual inputs and see fat vs lean mass.',
    url: 'https://www.heathcheck.info/body-fat',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/calculators/body-fat-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Fat Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
    description:
      'Estimate body fat percentage with Navy, BMI, or manual inputs and see fat vs lean mass.',
    images: ['/images/calculators/body-fat-calculator.jpg'],
  },
};

export default function BodyFatLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
