import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;
import {
  decodeSharedResultFromParamRecord,
  type SearchParamRecord,
  type SharedResultInputMap,
} from '@/utils/resultSharing';

export default async function Page({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  const resolvedSearchParams = await searchParams;
  const initialSharedPrefill = (decodeSharedResultFromParamRecord(resolvedSearchParams, 'tdee')
    ?.i ?? null) as SharedResultInputMap['tdee'] | null;

  return <PageClient initialSharedPrefill={initialSharedPrefill} />;
}
