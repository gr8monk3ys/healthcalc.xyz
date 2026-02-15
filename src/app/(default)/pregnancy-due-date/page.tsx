'use client';

import React, { useState, useCallback } from 'react';
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

export default function PregnancyDueDateCalculator() {
  const [method, setMethod] = useState<PregnancyDueDateMethod>('lmp');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<{ date?: string }>({});
  const [result, setResult] = useState<PregnancyDueDateResultType | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: { date?: string } = {};
      if (isEmpty(date)) {
        newErrors.date = 'Date is required';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          const calculated = calculatePregnancyDueDate(date, method);
          setResult(calculated);
          setTimeout(() => {
            const element = document.getElementById('pregnancy-due-date-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          setCalculationError('Please enter a valid date.');
        }
      }
    },
    [date, method]
  );

  const handleReset = useCallback(() => {
    setMethod('lmp');
    setDate('');
    setErrors({});
    setResult(null);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
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
      showResultsCapture={!!result}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Due Date"
          onSubmit={handleSubmit}
          onReset={handleReset}
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
