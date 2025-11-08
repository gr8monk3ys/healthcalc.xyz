import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
  description:
    'Calculate your body fat percentage using the Navy Method, BMI estimation, or manual entry. Get insights on your body composition, fat mass, and lean mass.',
  keywords: [
    'body fat calculator',
    'body fat percentage',
    'navy method',
    'body composition',
    'fat mass',
    'lean mass',
    'body fat measurement',
    'healthy body fat',
    'body fat categories',
    'fitness calculator',
  ].join(', '),
  openGraph: {
    title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
    description:
      'Calculate your body fat percentage using the Navy Method, BMI estimation, or manual entry. Get insights on your body composition, fat mass, and lean mass.',
    url: 'https://www.heathcheck.info/body-fat',
    siteName: 'healthcheck',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator | Calculate Your Body Fat Percentage',
    description:
      'Calculate your body fat percentage using the Navy Method, BMI estimation, or manual entry. Get insights on your body composition, fat mass, and lean mass.',
  },
  alternates: {
    canonical: 'https://www.heathcheck.info/body-fat',
  },
};

export default metadata;
