'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'MaximumFatLossCalculator' });
import { Gender, ActivityLevel } from '@/types/common';
import { MaximumFatLossResult } from '@/types/maximumFatLoss';
import { calculateMaximumFatLoss } from '@/app/api/maximumFatLoss';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import MaximumFatLossResultDisplay from '@/components/calculators/maximum-fat-loss/MaximumFatLossResult';
import MaximumFatLossInfo from '@/components/calculators/maximum-fat-loss/MaximumFatLossInfo';
import MaximumFatLossUnderstanding from '@/components/calculators/maximum-fat-loss/MaximumFatLossUnderstanding';
import SaveResult from '@/components/SaveResult';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// FAQ data for the calculator
const faqs = [
  {
    question: 'What makes this calculator different from other fat loss calculators?',
    answer:
      "The Maximum Fat Loss Calculator uses your body composition (body fat percentage) to calculate lean body mass and determine the maximum safe rate of fat loss while preserving muscle. Unlike simple calorie calculators, it factors in the 31 kcal per kg of fat mass per day rule, ensuring you don't lose muscle along with fat. This science-based approach optimizes fat loss without compromising metabolic health or lean tissue.",
  },
  {
    question: 'How do I accurately measure my body fat percentage?',
    answer:
      'The most accurate methods include DEXA scans, hydrostatic weighing, and 3D body scanners. More accessible options include bioelectrical impedance scales (moderate accuracy), skinfold calipers (requires skill), and the Navy method (uses circumference measurements). For this calculator, consistency is more important than perfect accuracy - use the same method each time to track changes. If unsure, start with a conservative estimate based on visual comparison guides.',
  },
  {
    question: 'Why does the calculator limit my calorie deficit even if I want faster results?',
    answer:
      'The calculator caps your deficit based on the maximum energy your fat stores can release per day (approximately 31 kcal per kg of fat mass). Exceeding this limit forces your body to break down muscle for energy, leading to metabolic slowdown, strength loss, and poor body composition. The calculator ensures your deficit is aggressive but sustainable, maximizing fat loss while preserving lean muscle mass and metabolic rate.',
  },
  {
    question: "Can I adjust my plan if I'm also doing strength training?",
    answer:
      "Yes! If you're strength training, you may benefit from a slightly smaller deficit than calculated to support recovery and muscle preservation. Consider staying at the higher end of your recommended calorie range, ensure adequate protein intake (1.6-2.2g per kg lean body mass), and prioritize training performance. The calculator provides a starting point, but listen to your body - if strength is declining rapidly, increase calories slightly.",
  },
  {
    question: 'What if my body fat percentage is very high or very low?',
    answer:
      'For very high body fat (>35%), you can safely maintain a larger deficit as your fat stores can supply more energy. For very low body fat (<15% men, <22% women), the calculator will recommend smaller deficits to protect essential fat and muscle. Never go below essential fat levels (3-5% men, 12-15% women) as this is dangerous for hormonal function, immune health, and organ protection. The calculator includes safety limits to prevent unhealthy extremes.',
  },
];

// Blog article data for related articles
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
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Measurement Methods',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Energy Expenditure',
  },
];

export default function MaximumFatLossCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const height = useHeight();
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | ''>('');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    bodyFatPercentage?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<MaximumFatLossResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form
      const newErrors: {
        age?: string;
        height?: string;
        weight?: string;
        bodyFatPercentage?: string;
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

      // Validate body fat percentage
      if (isEmpty(bodyFatPercentage)) {
        newErrors.bodyFatPercentage = 'Body fat percentage is required';
      } else if (typeof bodyFatPercentage === 'number') {
        if (bodyFatPercentage < 3 || bodyFatPercentage > 60) {
          newErrors.bodyFatPercentage = 'Body fat percentage must be between 3% and 60%';
        } else if (bodyFatPercentage < 5 && gender === 'male') {
          newErrors.bodyFatPercentage = 'Body fat below 5% is dangerous for males';
        } else if (bodyFatPercentage < 12 && gender === 'female') {
          newErrors.bodyFatPercentage = 'Body fat below 12% is dangerous for females';
        }
      }

      setErrors(newErrors);

      // Get converted values
      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      // If no errors, calculate maximum fat loss
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null &&
        typeof bodyFatPercentage === 'number'
      ) {
        try {
          // Calculate maximum fat loss plan
          const maxFatLossResult = calculateMaximumFatLoss({
            gender,
            age,
            heightCm,
            weightKg,
            activityLevel,
            bodyFatPercentage,
          });

          setResult(maxFatLossResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('maximum-fat-loss-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating maximum fat loss', error);
          if (error instanceof Error) {
            setErrors({ ...newErrors, bodyFatPercentage: error.message });
          }
        }
      }
    },
    [age, gender, height, weight, activityLevel, bodyFatPercentage]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    height.setValue('');
    weight.setValue('');
    setActivityLevel('sedentary');
    setBodyFatPercentage('');
    setErrors({});
    setResult(null);
    setShowResult(false);
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
      {
        ...createWeightField(weight, errors.weight),
        label: 'Current Weight',
      },
      {
        name: 'bodyFatPercentage',
        label: 'Body Fat %',
        type: 'number' as const,
        value: bodyFatPercentage,
        onChange: setBodyFatPercentage,
        error: errors.bodyFatPercentage,
        placeholder: 'Percentage',
        step: '0.1',
        min: 3,
        max: 60,
      },
      {
        name: 'activity',
        label: 'Activity Level',
        type: 'select' as const,
        value: activityLevel,
        onChange: (value: string) => setActivityLevel(value as ActivityLevel),
        options: ACTIVITY_MULTIPLIERS.map(level => ({
          value: level.level,
          label: level.label,
          description: level.description,
        })),
      },
    ],
    [age, gender, height, weight, activityLevel, bodyFatPercentage, errors]
  );

  return (
    <CalculatorPageLayout
      title="Maximum Fat Loss Calculator"
      description="Find the optimal calorie intake for maximum fat loss while preserving muscle mass"
      calculatorSlug="maximum-fat-loss"
      shareTitle="Maximum Fat Loss Calculator | Preserve Muscle While Losing Fat"
      shareDescription="Find the optimal calorie intake for maximum fat loss while preserving muscle mass. Science-based approach using body composition analysis."
      shareHashtags={['fatloss', 'musclepreservation', 'bodycomposition', 'fitness']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About Maximum Fat Loss"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Maximum Fat Loss Calculator',
        description:
          'Find the optimal calorie intake for maximum fat loss while preserving muscle mass. Science-based approach using body composition analysis.',
        url: 'https://www.healthcalc.xyz/maximum-fat-loss',
      }}
      understandingSection={<MaximumFatLossUnderstanding />}
      newsletterTitle="Get Fat Loss Tips & Updates"
      newsletterDescription="Subscribe to receive the latest fat loss strategies, body composition tips, calculator updates, and exclusive content to help you achieve your physique goals."
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Enter Your Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </div>

      <div className="md:col-span-2" id="maximum-fat-loss-result">
        {showResult && result ? (
          <>
            <MaximumFatLossResultDisplay result={result} weightUnit={weight.unit} gender={gender} />

            {/* Save result functionality */}
            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="maximum-fat-loss"
                calculatorName="Maximum Fat Loss Calculator"
                data={{
                  tdee: result.tdee,
                  minimumCalories: result.minimumCalories,
                  maximumDeficit: result.maximumDeficit,
                  leanMassKg: result.leanMassKg,
                  fatMassKg: result.fatMassKg,
                  bodyFatPercentage: bodyFatPercentage,
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
          <MaximumFatLossInfo />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
