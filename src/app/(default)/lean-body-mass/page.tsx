'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import LeanBodyMassResult from '@/components/calculators/lean-body-mass/LeanBodyMassResult';
import LeanBodyMassInfo from '@/components/calculators/lean-body-mass/LeanBodyMassInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateLeanBodyMass } from '@/utils/calculators/leanBodyMass';
import { validateBodyFatPercentage, validateHeight, validateWeight } from '@/utils/validation';
import type { LeanBodyMassResult as LeanBodyMassResultType } from '@/types/leanBodyMass';
import { Gender } from '@/types/common';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'What is lean body mass?',
    answer:
      'Lean body mass includes everything in your body except fat: muscle, organs, bones, and water.',
  },
  {
    question: 'Is body fat percentage required?',
    answer:
      'No. If you add your body fat %, the result is more precise. Otherwise, we use a standard formula.',
  },
  {
    question: 'How can I increase lean mass?',
    answer:
      'Strength training, adequate protein, and consistent recovery are the primary drivers of lean mass gain.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Lean mass and body fat together give the full body composition picture.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function LeanBodyMassCalculator() {
  const height = useHeight();
  const weight = useWeight();
  const [gender, setGender] = useState<Gender>('male');
  const [bodyFat, setBodyFat] = useState<number | ''>('');
  const [errors, setErrors] = useState<{
    height?: string;
    weight?: string;
    bodyFat?: string;
  }>({});
  const [result, setResult] = useState<LeanBodyMassResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { height?: string; weight?: string; bodyFat?: string } = {};

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

      if (bodyFat !== '' && typeof bodyFat === 'number') {
        const validation = validateBodyFatPercentage(bodyFat);
        if (!validation.isValid) {
          newErrors.bodyFat = validation.error;
        }
      }

      setErrors(newErrors);

      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      if (Object.keys(newErrors).length === 0 && heightCm && weightKg) {
        try {
          const calculated = calculateLeanBodyMass({
            gender,
            heightCm,
            weightKg,
            bodyFatPercentage: bodyFat === '' ? undefined : bodyFat,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('lean-body-mass-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [height, weight, gender, bodyFat]
  );

  const handleReset = useCallback(() => {
    height.setValue('');
    weight.setValue('');
    setGender('male');
    setBodyFat('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [height, weight]);

  return (
    <CalculatorPageLayout
      title="Lean Body Mass Calculator"
      description="Estimate lean body mass using weight, height, and sex."
      calculatorSlug="lean-body-mass"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Lean Body Mass Calculator',
        description: 'Estimate lean body mass using weight, height, and sex.',
        url: 'https://www.healthcalc.xyz/lean-body-mass',
      }}
      understandingSection={<LeanBodyMassInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Lean Body Mass"
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
            {
              name: 'bodyFat',
              label: 'Body Fat % (optional)',
              type: 'number',
              value: bodyFat,
              onChange: setBodyFat,
              error: errors.bodyFat,
              placeholder: 'e.g. 20',
              min: 1,
              max: 70,
              step: '0.1',
            },
          ]}
          submitButtonText="Calculate Lean Mass"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <LeanBodyMassResult result={result} />
        {result && (
          <SaveResult
            calculatorType="lean-body-mass"
            calculatorName="Lean Body Mass Calculator"
            data={{
              leanMassKg: result.leanMassKg,
              leanMassLb: result.leanMassLb,
              fatMassKg: result.fatMassKg,
            }}
          />
        )}
        <AffiliateLinks calculatorType="lean-body-mass" />
      </div>
    </CalculatorPageLayout>
  );
}
