'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'OneRepMaxCalculator' });
import dynamic from 'next/dynamic';
import {
  processOneRepMaxCalculation,
  validateOneRepMaxWeight,
  validateReps,
} from '@/utils/calculators/oneRepMax';
import { OneRepMaxResult, OneRepMaxFormula } from '@/types/oneRepMax';
import { WeightUnit } from '@/types/common';
import { isEmpty } from '@/utils/validation';
import { convertWeight } from '@/utils/conversions';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import OneRepMaxResultDisplay from '@/components/calculators/oneRepMax/OneRepMaxResult';
import OneRepMaxInfo from '@/components/calculators/oneRepMax/OneRepMaxInfo';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import SocialShare from '@/components/SocialShare';
import SaveResult from '@/components/SaveResult';
import { ONE_REP_MAX_FORMULAS } from '@/constants/oneRepMax';

// Dynamic imports for below-the-fold components
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const RelatedArticles = dynamic(() => import('@/components/RelatedArticles'));
const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'));

// FAQ data for 1RM calculator
const faqs = [
  {
    question: 'What is a One Rep Max (1RM)?',
    answer:
      'A One Rep Max (1RM) is the maximum amount of weight you can lift for a single repetition with proper form. It is a fundamental measure of strength used to program training, track progress, and compare performance across exercises. Rather than actually testing your max, calculators estimate 1RM from submaximal lifts, which is safer and more practical.',
  },
  {
    question: 'Which 1RM formula is most accurate?',
    answer:
      'The Epley formula is widely considered the most accurate for rep ranges of 1-10 and is the most commonly used in strength training. The Brzycki formula works well for 1-12 reps with a more linear relationship. The Lombardi formula tends to be better for higher rep ranges (10-15). For best results, use weight you can lift for 3-10 reps to failure or near-failure.',
  },
  {
    question: 'How often should I test my 1RM?',
    answer:
      'For beginners, estimate 1RM every 4-6 weeks as strength gains occur rapidly. Intermediate lifters can test every 6-12 weeks. Advanced lifters may test every 12-16 weeks or aligned with training cycles (mesocycles). Using submaximal estimation is safer than actual 1RM testing and can be done more frequently without central nervous system fatigue.',
  },
  {
    question: 'Why do different formulas give different results?',
    answer:
      'Each formula uses a different mathematical model to estimate 1RM from submaximal performance. The Epley formula assumes a linear relationship between reps and percentage of 1RM. Brzycki uses a similar but slightly different linear model. Lombardi uses an exponential model. At lower rep ranges (1-5), formulas converge. At higher reps (10+), they diverge more significantly.',
  },
  {
    question: 'What are the best exercises to test 1RM?',
    answer:
      '1RM testing is most reliable for compound exercises: barbell squat, bench press, deadlift, overhead press, and barbell row. These movements allow for small weight increments and have well-established form standards. Isolation exercises and machines are less suitable for 1RM testing due to technique variability and equipment differences.',
  },
  {
    question: 'How accurate are 1RM calculators?',
    answer:
      'Studies show 1RM calculators are typically accurate within 5-10% for trained individuals using 3-10 rep sets. Accuracy decreases with higher rep ranges (10+), untrained individuals, exercises with high technique demands, and when fatigue or other variables affect performance. Use calculated 1RM as a training guideline, not an absolute value.',
  },
];

// Related articles data
const blogArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description:
      'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description:
      'Discover how Total Daily Energy Expenditure (TDEE) works, which formula is most accurate for you, and how to use it for weight management.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function OneRepMaxCalculator() {
  // State for form inputs
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [reps, setReps] = useState<number | ''>('');
  const [formula, setFormula] = useState<OneRepMaxFormula>('epley');

  // State for form validation
  const [errors, setErrors] = useState<{
    weight?: string;
    reps?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<OneRepMaxResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // State for user-facing calculation errors
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Toggle weight unit
  const toggleWeightUnit = useCallback(() => {
    if (weightUnit === 'kg') {
      if (typeof weight === 'number') {
        const converted = convertWeight(weight, 'kg', 'lb');
        setWeight(parseFloat(converted.toFixed(1)));
      }
      setWeightUnit('lb');
    } else {
      if (typeof weight === 'number') {
        const converted = convertWeight(weight, 'lb', 'kg');
        setWeight(parseFloat(converted.toFixed(1)));
      }
      setWeightUnit('kg');
    }
  }, [weight, weightUnit]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      // Validate form
      const newErrors: {
        weight?: string;
        reps?: string;
      } = {};

      // Validate weight
      if (isEmpty(weight)) {
        newErrors.weight = 'Weight is required';
      } else {
        const weightValidation = validateOneRepMaxWeight(weight, weightUnit);
        if (!weightValidation.isValid) {
          newErrors.weight = weightValidation.error;
        }
      }

      // Validate reps
      if (isEmpty(reps)) {
        newErrors.reps = 'Reps are required';
      } else {
        const repsValidation = validateReps(reps);
        if (!repsValidation.isValid) {
          newErrors.reps = repsValidation.error;
        }
      }

      setErrors(newErrors);

      // If no errors, calculate 1RM
      if (
        Object.keys(newErrors).length === 0 &&
        typeof weight === 'number' &&
        typeof reps === 'number'
      ) {
        try {
          const oneRepMaxResult = processOneRepMaxCalculation({
            weight,
            weightUnit,
            reps,
            formula,
          });

          setResult(oneRepMaxResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('one-rep-max-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating 1RM', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [weight, weightUnit, reps, formula]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setWeight('');
    setWeightUnit('kg');
    setReps('');
    setFormula('epley');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, []);

  // Form fields for the CalculatorForm component
  const formFields = useMemo(
    () => [
      {
        name: 'weight',
        label: 'Weight Lifted',
        type: 'number' as const,
        value: weight,
        onChange: setWeight,
        error: errors.weight,
        placeholder: weightUnit === 'kg' ? 'Kilograms' : 'Pounds',
        unit: weightUnit,
        unitToggle: toggleWeightUnit,
        step: '0.5',
      },
      {
        name: 'reps',
        label: 'Repetitions',
        type: 'number' as const,
        value: reps,
        onChange: setReps,
        error: errors.reps,
        placeholder: 'Number of reps (1-30)',
        min: 1,
        max: 30,
        step: '1',
      },
      {
        name: 'formula',
        label: 'Formula',
        type: 'select' as const,
        value: formula,
        onChange: (value: string) => setFormula(value as OneRepMaxFormula),
        options: ONE_REP_MAX_FORMULAS.map(f => ({
          value: f.id,
          label: `${f.name} - ${f.accuracy}`,
        })),
      },
    ],
    [weight, weightUnit, reps, formula, errors, toggleWeightUnit]
  );

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">One Rep Max (1RM) Calculator</h1>
        <p className="text-gray-600 mb-6">
          Estimate your one rep max from submaximal lifts. Get training zone recommendations and a
          percentage chart for programming your workouts.
        </p>

        {/* Social sharing buttons */}
        <div className="mb-6">
          <SocialShare
            url="/one-rep-max"
            title="One Rep Max Calculator | Estimate Your 1RM"
            description="Calculate your one rep max from submaximal lifts using Epley, Brzycki, or Lombardi formulas. Get training zone recommendations for strength, hypertrophy, and endurance."
            hashtags={['1RM', 'strengthtraining', 'fitness', 'powerlifting']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <CalculatorForm
              title="Enter Your Lift Details"
              fields={formFields}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />

            {/* User-facing error state */}
            {calculationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-4">
                {calculationError}
              </div>
            )}
          </div>

          <div className="md:col-span-2" id="one-rep-max-result">
            {showResult && result ? (
              <>
                <OneRepMaxResultDisplay result={result} />

                {/* Save result functionality */}
                <div className="mt-6 flex justify-between items-center">
                  <SaveResult
                    calculatorType="one-rep-max"
                    calculatorName="One Rep Max Calculator"
                    data={{
                      oneRepMax: result.oneRepMax,
                      formula: result.selectedFormula,
                      weightUnit: result.weightUnit,
                      trainingZones: result.trainingZones.map(z => ({
                        name: z.name,
                        range: `${z.minWeight}-${z.maxWeight} ${result.weightUnit}`,
                      })),
                    }}
                  />

                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    New Calculation
                  </button>
                </div>
              </>
            ) : (
              <OneRepMaxInfo />
            )}
          </div>
        </div>

        {/* FAQ Section with structured data */}
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions About One Rep Max"
          className="mb-8"
        />

        {/* Related Articles Section */}
        <RelatedArticles
          currentSlug=""
          articles={blogArticles}
          title="Related Articles"
          className="my-8"
        />

        {/* Newsletter Signup */}
        <NewsletterSignup
          title="Get Strength Training Tips"
          description="Subscribe to receive the latest strength training insights, workout programming advice, and evidence-based fitness tips delivered to your inbox."
          className="my-8"
        />

        {/* Structured data for the calculator */}
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'One Rep Max Calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Calculate your One Rep Max (1RM) from submaximal lifts using Epley, Brzycki, or Lombardi formulas. Get training zone recommendations and percentage charts for strength programming.',
            url: 'https://www.heathcheck.info/one-rep-max',
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
