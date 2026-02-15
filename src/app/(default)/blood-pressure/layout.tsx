import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blood Pressure Calculator | HealthCheck',
  description:
    'Check your blood pressure category using systolic and diastolic readings. Understand normal, elevated, and hypertension ranges.',
  keywords:
    'blood pressure calculator, systolic, diastolic, hypertension, elevated blood pressure, blood pressure categories',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/blood-pressure',
  },
  openGraph: {
    title: 'Blood Pressure Calculator | HealthCheck',
    description:
      'Check your blood pressure category using systolic and diastolic readings. Understand normal, elevated, and hypertension ranges.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/blood-pressure',
    images: [
      {
        url: '/images/calculators/blood-pressure-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Blood Pressure Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blood Pressure Calculator | HealthCheck',
    description: 'Check your blood pressure category using systolic and diastolic readings.',
    images: ['/images/calculators/blood-pressure-calculator.jpg'],
  },
};

export default function BloodPressureLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
