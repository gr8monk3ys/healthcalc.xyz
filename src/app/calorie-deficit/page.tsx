'use client';

import React, { useState } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'CalorieDeficitCalculator' });
import { Gender, ActivityLevel, HeightUnit, WeightUnit } from '@/types/common';
import { CalorieDeficitResult as CalorieDeficitResultType } from '@/types/calorieDeficit';
import { calculateCalorieDeficit } from '@/app/api/calorieDeficit';
import { DEFICIT_OPTIONS } from '@/constants/calorieDeficit';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import CalorieDeficitResultDisplay from '@/components/calculators/calorie-deficit/CalorieDeficitResult';
import CalorieDeficitInfo from '@/components/calculators/calorie-deficit/CalorieDeficitInfo';
import CalorieDeficitUnderstanding from '@/components/calculators/calorie-deficit/CalorieDeficitUnderstanding';
import SaveResult from '@/components/SaveResult';

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

export default function CalorieDeficitCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [goalWeight, setGoalWeight] = useState<number | ''>('');
  const [deficitLevel, setDeficitLevel] = useState<'mild' | 'moderate' | 'aggressive'>('moderate');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    goalWeight?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<CalorieDeficitResultType | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: {
      age?: string;
      height?: string;
      weight?: string;
      goalWeight?: string;
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
    if (isEmpty(height)) {
      newErrors.height = 'Height is required';
    } else {
      const heightForValidation =
        heightUnit === 'ft' ? (typeof height === 'number' ? height * 12 : height) : height;
      const unitSystem = heightUnit === 'cm' ? 'metric' : 'imperial';
      const heightValidation = validateHeight(heightForValidation, unitSystem);
      if (!heightValidation.isValid) {
        newErrors.height = heightValidation.error;
      }
    }

    // Validate weight
    if (isEmpty(weight)) {
      newErrors.weight = 'Weight is required';
    } else {
      const unitSystem = weightUnit === 'kg' ? 'metric' : 'imperial';
      const weightValidation = validateWeight(weight, unitSystem);
      if (!weightValidation.isValid) {
        newErrors.weight = weightValidation.error;
      }
    }

    // Validate goal weight
    if (isEmpty(goalWeight)) {
      newErrors.goalWeight = 'Goal weight is required';
    } else if (typeof goalWeight === 'number' && typeof weight === 'number') {
      if (goalWeight >= weight) {
        newErrors.goalWeight = 'Goal weight must be less than current weight';
      } else if (goalWeight < 40 && weightUnit === 'kg') {
        newErrors.goalWeight = 'Goal weight seems too low';
      } else if (goalWeight < 88 && weightUnit === 'lb') {
        newErrors.goalWeight = 'Goal weight seems too low';
      }
    }

    setErrors(newErrors);

    // If no errors, calculate calorie deficit
    if (
      Object.keys(newErrors).length === 0 &&
      typeof age === 'number' &&
      typeof height === 'number' &&
      typeof weight === 'number' &&
      typeof goalWeight === 'number'
    ) {
      // Convert height to cm if needed
      const heightCm = heightUnit === 'cm' ? height : height * 30.48;

      // Convert weights to kg if needed
      const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;
      const goalWeightKg = weightUnit === 'kg' ? goalWeight : goalWeight / 2.20462;

      try {
        // Calculate calorie deficit
        const calorieDeficitResult = calculateCalorieDeficit({
          gender,
          age,
          heightCm,
          weightKg,
          activityLevel,
          goalWeightKg,
          deficitLevel,
        });

        setResult(calorieDeficitResult);
        setShowResult(true);

        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('calorie-deficit-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        logger.logError('Error calculating calorie deficit', error);
        if (error instanceof Error) {
          setErrors({ ...newErrors, goalWeight: error.message });
        }
      }
    }
  };

  // Handle unit toggle
  const toggleHeightUnit = () => {
    if (heightUnit === 'cm' && typeof height === 'number') {
      setHeight(parseFloat((height / 30.48).toFixed(1)));
      setHeightUnit('ft');
    } else if (heightUnit === 'ft' && typeof height === 'number') {
      setHeight(parseFloat((height * 30.48).toFixed(1)));
      setHeightUnit('cm');
    } else {
      setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
    }
  };

  const toggleWeightUnit = () => {
    if (weightUnit === 'kg') {
      if (typeof weight === 'number') setWeight(parseFloat((weight * 2.20462).toFixed(1)));
      if (typeof goalWeight === 'number')
        setGoalWeight(parseFloat((goalWeight * 2.20462).toFixed(1)));
      setWeightUnit('lb');
    } else {
      if (typeof weight === 'number') setWeight(parseFloat((weight / 2.20462).toFixed(1)));
      if (typeof goalWeight === 'number')
        setGoalWeight(parseFloat((goalWeight / 2.20462).toFixed(1)));
      setWeightUnit('kg');
    }
  };

  // Reset form
  const handleReset = () => {
    setGender('male');
    setAge('');
    setHeight('');
    setHeightUnit('cm');
    setWeight('');
    setWeightUnit('kg');
    setActivityLevel('sedentary');
    setGoalWeight('');
    setDeficitLevel('moderate');
    setErrors({});
    setResult(null);
    setShowResult(false);
  };

  // Form fields for the CalculatorForm component
  const formFields = [
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
    {
      name: 'height',
      label: 'Height',
      type: 'number' as const,
      value: height,
      onChange: setHeight,
      error: errors.height,
      placeholder: heightUnit === 'cm' ? 'Centimeters' : 'Feet',
      unit: heightUnit === 'cm' ? 'cm' : 'ft',
      unitToggle: toggleHeightUnit,
      step: '0.1',
    },
    {
      name: 'weight',
      label: 'Current Weight',
      type: 'number' as const,
      value: weight,
      onChange: setWeight,
      error: errors.weight,
      placeholder: weightUnit === 'kg' ? 'Kilograms' : 'Pounds',
      unit: weightUnit === 'kg' ? 'kg' : 'lb',
      unitToggle: toggleWeightUnit,
      step: '0.1',
    },
    {
      name: 'goalWeight',
      label: 'Goal Weight',
      type: 'number' as const,
      value: goalWeight,
      onChange: setGoalWeight,
      error: errors.goalWeight,
      placeholder: weightUnit === 'kg' ? 'Kilograms' : 'Pounds',
      unit: weightUnit === 'kg' ? 'kg' : 'lb',
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

  return (
    <CalculatorPageLayout
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
        url: 'https://www.heathcheck.info/calorie-deficit',
      }}
      understandingSection={<CalorieDeficitUnderstanding />}
      newsletterTitle="Get Weight Loss Tips & Updates"
      newsletterDescription="Subscribe to receive the latest nutrition and fitness tips, calculator updates, and exclusive content to help you achieve your weight loss goals."
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Enter Your Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </div>

      <div className="md:col-span-2" id="calorie-deficit-result">
        {showResult && result ? (
          <>
            <CalorieDeficitResultDisplay result={result} weightUnit={weightUnit} />

            {/* Save result functionality */}
            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="calorie-deficit"
                calculatorName="Calorie Deficit Calculator"
                data={{
                  tdee: result.tdee,
                  targetCalories: result.dailyCalorieTarget,
                  deficitCalories: result.dailyDeficit,
                  estimatedWeeks: result.estimatedWeeks,
                  weightToLose: `${typeof weight === 'number' && typeof goalWeight === 'number' ? (weight - goalWeight).toFixed(1) : 0} ${weightUnit}`,
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
          <CalorieDeficitInfo />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
