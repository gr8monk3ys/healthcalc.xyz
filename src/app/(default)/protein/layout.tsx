import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Protein Intake Calculator | Daily Protein Needs | HealthCheck',
  description:
    'Calculate your optimal daily protein intake based on weight, activity level, and fitness goals. Get personalized recommendations for muscle building, weight loss, or general health.',
  keywords:
    'protein calculator, daily protein intake, protein needs calculator, protein per kg, protein for muscle gain, protein for weight loss, macros calculator, nutrition calculator',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/protein',
  },
  openGraph: {
    title: 'Protein Intake Calculator | Daily Protein Needs | HealthCheck',
    description:
      'Calculate your optimal daily protein intake based on weight, activity level, and fitness goals. Free calculator with science-backed recommendations.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/protein',
    images: [
      {
        url: '/images/calculators/protein-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Protein Intake Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protein Intake Calculator | Daily Protein Needs | HealthCheck',
    description:
      'Calculate your optimal daily protein intake based on weight, activity level, and fitness goals. Free calculator with personalized recommendations.',
    images: ['/images/calculators/protein-calculator.jpg'],
  },
};

export default function ProteinLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
