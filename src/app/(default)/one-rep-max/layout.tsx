import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'One Rep Max Calculator | HealthCheck',
  description:
    'Calculate your one rep max (1RM) from submaximal lifts using Epley, Brzycki, or Lombardi formulas. Get training zone recommendations for strength, hypertrophy, and endurance.',
  keywords:
    '1RM calculator, one rep max, strength calculator, weightlifting calculator, Epley formula, Brzycki formula, training zones, powerlifting',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/one-rep-max',
  },
  openGraph: {
    title: 'One Rep Max Calculator | HealthCheck',
    description:
      'Calculate your one rep max (1RM) from submaximal lifts. Get training zone recommendations and percentage charts for programming your workouts.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/one-rep-max',
    images: [
      {
        url: '/images/calculators/one-rep-max-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'One Rep Max Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Rep Max Calculator | HealthCheck',
    description:
      'Calculate your one rep max (1RM) from submaximal lifts. Get training zone recommendations and percentage charts.',
    images: ['/images/calculators/one-rep-max-calculator.jpg'],
  },
};

export default function OneRepMaxLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
