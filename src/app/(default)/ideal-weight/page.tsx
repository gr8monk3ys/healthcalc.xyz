'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import IdealWeightResult from '@/components/calculators/ideal-weight/IdealWeightResult';
import IdealWeightInfo from '@/components/calculators/ideal-weight/IdealWeightInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateHeight } from '@/utils/validation';
import { calculateIdealWeight } from '@/utils/calculators/idealWeight';
import type { IdealWeightResult as IdealWeightResultType } from '@/types/idealWeight';
import type { Gender } from '@/types/common';
import { useHeight, createHeightField } from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'Which ideal weight formula should I use?',
    answer:
      'All of the listed formulas are commonly used. The best approach is to view the range and average across formulas rather than relying on a single number.',
  },
  {
    question: 'Do these formulas account for muscle mass?',
    answer:
      'No. Ideal weight formulas are based on height and gender only. Athletes and highly muscular individuals often weigh more than formulas suggest.',
  },
  {
    question: 'Should I treat ideal weight as a goal?',
    answer:
      'Use it as a guideline. A healthy weight depends on overall health, body composition, and lifestyle.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Body composition offers a more complete picture than weight alone.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
  {
    title: 'Waist-to-Hip Ratio Guide: What Your Measurements Reveal',
    description: 'Learn how fat distribution impacts health risks.',
    slug: 'waist-to-hip-ratio-guide',
    date: 'February 12, 2025',
    readTime: '10 min read',
    category: 'Body Composition',
  },
];

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const height = useHeight();
  const [errors, setErrors] = useState<{ height?: string }>({});
  const [result, setResult] = useState<IdealWeightResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { height?: string } = {};

      if (isEmpty(height.value)) {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const validation = validateHeight(height.value, unitSystem);
        if (!validation.isValid) {
          newErrors.height = validation.error;
        }
      }

      setErrors(newErrors);

      const heightCm = height.toCm();

      if (Object.keys(newErrors).length === 0 && typeof heightCm === 'number') {
        try {
          const calculated = calculateIdealWeight(heightCm, gender);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('ideal-weight-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [height, gender]
  );

  const handleReset = useCallback(() => {
    height.setValue('');
    setGender('male');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [height]);

  return (
    <CalculatorPageLayout
      title="Ideal Weight Calculator"
      description="Estimate your ideal weight range using common formulas."
      calculatorSlug="ideal-weight"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Ideal Weight Calculator',
        description: 'Estimate your ideal weight range using common formulas.',
        url: 'https://www.healthcalc.xyz/ideal-weight',
      }}
      understandingSection={<IdealWeightInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Ideal Weight"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'gender',
              label: 'Gender',
              type: 'radio',
              value: gender,
              onChange: value => setGender(value as Gender),
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ],
            },
            createHeightField(height, errors.height),
          ]}
          submitButtonText="Calculate Ideal Weight"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <IdealWeightResult result={result} />
        {result && (
          <SaveResult
            calculatorType="ideal-weight"
            calculatorName="Ideal Weight Calculator"
            data={{
              heightCm: result.heightCm,
              gender: result.gender,
              averageKg: result.averageKg,
            }}
          />
        )}
        <AffiliateLinks calculatorType="ideal-weight" />
      </div>
    </CalculatorPageLayout>
  );
}
