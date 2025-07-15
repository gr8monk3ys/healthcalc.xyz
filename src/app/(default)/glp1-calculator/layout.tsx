import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'GLP-1 Weight Loss Calculator | HealthCheck',
  description:
    'Calculate personalized nutrition targets while on GLP-1 medications like Ozempic, Wegovy, Mounjaro, or Zepbound. Get protein, calorie, and hydration recommendations.',
  keywords:
    'GLP-1 calculator, Ozempic diet, Wegovy nutrition, Mounjaro calories, semaglutide weight loss, tirzepatide macros, GLP-1 protein needs',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'GLP-1 Weight Loss Calculator | HealthCheck',
    description:
      'Calculate personalized nutrition targets while on GLP-1 medications like Ozempic, Wegovy, Mounjaro, or Zepbound.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/glp1-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'GLP-1 Weight Loss Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GLP-1 Weight Loss Calculator | HealthCheck',
    description: 'Calculate personalized nutrition targets while on GLP-1 medications.',
    images: ['/images/calculators/glp1-calculator.jpg'],
  },
};

export default function GLP1CalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
