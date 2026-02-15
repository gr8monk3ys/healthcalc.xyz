'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import TargetHeartRateResult from '@/components/calculators/target-heart-rate/TargetHeartRateResult';
import TargetHeartRateInfo from '@/components/calculators/target-heart-rate/TargetHeartRateInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateTargetHeartRate } from '@/utils/calculators/targetHeartRate';
import { validateAge, validateHeartRate } from '@/utils/validation';
import type { TargetHeartRateResult as TargetHeartRateResultType } from '@/types/targetHeartRate';

const faqs = [
  {
    question: 'What intensity should I use?',
    answer:
      'For general cardio, 50-70% is a common range. For higher intensity, 70-85% is typical.',
  },
  {
    question: 'Should I enter resting heart rate?',
    answer:
      'If you know it, resting heart rate makes the calculation more personalized (Karvonen method).',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. Use this as training guidance and consult a professional if needed.',
  },
];

const relatedArticles = [
  {
    title: 'Best Fitness Trackers for Calorie Tracking',
    description: 'Wearables can measure heart rate zones in real time.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'January 22, 2025',
    readTime: '9 min read',
    category: 'Performance',
  },
];

export default function TargetHeartRateCalculator() {
  const [age, setAge] = useState<number | ''>('');
  const [restingHeartRate, setRestingHeartRate] = useState<number | ''>('');
  const [intensityMin, setIntensityMin] = useState<number | ''>(50);
  const [intensityMax, setIntensityMax] = useState<number | ''>(85);
  const [errors, setErrors] = useState<{
    age?: string;
    restingHeartRate?: string;
    intensityMin?: string;
    intensityMax?: string;
  }>({});
  const [result, setResult] = useState<TargetHeartRateResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: {
        age?: string;
        restingHeartRate?: string;
        intensityMin?: string;
        intensityMax?: string;
      } = {};

      if (typeof age !== 'number') {
        newErrors.age = 'Age is required';
      } else {
        const validation = validateAge(age);
        if (!validation.isValid) {
          newErrors.age = validation.error;
        }
      }

      if (restingHeartRate !== '' && typeof restingHeartRate === 'number') {
        const validation = validateHeartRate(restingHeartRate, 'Resting heart rate');
        if (!validation.isValid) {
          newErrors.restingHeartRate = validation.error;
        }
      }

      if (typeof intensityMin !== 'number' || intensityMin < 40 || intensityMin > 90) {
        newErrors.intensityMin = 'Minimum intensity should be 40-90%';
      }

      if (typeof intensityMax !== 'number' || intensityMax < 50 || intensityMax > 95) {
        newErrors.intensityMax = 'Maximum intensity should be 50-95%';
      }

      if (
        typeof intensityMin === 'number' &&
        typeof intensityMax === 'number' &&
        intensityMax <= intensityMin
      ) {
        newErrors.intensityMax = 'Maximum intensity must be higher than minimum';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && typeof age === 'number') {
        try {
          const calculated = calculateTargetHeartRate({
            age,
            intensityMin: intensityMin as number,
            intensityMax: intensityMax as number,
            restingHeartRate: restingHeartRate === '' ? undefined : restingHeartRate,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('target-heart-rate-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [age, restingHeartRate, intensityMin, intensityMax]
  );

  const handleReset = useCallback(() => {
    setAge('');
    setRestingHeartRate('');
    setIntensityMin(50);
    setIntensityMax(85);
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Target Heart Rate Calculator"
      description="Calculate target heart rate zones for cardio training."
      calculatorSlug="target-heart-rate"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Target Heart Rate Calculator',
        description: 'Calculate target heart rate zones for cardio training.',
        url: 'https://www.healthcalc.xyz/target-heart-rate',
      }}
      understandingSection={<TargetHeartRateInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Target Heart Rate"
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
            {
              name: 'restingHeartRate',
              label: 'Resting Heart Rate (optional)',
              type: 'number',
              value: restingHeartRate,
              onChange: setRestingHeartRate,
              error: errors.restingHeartRate,
              placeholder: 'e.g. 60',
              min: 40,
              max: 120,
            },
            {
              name: 'intensityMin',
              label: 'Intensity Min (%)',
              type: 'number',
              value: intensityMin,
              onChange: setIntensityMin,
              error: errors.intensityMin,
              min: 40,
              max: 90,
            },
            {
              name: 'intensityMax',
              label: 'Intensity Max (%)',
              type: 'number',
              value: intensityMax,
              onChange: setIntensityMax,
              error: errors.intensityMax,
              min: 50,
              max: 95,
            },
          ]}
          submitButtonText="Calculate Zone"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <TargetHeartRateResult result={result} />
        {result && (
          <SaveResult
            calculatorType="target-heart-rate"
            calculatorName="Target Heart Rate Calculator"
            data={{
              targetMin: result.targetMin,
              targetMax: result.targetMax,
            }}
          />
        )}
        <AffiliateLinks calculatorType="target-heart-rate" />
      </div>
    </CalculatorPageLayout>
  );
}
