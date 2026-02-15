'use client';

import React, { useState, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'CaffeineCalculator' });
import { processCaffeineCalculation } from '@/utils/calculators/caffeineCalculator';
import { CaffeineResult, CaffeineSource, SensitivityLevel } from '@/types/caffeineCalculator';
import { validateWeight, isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CaffeineResultDisplay from '@/components/calculators/caffeineCalculator/CaffeineResult';
import SaveResult from '@/components/SaveResult';
import {
  CAFFEINE_SOURCE_LABELS,
  CAFFEINE_CONTENT,
  SENSITIVITY_DESCRIPTIONS,
} from '@/constants/caffeineCalculator';
import { useWeight } from '@/hooks/useCalculatorUnits';

// FAQ data for Caffeine calculator
const faqs = [
  {
    question: 'How much caffeine is safe per day?',
    answer:
      'For healthy adults, the FDA recommends up to 400mg of caffeine per day (about 6mg per kg of body weight). This is roughly equivalent to 4 cups of coffee. However, individual tolerance varies significantly based on genetics, metabolism, body weight, and sensitivity. Pregnant women should limit intake to 200mg per day. People with anxiety disorders, heart conditions, or sleep issues may need to consume less. Children and adolescents should consume much less caffeine relative to their body weight. If you experience jitters, anxiety, rapid heart rate, or sleep disturbances, reduce your intake.',
  },
  {
    question: 'How long does caffeine stay in your system?',
    answer:
      'Caffeine has a half-life of 3-7 hours, averaging around 5 hours for most people. This means that after 5 hours, about half of the caffeine you consumed remains in your system. It takes approximately 5 half-lives (25 hours for average metabolism) for caffeine to be almost completely cleared from your body. Factors affecting clearance include genetics (CYP1A2 enzyme variants), age, liver function, pregnancy, smoking status, and medications. Slow metabolizers may feel caffeine effects for much longer, while fast metabolizers clear it quickly. To avoid sleep disruption, stop consuming caffeine at least 6 hours before bedtime.',
  },
  {
    question: 'What is the best time to take caffeine for a workout?',
    answer:
      'The optimal timing for pre-workout caffeine is 30-60 minutes before exercise. This allows caffeine to reach peak blood concentration, which occurs 45 minutes after consumption. The recommended dose for performance enhancement is 3-6mg per kg of body weight. For a 70kg (154lb) person, this is 210-420mg. Research shows caffeine improves endurance, power output, focus, and perceived exertion. Avoid taking caffeine too late in the day if you train in the evening, as it can disrupt sleep. If you are sensitive to caffeine, start with the lower end of the dose range (3mg/kg) and assess tolerance.',
  },
  {
    question: 'Can you build tolerance to caffeine?',
    answer:
      'Yes, regular caffeine consumption leads to tolerance, meaning you need more to achieve the same effects. Tolerance develops within 1-4 days of consistent use, primarily affecting alertness and blood pressure effects. However, performance-enhancing effects (for exercise) may remain even with regular use. To reset tolerance, take a 7-14 day caffeine break, though withdrawal symptoms (headaches, fatigue, irritability) typically occur for 2-9 days. Alternatively, cycle caffeine by using it strategically (only before important workouts or when truly needed) rather than consuming it daily. This helps maintain sensitivity and effectiveness.',
  },
  {
    question: 'What are the side effects of too much caffeine?',
    answer:
      'Excessive caffeine intake (above 400mg/day for most adults) can cause anxiety, jitteriness, rapid heart rate, insomnia, digestive issues, headaches, increased blood pressure, frequent urination, and muscle tremors. Very high doses (1000mg+) can lead to caffeine toxicity with symptoms including confusion, hallucinations, vomiting, chest pain, and irregular heartbeat. Chronic overconsumption may worsen anxiety disorders, contribute to bone loss (by reducing calcium absorption), and cause dependence with withdrawal symptoms. If you experience negative side effects, reduce intake gradually over several days to minimize withdrawal. Certain populations (pregnant women, children, people with heart conditions) should consume less caffeine.',
  },
  {
    question: 'Are coffee and energy drinks the same?',
    answer:
      "No. While both contain caffeine, they differ significantly. Coffee (8oz) contains ~95mg caffeine plus antioxidants and beneficial compounds. Energy drinks (8.4oz can) contain ~80mg caffeine plus high sugar content (often 27g+), artificial ingredients, and additional stimulants like taurine and guarana. Coffee is associated with health benefits (reduced risk of type 2 diabetes, liver disease, Parkinson's), while energy drinks are linked to increased heart rate, blood pressure spikes, and potential cardiovascular issues, especially when combined with alcohol. Energy drinks also cause rapid blood sugar spikes followed by crashes. For sustained energy, black coffee or tea is a healthier choice than sugar-laden energy drinks.",
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

export default function CaffeineCalculator() {
  // State for form inputs
  const weight = useWeight();
  const [sources, setSources] = useState<Array<{ source: CaffeineSource; servings: number }>>([
    { source: 'coffee', servings: 2 },
  ]);
  const [sensitivityLevel, setSensitivityLevel] = useState<SensitivityLevel>('normal');
  const [preWorkoutTiming, setPreWorkoutTiming] = useState<boolean>(false);

  // State for form validation
  const [errors, setErrors] = useState<{
    weight?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<CaffeineResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // State for user-facing calculation errors
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Handle adding a new caffeine source
  const handleAddSource = useCallback(() => {
    if (sources.length < 8) {
      setSources([...sources, { source: 'coffee', servings: 1 }]);
    }
  }, [sources]);

  // Handle removing a caffeine source
  const handleRemoveSource = useCallback(
    (index: number) => {
      if (sources.length > 1) {
        const newSources = sources.filter((_, i) => i !== index);
        setSources(newSources);
      }
    },
    [sources]
  );

  // Handle updating a caffeine source
  const handleUpdateSource = useCallback(
    (index: number, field: 'source' | 'servings', value: CaffeineSource | number) => {
      const newSources = [...sources];
      if (field === 'source') {
        newSources[index].source = value as CaffeineSource;
      } else {
        newSources[index].servings = value as number;
      }
      setSources(newSources);
    },
    [sources]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      // Validate form using validation utilities
      const newErrors: {
        weight?: string;
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

      setErrors(newErrors);

      // Get converted values
      const weightKg = weight.toKg();

      // If no errors, calculate caffeine intake
      if (Object.keys(newErrors).length === 0 && weightKg !== null) {
        try {
          // Process calculation
          const caffeineResult = processCaffeineCalculation({
            weight: weightKg,
            weightUnit: 'kg',
            sources,
            sensitivityLevel,
            preWorkoutTiming,
          });

          setResult(caffeineResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('caffeine-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating caffeine intake', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [weight, sources, sensitivityLevel, preWorkoutTiming]
  );

  // Reset form
  const handleReset = useCallback(() => {
    weight.setValue('');
    setSources([{ source: 'coffee', servings: 2 }]);
    setSensitivityLevel('normal');
    setPreWorkoutTiming(false);
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [weight]);

  return (
    <CalculatorPageLayout
      title="Caffeine Intake Calculator"
      description="Calculate your daily caffeine intake from coffee, tea, energy drinks, and more. Get personalized recommendations for safe limits and optimal pre-workout dosing based on your body weight and metabolism."
      calculatorSlug="caffeine-calculator"
      shareTitle="Caffeine Intake Calculator | Daily Caffeine Tracker & Pre-Workout Dose"
      shareDescription="Track your daily caffeine intake and discover your safe limit. Calculate optimal pre-workout caffeine dose based on body weight and sensitivity."
      shareHashtags={['caffeine', 'preworkout', 'coffee', 'nutrition']}
      relatedArticles={blogArticles}
      faqs={faqs}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Caffeine Intake Calculator',
        description:
          'Calculate your daily caffeine intake from coffee, tea, energy drinks, and more.',
        url: 'https://www.healthcalc.xyz/caffeine-calculator',
      }}
      showResultsCapture={showResult}
    >
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="neumorph p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold mb-4">Calculate Your Caffeine Intake</h2>

          {/* Weight Field */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium mb-1">
              Body Weight
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
                placeholder="Enter weight"
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

          {/* Caffeine Sources */}
          <div>
            <label className="block text-sm font-medium mb-2">Caffeine Sources</label>
            <div className="space-y-3">
              {sources.map((source, index) => (
                <div key={index} className="neumorph-inset p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-medium mb-1">Source</label>
                      <select
                        value={source.source}
                        onChange={e =>
                          handleUpdateSource(index, 'source', e.target.value as CaffeineSource)
                        }
                        className="w-full px-3 py-2 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                      >
                        {Object.entries(CAFFEINE_SOURCE_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label} ({CAFFEINE_CONTENT[value as CaffeineSource].mg}mg per{' '}
                            {CAFFEINE_CONTENT[value as CaffeineSource].servingSize})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium mb-1">Servings</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.5"
                          value={source.servings}
                          onChange={e =>
                            handleUpdateSource(index, 'servings', parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 px-3 py-2 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                          placeholder="Servings"
                        />
                        {sources.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSource(index)}
                            className="px-3 py-2 neumorph rounded-lg hover:bg-red-50 transition-colors"
                            aria-label="Remove source"
                          >
                            <svg
                              className="w-5 h-5 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {sources.length < 8 && (
                <button
                  type="button"
                  onClick={handleAddSource}
                  className="w-full neumorph px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Another Source
                </button>
              )}
            </div>
          </div>

          {/* Sensitivity Level */}
          <div>
            <label htmlFor="sensitivityLevel" className="block text-sm font-medium mb-1">
              Caffeine Sensitivity
            </label>
            <select
              id="sensitivityLevel"
              value={sensitivityLevel}
              onChange={e => setSensitivityLevel(e.target.value as SensitivityLevel)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="low">Low (Fast Metabolizer)</option>
              <option value="normal">Normal (Average)</option>
              <option value="high">High (Slow Metabolizer)</option>
            </select>
            <p className="text-sm text-gray-600 mt-1">
              {SENSITIVITY_DESCRIPTIONS[sensitivityLevel]}
            </p>
          </div>

          {/* Pre-Workout Timing */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preWorkoutTiming}
                onChange={e => setPreWorkoutTiming(e.target.checked)}
                className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
              />
              <span className="text-sm font-medium">Pre-Workout Timing</span>
            </label>
            <p className="text-sm text-gray-600 mt-1">
              Get recommendations for pre-workout caffeine dosing
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Calculate Caffeine Intake
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
            <CaffeineResultDisplay result={result} />

            <SaveResult
              calculatorType="caffeine-calculator"
              calculatorName="Caffeine Intake Calculator"
              data={{
                totalDailyCaffeine: result.totalDailyCaffeine,
                safeDailyLimit: result.safeDailyLimit,
                percentOfLimit: result.percentOfLimit,
                preWorkoutDose: result.preWorkoutDose,
              }}
            />

            <div className="neumorph p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Understanding Your Results</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Safe Daily Limit:</strong> The FDA recommends up to 400mg per day for most
                  healthy adults (~6mg per kg body weight). Your personalized limit is based on your
                  weight.
                </p>
                <p>
                  <strong>Pre-Workout Dose:</strong> For performance enhancement, research
                  recommends 3-6mg per kg body weight, taken 30-60 minutes before exercise. This
                  improves endurance, power, and focus.
                </p>
                <p>
                  <strong>Half-Life & Clearance:</strong> Caffeine half-life varies from 3-7 hours
                  based on genetics and metabolism. Full clearance takes about 5 half-lives. Avoid
                  caffeine 6+ hours before bedtime for better sleep.
                </p>
                <p>
                  <strong>Individual Variation:</strong> Tolerance varies widely. Factors include
                  genetics (CYP1A2 enzyme), age, body weight, liver function, medications, and
                  regular consumption. Listen to your body and adjust accordingly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
