import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Macro Calculator | Calculate Daily Protein, Carbs & Fat | HealthCheck',
  description:
    'Calculate your daily macronutrient targets (protein, carbohydrates, fat) based on your TDEE, activity level, and dietary goals. Free macro calculator for weight loss, maintenance, or muscle gain.',
  keywords:
    'macro calculator, macronutrient calculator, protein calculator, carbs calculator, fat calculator, IIFYM calculator, diet calculator, nutrition calculator, fitness macros',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/macro',
  },
  openGraph: {
    title: 'Macro Calculator | Calculate Daily Protein, Carbs & Fat | HealthCheck',
    description:
      'Calculate your optimal daily macronutrient intake for weight loss, maintenance, or muscle gain. Get personalized protein, carbs, and fat targets based on your goals.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/macro',
    images: [
      {
        url: '/images/calculators/macro-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Macro Calculator - Calculate Your Daily Macronutrients',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Macro Calculator | Calculate Daily Protein, Carbs & Fat',
    description:
      'Calculate your optimal daily macronutrient intake for weight loss, maintenance, or muscle gain with our free macro calculator.',
    images: ['/images/calculators/macro-calculator.jpg'],
  },
};

export default function MacroLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
