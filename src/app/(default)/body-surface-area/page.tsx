'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import BodySurfaceAreaResult from '@/components/calculators/body-surface-area/BodySurfaceAreaResult';
import BodySurfaceAreaInfo from '@/components/calculators/body-surface-area/BodySurfaceAreaInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateBodySurfaceArea } from '@/utils/calculators/bodySurfaceArea';
import { isEmpty, validateHeight, validateWeight } from '@/utils/validation';
import type { BodySurfaceAreaResult as BodySurfaceAreaResultType } from '@/types/bodySurfaceArea';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'Why is BSA used in healthcare?',
    answer:
      'Body surface area is often used to normalize clinical values and guide certain medication dosages.',
  },
  {
    question: 'Is this the same as BMI?',
    answer:
      'No. BMI estimates body fat relative to height and weight, while BSA estimates total surface area.',
  },
  {
    question: 'How accurate is the estimate?',
    answer:
      'BSA formulas provide a good approximation, but clinicians may use additional context for decisions.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Learn the difference between body metrics and when to use each.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function BodySurfaceAreaCalculator() {
  const height = useHeight();
  const weight = useWeight();
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});
  const [result, setResult] = useState<BodySurfaceAreaResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { height?: string; weight?: string } = {};

      if (isEmpty(height.value)) {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const heightValidation = validateHeight(height.value, unitSystem);
        if (!heightValidation.isValid) {
          newErrors.height = heightValidation.error;
        }
      }

      if (isEmpty(weight.value)) {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const weightValidation = validateWeight(weight.value, unitSystem);
        if (!weightValidation.isValid) {
          newErrors.weight = weightValidation.error;
        }
      }

      setErrors(newErrors);

      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      if (Object.keys(newErrors).length === 0 && heightCm !== null && weightKg !== null) {
        try {
          const calculated = calculateBodySurfaceArea(heightCm, weightKg);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('body-surface-area-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [height, weight]
  );

  const handleReset = useCallback(() => {
    height.setValue('');
    weight.setValue('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [height, weight]);

  return (
    <CalculatorPageLayout
      title="Body Surface Area Calculator"
      description="Calculate body surface area using height and weight."
      calculatorSlug="body-surface-area"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Body Surface Area Calculator',
        description: 'Calculate body surface area using height and weight.',
        url: 'https://www.healthcalc.xyz/body-surface-area',
      }}
      understandingSection={<BodySurfaceAreaInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Body Surface Area"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            createHeightField(height, errors.height),
            createWeightField(weight, errors.weight),
          ]}
          submitButtonText="Calculate BSA"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <BodySurfaceAreaResult result={result} />
        {result && (
          <SaveResult
            calculatorType="body-surface-area"
            calculatorName="Body Surface Area Calculator"
            data={{
              bsa: result.bsa,
            }}
          />
        )}
        <AffiliateLinks calculatorType="body-surface-area" />
      </div>
    </CalculatorPageLayout>
  );
}
