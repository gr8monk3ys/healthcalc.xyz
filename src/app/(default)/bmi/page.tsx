import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

import BMICalculatorClient from '@/components/calculators/bmi/BMICalculatorClient';
import { defaultLocale } from '@/i18n/config';
import { getBMICopy } from '@/i18n/pages/bmi';
import {
  decodeSharedResultFromParamRecord,
  type SearchParamRecord,
  type SharedResultInputMap,
} from '@/utils/resultSharing';

export default async function BMICalculatorPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamRecord>;
}) {
  const resolvedSearchParams = await searchParams;
  const initialSharedPrefill = (decodeSharedResultFromParamRecord(resolvedSearchParams, 'bmi')?.i ??
    null) as SharedResultInputMap['bmi'] | null;

  return (
    <BMICalculatorClient
      copy={getBMICopy(defaultLocale)}
      initialSharedPrefill={initialSharedPrefill}
    />
  );
}
