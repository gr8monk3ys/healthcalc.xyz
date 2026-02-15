import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Weight Management Planner | HealthCheck',
  description:
    'Plan weight loss or gain with a target date and personalized daily calorie targets.',
  keywords:
    'weight management calculator, weight loss planner, weight gain planner, goal weight calculator, calorie planning',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/weight-management',
  },
  openGraph: {
    title: 'Weight Management Planner | HealthCheck',
    description:
      'Plan weight loss or gain with a target date and personalized daily calorie targets.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/weight-management',
    images: [
      {
        url: '/images/calculators/weight-management-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Weight Management Planner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Management Planner | HealthCheck',
    description:
      'Plan weight loss or gain with a target date and personalized daily calorie targets.',
    images: ['/images/calculators/weight-management-calculator.jpg'],
  },
};

export default function WeightManagementLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
