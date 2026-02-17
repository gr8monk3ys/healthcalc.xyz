import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Life Expectancy Calculator | HealthCheck',
  description:
    'Estimate your life expectancy based on lifestyle factors including diet, exercise, smoking, sleep, stress, and chronic conditions. Get personalized recommendations to improve your longevity.',
  keywords:
    'life expectancy calculator, longevity, how long will I live, lifespan calculator, health age, lifestyle impact',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Life Expectancy Calculator | HealthCheck',
    description:
      'Estimate your life expectancy based on lifestyle factors including diet, exercise, smoking, sleep, stress, and chronic conditions. Get personalized recommendations to improve your longevity.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/life-expectancy-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Life Expectancy Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Expectancy Calculator | HealthCheck',
    description:
      'Estimate your life expectancy based on lifestyle factors including diet, exercise, smoking, sleep, stress, and chronic conditions. Get personalized recommendations to improve your longevity.',
    images: ['/images/calculators/life-expectancy-calculator.jpg'],
  },
};

export default function LifeExpectancyCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
