import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'BMI Calculator | HealthCheck',
  description:
    'Calculate BMI instantly with metric or imperial inputs and see your healthy weight range.',
  keywords: 'BMI calculator, body mass index, healthy weight, weight calculator, BMI chart',
  alternates: {
    canonical: 'https://www.heathcheck.info/bmi',
  },
  openGraph: {
    title: 'BMI Calculator | HealthCheck',
    description:
      'Calculate BMI instantly with metric or imperial inputs and see your healthy weight range.',
    type: 'website',
    url: 'https://www.heathcheck.info/bmi',
    images: [
      {
        url: '/images/calculators/bmi-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator | HealthCheck',
    description:
      'Calculate BMI instantly with metric or imperial inputs and see your healthy weight range.',
    images: ['/images/calculators/bmi-calculator.jpg'],
  },
};

export default function BMILayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
