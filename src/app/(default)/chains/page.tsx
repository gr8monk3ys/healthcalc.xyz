import { Suspense } from 'react';
import ChainsPageClient from './page.client';

export default function ChainsPage(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <ChainsPageClient />
    </Suspense>
  );
}
