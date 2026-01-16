'use client';

import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Gender } from '@/types/common';
import { WHRResult as WHRResultType } from '@/types/whr';
import { calculateWHRWithCategory } from '@/utils/calculators/whr';
import { validateWaist, validateHip, validateWaistHipRatio, isEmpty } from '@/utils/validation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import WHRResultDisplay from '@/components/calculators/whr/WHRResult';
import WHRInfo from '@/components/calculators/whr/WHRInfo';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import SocialShare from '@/components/SocialShare';
import SaveResult from '@/components/SaveResult';

// Dynamic imports for below-the-fold components
const WHRUnderstanding = dynamic(() => import('@/components/calculators/whr/WHRUnderstanding'));
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const RelatedArticles = dynamic(() => import('@/components/RelatedArticles'));
const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'));

// FAQ data for the calculator
const faqs = [
  {
    question: 'What is a healthy waist-to-hip ratio?',
    answer:
      'Healthy WHR varies by gender due to natural body composition differences. For men, WHR < 0.90 is excellent, 0.90-0.99 is good, 1.0+ indicates increased health risk. For women, WHR < 0.80 is excellent, 0.80-0.85 is good, 0.86+ indicates increased health risk. These thresholds are based on extensive research linking WHR to cardiovascular disease, type 2 diabetes, and mortality. WHR is a simple yet powerful predictor of metabolic health because it reflects visceral fat distribution.',
  },
  {
    question: 'How do I accurately measure my waist and hips for WHR?',
    answer:
      "For accurate WHR measurements: 1) Waist - Stand upright, locate the narrowest point between your ribs and hip bones (usually at navel level), wrap tape measure around horizontally, breathe normally and measure at the end of exhale. 2) Hips - Measure around the widest part of your buttocks and hips, keeping tape parallel to floor. 3) Use a flexible measuring tape, don't compress skin, take 2-3 measurements and average them. Measure in the morning before eating, wear minimal clothing, and use the same measuring spots each time for consistency.",
  },
  {
    question: 'Why is WHR more useful than BMI for health assessment?',
    answer:
      'WHR captures fat distribution, which BMI completely ignores. Two people with identical BMI can have vastly different health risks based on where fat is stored. Apple-shaped bodies (high WHR) store more visceral fat around organs, increasing cardiovascular disease, diabetes, and inflammation risk. Pear-shaped bodies (low WHR) store more subcutaneous fat in hips/thighs, which is metabolically safer. WHR is independent of overall body size, making it useful across all weight categories. Athletes with high muscle mass may have elevated BMI but excellent WHR.',
  },
  {
    question: 'Do men and women have different WHR standards?',
    answer:
      "Yes, biological sex significantly affects WHR norms due to hormonal differences in fat storage. Women naturally store more fat in hips and thighs (gynoid pattern) due to estrogen, resulting in lower WHR (typically 0.70-0.80). Men store more fat around the abdomen (android pattern) due to testosterone patterns, resulting in higher WHR (typically 0.85-0.95). Health risk thresholds reflect these differences: women's risk increases above 0.85, men's above 0.95. These differences exist across all ethnic groups, though specific thresholds may vary slightly by ethnicity.",
  },
  {
    question: 'How can I reduce my waist-to-hip ratio?',
    answer:
      'Reducing WHR requires reducing abdominal fat while maintaining or building hip/gluteal muscle: 1) Calorie deficit combined with whole foods diet rich in protein, fiber, and healthy fats. 2) Cardiovascular exercise to burn overall fat (150+ minutes/week). 3) Resistance training focusing on lower body (squats, lunges, deadlifts) to build glute and hip muscles. 4) Core strengthening exercises. 5) Reduce alcohol, which promotes abdominal fat storage. 6) Adequate sleep (7-9 hours) and stress management to reduce cortisol. You cannot spot-reduce fat, but building hip/glute muscle while losing overall fat will improve WHR.',
  },
];

// Blog article data for related articles
const blogArticles = [
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
    title: 'Understanding ABSI: Beyond BMI for Health Assessment',
    description:
      'Learn why A Body Shape Index (ABSI) is a more accurate predictor of health risks than BMI, how it works, and what your score means for longevity.',
    slug: 'understanding-absi',
    date: 'February 18, 2025',
    readTime: '11 min read',
    category: 'Health Metrics',
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

export default function WHRCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [waist, setWaist] = useState<number | ''>('');
  const [hips, setHips] = useState<number | ''>('');

  // State for form validation
  const [errors, setErrors] = useState<{
    waist?: string;
    hips?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<WHRResultType | null>(null);
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
        waist?: string;
        hips?: string;
      } = {};

      // Validate waist
      if (isEmpty(waist)) {
        newErrors.waist = 'Waist measurement is required';
      } else {
        const waistValidation = validateWaist(waist, 'metric');
        if (!waistValidation.isValid) {
          newErrors.waist = waistValidation.error;
        }
      }

      // Validate hips
      if (isEmpty(hips)) {
        newErrors.hips = 'Hip measurement is required';
      } else {
        const hipValidation = validateHip(hips, 'metric');
        if (!hipValidation.isValid) {
          newErrors.hips = hipValidation.error;
        }
      }

      // Validate waist-hip ratio (waist should be less than hip)
      if (typeof waist === 'number' && typeof hips === 'number') {
        const ratioValidation = validateWaistHipRatio(waist, hips);
        if (!ratioValidation.isValid) {
          // Note: This is a warning, not an error that blocks calculation
          // Silently skip - unusual but not impossible (e.g., athletes with large waist muscles)
          // Could show it to the user as a warning in the future
        }
      }

      setErrors(newErrors);

      // If no errors, calculate WHR
      if (
        Object.keys(newErrors).length === 0 &&
        typeof waist === 'number' &&
        typeof hips === 'number'
      ) {
        try {
          // Calculate WHR and get category
          const whrResult = calculateWHRWithCategory(waist, hips, gender);

          setResult(whrResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('whr-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          console.error('Error calculating WHR:', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [gender, waist, hips]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setGender('male');
    setWaist('');
    setHips('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, []);

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
        name: 'waist',
        label: 'Waist Circumference (cm)',
        type: 'number' as const,
        value: waist,
        onChange: setWaist,
        error: errors.waist,
        placeholder: 'Centimeters',
        step: '0.1',
      },
      {
        name: 'hips',
        label: 'Hip Circumference (cm)',
        type: 'number' as const,
        value: hips,
        onChange: setHips,
        error: errors.hips,
        placeholder: 'Centimeters',
        step: '0.1',
      },
    ],
    [gender, waist, hips, errors]
  );

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">Waist-to-Hip Ratio (WHR) Calculator</h1>
        <p className="text-gray-600 mb-6">
          Calculate your waist-to-hip ratio to assess your body fat distribution and health risks
        </p>

        {/* Social sharing buttons */}
        <div className="mb-6">
          <SocialShare
            url="/whr"
            title="Waist-to-Hip Ratio Calculator | Body Fat Distribution Assessment"
            description="Calculate your waist-to-hip ratio (WHR) to assess body fat distribution and health risks. More accurate than BMI for predicting cardiovascular disease risk."
            hashtags={['WHR', 'healthmetrics', 'bodycomposition', 'healthrisk']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <CalculatorForm
              title="Enter Your Measurements"
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

          <div className="md:col-span-2" id="whr-result">
            {showResult && result ? (
              <>
                <WHRResultDisplay result={result} gender={gender} />

                {/* Save result functionality */}
                <div className="mt-6 flex justify-between items-center">
                  <SaveResult
                    calculatorType="whr"
                    calculatorName="WHR Calculator"
                    data={{
                      whr: result.whr,
                      waistCircumference: waist,
                      hipCircumference: hips,
                      category: result.category,
                      healthRisk: result.healthRisk,
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
              <WHRInfo />
            )}
          </div>
        </div>

        {/* FAQ Section with structured data */}
        <FAQSection faqs={faqs} title="Frequently Asked Questions About WHR" className="mb-8" />

        <WHRUnderstanding />

        {/* Related Articles Section */}
        <RelatedArticles
          currentSlug=""
          articles={blogArticles}
          title="Related Articles"
          className="my-8"
        />

        {/* Newsletter Signup */}
        <NewsletterSignup
          title="Get Body Composition Insights"
          description="Subscribe to receive the latest body composition tips, health metrics updates, and exclusive content to help you understand your health better."
          className="my-8"
        />

        {/* Structured data for the calculator */}
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Waist-to-Hip Ratio Calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Calculate your waist-to-hip ratio (WHR) to assess body fat distribution and health risks. More accurate than BMI for predicting cardiovascular disease risk.',
            url: 'https://www.heathcheck.info/whr',
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
