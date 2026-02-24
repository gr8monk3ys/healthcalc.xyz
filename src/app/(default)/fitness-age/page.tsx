import { Suspense } from 'react';
import FitnessAgePageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function FitnessAgePage() {
  return (
    <Suspense fallback={null}>
      <FitnessAgePageClient />
    </Suspense>
  );
}
