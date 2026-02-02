'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'ProteinCalculator' });
import dynamic from 'next/dynamic';
import { ActivityLevel, Gender } from '@/types/common';
import { ProteinGoal, ProteinResult as ProteinResultType } from '@/types/protein';
import { processProteinCalculation } from '@/utils/calculators/protein';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { validateAge, validateWeight, isEmpty } from '@/utils/validation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import ProteinResult from '@/components/calculators/protein/ProteinResult';
import ProteinInfo from '@/components/calculators/protein/ProteinInfo';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import SocialShare from '@/components/SocialShare';
import SaveResult from '@/components/SaveResult';
import AffiliateLinks from '@/components/AffiliateLinks';
import { useWeight } from '@/hooks/useCalculatorUnits';

// Dynamic imports for below-the-fold components
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const RelatedArticles = dynamic(() => import('@/components/RelatedArticles'));
const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'));

// Goal options for the calculator
const GOAL_OPTIONS = [
  { value: 'general_health', label: 'General Health', description: 'Basic health maintenance' },
  { value: 'maintain', label: 'Maintain Weight', description: 'Maintain current body composition' },
  { value: 'weight_loss', label: 'Weight Loss', description: 'Lose fat while preserving muscle' },
  { value: 'muscle_gain', label: 'Build Muscle', description: 'Maximize muscle growth' },
  {
    value: 'athletic_performance',
    label: 'Athletic Performance',
    description: 'Optimize for sports and training',
  },
];

// FAQ data for Protein calculator
const faqs = [
  {
    question: 'How much protein do I really need per day?',
    answer:
      'Daily protein needs vary based on activity level, age, and goals. The RDA minimum is 0.8g per kg of body weight for sedentary adults. However, active individuals typically need 1.2-1.6g/kg, athletes need 1.6-2.2g/kg, and those losing weight while preserving muscle may benefit from 1.6-2.5g/kg. Older adults (65+) often need 1.0-1.2g/kg to prevent muscle loss. Use this calculator to get a personalized recommendation based on your specific situation.',
  },
  {
    question: 'Is it safe to eat high amounts of protein?',
    answer:
      'For healthy individuals with normal kidney function, high protein intake (up to 2.5g/kg) is generally safe and well-tolerated. Research shows no adverse effects on kidney health in healthy people eating high-protein diets. However, those with pre-existing kidney disease should consult a healthcare provider before significantly increasing protein intake. The key is to stay hydrated and get protein from varied sources including lean meats, fish, dairy, legumes, and plant proteins.',
  },
  {
    question: 'When is the best time to eat protein?',
    answer:
      'Research suggests distributing protein evenly across 3-5 meals (20-40g per meal) optimizes muscle protein synthesis throughout the day. The "anabolic window" after workouts is real but less critical than total daily intake. Eating protein within 2-3 hours post-workout is beneficial, but missing this window does not significantly impact results if daily protein targets are met. For overnight fasting, a protein-rich dinner or casein before bed can support overnight muscle recovery.',
  },
  {
    question: 'What are the best sources of protein?',
    answer:
      'Complete proteins containing all essential amino acids include: chicken breast (31g/100g), turkey (29g/100g), lean beef (26g/100g), fish like salmon and tuna (25-26g/100g), eggs (13g/100g), Greek yogurt (10g/100g), and cottage cheese (11g/100g). Plant sources include tofu (8g/100g), tempeh (19g/100g), lentils (9g/100g), quinoa (4g/100g), and legumes. Whey protein powder (80g/100g) is a convenient supplement. Combining plant proteins (rice + beans) provides complete amino acid profiles.',
  },
  {
    question: 'Why do I need more protein when losing weight?',
    answer:
      'During a calorie deficit, your body may break down muscle for energy. Higher protein intake (1.6-2.5g/kg) during weight loss helps preserve lean muscle mass, maintaining metabolic rate and strength. Protein also increases satiety (fullness), making it easier to stick to a calorie deficit. Research shows dieters who eat more protein lose more fat and retain more muscle compared to those eating less protein. This is why the calculator recommends higher protein for weight loss goals.',
  },
  {
    question: 'How does age affect protein needs?',
    answer:
      "Older adults (65+) have higher protein requirements due to 'anabolic resistance' - reduced ability to synthesize muscle protein from dietary protein. The PROT-AGE study group recommends 1.0-1.2g/kg for healthy older adults, and even higher (1.2-1.5g/kg) for those with acute or chronic diseases. This helps prevent sarcopenia (age-related muscle loss) which increases fall risk and reduces quality of life. The calculator automatically adjusts recommendations for age.",
  },
];

// Related articles data
const blogArticles = [
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
    title: 'Calorie Deficit Myths: What You Need to Know',
    description:
      'Learn the truth about calorie deficits, common misconceptions about weight loss, and how to create sustainable deficits for long-term success.',
    slug: 'calorie-deficit-myths',
    date: 'February 18, 2025',
    readTime: '11 min read',
    category: 'Weight Loss',
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

export default function ProteinCalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [goal, setGoal] = useState<ProteinGoal>('maintain');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    weight?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<ProteinResultType | null>(null);
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
      const weightKg = weight.toKg();

      // If no errors, calculate protein
      if (Object.keys(newErrors).length === 0 && typeof age === 'number' && weightKg !== null) {
        try {
          const proteinResult = processProteinCalculation({
            gender,
            age,
            heightUnit: 'cm',
            heightCm: 170, // Height not needed for protein calculation but required by interface
            heightFt: 0,
            heightIn: 0,
            weightUnit: weight.unit,
            weightKg: weight.unit === 'kg' ? (weight.value as number) : 0,
            weightLb: weight.unit === 'lb' ? (weight.value as number) : 0,
            activityLevel,
            goal,
          });

          setResult(proteinResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('protein-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating protein', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, weight, activityLevel, goal]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    weight.setValue('');
    setActivityLevel('moderately_active');
    setGoal('maintain');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [weight]);

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
      {
        name: 'weight',
        label: 'Weight',
        type: 'number' as const,
        value: weight.value,
        onChange: weight.setValue,
        error: errors.weight,
        placeholder: weight.placeholder,
        unit: weight.unit,
        unitToggle: weight.toggle,
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
        name: 'goal',
        label: 'Fitness Goal',
        type: 'select' as const,
        value: goal,
        onChange: (value: string) => setGoal(value as ProteinGoal),
        options: GOAL_OPTIONS,
      },
    ],
    [age, gender, weight, activityLevel, goal, errors]
  );

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">Protein Intake Calculator</h1>
        <p className="text-gray-600 mb-6">
          Calculate your optimal daily protein intake based on your weight, activity level, and
          fitness goals. Get personalized recommendations backed by scientific research.
        </p>

        {/* Social sharing buttons */}
        <div className="mb-6">
          <SocialShare
            url="/protein"
            title="Protein Intake Calculator | Daily Protein Needs"
            description="Calculate your optimal daily protein intake based on your weight, activity level, and fitness goals. Free calculator with personalized recommendations."
            hashtags={['protein', 'nutrition', 'fitness', 'macros']}
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

          <div className="md:col-span-2" id="protein-result">
            {showResult && result ? (
              <>
                <ProteinResult result={result} weightUnit={weight.unit} />

                {/* Save result functionality */}
                <div className="mt-6 flex justify-between items-center">
                  <SaveResult
                    calculatorType="protein"
                    calculatorName="Protein Calculator"
                    data={{
                      dailyProteinGrams: result.dailyProteinGrams,
                      proteinPerKg: result.proteinPerKg,
                      minProteinGrams: result.minProteinGrams,
                      maxProteinGrams: result.maxProteinGrams,
                      proteinCalories: result.proteinCalories,
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
              <ProteinInfo />
            )}
          </div>
        </div>

        {/* FAQ Section with structured data */}
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions About Protein Intake"
          className="mb-8"
        />

        {/* Recommended Products - shown after calculation */}
        {showResult && result && (
          <AffiliateLinks
            calculatorType="protein"
            title="Products to Help You Meet Your Protein Goals"
            maxProducts={6}
            showDisclosure={true}
            className="my-8"
          />
        )}

        {/* Related Articles Section */}
        <RelatedArticles
          currentSlug=""
          articles={blogArticles}
          title="Related Articles"
          className="my-8"
        />

        {/* Newsletter Signup */}
        <NewsletterSignup
          title="Get Nutrition & Fitness Tips"
          description="Subscribe to receive the latest protein research, nutrition strategies, and evidence-based fitness advice delivered to your inbox."
          className="my-8"
        />

        {/* Structured data for the calculator */}
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Protein Intake Calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Calculate your optimal daily protein intake based on weight, activity level, age, and fitness goals. Get science-backed recommendations for muscle building, weight loss, or general health.',
            url: 'https://www.heathcheck.info/protein',
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
