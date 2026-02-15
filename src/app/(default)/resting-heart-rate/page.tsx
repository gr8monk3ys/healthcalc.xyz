'use client';

import React, { useState, useCallback } from 'react';
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

export default function RestingHeartRateCalculator() {
  const [restingHeartRate, setRestingHeartRate] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ restingHeartRate?: string }>({});
  const [result, setResult] = useState<RestingHeartRateResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { restingHeartRate?: string } = {};
      if (typeof restingHeartRate !== 'number') {
        newErrors.restingHeartRate = 'Resting heart rate is required';
      } else {
        const validation = validateHeartRate(restingHeartRate, 'Resting heart rate');
        if (!validation.isValid) {
          newErrors.restingHeartRate = validation.error;
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && typeof restingHeartRate === 'number') {
        try {
          const calculated = calculateRestingHeartRate(restingHeartRate);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('resting-heart-rate-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your input.');
        }
      }
    },
    [restingHeartRate]
  );

  const handleReset = useCallback(() => {
    setRestingHeartRate('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
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
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Resting Heart Rate"
          onSubmit={handleSubmit}
          onReset={handleReset}
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
