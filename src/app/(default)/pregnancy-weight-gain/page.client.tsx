'use client';

import React from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import PregnancyWeightGainResult from '@/components/calculators/pregnancy-weight-gain/PregnancyWeightGainResult';
import PregnancyWeightGainInfo from '@/components/calculators/pregnancy-weight-gain/PregnancyWeightGainInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculatePregnancyWeightGain } from '@/utils/calculators/pregnancyWeightGain';
import { validateHeight, validateWeight } from '@/utils/validation';
import type { PregnancyWeightGainResult as PregnancyWeightGainResultType } from '@/types/pregnancyWeightGain';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

const faqs = [
  {
    question: 'What weight should I gain during pregnancy?',
    answer:
      'Recommended gain depends on pre-pregnancy BMI. This calculator provides general ranges only.',
  },
  {
    question: 'Does this apply to multiples?',
    answer:
      'No. Twin or multiple pregnancies have different guidelines. Ask your provider for specific targets.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. Always follow personalized advice from your healthcare provider.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Learn how energy needs change over time.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Context for body composition metrics.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function PregnancyWeightGainCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const height = useHeight();
  const weight = useWeight();

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<PregnancyWeightGainResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (typeof height.value !== 'number') {
          newErrors.height = 'Height is required';
        } else {
          const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
          const validation = validateHeight(height.value, unitSystem);
          if (!validation.isValid) {
            newErrors.height = validation.error ?? 'Invalid height';
          }
        }

        if (typeof weight.value !== 'number') {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const validation = validateWeight(weight.value, unitSystem);
          if (!validation.isValid) {
            newErrors.weight = validation.error ?? 'Invalid weight';
          }
        }

        return newErrors;
      },
      calculate: () => {
        const heightCm = height.toCm();
        const weightKg = weight.toKg();
        const calculated = calculatePregnancyWeightGain({
          heightCm: heightCm!,
          weightKg: weightKg!,
        });
        setTimeout(() => {
          const element = document.getElementById('pregnancy-weight-gain-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      height.setValue('');
      weight.setValue('');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Pregnancy Weight Gain Calculator"
      description="Estimate recommended pregnancy weight gain by BMI."
      calculatorSlug="pregnancy-weight-gain"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Pregnancy Weight Gain Calculator',
        description: 'Estimate recommended pregnancy weight gain by BMI.',
        url: 'https://www.healthcalc.xyz/pregnancy-weight-gain',
      }}
      understandingSection={<PregnancyWeightGainInfo />}
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Pregnancy Weight Gain"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            createHeightField(height, errors.height),
            createWeightField(weight, errors.weight),
          ]}
          submitButtonText="Calculate Guidance"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <PregnancyWeightGainResult result={result} />
        {result && (
          <SaveResult
            calculatorType="pregnancy-weight-gain"
            calculatorName="Pregnancy Weight Gain Calculator"
            data={{
              bmi: result.bmi,
              totalGainLb: `${result.totalGain.minLb}-${result.totalGain.maxLb}`,
            }}
          />
        )}
        <AffiliateLinks calculatorType="pregnancy-weight-gain" />
      </div>
    </CalculatorPageLayout>
  );
}
