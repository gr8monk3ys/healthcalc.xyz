import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Body Surface Area Calculator | HealthCheck',
  description: 'Calculate body surface area using height and weight.',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Body Surface Area Calculator | HealthCheck',
    description: 'Calculate body surface area using height and weight.',
    type: 'website',
    url: './',
    images: [
      {
        url: '/images/calculators/body-surface-area-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Surface Area Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Surface Area Calculator | HealthCheck',
    description: 'Calculate body surface area using height and weight.',
    images: ['/images/calculators/body-surface-area-calculator.jpg'],
  },
};

export default function BodySurfaceAreaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
