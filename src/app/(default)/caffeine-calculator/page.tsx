import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Caffeine Intake Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Calculate your daily caffeine intake from coffee, tea, energy drinks, and more. Get
            personalized recommendations for safe limits and optimal pre-workout dosing based on
            your body weight and metabolism.
          </p>
        </>
      }
    />
  );
}
