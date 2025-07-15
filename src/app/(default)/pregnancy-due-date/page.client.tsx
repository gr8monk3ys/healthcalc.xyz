'use client';

import React, { useState } from 'react';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';
import PregnancyDueDateResult from '@/components/calculators/pregnancy-due-date/PregnancyDueDateResult';
import PregnancyDueDateInfo from '@/components/calculators/pregnancy-due-date/PregnancyDueDateInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import SaveResult from '@/components/SaveResult';
import { isEmpty } from '@/utils/validation';
import { calculatePregnancyDueDate } from '@/utils/calculators/pregnancyDueDate';
import type {
  PregnancyDueDateResult as PregnancyDueDateResultType,
  PregnancyDueDateMethod,
} from '@/types/pregnancyDueDate';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';

const faqs = [
  {
    question: 'How is the due date calculated?',
    answer:
      'Most calculators add 40 weeks (280 days) to the first day of your last menstrual period. If you know your conception date, 38 weeks (266 days) is commonly used.',
  },
  {
    question: 'How accurate is a due date estimate?',
    answer:
      'Due dates are estimates. Only about 1 in 20 babies are born on their due date, and normal delivery can vary by a couple of weeks.',
  },
  {
    question: 'Should I rely on this calculator for medical decisions?',
    answer:
      'No. This tool provides general estimates. Always consult your healthcare provider for individualized guidance.',
  },
];

const relatedArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Get context for health metrics beyond the scale.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function PregnancyDueDateCalculator({
  serverHeader,
}: {
  serverHeader?: React.ReactNode;
}) {
  const [method, setMethod] = useState<PregnancyDueDateMethod>('lmp');
  const [date, setDate] = useState('');

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<PregnancyDueDateResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};
        if (isEmpty(date)) {
          newErrors.date = 'Date is required';
        }
        return newErrors;
      },
      calculate: () => {
        const calculated = calculatePregnancyDueDate(date, method);
        setTimeout(() => {
          const element = document.getElementById('pregnancy-due-date-result');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return calculated;
      },
    });

  const onReset = () => {
    handleReset(() => {
      setMethod('lmp');
      setDate('');
    });
  };

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Pregnancy Due Date Calculator"
      description="Estimate your due date based on last menstrual period or conception date."
      calculatorSlug="pregnancy-due-date"
      faqs={faqs}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Pregnancy Due Date Calculator',
        description: 'Estimate your due date based on last menstrual period or conception date.',
        url: 'https://www.healthcalc.xyz/pregnancy-due-date',
      }}
      understandingSection={<PregnancyDueDateInfo />}
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Due Date"
          onSubmit={handleSubmit}
          onReset={onReset}
          fields={[
            {
              name: 'method',
              label: 'I know my',
              type: 'radio',
              value: method,
              onChange: value => setMethod(value as PregnancyDueDateMethod),
              options: [
                { value: 'lmp', label: 'Last menstrual period' },
                { value: 'conception', label: 'Conception date' },
              ],
            },
            {
              name: 'date',
              label: method === 'lmp' ? 'First day of last period' : 'Conception date',
              type: 'date',
              value: date,
              onChange: setDate,
              error: errors.date,
            },
          ]}
          submitButtonText="Calculate Due Date"
        />
        <CalculatorErrorDisplay error={calculationError} />
      </div>

      <div className="md:col-span-2 space-y-6">
        <PregnancyDueDateResult result={result} />
        {result && (
          <SaveResult
            calculatorType="pregnancy-due-date"
            calculatorName="Pregnancy Due Date Calculator"
            data={{
              inputDate: result.inputDate,
              method: result.method,
              dueDate: result.dueDate,
            }}
          />
        )}
        <AffiliateLinks calculatorType="pregnancy-due-date" />
      </div>
    </CalculatorPageLayout>
  );
}
