'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import AgeResult from '@/components/calculators/age/AgeResult';
import AgeInfo from '@/components/calculators/age/AgeInfo';
import SaveResult from '@/components/SaveResult';
import AffiliateLinks from '@/components/AffiliateLinks';
import { calculateAge } from '@/utils/calculators/age';
import type { AgeResult as AgeResultType } from '@/types/age';

const faqs = [
  {
    question: 'Can I use this for official forms?',
    answer:
      'It is a good estimate, but always verify with official documents or records if required.',
  },
  {
    question: 'Why does the result show months and days?',
    answer:
      'Months and days provide a precise age breakdown, which can be useful for medical or fitness plans.',
  },
  {
    question: 'Can I calculate age at a past or future date?',
    answer: 'Yes, select a reference date to calculate your age at that time.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Age influences metabolism and daily energy needs.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [referenceDate, setReferenceDate] = useState<string>('');
  const [errors, setErrors] = useState<{ birthDate?: string; referenceDate?: string }>({});
  const [result, setResult] = useState<AgeResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { birthDate?: string; referenceDate?: string } = {};

      if (!birthDate) {
        newErrors.birthDate = 'Birth date is required';
      }

      if (referenceDate && birthDate && new Date(referenceDate) < new Date(birthDate)) {
        newErrors.referenceDate = 'Reference date must be after birth date';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          const calculated = calculateAge(birthDate, referenceDate || undefined);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('age-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your dates.');
        }
      }
    },
    [birthDate, referenceDate]
  );

  const handleReset = useCallback(() => {
    setBirthDate('');
    setReferenceDate('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days."
      calculatorSlug="age"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days.',
        url: 'https://www.healthcalc.xyz/age',
      }}
      understandingSection={<AgeInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Age Calculator"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'birthDate',
              label: 'Birth Date',
              type: 'date',
              value: birthDate,
              onChange: setBirthDate,
              error: errors.birthDate,
            },
            {
              name: 'referenceDate',
              label: 'Reference Date (optional)',
              type: 'date',
              value: referenceDate,
              onChange: setReferenceDate,
              error: errors.referenceDate,
            },
          ]}
          submitButtonText="Calculate Age"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <AgeResult result={result} />
        {result && (
          <SaveResult
            calculatorType="age"
            calculatorName="Age Calculator"
            data={{
              years: result.years,
              months: result.months,
              days: result.days,
              totalDays: result.totalDays,
            }}
          />
        )}
        <AffiliateLinks calculatorType="age" />
      </div>
    </CalculatorPageLayout>
  );
}
