import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Diabetes Risk Calculator | HealthCheck',
  description:
    'Assess your Type 2 diabetes risk using an ADA-based scoring system. Includes A1C to estimated average glucose converter, risk factor analysis, and personalized recommendations.',
  keywords:
    'diabetes risk calculator, type 2 diabetes, blood sugar, A1C converter, prediabetes, diabetes screening',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Diabetes Risk Calculator | HealthCheck',
    description:
      'Assess your Type 2 diabetes risk using an ADA-based scoring system. Includes A1C to estimated average glucose converter, risk factor analysis, and personalized recommendations.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/diabetes-risk-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Diabetes Risk Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diabetes Risk Calculator | HealthCheck',
    description:
      'Assess your Type 2 diabetes risk using an ADA-based scoring system with A1C converter and personalized recommendations.',
    images: ['/images/calculators/diabetes-risk-calculator.jpg'],
  },
};

export default function DiabetesRiskCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
