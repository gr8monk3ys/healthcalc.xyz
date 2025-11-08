import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Weight Management Planner | HealthCheck',
  description:
    'Plan your weight loss or gain journey with a target date. Get personalized daily calorie recommendations to reach your goal weight.',
  keywords:
    'weight management calculator, weight loss planner, weight gain planner, goal weight calculator, calorie planning',
  alternates: {
    canonical: 'https://www.heathcheck.info/weight-management',
  },
  openGraph: {
    title: 'Weight Management Planner | HealthCheck',
    description:
      'Plan your weight loss or gain journey with a target date. Get personalized daily calorie recommendations to reach your goal weight.',
    type: 'website',
    url: 'https://www.heathcheck.info/weight-management',
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
      'Plan your weight loss or gain journey with personalized daily calorie recommendations.',
    images: ['/images/calculators/weight-management-calculator.jpg'],
  },
};

export default function WeightManagementLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
