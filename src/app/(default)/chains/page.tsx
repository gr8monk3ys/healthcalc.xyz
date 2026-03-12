import type { Metadata } from 'next';
import ChainsPageClient from './page.client';

interface ChainsPageProps {
  searchParams: Promise<{ start?: string | string[] }>;
}

export const metadata: Metadata = {
  title: 'Guided Health Workflows | HealthCheck',
  description:
    'Start guided health workflows that carry your inputs between calculators for a smoother assessment flow.',
};

function getInitialChainId(start: string | string[] | undefined): string | null {
  return typeof start === 'string' ? start : null;
}

export default async function ChainsPage({
  searchParams,
}: ChainsPageProps): Promise<React.ReactElement> {
  const resolvedSearchParams = await searchParams;
  return <ChainsPageClient initialChainId={getInitialChainId(resolvedSearchParams.start)} />;
}
