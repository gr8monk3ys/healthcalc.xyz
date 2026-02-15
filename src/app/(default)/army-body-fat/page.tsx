'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import ArmyBodyFatResult from '@/components/calculators/army-body-fat/ArmyBodyFatResult';
import ArmyBodyFatInfo from '@/components/calculators/army-body-fat/ArmyBodyFatInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateArmyBodyFat } from '@/utils/calculators/armyBodyFat';
import { convertLength } from '@/utils/conversions';
import { validateHeight, validateHip, validateNeck, validateWaist } from '@/utils/validation';
import type { ArmyBodyFatResult as ArmyBodyFatResultType } from '@/types/armyBodyFat';
import { Gender } from '@/types/common';
import { useHeight, createHeightField } from '@/hooks/useCalculatorUnits';

type CircumferenceUnit = 'cm' | 'in';

const faqs = [
  {
    question: 'What measurements do I need?',
    answer: 'Men need waist, neck, and height. Women need waist, neck, hips, and height.',
  },
  {
    question: 'Where should I measure?',
    answer: 'Measure waist at the navel, neck just below the larynx, and hips at the widest point.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This is a screening tool and not a diagnosis.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Learn how body fat percentage is used in health contexts.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function ArmyBodyFatCalculator() {
  const height = useHeight();
  const [gender, setGender] = useState<Gender>('male');
  const [waist, setWaist] = useState<number | ''>('');
  const [neck, setNeck] = useState<number | ''>('');
  const [hip, setHip] = useState<number | ''>('');
  const [unit, setUnit] = useState<CircumferenceUnit>('cm');
  const [errors, setErrors] = useState<{
    height?: string;
    waist?: string;
    neck?: string;
    hip?: string;
  }>({});
  const [result, setResult] = useState<ArmyBodyFatResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const toggleUnit = useCallback(() => {
    const nextUnit = unit === 'cm' ? 'in' : 'cm';
    const convertValue = (value: number | '') =>
      typeof value === 'number' ? parseFloat(convertLength(value, unit, nextUnit).toFixed(1)) : '';

    setWaist(convertValue);
    setNeck(convertValue);
    setHip(convertValue);
    setUnit(nextUnit);
  }, [unit]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { height?: string; waist?: string; neck?: string; hip?: string } = {};

      if (typeof height.value !== 'number') {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const validation = validateHeight(height.value, unitSystem);
        if (!validation.isValid) {
          newErrors.height = validation.error;
        }
      }

      if (typeof waist !== 'number') {
        newErrors.waist = 'Waist is required';
      } else {
        const unitSystem = unit === 'cm' ? 'metric' : 'imperial';
        const validation = validateWaist(waist, unitSystem);
        if (!validation.isValid) {
          newErrors.waist = validation.error;
        }
      }

      if (typeof neck !== 'number') {
        newErrors.neck = 'Neck is required';
      } else {
        const unitSystem = unit === 'cm' ? 'metric' : 'imperial';
        const validation = validateNeck(neck, unitSystem);
        if (!validation.isValid) {
          newErrors.neck = validation.error;
        }
      }

      if (gender === 'female') {
        if (typeof hip !== 'number') {
          newErrors.hip = 'Hip is required';
        } else {
          const unitSystem = unit === 'cm' ? 'metric' : 'imperial';
          const validation = validateHip(hip, unitSystem);
          if (!validation.isValid) {
            newErrors.hip = validation.error;
          }
        }
      }

      setErrors(newErrors);

      const heightIn = height.toCm() ? convertLength(height.toCm() as number, 'cm', 'in') : null;
      const waistIn = typeof waist === 'number' ? convertLength(waist, unit, 'in') : null;
      const neckIn = typeof neck === 'number' ? convertLength(neck, unit, 'in') : null;
      const hipIn = typeof hip === 'number' ? convertLength(hip, unit, 'in') : undefined;

      if (Object.keys(newErrors).length === 0 && heightIn && waistIn && neckIn) {
        try {
          const calculated = calculateArmyBodyFat({
            gender,
            heightIn,
            waistIn,
            neckIn,
            hipIn,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('army-body-fat-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your inputs.');
        }
      }
    },
    [gender, height, waist, neck, hip, unit]
  );

  const handleReset = useCallback(() => {
    height.setValue('');
    setGender('male');
    setWaist('');
    setNeck('');
    setHip('');
    setUnit('cm');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [height]);

  return (
    <CalculatorPageLayout
      title="Army Body Fat Calculator"
      description="Estimate body fat percentage using U.S. Army circumference method."
      calculatorSlug="army-body-fat"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Army Body Fat Calculator',
        description: 'Estimate body fat percentage using U.S. Army circumference method.',
        url: 'https://www.healthcalc.xyz/army-body-fat',
      }}
      understandingSection={<ArmyBodyFatInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Army Body Fat"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
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
            {
              name: 'waist',
              label: 'Waist',
              type: 'number',
              value: waist,
              onChange: setWaist,
              error: errors.waist,
              placeholder: unit === 'cm' ? 'Centimeters' : 'Inches',
              unit,
              unitToggle: toggleUnit,
              step: '0.1',
            },
            {
              name: 'neck',
              label: 'Neck',
              type: 'number',
              value: neck,
              onChange: setNeck,
              error: errors.neck,
              placeholder: unit === 'cm' ? 'Centimeters' : 'Inches',
              unit,
              unitToggle: toggleUnit,
              step: '0.1',
            },
            {
              name: 'hip',
              label: 'Hip (women only)',
              type: 'number',
              value: hip,
              onChange: setHip,
              error: errors.hip,
              placeholder: unit === 'cm' ? 'Centimeters' : 'Inches',
              unit,
              unitToggle: toggleUnit,
              step: '0.1',
            },
          ]}
          submitButtonText="Calculate Body Fat"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <ArmyBodyFatResult result={result} />
        {result && (
          <SaveResult
            calculatorType="army-body-fat"
            calculatorName="Army Body Fat Calculator"
            data={{
              bodyFatPercentage: result.bodyFatPercentage,
              category: result.category,
            }}
          />
        )}
        <AffiliateLinks calculatorType="army-body-fat" />
      </div>
    </CalculatorPageLayout>
  );
}
