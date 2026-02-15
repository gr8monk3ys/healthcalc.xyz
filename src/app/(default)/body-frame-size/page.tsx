'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import BodyFrameSizeResult from '@/components/calculators/body-frame-size/BodyFrameSizeResult';
import BodyFrameSizeInfo from '@/components/calculators/body-frame-size/BodyFrameSizeInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateBodyFrameSize } from '@/utils/calculators/bodyFrameSize';
import { convertLength } from '@/utils/conversions';
import { validateHeight, validateWrist } from '@/utils/validation';
import type { BodyFrameSizeResult as BodyFrameSizeResultType } from '@/types/bodyFrameSize';
import { Gender } from '@/types/common';
import { useHeight, createHeightField } from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'What does frame size affect?',
    answer: 'Frame size can influence healthy weight ranges and body composition expectations.',
  },
  {
    question: 'Where do I measure my wrist?',
    answer: 'Measure around the narrowest part of your wrist, just above the wrist bone.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. This is a general screening tool.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Learn how different body metrics work together.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function BodyFrameSizeCalculator() {
  const height = useHeight();
  const [gender, setGender] = useState<Gender>('female');
  const [wrist, setWrist] = useState<number | ''>('');
  const [wristUnit, setWristUnit] = useState<'cm' | 'in'>('cm');
  const [errors, setErrors] = useState<{ height?: string; wrist?: string }>({});
  const [result, setResult] = useState<BodyFrameSizeResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const toggleWristUnit = useCallback(() => {
    const nextUnit = wristUnit === 'cm' ? 'in' : 'cm';
    if (typeof wrist === 'number') {
      const converted = convertLength(wrist, wristUnit, nextUnit);
      setWrist(parseFloat(converted.toFixed(1)));
    }
    setWristUnit(nextUnit);
  }, [wrist, wristUnit]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { height?: string; wrist?: string } = {};

      if (typeof height.value !== 'number') {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const validation = validateHeight(height.value, unitSystem);
        if (!validation.isValid) {
          newErrors.height = validation.error;
        }
      }

      if (typeof wrist !== 'number') {
        newErrors.wrist = 'Wrist is required';
      } else {
        const unitSystem = wristUnit === 'cm' ? 'metric' : 'imperial';
        const validation = validateWrist(wrist, unitSystem);
        if (!validation.isValid) {
          newErrors.wrist = validation.error;
        }
      }

      setErrors(newErrors);

      const heightCm = height.toCm();
      const wristCm = typeof wrist === 'number' ? convertLength(wrist, wristUnit, 'cm') : null;

      if (Object.keys(newErrors).length === 0 && heightCm && wristCm) {
        try {
          const calculated = calculateBodyFrameSize({
            gender,
            heightCm,
            wristCm,
          });
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('body-frame-size-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your input.');
        }
      }
    },
    [height, wrist, wristUnit, gender]
  );

  const handleReset = useCallback(() => {
    height.setValue('');
    setGender('female');
    setWrist('');
    setWristUnit('cm');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, [height]);

  return (
    <CalculatorPageLayout
      title="Body Frame Size Calculator"
      description="Determine body frame size using height and wrist circumference."
      calculatorSlug="body-frame-size"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Body Frame Size Calculator',
        description: 'Determine body frame size using height and wrist circumference.',
        url: 'https://www.healthcalc.xyz/body-frame-size',
      }}
      understandingSection={<BodyFrameSizeInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Body Frame Size"
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
                { value: 'female', label: 'Female' },
                { value: 'male', label: 'Male' },
              ],
            },
            createHeightField(height, errors.height),
            {
              name: 'wrist',
              label: 'Wrist Circumference',
              type: 'number',
              value: wrist,
              onChange: setWrist,
              error: errors.wrist,
              placeholder: wristUnit === 'cm' ? 'Centimeters' : 'Inches',
              unit: wristUnit,
              unitToggle: toggleWristUnit,
              step: '0.1',
            },
          ]}
          submitButtonText="Calculate Frame"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <BodyFrameSizeResult result={result} />
        {result && (
          <SaveResult
            calculatorType="body-frame-size"
            calculatorName="Body Frame Size Calculator"
            data={{
              ratio: result.ratio,
              category: result.category,
            }}
          />
        )}
        <AffiliateLinks calculatorType="body-frame-size" />
      </div>
    </CalculatorPageLayout>
  );
}
