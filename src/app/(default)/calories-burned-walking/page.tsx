'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import CaloriesBurnedWalkingResult from '@/components/calculators/calories-burned-walking/CaloriesBurnedWalkingResult';
import CaloriesBurnedWalkingInfo from '@/components/calculators/calories-burned-walking/CaloriesBurnedWalkingInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateCaloriesBurnedWalking } from '@/utils/calculators/caloriesBurnedWalking';
import { validateDuration, validateSpeed, validateWeight } from '@/utils/validation';
import type { CaloriesBurnedWalkingResult as CaloriesBurnedWalkingResultType } from '@/types/caloriesBurnedWalking';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'What pace should I use?',
    answer: 'Use your average walking speed. A brisk walk is often around 3.5-4.0 mph.',
  },
  {
    question: 'Is incline included?',
    answer: 'No. This estimate assumes level walking.',
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

export default function CaloriesBurnedWalkingCalculator() {
  const weight = useWeight();
  const [duration, setDuration] = useState<number | ''>('');
  const [speed, setSpeed] = useState<number | ''>(3.5);
  const [speedUnit, setSpeedUnit] = useState<'mph' | 'kmh'>('mph');
  const [errors, setErrors] = useState<{ weight?: string; duration?: string; speed?: string }>({});
  const [result, setResult] = useState<CaloriesBurnedWalkingResultType | null>(null);
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
          const calculated = calculateCaloriesBurnedWalking(weightKg, duration, speedMph);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('calories-burned-walking-result');
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
    setSpeed(3.5);
    setSpeedUnit('mph');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [weight]);

  return (
    <CalculatorPageLayout
      title="Calories Burned Walking Calculator"
      description="Estimate calories burned while walking based on speed and time."
      calculatorSlug="calories-burned-walking"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Calories Burned Walking Calculator',
        description: 'Estimate calories burned while walking based on speed and time.',
        url: 'https://www.healthcalc.xyz/calories-burned-walking',
      }}
      understandingSection={<CaloriesBurnedWalkingInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Calories Burned Walking"
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
              label: 'Walking Speed',
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
        <CaloriesBurnedWalkingResult result={result} />
        {result && (
          <SaveResult
            calculatorType="calories-burned-walking"
            calculatorName="Calories Burned Walking Calculator"
            data={{
              calories: result.calories,
              durationMinutes: result.durationMinutes,
              speedMph: result.speedMph,
            }}
          />
        )}
        <AffiliateLinks calculatorType="calories-burned-walking" />
      </div>
    </CalculatorPageLayout>
  );
}
