'use client';

import React, { useState } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import RestingHeartRateResult from '@/components/calculators/resting-heart-rate/RestingHeartRateResult';
import RestingHeartRateInfo from '@/components/calculators/resting-heart-rate/RestingHeartRateInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { validateHeartRate } from '@/utils/validation';
import { calculateRestingHeartRate } from '@/utils/calculators/restingHeartRate';
import type { RestingHeartRateResult as RestingHeartRateResultType } from '@/types/restingHeartRate';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

const faqs = [
  {
    question: 'When should I measure resting heart rate?',
    answer:
      'Measure first thing in the morning before caffeine or activity, ideally while still in bed.',
  },
  {
    question: 'Does training lower resting heart rate?',
    answer: 'Yes. Consistent aerobic training often reduces resting heart rate over time.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This is informational only.',
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

export default function RestingHeartRateCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const [restingHeartRate, setRestingHeartRate] = useState<number | ''>('');

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<RestingHeartRateResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};
        if (typeof restingHeartRate !== 'number') {
          newErrors.restingHeartRate = 'Resting heart rate is required';
        } else {
          const validation = validateHeartRate(restingHeartRate, 'Resting heart rate');
          if (!validation.isValid) {
            newErrors.restingHeartRate = validation.error as string;
          }
        }
        return newErrors;
      },
      calculate: () => {
        const calculated = calculateRestingHeartRate(restingHeartRate as number);
        setTimeout(() => {
          const element = document.getElementById('resting-heart-rate-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      setRestingHeartRate('');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Resting Heart Rate Calculator"
      description="Evaluate your resting heart rate and fitness category."
      calculatorSlug="resting-heart-rate"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Resting Heart Rate Calculator',
        description: 'Evaluate your resting heart rate and fitness category.',
        url: 'https://www.healthcalc.xyz/resting-heart-rate',
      }}
      understandingSection={<RestingHeartRateInfo />}
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Resting Heart Rate"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            {
              name: 'restingHeartRate',
              label: 'Resting Heart Rate (bpm)',
              type: 'number',
              value: restingHeartRate,
              onChange: setRestingHeartRate,
              error: errors.restingHeartRate,
              placeholder: 'e.g. 65',
              min: 30,
              max: 120,
            },
          ]}
          submitButtonText="Calculate RHR"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <RestingHeartRateResult result={result} />
        {result && (
          <SaveResult
            calculatorType="resting-heart-rate"
            calculatorName="Resting Heart Rate Calculator"
            data={{
              restingHeartRate: result.restingHeartRate,
              category: result.category,
            }}
          />
        )}
        <AffiliateLinks calculatorType="resting-heart-rate" />
      </div>
    </CalculatorPageLayout>
  );
}
