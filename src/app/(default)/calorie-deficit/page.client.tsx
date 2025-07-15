'use client';

import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { Gender, ActivityLevel } from '@/types/common';
import { CalorieDeficitResult as CalorieDeficitResultType } from '@/types/calorieDeficit';
import { calculateCalorieDeficit } from '@/app/api/calorieDeficit';
import { DEFICIT_OPTIONS } from '@/constants/calorieDeficit';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import { convertWeight } from '@/utils/conversions';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalorieDeficitResultDisplay from '@/components/calculators/calorie-deficit/CalorieDeficitResult';
import CalorieDeficitInfo from '@/components/calculators/calorie-deficit/CalorieDeficitInfo';
import CalorieDeficitUnderstanding from '@/components/calculators/calorie-deficit/CalorieDeficitUnderstanding';
import SaveResult from '@/components/SaveResult';
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

// FAQ data for the calculator
const faqs = [
  {
    question: 'What is a safe calorie deficit for weight loss?',
    answer:
      'A safe calorie deficit typically ranges from 250-1000 calories per day below your Total Daily Energy Expenditure (TDEE). Our calculator offers three levels: Mild (250 cal/day, ~0.25 kg/week), Moderate (500 cal/day, ~0.5 kg/week), and Aggressive (750-1000 cal/day, ~0.75-1 kg/week). Most experts recommend moderate deficits for sustainable weight loss without metabolic slowdown or muscle loss.',
  },
  {
    question: 'Why does my weight loss timeline seem longer than expected?',
    answer:
      'Weight loss timelines account for safe, sustainable rates to prevent metabolic adaptation and muscle loss. Losing weight too quickly can lead to metabolic slowdown, increased hunger, and muscle loss. Our calculator uses evidence-based rates: 0.5-1% of body weight per week for most people, with adjustments based on your current weight and deficit level.',
  },
  {
    question: 'Can I eat less than my calculated target calories?',
    answer:
      'While technically possible, eating significantly below your calculated target can backfire. Severe calorie restriction can trigger metabolic adaptation, increased hunger hormones, loss of lean muscle mass, nutrient deficiencies, and decreased energy levels. The calculator ensures your intake never goes below 1200 calories for women or 1500 calories for men for safety reasons.',
  },
  {
    question: 'How does activity level affect my calorie deficit?',
    answer:
      'Your activity level determines your Total Daily Energy Expenditure (TDEE) by multiplying your Basal Metabolic Rate (BMR) by an activity multiplier (1.2 for sedentary up to 1.9 for very active). Higher activity levels mean higher TDEE, which allows for more flexible eating while maintaining the same deficit. This is why exercise can support weight loss - it increases the number of calories you can eat while still losing weight.',
  },
  {
    question: 'Should I adjust my calorie intake as I lose weight?',
    answer:
      'Yes, as you lose weight, your calorie needs decrease because a smaller body requires less energy. Recalculate your calorie needs every 5-10 pounds (2-5 kg) lost, or if your weight loss stalls for 2-3 weeks. This ensures you maintain an appropriate deficit without eating too little or too much.',
  },
];

// Blog article data for related articles
const blogArticles = [
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    readTime: '8 min read',
    category: 'Weight Management',
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

const ACTIVITY_LEVEL_OPTIONS: ActivityLevel[] = [
  'sedentary',
  'lightly_active',
  'moderately_active',
  'very_active',
  'extremely_active',
];

function isActivityLevel(value: unknown): value is ActivityLevel {
  return ACTIVITY_LEVEL_OPTIONS.includes(value as ActivityLevel);
}

type CalorieDeficitState = {
  age: number | '';
  gender: Gender;
  activityLevel: ActivityLevel;
  goalWeight: number | '';
  deficitLevel: 'mild' | 'moderate' | 'aggressive';
};

type CalorieDeficitAction =
  | { type: 'patch'; patch: Partial<CalorieDeficitState> }
  | { type: 'reset' };

const initialCalorieDeficitState: CalorieDeficitState = {
  age: '',
  gender: 'male',
  activityLevel: 'sedentary',
  goalWeight: '',
  deficitLevel: 'moderate',
};

function calorieDeficitReducer(
  state: CalorieDeficitState,
  action: CalorieDeficitAction
): CalorieDeficitState {
  switch (action.type) {
    case 'patch':
      return { ...state, ...action.patch };
    case 'reset':
      return initialCalorieDeficitState;
    default:
      return state;
  }
}

type CalorieDeficitFormFieldsArgs = {
  activityLevel: ActivityLevel;
  age: number | '';
  deficitLevel: 'mild' | 'moderate' | 'aggressive';
  errors: Record<string, string>;
  gender: Gender;
  goalWeight: number | '';
  height: ReturnType<typeof useHeight>;
  setActivityLevel: (value: ActivityLevel) => void;
  setAge: (value: number | '') => void;
  setDeficitLevel: (value: 'mild' | 'moderate' | 'aggressive') => void;
  setGender: (value: Gender) => void;
  setGoalWeight: (value: number | '') => void;
  toggleWeightUnitWithGoal: () => void;
  weight: ReturnType<typeof useWeight>;
};

function createCalorieDeficitFormFields({
  activityLevel,
  age,
  deficitLevel,
  errors,
  gender,
  goalWeight,
  height,
  setActivityLevel,
  setAge,
  setDeficitLevel,
  setGender,
  setGoalWeight,
  toggleWeightUnitWithGoal,
  weight,
}: CalorieDeficitFormFieldsArgs): React.ComponentProps<typeof CalculatorForm>['fields'] {
  return [
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
      unitToggle: toggleWeightUnitWithGoal,
    },
    {
      name: 'goalWeight',
      label: 'Goal Weight',
      type: 'number' as const,
      value: goalWeight,
      onChange: setGoalWeight,
      error: errors.goalWeight,
      placeholder: weight.placeholder,
      unit: weight.unit,
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
      name: 'deficitLevel',
      label: 'Deficit Level',
      type: 'select' as const,
      value: deficitLevel,
      onChange: (value: string) => setDeficitLevel(value as 'mild' | 'moderate' | 'aggressive'),
      options: DEFICIT_OPTIONS.map(option => ({
        value: option.level,
        label: option.label,
        description: option.description,
      })),
    },
  ];
}

function createCalorieDeficitShareResultContext({
  activityLevel,
  age,
  deficitLevel,
  gender,
  goalWeight,
  height,
  showResult,
  weight,
}: Pick<CalorieDeficitState, 'activityLevel' | 'age' | 'deficitLevel' | 'gender' | 'goalWeight'> & {
  height: ReturnType<typeof useHeight>;
  showResult: boolean;
  weight: ReturnType<typeof useWeight>;
}): React.ComponentProps<typeof CalculatorPageLayout>['shareResultContext'] {
  const heightCm = height.toCm();
  const weightKg = weight.toKg();
  const goalWeightKg =
    typeof goalWeight === 'number'
      ? weight.unit === 'kg'
        ? goalWeight
        : convertWeight(goalWeight, 'lb', 'kg')
      : null;

  if (
    !showResult ||
    typeof age !== 'number' ||
    heightCm === null ||
    weightKg === null ||
    goalWeightKg === null
  ) {
    return undefined;
  }

  return {
    calculator: 'calorie-deficit',
    inputs: {
      age,
      gender,
      heightCm,
      weightKg,
      goalWeightKg,
      activityLevel,
      deficitLevel,
    },
  };
}

type CalorieDeficitContentProps = {
  calculationError: string | null;
  formFields: React.ComponentProps<typeof CalculatorForm>['fields'];
  goalWeight: number | '';
  handleSubmit: React.FormEventHandler<Element>;
  onReset: () => void;
  result: CalorieDeficitResultType | null;
  showResult: boolean;
  weight: ReturnType<typeof useWeight>;
};

function CalorieDeficitContent({
  calculationError,
  formFields,
  goalWeight,
  handleSubmit,
  onReset,
  result,
  showResult,
  weight,
}: CalorieDeficitContentProps): React.JSX.Element {
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

      <div className="md:col-span-2" id="calorie-deficit-result">
        {showResult && result ? (
          <>
            <CalorieDeficitResultDisplay result={result} weightUnit={weight.unit} />

            <div className="mt-6 flex items-center justify-between">
              <SaveResult
                calculatorType="calorie-deficit"
                calculatorName="Calorie Deficit Calculator"
                data={{
                  tdee: result.tdee,
                  targetCalories: result.dailyCalorieTarget,
                  deficitCalories: result.dailyDeficit,
                  estimatedWeeks: result.estimatedWeeks,
                  weightToLose: `${
                    typeof weight.value === 'number' && typeof goalWeight === 'number'
                      ? (weight.value - goalWeight).toFixed(1)
                      : 0
                  } ${weight.unit}`,
                }}
              />

              <button
                onClick={onReset}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
              >
                New Calculation
              </button>
            </div>
          </>
        ) : (
          <CalorieDeficitInfo />
        )}
      </div>
    </>
  );
}
export default function CalorieDeficitCalculator({
  serverHeader,
  initialSharedPrefill = null,
}: {
  serverHeader?: React.ReactNode;
  initialSharedPrefill?: SharedResultInputMap['calorie-deficit'] | null;
}) {
  const [state, dispatchState] = useReducer(calorieDeficitReducer, initialCalorieDeficitState);
  const { activityLevel, age, deficitLevel, gender, goalWeight } = state;
  const height = useHeight();
  const weight = useWeight();
  const chainPrefill = useChainPrefill('calorie-deficit');
  const querySharedPrefill = useSharedResultPrefill('calorie-deficit');
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
        ...(isActivityLevel(chainPrefill.activityLevel)
          ? { activityLevel: chainPrefill.activityLevel }
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
        goalWeight: sharedPrefill.goalWeightKg,
        activityLevel: sharedPrefill.activityLevel,
        deficitLevel: sharedPrefill.deficitLevel,
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

  // Wrap the weight toggle to also convert goalWeight
  const toggleWeightUnitWithGoal = useCallback(() => {
    if (typeof goalWeight === 'number') {
      if (weight.unit === 'kg') {
        dispatchState({
          type: 'patch',
          patch: { goalWeight: parseFloat(convertWeight(goalWeight, 'kg', 'lb').toFixed(1)) },
        });
      } else {
        dispatchState({
          type: 'patch',
          patch: { goalWeight: parseFloat(convertWeight(goalWeight, 'lb', 'kg').toFixed(1)) },
        });
      }
    }
    weight.toggle();
  }, [goalWeight, weight]);

  // Shared form boilerplate: errors, result, showResult, calculationError,
  // handleSubmit, handleReset — extracted into the shared hook.
  const { result, showResult, calculationError, errors, handleSubmit, handleReset } =
    useCalculatorForm<CalorieDeficitResultType>({
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

        // Validate height (feet for imperial, cm for metric)
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

        // Validate goal weight
        if (isEmpty(goalWeight)) {
          newErrors.goalWeight = 'Goal weight is required';
        } else if (typeof goalWeight === 'number' && typeof weight.value === 'number') {
          if (goalWeight >= weight.value) {
            newErrors.goalWeight = 'Goal weight must be less than current weight';
          } else if (goalWeight < 40 && weight.unit === 'kg') {
            newErrors.goalWeight = 'Goal weight seems too low';
          } else if (goalWeight < 88 && weight.unit === 'lb') {
            newErrors.goalWeight = 'Goal weight seems too low';
          }
        }

        return newErrors;
      },
      calculate: () => {
        const heightCm = height.toCm();
        const weightKg = weight.toKg();

        if (
          typeof age !== 'number' ||
          heightCm === null ||
          weightKg === null ||
          typeof goalWeight !== 'number'
        ) {
          throw new Error('Invalid inputs');
        }

        // Convert goal weight to kg if needed
        const goalWeightKg =
          weight.unit === 'kg' ? goalWeight : convertWeight(goalWeight, 'lb', 'kg');

        const calorieDeficitResult = calculateCalorieDeficit({
          gender,
          age,
          heightCm,
          weightKg,
          activityLevel,
          goalWeightKg,
          deficitLevel,
        });

        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('calorie-deficit-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);

        return calorieDeficitResult;
      },
    });

  // Wrap handleReset to also reset field state managed by this component
  const onReset = () => {
    handleReset(() => {
      dispatchState({ type: 'reset' });
      height.setValue('');
      weight.setValue('');
    });
  };

  const shareResultContext = useMemo(
    () =>
      createCalorieDeficitShareResultContext({
        activityLevel,
        age,
        deficitLevel,
        gender,
        goalWeight,
        height,
        showResult,
        weight,
      }),
    [activityLevel, age, deficitLevel, gender, goalWeight, height, showResult, weight]
  );

  const formFields = useMemo(
    () =>
      createCalorieDeficitFormFields({
        activityLevel,
        age,
        deficitLevel,
        errors,
        gender,
        goalWeight,
        height,
        setActivityLevel: value =>
          dispatchState({ type: 'patch', patch: { activityLevel: value } }),
        setAge: value => dispatchState({ type: 'patch', patch: { age: value } }),
        setDeficitLevel: value => dispatchState({ type: 'patch', patch: { deficitLevel: value } }),
        setGender: value => dispatchState({ type: 'patch', patch: { gender: value } }),
        setGoalWeight: value => dispatchState({ type: 'patch', patch: { goalWeight: value } }),
        toggleWeightUnitWithGoal,
        weight,
      }),
    [
      activityLevel,
      age,
      deficitLevel,
      errors,
      gender,
      goalWeight,
      height,
      toggleWeightUnitWithGoal,
      weight,
    ]
  );

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Calorie Deficit Calculator"
      description="Calculate how long it will take to reach your goal weight with different calorie deficit levels"
      calculatorSlug="calorie-deficit"
      shareTitle="Calorie Deficit Calculator | Weight Loss Timeline"
      shareDescription="Calculate how long it will take to reach your goal weight with different calorie deficit levels. Get personalized recommendations for safe, sustainable weight loss."
      shareHashtags={['caloriedeficit', 'weightloss', 'fitness', 'nutrition']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About Calorie Deficits"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Calorie Deficit Calculator',
        description:
          'Calculate how long it will take to reach your goal weight with different calorie deficit levels. Get personalized recommendations for safe, sustainable weight loss.',
        url: 'https://www.healthcalc.xyz/calorie-deficit',
      }}
      understandingSection={<CalorieDeficitUnderstanding />}
      newsletterTitle="Get Weight Loss Tips & Updates"
      newsletterDescription="Subscribe to receive the latest nutrition and fitness tips, calculator updates, and exclusive content to help you achieve your weight loss goals."
      showResultsCapture={showResult}
      chainResultData={chainResultData}
      shareResultContext={shareResultContext}
    >
      <CalorieDeficitContent
        calculationError={calculationError}
        formFields={formFields}
        goalWeight={goalWeight}
        handleSubmit={handleSubmit}
        onReset={onReset}
        result={result}
        showResult={showResult}
        weight={weight}
      />
    </CalculatorPageLayout>
  );
}
