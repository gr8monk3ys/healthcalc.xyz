import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'ABSI Calculator | A Body Shape Index Calculator',
  description:
    'Calculate your A Body Shape Index (ABSI) to assess health risks related to body shape and fat distribution. ABSI is a better predictor of mortality risk than BMI alone.',
  keywords: [
    'absi calculator',
    'a body shape index',
    'body shape index',
    'absi z-score',
    'waist circumference',
    'mortality risk',
    'central obesity',
    'body shape',
    'fat distribution',
    'health risk calculator',
  ].join(', '),
  openGraph: {
    title: 'ABSI Calculator | A Body Shape Index Calculator',
    description:
      'Calculate your A Body Shape Index (ABSI) to assess health risks related to body shape and fat distribution. ABSI is a better predictor of mortality risk than BMI alone.',
    url: 'https://www.heathcheck.info/absi',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABSI Calculator | A Body Shape Index Calculator',
    description:
      'Calculate your A Body Shape Index (ABSI) to assess health risks related to body shape and fat distribution. ABSI is a better predictor of mortality risk than BMI alone.',
  },
  alternates: {
    canonical: 'https://www.heathcheck.info/absi',
  },
};

export default metadata;
