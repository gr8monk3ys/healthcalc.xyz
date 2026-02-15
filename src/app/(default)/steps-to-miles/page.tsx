'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import StepsToMilesResult from '@/components/calculators/steps-to-miles/StepsToMilesResult';
import StepsToMilesInfo from '@/components/calculators/steps-to-miles/StepsToMilesInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateStepsToMiles } from '@/utils/calculators/stepsToMiles';
import { convertLength } from '@/utils/conversions';
import type { StepsToMilesResult as StepsToMilesResultType } from '@/types/stepsToMiles';

type StrideUnit = 'in' | 'cm';

const faqs = [
  {
    question: 'What stride length should I use?',
    answer:
      'If you are unsure, 26-30 inches is a common average. Wearables usually provide a more accurate stride length.',
  },
  {
    question: 'Why is this an estimate?',
    answer:
      'Stride length changes with speed, terrain, and height. Use this for a quick conversion.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This calculator provides an estimate for planning.',
  },
];

const relatedArticles = [
  {
    title: 'Best Fitness Trackers for Calorie Tracking',
    description: 'Track steps and distance with more precision.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'January 22, 2025',
    readTime: '9 min read',
    category: 'Performance',
  },
];

export default function StepsToMilesCalculator() {
  const [steps, setSteps] = useState<number | ''>('');
  const [strideLength, setStrideLength] = useState<number | ''>(30);
  const [strideUnit, setStrideUnit] = useState<StrideUnit>('in');
  const [errors, setErrors] = useState<{ steps?: string; strideLength?: string }>({});
  const [result, setResult] = useState<StepsToMilesResultType | null>(null);
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

      const newErrors: { steps?: string; strideLength?: string } = {};

      if (steps === '' || (typeof steps === 'number' && steps <= 0)) {
        newErrors.steps = 'Steps must be greater than 0';
      }

      if (strideLength === '' || (typeof strideLength === 'number' && strideLength <= 0)) {
        newErrors.strideLength = 'Stride length must be greater than 0';
      }

      setErrors(newErrors);

      if (
        Object.keys(newErrors).length === 0 &&
        typeof steps === 'number' &&
        typeof strideLength === 'number'
      ) {
        try {
          const calculated = calculateStepsToMiles(steps, strideLength, strideUnit);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('steps-to-miles-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [steps, strideLength, strideUnit]
  );

  const handleReset = useCallback(() => {
    setSteps('');
    setStrideLength(30);
    setStrideUnit('in');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Steps to Miles Calculator"
      description="Convert daily steps into miles or kilometers."
      calculatorSlug="steps-to-miles"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Steps to Miles Calculator',
        description: 'Convert daily steps into miles or kilometers.',
        url: 'https://www.healthcalc.xyz/steps-to-miles',
      }}
      understandingSection={<StepsToMilesInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Steps to Miles"
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
          ]}
          submitButtonText="Convert Steps"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <StepsToMilesResult result={result} />
        {result && (
          <SaveResult
            calculatorType="steps-to-miles"
            calculatorName="Steps to Miles Calculator"
            data={{
              miles: result.miles,
              kilometers: result.kilometers,
            }}
          />
        )}
        <AffiliateLinks calculatorType="steps-to-miles" />
      </div>
    </CalculatorPageLayout>
  );
}
