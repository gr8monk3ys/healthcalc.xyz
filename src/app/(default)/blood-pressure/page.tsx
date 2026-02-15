'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import BloodPressureResult from '@/components/calculators/blood-pressure/BloodPressureResult';
import BloodPressureInfo from '@/components/calculators/blood-pressure/BloodPressureInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateSystolic, validateDiastolic } from '@/utils/validation';
import { calculateBloodPressure } from '@/utils/calculators/bloodPressure';
import type { BloodPressureResult as BloodPressureResultType } from '@/types/bloodPressure';

const faqs = [
  {
    question: 'What is a normal blood pressure reading?',
    answer:
      'Normal blood pressure is typically below 120/80 mmHg. Readings between 120-129 systolic and below 80 diastolic are considered elevated.',
  },
  {
    question: 'How often should I check my blood pressure?',
    answer:
      'If you have no history of high blood pressure, check at least once a year. If you are monitoring hypertension, follow your healthcare provider’s guidance.',
  },
  {
    question: 'Does one high reading mean I have hypertension?',
    answer:
      'Not necessarily. Blood pressure varies throughout the day. Use multiple readings over time to understand your baseline and trends.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Learn how body composition metrics relate to health risks and overall wellness.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Understand how daily energy expenditure impacts weight management.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function BloodPressureCalculator() {
  const [systolic, setSystolic] = useState<number | ''>('');
  const [diastolic, setDiastolic] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ systolic?: string; diastolic?: string }>({});
  const [result, setResult] = useState<BloodPressureResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { systolic?: string; diastolic?: string } = {};

      if (isEmpty(systolic)) {
        newErrors.systolic = 'Systolic value is required';
      } else {
        const systolicValidation = validateSystolic(systolic);
        if (!systolicValidation.isValid) {
          newErrors.systolic = systolicValidation.error;
        }
      }

      if (isEmpty(diastolic)) {
        newErrors.diastolic = 'Diastolic value is required';
      } else {
        const diastolicValidation = validateDiastolic(diastolic);
        if (!diastolicValidation.isValid) {
          newErrors.diastolic = diastolicValidation.error;
        }
      }

      setErrors(newErrors);

      if (
        Object.keys(newErrors).length === 0 &&
        typeof systolic === 'number' &&
        typeof diastolic === 'number'
      ) {
        try {
          const calculated = calculateBloodPressure(systolic, diastolic);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('blood-pressure-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [systolic, diastolic]
  );

  const handleReset = useCallback(() => {
    setSystolic('');
    setDiastolic('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Blood Pressure Calculator"
      description="Check your blood pressure category using systolic and diastolic readings."
      calculatorSlug="blood-pressure"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Blood Pressure Calculator',
        description: 'Check your blood pressure category using systolic and diastolic readings.',
        url: 'https://www.healthcalc.xyz/blood-pressure',
      }}
      understandingSection={<BloodPressureInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Blood Pressure"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'systolic',
              label: 'Systolic (mmHg)',
              type: 'number',
              value: systolic,
              onChange: setSystolic,
              error: errors.systolic,
              placeholder: 'e.g., 120',
            },
            {
              name: 'diastolic',
              label: 'Diastolic (mmHg)',
              type: 'number',
              value: diastolic,
              onChange: setDiastolic,
              error: errors.diastolic,
              placeholder: 'e.g., 80',
            },
          ]}
          submitButtonText="Check Category"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <BloodPressureResult result={result} />
        {result && (
          <SaveResult
            calculatorType="blood-pressure"
            calculatorName="Blood Pressure Calculator"
            data={{
              systolic: result.systolic,
              diastolic: result.diastolic,
              category: result.categoryLabel,
            }}
          />
        )}
        <AffiliateLinks calculatorType="blood-pressure" />
      </div>
    </CalculatorPageLayout>
  );
}
