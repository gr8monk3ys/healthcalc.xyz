'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'MacroCalculator' });
import { ActivityLevel, Gender } from '@/types/common';
import { MacroGoal, MacroResult as MacroResultType } from '@/types/macro';
import { processMacroCalculation } from '@/utils/calculators/macro';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { MACRO_RATIO_PRESETS, validateMacroDistribution } from '@/constants/macro';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import MacroResult from '@/components/calculators/macro/MacroResult';
import MacroInfo from '@/components/calculators/macro/MacroInfo';
import SaveResult from '@/components/SaveResult';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// FAQ data for Macro calculator
const faqs = [
  {
    question: 'What are macros and why do they matter?',
    answer:
      'Macros (macronutrients) are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fat. Each provides calories and serves specific functions. Protein (4 cal/g) builds and repairs tissues; carbs (4 cal/g) provide energy; fat (9 cal/g) supports hormones and nutrient absorption. Tracking macros helps ensure you get balanced nutrition while meeting your calorie goals, which is especially useful for body composition goals like building muscle or losing fat while preserving lean mass.',
  },
  {
    question: 'How do I calculate my ideal macro ratio?',
    answer:
      'Your ideal macro ratio depends on your goals: For weight loss, higher protein (40%) helps preserve muscle during a deficit, with moderate carbs (40%) and lower fat (20%). For maintenance, a balanced 30/35/35 (protein/carbs/fat) works well. For muscle gain, increase carbs (40%) to fuel workouts, keep protein adequate (30%), and moderate fat (30%). These are starting points - adjust based on your body, preferences, and results. Some people thrive on higher fat/lower carb; others need more carbs for athletic performance.',
  },
  {
    question: 'How many grams of protein do I need per day?',
    answer:
      'Protein needs depend on your goals and activity level. General guidelines: Sedentary adults need 0.8g per kg body weight (56g for 70kg person). Active individuals should aim for 1.2-1.6g/kg. Those building muscle or in a calorie deficit may need 1.6-2.2g/kg to preserve or build lean mass. Example: A 70kg person building muscle should eat 112-154g protein daily. Spread protein intake across 3-4 meals (25-40g each) for optimal muscle protein synthesis. Good sources include lean meat, fish, eggs, dairy, legumes, and tofu.',
  },
  {
    question: 'Should I track macros or just calories?',
    answer:
      'For basic weight management, tracking calories alone can work - weight loss requires a calorie deficit regardless of macro composition. However, tracking macros offers advantages: 1) Ensures adequate protein for muscle preservation, 2) Helps with satiety and energy levels, 3) Optimizes body composition (muscle vs fat), 4) Provides flexibility in food choices (IIFYM approach). If tracking macros feels overwhelming, start with just protein and calories. As you become comfortable, add carbs and fat tracking. The best approach is one you can sustain consistently.',
  },
  {
    question: 'Can I eat whatever I want if it fits my macros?',
    answer:
      "The 'If It Fits Your Macros' (IIFYM) approach suggests that as long as you hit your macro targets, food sources don't matter. While this is partially true for body composition, food quality still matters for: 1) Micronutrients (vitamins, minerals) from whole foods, 2) Fiber for digestive health (aim for 25-35g daily), 3) Satiety - whole foods keep you fuller longer, 4) Long-term health outcomes. A practical approach: aim for 80% whole, minimally processed foods and 20% flexibility. This balances health, sustainability, and enjoyment of food.",
  },
  {
    question: 'How accurate are macro calculators?',
    answer:
      'Macro calculators provide estimates based on equations (like Mifflin-St Jeor for BMR) that have 10-20% error margins. Factors affecting accuracy include: individual metabolism variations, actual activity levels vs selected category, body composition (muscle burns more calories), and hormonal factors. Use calculator results as a starting point, then adjust based on real-world results over 2-4 weeks. If losing weight too fast (>1% body weight/week), add 200-300 calories. If not losing, reduce by 200-300. Consistency in tracking and patience are key for finding your true needs.',
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
    title: 'High Protein Diet: Benefits, Risks, and Meal Ideas',
    description:
      'Learn about the benefits of high protein diets for muscle building and weight loss, potential risks, and practical meal ideas.',
    slug: 'high-protein-diet',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Nutrition',
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

export default function MacroCalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const height = useHeight();
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [goal, setGoal] = useState<MacroGoal>('maintenance');

  // Custom macro percentages (only used when goal is 'custom')
  const [customProtein, setCustomProtein] = useState<number>(30);
  const [customCarbs, setCustomCarbs] = useState<number>(40);
  const [customFat, setCustomFat] = useState<number>(30);

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    macros?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<MacroResultType | null>(null);
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
        macros?: string;
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

      // Validate custom macros if using custom goal
      if (goal === 'custom') {
        const macroValidation = validateMacroDistribution(customProtein, customCarbs, customFat);
        if (!macroValidation.isValid) {
          newErrors.macros = macroValidation.error;
        }
      }

      setErrors(newErrors);

      // Get converted values
      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      // If no errors, calculate macros
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
        try {
          const calculationResult = processMacroCalculation({
            gender,
            age,
            heightUnit: height.unit,
            heightCm: heightCm,
            heightFt: height.unit === 'ft' ? Math.floor(height.value as number) : 0,
            heightIn: height.unit === 'ft' ? ((height.value as number) % 1) * 12 : 0,
            weightUnit: weight.unit,
            weightKg: weightKg,
            weightLb: weight.unit === 'lb' ? (weight.value as number) : 0,
            activityLevel,
            goal,
            customProteinPercent: goal === 'custom' ? customProtein : undefined,
            customCarbsPercent: goal === 'custom' ? customCarbs : undefined,
            customFatPercent: goal === 'custom' ? customFat : undefined,
          });

          setResult(calculationResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('macro-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating macros', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, height, weight, activityLevel, goal, customProtein, customCarbs, customFat]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    height.setValue('');
    weight.setValue('');
    setActivityLevel('sedentary');
    setGoal('maintenance');
    setCustomProtein(30);
    setCustomCarbs(40);
    setCustomFat(30);
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  // Form fields for the CalculatorForm component
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
      {
        name: 'goal',
        label: 'Dietary Goal',
        type: 'select' as const,
        value: goal,
        onChange: (value: string) => setGoal(value as MacroGoal),
        options: MACRO_RATIO_PRESETS.map(preset => ({
          value: preset.id,
          label: preset.name,
          description: preset.description,
        })),
      },
      ...(goal === 'custom'
        ? [
            {
              name: 'customProtein',
              label: 'Protein %',
              type: 'number' as const,
              value: customProtein,
              onChange: (val: number | '') => setCustomProtein(val === '' ? 30 : val),
              error: errors.macros,
              placeholder: 'Protein %',
              min: 10,
              max: 50,
            },
            {
              name: 'customCarbs',
              label: 'Carbs %',
              type: 'number' as const,
              value: customCarbs,
              onChange: (val: number | '') => setCustomCarbs(val === '' ? 40 : val),
              placeholder: 'Carbs %',
              min: 10,
              max: 70,
            },
            {
              name: 'customFat',
              label: 'Fat %',
              type: 'number' as const,
              value: customFat,
              onChange: (val: number | '') => setCustomFat(val === '' ? 30 : val),
              placeholder: 'Fat %',
              min: 15,
              max: 60,
            },
          ]
        : []),
    ],
    [
      age,
      gender,
      height,
      weight,
      activityLevel,
      goal,
      customProtein,
      customCarbs,
      customFat,
      errors,
    ]
  );

  return (
    <CalculatorPageLayout
      title="Macro Calculator"
      description="Calculate your daily macronutrient targets (protein, carbs, fat) based on your goals and activity level."
      calculatorSlug="macro"
      shareTitle="Macro Calculator | Calculate Your Daily Protein, Carbs & Fat"
      shareDescription="Calculate your optimal daily macronutrient intake for weight loss, maintenance, or muscle gain with our free macro calculator."
      shareHashtags={['macros', 'nutrition', 'fitness', 'mealprep']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About Macros"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Macro Calculator',
        description:
          'Calculate your daily macronutrient (protein, carbs, fat) targets based on your TDEE and dietary goals. Supports weight loss, maintenance, and muscle gain presets.',
        url: 'https://www.heathcheck.info/macro',
      }}
      newsletterTitle="Get Nutrition & Macro Tips"
      newsletterDescription="Subscribe to receive the latest macro tracking strategies, meal prep ideas, and evidence-based nutrition advice delivered to your inbox."
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

      <div className="md:col-span-2" id="macro-result">
        {showResult && result ? (
          <>
            <MacroResult result={result} />

            {/* Save result functionality */}
            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="macro"
                calculatorName="Macro Calculator"
                data={{
                  bmr: result.bmr,
                  tdee: result.tdee,
                  targetCalories: result.targetCalories,
                  protein: result.protein,
                  carbs: result.carbs,
                  fat: result.fat,
                  goal: result.goal,
                }}
              />

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                New Calculation
              </button>
            </div>

            {/* Recommended Products - shown after calculation */}
            <AffiliateLinks
              calculatorType="macro"
              title="Tools to Help You Track Your Macros"
              maxProducts={6}
              showDisclosure={true}
              className="my-8"
            />
          </>
        ) : (
          <MacroInfo />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
