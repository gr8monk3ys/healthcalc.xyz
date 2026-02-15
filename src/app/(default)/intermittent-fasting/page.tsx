'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'IntermittentFastingCalculator' });
import { Gender, ActivityLevel } from '@/types/common';
import {
  IFResult as IFResultType,
  FastingProtocol,
  FastingGoal,
} from '@/types/intermittentFasting';
import { processIFCalculation, validateIFInputs } from '@/utils/calculators/intermittentFasting';
import { FASTING_PROTOCOLS, FASTING_GOALS } from '@/constants/intermittentFasting';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import IFResult from '@/components/calculators/intermittentFasting/IFResult';
import SaveResult from '@/components/SaveResult';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'What is the best intermittent fasting schedule for beginners?',
    answer:
      'The 16:8 method is the most beginner-friendly intermittent fasting protocol. You fast for 16 hours and eat within an 8-hour window, typically skipping breakfast and eating from noon to 8 PM. This schedule is easy to maintain, fits most lifestyles, and provides significant benefits without being too restrictive. Most people find it sustainable long-term and can gradually extend to 18:6 if desired.',
  },
  {
    question: 'Can I drink coffee during my fasting window?',
    answer:
      'Yes, black coffee is allowed during fasting windows and can actually help suppress appetite. Coffee contains virtually no calories and does not significantly impact insulin levels. However, avoid adding milk, cream, sugar, or any caloric sweeteners, as these break your fast. Unsweetened tea, water, and sparkling water are also excellent choices during fasting periods.',
  },
  {
    question: 'Will intermittent fasting slow down my metabolism?',
    answer:
      'No, intermittent fasting does not slow down your metabolism when done correctly. Short-term fasting (16-24 hours) actually increases metabolic rate slightly by boosting norepinephrine levels. The key is ensuring you eat enough calories during your eating window to meet your daily needs. Chronic severe calorie restriction can slow metabolism, but IF with adequate calorie intake supports metabolic health.',
  },
  {
    question: 'How long does it take to see results from intermittent fasting?',
    answer:
      'Most people notice initial benefits within 2-4 weeks, including increased energy, mental clarity, and reduced bloating. Weight loss results typically become visible after 4-6 weeks of consistent fasting. The adaptation period takes 1-2 weeks as your body adjusts to using fat for fuel. Long-term metabolic benefits, improved insulin sensitivity, and autophagy effects develop over 3-6 months of consistent practice.',
  },
  {
    question: 'Should I do intermittent fasting on workout days?',
    answer:
      'Yes, you can exercise during intermittent fasting, but timing matters. For best results, schedule resistance training toward the end of your fasting window or at the start of your eating window, then eat protein-rich meals afterward. Fasted cardio is fine for most people. If you experience weakness or dizziness during workouts, consider breaking your fast earlier on training days or having a small pre-workout meal.',
  },
];

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
];

export default function IntermittentFastingCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const height = useHeight();
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [protocol, setProtocol] = useState<FastingProtocol>('16:8');
  const [goal, setGoal] = useState<FastingGoal>('weight-loss');
  const [wakeTime, setWakeTime] = useState<string>('07:00');

  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    wakeTime?: string;
  }>({});

  const [result, setResult] = useState<IFResultType | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const heightCm = height.toCm();
      const weightValue = weight.value;

      if (
        isEmpty(age) ||
        isEmpty(weightValue) ||
        heightCm === null ||
        typeof age !== 'number' ||
        typeof weightValue !== 'number'
      ) {
        setErrors({
          age: isEmpty(age) ? 'Age is required' : undefined,
          weight: isEmpty(weightValue) ? 'Weight is required' : undefined,
          height: heightCm === null ? 'Height is required' : undefined,
        });
        return;
      }

      const formValues = {
        weight: weightValue,
        weightUnit: weight.unit,
        heightCm: heightCm,
        heightFt:
          height.unit === 'ft' && typeof height.value === 'number' ? Math.floor(height.value) : 0,
        heightIn:
          height.unit === 'ft' && typeof height.value === 'number'
            ? Math.round((height.value % 1) * 12)
            : 0,
        age,
        gender,
        activityLevel,
        protocol,
        goal,
        wakeTime,
        useMetric: height.unit === 'cm',
      };

      const validationErrors = validateIFInputs(formValues);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const ifResult = processIFCalculation(formValues);
        setResult(ifResult);
        setShowResult(true);
        setErrors({});

        setTimeout(() => {
          const resultElement = document.getElementById('if-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        logger.logError('Error calculating intermittent fasting', error);
        if (error instanceof Error) {
          setErrors({ age: error.message });
        }
      }
    },
    [age, gender, height, weight, activityLevel, protocol, goal, wakeTime]
  );

  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    height.setValue('');
    weight.setValue('');
    setActivityLevel('moderately_active');
    setProtocol('16:8');
    setGoal('weight-loss');
    setWakeTime('07:00');
    setErrors({});
    setResult(null);
    setShowResult(false);
  }, [height, weight]);

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
        helpText: 'Must be 18 or older for intermittent fasting',
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
        name: 'protocol',
        label: 'Fasting Protocol',
        type: 'select' as const,
        value: protocol,
        onChange: (value: string) => setProtocol(value as FastingProtocol),
        options: FASTING_PROTOCOLS.map(p => ({
          value: p.id,
          label: p.name,
          description: p.description,
        })),
        helpText: 'Choose the fasting schedule that fits your lifestyle',
      },
      {
        name: 'goal',
        label: 'Fasting Goal',
        type: 'select' as const,
        value: goal,
        onChange: (value: string) => setGoal(value as FastingGoal),
        options: Object.entries(FASTING_GOALS).map(([key, config]) => ({
          value: key,
          label: key
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          description: config.description,
        })),
      },
      {
        name: 'wakeTime',
        label: 'Wake Time',
        type: 'time' as const,
        value: wakeTime,
        onChange: (value: string) => setWakeTime(value),
        error: errors.wakeTime,
        helpText: 'Your typical wake-up time (helps calculate optimal eating window)',
      },
    ],
    [gender, age, height, weight, activityLevel, protocol, goal, wakeTime, errors]
  );

  return (
    <CalculatorPageLayout
      title="Intermittent Fasting Calculator"
      description="Calculate your personalized intermittent fasting schedule with optimal eating windows, meal timing, and nutrition targets. Get a complete IF plan based on your goals, lifestyle, and preferred fasting protocol."
      calculatorSlug="intermittent-fasting"
      faqs={faqs}
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Intermittent Fasting Calculator',
        description:
          'Calculate your personalized intermittent fasting schedule with optimal eating windows and nutrition targets.',
        url: 'https://www.healthcalc.xyz/intermittent-fasting',
      }}
      showResultsCapture={showResult}
    >
      <div className="space-y-8">
        <div className="neumorph-card p-6 md:p-8">
          <CalculatorForm
            fields={formFields}
            onSubmit={handleSubmit}
            onReset={handleReset}
            title="Calculate My IF Schedule"
          />
        </div>

        {showResult && result && (
          <div id="if-result" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Personalized Fasting Plan
              </h2>
              <SaveResult
                calculatorType="intermittent-fasting"
                calculatorName="Intermittent Fasting Calculator"
                data={{
                  protocol: result.protocol,
                  eatingWindow: `${result.eatingWindowStart} - ${result.eatingWindowEnd}`,
                  dailyCalories: result.dailyCalories,
                  mealsPerDay: result.mealsInWindow,
                }}
              />
            </div>

            <IFResult result={result} weightUnit={weight.unit} />
          </div>
        )}

        <div className="neumorph-card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding Intermittent Fasting
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting
              and eating. Rather than focusing on what you eat, IF emphasizes when you eat. This
              approach has gained popularity due to its potential benefits for weight loss,
              metabolic health, and longevity.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Popular Fasting Protocols
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-700 dark:text-gray-300">
                <strong className="text-primary-600 dark:text-primary-400">16:8 Method:</strong>{' '}
                Fast for 16 hours, eat within an 8-hour window. Most beginner-friendly and
                sustainable long-term.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong className="text-primary-600 dark:text-primary-400">18:6 Method:</strong>{' '}
                Extended fasting window for enhanced autophagy and fat burning. Intermediate
                difficulty.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong className="text-primary-600 dark:text-primary-400">
                  20:4 Warrior Diet:
                </strong>{' '}
                Very restricted eating window. Advanced protocol requiring careful meal planning.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong className="text-primary-600 dark:text-primary-400">OMAD:</strong> One meal a
                day within a 1-hour window. Maximum simplicity but requires experience.
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                <strong className="text-primary-600 dark:text-primary-400">5:2 Diet:</strong> Eat
                normally 5 days, restrict to 500-600 calories on 2 non-consecutive days. Flexible
                approach.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Science-Backed Benefits
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Improved insulin sensitivity and blood sugar control</li>
              <li>Enhanced autophagy (cellular cleanup and repair)</li>
              <li>Increased fat oxidation and metabolic flexibility</li>
              <li>Reduced inflammation markers</li>
              <li>Potential longevity and anti-aging effects</li>
              <li>Simplified eating schedule and meal planning</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Who Should Avoid IF
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Intermittent fasting is not suitable for everyone. Avoid IF if you are pregnant,
              breastfeeding, under 18, have a history of eating disorders, are underweight, have
              Type 1 diabetes (without medical supervision), or are taking medications requiring
              food intake. Always consult with a healthcare provider before starting any fasting
              regimen.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              Tips for Success
            </h3>
            <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
              <li>Start with 16:8 and gradually extend fasting windows as you adapt</li>
              <li>
                Stay hydrated during fasting periods with water, black coffee, or unsweetened tea
              </li>
              <li>Break your fast with nutrient-dense whole foods, not processed junk</li>
              <li>
                Listen to your body and adjust timing based on hunger signals and energy levels
              </li>
              <li>Combine with resistance training for optimal body composition results</li>
              <li>Track your progress but focus on how you feel, not just the scale</li>
            </ol>
          </div>
        </div>
      </div>
    </CalculatorPageLayout>
  );
}
