'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import AdjustedBodyWeightResult from '@/components/calculators/adjusted-body-weight/AdjustedBodyWeightResult';
import AdjustedBodyWeightInfo from '@/components/calculators/adjusted-body-weight/AdjustedBodyWeightInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateAdjustedBodyWeight } from '@/utils/calculators/adjustedBodyWeight';
import { validateHeight, validateWeight } from '@/utils/validation';
import type { AdjustedBodyWeightResult as AdjustedBodyWeightResultType } from '@/types/adjustedBodyWeight';
import { Gender } from '@/types/common';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'When is adjusted body weight used?',
    answer:
      'Adjusted body weight is often used in clinical dosing when actual weight is far above ideal weight.',
  },
  {
    question: 'Is this the same as BMI?',
    answer: 'No. Adjusted body weight uses height and weight to estimate dosing weight.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This calculator provides estimates only.',
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

export default function AdjustedBodyWeightCalculator() {
  const height = useHeight();
  const weight = useWeight();
  const [gender, setGender] = useState<Gender>('male');
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});
  const [result, setResult] = useState<AdjustedBodyWeightResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { height?: string; weight?: string } = {};

      if (typeof height.value !== 'number') {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const validation = validateHeight(height.value, unitSystem);
        if (!validation.isValid) {
          newErrors.height = validation.error;
        }
      }

      if (typeof weight.value !== 'number') {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const validation = validateWeight(weight.value, unitSystem);
        if (!validation.isValid) {
          newErrors.weight = validation.error;
        }
      }

      setErrors(newErrors);

      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      if (Object.keys(newErrors).length === 0 && heightCm && weightKg) {
        try {
          const calculated = calculateAdjustedBodyWeight({
            gender,
            heightCm,
            weightKg,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('adjusted-body-weight-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your input.');
        }
      }
    },
    [height, weight, gender]
  );

  const handleReset = useCallback(() => {
    height.setValue('');
    weight.setValue('');
    setGender('male');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [height, weight]);

  return (
    <CalculatorPageLayout
      title="Adjusted Body Weight Calculator"
      description="Estimate adjusted body weight using height and current weight."
      calculatorSlug="adjusted-body-weight"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Adjusted Body Weight Calculator',
        description: 'Estimate adjusted body weight using height and current weight.',
        url: 'https://www.healthcalc.xyz/adjusted-body-weight',
      }}
      understandingSection={<AdjustedBodyWeightInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Adjusted Body Weight"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'gender',
              label: 'Biological Sex',
              type: 'radio',
              value: gender,
              onChange: value => setGender(value as Gender),
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ],
            },
            createHeightField(height, errors.height),
            createWeightField(weight, errors.weight),
          ]}
          submitButtonText="Calculate ABW"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <AdjustedBodyWeightResult result={result} />
        {result && (
          <SaveResult
            calculatorType="adjusted-body-weight"
            calculatorName="Adjusted Body Weight Calculator"
            data={{
              idealBodyWeightKg: result.idealBodyWeightKg,
              adjustedBodyWeightKg: result.adjustedBodyWeightKg,
            }}
          />
        )}
        <AffiliateLinks calculatorType="adjusted-body-weight" />
      </div>
    </CalculatorPageLayout>
  );
}
