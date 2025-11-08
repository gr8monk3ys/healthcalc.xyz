import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BMI Calculator | HealthCheck',
  description:
    'Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height.',
  keywords: 'BMI calculator, body mass index, healthy weight, weight calculator, BMI chart',
  alternates: {
    canonical: 'https://www.heathcheck.info/bmi',
  },
  openGraph: {
    title: 'BMI Calculator | HealthCheck',
    description:
      'Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height.',
    type: 'website',
    images: [
      {
        url: '/images/bmi-calculator-og.jpg',
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
      'Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height.',
    images: ['/images/bmi-calculator-og.jpg'],
  },
};
