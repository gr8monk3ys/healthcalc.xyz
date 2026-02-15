'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import RunningPaceResult from '@/components/calculators/running-pace/RunningPaceResult';
import RunningPaceInfo from '@/components/calculators/running-pace/RunningPaceInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty } from '@/utils/validation';
import { calculateRunningPace } from '@/utils/calculators/runningPace';
import type { RunningPaceResult as RunningPaceResultType, DistanceUnit } from '@/types/runningPace';

const faqs = [
  {
    question: 'How is running pace calculated?',
    answer:
      'Pace is total time divided by distance. This calculator provides pace per mile and per kilometer along with average speed.',
  },
  {
    question: 'Why do I need both mile and kilometer pace?',
    answer:
      'Training plans often use different units. Seeing both helps you follow any plan or race requirements.',
  },
  {
    question: 'What is a good running pace?',
    answer:
      'Pace depends on your goals and fitness level. Use this calculator to track progress rather than compare to others.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Running pace influences energy expenditure and recovery needs.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function RunningPaceCalculator() {
  const [distance, setDistance] = useState<number | ''>('');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('mi');
  const [hours, setHours] = useState<number | ''>('');
  const [minutes, setMinutes] = useState<number | ''>('');
  const [seconds, setSeconds] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ distance?: string; time?: string }>({});
  const [result, setResult] = useState<RunningPaceResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { distance?: string; time?: string } = {};

      if (isEmpty(distance)) {
        newErrors.distance = 'Distance is required';
      } else if (typeof distance === 'number' && distance <= 0) {
        newErrors.distance = 'Distance must be greater than 0';
      }

      const totalSeconds =
        (typeof hours === 'number' ? hours : 0) * 3600 +
        (typeof minutes === 'number' ? minutes : 0) * 60 +
        (typeof seconds === 'number' ? seconds : 0);

      if (totalSeconds <= 0) {
        newErrors.time = 'Time is required';
      }

      setErrors(newErrors);

      if (
        Object.keys(newErrors).length === 0 &&
        typeof distance === 'number' &&
        typeof hours !== 'undefined' &&
        typeof minutes !== 'undefined' &&
        typeof seconds !== 'undefined'
      ) {
        try {
          const calculated = calculateRunningPace({
            distance,
            distanceUnit,
            hours: typeof hours === 'number' ? hours : 0,
            minutes: typeof minutes === 'number' ? minutes : 0,
            seconds: typeof seconds === 'number' ? seconds : 0,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('running-pace-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [distance, distanceUnit, hours, minutes, seconds]
  );

  const handleReset = useCallback(() => {
    setDistance('');
    setDistanceUnit('mi');
    setHours('');
    setMinutes('');
    setSeconds('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Running Pace Calculator"
      description="Calculate your pace per mile or kilometer along with average speed."
      calculatorSlug="running-pace"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Running Pace Calculator',
        description: 'Calculate your pace per mile or kilometer along with average speed.',
        url: 'https://www.healthcalc.xyz/running-pace',
      }}
      understandingSection={<RunningPaceInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Running Pace"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'distance',
              label: 'Distance',
              type: 'number',
              value: distance,
              onChange: setDistance,
              error: errors.distance,
              placeholder: 'e.g., 5',
            },
            {
              name: 'distanceUnit',
              label: 'Distance Unit',
              type: 'select',
              value: distanceUnit,
              onChange: value => setDistanceUnit(value as DistanceUnit),
              options: [
                { value: 'mi', label: 'Miles' },
                { value: 'km', label: 'Kilometers' },
              ],
            },
            {
              name: 'hours',
              label: 'Hours',
              type: 'number',
              value: hours,
              onChange: setHours,
              placeholder: '0',
            },
            {
              name: 'minutes',
              label: 'Minutes',
              type: 'number',
              value: minutes,
              onChange: setMinutes,
              placeholder: '25',
              error: errors.time,
            },
            {
              name: 'seconds',
              label: 'Seconds',
              type: 'number',
              value: seconds,
              onChange: setSeconds,
              placeholder: '0',
            },
          ]}
          submitButtonText="Calculate Pace"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <RunningPaceResult result={result} />
        {result && (
          <SaveResult
            calculatorType="running-pace"
            calculatorName="Running Pace Calculator"
            data={{
              pacePerMile: result.pacePerMile,
              pacePerKm: result.pacePerKm,
              speedMph: result.speedMph,
            }}
          />
        )}
        <AffiliateLinks calculatorType="running-pace" />
      </div>
    </CalculatorPageLayout>
  );
}
