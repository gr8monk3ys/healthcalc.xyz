'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'KetoCalculator' });
import { Gender, ActivityLevel } from '@/types/common';
import { KetoResult, KetoGoal, KetoType } from '@/types/ketoCalculator';
import { calculateKetoMacros } from '@/utils/calculators/ketoCalculator';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { KETO_TYPE_INFO, KETO_GOAL_INFO } from '@/constants/ketoCalculator';
import {
  validateAge,
  validateHeight,
  validateWeight,
  validateBodyFatPercentage,
  isEmpty,
} from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import KetoResultDisplay from '@/components/calculators/ketoCalculator/KetoResult';
import SaveResult from '@/components/SaveResult';
import Card from '@/components/ui/Card';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// FAQ data for the calculator
const faqs = [
  {
    question: 'What is a ketogenic diet and how does it work?',
    answer:
      'A ketogenic diet is a very low-carb, high-fat eating pattern that shifts your body into ketosis, a metabolic state where it burns fat for fuel instead of carbohydrates. By drastically reducing carb intake to typically 20-50g net carbs per day, your liver converts fat into ketones, which become your primary energy source. This metabolic switch can lead to fat loss, improved mental clarity, and stable energy levels.',
  },
  {
    question: 'What is the difference between standard, targeted, and cyclical keto?',
    answer:
      'Standard Keto (SKD) maintains consistent low-carb intake daily, ideal for most people starting keto. Targeted Keto (TKD) allows extra carbs around workouts to fuel high-intensity exercise while staying in ketosis most of the day. Cyclical Keto (CKD) alternates 5-6 days of strict keto with 1-2 high-carb refeed days, typically used by athletes and bodybuilders. Beginners should start with standard keto for at least 4-8 weeks before considering the other types.',
  },
  {
    question: 'How much protein should I eat on keto?',
    answer:
      'Protein intake on keto should be moderate, typically 0.8-1.2g per pound of lean body mass. Too little protein can lead to muscle loss, while excessive protein can potentially interfere with ketosis through gluconeogenesis (conversion of protein to glucose). Our calculator sets protein at approximately 25% of calories and ensures minimum requirements based on your lean body mass to preserve muscle.',
  },
  {
    question: 'What are net carbs and why do they matter?',
    answer:
      'Net carbs are total carbohydrates minus fiber and sugar alcohols. This matters because fiber and most sugar alcohols do not significantly impact blood sugar or insulin levels. On keto, you count net carbs rather than total carbs, allowing you to eat more vegetables and fiber while staying in ketosis. For example, if food has 10g total carbs and 5g fiber, it has 5g net carbs.',
  },
  {
    question: 'How do I avoid the keto flu?',
    answer:
      'The "keto flu" occurs during the first few days of transitioning to ketosis as your body adjusts. Prevent it by staying hydrated and supplementing electrolytes: sodium (3000-5000mg), potassium (1000-3500mg), and magnesium (300-500mg). Drink bone broth, salt your food liberally, eat potassium-rich low-carb foods like avocados and spinach, and consider a magnesium supplement. Symptoms typically resolve within 3-7 days.',
  },
  {
    question: 'How long does it take to get into ketosis?',
    answer:
      'Most people enter ketosis within 2-4 days of restricting carbs to under 20-25g net carbs per day. However, full keto-adaptation (where your body efficiently uses ketones) takes 2-4 weeks. During this adaptation period, you may experience temporary drops in energy and performance. Test your ketone levels using blood, breath, or urine strips to confirm you are in ketosis (blood ketones of 0.5-3.0 mmol/L indicate nutritional ketosis).',
  },
];

// Blog article data for related articles
const blogArticles = [
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      'Discover the truth behind common misconceptions about calorie deficits and weight loss.',
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    readTime: '8 min read',
    category: 'Weight Management',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description: 'Understand Total Daily Energy Expenditure and why it matters for keto.',
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Energy Expenditure',
  },
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Learn what body fat percentage ranges are healthy and how to measure accurately.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function KetoCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const height = useHeight();
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | ''>('');
  const [ketoType, setKetoType] = useState<KetoType>('standard');
  const [goal, setGoal] = useState<KetoGoal>('weight-loss');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    bodyFatPercentage?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<KetoResult | null>(null);
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

      // Validate height
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

      // Validate body fat percentage if provided
      if (!isEmpty(bodyFatPercentage)) {
        const bfValidation = validateBodyFatPercentage(bodyFatPercentage);
        if (!bfValidation.isValid) {
          newErrors.bodyFatPercentage = bfValidation.error;
        }
      }

      setErrors(newErrors);

      // Get converted values
      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      // If no errors, calculate keto macros
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
        try {
          // Calculate keto macros
          const ketoResult = calculateKetoMacros({
            weight: weightKg,
            weightUnit: 'kg',
            heightCm: heightCm,
            heightFt:
              height.unit === 'ft' && typeof height.value === 'number'
                ? Math.floor(height.value)
                : 5,
            heightIn:
              height.unit === 'ft' && typeof height.value === 'number'
                ? Math.round((height.value % 1) * 12)
                : 9,
            age,
            gender,
            activityLevel,
            bodyFatPercentage:
              typeof bodyFatPercentage === 'number' ? bodyFatPercentage : undefined,
            goal,
            ketoType,
            useMetric: height.unit === 'cm',
          });

          setResult(ketoResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('keto-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating keto macros', error);
          if (error instanceof Error) {
            setErrors({ ...newErrors, weight: error.message });
          }
        }
      }
    },
    [age, gender, height, weight, activityLevel, bodyFatPercentage, ketoType, goal]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    height.setValue('');
    weight.setValue('');
    setActivityLevel('moderately_active');
    setBodyFatPercentage('');
    setKetoType('standard');
    setGoal('weight-loss');
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
      createWeightField(weight, errors.weight),
      {
        name: 'bodyFatPercentage',
        label: 'Body Fat Percentage (Optional)',
        type: 'number' as const,
        value: bodyFatPercentage,
        onChange: setBodyFatPercentage,
        error: errors.bodyFatPercentage,
        placeholder: '% (will estimate if not provided)',
        step: '0.1',
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
      {
        name: 'ketoType',
        label: 'Keto Type',
        type: 'select' as const,
        value: ketoType,
        onChange: (value: string) => setKetoType(value as KetoType),
        options: Object.entries(KETO_TYPE_INFO).map(([key, info]) => ({
          value: key,
          label: info.label,
          description: info.description,
        })),
      },
      {
        name: 'goal',
        label: 'Goal',
        type: 'select' as const,
        value: goal,
        onChange: (value: string) => setGoal(value as KetoGoal),
        options: Object.entries(KETO_GOAL_INFO).map(([key, info]) => ({
          value: key,
          label: info.label,
          description: info.description,
        })),
      },
    ],
    [age, gender, height, weight, activityLevel, bodyFatPercentage, ketoType, goal, errors]
  );

  return (
    <CalculatorPageLayout
      title="Keto Macro Calculator"
      description="Calculate your personalized ketogenic diet macros for optimal fat loss and ketosis"
      calculatorSlug="keto-calculator"
      shareTitle="Keto Macro Calculator | Personalized Ketogenic Diet Plan"
      shareDescription="Calculate your personalized keto macros for fat, protein, and carbs. Choose from standard, targeted, or cyclical keto based on your goals and activity level."
      shareHashtags={['keto', 'ketodiet', 'ketogenic', 'lowcarb', 'ketomacros']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About Keto"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Keto Macro Calculator',
        description:
          'Calculate your personalized keto macros for fat, protein, and carbs. Choose from standard, targeted, or cyclical keto based on your goals and activity level.',
        url: 'https://www.healthcalc.xyz/keto-calculator',
      }}
      newsletterTitle="Get Keto Tips & Updates"
      newsletterDescription="Subscribe to receive the latest keto nutrition tips, macro tracking strategies, and exclusive ketogenic diet content."
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

      <div className="md:col-span-2" id="keto-result">
        {showResult && result ? (
          <>
            <KetoResultDisplay result={result} ketoType={ketoType} />

            {/* Save result functionality */}
            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="keto-calculator"
                calculatorName="Keto Macro Calculator"
                data={{
                  dailyCalories: result.dailyCalories,
                  fatGrams: result.fatGrams,
                  proteinGrams: result.proteinGrams,
                  netCarbGrams: result.netCarbGrams,
                  ketoType,
                  goal,
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
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">About Keto Macros</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                The ketogenic diet is a high-fat, moderate-protein, low-carb eating pattern that
                shifts your body into a metabolic state called ketosis. In ketosis, your body
                becomes incredibly efficient at burning fat for energy instead of carbohydrates.
              </p>
              <p>
                This calculator determines your personalized macronutrient targets based on your
                body composition, activity level, and goals. It ensures you get enough protein to
                preserve muscle mass while keeping carbs low enough to maintain ketosis.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Choose Your Keto Type
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Standard Keto:</strong> Best for beginners and steady fat loss
                  </li>
                  <li>
                    <strong>Targeted Keto:</strong> Add carbs around workouts for performance
                  </li>
                  <li>
                    <strong>Cyclical Keto:</strong> Alternate keto days with carb refeeds for
                    athletes
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your information above to get started with your personalized keto macro plan.
              </p>
            </div>
          </Card>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
