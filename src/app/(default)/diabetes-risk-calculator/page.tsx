import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Diabetes Risk Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Assess your Type 2 diabetes risk using an ADA-based scoring system, or convert your A1C
            percentage to estimated average glucose.
          </p>
        </>
      }
    />
  );
}
