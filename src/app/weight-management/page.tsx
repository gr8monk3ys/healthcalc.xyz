'use client';

import React, { useState } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'WeightManagementCalculator' });
import { Gender, ActivityLevel, HeightUnit, WeightUnit } from '@/types/common';
import { WeightManagementResult, DietType, GoalType } from '@/types/weightManagement';
import { calculateWeightManagement } from '@/app/api/weightManagement';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { DIET_TYPES } from '@/constants/weightManagement';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import WeightManagementResultDisplay from '@/components/calculators/weight-management/WeightManagementResult';
import WeightManagementInfo from '@/components/calculators/weight-management/WeightManagementInfo';
import WeightManagementUnderstanding from '@/components/calculators/weight-management/WeightManagementUnderstanding';
import SaveResult from '@/components/SaveResult';

// FAQ data for the calculator
const faqs = [
  {
    question:
      'How does the Weight Management Calculator differ from the Calorie Deficit Calculator?',
    answer:
      "While the Calorie Deficit Calculator focuses on how long it will take to reach a goal weight, the Weight Management Calculator provides a complete plan with a specific target date. It includes detailed macro breakdowns (protein, carbs, fats) tailored to your chosen diet type, weekly progress milestones, and adaptive calorie adjustments. It's designed for those who want a comprehensive roadmap with a deadline.",
  },
  {
    question: 'Why does the calculator suggest different macros for different diet types?',
    answer:
      'Different diet types optimize macronutrient ratios for specific goals and preferences. Balanced diets (40/30/30) work well for general weight management, high-protein diets (40/30/30) support muscle retention during weight loss, low-carb diets (20/40/40) may help with insulin sensitivity and satiety, and keto diets (5/30/65) promote ketosis for fat burning. The calculator adjusts macros to match your chosen approach while maintaining appropriate calorie targets.',
  },
  {
    question: 'What if my target date is too aggressive or not challenging enough?',
    answer:
      "The calculator will warn you if your target date results in unsafe weight loss or gain rates (more than 1kg/2.2lb per week for loss, or 0.5kg/1.1lb per week for gain). If your timeline is too aggressive, it will adjust your calorie target to the minimum safe level and show a realistic completion date. If it's not challenging enough, consider setting a more ambitious date or adjusting your goal weight.",
  },
  {
    question: 'How should I adjust my plan if I miss a week or plateau?',
    answer:
      "Weight loss and gain aren't always linear. If you miss a week or plateau, first review your tracking accuracy and ensure you're consistent with your calorie target. If you plateau for 2-3 weeks despite accurate tracking, recalculate using your current weight as a starting point and adjust your target date accordingly. The calculator provides weekly milestones to help you monitor progress and make timely adjustments.",
  },
  {
    question: 'Can I use this calculator for muscle gain?',
    answer:
      'Yes! If your goal weight is higher than your current weight, the calculator automatically switches to a muscle gain plan. It will recommend a moderate calorie surplus (typically 250-500 calories above TDEE) and suggest higher protein intake to support muscle growth. For optimal muscle gain, combine this plan with progressive resistance training and ensure adequate sleep and recovery.',
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
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Measurement Methods',
  },
];

export default function WeightManagementCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [goalWeight, setGoalWeight] = useState<number | ''>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [dietType, setDietType] = useState<DietType>('balanced');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    goalWeight?: string;
    targetDate?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<WeightManagementResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Calculate minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: {
      age?: string;
      height?: string;
      weight?: string;
      goalWeight?: string;
      targetDate?: string;
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
      if (goalWeight === weight) {
        newErrors.goalWeight = 'Goal weight must be different from current weight';
      } else if (goalWeight < 40 && weightUnit === 'kg') {
        newErrors.goalWeight = 'Goal weight seems too low for safety';
      } else if (goalWeight < 88 && weightUnit === 'lb') {
        newErrors.goalWeight = 'Goal weight seems too low for safety';
      }
    }

    // Validate target date
    if (!targetDate) {
      newErrors.targetDate = 'Target date is required';
    } else {
      const selectedDate = new Date(targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        newErrors.targetDate = 'Target date must be in the future';
      }
    }

    setErrors(newErrors);

    // If no errors, calculate weight management plan
    if (
      Object.keys(newErrors).length === 0 &&
      typeof age === 'number' &&
      typeof height === 'number' &&
      typeof weight === 'number' &&
      typeof goalWeight === 'number' &&
      targetDate
    ) {
      // Convert height to cm if needed
      const heightCm = heightUnit === 'cm' ? height : height * 30.48;

      // Convert weights to kg if needed
      const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;
      const goalWeightKg = weightUnit === 'kg' ? goalWeight : goalWeight / 2.20462;

      // Determine goal type
      const goalType: GoalType =
        goalWeightKg < weightKg ? 'lose' : goalWeightKg > weightKg ? 'gain' : 'maintain';

      try {
        // Calculate weight management plan
        const weightManagementResult = calculateWeightManagement({
          gender,
          age,
          heightCm,
          weightKg,
          activityLevel,
          goalWeightKg,
          goalType,
          targetDate: new Date(targetDate),
          dietType,
        });

        setResult(weightManagementResult);
        setShowResult(true);

        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('weight-management-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        logger.logError('Error calculating weight management plan', error);
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
    setTargetDate('');
    setDietType('balanced');
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
      name: 'targetDate',
      label: 'Target Date',
      type: 'date' as const,
      value: targetDate,
      onChange: setTargetDate,
      error: errors.targetDate,
      min: getMinDate(),
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
      name: 'dietType',
      label: 'Diet Type',
      type: 'select' as const,
      value: dietType,
      onChange: (value: string) => setDietType(value as DietType),
      options: DIET_TYPES.map(diet => ({
        value: diet.type,
        label: diet.label,
        description: diet.description,
      })),
    },
  ];

  return (
    <CalculatorPageLayout
      title="Weight Management Calculator"
      description="Plan your weight management journey with a target date and get personalized calorie and macro recommendations"
      calculatorSlug="weight-management"
      shareTitle="Weight Management Calculator | Complete Macro & Calorie Plan"
      shareDescription="Plan your weight management journey with a target date and get personalized calorie and macro recommendations. Complete roadmap for weight loss or muscle gain."
      shareHashtags={['weightmanagement', 'weightloss', 'musclegain', 'macros']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About Weight Management"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Weight Management Calculator',
        description:
          'Plan your weight management journey with a target date and get personalized calorie and macro recommendations. Complete roadmap for weight loss or muscle gain.',
        url: 'https://www.heathcheck.info/weight-management',
      }}
      understandingSection={<WeightManagementUnderstanding />}
      newsletterTitle="Get Weight Management Tips & Updates"
      newsletterDescription="Subscribe to receive the latest nutrition and fitness tips, calculator updates, and exclusive content to help you achieve your weight management goals."
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Enter Your Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </div>

      <div className="md:col-span-2" id="weight-management-result">
        {showResult && result ? (
          <>
            <WeightManagementResultDisplay result={result} weightUnit={weightUnit} />

            {/* Save result functionality */}
            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="weight-management"
                calculatorName="Weight Management Calculator"
                data={{
                  tdee: result.tdee,
                  dailyCalorieTarget: result.dailyCalorieTarget,
                  proteinGrams: result.macros.proteinGrams,
                  carbsGrams: result.macros.carbsGrams,
                  fatGrams: result.macros.fatGrams,
                  targetDate: targetDate,
                  weightToChange: `${Math.abs(typeof weight === 'number' && typeof goalWeight === 'number' ? weight - goalWeight : 0).toFixed(1)} ${weightUnit}`,
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
          <WeightManagementInfo />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
