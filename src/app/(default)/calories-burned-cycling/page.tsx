'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import CaloriesBurnedCyclingResult from '@/components/calculators/calories-burned-cycling/CaloriesBurnedCyclingResult';
import CaloriesBurnedCyclingInfo from '@/components/calculators/calories-burned-cycling/CaloriesBurnedCyclingInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateCaloriesBurnedCycling } from '@/utils/calculators/caloriesBurnedCycling';
import { validateDuration, validateSpeed, validateWeight } from '@/utils/validation';
import type { CaloriesBurnedCyclingResult as CaloriesBurnedCyclingResultType } from '@/types/caloriesBurnedCycling';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'What speed should I use?',
    answer: 'Use your average moving speed. Typical leisure cycling is around 10-12 mph.',
  },
  {
    question: 'Does this include hills or wind?',
    answer: 'No. This estimate assumes steady effort on flat terrain.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This is an estimate only.',
  },
];

const relatedArticles = [
  {
    title: 'Best Fitness Trackers for Calorie Tracking',
    description: 'Track cycling calories and heart rate with more accuracy.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'January 22, 2025',
    readTime: '9 min read',
    category: 'Performance',
  },
];

export default function CaloriesBurnedCyclingCalculator() {
  const weight = useWeight();
  const [duration, setDuration] = useState<number | ''>('');
  const [speed, setSpeed] = useState<number | ''>(12);
  const [speedUnit, setSpeedUnit] = useState<'mph' | 'kmh'>('mph');
  const [errors, setErrors] = useState<{ weight?: string; duration?: string; speed?: string }>({});
  const [result, setResult] = useState<CaloriesBurnedCyclingResultType | null>(null);
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
          const calculated = calculateCaloriesBurnedCycling(weightKg, duration, speedMph);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('calories-burned-cycling-result');
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
    setSpeed(12);
    setSpeedUnit('mph');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [weight]);

  return (
    <CalculatorPageLayout
      title="Calories Burned Cycling Calculator"
      description="Estimate calories burned while cycling based on speed and time."
      calculatorSlug="calories-burned-cycling"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Calories Burned Cycling Calculator',
        description: 'Estimate calories burned while cycling based on speed and time.',
        url: 'https://www.healthcalc.xyz/calories-burned-cycling',
      }}
      understandingSection={<CaloriesBurnedCyclingInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Calories Burned Cycling"
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
              label: 'Cycling Speed',
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
        <CaloriesBurnedCyclingResult result={result} />
        {result && (
          <SaveResult
            calculatorType="calories-burned-cycling"
            calculatorName="Calories Burned Cycling Calculator"
            data={{
              calories: result.calories,
              durationMinutes: result.durationMinutes,
              speedMph: result.speedMph,
            }}
          />
        )}
        <AffiliateLinks calculatorType="calories-burned-cycling" />
      </div>
    </CalculatorPageLayout>
  );
}
