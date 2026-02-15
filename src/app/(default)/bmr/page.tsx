'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import BMRResult from '@/components/calculators/bmr/BMRResult';
import BMRInfo from '@/components/calculators/bmr/BMRInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateAge, validateHeight, validateWeight } from '@/utils/validation';
import { calculateBMRResult } from '@/utils/calculators/bmr';
import type { BMRResult as BMRResultType } from '@/types/bmr';
import type { Gender } from '@/types/common';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';
import { TDEE_FORMULAS } from '@/constants/tdee';

const faqs = [
  {
    question: 'What is the difference between BMR and TDEE?',
    answer:
      'BMR is calories your body burns at rest. TDEE includes activity and exercise calories.',
  },
  {
    question: 'Which BMR formula should I use?',
    answer:
      'Mifflin-St Jeor is generally recommended. Katch-McArdle is useful if you know body fat percentage.',
  },
  {
    question: 'How often should I recalculate BMR?',
    answer: 'Recalculate after major changes in weight, body composition, or training routine.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Learn how BMR connects to total daily calorie needs.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function BMRCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const height = useHeight();
  const weight = useWeight();
  const [formulaId, setFormulaId] = useState('mifflin_st_jeor');
  const [bodyFat, setBodyFat] = useState<number | ''>('');
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    bodyFat?: string;
  }>({});
  const [result, setResult] = useState<BMRResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { age?: string; height?: string; weight?: string; bodyFat?: string } = {};

      if (isEmpty(age)) {
        newErrors.age = 'Age is required';
      } else {
        const validation = validateAge(age);
        if (!validation.isValid) {
          newErrors.age = validation.error;
        }
      }

      if (isEmpty(height.value)) {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const validation = validateHeight(height.value, unitSystem);
        if (!validation.isValid) {
          newErrors.height = validation.error;
        }
      }

      if (isEmpty(weight.value)) {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const validation = validateWeight(weight.value, unitSystem);
        if (!validation.isValid) {
          newErrors.weight = validation.error;
        }
      }

      if (formulaId === 'katch_mcardle' && !isEmpty(bodyFat)) {
        const numBodyFat = Number(bodyFat);
        if (Number.isNaN(numBodyFat) || numBodyFat <= 0 || numBodyFat >= 70) {
          newErrors.bodyFat = 'Body fat percentage must be between 1 and 70';
        }
      }

      setErrors(newErrors);

      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        typeof heightCm === 'number' &&
        typeof weightKg === 'number'
      ) {
        try {
          const calculated = calculateBMRResult({
            gender,
            age,
            heightCm,
            weightKg,
            formulaId,
            bodyFatPercentage: typeof bodyFat === 'number' ? bodyFat : undefined,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('bmr-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [age, height, weight, gender, formulaId, bodyFat]
  );

  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    height.setValue('');
    weight.setValue('');
    setFormulaId('mifflin_st_jeor');
    setBodyFat('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [height, weight]);

  return (
    <CalculatorPageLayout
      title="BMR Calculator"
      description="Calculate your basal metabolic rate using popular formulas."
      calculatorSlug="bmr"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'BMR Calculator',
        description: 'Calculate your basal metabolic rate using popular formulas.',
        url: 'https://www.healthcalc.xyz/bmr',
      }}
      understandingSection={<BMRInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="BMR"
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
            {
              name: 'age',
              label: 'Age',
              type: 'number',
              value: age,
              onChange: setAge,
              error: errors.age,
              placeholder: 'Years',
            },
            createHeightField(height, errors.height),
            createWeightField(weight, errors.weight),
            {
              name: 'formulaId',
              label: 'Formula',
              type: 'select',
              value: formulaId,
              onChange: setFormulaId,
              options: TDEE_FORMULAS.map(formula => ({
                value: formula.id,
                label: formula.name,
                description: formula.description,
              })),
            },
            {
              name: 'bodyFat',
              label: 'Body fat % (optional)',
              type: 'number',
              value: bodyFat,
              onChange: setBodyFat,
              error: errors.bodyFat,
              placeholder: 'Only for Katch-McArdle',
            },
          ]}
          submitButtonText="Calculate BMR"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <BMRResult result={result} />
        {result && (
          <SaveResult
            calculatorType="bmr"
            calculatorName="BMR Calculator"
            data={{
              bmr: result.bmr,
              formula: result.formulaName,
            }}
          />
        )}
        <AffiliateLinks calculatorType="bmr" />
      </div>
    </CalculatorPageLayout>
  );
}
