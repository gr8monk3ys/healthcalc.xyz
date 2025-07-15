import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { buildLanguageAlternates } from '@/i18n/alternates';

export const metadata: Metadata = {
  title: 'Fitness Age Quiz | HealthCheck',
  description:
    'Estimate your fitness age from cardio, body composition, and movement habits. Compare your fitness profile to your chronological age.',
  keywords:
    'fitness age calculator, fitness age quiz, body composition, vo2 max, resting heart rate',
  alternates: {
    ...buildLanguageAlternates('/fitness-age'),
  },
  openGraph: {
    title: 'Fitness Age Quiz | HealthCheck',
    description: 'Estimate your fitness age from cardio, body composition, and movement habits.',
    type: 'website',
    url: './',
  },
};

export default function FitnessAgeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
