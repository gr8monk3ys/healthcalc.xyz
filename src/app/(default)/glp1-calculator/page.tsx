import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">GLP-1 Weight Loss Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Calculate personalized calorie, protein, and hydration targets while on GLP-1
            medications like Ozempic, Wegovy, Mounjaro, or Zepbound. Get evidence-based nutrition
            recommendations to maximize fat loss and preserve muscle.
          </p>
        </>
      }
    />
  );
}
