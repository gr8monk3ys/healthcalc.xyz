import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Body Shape Calculator | HealthCheck',
  description:
    'Classify your body shape and somatotype based on bust, waist, and hip measurements. Discover whether you are an hourglass, pear, apple, rectangle, or inverted triangle, plus your ectomorph, mesomorph, or endomorph classification.',
  keywords:
    'body shape calculator, body type, hourglass, pear, apple, rectangle, somatotype, ectomorph, mesomorph, endomorph',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Body Shape Calculator | HealthCheck',
    description:
      'Classify your body shape and somatotype based on bust, waist, and hip measurements. Discover whether you are an hourglass, pear, apple, rectangle, or inverted triangle, plus your ectomorph, mesomorph, or endomorph classification.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/body-shape-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Shape Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Shape Calculator | HealthCheck',
    description:
      'Classify your body shape and somatotype based on bust, waist, and hip measurements. Discover whether you are an hourglass, pear, apple, rectangle, or inverted triangle, plus your ectomorph, mesomorph, or endomorph classification.',
    images: ['/images/calculators/body-shape-calculator.jpg'],
  },
};

export default function BodyShapeCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
