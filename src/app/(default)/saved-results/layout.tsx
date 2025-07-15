import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Saved Results | HealthCheck',
  description: 'Review and manage your saved calculator results in one place.',
  alternates: { canonical: './' },
  openGraph: {
    title: 'Saved Results | HealthCheck',
    description: 'Review and manage your saved calculator results in one place.',
    url: './',
  },
};

export default function SavedResultsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
