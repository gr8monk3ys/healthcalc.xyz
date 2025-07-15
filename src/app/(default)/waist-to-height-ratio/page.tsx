import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Waist-to-Height Ratio Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Calculate your waist-to-height ratio to assess body shape and health risk.
          </p>
        </>
      }
    />
  );
}
