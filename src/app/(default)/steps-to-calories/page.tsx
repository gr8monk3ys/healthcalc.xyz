'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import StepsToCaloriesResult from '@/components/calculators/steps-to-calories/StepsToCaloriesResult';
import StepsToCaloriesInfo from '@/components/calculators/steps-to-calories/StepsToCaloriesInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateStepsToCalories, type StrideUnit } from '@/utils/calculators/stepsToCalories';
import { validateDuration, validateWeight } from '@/utils/validation';
import type { StepsToCaloriesResult as StepsToCaloriesResultType } from '@/types/stepsToCalories';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';
import { convertLength } from '@/utils/conversions';

const faqs = [
  {
    question: 'What stride length should I use?',
    answer:
      'If you are unsure, 26-30 inches is a common average. Wearables can provide a more accurate stride length.',
  },
  {
    question: 'Why is this an estimate?',
    answer:
      'Stride length and pace vary throughout a walk or run. This provides a solid planning estimate.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This is an estimate only.',
  },
];

const relatedArticles = [
  {
    title: 'Best Fitness Trackers for Calorie Tracking',
    description: 'Track steps and calorie burn with more precision.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'January 22, 2025',
    readTime: '9 min read',
    category: 'Performance',
  },
];

export default function StepsToCaloriesCalculator() {
  const weight = useWeight();
  const [steps, setSteps] = useState<number | ''>('');
  const [strideLength, setStrideLength] = useState<number | ''>(30);
  const [strideUnit, setStrideUnit] = useState<StrideUnit>('in');
  const [duration, setDuration] = useState<number | ''>('');
  const [errors, setErrors] = useState<{
    steps?: string;
    strideLength?: string;
    duration?: string;
    weight?: string;
  }>({});
  const [result, setResult] = useState<StepsToCaloriesResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const toggleStrideUnit = useCallback(() => {
    setStrideUnit(prev => {
      const next = prev === 'in' ? 'cm' : 'in';
      if (typeof strideLength === 'number') {
        const converted =
          prev === 'in'
            ? convertLength(strideLength, 'in', 'cm')
            : convertLength(strideLength, 'cm', 'in');
        setStrideLength(parseFloat(converted.toFixed(1)));
      }
      return next;
    });
  }, [strideLength]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: {
        steps?: string;
        strideLength?: string;
        duration?: string;
        weight?: string;
      } = {};

      if (steps === '' || (typeof steps === 'number' && steps <= 0)) {
        newErrors.steps = 'Steps must be greater than 0';
      }

      if (strideLength === '' || (typeof strideLength === 'number' && strideLength <= 0)) {
        newErrors.strideLength = 'Stride length must be greater than 0';
      }

      if (typeof duration !== 'number') {
        newErrors.duration = 'Duration is required';
      } else {
        const validation = validateDuration(duration);
        if (!validation.isValid) {
          newErrors.duration = validation.error;
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

      const weightKg = weight.toKg();

      if (
        Object.keys(newErrors).length === 0 &&
        typeof steps === 'number' &&
        typeof strideLength === 'number' &&
        typeof duration === 'number' &&
        weightKg
      ) {
        try {
          const calculated = calculateStepsToCalories(
            steps,
            strideLength,
            strideUnit,
            duration,
            weightKg
          );
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('steps-to-calories-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [steps, strideLength, strideUnit, duration, weight]
  );

  const handleReset = useCallback(() => {
    setSteps('');
    setStrideLength(30);
    setStrideUnit('in');
    setDuration('');
    weight.setValue('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [weight]);

  return (
    <CalculatorPageLayout
      title="Steps to Calories Calculator"
      description="Estimate calories burned from steps using stride length and duration."
      calculatorSlug="steps-to-calories"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Steps to Calories Calculator',
        description: 'Estimate calories burned from steps using stride length and duration.',
        url: 'https://www.healthcalc.xyz/steps-to-calories',
      }}
      understandingSection={<StepsToCaloriesInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Steps to Calories"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'steps',
              label: 'Steps',
              type: 'number',
              value: steps,
              onChange: setSteps,
              error: errors.steps,
              placeholder: 'e.g. 8000',
              min: 1,
            },
            {
              name: 'strideLength',
              label: 'Stride Length',
              type: 'number',
              value: strideLength,
              onChange: setStrideLength,
              error: errors.strideLength,
              placeholder: strideUnit === 'in' ? 'Inches' : 'Centimeters',
              unit: strideUnit,
              unitToggle: toggleStrideUnit,
              step: '0.1',
            },
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
            createWeightField(weight, errors.weight),
          ]}
          submitButtonText="Calculate Burn"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <StepsToCaloriesResult result={result} />
        {result && (
          <SaveResult
            calculatorType="steps-to-calories"
            calculatorName="Steps to Calories Calculator"
            data={{
              calories: result.calories,
              steps: result.steps,
              durationMinutes: result.durationMinutes,
              distanceMiles: result.distanceMiles,
            }}
          />
        )}
        <AffiliateLinks calculatorType="steps-to-calories" />
      </div>
    </CalculatorPageLayout>
  );
}
