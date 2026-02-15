import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Embed Free Health Calculators on Your Website | HealthCheck',
  description:
    'Add free, accurate health calculators to your website. Embed BMI, TDEE, Body Fat, and Calorie Deficit calculators with a simple iframe code snippet.',
  keywords:
    'embed calculator, free health calculator widget, BMI calculator embed, TDEE widget, website calculator, iframe health tools',
  alternates: {
    canonical: 'https://www.healthcalc.xyz/embed',
  },
  openGraph: {
    title: 'Embed Free Health Calculators on Your Website | HealthCheck',
    description:
      'Add free, accurate health calculators to your website. Embed BMI, TDEE, Body Fat, and Calorie Deficit calculators with a simple iframe code snippet.',
    type: 'website',
    url: 'https://www.healthcalc.xyz/embed',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Embed Free Health Calculators | HealthCheck',
    description: 'Add free health calculators to your website with a simple copy-paste embed code.',
  },
};

export default function EmbedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
