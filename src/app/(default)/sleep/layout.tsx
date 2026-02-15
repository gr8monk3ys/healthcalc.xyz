import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sleep Calculator | HealthCheck',
  description: 'Find ideal bedtimes or wake times based on 90-minute sleep cycles.',
  keywords: 'sleep calculator, sleep cycles, bedtime calculator, wake time calculator',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/sleep',
  },
  openGraph: {
    title: 'Sleep Calculator | HealthCheck',
    description: 'Find ideal bedtimes or wake times based on 90-minute sleep cycles.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/sleep',
    images: [
      {
        url: '/images/calculators/sleep-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Sleep Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep Calculator | HealthCheck',
    description: 'Find ideal bedtimes or wake times based on 90-minute sleep cycles.',
    images: ['/images/calculators/sleep-calculator.jpg'],
  },
};

export default function SleepLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
