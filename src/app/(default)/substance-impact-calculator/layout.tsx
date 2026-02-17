import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Alcohol & Smoking Impact Calculator | HealthCheck',
  description:
    'Calculate the health, financial, and lifespan impact of alcohol and tobacco use. See yearly costs, calorie intake from drinking, and recovery timelines for quitting.',
  keywords:
    'alcohol calculator, smoking impact, cigarette cost calculator, drinking calories, quitting smoking benefits, alcohol health effects',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Alcohol & Smoking Impact Calculator | HealthCheck',
    description:
      'Calculate the health, financial, and lifespan impact of alcohol and tobacco use. See yearly costs, calorie intake from drinking, and recovery timelines for quitting.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/substance-impact-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Alcohol & Smoking Impact Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alcohol & Smoking Impact Calculator | HealthCheck',
    description:
      'Calculate the health, financial, and lifespan impact of alcohol and tobacco use. See yearly costs, calorie intake from drinking, and recovery timelines for quitting.',
    images: ['/images/calculators/substance-impact-calculator.jpg'],
  },
};

export default function SubstanceImpactCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
