'use client';

import React, { useState } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import CalorieResult from '@/components/calculators/calorie/CalorieResult';
import CalorieInfo from '@/components/calculators/calorie/CalorieInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { ActivityLevel, Gender } from '@/types/common';
import { isEmpty, validateAge, validateHeight, validateWeight } from '@/utils/validation';
import { calculateCalorieNeeds } from '@/utils/calculators/calorie';
import type { CalorieResult as CalorieResultType } from '@/types/calorie';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

const faqs = [
  {
    question: 'What calories should I eat to lose weight?',
    answer:
      'A safe starting point is 10-20% below your maintenance calories. If progress stalls after 2-3 weeks, adjust by 100-200 calories.',
  },
  {
    question: 'How accurate is this calorie estimate?',
    answer:
      'Formulas provide a solid baseline but can be off by 10-20%. Track weight trends and adjust based on your real-world results.',
  },
  {
    question: 'How often should I recalculate?',
    answer:
      'Recalculate after major weight changes or activity shifts, or every few months if your routine changes.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Understand how total daily energy expenditure impacts weight goals.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Calorie Deficit Myths: What You Need to Know',
    description: 'Separate calorie deficit facts from fiction and avoid common pitfalls.',
    slug: 'calorie-deficit-myths',
    date: 'February 18, 2025',
    readTime: '11 min read',
    category: 'Weight Loss',
  },
];

export default function CalorieCalculator({ serverHeader }: { serverHeader?: React.ReactNode }) {
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const height = useHeight();
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<CalorieResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (isEmpty(age)) {
          newErrors.age = 'Age is required';
        } else {
          const ageValidation = validateAge(age);
          if (!ageValidation.isValid) {
            newErrors.age = ageValidation.error ?? '';
          }
        }

        if (isEmpty(height.value)) {
          newErrors.height = 'Height is required';
        } else {
          const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
          const heightValidation = validateHeight(height.value, unitSystem);
          if (!heightValidation.isValid) {
            newErrors.height = heightValidation.error ?? '';
          }
        }

        if (isEmpty(weight.value)) {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const weightValidation = validateWeight(weight.value, unitSystem);
          if (!weightValidation.isValid) {
            newErrors.weight = weightValidation.error ?? '';
          }
        }

        return newErrors;
      },
      calculate: () => {
        const heightCm = height.toCm();
        const weightKg = weight.toKg();

        const calculated = calculateCalorieNeeds({
          gender,
          age: age as number,
          weightKg: weightKg as number,
          heightCm: heightCm as number,
          activityLevel,
        });
        setTimeout(() => {
          const element = document.getElementById('calorie-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      setAge('');
      setGender('male');
      height.setValue('');
      weight.setValue('');
      setActivityLevel('sedentary');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Calorie Calculator"
      description="Calculate your daily calorie needs for maintenance, weight loss, or muscle gain."
      calculatorSlug="calorie"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Calorie Calculator',
        description:
          'Calculate your daily calorie needs for maintenance, weight loss, or muscle gain.',
        url: 'https://www.healthcalc.xyz/calorie',
      }}
      understandingSection={<CalorieInfo />}
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Daily Calorie Needs"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            {
              name: 'age',
              label: 'Age',
              type: 'number',
              value: age,
              onChange: setAge,
              error: errors.age,
              placeholder: 'Years',
              min: 10,
              max: 100,
            },
            {
              name: 'gender',
              label: 'Biological Sex',
              type: 'radio',
              value: gender,
              onChange: value => setGender(value as Gender),
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ],
            },
            createHeightField(height, errors.height),
            createWeightField(weight, errors.weight),
            {
              name: 'activityLevel',
              label: 'Activity Level',
              type: 'select',
              value: activityLevel,
              onChange: value => setActivityLevel(value as ActivityLevel),
              options: ACTIVITY_MULTIPLIERS.map(option => ({
                value: option.level,
                label: option.label,
                description: option.description,
              })),
            },
          ]}
          submitButtonText="Calculate Calories"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <CalorieResult result={result} />
        {result && (
          <SaveResult
            calculatorType="calorie"
            calculatorName="Calorie Calculator"
            data={{
              bmr: result.bmr,
              tdee: result.tdee,
              dailyCalories: result.dailyCalories,
            }}
          />
        )}
        <AffiliateLinks calculatorType="calorie" />
      </div>
    </CalculatorPageLayout>
  );
}
