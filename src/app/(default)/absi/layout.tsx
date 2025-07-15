import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ABSI Calculator | A Body Shape Index Calculator',
  description: 'Calculate ABSI to assess body-shape risk using waist circumference and height.',
  keywords:
    'absi calculator, a body shape index, body shape index, absi z-score, waist circumference, mortality risk, central obesity, body shape, fat distribution, health risk calculator',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'ABSI Calculator | A Body Shape Index Calculator',
    description: 'Calculate ABSI to assess body-shape risk using waist circumference and height.',
    url: './',
    siteName: 'HealthCheck',
    type: 'website',
    images: [
      {
        url: '/images/calculators/absi-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'ABSI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABSI Calculator | A Body Shape Index Calculator',
    description: 'Calculate ABSI to assess body-shape risk using waist circumference and height.',
    images: ['/images/calculators/absi-calculator.jpg'],
  },
};

export default function ABSILayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
