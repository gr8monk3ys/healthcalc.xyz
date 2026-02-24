'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import MaxHeartRateResult from '@/components/calculators/max-heart-rate/MaxHeartRateResult';
import MaxHeartRateInfo from '@/components/calculators/max-heart-rate/MaxHeartRateInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { validateAge } from '@/utils/validation';
import { calculateMaxHeartRate } from '@/utils/calculators/maxHeartRate';
import type { MaxHeartRateResult as MaxHeartRateResultType } from '@/types/maxHeartRate';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';
import { useChainPrefill } from '@/hooks/useChainPrefill';

const faqs = [
  {
    question: 'Which formula should I use?',
    answer:
      'Both are common. The Tanaka formula often aligns better with research, but use either as a guideline.',
  },
  {
    question: 'Does fitness change max heart rate?',
    answer:
      'Training can influence your response, but max heart rate is largely age- and genetics-driven.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. Use this as a training estimate.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Understand how daily energy expenditure impacts your goals.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function MaxHeartRateCalculator() {
  const [age, setAge] = useState<number | ''>('');

  const chainPrefill = useChainPrefill('max-heart-rate');

  useEffect(() => {
    if (!chainPrefill) return;
    if (typeof chainPrefill.age === 'number') setAge(chainPrefill.age);
  }, [chainPrefill, setAge]);

  const chainResultData = useMemo(
    () => ({
      ...(typeof age === 'number' ? { age } : {}),
    }),
    [age]
  );

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<MaxHeartRateResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (typeof age !== 'number') {
          newErrors.age = 'Age is required';
        } else {
          const validation = validateAge(age);
          if (!validation.isValid) {
            newErrors.age = validation.error as string;
          }
        }

        return newErrors;
      },
      calculate: () => {
        const calculated = calculateMaxHeartRate(age as number);
        setTimeout(() => {
          const element = document.getElementById('max-heart-rate-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      setAge('');
    });
  };

  return (
    <CalculatorPageLayout
      title="Max Heart Rate Calculator"
      description="Estimate max heart rate using age-based formulas."
      calculatorSlug="max-heart-rate"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Max Heart Rate Calculator',
        description: 'Estimate max heart rate using age-based formulas.',
        url: 'https://www.healthcalc.xyz/max-heart-rate',
      }}
      understandingSection={<MaxHeartRateInfo />}
      showResultsCapture={showResult}
      chainResultData={chainResultData}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Max Heart Rate"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            {
              name: 'age',
              label: 'Age',
              type: 'number',
              value: age,
              onChange: setAge,
              error: errors.age,
              placeholder: 'Years',
              min: 10,
              max: 100,
            },
          ]}
          submitButtonText="Calculate Max HR"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <MaxHeartRateResult result={result} />
        {result && (
          <SaveResult
            calculatorType="max-heart-rate"
            calculatorName="Max Heart Rate Calculator"
            data={{
              traditional: result.traditional,
              tanaka: result.tanaka,
            }}
          />
        )}
        <AffiliateLinks calculatorType="max-heart-rate" />
      </div>
    </CalculatorPageLayout>
  );
}
