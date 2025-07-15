import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

import BMICalculatorClient from '@/components/calculators/bmi/BMICalculatorClient';
import { defaultLocale } from '@/i18n/config';
import { getBMICopy } from '@/i18n/pages/bmi';

export default function BMICalculatorPage() {
  return (
    <BMICalculatorClient
      copy={getBMICopy(defaultLocale)}
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Find your BMI and healthy weight range.
          </p>
        </>
      }
    />
  );
}
