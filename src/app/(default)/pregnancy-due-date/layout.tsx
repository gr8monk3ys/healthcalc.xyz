import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator | HealthCheck',
  description:
    'Estimate your pregnancy due date based on last menstrual period or conception date.',
  keywords:
    'pregnancy due date calculator, due date, last menstrual period, conception date, gestational age',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Pregnancy Due Date Calculator | HealthCheck',
    description:
      'Estimate your pregnancy due date based on last menstrual period or conception date.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/pregnancy-due-date-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Pregnancy Due Date Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pregnancy Due Date Calculator | HealthCheck',
    description:
      'Estimate your pregnancy due date based on last menstrual period or conception date.',
    images: ['/images/calculators/pregnancy-due-date-calculator.jpg'],
  },
};

export default function PregnancyDueDateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
