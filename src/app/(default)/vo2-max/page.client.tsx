'use client';

import React, { useEffect, useMemo, useState } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import Vo2MaxResult from '@/components/calculators/vo2-max/Vo2MaxResult';
import Vo2MaxInfo from '@/components/calculators/vo2-max/Vo2MaxInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateAge, validateHeartRate, validateWeight } from '@/utils/validation';
import { calculateVo2Max } from '@/utils/calculators/vo2Max';
import type { Vo2MaxResult as Vo2MaxResultType } from '@/types/vo2Max';
import type { Gender } from '@/types/common';
import { useWeight, createWeightField } from '@/hooks/useCalculatorUnits';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';
import { useChainPrefill } from '@/hooks/useChainPrefill';

const faqs = [
  {
    question: 'What is VO2 max?',
    answer:
      'VO2 max measures the maximum oxygen your body can use during exercise and is a key indicator of cardiovascular fitness.',
  },
  {
    question: 'Is the Rockport test accurate?',
    answer:
      'The Rockport test provides a reasonable estimate for many people. Lab tests are more precise but less accessible.',
  },
  {
    question: 'How can I improve my VO2 max?',
    answer:
      'Interval training, tempo workouts, and consistent aerobic training are the most effective ways to increase VO2 max.',
  },
];

const relatedArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Cardio fitness impacts daily energy needs and recovery.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function Vo2MaxCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const weight = useWeight();
  const [walkTime, setWalkTime] = useState<number | ''>('');
  const [heartRate, setHeartRate] = useState<number | ''>('');

  const chainPrefill = useChainPrefill('vo2-max');

  useEffect(() => {
    if (!chainPrefill) return;
    if (typeof chainPrefill.age === 'number') setAge(chainPrefill.age);
    if (chainPrefill.gender === 'male' || chainPrefill.gender === 'female')
      setGender(chainPrefill.gender as Gender);
    if (typeof chainPrefill.weight === 'number') weight.setValue(chainPrefill.weight);
  }, [chainPrefill, setAge, setGender, weight]);

  const chainResultData = useMemo(() => {
    const weightKg = weight.toKg();
    return {
      ...(typeof age === 'number' ? { age } : {}),
      gender,
      ...(weightKg !== null ? { weight: weightKg } : {}),
    };
  }, [age, gender, weight]);

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<Vo2MaxResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (isEmpty(age)) {
          newErrors.age = 'Age is required';
        } else {
          const validation = validateAge(age);
          if (!validation.isValid) {
            newErrors.age = validation.error ?? '';
          }
        }

        if (isEmpty(weight.value)) {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const validation = validateWeight(weight.value, unitSystem);
          if (!validation.isValid) {
            newErrors.weight = validation.error ?? '';
          }
        }

        if (isEmpty(walkTime)) {
          newErrors.walkTime = 'Walk time is required';
        } else if (typeof walkTime === 'number' && (walkTime <= 0 || walkTime > 60)) {
          newErrors.walkTime = 'Walk time should be between 1 and 60 minutes';
        }

        if (isEmpty(heartRate)) {
          newErrors.heartRate = 'Heart rate is required';
        } else {
          const validation = validateHeartRate(heartRate, 'Heart rate');
          if (!validation.isValid) {
            newErrors.heartRate = validation.error ?? '';
          }
        }

        return newErrors;
      },
      calculate: () => {
        const weightKg = weight.toKg();
        const calculated = calculateVo2Max({
          gender,
          age: age as number,
          weightKg: weightKg as number,
          walkTimeMinutes: walkTime as number,
          heartRate: heartRate as number,
        });
        setTimeout(() => {
          const element = document.getElementById('vo2-max-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      setGender('male');
      setAge('');
      weight.setValue('');
      setWalkTime('');
      setHeartRate('');
    });
  };

  return (
    <CalculatorPageLayout
      title="VO2 Max Calculator"
      description="Estimate VO2 max using the Rockport 1-mile walk test formula."
      calculatorSlug="vo2-max"
      chainResultData={chainResultData}
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'VO2 Max Calculator',
        description: 'Estimate VO2 max using the Rockport 1-mile walk test formula.',
        url: 'https://www.healthcalc.xyz/vo2-max',
      }}
      understandingSection={<Vo2MaxInfo />}
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="VO2 Max"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            {
              name: 'gender',
              label: 'Gender',
              type: 'radio',
              value: gender,
              onChange: value => setGender(value as Gender),
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ],
            },
            {
              name: 'age',
              label: 'Age',
              type: 'number',
              value: age,
              onChange: setAge,
              error: errors.age,
              placeholder: 'Years',
            },
            createWeightField(weight, errors.weight),
            {
              name: 'walkTime',
              label: '1-mile walk time (minutes)',
              type: 'number',
              value: walkTime,
              onChange: setWalkTime,
              error: errors.walkTime,
              placeholder: 'e.g., 15.5',
            },
            {
              name: 'heartRate',
              label: 'Heart rate after walk (bpm)',
              type: 'number',
              value: heartRate,
              onChange: setHeartRate,
              error: errors.heartRate,
              placeholder: 'e.g., 130',
            },
          ]}
          submitButtonText="Calculate VO2 Max"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <Vo2MaxResult result={result} />
        {result && (
          <SaveResult
            calculatorType="vo2-max"
            calculatorName="VO2 Max Calculator"
            data={{
              vo2Max: result.vo2Max,
              walkTimeMinutes: result.walkTimeMinutes,
            }}
          />
        )}
        <AffiliateLinks calculatorType="vo2-max" />
      </div>
    </CalculatorPageLayout>
  );
}
