import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TDEE Calculator | HealthCheck',
  description:
    'Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily calorie needs.',
  keywords:
    'TDEE calculator, total daily energy expenditure, calorie calculator, BMR calculator, daily calorie needs',
  alternates: {
    canonical: 'https://www.heathcheck.info/tdee',
  },
  openGraph: {
    title: 'TDEE Calculator | HealthCheck',
    description:
      'Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily calorie needs.',
    type: 'website',
    images: [
      {
        url: '/images/tdee-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'TDEE Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Calculator | HealthCheck',
    description:
      'Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily calorie needs.',
    images: ['/images/tdee-calculator-og.jpg'],
  },
};
