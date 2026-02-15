import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'VO2 Max Calculator | HealthCheck',
  description: 'Estimate VO2 max using the Rockport 1-mile walk test formula.',
  keywords: 'VO2 max calculator, rockport walk test, cardio fitness, oxygen uptake, fitness test',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/vo2-max',
  },
  openGraph: {
    title: 'VO2 Max Calculator | HealthCheck',
    description: 'Estimate VO2 max using the Rockport 1-mile walk test formula.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/vo2-max',
    images: [
      {
        url: '/images/calculators/vo2-max-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'VO2 Max Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VO2 Max Calculator | HealthCheck',
    description: 'Estimate VO2 max using the Rockport 1-mile walk test formula.',
    images: ['/images/calculators/vo2-max-calculator.jpg'],
  },
};

export default function Vo2MaxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
