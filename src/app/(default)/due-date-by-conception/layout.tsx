import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Due Date by Conception Calculator | HealthCheck',
  description: 'Estimate pregnancy due date from conception date.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/due-date-by-conception',
  },
  openGraph: {
    title: 'Due Date by Conception Calculator | HealthCheck',
    description: 'Estimate pregnancy due date from conception date.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/due-date-by-conception',
    images: [
      {
        url: '/images/calculators/due-date-by-conception-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Due Date by Conception Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Due Date by Conception Calculator | HealthCheck',
    description: 'Estimate pregnancy due date from conception date.',
    images: ['/images/calculators/due-date-by-conception-calculator.jpg'],
  },
};

export default function DueDateByConceptionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
