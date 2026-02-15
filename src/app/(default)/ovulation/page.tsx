'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import OvulationResult from '@/components/calculators/ovulation/OvulationResult';
import OvulationInfo from '@/components/calculators/ovulation/OvulationInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateCycleLength } from '@/utils/validation';
import { calculateOvulation } from '@/utils/calculators/ovulation';
import type { OvulationResult as OvulationResultType } from '@/types/ovulation';

const faqs = [
  {
    question: 'When does ovulation happen?',
    answer:
      'Ovulation typically occurs about 14 days before your next period, but this varies by person and cycle length.',
  },
  {
    question: 'How long is the fertile window?',
    answer:
      'The fertile window usually includes the 5 days before ovulation and the day of ovulation itself.',
  },
  {
    question: 'What if my cycles are irregular?',
    answer:
      'Use your average cycle length if possible and consult a healthcare provider for more personalized guidance.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Learn how to interpret health metrics that matter.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function OvulationCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ date?: string; cycleLength?: string }>({});
  const [result, setResult] = useState<OvulationResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { date?: string; cycleLength?: string } = {};

      if (isEmpty(lastPeriodDate)) {
        newErrors.date = 'Last period date is required';
      }

      if (isEmpty(cycleLength)) {
        newErrors.cycleLength = 'Cycle length is required';
      } else {
        const validation = validateCycleLength(cycleLength);
        if (!validation.isValid) {
          newErrors.cycleLength = validation.error;
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && typeof cycleLength === 'number') {
        try {
          const calculated = calculateOvulation(lastPeriodDate, cycleLength);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('ovulation-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Please enter valid inputs.');
        }
      }
    },
    [lastPeriodDate, cycleLength]
  );

  const handleReset = useCallback(() => {
    setLastPeriodDate('');
    setCycleLength('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Ovulation Calculator"
      description="Estimate your ovulation date and fertile window based on cycle length."
      calculatorSlug="ovulation"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Ovulation Calculator',
        description: 'Estimate your ovulation date and fertile window based on cycle length.',
        url: 'https://www.healthcalc.xyz/ovulation',
      }}
      understandingSection={<OvulationInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Ovulation"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'lastPeriodDate',
              label: 'First day of last period',
              type: 'date',
              value: lastPeriodDate,
              onChange: setLastPeriodDate,
              error: errors.date,
            },
            {
              name: 'cycleLength',
              label: 'Average cycle length (days)',
              type: 'number',
              value: cycleLength,
              onChange: setCycleLength,
              error: errors.cycleLength,
              placeholder: 'e.g., 28',
            },
          ]}
          submitButtonText="Calculate Ovulation"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <OvulationResult result={result} />
        {result && (
          <SaveResult
            calculatorType="ovulation"
            calculatorName="Ovulation Calculator"
            data={{
              ovulationDate: result.ovulationDate,
              fertileWindow: `${result.fertileWindowStart} - ${result.fertileWindowEnd}`,
            }}
          />
        )}
        <AffiliateLinks calculatorType="ovulation" />
      </div>
    </CalculatorPageLayout>
  );
}
