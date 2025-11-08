import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Waist-to-Hip Ratio Calculator | WHR Calculator',
  description:
    'Calculate your Waist-to-Hip Ratio (WHR) to assess your body fat distribution and health risks. Learn about apple vs. pear body shapes and their health implications.',
  keywords: [
    'waist-to-hip ratio',
    'whr calculator',
    'body shape calculator',
    'apple shape',
    'pear shape',
    'central obesity',
    'fat distribution',
    'waist circumference',
    'hip circumference',
    'health risk calculator',
  ].join(', '),
  openGraph: {
    title: 'Waist-to-Hip Ratio Calculator | WHR Calculator',
    description:
      'Calculate your Waist-to-Hip Ratio (WHR) to assess your body fat distribution and health risks. Learn about apple vs. pear body shapes and their health implications.',
    url: 'https://www.heathcheck.info/whr',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waist-to-Hip Ratio Calculator | WHR Calculator',
    description:
      'Calculate your Waist-to-Hip Ratio (WHR) to assess your body fat distribution and health risks. Learn about apple vs. pear body shapes and their health implications.',
  },
  alternates: {
    canonical: 'https://www.heathcheck.info/whr',
  },
};

export default metadata;
