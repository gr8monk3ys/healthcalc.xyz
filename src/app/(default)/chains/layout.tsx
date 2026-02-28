import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guided Health Workflows | HealthCheck',
  description:
    'Follow step-by-step health assessment workflows. Connect multiple calculators to get a complete picture of your body composition, nutrition needs, and fitness level.',
  openGraph: {
    title: 'Guided Health Workflows | HealthCheck',
    description:
      'Follow step-by-step health assessment workflows. Connect multiple calculators to get a complete picture.',
  },
};

export default function ChainsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
