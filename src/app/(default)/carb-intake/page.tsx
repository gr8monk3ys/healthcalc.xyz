'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import CarbIntakeResult from '@/components/calculators/carb-intake/CarbIntakeResult';
import CarbIntakeInfo from '@/components/calculators/carb-intake/CarbIntakeInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateCarbIntake } from '@/utils/calculators/carbIntake';
import type { CarbIntakeResult as CarbIntakeResultType } from '@/types/carbIntake';

const faqs = [
  {
    question: 'How many carbs should I eat?',
    answer: 'It depends on your activity level and goals. Many plans use 35-55% of daily calories.',
  },
  {
    question: 'What if I train hard?',
    answer:
      'Higher activity often benefits from higher carb intake to support performance and recovery.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. Use this as a guideline and consult a professional if needed.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Use TDEE to set the right calorie target first.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Best Fitness Apps for Tracking Macros',
    description: 'Tools to track carbs, protein, and fat.',
    slug: 'best-fitness-apps-macro-tracking',
    date: 'January 25, 2025',
    readTime: '10 min read',
    category: 'Nutrition',
  },
];

export default function CarbIntakeCalculator() {
  const [calories, setCalories] = useState<number | ''>('');
  const [carbPercent, setCarbPercent] = useState<number | ''>(45);
  const [errors, setErrors] = useState<{ calories?: string; carbPercent?: string }>({});
  const [result, setResult] = useState<CarbIntakeResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { calories?: string; carbPercent?: string } = {};

      if (calories === '') {
        newErrors.calories = 'Calories are required';
      } else if (typeof calories === 'number' && calories <= 0) {
        newErrors.calories = 'Calories must be greater than 0';
      }

      if (carbPercent === '') {
        newErrors.carbPercent = 'Carb percentage is required';
      } else if (typeof carbPercent === 'number' && (carbPercent < 10 || carbPercent > 70)) {
        newErrors.carbPercent = 'Carb percentage should be between 10% and 70%';
      }

      setErrors(newErrors);

      if (
        Object.keys(newErrors).length === 0 &&
        typeof calories === 'number' &&
        typeof carbPercent === 'number'
      ) {
        try {
          const calculated = calculateCarbIntake(calories, carbPercent);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('carb-intake-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [calories, carbPercent]
  );

  const handleReset = useCallback(() => {
    setCalories('');
    setCarbPercent(45);
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Carb Intake Calculator"
      description="Calculate daily carbohydrate intake from calories or targets."
      calculatorSlug="carb-intake"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Carb Intake Calculator',
        description: 'Calculate daily carbohydrate intake from calories or targets.',
        url: 'https://www.healthcalc.xyz/carb-intake',
      }}
      understandingSection={<CarbIntakeInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Carb Intake"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'calories',
              label: 'Daily Calories',
              type: 'number',
              value: calories,
              onChange: setCalories,
              error: errors.calories,
              placeholder: 'e.g. 2000',
              min: 800,
              max: 8000,
            },
            {
              name: 'carbPercent',
              label: 'Carb Percentage',
              type: 'number',
              value: carbPercent,
              onChange: setCarbPercent,
              error: errors.carbPercent,
              placeholder: 'e.g. 45',
              min: 10,
              max: 70,
            },
          ]}
          submitButtonText="Calculate Carbs"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <CarbIntakeResult result={result} />
        {result && (
          <SaveResult
            calculatorType="carb-intake"
            calculatorName="Carb Intake Calculator"
            data={{
              carbGrams: result.carbGrams,
              carbPercent: result.carbPercent,
            }}
          />
        )}
        <AffiliateLinks calculatorType="carb-intake" />
      </div>
    </CalculatorPageLayout>
  );
}
