'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'TDEECalculator' });
import dynamic from 'next/dynamic';
import { ActivityLevel, Gender } from '@/types/common';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from '@/utils/calculators/tdee';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import TDEEResult from '@/components/calculators/tdee/TDEEResult';
import TDEEInfo from '@/components/calculators/tdee/TDEEInfo';
import SaveResult from '@/components/SaveResult';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// Dynamic imports for below-the-fold components
const TDEEUnderstanding = dynamic(() => import('@/components/calculators/tdee/TDEEUnderstanding'));

// FAQ data for TDEE calculator
const faqs = [
  {
    question: 'What is TDEE and how is it calculated?',
    answer:
      "TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including resting metabolism (BMR) and activity. It's calculated by: 1) Computing BMR (Basal Metabolic Rate) - calories burned at rest using formulas like Mifflin-St Jeor, 2) Multiplying BMR by your activity level multiplier (1.2 for sedentary to 1.9 for very active). Your TDEE represents energy burned through three mechanisms: Basal Metabolic Rate (60-75% of TDEE), Thermic Effect of Food/digestion (8-15%), and physical activity/movement (10-30%). For example, a 70kg male, 30 years old, 175cm tall with moderate activity has BMR ~1700 calories and TDEE ~2600 calories. This is your maintenance calorie level - eating at this amount maintains current weight.",
  },
  {
    question: 'Which TDEE formula is most accurate?',
    answer:
      "The Mifflin-St Jeor equation (created in 1990) is considered most accurate for modern populations and is recommended by the American Dietetic Association. It's more precise than older formulas like Harris-Benedict (1919) which tend to overestimate by 5%. The Katch-McArdle formula, based on lean body mass rather than total weight, is more accurate for very lean or very obese individuals if body fat percentage is known. However, all formulas have ±10-20% error margins because TDEE varies by: metabolism (influenced by genetics, hormones, medications), body composition (muscle burns more calories than fat), lifestyle (commute, occupation affect daily activity), and adherence to stated activity level. Individual metabolic adaptation also matters - some people have naturally faster/slower metabolisms. For best results, use the calculator as a starting point, track weight changes for 2-3 weeks, and adjust calories based on actual results rather than relying solely on predicted values.",
  },
  {
    question: 'How do I use TDEE for weight loss or gain?',
    answer:
      'Weight change comes from calorie balance: burn more than you eat = weight loss, eat more than you burn = weight gain. For weight loss, create a calorie deficit: eating 500 calories below TDEE results in ~1 lb/week loss (3,500 calories = 1 lb fat). Most experts recommend 10-20% deficit from TDEE for sustainable loss while preserving muscle. Example: TDEE 2500 → eat 2000-2250 calories. Larger deficits (>20%) risk muscle loss, fatigue, and metabolic adaptation. For weight gain, eat 300-500 calories above TDEE (lean bulk) for muscle gain. For weight maintenance, eat at or very close to TDEE. Important: TDEE changes as you lose/gain weight - recalculate every 10-15 lbs of change. Combine calorie adjustment with strength training (preserves muscle during loss, drives muscle gain), adequate protein (1.6-2.2g per kg bodyweight), sleep (7-9 hours), and stress management for optimal body composition results.',
  },
  {
    question: 'Should I eat my exact TDEE to maintain weight?',
    answer:
      "Eating exactly at TDEE is the theoretical maintenance point, but in practice, it's unrealistic and unnecessary. Several factors make exact adherence impractical: 1) Calorie counting accuracy - food labels have ±20% margin, restaurant food is highly variable, 2) TDEE variation - fluctuates day-to-day based on sleep, stress, menstrual cycle, temperature, 3) Thermic effect variance - protein processing burns 20-30% of calories consumed, while carbs/fats burn 5-10%, 4) Activity inconsistency - activity levels vary weekly. A practical approach: eat within ±200 calories of estimated TDEE, monitor weight trends over 2-4 weeks, and adjust by 200-300 calories if trending up/down. Most people maintain weight successfully within 200-300 calorie range of TDEE. Use portion control, eat protein at every meal, include vegetables for satiety, limit ultra-processed foods, and focus on consistency over precision. Track trends, not individual days.",
  },
  {
    question: 'How often should I recalculate my TDEE?',
    answer:
      "Recalculate TDEE every 10-15 pounds of weight loss or gain, or every 3-6 months if weight is stable. This matters because: 1) As body weight decreases, BMR decreases proportionally (less mass to maintain), 2) As you lose weight, your TDEE could drop 50-100+ calories every 10 lbs lost, 3) Metabolic adaptation - body naturally reduces expenditure during calorie restriction, 4) Muscle vs fat changes affect calorie burn (muscle tissue more metabolically active). Example: woman with TDEE 2200 at 180 lbs might have TDEE ~2050 at 160 lbs. Failing to adjust often leads to weight loss plateaus around months 2-4 of dieting. If you're not progressing on your original calorie targets, recalculate rather than assuming you need extreme deficits. Similarly, if gaining muscle, your TDEE increases as lean mass increases. Professional athletes/competitors recalculate weekly. For most people, quarterly recalculation paired with monthly progress tracking provides optimal adjustment timing.",
  },
  {
    question: 'Why is my TDEE different from other online calculators?',
    answer:
      'TDEE differences between calculators stem from: 1) Formula choice - Mifflin-St Jeor, Harris-Benedict, Katch-McArdle produce different results, 2) Activity level interpretation - one calculator\'s "moderate" might be another\'s "lightly active", 3) Individual variation - formulas are population averages with ±10-20% error, 4) Rounding differences in intermediate calculations, 5) Account for thermic effect - some do, some don\'t. Two identical inputs can produce TDEE ranges of 300-500 calories difference across calculators. This is normal and expected. The "best" calculator is the one that most closely predicts your actual maintenance - use any estimate as a starting point, then adjust by 100-200 calories based on real-world results over 2-3 weeks. If you maintain weight eating 2300 calories but two calculators say 2100 and 2400, your true TDEE is 2300. Track your actual intake and weight changes, not calculator predictions. Consider metabolic testing (indirect calorimetry) for expensive but accurate measurements, though not practical for most people. Bottom line: calculators are estimates - individual testing refines accuracy.',
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

export default function TDEECalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const height = useHeight();
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    activityMultiplier: number;
    dailyCalories: {
      maintain: number;
      mildLoss: number;
      moderateLoss: number;
      extremeLoss: number;
      mildGain: number;
      moderateGain: number;
      extremeGain: number;
    };
  } | null>(null);
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

      // If no errors, calculate TDEE
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
        try {
          // Get activity multiplier
          const activityMultiplier = getActivityMultiplier(activityLevel);

          // Calculate BMR
          const bmr = calculateBMR(gender, age, weightKg, heightCm);

          // Calculate TDEE
          const tdee = calculateTDEE(bmr, activityMultiplier);

          // Calculate daily calories for different goals
          const dailyCalories = {
            maintain: Math.round(tdee),
            mildLoss: Math.round(tdee * 0.9), // 10% deficit
            moderateLoss: Math.round(tdee * 0.8), // 20% deficit
            extremeLoss: Math.round(tdee * 0.75), // 25% deficit
            mildGain: Math.round(tdee * 1.1), // 10% surplus
            moderateGain: Math.round(tdee * 1.15), // 15% surplus
            extremeGain: Math.round(tdee * 1.2), // 20% surplus
          };

          setResult({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            activityMultiplier,
            dailyCalories,
          });

          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('tdee-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating TDEE', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, height, weight, activityLevel]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    height.setValue('');
    weight.setValue('');
    setActivityLevel('sedentary');
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
    [age, gender, height, weight, activityLevel, errors]
  );

  return (
    <CalculatorPageLayout
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily calorie needs for weight management."
      calculatorSlug="tdee"
      shareTitle="TDEE Calculator | Total Daily Energy Expenditure & Calorie Needs"
      shareDescription="Calculate your TDEE to determine daily calorie needs. Find your maintenance calories, weight loss/gain targets, and optimize your nutrition with our free calculator."
      shareHashtags={['TDEE', 'caloriedeficit', 'weightloss', 'nutrition']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About TDEE"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'TDEE Calculator',
        description:
          'Calculate your Total Daily Energy Expenditure (TDEE) and discover your daily calorie needs. Supports multiple formulas (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle) for accurate metabolism calculations.',
        url: 'https://www.heathcheck.info/tdee',
      }}
      understandingSection={<TDEEUnderstanding />}
      newsletterDescription="Subscribe to receive the latest metabolism insights, calorie management strategies, and evidence-based nutrition advice delivered to your inbox."
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

      <div className="md:col-span-2" id="tdee-result">
        {showResult && result ? (
          <>
            <TDEEResult result={result} />

            {/* Save result functionality */}
            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="tdee"
                calculatorName="TDEE Calculator"
                data={{
                  bmr: result.bmr,
                  tdee: result.tdee,
                  activityMultiplier: result.activityMultiplier,
                  dailyCalories: result.dailyCalories,
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
          <TDEEInfo />
        )}

        {/* Recommended Products - shown after calculation */}
        {showResult && result && (
          <AffiliateLinks
            calculatorType="tdee"
            title="Tools to Help You Manage Your Calories"
            maxProducts={6}
            showDisclosure={true}
            className="my-8"
          />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
