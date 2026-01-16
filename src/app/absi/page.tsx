'use client';

import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Gender } from '@/types/common';
import { ABSIResult as ABSIResultType } from '@/types/absi';
import { calculateABSIMetrics } from '@/utils/calculators/absi';
import {
  validateAge,
  validateHeight,
  validateWeight,
  validateWaist,
  isEmpty,
} from '@/utils/validation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import ABSIResultDisplay from '@/components/calculators/absi/ABSIResult';
import ABSIInfo from '@/components/calculators/absi/ABSIInfo';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import SocialShare from '@/components/SocialShare';
import SaveResult from '@/components/SaveResult';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// Dynamic imports for below-the-fold components
const ABSIUnderstanding = dynamic(() => import('@/components/calculators/absi/ABSIUnderstanding'));
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const RelatedArticles = dynamic(() => import('@/components/RelatedArticles'));
const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'));

// FAQ data for the calculator
const faqs = [
  {
    question: 'What is ABSI and why is it better than BMI?',
    answer:
      'A Body Shape Index (ABSI) is a health risk indicator that combines waist circumference, height, weight, age, and gender. Unlike BMI which only considers height and weight, ABSI specifically accounts for abdominal fat distribution. Research shows ABSI is a better predictor of mortality risk than BMI because it captures central obesity - the dangerous fat around organs that BMI misses. Athletes with high muscle mass may have high BMI but low ABSI, while sedentary individuals may have normal BMI but high ABSI.',
  },
  {
    question: 'How do I accurately measure my waist for ABSI?',
    answer:
      "To measure your waist circumference correctly: 1) Stand upright and breathe normally, 2) Locate the top of your hip bones (iliac crest), 3) Wrap a flexible measuring tape around your waist at this level, ensuring it's parallel to the floor, 4) The tape should be snug but not compress your skin, 5) Measure at the end of a normal exhale. Take 2-3 measurements and use the average. Common mistakes include measuring too high (at the belly button) or too low (at the hips). Measure in centimeters for best accuracy.",
  },
  {
    question: 'What is a healthy ABSI score?',
    answer:
      'ABSI scores are typically compared to population averages using z-scores. A z-score of 0 is average for your age and gender. Negative z-scores (below 0) indicate lower health risk, while positive scores indicate higher risk. Generally: z-score < -0.5 = low risk, -0.5 to 0.5 = average risk, 0.5 to 1.0 = elevated risk, > 1.0 = high risk. However, ABSI should be considered alongside other health markers like blood pressure, cholesterol, and fitness level for a complete health assessment.',
  },
  {
    question: 'Can ABSI predict specific health conditions?',
    answer:
      'Research shows ABSI is associated with increased risk of cardiovascular disease, type 2 diabetes, and all-cause mortality. Higher ABSI indicates greater central obesity, which is linked to metabolic syndrome, insulin resistance, and inflammation. Studies have found ABSI predicts mortality risk independently of BMI, meaning someone with normal BMI but high ABSI still faces elevated health risks. However, ABSI is a statistical risk indicator, not a diagnostic tool - it cannot predict individual outcomes.',
  },
  {
    question: 'How can I improve my ABSI score?',
    answer:
      "To reduce ABSI, focus on reducing visceral fat through: 1) Calorie deficit combined with whole foods diet, 2) Regular cardiovascular exercise (150+ minutes/week), 3) Resistance training to build muscle and boost metabolism, 4) Adequate sleep (7-9 hours), 5) Stress management to reduce cortisol. Spot reduction doesn't work - you cannot target abdominal fat specifically. Focus on overall fat loss through sustainable lifestyle changes. Even modest reductions in waist circumference (5-10 cm) can significantly improve health markers.",
  },
];

// Blog article data for related articles
const blogArticles = [
  {
    title: 'Understanding ABSI: Beyond BMI for Health Assessment',
    description:
      'Learn why A Body Shape Index (ABSI) is a more accurate predictor of health risks than BMI, how it works, and what your score means for longevity.',
    slug: 'understanding-absi',
    date: 'February 18, 2025',
    readTime: '11 min read',
    category: 'Health Metrics',
  },
  {
    title: 'Waist-to-Hip Ratio Guide: What Your Measurements Reveal',
    description:
      'Discover how waist-to-hip ratio (WHR) indicates health risks, proper measurement techniques, and what healthy ratios look like for men and women.',
    slug: 'waist-to-hip-ratio-guide',
    date: 'February 12, 2025',
    readTime: '10 min read',
    category: 'Body Composition',
  },
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description:
      'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function ABSICalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const height = useHeight();
  const weight = useWeight();
  const [waist, setWaist] = useState<number | ''>('');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    waist?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<ABSIResultType | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // State for user-facing calculation errors
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      // Validate form
      const newErrors: {
        age?: string;
        height?: string;
        weight?: string;
        waist?: string;
      } = {};

      // Validate age
      if (isEmpty(age)) {
        newErrors.age = 'Age is required';
      } else {
        const ageValidation = validateAge(age);
        if (!ageValidation.isValid) {
          newErrors.age = ageValidation.error;
        }
      }

      // Validate height
      // Validate height (feet for imperial, cm for metric)
      if (isEmpty(height.value)) {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const heightValidation = validateHeight(height.value, unitSystem);
        if (!heightValidation.isValid) {
          newErrors.height = heightValidation.error;
        }
      }

      // Validate weight
      if (isEmpty(weight.value)) {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const weightValidation = validateWeight(weight.value, unitSystem);
        if (!weightValidation.isValid) {
          newErrors.weight = weightValidation.error;
        }
      }

      // Validate waist
      if (isEmpty(waist)) {
        newErrors.waist = 'Waist measurement is required';
      } else {
        const waistValidation = validateWaist(waist, 'metric');
        if (!waistValidation.isValid) {
          newErrors.waist = waistValidation.error;
        }
      }

      setErrors(newErrors);

      // Get converted values
      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      // If no errors, calculate ABSI
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null &&
        typeof waist === 'number'
      ) {
        try {
          // Calculate ABSI and related metrics
          const absiResult = calculateABSIMetrics(waist, heightCm, weightKg, age, gender);

          setResult(absiResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('absi-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          console.error('Error calculating ABSI:', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, height, weight, waist]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    height.setValue('');
    weight.setValue('');
    setWaist('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  // Form fields for the CalculatorForm component - memoized for performance
  const formFields = useMemo(
    () => [
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio' as const,
        value: gender,
        onChange: (value: string) => setGender(value as Gender),
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number' as const,
        value: age,
        onChange: setAge,
        error: errors.age,
        placeholder: 'Years',
      },
      createHeightField(height, errors.height),
      createWeightField(weight, errors.weight),
      {
        name: 'waist',
        label: 'Waist Circumference (cm)',
        type: 'number' as const,
        value: waist,
        onChange: setWaist,
        error: errors.waist,
        placeholder: 'Centimeters',
        step: '0.1',
      },
    ],
    [age, gender, height, weight, waist, errors]
  );

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">A Body Shape Index (ABSI) Calculator</h1>
        <p className="text-gray-600 mb-6">
          Calculate your ABSI to assess health risks related to body shape and fat distribution
        </p>

        {/* Social sharing buttons */}
        <div className="mb-6">
          <SocialShare
            url="/absi"
            title="ABSI Calculator | Beyond BMI Health Assessment"
            description="Calculate your A Body Shape Index (ABSI) to assess health risks related to body shape and fat distribution. More accurate than BMI for mortality risk prediction."
            hashtags={['ABSI', 'healthmetrics', 'bodyshape', 'healthrisk']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <CalculatorForm
              title="Enter Your Details"
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

          <div className="md:col-span-2" id="absi-result">
            {showResult && result ? (
              <>
                <ABSIResultDisplay result={result} />

                {/* Save result functionality */}
                <div className="mt-6 flex justify-between items-center">
                  <SaveResult
                    calculatorType="absi"
                    calculatorName="ABSI Calculator"
                    data={{
                      absi: result.absi,
                      absiZScore: result.absiZScore,
                      waistCircumference: waist,
                      waistHeightRatio: result.waistHeightRatio,
                      riskCategory: result.riskCategory,
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
              <ABSIInfo />
            )}
          </div>
        </div>

        {/* FAQ Section with structured data */}
        <FAQSection faqs={faqs} title="Frequently Asked Questions About ABSI" className="mb-8" />

        <ABSIUnderstanding />

        {/* Related Articles Section */}
        <RelatedArticles
          currentSlug=""
          articles={blogArticles}
          title="Related Articles"
          className="my-8"
        />

        {/* Newsletter Signup */}
        <NewsletterSignup
          title="Get Health Metrics Insights"
          description="Subscribe to receive the latest health assessment tips, calculator updates, and exclusive content to help you understand your body composition better."
          className="my-8"
        />

        {/* Structured data for the calculator */}
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ABSI Calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Calculate your A Body Shape Index (ABSI) to assess health risks related to body shape and fat distribution. More accurate than BMI for mortality risk prediction.',
            url: 'https://www.heathcheck.info/absi',
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
