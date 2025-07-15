import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Body Recomposition Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Calculate your calorie cycling and macro targets to lose fat and build muscle
            simultaneously. Get personalized nutrition recommendations based on your training
            experience and goals.
          </p>
        </>
      }
    />
  );
}
