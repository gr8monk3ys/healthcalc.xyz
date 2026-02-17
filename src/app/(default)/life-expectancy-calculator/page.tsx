'use client';

import React, { useState, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'LifeExpectancyCalculator' });
import { calculateLifeExpectancy } from '@/utils/calculators/lifeExpectancy';
import {
  LifeExpectancyResult,
  LifeExpectancyFormValues,
  SmokingStatus,
  AlcoholIntake,
  ExerciseFrequency,
  DietQuality,
  StressLevel,
  SocialConnection,
} from '@/types/lifeExpectancy';
import { validateAge, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import LifeExpectancyResultDisplay from '@/components/calculators/lifeExpectancy/LifeExpectancyResult';
import SaveResult from '@/components/SaveResult';

const CHRONIC_CONDITIONS = [
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'heart-disease', label: 'Heart Disease' },
  { value: 'cancer', label: 'Cancer' },
  { value: 'copd', label: 'COPD' },
  { value: 'kidney-disease', label: 'Kidney Disease' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'depression', label: 'Depression' },
];

// FAQ data for Life Expectancy calculator
const faqs = [
  {
    question: 'How accurate is a life expectancy calculator?',
    answer:
      'Life expectancy calculators provide rough estimates based on population-level data from epidemiological studies. They cannot account for individual genetics, access to healthcare, future medical breakthroughs, or random events. Think of the result as a statistical average for someone with your lifestyle profile, not a personal prediction. The value lies in identifying which lifestyle factors have the biggest impact on longevity so you can make informed decisions.',
  },
  {
    question: 'Which lifestyle factor has the greatest impact on lifespan?',
    answer:
      'Smoking is consistently identified as the single largest modifiable risk factor for premature death. Heavy smokers lose an average of 10-13 years of life expectancy compared to non-smokers. After smoking, physical inactivity and poor diet are the next most impactful factors. A landmark 2018 study in Circulation found that adopting five healthy habits (never smoking, maintaining a healthy BMI, regular exercise, moderate alcohol, and a healthy diet) could extend life expectancy by 12-14 years.',
  },
  {
    question: 'Can improving my lifestyle actually add years to my life?',
    answer:
      'Yes, research consistently shows that lifestyle changes at any age can improve longevity. Quitting smoking before age 40 recovers nearly all the lost life expectancy. Starting regular exercise in middle age reduces cardiovascular mortality by 35-50%. Even modest dietary improvements, like adding more fruits and vegetables, are associated with measurable gains. The earlier you make changes the better, but it is never too late to benefit.',
  },
  {
    question: 'What is health age and how does it differ from chronological age?',
    answer:
      'Health age (also called biological age) reflects how old your body acts based on your lifestyle and health markers, as opposed to your chronological age measured in calendar years. Someone who is 45 years old but exercises regularly, eats well, and does not smoke might have a health age of 38, meaning their body functions more like a typical 38-year-old. Conversely, a sedentary 45-year-old smoker might have a health age of 55. The gap between health age and chronological age highlights areas where lifestyle changes could make the biggest difference.',
  },
  {
    question: 'How do chronic conditions affect life expectancy?',
    answer:
      'Chronic conditions can significantly reduce life expectancy, but the impact varies by condition and how well it is managed. Heart disease and diabetes each reduce life expectancy by 5-8 years on average. However, well-controlled conditions with proper medication, lifestyle management, and regular medical care have a much smaller impact than uncontrolled disease. Multiple chronic conditions compound the effect. If you have a chronic condition, working closely with your doctor to manage it is one of the most important steps you can take.',
  },
  {
    question: 'Why do social connections matter for longevity?',
    answer:
      'A large meta-analysis published in PLoS Medicine found that social isolation increases mortality risk by 26%, comparable to smoking 15 cigarettes a day. Strong social connections reduce chronic stress, encourage healthier behaviors, provide emotional support during illness, and may directly influence immune function and inflammation. People with strong social networks tend to have lower rates of depression, heart disease, and cognitive decline. Maintaining friendships, family bonds, and community involvement is a genuine health intervention.',
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
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description:
      'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function LifeExpectancyCalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bmi, setBmi] = useState<number | ''>('');
  const [smokingStatus, setSmokingStatus] = useState<SmokingStatus>('never');
  const [alcoholIntake, setAlcoholIntake] = useState<AlcoholIntake>('none');
  const [exerciseFrequency, setExerciseFrequency] = useState<ExerciseFrequency>('moderate');
  const [dietQuality, setDietQuality] = useState<DietQuality>('average');
  const [sleepHours, setSleepHours] = useState<number | ''>('');
  const [stressLevel, setStressLevel] = useState<StressLevel>('moderate');
  const [familyHistoryLongevity, setFamilyHistoryLongevity] = useState<boolean>(false);
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [socialConnections, setSocialConnections] = useState<SocialConnection>('some');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    bmi?: string;
    sleepHours?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<LifeExpectancyResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // State for user-facing calculation errors
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Handle chronic condition checkbox toggle
  const handleConditionToggle = useCallback((condition: string) => {
    setChronicConditions(prev =>
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      // Validate form using validation utilities
      const newErrors: {
        age?: string;
        bmi?: string;
        sleepHours?: string;
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

      // Validate BMI
      if (isEmpty(bmi)) {
        newErrors.bmi = 'BMI is required';
      } else {
        const numBmi = Number(bmi);
        if (isNaN(numBmi) || numBmi < 10 || numBmi > 60) {
          newErrors.bmi = 'BMI must be between 10 and 60';
        }
      }

      // Validate sleep hours
      if (isEmpty(sleepHours)) {
        newErrors.sleepHours = 'Sleep hours is required';
      } else {
        const numSleep = Number(sleepHours);
        if (isNaN(numSleep) || numSleep < 3 || numSleep > 12) {
          newErrors.sleepHours = 'Sleep hours must be between 3 and 12';
        }
      }

      setErrors(newErrors);

      // If no errors, calculate life expectancy
      if (Object.keys(newErrors).length === 0) {
        try {
          const formValues: LifeExpectancyFormValues = {
            age: Number(age),
            gender,
            bmi: Number(bmi),
            smokingStatus,
            alcoholIntake,
            exerciseFrequency,
            dietQuality,
            sleepHours: Number(sleepHours),
            stressLevel,
            familyHistoryLongevity,
            chronicConditions,
            socialConnections,
          };

          const lifeExpectancyResult = calculateLifeExpectancy(formValues);
          setResult(lifeExpectancyResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('life-expectancy-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating life expectancy', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [
      age,
      gender,
      bmi,
      smokingStatus,
      alcoholIntake,
      exerciseFrequency,
      dietQuality,
      sleepHours,
      stressLevel,
      familyHistoryLongevity,
      chronicConditions,
      socialConnections,
    ]
  );

  // Reset form
  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    setBmi('');
    setSmokingStatus('never');
    setAlcoholIntake('none');
    setExerciseFrequency('moderate');
    setDietQuality('average');
    setSleepHours('');
    setStressLevel('moderate');
    setFamilyHistoryLongevity(false);
    setChronicConditions([]);
    setSocialConnections('some');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Life Expectancy Calculator"
      description="Estimate your life expectancy based on lifestyle factors including diet, exercise, smoking, sleep, stress, social connections, and chronic conditions. Get personalized recommendations to improve your longevity."
      calculatorSlug="life-expectancy-calculator"
      shareTitle="Life Expectancy Calculator | Estimate Your Lifespan"
      shareDescription="Estimate your life expectancy based on lifestyle factors and get personalized recommendations to improve your longevity."
      shareHashtags={['lifeexpectancy', 'longevity', 'health', 'wellness']}
      relatedArticles={blogArticles}
      faqs={faqs}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Life Expectancy Calculator',
        description:
          'Estimate your life expectancy based on lifestyle factors including diet, exercise, smoking, sleep, and chronic conditions.',
        url: 'https://www.healthcalc.xyz/life-expectancy-calculator',
      }}
      showResultsCapture={showResult}
    >
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="neumorph p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold mb-4">Estimate Your Life Expectancy</h2>

          {/* Age and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={e => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.age ? 'border border-red-500' : ''
                }`}
                placeholder="Enter your age"
                min="1"
                max="120"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={e => setGender(e.target.value as 'male' | 'female')}
                className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* BMI */}
          <div>
            <label htmlFor="bmi" className="block text-sm font-medium mb-1">
              BMI (Body Mass Index)
            </label>
            <input
              type="number"
              id="bmi"
              value={bmi}
              onChange={e => setBmi(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.bmi ? 'border border-red-500' : ''
              }`}
              placeholder="Enter your BMI (e.g. 22.5)"
              step="0.1"
              min="10"
              max="60"
            />
            {errors.bmi && <p className="text-red-500 text-sm mt-1">{errors.bmi}</p>}
            <p className="text-xs text-gray-600 mt-1">
              Not sure of your BMI? Use our BMI calculator first.
            </p>
          </div>

          {/* Smoking Status */}
          <div>
            <label htmlFor="smokingStatus" className="block text-sm font-medium mb-1">
              Smoking Status
            </label>
            <select
              id="smokingStatus"
              value={smokingStatus}
              onChange={e => setSmokingStatus(e.target.value as SmokingStatus)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="never">Never Smoked</option>
              <option value="former">Former Smoker</option>
              <option value="current-light">Current Smoker (Light)</option>
              <option value="current-heavy">Current Smoker (Heavy)</option>
            </select>
          </div>

          {/* Alcohol Intake */}
          <div>
            <label htmlFor="alcoholIntake" className="block text-sm font-medium mb-1">
              Alcohol Intake
            </label>
            <select
              id="alcoholIntake"
              value={alcoholIntake}
              onChange={e => setAlcoholIntake(e.target.value as AlcoholIntake)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="none">None</option>
              <option value="light">Light (1-7 drinks/week)</option>
              <option value="moderate">Moderate (8-14 drinks/week)</option>
              <option value="heavy">Heavy (15+ drinks/week)</option>
            </select>
          </div>

          {/* Exercise Frequency */}
          <div>
            <label htmlFor="exerciseFrequency" className="block text-sm font-medium mb-1">
              Exercise Frequency
            </label>
            <select
              id="exerciseFrequency"
              value={exerciseFrequency}
              onChange={e => setExerciseFrequency(e.target.value as ExerciseFrequency)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="sedentary">Sedentary (little to no exercise)</option>
              <option value="light">Light (1-2 days/week)</option>
              <option value="moderate">Moderate (3-4 days/week)</option>
              <option value="active">Active (5-6 days/week)</option>
              <option value="very-active">Very Active (daily intense exercise)</option>
            </select>
          </div>

          {/* Diet Quality */}
          <div>
            <label htmlFor="dietQuality" className="block text-sm font-medium mb-1">
              Diet Quality
            </label>
            <select
              id="dietQuality"
              value={dietQuality}
              onChange={e => setDietQuality(e.target.value as DietQuality)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="poor">Poor (high processed food, low fruits/vegetables)</option>
              <option value="average">Average (mixed diet)</option>
              <option value="good">Good (mostly whole foods)</option>
              <option value="excellent">Excellent (Mediterranean/plant-rich diet)</option>
            </select>
          </div>

          {/* Sleep Hours */}
          <div>
            <label htmlFor="sleepHours" className="block text-sm font-medium mb-1">
              Average Sleep (hours per night)
            </label>
            <input
              type="number"
              id="sleepHours"
              value={sleepHours}
              onChange={e => setSleepHours(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.sleepHours ? 'border border-red-500' : ''
              }`}
              placeholder="Enter average hours of sleep"
              step="0.5"
              min="3"
              max="12"
            />
            {errors.sleepHours && <p className="text-red-500 text-sm mt-1">{errors.sleepHours}</p>}
          </div>

          {/* Stress Level */}
          <div>
            <label htmlFor="stressLevel" className="block text-sm font-medium mb-1">
              Stress Level
            </label>
            <select
              id="stressLevel"
              value={stressLevel}
              onChange={e => setStressLevel(e.target.value as StressLevel)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="very-high">Very High</option>
            </select>
          </div>

          {/* Family History of Longevity */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={familyHistoryLongevity}
                onChange={e => setFamilyHistoryLongevity(e.target.checked)}
                className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
              />
              <span className="text-sm font-medium">Family History of Longevity</span>
            </label>
            <p className="text-xs text-gray-600 mt-1 ml-6">
              Check if close relatives (parents, grandparents) lived past 85
            </p>
          </div>

          {/* Chronic Conditions */}
          <div>
            <fieldset>
              <legend className="block text-sm font-medium mb-2">
                Chronic Conditions (select all that apply)
              </legend>
              <div className="neumorph-inset p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHRONIC_CONDITIONS.map(condition => (
                  <label key={condition.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chronicConditions.includes(condition.value)}
                      onChange={() => handleConditionToggle(condition.value)}
                      className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
                    />
                    <span className="text-sm">{condition.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Social Connections */}
          <div>
            <label htmlFor="socialConnections" className="block text-sm font-medium mb-1">
              Social Connections
            </label>
            <select
              id="socialConnections"
              value={socialConnections}
              onChange={e => setSocialConnections(e.target.value as SocialConnection)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="isolated">Isolated (few or no close relationships)</option>
              <option value="some">Some (a few close friends/family)</option>
              <option value="strong">Strong (active social life and community)</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Calculate Life Expectancy
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Reset
            </button>
          </div>
        </form>

        {calculationError && (
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-red-500">
            <p className="text-red-600">{calculationError}</p>
          </div>
        )}

        {showResult && result && (
          <div className="space-y-6">
            <LifeExpectancyResultDisplay result={result} />

            <SaveResult
              calculatorType="life-expectancy-calculator"
              calculatorName="Life Expectancy Calculator"
              data={{
                estimatedLifeExpectancy: result.estimatedLifeExpectancy,
                healthAge: result.healthAge,
                remainingYears: result.remainingYears,
                netEffect: result.netEffect,
                percentileRank: result.percentileRank,
              }}
            />

            <div className="neumorph p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Understanding Your Results</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Estimated Life Expectancy:</strong> Your projected lifespan based on
                  current lifestyle factors compared to CDC baseline data for your gender. This is a
                  statistical estimate, not a prediction.
                </p>
                <p>
                  <strong>Health Age:</strong> Reflects how old your body effectively acts based on
                  your habits. A health age lower than your chronological age means your lifestyle
                  is working in your favor.
                </p>
                <p>
                  <strong>Percentile Rank:</strong> Shows where you fall compared to the general
                  population. A rank of 70 means you are projected to outlive 70% of people your age
                  and gender.
                </p>
                <p>
                  <strong>Lifestyle Factors:</strong> Each factor is based on large-scale
                  epidemiological studies. The years gained or lost represent average effects across
                  populations and may differ for individuals.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
