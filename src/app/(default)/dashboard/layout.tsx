import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { buildLanguageAlternates } from '@/i18n/alternates';

export const metadata: Metadata = {
  title: 'Health Dashboard | HealthCheck',
  description: 'Track your saved health metrics, trends, and milestones in one dashboard.',
  alternates: {
    ...buildLanguageAlternates('/dashboard'),
  },
  openGraph: {
    title: 'Health Dashboard | HealthCheck',
    description: 'Track your saved health metrics, trends, and milestones in one dashboard.',
    url: './',
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
