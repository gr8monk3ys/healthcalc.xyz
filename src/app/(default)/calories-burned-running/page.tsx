'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import CaloriesBurnedRunningResult from '@/components/calculators/calories-burned-running/CaloriesBurnedRunningResult';
import CaloriesBurnedRunningInfo from '@/components/calculators/calories-burned-running/CaloriesBurnedRunningInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateCaloriesBurnedRunning } from '@/utils/calculators/caloriesBurnedRunning';
import { validateDuration, validateSpeed, validateWeight } from '@/utils/validation';
import type { CaloriesBurnedRunningResult as CaloriesBurnedRunningResultType } from '@/types/caloriesBurnedRunning';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'What speed should I use?',
    answer: 'Use your average running speed or pace from a recent run.',
  },
  {
    question: 'Does incline matter?',
    answer: 'Inclines increase calorie burn, but this estimate assumes a flat surface.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This is an estimate only.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Understand how daily energy expenditure impacts your goals.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function CaloriesBurnedRunningCalculator() {
  const weight = useWeight();
  const [duration, setDuration] = useState<number | ''>('');
  const [speed, setSpeed] = useState<number | ''>(6);
  const [speedUnit, setSpeedUnit] = useState<'mph' | 'kmh'>('mph');
  const [errors, setErrors] = useState<{ weight?: string; duration?: string; speed?: string }>({});
  const [result, setResult] = useState<CaloriesBurnedRunningResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const toggleSpeedUnit = useCallback(() => {
    const nextUnit = speedUnit === 'mph' ? 'kmh' : 'mph';
    if (typeof speed === 'number') {
      const converted = speedUnit === 'mph' ? speed / 0.621371 : speed * 0.621371;
      setSpeed(parseFloat(converted.toFixed(1)));
    }
    setSpeedUnit(nextUnit);
  }, [speed, speedUnit]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { weight?: string; duration?: string; speed?: string } = {};

      if (typeof weight.value !== 'number') {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const validation = validateWeight(weight.value, unitSystem);
        if (!validation.isValid) {
          newErrors.weight = validation.error;
        }
      }

      if (typeof duration !== 'number') {
        newErrors.duration = 'Duration is required';
      } else {
        const validation = validateDuration(duration);
        if (!validation.isValid) {
          newErrors.duration = validation.error;
        }
      }

      if (typeof speed !== 'number') {
        newErrors.speed = 'Speed is required';
      } else {
        const speedMph = speedUnit === 'mph' ? speed : speed * 0.621371;
        const validation = validateSpeed(speedMph);
        if (!validation.isValid) {
          newErrors.speed = validation.error;
        }
      }

      setErrors(newErrors);

      const weightKg = weight.toKg();

      if (
        Object.keys(newErrors).length === 0 &&
        weightKg &&
        typeof duration === 'number' &&
        typeof speed === 'number'
      ) {
        try {
          const speedMph = speedUnit === 'mph' ? speed : speed * 0.621371;
          const calculated = calculateCaloriesBurnedRunning(weightKg, duration, speedMph);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('calories-burned-running-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your input.');
        }
      }
    },
    [weight, duration, speed, speedUnit]
  );

  const handleReset = useCallback(() => {
    weight.setValue('');
    setDuration('');
    setSpeed(6);
    setSpeedUnit('mph');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [weight]);

  return (
    <CalculatorPageLayout
      title="Calories Burned Running Calculator"
      description="Estimate calories burned while running based on speed and time."
      calculatorSlug="calories-burned-running"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Calories Burned Running Calculator',
        description: 'Estimate calories burned while running based on speed and time.',
        url: 'https://www.healthcalc.xyz/calories-burned-running',
      }}
      understandingSection={<CaloriesBurnedRunningInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Calories Burned Running"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            createWeightField(weight, errors.weight),
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
            {
              name: 'speed',
              label: 'Running Speed',
              type: 'number',
              value: speed,
              onChange: setSpeed,
              error: errors.speed,
              placeholder: speedUnit === 'mph' ? 'mph' : 'km/h',
              unit: speedUnit,
              unitToggle: toggleSpeedUnit,
              step: '0.1',
            },
          ]}
          submitButtonText="Calculate Burn"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <CaloriesBurnedRunningResult result={result} />
        {result && (
          <SaveResult
            calculatorType="calories-burned-running"
            calculatorName="Calories Burned Running Calculator"
            data={{
              calories: result.calories,
              durationMinutes: result.durationMinutes,
              speedMph: result.speedMph,
            }}
          />
        )}
        <AffiliateLinks calculatorType="calories-burned-running" />
      </div>
    </CalculatorPageLayout>
  );
}
