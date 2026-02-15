'use client';

import React, { useState, useCallback } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import DueDateByConceptionResult from '@/components/calculators/due-date-by-conception/DueDateByConceptionResult';
import DueDateByConceptionInfo from '@/components/calculators/due-date-by-conception/DueDateByConceptionInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateDueDateByConception } from '@/utils/calculators/dueDateByConception';
import type { DueDateByConceptionResult as DueDateByConceptionResultType } from '@/types/dueDateByConception';

const faqs = [
  {
    question: 'How accurate is this estimate?',
    answer: 'It uses a standard 38-week gestation from conception. Ultrasounds may adjust timing.',
  },
  {
    question: 'Can I use this if I only know LMP?',
    answer: 'Use the pregnancy due date calculator if you only know your last period.',
  },
  {
    question: 'Is this medical advice?',
    answer: 'No. Always confirm with your healthcare provider.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'General health insights for pregnancy planning.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function DueDateByConceptionCalculator() {
  const [conceptionDate, setConceptionDate] = useState('');
  const [errors, setErrors] = useState<{ conceptionDate?: string }>({});
  const [result, setResult] = useState<DueDateByConceptionResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { conceptionDate?: string } = {};
      if (!conceptionDate) {
        newErrors.conceptionDate = 'Conception date is required';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          const calculated = calculateDueDateByConception(conceptionDate);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('due-date-by-conception-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Unable to calculate. Please double-check your date.');
        }
      }
    },
    [conceptionDate]
  );

  const handleReset = useCallback(() => {
    setConceptionDate('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Due Date by Conception Calculator"
      description="Estimate pregnancy due date from conception date."
      calculatorSlug="due-date-by-conception"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Due Date by Conception Calculator',
        description: 'Estimate pregnancy due date from conception date.',
        url: 'https://www.healthcalc.xyz/due-date-by-conception',
      }}
      understandingSection={<DueDateByConceptionInfo />}
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Due Date by Conception"
          onSubmit={handleSubmit}
          onReset={handleReset}
          fields={[
            {
              name: 'conceptionDate',
              label: 'Conception Date',
              type: 'date',
              value: conceptionDate,
              onChange: setConceptionDate,
              error: errors.conceptionDate,
            },
          ]}
          submitButtonText="Calculate Due Date"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <DueDateByConceptionResult result={result} />
        {result && (
          <SaveResult
            calculatorType="due-date-by-conception"
            calculatorName="Due Date by Conception Calculator"
            data={{
              dueDate: result.dueDate,
            }}
          />
        )}
        <AffiliateLinks calculatorType="due-date-by-conception" />
      </div>
    </CalculatorPageLayout>
  );
}
