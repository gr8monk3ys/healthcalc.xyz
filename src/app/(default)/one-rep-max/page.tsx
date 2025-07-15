import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">One Rep Max (1RM) Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Estimate your one rep max from submaximal lifts. Get training zone recommendations and a
            percentage chart for programming your workouts.
          </p>
        </>
      }
    />
  );
}
