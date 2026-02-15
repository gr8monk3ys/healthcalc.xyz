'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import HeartRateZonesResult from '@/components/calculators/heart-rate-zones/HeartRateZonesResult';
import HeartRateZonesInfo from '@/components/calculators/heart-rate-zones/HeartRateZonesInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateAge, validateHeartRate } from '@/utils/validation';
import { calculateHeartRateZones } from '@/utils/calculators/heartRateZones';
import type {
  HeartRateZonesResult as HeartRateZonesResultType,
  HeartRateZoneMethod,
} from '@/types/heartRateZones';

const faqs = [
  {
    question: 'What is the Karvonen method?',
    answer:
      'The Karvonen method uses heart rate reserve (max HR minus resting HR) to create personalized training zones. It often feels more accurate for trained athletes.',
  },
  {
    question: 'Do I need to know my max heart rate?',
    answer:
      'This calculator estimates max heart rate using the 220 - age formula. For greater accuracy, you can test your max heart rate under professional guidance.',
  },
  {
    question: 'Which zone should I train in most?',
    answer:
      'Many endurance plans emphasize Zone 2 for aerobic base building, with higher zones used for speed and interval sessions.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Understand energy expenditure for training and recovery.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function HeartRateZonesCalculator() {
  const [age, setAge] = useState<number | ''>('');
  const [restingHeartRate, setRestingHeartRate] = useState<number | ''>('');
  const [method, setMethod] = useState<HeartRateZoneMethod>('percent-max');
  const [errors, setErrors] = useState<{ age?: string; restingHeartRate?: string }>({});
  const [result, setResult] = useState<HeartRateZonesResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { age?: string; restingHeartRate?: string } = {};

      if (isEmpty(age)) {
        newErrors.age = 'Age is required';
      } else {
        const ageValidation = validateAge(age);
        if (!ageValidation.isValid) {
          newErrors.age = ageValidation.error;
        }
      }

      if (method === 'karvonen') {
        if (isEmpty(restingHeartRate)) {
          newErrors.restingHeartRate = 'Resting heart rate is required for Karvonen method';
        } else {
          const hrValidation = validateHeartRate(restingHeartRate, 'Resting heart rate');
          if (!hrValidation.isValid) {
            newErrors.restingHeartRate = hrValidation.error;
          }
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && typeof age === 'number') {
        try {
          const calculated = calculateHeartRateZones({
            age,
            method,
            restingHeartRate: typeof restingHeartRate === 'number' ? restingHeartRate : undefined,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('heart-rate-zones-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [age, method, restingHeartRate]
  );

  const handleReset = useCallback(() => {
    setAge('');
    setRestingHeartRate('');
    setMethod('percent-max');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Heart Rate Zones Calculator"
      description="Calculate personalized training zones using percent max or Karvonen method."
      calculatorSlug="heart-rate-zones"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Heart Rate Zones Calculator',
        description: 'Calculate personalized training zones using percent max or Karvonen method.',
        url: 'https://www.healthcalc.xyz/heart-rate-zones',
      }}
      understandingSection={<HeartRateZonesInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Heart Rate Zones"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'age',
              label: 'Age',
              type: 'number',
              value: age,
              onChange: setAge,
              error: errors.age,
              placeholder: 'Years',
            },
            {
              name: 'method',
              label: 'Method',
              type: 'select',
              value: method,
              onChange: value => setMethod(value as HeartRateZoneMethod),
              options: [
                { value: 'percent-max', label: 'Percent Max HR' },
                { value: 'karvonen', label: 'Karvonen (Heart Rate Reserve)' },
              ],
            },
            {
              name: 'restingHeartRate',
              label: 'Resting Heart Rate (bpm)',
              type: 'number',
              value: restingHeartRate,
              onChange: setRestingHeartRate,
              error: errors.restingHeartRate,
              placeholder: 'Optional unless Karvonen',
            },
          ]}
          submitButtonText="Calculate Zones"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <HeartRateZonesResult result={result} />
        {result && (
          <SaveResult
            calculatorType="heart-rate-zones"
            calculatorName="Heart Rate Zones Calculator"
            data={{
              age: result.age,
              method: result.method,
              maxHeartRate: result.maxHeartRate,
            }}
          />
        )}
        <AffiliateLinks calculatorType="heart-rate-zones" />
      </div>
    </CalculatorPageLayout>
  );
}
