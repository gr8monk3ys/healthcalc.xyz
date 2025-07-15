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
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

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

export default function StepsToCaloriesCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const weight = useWeight();
  const [steps, setSteps] = useState<number | ''>('');
  const [strideLength, setStrideLength] = useState<number | ''>(30);
  const [strideUnit, setStrideUnit] = useState<StrideUnit>('in');
  const [duration, setDuration] = useState<number | ''>('');

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

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<StepsToCaloriesResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

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
            newErrors.duration = validation.error ?? '';
          }
        }

        if (typeof weight.value !== 'number') {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const validation = validateWeight(weight.value, unitSystem);
          if (!validation.isValid) {
            newErrors.weight = validation.error ?? '';
          }
        }

        return newErrors;
      },
      calculate: () => {
        const weightKg = weight.toKg();
        const calculated = calculateStepsToCalories(
          steps as number,
          strideLength as number,
          strideUnit,
          duration as number,
          weightKg as number
        );
        setTimeout(() => {
          const element = document.getElementById('steps-to-calories-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      setSteps('');
      setStrideLength(30);
      setStrideUnit('in');
      setDuration('');
      weight.setValue('');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
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
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Steps to Calories"
          onSubmit={handleSubmit}
          onReset={onReset}
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
