import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">VO2 Max Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Estimate VO2 max using the Rockport 1-mile walk test formula.
          </p>
        </>
      }
    />
  );
}
