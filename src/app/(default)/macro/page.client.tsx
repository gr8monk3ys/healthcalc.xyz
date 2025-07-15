'use client';

import React, { useEffect, useMemo, useReducer, useRef } from 'react';
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
import { useCalculatorForm } from '@/hooks/useCalculatorForm';
import { useChainPrefill } from '@/hooks/useChainPrefill';
import {
  requestCalculatorFormSubmit,
  useSharedResultPrefill,
} from '@/hooks/useSharedResultPrefill';
import type { SharedResultInputMap } from '@/utils/resultSharing';

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

type MacroCalculatorState = {
  age: number | '';
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: MacroGoal;
  customProtein: number;
  customCarbs: number;
  customFat: number;
};

type MacroCalculatorAction =
  | { type: 'patch'; patch: Partial<MacroCalculatorState> }
  | { type: 'reset' };

const initialMacroCalculatorState: MacroCalculatorState = {
  age: '',
  gender: 'male',
  activityLevel: 'sedentary',
  goal: 'maintenance',
  customProtein: 30,
  customCarbs: 40,
  customFat: 30,
};

function macroCalculatorReducer(
  state: MacroCalculatorState,
  action: MacroCalculatorAction
): MacroCalculatorState {
  switch (action.type) {
    case 'patch':
      return { ...state, ...action.patch };
    case 'reset':
      return initialMacroCalculatorState;
    default:
      return state;
  }
}

type MacroFormFieldsArgs = {
  activityLevel: ActivityLevel;
  age: number | '';
  customCarbs: number;
  customFat: number;
  customProtein: number;
  errors: Record<string, string>;
  gender: Gender;
  goal: MacroGoal;
  height: ReturnType<typeof useHeight>;
  setActivityLevel: (value: ActivityLevel) => void;
  setAge: (value: number | '') => void;
  setCustomCarbs: (value: number) => void;
  setCustomFat: (value: number) => void;
  setCustomProtein: (value: number) => void;
  setGender: (value: Gender) => void;
  setGoal: (value: MacroGoal) => void;
  weight: ReturnType<typeof useWeight>;
};

function createMacroFormFields({
  activityLevel,
  age,
  customCarbs,
  customFat,
  customProtein,
  errors,
  gender,
  goal,
  height,
  setActivityLevel,
  setAge,
  setCustomCarbs,
  setCustomFat,
  setCustomProtein,
  setGender,
  setGoal,
  weight,
}: MacroFormFieldsArgs): React.ComponentProps<typeof CalculatorForm>['fields'] {
  return [
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
  ];
}

function createMacroShareResultContext({
  activityLevel,
  age,
  customCarbs,
  customFat,
  customProtein,
  gender,
  goal,
  height,
  showResult,
  weight,
}: Pick<
  MacroCalculatorState,
  'activityLevel' | 'age' | 'customCarbs' | 'customFat' | 'customProtein' | 'gender' | 'goal'
> & {
  height: ReturnType<typeof useHeight>;
  showResult: boolean;
  weight: ReturnType<typeof useWeight>;
}): React.ComponentProps<typeof CalculatorPageLayout>['shareResultContext'] {
  const heightCm = height.toCm();
  const weightKg = weight.toKg();

  if (!showResult || typeof age !== 'number' || heightCm === null || weightKg === null) {
    return undefined;
  }

  return {
    calculator: 'macro',
    inputs: {
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel,
      goal,
      customProteinPercent: goal === 'custom' ? customProtein : undefined,
      customCarbsPercent: goal === 'custom' ? customCarbs : undefined,
      customFatPercent: goal === 'custom' ? customFat : undefined,
    },
  };
}

type MacroCalculatorContentProps = {
  calculationError: string | null;
  formFields: React.ComponentProps<typeof CalculatorForm>['fields'];
  handleSubmit: React.FormEventHandler<Element>;
  onReset: () => void;
  result: MacroResultType | null;
  showResult: boolean;
};

function MacroCalculatorContent({
  calculationError,
  formFields,
  handleSubmit,
  onReset,
  result,
  showResult,
}: MacroCalculatorContentProps): React.JSX.Element {
  return (
    <>
      <div className="md:col-span-1">
        <CalculatorForm
          title="Enter Your Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={onReset}
        />

        {calculationError ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {calculationError}
          </div>
        ) : null}
      </div>

      <div className="md:col-span-2" id="macro-result">
        {showResult && result ? (
          <>
            <MacroResult result={result} />

            <div className="mt-6 flex items-center justify-between">
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
                onClick={onReset}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
              >
                New Calculation
              </button>
            </div>

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
    </>
  );
}
export default function MacroCalculator({
  serverHeader,
  initialSharedPrefill = null,
}: {
  serverHeader?: React.ReactNode;
  initialSharedPrefill?: SharedResultInputMap['macro'] | null;
}) {
  const [state, dispatchState] = useReducer(macroCalculatorReducer, initialMacroCalculatorState);
  const { activityLevel, age, customCarbs, customFat, customProtein, gender, goal } = state;
  const height = useHeight();
  const weight = useWeight();
  const chainPrefill = useChainPrefill('macro');
  const querySharedPrefill = useSharedResultPrefill('macro');
  const sharedPrefill = initialSharedPrefill ?? querySharedPrefill;
  const hasAppliedSharedPrefill = useRef(false);

  useEffect(() => {
    if (!chainPrefill) return;
    dispatchState({
      type: 'patch',
      patch: {
        ...(typeof chainPrefill.age === 'number' ? { age: chainPrefill.age } : {}),
        ...(chainPrefill.gender === 'male' || chainPrefill.gender === 'female'
          ? { gender: chainPrefill.gender as Gender }
          : {}),
      },
    });
    if (typeof chainPrefill.height === 'number') height.setValue(chainPrefill.height);
    if (typeof chainPrefill.weight === 'number') weight.setValue(chainPrefill.weight);
  }, [chainPrefill, height, weight]);

  useEffect(() => {
    if (!sharedPrefill || hasAppliedSharedPrefill.current) return;

    hasAppliedSharedPrefill.current = true;
    dispatchState({
      type: 'patch',
      patch: {
        age: sharedPrefill.age,
        gender: sharedPrefill.gender,
        activityLevel: sharedPrefill.activityLevel,
        goal: sharedPrefill.goal,
        ...(typeof sharedPrefill.customProteinPercent === 'number'
          ? { customProtein: sharedPrefill.customProteinPercent }
          : {}),
        ...(typeof sharedPrefill.customCarbsPercent === 'number'
          ? { customCarbs: sharedPrefill.customCarbsPercent }
          : {}),
        ...(typeof sharedPrefill.customFatPercent === 'number'
          ? { customFat: sharedPrefill.customFatPercent }
          : {}),
      },
    });
    height.setValue(sharedPrefill.heightCm);
    weight.setValue(sharedPrefill.weightKg);
    requestCalculatorFormSubmit();
  }, [height, sharedPrefill, weight]);

  const chainResultData = useMemo(() => {
    const heightCm = height.toCm();
    const weightKg = weight.toKg();
    return {
      ...(typeof age === 'number' ? { age } : {}),
      gender,
      ...(heightCm !== null ? { height: heightCm } : {}),
      ...(weightKg !== null ? { weight: weightKg } : {}),
      activityLevel,
    };
  }, [age, gender, height, weight, activityLevel]);

  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<MacroResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        // Validate age
        if (isEmpty(age)) {
          newErrors.age = 'Age is required';
        } else {
          const ageValidation = validateAge(age);
          if (!ageValidation.isValid) {
            newErrors.age = ageValidation.error ?? '';
          }
        }

        // Validate height
        if (isEmpty(height.value)) {
          newErrors.height = 'Height is required';
        } else {
          const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
          const heightValidation = validateHeight(height.value, unitSystem);
          if (!heightValidation.isValid) {
            newErrors.height = heightValidation.error ?? '';
          }
        }

        // Validate weight
        if (isEmpty(weight.value)) {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const weightValidation = validateWeight(weight.value, unitSystem);
          if (!weightValidation.isValid) {
            newErrors.weight = weightValidation.error ?? '';
          }
        }

        // Validate custom macros if using custom goal
        if (goal === 'custom') {
          const macroValidation = validateMacroDistribution(customProtein, customCarbs, customFat);
          if (!macroValidation.isValid) {
            newErrors.macros = macroValidation.error ?? '';
          }
        }

        return newErrors;
      },
      calculate: () => {
        const heightCm = height.toCm();
        const weightKg = weight.toKg();

        const calculationResult = processMacroCalculation({
          gender,
          age: age as number,
          heightUnit: height.unit,
          heightCm: heightCm as number,
          heightFt: height.unit === 'ft' ? Math.floor(height.value as number) : 0,
          heightIn: height.unit === 'ft' ? ((height.value as number) % 1) * 12 : 0,
          weightUnit: weight.unit,
          weightKg: weightKg as number,
          weightLb: weight.unit === 'lb' ? (weight.value as number) : 0,
          activityLevel,
          goal,
          customProteinPercent: goal === 'custom' ? customProtein : undefined,
          customCarbsPercent: goal === 'custom' ? customCarbs : undefined,
          customFatPercent: goal === 'custom' ? customFat : undefined,
        });

        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('macro-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);

        return calculationResult;
      },
    });

  const onReset = () => {
    handleReset(() => {
      dispatchState({ type: 'reset' });
      height.setValue('');
      weight.setValue('');
    });
  };

  const shareResultContext = useMemo(
    () =>
      createMacroShareResultContext({
        activityLevel,
        age,
        customCarbs,
        customFat,
        customProtein,
        gender,
        goal,
        height,
        showResult,
        weight,
      }),
    [
      activityLevel,
      age,
      customCarbs,
      customFat,
      customProtein,
      gender,
      goal,
      height,
      showResult,
      weight,
    ]
  );

  const formFields = useMemo(
    () =>
      createMacroFormFields({
        activityLevel,
        age,
        customCarbs,
        customFat,
        customProtein,
        errors,
        gender,
        goal,
        height,
        setActivityLevel: value =>
          dispatchState({ type: 'patch', patch: { activityLevel: value } }),
        setAge: value => dispatchState({ type: 'patch', patch: { age: value } }),
        setCustomCarbs: value => dispatchState({ type: 'patch', patch: { customCarbs: value } }),
        setCustomFat: value => dispatchState({ type: 'patch', patch: { customFat: value } }),
        setCustomProtein: value =>
          dispatchState({ type: 'patch', patch: { customProtein: value } }),
        setGender: value => dispatchState({ type: 'patch', patch: { gender: value } }),
        setGoal: value => dispatchState({ type: 'patch', patch: { goal: value } }),
        weight,
      }),
    [
      activityLevel,
      age,
      customCarbs,
      customFat,
      customProtein,
      errors,
      gender,
      goal,
      height,
      weight,
    ]
  );

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Macro Calculator"
      description="Calculate your daily macronutrient targets (protein, carbs, fat) based on your goals and activity level."
      calculatorSlug="macro"
      shareTitle="Macro Calculator | Calculate Your Daily Protein, Carbs & Fat"
      shareDescription="Calculate your optimal daily macronutrient intake for weight loss, maintenance, or muscle gain with our free macro calculator."
      chainResultData={chainResultData}
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
        url: 'https://www.healthcalc.xyz/macro',
      }}
      newsletterTitle="Get Nutrition & Macro Tips"
      newsletterDescription="Subscribe to receive the latest macro tracking strategies, meal prep ideas, and evidence-based nutrition advice delivered to your inbox."
      showResultsCapture={showResult}
      shareResultContext={shareResultContext}
    >
      <MacroCalculatorContent
        calculationError={calculationError}
        formFields={formFields}
        handleSubmit={handleSubmit}
        onReset={onReset}
        result={result}
        showResult={showResult}
      />
    </CalculatorPageLayout>
  );
}
