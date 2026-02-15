import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Body Frame Size Calculator | HealthCheck',
  description: 'Determine body frame size using height and wrist circumference.',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/body-frame-size',
  },
  openGraph: {
    title: 'Body Frame Size Calculator | HealthCheck',
    description: 'Determine body frame size using height and wrist circumference.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/body-frame-size',
    images: [
      {
        url: '/images/calculators/body-frame-size-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Frame Size Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Frame Size Calculator | HealthCheck',
    description: 'Determine body frame size using height and wrist circumference.',
    images: ['/images/calculators/body-frame-size-calculator.jpg'],
  },
};

export default function BodyFrameSizeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
