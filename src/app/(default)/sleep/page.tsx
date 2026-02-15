'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import SleepResult from '@/components/calculators/sleep/SleepResult';
import SleepInfo from '@/components/calculators/sleep/SleepInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty } from '@/utils/validation';
import { calculateSleepTimes } from '@/utils/calculators/sleep';
import type { SleepResult as SleepResultType, SleepMode } from '@/types/sleep';

const faqs = [
  {
    question: 'How accurate are sleep cycle calculations?',
    answer:
      'Sleep cycles average about 90 minutes, but they vary by person. Use the results as a guide and adjust based on how you feel.',
  },
  {
    question: 'Why add 15 minutes to fall asleep?',
    answer:
      'Most people take 10-20 minutes to fall asleep. This calculator assumes a 15-minute buffer.',
  },
  {
    question: 'What if I wake up during a cycle?',
    answer: 'Try shifting your bedtime or wake time by 15-30 minutes to align with another cycle.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Quality sleep supports metabolism and recovery.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function SleepCalculator() {
  const [mode, setMode] = useState<SleepMode>('wake');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<{ time?: string }>({});
  const [result, setResult] = useState<SleepResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { time?: string } = {};

      if (isEmpty(time)) {
        newErrors.time = 'Time is required';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          const calculated = calculateSleepTimes(time, mode);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('sleep-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Please enter a valid time.');
        }
      }
    },
    [time, mode]
  );

  const handleReset = useCallback(() => {
    setMode('wake');
    setTime('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Sleep Calculator"
      description="Find ideal bedtimes or wake times based on 90-minute sleep cycles."
      calculatorSlug="sleep"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Sleep Calculator',
        description: 'Find ideal bedtimes or wake times based on 90-minute sleep cycles.',
        url: 'https://www.healthcalc.xyz/sleep',
      }}
      understandingSection={<SleepInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Sleep Schedule"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'mode',
              label: 'I want to',
              type: 'radio',
              value: mode,
              onChange: value => setMode(value as SleepMode),
              options: [
                { value: 'wake', label: 'Wake up at' },
                { value: 'bed', label: 'Go to bed at' },
              ],
            },
            {
              name: 'time',
              label: mode === 'wake' ? 'Wake-up time' : 'Bedtime',
              type: 'time',
              value: time,
              onChange: setTime,
              error: errors.time,
            },
          ]}
          submitButtonText="Calculate Times"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <SleepResult result={result} />
        {result && (
          <SaveResult
            calculatorType="sleep"
            calculatorName="Sleep Calculator"
            data={{
              mode: result.mode,
              inputTime: result.inputTime,
              bestTime: result.recommendations[0]?.time,
            }}
          />
        )}
        <AffiliateLinks calculatorType="sleep" />
      </div>
    </CalculatorPageLayout>
  );
}
