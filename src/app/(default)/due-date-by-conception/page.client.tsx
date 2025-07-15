'use client';

import React, { useState } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import DueDateByConceptionResult from '@/components/calculators/due-date-by-conception/DueDateByConceptionResult';
import DueDateByConceptionInfo from '@/components/calculators/due-date-by-conception/DueDateByConceptionInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { calculateDueDateByConception } from '@/utils/calculators/dueDateByConception';
import type { DueDateByConceptionResult as DueDateByConceptionResultType } from '@/types/dueDateByConception';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

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

export default function DueDateByConceptionCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const [conceptionDate, setConceptionDate] = useState('');

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<DueDateByConceptionResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};
        if (!conceptionDate) {
          newErrors.conceptionDate = 'Conception date is required';
        }
        return newErrors;
      },
      calculate: () => {
        const calculated = calculateDueDateByConception(conceptionDate);
        setTimeout(() => {
          const element = document.getElementById('due-date-by-conception-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      setConceptionDate('');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
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
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Due Date by Conception"
          onSubmit={handleSubmit}
          onReset={onReset}
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
