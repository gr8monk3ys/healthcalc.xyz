'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'BMICalculator' });
import dynamic from 'next/dynamic';
import {
  calculateBMI,
  getBMICategory,
  calculateHealthyWeightRange,
  estimateBMIPercentile,
  getBMIPercentileCategory,
} from '@/utils/calculators/bmi';
import { BMIResult } from '@/types/bmi';
import { Gender } from '@/types/common';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import { convertWeight } from '@/utils/conversions';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BMIResultDisplay from '@/components/calculators/bmi/BMIResult';
import BMIInfo from '@/components/calculators/bmi/BMIInfo';
import SaveResult from '@/components/SaveResult';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// Dynamic imports for below-the-fold components
const BMIUnderstanding = dynamic(() => import('@/components/calculators/bmi/BMIUnderstanding'));

// FAQ data for BMI calculator
const faqs = [
  {
    question: 'What is a healthy BMI range?',
    answer:
      "For adults, a healthy BMI typically ranges from 18.5 to 24.9 according to WHO standards. BMI under 18.5 is considered underweight, 25.0-29.9 is overweight, and 30.0 or higher is obese. However, BMI has limitations - it doesn't distinguish between muscle and fat mass, doesn't account for bone density, and may not accurately represent health risks for athletes, elderly individuals, or certain ethnic groups. For children and teens (ages 2-20), BMI is interpreted differently using CDC growth charts and percentiles that account for age and sex.",
  },
  {
    question: 'Is BMI accurate for everyone?',
    answer:
      'BMI is a useful screening tool but has significant limitations. It doesn\'t distinguish muscle from fat, so athletes and bodybuilders often have "high" BMI despite low body fat. It may underestimate health risks in older adults who have lost muscle mass. BMI also doesn\'t account for fat distribution - visceral (abdominal) fat poses greater health risks than subcutaneous fat. Ethnicity matters: Asian populations face higher health risks at lower BMI thresholds (≥23 for overweight, ≥27.5 for obesity). For more accurate body composition assessment, consider waist-to-hip ratio, body fat percentage, or waist circumference alongside BMI.',
  },
  {
    question: 'How do I calculate BMI manually?',
    answer:
      'BMI = weight (kg) / height² (m²). For metric: divide your weight in kilograms by your height in meters squared. Example: 70 kg ÷ (1.75 m)² = 70 ÷ 3.06 = 22.9 BMI. For imperial: (weight in pounds / height in inches²) × 703. Example: (150 lbs / 65 inches²) × 703 = (150 / 4,225) × 703 = 24.9 BMI. The formula was developed by Belgian mathematician Adolphe Quetelet in 1832 and adopted by WHO in the 1980s as a simple population-level health indicator.',
  },
  {
    question: 'What should I do if my BMI is high?',
    answer:
      "First, consult a healthcare professional to assess your overall health, including waist circumference, blood pressure, cholesterol, and blood sugar. BMI alone doesn't diagnose health. If weight loss is recommended: 1) Create a modest calorie deficit (500 kcal/day for 1 lb/week loss), 2) Focus on whole foods, vegetables, lean protein, and fiber, 3) Engage in 150+ minutes of moderate cardio weekly, 4) Add resistance training to preserve muscle mass, 5) Get adequate sleep (7-9 hours) and manage stress. Avoid crash diets or extreme restrictions. Sustainable changes over time are most effective. Even 5-10% weight loss can significantly improve health markers.",
  },
  {
    question: 'Does BMI change with age?',
    answer:
      'Yes, healthy BMI ranges shift with age. Children use age and sex-specific BMI-for-age percentiles (CDC growth charts) rather than adult BMI categories. Muscle mass naturally decreases with age (sarcopenia), while fat mass tends to increase, so older adults may have a "healthy" BMI but unhealthy body composition. Some research suggests slightly higher BMI (25-27) may be protective in older adults (>65 years) - called the "obesity paradox." However, this remains controversial. What\'s most important is maintaining stable weight, preserving muscle mass through resistance training, and monitoring waist circumference as you age.',
  },
  {
    question: 'Can I have a normal BMI but still be unhealthy?',
    answer:
      'Absolutely. This is called "metabolically obese normal weight" (MONW) or "skinny fat." You can have normal BMI (18.5-24.9) but high visceral fat, insulin resistance, high triglycerides, or low muscle mass. Risk factors include sedentary lifestyle, poor diet high in processed foods/sugar, genetics, and chronic stress. MONW individuals have similar cardiovascular disease risks as those with obesity. Key indicators: waist circumference (>40 inches men, >35 inches women), waist-to-hip ratio, body fat percentage, and metabolic markers (blood pressure, cholesterol, fasting glucose). Solution: strength training to build muscle, cardio for heart health, and a nutrient-dense diet rich in protein, fiber, and healthy fats.',
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
  {
    title: 'Waist-to-Hip Ratio Guide: What Your Measurements Reveal',
    description:
      'Discover how waist-to-hip ratio (WHR) indicates health risks, proper measurement techniques, and what healthy ratios look like for men and women.',
    slug: 'waist-to-hip-ratio-guide',
    date: 'February 12, 2025',
    readTime: '10 min read',
    category: 'Body Composition',
  },
];

export default function BMICalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const height = useHeight();
  const weight = useWeight();
  const [isChild, setIsChild] = useState<boolean>(false);

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // State for user-facing calculation errors
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      // Validate form using validation utilities
      const newErrors: {
        age?: string;
        height?: string;
        weight?: string;
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

      setErrors(newErrors);

      // Get converted values
      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      // If no errors, calculate BMI
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
        try {
          // Set isChild based on age
          const childStatus = age < 20;
          setIsChild(childStatus);

          // Calculate BMI
          const bmi = calculateBMI(heightCm, weightKg);

          // Get healthy weight range
          const healthyWeightRange = calculateHealthyWeightRange(heightCm);

          // Convert healthy weight range to the current unit
          const displayHealthyWeightRange = {
            min:
              weight.unit === 'kg'
                ? healthyWeightRange.min
                : convertWeight(healthyWeightRange.min, 'kg', 'lb'),
            max:
              weight.unit === 'kg'
                ? healthyWeightRange.max
                : convertWeight(healthyWeightRange.max, 'kg', 'lb'),
          };

          // Create result object
          let bmiResult: BMIResult;

          if (childStatus) {
            // For children
            const percentile = estimateBMIPercentile(bmi, age, gender);
            const { name: category, color } = getBMIPercentileCategory(percentile);

            bmiResult = {
              bmi: Math.round(bmi * 10) / 10,
              category,
              color,
              healthyWeightRange: displayHealthyWeightRange,
              percentile,
            };
          } else {
            // For adults
            const { name: category, color } = getBMICategory(bmi);

            bmiResult = {
              bmi: Math.round(bmi * 10) / 10,
              category,
              color,
              healthyWeightRange: displayHealthyWeightRange,
            };
          }

          setResult(bmiResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('bmi-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating BMI', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, height, weight]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    height.setValue('');
    weight.setValue('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  // Form fields for the CalculatorForm component - memoized for performance
  const formFields = useMemo(
    () => [
      {
        name: 'age',
        label: 'Age',
        type: 'number' as const,
        value: age,
        onChange: setAge,
        error: errors.age,
        placeholder: 'Years',
      },
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
      createHeightField(height, errors.height),
      createWeightField(weight, errors.weight),
    ],
    [age, gender, height, weight, errors]
  );

  return (
    <CalculatorPageLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height."
      calculatorSlug="bmi"
      shareTitle="BMI Calculator | Body Mass Index & Healthy Weight Range"
      shareDescription="Calculate your BMI and discover your healthy weight range. Free, accurate BMI calculator for adults and children with WHO-approved categories."
      shareHashtags={['BMI', 'healthyweight', 'bodymassindex', 'wellness']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About BMI"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'BMI Calculator',
        description:
          'Calculate your Body Mass Index (BMI) and discover your healthy weight range. Supports both adults and children with WHO and CDC-approved categories.',
        url: 'https://www.heathcheck.info/bmi',
      }}
      understandingSection={<BMIUnderstanding />}
      newsletterDescription="Subscribe to receive the latest body composition insights, health calculators, and evidence-based wellness advice delivered to your inbox."
    >
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

      <div className="md:col-span-2" id="bmi-result">
        {showResult && result ? (
          <>
            <BMIResultDisplay result={result} isChild={isChild} weightUnit={weight.unit} />

            {/* Save result functionality */}
            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="bmi"
                calculatorName="BMI Calculator"
                data={{
                  bmi: result.bmi,
                  category: result.category,
                  healthyWeightRange: result.healthyWeightRange,
                  isChild,
                  ...(isChild && {
                    percentile: result.percentile,
                  }),
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
          <BMIInfo />
        )}

        {/* Recommended Products - shown after calculation */}
        {showResult && result && (
          <AffiliateLinks
            calculatorType="bmi"
            title="Recommended Products for Your Health Journey"
            maxProducts={6}
            showDisclosure={true}
            className="my-8"
          />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
