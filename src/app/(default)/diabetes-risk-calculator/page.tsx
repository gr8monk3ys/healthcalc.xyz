'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'DiabetesRiskCalculator' });
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import DiabetesRiskResultDisplay from '@/components/calculators/diabetesRisk/DiabetesRiskResult';
import A1CResultDisplay from '@/components/calculators/diabetesRisk/A1CResult';
import SaveResult from '@/components/SaveResult';
import { isEmpty, validateAge } from '@/utils/validation';
import { calculateDiabetesRisk, convertA1C } from '@/utils/calculators/diabetesRisk';
import type { DiabetesRiskResult, A1CResult, EthnicityRisk } from '@/types/diabetesRisk';
import { ETHNICITY_LABELS } from '@/constants/diabetesRisk';

type ActiveMode = 'risk' | 'a1c';

const faqs = [
  {
    question: 'What is the ADA Diabetes Risk Test?',
    answer:
      'The American Diabetes Association (ADA) developed a simple screening questionnaire to help people identify whether they may be at increased risk for type 2 diabetes. It evaluates factors like age, BMI, family history, ethnicity, physical activity, and blood pressure to generate a risk score.',
  },
  {
    question: 'What does my A1C percentage mean?',
    answer:
      'A1C (glycated hemoglobin) reflects your average blood sugar level over the past 2-3 months. An A1C below 5.7% is normal, 5.7-6.4% indicates prediabetes, and 6.5% or higher suggests diabetes. It is one of the primary tests used to diagnose and monitor diabetes.',
  },
  {
    question: 'Can type 2 diabetes be prevented?',
    answer:
      'Research shows that lifestyle changes can reduce the risk of developing type 2 diabetes by up to 58%. Key strategies include losing 5-7% of body weight if overweight, getting at least 150 minutes of moderate exercise per week, eating a balanced diet rich in whole grains, fruits, and vegetables, and managing blood pressure and cholesterol.',
  },
  {
    question: 'Why does ethnicity affect diabetes risk?',
    answer:
      'Certain ethnic groups have a genetically higher predisposition to type 2 diabetes. African Americans, Hispanic/Latino Americans, Asian Americans, Native Americans, and Pacific Islanders all have statistically higher rates of type 2 diabetes compared to non-Hispanic whites, even when controlling for lifestyle factors.',
  },
  {
    question: 'How often should I be screened for diabetes?',
    answer:
      'The ADA recommends screening for all adults starting at age 45, with repeat testing every 3 years if results are normal. If you have risk factors such as obesity, family history, or physical inactivity, screening should begin earlier and may be done more frequently.',
  },
  {
    question: 'What is the difference between this risk calculator and a blood test?',
    answer:
      'This calculator provides an estimate of your risk based on known risk factors. It is not a diagnosis. A definitive diabetes diagnosis requires laboratory blood tests such as fasting blood glucose, oral glucose tolerance test (OGTT), or A1C. Use this tool as a starting point to decide whether to talk to your doctor about testing.',
  },
];

const blogArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description: 'Learn how body composition metrics relate to health risks and overall wellness.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description: 'Understand how daily energy expenditure impacts weight management.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
];

export default function DiabetesRiskCalculator() {
  // Tab state
  const [activeMode, setActiveMode] = useState<ActiveMode>('risk');

  // Risk Assessment form state
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bmi, setBmi] = useState<number | ''>('');
  const [familyHistory, setFamilyHistory] = useState<boolean>(false);
  const [highBloodPressure, setHighBloodPressure] = useState<boolean>(false);
  const [physicallyActive, setPhysicallyActive] = useState<boolean>(false);
  const [ethnicity, setEthnicity] = useState<EthnicityRisk>('standard');
  const [waistCircumference, setWaistCircumference] = useState<number | ''>('');
  const [gestationalDiabetes, setGestationalDiabetes] = useState<boolean>(false);
  const [polycysticOvary, setPolycysticOvary] = useState<boolean>(false);

  // A1C form state
  const [a1cPercentage, setA1cPercentage] = useState<number | ''>('');

  // Results
  const [riskResult, setRiskResult] = useState<DiabetesRiskResult | null>(null);
  const [a1cResult, setA1cResult] = useState<A1CResult | null>(null);

  // Errors
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleRiskSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: Record<string, string | undefined> = {};

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
        if (isNaN(numBmi) || numBmi <= 0 || numBmi > 100) {
          newErrors.bmi = 'BMI must be between 1 and 100';
        }
      }

      // Validate optional waist circumference
      if (!isEmpty(waistCircumference)) {
        const numWaist = Number(waistCircumference);
        if (isNaN(numWaist) || numWaist < 20 || numWaist > 300) {
          newErrors.waistCircumference = 'Waist circumference must be between 20 and 300 cm';
        }
      }

      setErrors(newErrors);

      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        typeof bmi === 'number'
      ) {
        try {
          const result = calculateDiabetesRisk({
            age,
            gender,
            bmi,
            waistCircumference:
              typeof waistCircumference === 'number' ? waistCircumference : undefined,
            familyHistory,
            highBloodPressure,
            physicallyActive,
            ethnicity,
            gestationalDiabetes: gender === 'female' ? gestationalDiabetes : undefined,
            polycysticOvary: gender === 'female' ? polycysticOvary : undefined,
          });
          setRiskResult(result);

          setTimeout(() => {
            const element = document.getElementById('diabetes-risk-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          logger.logError('Error calculating diabetes risk', error);
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
      waistCircumference,
      familyHistory,
      highBloodPressure,
      physicallyActive,
      ethnicity,
      gestationalDiabetes,
      polycysticOvary,
    ]
  );

  const handleA1CSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setCalculationError(null);

      const newErrors: Record<string, string | undefined> = {};

      if (isEmpty(a1cPercentage)) {
        newErrors.a1c = 'A1C percentage is required';
      } else {
        const numA1c = Number(a1cPercentage);
        if (isNaN(numA1c) || numA1c < 3 || numA1c > 20) {
          newErrors.a1c = 'A1C must be between 3% and 20%';
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && typeof a1cPercentage === 'number') {
        try {
          const result = convertA1C({ a1cPercentage });
          setA1cResult(result);

          setTimeout(() => {
            const element = document.getElementById('a1c-result');
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } catch (error) {
          logger.logError('Error converting A1C', error);
          setCalculationError(
            'An error occurred during conversion. Please check your input and try again.'
          );
        }
      }
    },
    [a1cPercentage]
  );

  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    setBmi('');
    setFamilyHistory(false);
    setHighBloodPressure(false);
    setPhysicallyActive(false);
    setEthnicity('standard');
    setWaistCircumference('');
    setGestationalDiabetes(false);
    setPolycysticOvary(false);
    setA1cPercentage('');
    setRiskResult(null);
    setA1cResult(null);
    setErrors({});
    setCalculationError(null);
  }, []);

  const hasResult = activeMode === 'risk' ? !!riskResult : !!a1cResult;

  return (
    <CalculatorPageLayout
      title="Diabetes Risk Calculator"
      description="Assess your Type 2 diabetes risk using an ADA-based scoring system, or convert your A1C percentage to estimated average glucose."
      calculatorSlug="diabetes-risk-calculator"
      faqs={faqs}
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Diabetes Risk Calculator',
        description:
          'Assess your Type 2 diabetes risk using an ADA-based scoring system with A1C converter and personalized recommendations.',
        url: 'https://www.healthcalc.xyz/diabetes-risk-calculator',
      }}
      showResultsCapture={hasResult}
    >
      <div className="space-y-8">
        {/* Tab Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveMode('risk');
              setErrors({});
              setCalculationError(null);
            }}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeMode === 'risk' ? 'neumorph-inset text-accent' : 'neumorph hover:shadow-lg'
            }`}
          >
            Risk Assessment
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveMode('a1c');
              setErrors({});
              setCalculationError(null);
            }}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeMode === 'a1c' ? 'neumorph-inset text-accent' : 'neumorph hover:shadow-lg'
            }`}
          >
            A1C Converter
          </button>
        </div>

        {/* Risk Assessment Form */}
        {activeMode === 'risk' && (
          <form onSubmit={handleRiskSubmit} className="neumorph p-6 rounded-lg space-y-6">
            <h2 className="text-xl font-semibold mb-4">Type 2 Diabetes Risk Assessment</h2>

            {/* Age */}
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
                placeholder="e.g., 45"
                min="1"
                max="120"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            {/* Gender */}
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

            {/* BMI */}
            <div>
              <label htmlFor="bmi" className="block text-sm font-medium mb-1">
                BMI
              </label>
              <input
                type="number"
                id="bmi"
                value={bmi}
                onChange={e => setBmi(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.bmi ? 'border border-red-500' : ''
                }`}
                placeholder="e.g., 27.5"
                step="0.1"
                min="1"
                max="100"
              />
              {errors.bmi && <p className="text-red-500 text-sm mt-1">{errors.bmi}</p>}
              <p className="text-xs text-gray-500 mt-1">
                If you do not know your BMI, use our{' '}
                <Link href="/bmi" className="text-accent underline">
                  BMI Calculator
                </Link>{' '}
                first.
              </p>
            </div>

            {/* Ethnicity */}
            <div>
              <label htmlFor="ethnicity" className="block text-sm font-medium mb-1">
                Ethnicity
              </label>
              <select
                id="ethnicity"
                value={ethnicity}
                onChange={e => setEthnicity(e.target.value as EthnicityRisk)}
                className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {Object.entries(ETHNICITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Waist Circumference (Optional) */}
            <div>
              <label htmlFor="waist" className="block text-sm font-medium mb-1">
                Waist Circumference (cm){' '}
                <span className="text-gray-400 font-normal">- optional</span>
              </label>
              <input
                type="number"
                id="waist"
                value={waistCircumference}
                onChange={e =>
                  setWaistCircumference(e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.waistCircumference ? 'border border-red-500' : ''
                }`}
                placeholder="e.g., 90"
                step="0.1"
                min="20"
                max="300"
              />
              {errors.waistCircumference && (
                <p className="text-red-500 text-sm mt-1">{errors.waistCircumference}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={familyHistory}
                  onChange={e => setFamilyHistory(e.target.checked)}
                  className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
                />
                <span className="text-sm font-medium">
                  Family history of diabetes (parent, sibling)
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={highBloodPressure}
                  onChange={e => setHighBloodPressure(e.target.checked)}
                  className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
                />
                <span className="text-sm font-medium">
                  High blood pressure (or taking medication for it)
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={physicallyActive}
                  onChange={e => setPhysicallyActive(e.target.checked)}
                  className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
                />
                <span className="text-sm font-medium">
                  Physically active (at least 150 min/week of moderate exercise)
                </span>
              </label>

              {/* Female-specific factors */}
              {gender === 'female' && (
                <>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={gestationalDiabetes}
                      onChange={e => setGestationalDiabetes(e.target.checked)}
                      className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
                    />
                    <span className="text-sm font-medium">History of gestational diabetes</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={polycysticOvary}
                      onChange={e => setPolycysticOvary(e.target.checked)}
                      className="mr-2 w-4 h-4 text-accent focus:ring-2 focus:ring-accent"
                    />
                    <span className="text-sm font-medium">Polycystic ovary syndrome (PCOS)</span>
                  </label>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
              >
                Assess Risk
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
        )}

        {/* A1C Converter Form */}
        {activeMode === 'a1c' && (
          <form onSubmit={handleA1CSubmit} className="neumorph p-6 rounded-lg space-y-6">
            <h2 className="text-xl font-semibold mb-4">A1C to Estimated Average Glucose</h2>

            <div>
              <label htmlFor="a1c" className="block text-sm font-medium mb-1">
                A1C Percentage (%)
              </label>
              <input
                type="number"
                id="a1c"
                value={a1cPercentage}
                onChange={e =>
                  setA1cPercentage(e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.a1c ? 'border border-red-500' : ''
                }`}
                placeholder="e.g., 5.7"
                step="0.1"
                min="3"
                max="20"
              />
              {errors.a1c && <p className="text-red-500 text-sm mt-1">{errors.a1c}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Enter your A1C test result as a percentage (typically between 4% and 14%).
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
              >
                Convert A1C
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
        )}

        {/* Calculation Error */}
        {calculationError && (
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-red-500">
            <p className="text-red-600">{calculationError}</p>
          </div>
        )}

        {/* Results */}
        {activeMode === 'risk' && (
          <div className="space-y-6">
            <DiabetesRiskResultDisplay result={riskResult} />
            {riskResult && (
              <SaveResult
                calculatorType="diabetes-risk-calculator"
                calculatorName="Diabetes Risk Calculator"
                data={{
                  riskScore: riskResult.riskScore,
                  riskLevel: riskResult.riskLevel,
                  riskPercentage: riskResult.riskPercentage,
                  riskFactorsCount: riskResult.riskFactors.length,
                  protectiveFactorsCount: riskResult.protectiveFactors.length,
                }}
              />
            )}
          </div>
        )}

        {activeMode === 'a1c' && (
          <div className="space-y-6">
            <A1CResultDisplay result={a1cResult} />
            {a1cResult && (
              <SaveResult
                calculatorType="diabetes-risk-calculator"
                calculatorName="A1C Converter"
                data={{
                  a1cPercentage: a1cResult.a1cPercentage,
                  estimatedGlucose: a1cResult.estimatedAverageGlucose.mgdl,
                  category: a1cResult.category,
                }}
              />
            )}
          </div>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
