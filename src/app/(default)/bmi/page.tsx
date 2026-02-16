import BMICalculatorClient from '@/components/calculators/bmi/BMICalculatorClient';
import { defaultLocale } from '@/i18n/config';
import { getBMICopy } from '@/i18n/pages/bmi';

export default function BMICalculatorPage() {
  return <BMICalculatorClient copy={getBMICopy(defaultLocale)} />;
}
