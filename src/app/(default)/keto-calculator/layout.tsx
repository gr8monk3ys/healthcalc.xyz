import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keto Macro Calculator | Personalized Ketogenic Diet Plan',
  description:
    'Calculate your personalized keto macros for fat, protein, and carbs. Choose from standard, targeted, or cyclical keto based on your goals and activity level.',
  keywords: [
    'keto calculator',
    'keto macro calculator',
    'ketogenic diet',
    'keto macros',
    'low carb calculator',
    'net carbs',
    'standard keto',
    'targeted keto',
    'cyclical keto',
    'keto diet plan',
    'ketosis calculator',
  ],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Keto Macro Calculator | Personalized Ketogenic Diet Plan',
    description:
      'Calculate your personalized keto macros for fat, protein, and carbs. Choose from standard, targeted, or cyclical keto based on your goals and activity level.',
    url: './',
    siteName: 'HealthCalc',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Keto Macro Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keto Macro Calculator | Personalized Ketogenic Diet Plan',
    description:
      'Calculate your personalized keto macros for fat, protein, and carbs. Choose from standard, targeted, or cyclical keto based on your goals and activity level.',
    images: ['/images/og-image.jpg'],
  },
};

export default function KetoCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
