import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Ovulation Calculator | HealthCheck',
  description: 'Estimate ovulation and fertile window based on your last period and cycle length.',
  keywords: 'ovulation calculator, fertile window, cycle length, ovulation date, fertility',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/ovulation',
  },
  openGraph: {
    title: 'Ovulation Calculator | HealthCheck',
    description:
      'Estimate ovulation and fertile window based on your last period and cycle length.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/ovulation',
    images: [
      {
        url: '/images/calculators/ovulation-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Ovulation Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ovulation Calculator | HealthCheck',
    description:
      'Estimate ovulation and fertile window based on your last period and cycle length.',
    images: ['/images/calculators/ovulation-calculator.jpg'],
  },
};

export default function OvulationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
