import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Life Expectancy Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Estimate your life expectancy based on lifestyle factors including diet, exercise,
            smoking, sleep, stress, social connections, and chronic conditions. Get personalized
            recommendations to improve your longevity.
          </p>
        </>
      }
    />
  );
}
