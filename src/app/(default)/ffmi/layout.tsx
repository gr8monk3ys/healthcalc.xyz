import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'FFMI Calculator | Fat-Free Mass Index Calculator',
  description:
    'Calculate your Fat-Free Mass Index (FFMI) to assess muscle mass development and natural muscular potential. Includes adjusted FFMI and natural limit analysis.',
  keywords:
    'ffmi calculator, fat-free mass index, muscle mass calculator, natural limit, bodybuilding calculator, lean mass index, adjusted ffmi, natural potential, muscle development, steroid detection',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/ffmi',
  },
  openGraph: {
    title: 'FFMI Calculator | Fat-Free Mass Index Calculator',
    description:
      'Calculate your Fat-Free Mass Index (FFMI) to assess muscle mass development and natural muscular potential. Includes adjusted FFMI and natural limit analysis.',
    url: 'https://www.healthcalc.xyz/ffmi',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/calculators/ffmi-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'FFMI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FFMI Calculator | Fat-Free Mass Index Calculator',
    description:
      'Calculate your Fat-Free Mass Index (FFMI) to assess muscle mass development and natural muscular potential. Includes adjusted FFMI and natural limit analysis.',
    images: ['/images/calculators/ffmi-calculator.jpg'],
  },
};

export default function FFMILayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
