import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Calorie Deficit Calculator | HealthCheck',
  description:
    'Calculate how long it will take to reach your goal weight with different calorie deficit levels. Plan your weight loss journey effectively.',
  keywords:
    'calorie deficit calculator, weight loss calculator, calorie deficit, weight loss timeline, goal weight calculator',
  alternates: {
    canonical: 'https://www.heathcheck.info/calorie-deficit',
  },
  openGraph: {
    title: 'Calorie Deficit Calculator | HealthCheck',
    description:
      'Calculate how long it will take to reach your goal weight with different calorie deficit levels. Plan your weight loss journey effectively.',
    type: 'website',
    url: 'https://www.heathcheck.info/calorie-deficit',
    images: [
      {
        url: '/images/calculators/calorie-deficit-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Calorie Deficit Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Deficit Calculator | HealthCheck',
    description:
      'Calculate how long it will take to reach your goal weight with different calorie deficit levels.',
    images: ['/images/calculators/calorie-deficit-calculator.jpg'],
  },
};

export default function CalorieDeficitLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
