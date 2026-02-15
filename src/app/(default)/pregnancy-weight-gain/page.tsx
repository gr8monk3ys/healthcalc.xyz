'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import PregnancyWeightGainResult from '@/components/calculators/pregnancy-weight-gain/PregnancyWeightGainResult';
import PregnancyWeightGainInfo from '@/components/calculators/pregnancy-weight-gain/PregnancyWeightGainInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculatePregnancyWeightGain } from '@/utils/calculators/pregnancyWeightGain';
import { validateHeight, validateWeight } from '@/utils/validation';
import type { PregnancyWeightGainResult as PregnancyWeightGainResultType } from '@/types/pregnancyWeightGain';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'What weight should I gain during pregnancy?',
    answer:
      'Recommended gain depends on pre-pregnancy BMI. This calculator provides general ranges only.',
  },
  {
    question: 'Does this apply to multiples?',
    answer:
      'No. Twin or multiple pregnancies have different guidelines. Ask your provider for specific targets.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. Always follow personalized advice from your healthcare provider.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Learn how energy needs change over time.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Context for body composition metrics.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function PregnancyWeightGainCalculator() {
  const height = useHeight();
  const weight = useWeight();
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>({});
  const [result, setResult] = useState<PregnancyWeightGainResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { height?: string; weight?: string } = {};

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

      setErrors(newErrors);

      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      if (Object.keys(newErrors).length === 0 && heightCm && weightKg) {
        try {
          const calculated = calculatePregnancyWeightGain({ heightCm, weightKg });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('pregnancy-weight-gain-result');
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
      title="Pregnancy Weight Gain Calculator"
      description="Estimate recommended pregnancy weight gain by BMI."
      calculatorSlug="pregnancy-weight-gain"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Pregnancy Weight Gain Calculator',
        description: 'Estimate recommended pregnancy weight gain by BMI.',
        url: 'https://www.healthcalc.xyz/pregnancy-weight-gain',
      }}
      understandingSection={<PregnancyWeightGainInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Pregnancy Weight Gain"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            createHeightField(height, errors.height),
            createWeightField(weight, errors.weight),
          ]}
          submitButtonText="Calculate Guidance"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <PregnancyWeightGainResult result={result} />
        {result && (
          <SaveResult
            calculatorType="pregnancy-weight-gain"
            calculatorName="Pregnancy Weight Gain Calculator"
            data={{
              bmi: result.bmi,
              totalGainLb: `${result.totalGain.minLb}-${result.totalGain.maxLb}`,
            }}
          />
        )}
        <AffiliateLinks calculatorType="pregnancy-weight-gain" />
      </div>
    </CalculatorPageLayout>
  );
}
