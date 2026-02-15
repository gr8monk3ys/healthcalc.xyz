'use client';

import React, { useState, useCallback } from 'react';
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
  const [errors, setErrors] = useState<{ age?: string }>({});
  const [result, setResult] = useState<MaxHeartRateResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { age?: string } = {};

      if (typeof age !== 'number') {
        newErrors.age = 'Age is required';
      } else {
        const validation = validateAge(age);
        if (!validation.isValid) {
          newErrors.age = validation.error;
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && typeof age === 'number') {
        try {
          const calculated = calculateMaxHeartRate(age);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('max-heart-rate-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your input.');
        }
      }
    },
    [age]
  );

  const handleReset = useCallback(() => {
    setAge('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

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
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Max Heart Rate"
          onSubmit={handleSubmit}
          onReset={handleReset}
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
