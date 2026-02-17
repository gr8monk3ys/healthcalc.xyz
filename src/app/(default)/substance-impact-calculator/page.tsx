'use client';

import React, { useState, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'SubstanceImpactCalculator' });

import { calculateSubstanceImpact } from '@/utils/calculators/substanceImpact';
import {
  SubstanceMode,
  AlcoholType,
  SmokingType,
  SubstanceImpactResult,
} from '@/types/substanceImpact';
import { isEmpty, validateAge } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import SubstanceImpactResultDisplay from '@/components/calculators/substanceImpact/SubstanceImpactResult';
import SaveResult from '@/components/SaveResult';
import { ALCOHOL_TYPE_LABELS, SMOKING_TYPE_LABELS } from '@/constants/substanceImpact';

const faqs = [
  {
    question: 'How does alcohol affect life expectancy?',
    answer:
      'Research from the Global Burden of Disease study (Lancet, 2019) shows that heavy alcohol consumption (15+ drinks per week) is associated with reduced life expectancy of up to 4-5 years compared to non-drinkers. Moderate drinking (8-14 drinks per week) shows a smaller but still measurable reduction. Light drinking (1-7 drinks per week) shows minimal impact in most studies. The effect varies by individual health factors, genetics, and drinking patterns.',
  },
  {
    question: 'How many years of life does smoking take away?',
    answer:
      'According to a landmark study by Jha et al. published in the New England Journal of Medicine (2013), smokers lose an average of 10-13 years of life compared to non-smokers. The risk increases with the number of cigarettes smoked per day and the number of years of smoking. However, quitting at any age provides measurable health benefits. Quitting before age 40 reduces smoking-related death risk by about 90%.',
  },
  {
    question: 'How many calories are in alcoholic drinks?',
    answer:
      'Alcohol contains 7 calories per gram, making it the second most calorie-dense macronutrient after fat. A standard beer (12 oz) has about 153 calories, a glass of wine (5 oz) has about 125 calories, a shot of spirits (1.5 oz) has about 97 calories, and a mixed cocktail averages around 200 calories. These "empty calories" provide no nutritional value and can contribute significantly to weight gain over time.',
  },
  {
    question: 'What are the health benefits of quitting smoking?',
    answer:
      'The health benefits begin within minutes of your last cigarette. Within 20 minutes, heart rate drops. Within 12 hours, carbon monoxide levels normalize. Within 2-12 weeks, circulation and lung function improve. After 1 year, coronary heart disease risk drops by half. After 5 years, stroke risk equals that of a non-smoker. After 10 years, lung cancer death risk drops by half. After 15 years, heart disease risk equals that of someone who never smoked.',
  },
  {
    question: 'Is vaping safer than smoking cigarettes?',
    answer:
      'While vaping is generally considered less harmful than traditional cigarettes because it does not involve combustion, it is not without risk. E-cigarettes still deliver nicotine, which is addictive and can harm brain development in young adults. Long-term health effects are still being studied since vaping is relatively new. The CDC recommends that non-smokers, youth, and pregnant women should not use e-cigarettes. For current smokers, switching completely to vaping may reduce exposure to harmful chemicals, but quitting entirely is the best option.',
  },
  {
    question: 'How much money can I save by quitting smoking or drinking?',
    answer:
      'The financial savings depend on your current consumption level. A pack-a-day smoker spending $8 per pack would save about $2,920 per year. Over 20 years, that exceeds $58,000 before accounting for inflation or investment returns. For alcohol, someone spending $10 per drink at 10 drinks per week would save $5,200 per year. Combined substance costs can easily exceed $8,000 per year for moderate users.',
  },
];

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

const MODE_OPTIONS: Array<{ value: SubstanceMode; label: string }> = [
  { value: 'alcohol', label: 'Alcohol' },
  { value: 'smoking', label: 'Smoking' },
  { value: 'both', label: 'Both' },
];

export default function SubstanceImpactCalculator() {
  // Mode state
  const [mode, setMode] = useState<SubstanceMode>('alcohol');

  // Common fields
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Alcohol fields
  const [alcoholType, setAlcoholType] = useState<AlcoholType>('beer');
  const [drinksPerWeek, setDrinksPerWeek] = useState<number | ''>('');
  const [yearsOfDrinking, setYearsOfDrinking] = useState<number | ''>('');
  const [avgDrinkCost, setAvgDrinkCost] = useState<number | ''>('');

  // Smoking fields
  const [smokingType, setSmokingType] = useState<SmokingType>('cigarettes');
  const [perDay, setPerDay] = useState<number | ''>('');
  const [yearsOfSmoking, setYearsOfSmoking] = useState<number | ''>('');
  const [costPerPack, setCostPerPack] = useState<number | ''>('');

  // Validation and result state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubstanceImpactResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const showAlcohol = mode === 'alcohol' || mode === 'both';
  const showSmoking = mode === 'smoking' || mode === 'both';

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      const newErrors: Record<string, string> = {};

      // Validate age
      if (isEmpty(age)) {
        newErrors.age = 'Age is required';
      } else {
        const ageValidation = validateAge(age);
        if (!ageValidation.isValid) {
          newErrors.age = ageValidation.error ?? 'Invalid age';
        }
      }

      // Validate alcohol fields
      if (showAlcohol) {
        if (isEmpty(drinksPerWeek)) {
          newErrors.drinksPerWeek = 'Drinks per week is required';
        } else if (Number(drinksPerWeek) < 0) {
          newErrors.drinksPerWeek = 'Drinks per week must be non-negative';
        }

        if (isEmpty(yearsOfDrinking)) {
          newErrors.yearsOfDrinking = 'Years of drinking is required';
        } else if (Number(yearsOfDrinking) < 0) {
          newErrors.yearsOfDrinking = 'Years of drinking must be non-negative';
        }

        if (isEmpty(avgDrinkCost)) {
          newErrors.avgDrinkCost = 'Average drink cost is required';
        } else if (Number(avgDrinkCost) < 0) {
          newErrors.avgDrinkCost = 'Cost must be non-negative';
        }
      }

      // Validate smoking fields
      if (showSmoking) {
        if (isEmpty(perDay)) {
          newErrors.perDay = 'Amount per day is required';
        } else if (Number(perDay) < 0) {
          newErrors.perDay = 'Amount per day must be non-negative';
        }

        if (isEmpty(yearsOfSmoking)) {
          newErrors.yearsOfSmoking = 'Years of smoking is required';
        } else if (Number(yearsOfSmoking) < 0) {
          newErrors.yearsOfSmoking = 'Years of smoking must be non-negative';
        }

        if (isEmpty(costPerPack)) {
          newErrors.costPerPack = 'Cost per pack/pod is required';
        } else if (Number(costPerPack) < 0) {
          newErrors.costPerPack = 'Cost must be non-negative';
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;

      try {
        const calcResult = calculateSubstanceImpact({
          mode,
          age: Number(age),
          gender,
          alcohol: showAlcohol
            ? {
                type: alcoholType,
                drinksPerWeek: Number(drinksPerWeek),
                yearsOfDrinking: Number(yearsOfDrinking),
                avgDrinkCost: Number(avgDrinkCost),
              }
            : undefined,
          smoking: showSmoking
            ? {
                type: smokingType,
                perDay: Number(perDay),
                yearsOfSmoking: Number(yearsOfSmoking),
                costPerPack: Number(costPerPack),
              }
            : undefined,
        });

        setResult(calcResult);
        setShowResult(true);

        setTimeout(() => {
          const resultElement = document.getElementById('substance-impact-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        logger.logError('Error calculating substance impact', error);
        setCalculationError(
          'An error occurred during calculation. Please check your inputs and try again.'
        );
      }
    },
    [
      mode,
      age,
      gender,
      showAlcohol,
      alcoholType,
      drinksPerWeek,
      yearsOfDrinking,
      avgDrinkCost,
      showSmoking,
      smokingType,
      perDay,
      yearsOfSmoking,
      costPerPack,
    ]
  );

  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    setAlcoholType('beer');
    setDrinksPerWeek('');
    setYearsOfDrinking('');
    setAvgDrinkCost('');
    setSmokingType('cigarettes');
    setPerDay('');
    setYearsOfSmoking('');
    setCostPerPack('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="Alcohol & Smoking Impact Calculator"
      description="Calculate the health, financial, and lifespan impact of alcohol and tobacco use. See how much quitting could save you in years and dollars."
      calculatorSlug="substance-impact-calculator"
      shareTitle="Alcohol & Smoking Impact Calculator | HealthCheck"
      shareDescription="Calculate the health, financial, and lifespan impact of alcohol and tobacco use."
      shareHashtags={['health', 'quitsmoking', 'alcohol', 'wellness']}
      relatedArticles={blogArticles}
      faqs={faqs}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Alcohol & Smoking Impact Calculator',
        description:
          'Calculate the health, financial, and lifespan impact of alcohol and tobacco use.',
        url: 'https://www.healthcalc.xyz/substance-impact-calculator',
      }}
      showResultsCapture={showResult}
    >
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="neumorph p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold mb-4">Calculate Your Substance Impact</h2>

          {/* Mode Selector Tabs */}
          <div>
            <label className="block text-sm font-medium mb-2">What would you like to assess?</label>
            <div className="flex gap-2">
              {MODE_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMode(option.value)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    mode === option.value
                      ? 'neumorph-inset text-accent'
                      : 'neumorph hover:shadow-lg'
                  }`}
                  aria-pressed={mode === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Common Fields */}
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
                placeholder="Enter age"
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

          {/* Alcohol Section */}
          {showAlcohol && (
            <div className="neumorph-inset p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-lg">Alcohol Consumption</h3>

              <div>
                <label htmlFor="alcoholType" className="block text-sm font-medium mb-1">
                  Alcohol Type
                </label>
                <select
                  id="alcoholType"
                  value={alcoholType}
                  onChange={e => setAlcoholType(e.target.value as AlcoholType)}
                  className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {Object.entries(ALCOHOL_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="drinksPerWeek" className="block text-sm font-medium mb-1">
                    Drinks Per Week
                  </label>
                  <input
                    type="number"
                    id="drinksPerWeek"
                    value={drinksPerWeek}
                    onChange={e =>
                      setDrinksPerWeek(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.drinksPerWeek ? 'border border-red-500' : ''
                    }`}
                    placeholder="e.g. 7"
                    min="0"
                    step="1"
                  />
                  {errors.drinksPerWeek && (
                    <p className="text-red-500 text-sm mt-1">{errors.drinksPerWeek}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="yearsOfDrinking" className="block text-sm font-medium mb-1">
                    Years of Drinking
                  </label>
                  <input
                    type="number"
                    id="yearsOfDrinking"
                    value={yearsOfDrinking}
                    onChange={e =>
                      setYearsOfDrinking(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.yearsOfDrinking ? 'border border-red-500' : ''
                    }`}
                    placeholder="e.g. 10"
                    min="0"
                    step="1"
                  />
                  {errors.yearsOfDrinking && (
                    <p className="text-red-500 text-sm mt-1">{errors.yearsOfDrinking}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="avgDrinkCost" className="block text-sm font-medium mb-1">
                    Avg. Drink Cost ($)
                  </label>
                  <input
                    type="number"
                    id="avgDrinkCost"
                    value={avgDrinkCost}
                    onChange={e =>
                      setAvgDrinkCost(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.avgDrinkCost ? 'border border-red-500' : ''
                    }`}
                    placeholder="e.g. 8"
                    min="0"
                    step="0.5"
                  />
                  {errors.avgDrinkCost && (
                    <p className="text-red-500 text-sm mt-1">{errors.avgDrinkCost}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Smoking Section */}
          {showSmoking && (
            <div className="neumorph-inset p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-lg">Smoking / Tobacco Use</h3>

              <div>
                <label htmlFor="smokingType" className="block text-sm font-medium mb-1">
                  Smoking Type
                </label>
                <select
                  id="smokingType"
                  value={smokingType}
                  onChange={e => setSmokingType(e.target.value as SmokingType)}
                  className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {Object.entries(SMOKING_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="perDay" className="block text-sm font-medium mb-1">
                    Amount Per Day
                  </label>
                  <input
                    type="number"
                    id="perDay"
                    value={perDay}
                    onChange={e =>
                      setPerDay(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.perDay ? 'border border-red-500' : ''
                    }`}
                    placeholder="e.g. 10"
                    min="0"
                    step="1"
                  />
                  {errors.perDay && <p className="text-red-500 text-sm mt-1">{errors.perDay}</p>}
                </div>

                <div>
                  <label htmlFor="yearsOfSmoking" className="block text-sm font-medium mb-1">
                    Years of Smoking
                  </label>
                  <input
                    type="number"
                    id="yearsOfSmoking"
                    value={yearsOfSmoking}
                    onChange={e =>
                      setYearsOfSmoking(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.yearsOfSmoking ? 'border border-red-500' : ''
                    }`}
                    placeholder="e.g. 15"
                    min="0"
                    step="1"
                  />
                  {errors.yearsOfSmoking && (
                    <p className="text-red-500 text-sm mt-1">{errors.yearsOfSmoking}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="costPerPack" className="block text-sm font-medium mb-1">
                    Cost Per Pack/Pod ($)
                  </label>
                  <input
                    type="number"
                    id="costPerPack"
                    value={costPerPack}
                    onChange={e =>
                      setCostPerPack(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.costPerPack ? 'border border-red-500' : ''
                    }`}
                    placeholder="e.g. 8"
                    min="0"
                    step="0.5"
                  />
                  {errors.costPerPack && (
                    <p className="text-red-500 text-sm mt-1">{errors.costPerPack}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Calculate Impact
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
            <SubstanceImpactResultDisplay result={result} />

            <SaveResult
              calculatorType="substance-impact-calculator"
              calculatorName="Alcohol & Smoking Impact Calculator"
              data={{
                totalLifespanImpact: result.totalLifespanImpact,
                totalFinancialCostPerYear: result.totalFinancialCostPerYear,
                totalLifetimeCost: result.totalLifetimeCost,
                alcoholCaloriesPerYear: result.alcoholCaloriesPerYear,
                smokingLifespanImpactYears: result.smokingLifespanImpactYears,
              }}
            />

            <div className="neumorph p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Understanding Your Results</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Lifespan Impact:</strong> Estimated years gained or lost based on
                  epidemiological studies. Heavy alcohol use (15+ drinks/week) and smoking both
                  significantly reduce life expectancy. These are population averages and individual
                  outcomes vary based on genetics, overall health, and other lifestyle factors.
                </p>
                <p>
                  <strong>Financial Cost:</strong> Projected spending based on your current
                  consumption rate. Lifetime cost assumes continued use at the same rate through an
                  average life expectancy of 80 years. Actual costs may differ due to price changes
                  and consumption pattern shifts.
                </p>
                <p>
                  <strong>Recovery Timeline:</strong> Based on CDC and WHO data showing the
                  progressive health benefits of quitting. The body begins recovering almost
                  immediately after cessation, with major milestones at 1 year, 5 years, and 10-15
                  years.
                </p>
                <p>
                  <strong>Calories from Alcohol:</strong> Alcohol contains 7 calories per gram.
                  These "empty calories" contribute to weight gain without providing nutritional
                  value. The fat equivalent is calculated at 3,500 calories per pound.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
