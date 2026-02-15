'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import FatIntakeResult from '@/components/calculators/fat-intake/FatIntakeResult';
import FatIntakeInfo from '@/components/calculators/fat-intake/FatIntakeInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateFatIntake } from '@/utils/calculators/fatIntake';
import type { FatIntakeResult as FatIntakeResultType } from '@/types/fatIntake';

const faqs = [
  {
    question: 'What fat percentage should I use?',
    answer:
      'Most balanced plans use 20-35% of calories from fat. Higher activity can support a lower end.',
  },
  {
    question: 'Are all fats the same?',
    answer:
      'Focus on unsaturated fats (olive oil, nuts, fish). Limit trans fats and ultra-processed sources.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. Use this as guidance and consult a professional if needed.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Set your calorie target before setting macros.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Best Fitness Apps for Tracking Macros',
    description: 'Track fats alongside carbs and protein.',
    slug: 'best-fitness-apps-macro-tracking',
    date: 'January 25, 2025',
    readTime: '10 min read',
    category: 'Nutrition',
  },
];

export default function FatIntakeCalculator() {
  const [calories, setCalories] = useState<number | ''>('');
  const [fatPercent, setFatPercent] = useState<number | ''>(30);
  const [errors, setErrors] = useState<{ calories?: string; fatPercent?: string }>({});
  const [result, setResult] = useState<FatIntakeResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { calories?: string; fatPercent?: string } = {};

      if (calories === '') {
        newErrors.calories = 'Calories are required';
      } else if (typeof calories === 'number' && calories <= 0) {
        newErrors.calories = 'Calories must be greater than 0';
      }

      if (fatPercent === '') {
        newErrors.fatPercent = 'Fat percentage is required';
      } else if (typeof fatPercent === 'number' && (fatPercent < 15 || fatPercent > 45)) {
        newErrors.fatPercent = 'Fat percentage should be between 15% and 45%';
      }

      setErrors(newErrors);

      if (
        Object.keys(newErrors).length === 0 &&
        typeof calories === 'number' &&
        typeof fatPercent === 'number'
      ) {
        try {
          const calculated = calculateFatIntake(calories, fatPercent);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('fat-intake-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [calories, fatPercent]
  );

  const handleReset = useCallback(() => {
    setCalories('');
    setFatPercent(30);
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Fat Intake Calculator"
      description="Calculate daily fat intake from calories or targets."
      calculatorSlug="fat-intake"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Fat Intake Calculator',
        description: 'Calculate daily fat intake from calories or targets.',
        url: 'https://www.healthcalc.xyz/fat-intake',
      }}
      understandingSection={<FatIntakeInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Fat Intake"
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
              name: 'fatPercent',
              label: 'Fat Percentage',
              type: 'number',
              value: fatPercent,
              onChange: setFatPercent,
              error: errors.fatPercent,
              placeholder: 'e.g. 30',
              min: 15,
              max: 45,
            },
          ]}
          submitButtonText="Calculate Fat"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <FatIntakeResult result={result} />
        {result && (
          <SaveResult
            calculatorType="fat-intake"
            calculatorName="Fat Intake Calculator"
            data={{
              fatGrams: result.fatGrams,
              fatPercent: result.fatPercent,
            }}
          />
        )}
        <AffiliateLinks calculatorType="fat-intake" />
      </div>
    </CalculatorPageLayout>
  );
}
