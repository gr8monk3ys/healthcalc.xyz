'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';
import dynamic from 'next/dynamic';
import { ActivityLevel, Gender } from '@/types/common';
import { TrainingExperience, RecompGoal } from '@/types/bodyRecomposition';
import { calculateBodyRecomposition } from '@/utils/calculators/bodyRecomposition';
import { TRAINING_EXPERIENCE_OPTIONS, RECOMP_GOAL_OPTIONS } from '@/constants/bodyRecomposition';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import {
  validateAge,
  validateHeight,
  validateWeight,
  validateBodyFatPercentage,
  isEmpty,
} from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BodyRecompResult from '@/components/calculators/bodyRecomposition/BodyRecompResult';
import SaveResult from '@/components/SaveResult';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

const logger = createLogger({ component: 'BodyRecompositionCalculator' });

// Dynamic imports for below-the-fold components
const BodyRecompInfo = dynamic(
  () => import('@/components/calculators/bodyRecomposition/BodyRecompInfo')
);

// FAQ data
const faqs = [
  {
    question: 'What is body recomposition and how does it work?',
    answer:
      'Body recomposition (recomp) is the process of losing fat while simultaneously building muscle, rather than focusing on weight loss alone. It works by strategically managing calories and macros through calorie cycling: eating at a slight surplus on training days to fuel muscle growth, and a deficit on rest days to promote fat loss. This approach requires progressive resistance training 3-5x/week, high protein intake (1g per lb bodyweight), and patience - visible results typically take 8-12 weeks. Recomp is most effective for beginners with higher body fat (15-25%), who have greater potential for muscle growth and fat loss. The key is consistency with training and nutrition while maintaining a small calorie balance that averages near maintenance over the week.',
  },
  {
    question: 'Who should do body recomposition vs traditional bulking/cutting?',
    answer:
      'Body recomposition is ideal for: beginners (less than 1 year training) who can gain muscle easily, individuals at moderate body fat (15-25% for men, 23-35% for women) looking to improve body composition without dramatic weight changes, people who want sustainable lifestyle changes rather than aggressive diets, and those returning after training breaks. Traditional bulk/cut cycles work better for: advanced lifters who have maximized beginner gains, very lean individuals (under 12% BF men, 20% women) needing a surplus to build muscle, competitive bodybuilders with specific stage deadlines, and people comfortable with weight fluctuations. Recomp requires more precise tracking and patience but produces more sustainable results. If you are over 25% body fat (men) or 35% (women), consider focusing on fat loss first before recomping.',
  },
  {
    question: 'How does calorie cycling work for body recomposition?',
    answer:
      'Calorie cycling alternates between higher calories on training days and lower calories on rest days to simultaneously support muscle growth and fat loss. On training days (typically 4 days/week), eat 10-15% above maintenance to fuel performance, maximize muscle protein synthesis, and support recovery. On rest days (3 days/week), eat 15-20% below maintenance to create a fat loss deficit while preserving muscle. This creates a small weekly calorie deficit or balance that promotes fat loss without sacrificing muscle gains. Pair this with high protein (1g per lb bodyweight) at every meal, 25% calories from healthy fats for hormones, and carbs primarily around training for energy. The cycling approach works because muscle building happens during and after training (24-48 hours), while fat loss can occur on rest days when energy demands are lower.',
  },
  {
    question: 'How much protein do I need for body recomposition?',
    answer:
      'For body recomposition, aim for 1g protein per pound of bodyweight (or 2.2g per kg) daily, which is higher than typical recommendations. This amount maximizes muscle protein synthesis while preventing muscle breakdown during the calorie deficit on rest days. Distribute protein across 3-5 meals with 25-40g per meal for optimal absorption. High protein also increases satiety (helps you feel full), has a higher thermic effect (burns more calories during digestion at 20-30% vs 5-10% for carbs/fats), and preserves lean mass during fat loss. Protein sources: lean meats, fish, eggs, Greek yogurt, cottage cheese, protein powder. If you are over 30% body fat, calculate protein based on target body weight rather than current weight to avoid excessive protein intake. Most research shows no harm from high protein in healthy individuals, but stay hydrated.',
  },
  {
    question: 'What training program should I follow for body recomposition?',
    answer:
      'For optimal body recomposition, follow a progressive resistance training program 3-5x/week focused on compound movements: squats, deadlifts, bench press, overhead press, rows, and pull-ups. These exercises recruit the most muscle mass and create the greatest stimulus for growth. Train each muscle group 2-3x per week with 3-4 sets of 6-12 reps per exercise, progressively increasing weight or reps each week. Beginners: 3-4 days, full-body or upper/lower split. Intermediate: 4-5 days, push/pull/legs or upper/lower split. Advanced: 4-6 days, PPL or body part split. Add 2-3 HIIT cardio sessions on rest days if cutting aggressively. Prioritize strength gains - if you are getting stronger, you are building muscle. Rest 48 hours between training the same muscle group. Track workouts to ensure progressive overload, which is the key driver of muscle growth.',
  },
  {
    question: 'How long does body recomposition take to see results?',
    answer:
      'Visible body recomposition results typically take 8-16 weeks, though individual timelines vary significantly. Week 1-4: strength increases, better gym performance, clothing fits differently (often muscle swelling). Week 4-8: visible fat loss in waist/hips, muscle definition emerging, scale weight may stay similar. Week 8-12: noticeable muscle growth, clear reduction in body fat, friends comment on physique changes. Week 12-16: significant body composition improvements, potentially 5-10 lbs fat lost and 3-6 lbs muscle gained (beginners). Progress depends on: training experience (beginners see faster changes), current body fat (higher BF loses fat faster), consistency with diet and training, sleep and stress management (7-9 hours sleep crucial), and genetics (some respond faster). Track progress with photos, measurements (waist, chest, arms, thighs), and strength gains rather than just scale weight. Recomp shows better in measurements and appearance than weight alone.',
  },
];

// Related articles
const blogArticles = [
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description:
      'Understanding your Total Daily Energy Expenditure is crucial for body recomposition success.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description:
      'Learn what body fat percentage ranges are healthy and optimal for recomposition goals.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function BodyRecompositionCalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const height = useHeight();
  const weight = useWeight();
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | ''>('');
  const [trainingExperience, setTrainingExperience] = useState<TrainingExperience>('intermediate');
  const [goal, setGoal] = useState<RecompGoal>('lose-fat-build-muscle');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    bodyFatPercentage?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<{
    dailyCalories: number;
    proteinGrams: number;
    fatGrams: number;
    carbGrams: number;
    trainingDayCalories: number;
    restDayCalories: number;
    estimatedWeeklyFatLoss: number;
    estimatedMonthlyMuscleGain: number;
    timelineWeeks: number;
    recommendation: string;
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

      // Validate body fat percentage
      if (isEmpty(bodyFatPercentage)) {
        newErrors.bodyFatPercentage = 'Body fat percentage is required';
      } else {
        const bfValidation = validateBodyFatPercentage(bodyFatPercentage);
        if (!bfValidation.isValid) {
          newErrors.bodyFatPercentage = bfValidation.error;
        }
      }

      setErrors(newErrors);

      // Get converted values
      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      // If no errors, calculate
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null &&
        typeof bodyFatPercentage === 'number'
      ) {
        try {
          const calcResult = calculateBodyRecomposition({
            age,
            gender,
            weight: weight.unit === 'kg' ? weightKg : (weight.value as number),
            weightUnit: weight.unit,
            heightCm: height.unit === 'cm' ? (height.value as number) : 0,
            heightFt: height.unit === 'ft' ? Math.floor(height.value as number) : 0,
            heightIn: height.unit === 'ft' ? Math.round(((height.value as number) % 1) * 12) : 0,
            heightUnit: height.unit,
            activityLevel,
            bodyFatPercentage,
            trainingExperience,
            goal,
            useMetric: weight.unit === 'kg',
          });

          setResult(calcResult);
          setShowResult(true);

          // Scroll to result
          setTimeout(() => {
            const resultElement = document.getElementById('recomp-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating body recomposition', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, height, weight, activityLevel, bodyFatPercentage, trainingExperience, goal]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    height.setValue('');
    weight.setValue('');
    setActivityLevel('moderately_active');
    setBodyFatPercentage('');
    setTrainingExperience('intermediate');
    setGoal('lose-fat-build-muscle');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  // Form fields - memoized for performance
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
        name: 'bodyFatPercentage',
        label: 'Body Fat Percentage',
        type: 'number' as const,
        value: bodyFatPercentage,
        onChange: setBodyFatPercentage,
        error: errors.bodyFatPercentage,
        placeholder: '%',
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
        name: 'trainingExperience',
        label: 'Training Experience',
        type: 'select' as const,
        value: trainingExperience,
        onChange: (value: string) => setTrainingExperience(value as TrainingExperience),
        options: TRAINING_EXPERIENCE_OPTIONS,
      },
      {
        name: 'goal',
        label: 'Recomposition Goal',
        type: 'select' as const,
        value: goal,
        onChange: (value: string) => setGoal(value as RecompGoal),
        options: RECOMP_GOAL_OPTIONS,
      },
    ],
    [
      age,
      gender,
      height,
      weight,
      activityLevel,
      bodyFatPercentage,
      trainingExperience,
      goal,
      errors,
    ]
  );

  return (
    <CalculatorPageLayout
      title="Body Recomposition Calculator"
      description="Calculate your calorie cycling and macro targets to lose fat and build muscle simultaneously. Get personalized nutrition recommendations based on your training experience and goals."
      calculatorSlug="body-recomposition"
      shareTitle="Body Recomposition Calculator | Lose Fat & Build Muscle Simultaneously"
      shareDescription="Calculate your calorie cycling targets to lose fat and build muscle at the same time. Science-based approach for body recomposition success."
      shareHashtags={['bodyrecomp', 'losefatbuildmuscle', 'caloriecycling', 'fitness']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About Body Recomposition"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Body Recomposition Calculator',
        description:
          'Calculate calorie cycling and macro targets for body recomposition. Science-based approach to lose fat and build muscle simultaneously with personalized recommendations.',
        url: 'https://www.healthcalc.xyz/body-recomposition',
      }}
      understandingSection={<BodyRecompInfo />}
      newsletterDescription="Subscribe for evidence-based body recomposition strategies, training tips, and nutrition science delivered to your inbox."
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Enter Your Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />

        {calculationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-4">
            {calculationError}
          </div>
        )}
      </div>

      <div className="md:col-span-2" id="recomp-result">
        {showResult && result ? (
          <>
            <BodyRecompResult result={result} />

            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="body-recomposition"
                calculatorName="Body Recomposition Calculator"
                data={result}
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
          <div className="neumorph p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">What is Body Recomposition?</h2>
            <p className="mb-4">
              Body recomposition is the process of simultaneously losing fat and building muscle,
              rather than focusing solely on weight loss. This approach uses calorie cycling to fuel
              muscle growth on training days while promoting fat loss on rest days.
            </p>
            <p className="mb-4">
              This calculator provides personalized calorie and macro targets based on your training
              experience, body composition, and goals. You'll get specific recommendations for
              training days and rest days to optimize your body recomposition progress.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <h3 className="font-medium mb-2">Key Requirements for Success:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Consistent progressive resistance training 3-5x per week</li>
                <li>High protein intake (1g per lb bodyweight) daily</li>
                <li>Calorie cycling between training and rest days</li>
                <li>Adequate sleep (7-9 hours) for recovery</li>
                <li>Patience - visible results take 8-12 weeks</li>
              </ul>
            </div>
          </div>
        )}

        {showResult && result && (
          <AffiliateLinks
            calculatorType="body-recomposition"
            title="Tools to Support Your Body Recomposition"
            maxProducts={6}
            showDisclosure={true}
            className="my-8"
          />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
