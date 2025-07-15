import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Intermittent Fasting Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Calculate your personalized intermittent fasting schedule with optimal eating windows,
            meal timing, and nutrition targets. Get a complete IF plan based on your goals,
            lifestyle, and preferred fasting protocol.
          </p>
        </>
      }
    />
  );
}
