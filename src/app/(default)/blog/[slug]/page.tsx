import PageClient from './page.client';

import { generateMetadata as routeGenerateMetadata } from './layout';
export const generateMetadata = routeGenerateMetadata;

export default function Page() {
  return <PageClient />;
}
