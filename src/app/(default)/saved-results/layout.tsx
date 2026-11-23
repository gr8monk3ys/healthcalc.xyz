import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  // Shows only the visitor's own saved data, so crawlers see an empty page.
  robots: { index: false, follow: true },
  title: 'Saved Results | HealthCalc',
  description: 'Review and manage your saved calculator results in one place.',
  alternates: { canonical: './' },
  openGraph: {
    title: 'Saved Results | HealthCalc',
    description: 'Review and manage your saved calculator results in one place.',
    url: './',
  },
};

export default function SavedResultsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
