'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Gender, UnitSystem } from '@/types/common';
import { BodyFatBurnResult as BodyFatBurnResultType } from '@/types/bodyFatBurn';
import { calculateBodyFatBurn } from '@/utils/calculators/bodyFatBurn';
import {
  ACTIVITIES,
  DURATION_RANGE,
  FREQUENCY_RANGE,
  BURN_GOAL_RANGE,
} from '@/constants/bodyFatBurn';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BodyFatBurnResultDisplay from '@/components/calculators/bodyFatBurn/BodyFatBurnResult';
import BodyFatBurnInfo from '@/components/calculators/bodyFatBurn/BodyFatBurnInfo';
import BodyFatBurnUnderstanding from '@/components/calculators/bodyFatBurn/BodyFatBurnUnderstanding';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import SocialShare from '@/components/SocialShare';
import SaveResult from '@/components/SaveResult';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSection from '@/components/FAQSection';
import RelatedArticles from '@/components/RelatedArticles';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// FAQ data for the calculator
const faqs = [
  {
    question: 'How accurate is the Body Fat Burn Calculator?',
    answer:
      'The Body Fat Burn Calculator provides estimates based on established metabolic formulas and activity-specific calorie burn rates. While it offers a good approximation, individual results may vary based on factors like metabolism, fitness level, and exercise intensity. For the most accurate tracking, consider using a heart rate monitor during activities.',
  },
  {
    question: 'Can I lose weight faster by increasing exercise intensity?',
    answer:
      "Yes, increasing exercise intensity typically burns more calories in the same amount of time. However, it's important to balance intensity with sustainability. Very high-intensity workouts may be difficult to maintain regularly and could increase injury risk. A combination of moderate and high-intensity exercise often provides the best long-term results.",
  },
  {
    question: 'Why does the calculator ask for my gender and age?',
    answer:
      'Gender and age affect your basal metabolic rate (BMR), which is the number of calories your body burns at rest. Men typically have higher BMRs than women due to greater muscle mass. BMR also tends to decrease with age. These factors influence how many calories you burn during both rest and activity.',
  },
  {
    question: 'How does the calculator estimate time to reach my weight loss goal?',
    answer:
      "The calculator estimates time to reach your goal by dividing your weight loss goal (in calories) by your weekly calorie deficit from exercise. It assumes that 1 pound (0.45 kg) of fat equals approximately 3,500 calories. The estimate assumes consistent exercise and doesn't account for dietary changes or metabolic adaptations that may occur during weight loss.",
  },
  {
    question: 'Should I rely solely on exercise for weight loss?',
    answer:
      'For optimal weight loss results, combining exercise with dietary modifications is recommended. While exercise burns calories and improves fitness, nutrition plays a crucial role in creating a calorie deficit. Research suggests that a combined approach of diet and exercise leads to more sustainable weight loss than either strategy alone.',
  },
];

// Social share hashtags
const SOCIAL_HASHTAGS = ['fitness', 'weightloss', 'calorieburn', 'exercise'];

// Blog article data for related articles
const blogArticles = [
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
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    readTime: '8 min read',
    category: 'Weight Management',
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

export default function BodyFatBurnCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const height = useHeight();
  const weight = useWeight();
  const [activity, setActivity] = useState<string>('walking');
  const [speed, setSpeed] = useState<number>(3.0);
  const [duration, setDuration] = useState<number>(30);
  const [frequency, setFrequency] = useState<number>(3);
  const [burnGoal, setBurnGoal] = useState<number>(10);

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<BodyFatBurnResultType | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
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

      // If no errors, calculate body fat burn
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
        try {
          // Prepare form data
          const formData = {
            gender,
            age,
            height: heightCm,
            weight: weightKg,
            unitSystem: weight.unit === 'kg' ? ('metric' as UnitSystem) : ('imperial' as UnitSystem),
            activity,
            speed,
            duration,
            frequency,
            burnGoal,
          };

          // Calculate body fat burn
          const bodyFatBurnResult = calculateBodyFatBurn(formData);

          setResult(bodyFatBurnResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('body-fat-burn-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          console.error('Error calculating body fat burn:', error);
          setCalculationError(
            'An error occurred while calculating. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, height, weight, activity, speed, duration, frequency, burnGoal]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    height.setValue('');
    weight.setValue('');
    setActivity('walking');
    setSpeed(3.0);
    setDuration(30);
    setFrequency(3);
    setBurnGoal(10);
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  // Get the selected activity
  const selectedActivity = useMemo(
    () => ACTIVITIES.find(a => a.id === activity),
    [activity]
  );

  // Form fields for the CalculatorForm component
  const formFields = useMemo(
    () => [
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio' as const,
        value: gender,
        onChange: setGender,
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
        name: 'activity',
        label: 'Activity',
        type: 'select' as const,
        value: activity,
        onChange: setActivity,
        options: ACTIVITIES.map(act => ({
          value: act.id,
          label: act.name,
        })),
      },
      {
        name: 'speed',
        label: `Speed/Intensity (${selectedActivity?.speedUnit || 'level'})`,
        type: 'number' as const,
        value: speed,
        onChange: setSpeed,
        min: selectedActivity?.speedRange.min || 0,
        max: selectedActivity?.speedRange.max || 10,
        step: selectedActivity?.speedRange.step.toString() || '0.1',
      },
      {
        name: 'duration',
        label: 'Duration (minutes)',
        type: 'number' as const,
        value: duration,
        onChange: setDuration,
        min: DURATION_RANGE.min,
        max: DURATION_RANGE.max,
        step: DURATION_RANGE.step.toString(),
      },
      {
        name: 'frequency',
        label: 'Frequency (times per week)',
        type: 'number' as const,
        value: frequency,
        onChange: setFrequency,
        min: FREQUENCY_RANGE.min,
        max: FREQUENCY_RANGE.max,
        step: FREQUENCY_RANGE.step.toString(),
      },
      {
        name: 'burnGoal',
        label: `Weight Loss Goal (${weight.unit === 'kg' ? 'kg' : 'lb'})`,
        type: 'number' as const,
        value: burnGoal,
        onChange: setBurnGoal,
        min: BURN_GOAL_RANGE.min,
        max: BURN_GOAL_RANGE.max,
        step: BURN_GOAL_RANGE.step.toString(),
      },
    ],
    [
      gender,
      age,
      errors,
      height,
      weight,
      activity,
      selectedActivity,
      speed,
      duration,
      frequency,
      burnGoal,
    ]
  );

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">Body Fat Burn Calculator</h1>
        <p className="text-gray-600 mb-6">
          Calculate calories burned during physical activities and estimate how long it will take to
          reach your weight loss goals.
        </p>

        {/* Social sharing buttons */}
        <div className="mb-6">
          <SocialShare
            url="/body-fat-burn"
            title="Body Fat Burn Calculator | Activity & Weight Loss Planner"
            description="Calculate calories burned during physical activities and estimate how long it will take to reach your weight loss goals through exercise."
            hashtags={SOCIAL_HASHTAGS}
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
          </div>

          <div className="md:col-span-2" id="body-fat-burn-result">
            {calculationError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {calculationError}
              </div>
            )}
            {showResult && result ? (
              <>
                <BodyFatBurnResultDisplay
                  result={result}
                  formData={{
                    activity,
                    duration,
                    frequency,
                    burnGoal,
                    unitSystem:
                      weight.unit === 'kg' ? ('metric' as UnitSystem) : ('imperial' as UnitSystem),
                  }}
                />

                {/* Save result functionality */}
                <div className="mt-6 flex justify-between items-center">
                  <SaveResult
                    calculatorType="body-fat-burn"
                    calculatorName="Body Fat Burn Calculator"
                    data={{
                      caloriesPerSession: result.activityEnergyExpenditure,
                      caloriesPerWeek: result.totalEnergyExpenditure,
                      timeToReachGoal: `${result.timeToReachGoal.weeks} weeks, ${result.timeToReachGoal.days} days`,
                      activity: selectedActivity?.name || activity,
                      duration,
                      frequency,
                      burnGoal: `${burnGoal} ${weight.unit}`,
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
              <BodyFatBurnInfo />
            )}
          </div>
        </div>

        {/* FAQ Section with structured data */}
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions About Body Fat Burn"
          className="mb-8"
        />

        <BodyFatBurnUnderstanding />

        {/* Related Articles Section */}
        <RelatedArticles
          currentSlug=""
          articles={blogArticles}
          title="Related Articles"
          className="my-8"
        />

        {/* Newsletter Signup */}
        <NewsletterSignup
          title="Get Fitness Tips & Updates"
          description="Subscribe to receive the latest health and fitness tips, calculator updates, and exclusive content to help you achieve your goals."
          className="my-8"
        />

        {/* Structured data for the calculator */}
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Body Fat Burn Calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Calculate calories burned during physical activities and estimate how long it will take to reach your weight loss goals through exercise.',
            url: 'https://www.heathcheck.info/body-fat-burn',
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
