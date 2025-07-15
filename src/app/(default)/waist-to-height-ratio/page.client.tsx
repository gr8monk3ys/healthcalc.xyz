'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import WaistToHeightRatioResult from '@/components/calculators/waist-to-height-ratio/WaistToHeightRatioResult';
import WaistToHeightRatioInfo from '@/components/calculators/waist-to-height-ratio/WaistToHeightRatioInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateWaistToHeightRatio } from '@/utils/calculators/waistToHeightRatio';
import { convertLength } from '@/utils/conversions';
import { isEmpty, validateHeight, validateWaist } from '@/utils/validation';
import type { WaistToHeightRatioResult as WaistToHeightRatioResultType } from '@/types/waistToHeightRatio';
import { useHeight, createHeightField } from '@/hooks/useCalculatorUnits';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

type WaistUnit = 'cm' | 'in';

const faqs = [
  {
    question: 'What is a good waist-to-height ratio?',
    answer:
      'A common guideline is to keep waist circumference below 50% of height. This is a simple screening tool, not a diagnosis.',
  },
  {
    question: 'Where should I measure my waist?',
    answer:
      'Measure around your natural waist, typically just above the hip bones, after exhaling normally.',
  },
  {
    question: 'How often should I track this?',
    answer:
      'Monthly tracking works well for most people. Re-measure after major weight or lifestyle changes.',
  },
];

const relatedArticles = [
  {
    title: 'Waist-to-Hip Ratio Guide: What Your Measurements Reveal',
    description: 'See how body shape metrics compare and what they mean for health.',
    slug: 'waist-to-hip-ratio-guide',
    date: 'February 12, 2025',
    readTime: '10 min read',
    category: 'Body Composition',
  },
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'See how body fat percentage and measurements work together.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function WaistToHeightRatioCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const height = useHeight();
  const [waist, setWaist] = useState<number | ''>('');
  const [waistUnit, setWaistUnit] = useState<WaistUnit>('cm');

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<WaistToHeightRatioResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        if (isEmpty(height.value)) {
          newErrors.height = 'Height is required';
        } else {
          const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
          const heightValidation = validateHeight(height.value, unitSystem);
          if (!heightValidation.isValid) {
            newErrors.height = heightValidation.error;
          }
        }

        if (isEmpty(waist)) {
          newErrors.waist = 'Waist is required';
        } else {
          const unitSystem = waistUnit === 'cm' ? 'metric' : 'imperial';
          const waistValidation = validateWaist(waist, unitSystem);
          if (!waistValidation.isValid) {
            newErrors.waist = waistValidation.error;
          }
        }

        return newErrors;
      },
      calculate: () => {
        const heightCm = height.toCm() as number;
        const waistCm = convertLength(waist as number, waistUnit, 'cm');

        const calculated = calculateWaistToHeightRatio(waistCm, heightCm);

        setTimeout(() => {
          const element = document.getElementById('waist-to-height-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        return calculated;
      },
    });

  const toggleWaistUnit = useCallback(() => {
    if (waistUnit === 'cm') {
      if (typeof waist === 'number') {
        const converted = convertLength(waist, 'cm', 'in');
        setWaist(parseFloat(converted.toFixed(1)));
      }
      setWaistUnit('in');
    } else {
      if (typeof waist === 'number') {
        const converted = convertLength(waist, 'in', 'cm');
        setWaist(parseFloat(converted.toFixed(1)));
      }
      setWaistUnit('cm');
    }
  }, [waist, waistUnit]);

  const onReset = () => {
    handleReset(() => {
      height.setValue('');
      setWaist('');
      setWaistUnit('cm');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Waist-to-Height Ratio Calculator"
      description="Calculate your waist-to-height ratio to assess body shape and health risk."
      calculatorSlug="waist-to-height-ratio"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Waist-to-Height Ratio Calculator',
        description: 'Calculate your waist-to-height ratio to assess body shape and health risk.',
        url: 'https://www.healthcalc.xyz/waist-to-height-ratio',
      }}
      understandingSection={<WaistToHeightRatioInfo />}
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Waist-to-Height Ratio"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            createHeightField(height, errors.height),
            {
              name: 'waist',
              label: 'Waist',
              type: 'number',
              value: waist,
              onChange: setWaist,
              error: errors.waist,
              placeholder: waistUnit === 'cm' ? 'Centimeters' : 'Inches',
              unit: waistUnit,
              unitToggle: toggleWaistUnit,
              step: '0.1',
            },
          ]}
          submitButtonText="Calculate Ratio"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <WaistToHeightRatioResult result={result} />
        {result && (
          <SaveResult
            calculatorType="waist-to-height-ratio"
            calculatorName="Waist-to-Height Ratio Calculator"
            data={{
              ratio: result.ratio,
              category: result.category,
            }}
          />
        )}
        <AffiliateLinks calculatorType="waist-to-height-ratio" />
      </div>
    </CalculatorPageLayout>
  );
}
