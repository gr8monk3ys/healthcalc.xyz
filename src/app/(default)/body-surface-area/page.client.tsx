'use client';

import React from 'react';
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
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

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

export default function BodySurfaceAreaCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const height = useHeight();
  const weight = useWeight();

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<BodySurfaceAreaResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (isEmpty(height.value)) {
          newErrors.height = 'Height is required';
        } else {
          const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
          const heightValidation = validateHeight(height.value, unitSystem);
          if (!heightValidation.isValid) {
            newErrors.height = heightValidation.error!;
          }
        }

        if (isEmpty(weight.value)) {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const weightValidation = validateWeight(weight.value, unitSystem);
          if (!weightValidation.isValid) {
            newErrors.weight = weightValidation.error!;
          }
        }

        return newErrors;
      },
      calculate: () => {
        const heightCm = height.toCm();
        const weightKg = weight.toKg();
        const calculated = calculateBodySurfaceArea(heightCm as number, weightKg as number);
        setTimeout(() => {
          const element = document.getElementById('body-surface-area-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      height.setValue('');
      weight.setValue('');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
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
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Body Surface Area"
          onSubmit={handleSubmit}
          onReset={onReset}
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
