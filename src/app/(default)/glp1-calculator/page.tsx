'use client';

import React, { useState, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'GLP1Calculator' });
import { processGLP1Calculation } from '@/utils/calculators/glp1Calculator';
import { GLP1Result, GLP1Medication, GLP1Goal } from '@/types/glp1Calculator';
import { Gender, ActivityLevel } from '@/types/common';
import { validateWeight, validateHeight, validateAge, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import GLP1ResultDisplay from '@/components/calculators/glp1Calculator/GLP1Result';
import SaveResult from '@/components/SaveResult';
import { MEDICATION_LABELS, GOAL_LABELS, ACTIVITY_LABELS } from '@/constants/glp1Calculator';
import { useWeight, useHeight } from '@/hooks/useCalculatorUnits';

// FAQ data for GLP-1 calculator
const faqs = [
  {
    question: 'How many calories should I eat on Ozempic or Wegovy?',
    answer:
      'Most people on semaglutide (Ozempic/Wegovy) naturally eat 20-35% fewer calories due to reduced appetite. For safe weight loss, women should not go below 1,200 calories per day and men should not go below 1,500 calories per day. This calculator factors in your medication, body stats, and activity level to give you a personalized calorie target. Work with your healthcare provider to find the right balance between weight loss pace and adequate nutrition.',
  },
  {
    question: 'Why is protein so important on GLP-1 medications?',
    answer:
      'Research shows that 25-40% of weight lost on GLP-1 medications can be lean muscle mass rather than fat. Eating adequate protein (1.2-2.0g per kg body weight, depending on your goal) helps preserve muscle during weight loss. Muscle preservation is critical for maintaining your metabolic rate, functional strength, and long-term weight maintenance. Aim for 30-40g of protein at each meal and prioritize protein-rich foods first when your appetite is reduced.',
  },
  {
    question: 'What is the difference between semaglutide and tirzepatide?',
    answer:
      'Semaglutide (Ozempic, Wegovy) is a GLP-1 receptor agonist that reduces appetite by ~25%. Tirzepatide (Mounjaro, Zepbound) is a dual GIP/GLP-1 receptor agonist that reduces appetite by ~30% and typically produces greater weight loss in clinical trials. Both medications are weekly injections. Tirzepatide showed average weight loss of 15-22.5% of body weight in the SURMOUNT-1 trial, compared to about 15% with semaglutide in the STEP 1 trial. Your doctor will recommend the best option based on your health profile.',
  },
  {
    question: 'How much water should I drink on GLP-1 medications?',
    answer:
      'You should drink at least 2 liters (about 8 cups) of water daily, and ideally 0.033 liters per kilogram of body weight. GLP-1 medications can cause nausea, vomiting, and diarrhea, all of which increase dehydration risk. Adequate hydration also supports kidney function, helps manage constipation (a common side effect), and can reduce nausea severity. Sip water throughout the day rather than drinking large amounts at once, which can worsen nausea.',
  },
  {
    question: 'Should I exercise while taking GLP-1 medications?',
    answer:
      'Yes, resistance training 2-3 times per week is strongly recommended while on GLP-1 therapy. Because these medications can cause muscle loss alongside fat loss, strength training is one of the most effective strategies to preserve lean mass. Combine resistance exercise with adequate protein intake for the best results. Start with moderate intensity and increase gradually, especially during the dose titration phase when side effects may be more prominent. Walking and light cardio are also beneficial for overall health.',
  },
  {
    question: 'Is this calculator a substitute for medical advice?',
    answer:
      'No. This calculator provides general nutrition guidance based on published research and clinical trial data. It does not replace advice from your prescribing physician, endocrinologist, or registered dietitian. Every individual responds differently to GLP-1 medications, and your specific health conditions, other medications, and medical history all affect the right nutrition plan for you. Use these results as a starting point for conversations with your healthcare team.',
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

export default function GLP1Calculator() {
  // State for form inputs
  const weight = useWeight();
  const height = useHeight();
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const [medication, setMedication] = useState<GLP1Medication>('semaglutide');
  const [goal, setGoal] = useState<GLP1Goal>('weight-loss');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');

  // State for form validation
  const [errors, setErrors] = useState<{
    weight?: string;
    height?: string;
    age?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<GLP1Result | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // State for user-facing calculation errors
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      // Validate form using validation utilities
      const newErrors: {
        weight?: string;
        height?: string;
        age?: string;
      } = {};

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

      // Validate height
      const heightCm = height.toCm();
      if (isEmpty(height.value) || heightCm === null) {
        newErrors.height = 'Height is required';
      } else {
        const heightValidation = validateHeight(heightCm, 'metric');
        if (!heightValidation.isValid) {
          newErrors.height = heightValidation.error;
        }
      }

      // Validate age
      if (isEmpty(age)) {
        newErrors.age = 'Age is required';
      } else {
        const ageValidation = validateAge(age);
        if (!ageValidation.isValid) {
          newErrors.age = ageValidation.error;
        } else if (Number(age) < 18) {
          newErrors.age = 'GLP-1 medications are typically prescribed for adults 18 and older';
        }
      }

      setErrors(newErrors);

      // Get converted values
      const weightKg = weight.toKg();

      // If no errors, calculate
      if (Object.keys(newErrors).length === 0 && weightKg !== null && heightCm !== null) {
        try {
          const glp1Result = processGLP1Calculation({
            weight: weightKg,
            height: heightCm,
            age: Number(age),
            gender,
            medication,
            goal,
            activityLevel,
          });

          setResult(glp1Result);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('glp1-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating GLP-1 nutrition targets', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [weight, height, age, gender, medication, goal, activityLevel]
  );

  // Reset form
  const handleReset = useCallback(() => {
    weight.setValue('');
    height.setValue('');
    setAge('');
    setGender('male');
    setMedication('semaglutide');
    setGoal('weight-loss');
    setActivityLevel('sedentary');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [weight, height]);

  return (
    <CalculatorPageLayout
      title="GLP-1 Weight Loss Calculator"
      description="Calculate personalized calorie, protein, and hydration targets while on GLP-1 medications like Ozempic, Wegovy, Mounjaro, or Zepbound. Get evidence-based nutrition recommendations to maximize fat loss and preserve muscle."
      calculatorSlug="glp1-calculator"
      shareTitle="GLP-1 Weight Loss Calculator | Nutrition Targets for Ozempic, Wegovy & Mounjaro"
      shareDescription="Calculate personalized nutrition targets while on GLP-1 medications. Get protein, calorie, and hydration recommendations based on your medication and goals."
      shareHashtags={['GLP1', 'Ozempic', 'Wegovy', 'Mounjaro', 'weightloss']}
      relatedArticles={blogArticles}
      faqs={faqs}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GLP-1 Weight Loss Calculator',
        description:
          'Calculate personalized nutrition targets while on GLP-1 medications like Ozempic, Wegovy, Mounjaro, or Zepbound.',
        url: 'https://www.healthcalc.xyz/glp1-calculator',
      }}
      showResultsCapture={showResult}
    >
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="neumorph p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold mb-4">Calculate Your GLP-1 Nutrition Targets</h2>

          {/* Weight Field */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium mb-1">
              Body Weight
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex">
              <input
                type="number"
                id="weight"
                value={weight.value}
                onChange={e =>
                  weight.setValue(e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                className={`w-full p-3 neumorph-inset rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.weight ? 'border border-red-500' : ''
                }`}
                placeholder={weight.placeholder}
                step="0.1"
                min="1"
                max="600"
              />
              <button
                type="button"
                onClick={weight.toggle}
                className="px-4 neumorph rounded-r-lg hover:shadow-neumorph-inset transition-all"
                aria-label={`Toggle weight unit, currently ${weight.unit}`}
              >
                {weight.unit}
              </button>
            </div>
            {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
          </div>

          {/* Height Field */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium mb-1">
              Height
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex">
              <input
                type="number"
                id="height"
                value={height.value}
                onChange={e =>
                  height.setValue(e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                className={`w-full p-3 neumorph-inset rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.height ? 'border border-red-500' : ''
                }`}
                placeholder={height.placeholder}
                step="0.1"
                min="1"
                max="300"
              />
              <button
                type="button"
                onClick={height.toggle}
                className="px-4 neumorph rounded-r-lg hover:shadow-neumorph-inset transition-all"
                aria-label={`Toggle height unit, currently ${height.unit}`}
              >
                {height.unit}
              </button>
            </div>
            {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium mb-1">
              Age
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={e => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.age ? 'border border-red-500' : ''
              }`}
              placeholder="Enter age (18-100)"
              min="18"
              max="100"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Gender Select */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              Biological Sex
            </label>
            <select
              id="gender"
              value={gender}
              onChange={e => setGender(e.target.value as Gender)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Medication Select */}
          <div>
            <label htmlFor="medication" className="block text-sm font-medium mb-1">
              GLP-1 Medication
            </label>
            <select
              id="medication"
              value={medication}
              onChange={e => setMedication(e.target.value as GLP1Medication)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {Object.entries(MEDICATION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Goal Select */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium mb-1">
              Primary Goal
            </label>
            <select
              id="goal"
              value={goal}
              onChange={e => setGoal(e.target.value as GLP1Goal)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {Object.entries(GOAL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Level Select */}
          <div>
            <label htmlFor="activityLevel" className="block text-sm font-medium mb-1">
              Activity Level
            </label>
            <select
              id="activityLevel"
              value={activityLevel}
              onChange={e => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {Object.entries(ACTIVITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Calculate Nutrition Targets
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
            <GLP1ResultDisplay result={result} medication={medication} goal={goal} />

            <SaveResult
              calculatorType="glp1-calculator"
              calculatorName="GLP-1 Weight Loss Calculator"
              data={{
                adjustedCalories: result.adjustedCalories,
                proteinRange: `${result.proteinMinGrams}-${result.proteinMaxGrams}g`,
                fatGrams: result.fatGrams,
                carbGrams: result.carbGrams,
                hydrationLiters: result.hydrationLiters,
                tdee: result.tdee,
              }}
            />

            <div className="neumorph p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Understanding Your Results</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Adjusted Calories:</strong> Your baseline TDEE (Total Daily Energy
                  Expenditure) reduced by the typical appetite suppression effect of your GLP-1
                  medication. This represents what you are likely eating naturally while on the
                  medication, and serves as a target to ensure adequate nutrition.
                </p>
                <p>
                  <strong>Protein Target:</strong> The recommended protein range is based on
                  published guidelines for GLP-1 therapy patients. Higher protein intake helps
                  preserve lean muscle mass during weight loss. Aim to distribute protein evenly
                  across meals (30-40g per meal).
                </p>
                <p>
                  <strong>Hydration:</strong> GLP-1 medications commonly cause gastrointestinal side
                  effects that increase fluid loss. Meeting your hydration target helps manage
                  nausea, prevent constipation, and support kidney function.
                </p>
                <p>
                  <strong>Expected Weight Loss:</strong> The range shown is based on clinical trial
                  data for your medication. Individual results vary significantly based on dosage,
                  adherence, diet quality, exercise habits, and genetic factors.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
