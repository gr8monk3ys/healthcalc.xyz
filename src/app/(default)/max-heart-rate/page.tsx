import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Max Heart Rate Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Estimate max heart rate using age-based formulas.
          </p>
        </>
      }
    />
  );
}
