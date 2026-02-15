'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import CaloriesBurnedSwimmingResult from '@/components/calculators/calories-burned-swimming/CaloriesBurnedSwimmingResult';
import CaloriesBurnedSwimmingInfo from '@/components/calculators/calories-burned-swimming/CaloriesBurnedSwimmingInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import {
  calculateCaloriesBurnedSwimming,
  type SwimmingIntensity,
} from '@/utils/calculators/caloriesBurnedSwimming';
import { validateDuration, validateWeight } from '@/utils/validation';
import type { CaloriesBurnedSwimmingResult as CaloriesBurnedSwimmingResultType } from '@/types/caloriesBurnedSwimming';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'Which intensity should I choose?',
    answer: 'Pick the option that best matches your average effort during the swim.',
  },
  {
    question: 'Does stroke type matter?',
    answer: 'Yes. Different strokes burn different amounts, so treat this as an estimate.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This is an estimate only.',
  },
];

const relatedArticles = [
  {
    title: 'Best Fitness Trackers for Calorie Tracking',
    description: 'Track swim time and heart rate with more accuracy.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'January 22, 2025',
    readTime: '9 min read',
    category: 'Performance',
  },
];

const intensityOptions = [
  {
    value: 'easy',
    label: 'Easy / Recreational',
    description: 'Light effort, conversational pace.',
  },
  {
    value: 'moderate',
    label: 'Moderate / Steady',
    description: 'Sustained effort, steady breathing.',
  },
  { value: 'vigorous', label: 'Vigorous / Fast', description: 'Hard effort, challenging pace.' },
];

export default function CaloriesBurnedSwimmingCalculator() {
  const weight = useWeight();
  const [duration, setDuration] = useState<number | ''>('');
  const [intensity, setIntensity] = useState<SwimmingIntensity>('moderate');
  const [errors, setErrors] = useState<{ weight?: string; duration?: string }>({});
  const [result, setResult] = useState<CaloriesBurnedSwimmingResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { weight?: string; duration?: string } = {};

      if (typeof weight.value !== 'number') {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const validation = validateWeight(weight.value, unitSystem);
        if (!validation.isValid) {
          newErrors.weight = validation.error;
        }
      }

      if (typeof duration !== 'number') {
        newErrors.duration = 'Duration is required';
      } else {
        const validation = validateDuration(duration);
        if (!validation.isValid) {
          newErrors.duration = validation.error;
        }
      }

      setErrors(newErrors);

      const weightKg = weight.toKg();

      if (Object.keys(newErrors).length === 0 && weightKg && typeof duration === 'number') {
        try {
          const calculated = calculateCaloriesBurnedSwimming(weightKg, duration, intensity);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('calories-burned-swimming-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your input.');
        }
      }
    },
    [weight, duration, intensity]
  );

  const handleReset = useCallback(() => {
    weight.setValue('');
    setDuration('');
    setIntensity('moderate');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [weight]);

  return (
    <CalculatorPageLayout
      title="Calories Burned Swimming Calculator"
      description="Estimate calories burned while swimming based on intensity and time."
      calculatorSlug="calories-burned-swimming"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Calories Burned Swimming Calculator',
        description: 'Estimate calories burned while swimming based on intensity and time.',
        url: 'https://www.healthcalc.xyz/calories-burned-swimming',
      }}
      understandingSection={<CaloriesBurnedSwimmingInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Calories Burned Swimming"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            createWeightField(weight, errors.weight),
            {
              name: 'duration',
              label: 'Duration (minutes)',
              type: 'number',
              value: duration,
              onChange: setDuration,
              error: errors.duration,
              placeholder: 'Minutes',
              min: 1,
              max: 1440,
            },
            {
              name: 'intensity',
              label: 'Intensity',
              type: 'select',
              value: intensity,
              onChange: value => setIntensity(value as SwimmingIntensity),
              options: intensityOptions,
            },
          ]}
          submitButtonText="Calculate Burn"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <CaloriesBurnedSwimmingResult result={result} />
        {result && (
          <SaveResult
            calculatorType="calories-burned-swimming"
            calculatorName="Calories Burned Swimming Calculator"
            data={{
              calories: result.calories,
              durationMinutes: result.durationMinutes,
              intensity: result.intensity,
            }}
          />
        )}
        <AffiliateLinks calculatorType="calories-burned-swimming" />
      </div>
    </CalculatorPageLayout>
  );
}
