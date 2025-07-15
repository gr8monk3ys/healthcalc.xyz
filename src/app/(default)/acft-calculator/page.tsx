import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">ACFT Score Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Calculate your Army Combat Fitness Test score across all 6 events. Enter your raw
            performance values to get your total score, pass/fail status, category tier, and
            personalized training recommendations.
          </p>
        </>
      }
    />
  );
}
