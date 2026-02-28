'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import WaterIntakeResult from '@/components/calculators/water-intake/WaterIntakeResult';
import WaterIntakeInfo from '@/components/calculators/water-intake/WaterIntakeInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateWeight } from '@/utils/validation';
import { calculateWaterIntake } from '@/utils/calculators/waterIntake';
import type { WaterIntakeResult as WaterIntakeResultType } from '@/types/waterIntake';
import { WATER_INTAKE_ACTIVITY_OPTIONS, type WaterIntakeActivity } from '@/constants/waterIntake';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';
import { useChainPrefill } from '@/hooks/useChainPrefill';

const faqs = [
  {
    question: 'How accurate is this water intake estimate?',
    answer:
      'It provides a solid baseline using body weight and activity level. Adjust based on thirst, climate, and training intensity.',
  },
  {
    question: 'Do coffee and tea count toward hydration?',
    answer:
      'Yes. Most fluids contribute to hydration, but plain water is still the easiest way to stay on track.',
  },
  {
    question: 'Should I drink more on workout days?',
    answer:
      'Yes. Increase intake if you sweat heavily or exercise in heat. Consider electrolytes for longer sessions.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Hydration supports energy, metabolism, and recovery.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function WaterIntakeCalculator() {
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<WaterIntakeActivity>('low');

  const chainPrefill = useChainPrefill('water-intake');

  useEffect(() => {
    if (!chainPrefill) return;
    if (typeof chainPrefill.weight === 'number') weight.setValue(chainPrefill.weight);
  }, [chainPrefill, weight]);

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<WaterIntakeResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (isEmpty(weight.value)) {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const validation = validateWeight(weight.value, unitSystem);
          if (!validation.isValid) {
            newErrors.weight = validation.error!;
          }
        }

        return newErrors;
      },
      calculate: () => {
        const weightKg = weight.toKg();
        const calculated = calculateWaterIntake(weightKg as number, activityLevel, weight.unit);
        setTimeout(() => {
          const element = document.getElementById('water-intake-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      weight.setValue('');
      setActivityLevel('low');
    });
  };

  const chainResultData = useMemo(() => {
    const weightKg = weight.toKg();
    return {
      ...(weightKg !== null ? { weight: weightKg } : {}),
      activityLevel,
    };
  }, [weight, activityLevel]);

  return (
    <CalculatorPageLayout
      title="Water Intake Calculator"
      description="Calculate your daily water intake based on weight and activity level."
      calculatorSlug="water-intake"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Water Intake Calculator',
        description: 'Calculate your daily water intake based on weight and activity level.',
        url: 'https://www.healthcalc.xyz/water-intake',
      }}
      understandingSection={<WaterIntakeInfo />}
      showResultsCapture={showResult}
      chainResultData={chainResultData}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Water Intake"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            createWeightField(weight, errors.weight),
            {
              name: 'activityLevel',
              label: 'Activity Level',
              type: 'select',
              value: activityLevel,
              onChange: value => setActivityLevel(value as WaterIntakeActivity),
              options: WATER_INTAKE_ACTIVITY_OPTIONS.map(option => ({
                value: option.value,
                label: option.label,
                description: option.description,
              })),
            },
          ]}
          submitButtonText="Calculate Intake"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <WaterIntakeResult result={result} />
        {result && (
          <SaveResult
            calculatorType="water-intake"
            calculatorName="Water Intake Calculator"
            data={{
              weightKg: result.weightKg,
              activityLevel: result.activityLevel,
              liters: result.liters,
            }}
          />
        )}
        <AffiliateLinks calculatorType="water-intake" />
      </div>
    </CalculatorPageLayout>
  );
}
