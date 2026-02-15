import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Body Fat Burn Calculator | Activity & Weight Loss Planner',
  description:
    'Calculate calories burned during physical activities and estimate how long it will take to reach your weight loss goals through exercise.',
  keywords:
    'body fat burn calculator, calorie burn calculator, exercise calculator, weight loss planner, activity planner, MET calculator, calories burned, exercise planner',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/body-fat-burn',
  },
  openGraph: {
    title: 'Body Fat Burn Calculator | Activity & Weight Loss Planner',
    description:
      'Calculate calories burned during physical activities and estimate how long it will take to reach your weight loss goals through exercise.',
    url: 'https://www.healthcalc.xyz/body-fat-burn',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/calculators/body-fat-burn-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Fat Burn Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Burn Calculator | Activity & Weight Loss Planner',
    description:
      'Calculate calories burned during physical activities and estimate how long it will take to reach your weight loss goals through exercise.',
    images: ['/images/calculators/body-fat-burn-calculator.jpg'],
  },
};

export default function BodyFatBurnLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
