import { Suspense } from 'react';
import ReportPageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function ReportPage() {
  return (
    <Suspense fallback={null}>
      <ReportPageClient />
    </Suspense>
  );
}
