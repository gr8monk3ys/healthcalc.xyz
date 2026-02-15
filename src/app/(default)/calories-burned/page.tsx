'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import CaloriesBurnedResult from '@/components/calculators/calories-burned/CaloriesBurnedResult';
import CaloriesBurnedInfo from '@/components/calculators/calories-burned/CaloriesBurnedInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { CALORIES_BURNED_ACTIVITIES } from '@/constants/caloriesBurned';
import { calculateCaloriesBurned } from '@/utils/calculators/caloriesBurned';
import { isEmpty, validateDuration, validateWeight } from '@/utils/validation';
import type { CaloriesBurnedResult as CaloriesBurnedResultType } from '@/types/caloriesBurned';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'How accurate is this estimate?',
    answer:
      'It uses MET values as a baseline. Real-world calorie burn can vary with intensity, fitness level, and wearable accuracy.',
  },
  {
    question: 'What is a MET?',
    answer:
      'A MET (metabolic equivalent) compares the energy cost of an activity to resting. Higher METs burn more calories.',
  },
  {
    question: 'How can I burn more calories?',
    answer:
      'Increase workout duration, intensity, or add resistance training to raise overall burn.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Learn how daily energy expenditure works.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Calorie Deficit Myths: What You Need to Know',
    description: 'Understand calorie deficits for sustainable fat loss.',
    slug: 'calorie-deficit-myths',
    date: 'February 18, 2025',
    readTime: '11 min read',
    category: 'Weight Loss',
  },
];

export default function CaloriesBurnedCalculator() {
  const weight = useWeight();
  const [duration, setDuration] = useState<number | ''>('');
  const [activity, setActivity] = useState(CALORIES_BURNED_ACTIVITIES[0]);
  const [errors, setErrors] = useState<{ weight?: string; duration?: string }>({});
  const [result, setResult] = useState<CaloriesBurnedResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { weight?: string; duration?: string } = {};

      if (isEmpty(weight.value)) {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const validation = validateWeight(weight.value, unitSystem);
        if (!validation.isValid) {
          newErrors.weight = validation.error;
        }
      }

      if (isEmpty(duration)) {
        newErrors.duration = 'Duration is required';
      } else {
        const validation = validateDuration(duration);
        if (!validation.isValid) {
          newErrors.duration = validation.error;
        }
      }

      setErrors(newErrors);

      const weightKg = weight.toKg();

      if (Object.keys(newErrors).length === 0 && typeof duration === 'number' && weightKg) {
        try {
          const calculated = calculateCaloriesBurned(
            weightKg,
            duration,
            activity.met,
            activity.label
          );
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('calories-burned-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [weight, duration, activity]
  );

  const handleReset = useCallback(() => {
    weight.setValue('');
    setDuration('');
    setActivity(CALORIES_BURNED_ACTIVITIES[0]);
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [weight]);

  return (
    <CalculatorPageLayout
      title="Calories Burned Calculator"
      description="Estimate calories burned from workouts using weight, duration, and activity."
      calculatorSlug="calories-burned"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Calories Burned Calculator',
        description: 'Estimate calories burned from workouts using weight, duration, and activity.',
        url: 'https://www.healthcalc.xyz/calories-burned',
      }}
      understandingSection={<CaloriesBurnedInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Calories Burned"
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
              name: 'activity',
              label: 'Activity',
              type: 'select',
              value: activity.value,
              onChange: value =>
                setActivity(
                  CALORIES_BURNED_ACTIVITIES.find(option => option.value === value) ||
                    CALORIES_BURNED_ACTIVITIES[0]
                ),
              options: CALORIES_BURNED_ACTIVITIES.map(option => ({
                value: option.value,
                label: option.label,
                description: option.description,
              })),
            },
          ]}
          submitButtonText="Calculate Burn"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <CaloriesBurnedResult result={result} />
        {result && (
          <SaveResult
            calculatorType="calories-burned"
            calculatorName="Calories Burned Calculator"
            data={{
              calories: result.calories,
              durationMinutes: result.durationMinutes,
              activity: result.activityLabel,
            }}
          />
        )}
        <AffiliateLinks calculatorType="calories-burned" />
      </div>
    </CalculatorPageLayout>
  );
}
