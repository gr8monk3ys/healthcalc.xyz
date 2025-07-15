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
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

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

export default function CaloriesBurnedCyclingCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const weight = useWeight();
  const [duration, setDuration] = useState<number | ''>('');
  const [speed, setSpeed] = useState<number | ''>(12);
  const [speedUnit, setSpeedUnit] = useState<'mph' | 'kmh'>('mph');

  const toggleSpeedUnit = useCallback(() => {
    const nextUnit = speedUnit === 'mph' ? 'kmh' : 'mph';
    if (typeof speed === 'number') {
      const converted = speedUnit === 'mph' ? speed / 0.621371 : speed * 0.621371;
      setSpeed(parseFloat(converted.toFixed(1)));
    }
    setSpeedUnit(nextUnit);
  }, [speed, speedUnit]);

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<CaloriesBurnedCyclingResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (typeof weight.value !== 'number') {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const validation = validateWeight(weight.value, unitSystem);
          if (!validation.isValid) {
            newErrors.weight = validation.error as string;
          }
        }

        if (typeof duration !== 'number') {
          newErrors.duration = 'Duration is required';
        } else {
          const validation = validateDuration(duration);
          if (!validation.isValid) {
            newErrors.duration = validation.error as string;
          }
        }

        if (typeof speed !== 'number') {
          newErrors.speed = 'Speed is required';
        } else {
          const speedMph = speedUnit === 'mph' ? speed : speed * 0.621371;
          const validation = validateSpeed(speedMph);
          if (!validation.isValid) {
            newErrors.speed = validation.error as string;
          }
        }

        return newErrors;
      },
      calculate: () => {
        const weightKg = weight.toKg();
        const speedMph = speedUnit === 'mph' ? (speed as number) : (speed as number) * 0.621371;
        const calculated = calculateCaloriesBurnedCycling(
          weightKg as number,
          duration as number,
          speedMph
        );
        setTimeout(() => {
          const element = document.getElementById('calories-burned-cycling-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      weight.setValue('');
      setDuration('');
      setSpeed(12);
      setSpeedUnit('mph');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
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
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Calories Burned Cycling"
          onSubmit={handleSubmit}
          onReset={onReset}
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
