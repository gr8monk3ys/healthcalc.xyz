'use client';

import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'FFMICalculator' });
import { FFMIResult as FFMIResultType } from '@/types/ffmi';
import { processFFMICalculation } from '@/utils/calculators/ffmi';
import {
  validateWeight,
  validateHeight,
  validateBodyFatPercentage,
  isEmpty,
} from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import FFMIResultDisplay from '@/components/calculators/ffmi/FFMIResult';
import { useHeight, useWeight } from '@/hooks/useCalculatorUnits';

export default function FFMICalculator() {
  const { localizePath } = useLocale();

  // State for form inputs
  const height = useHeight();
  const weight = useWeight();
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | ''>('');

  // State for form validation
  const [errors, setErrors] = useState<{
    height?: string;
    weight?: string;
    bodyFatPercentage?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<FFMIResultType | null>(null);
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
        height?: string;
        weight?: string;
        bodyFatPercentage?: string;
      } = {};

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

      // Validate weight
      const weightKg = weight.toKg();
      if (isEmpty(weight.value) || weightKg === null) {
        newErrors.weight = 'Weight is required';
      } else {
        const weightValidation = validateWeight(weightKg, 'metric');
        if (!weightValidation.isValid) {
          newErrors.weight = weightValidation.error;
        }
      }

      // Validate body fat percentage
      if (isEmpty(bodyFatPercentage)) {
        newErrors.bodyFatPercentage = 'Body fat percentage is required';
      } else {
        const bodyFatValidation = validateBodyFatPercentage(bodyFatPercentage);
        if (!bodyFatValidation.isValid) {
          newErrors.bodyFatPercentage = bodyFatValidation.error;
        }
      }

      // If there are errors, don't submit
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Clear errors
      setErrors({});

      try {
        // Calculate FFMI
        if (weightKg === null || heightCm === null || isEmpty(bodyFatPercentage)) {
          throw new Error('Missing required values');
        }

        const ffmiResult = processFFMICalculation(
          weightKg,
          heightCm,
          Number(bodyFatPercentage),
          weight.unit
        );

        setResult(ffmiResult);
        setShowResult(true);

        // Scroll to result
        setTimeout(() => {
          const resultElement = document.getElementById('ffmi-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);

        logger.debug('FFMI calculated successfully', { ffmiResult });
      } catch (error) {
        logger.error('FFMI calculation failed', { error });
        setCalculationError(
          error instanceof Error
            ? error.message
            : 'An error occurred during calculation. Please check your inputs and try again.'
        );
      }
    },
    [height, weight, bodyFatPercentage]
  );

  return (
    <CalculatorPageLayout
      title="FFMI Calculator"
      description="Calculate your Fat-Free Mass Index (FFMI) to assess muscle mass development and compare to natural muscular potential"
      calculatorSlug="ffmi"
      faqs={[]}
      relatedArticles={[]}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'FFMI Calculator',
        description: 'Calculate your Fat-Free Mass Index to assess muscle mass development.',
        url: 'https://www.healthcalc.xyz/ffmi',
      }}
      showResultsCapture={showResult}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="neumorph p-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Weight Input */}
              <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-1">
                  Weight
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={weight.value}
                    onChange={e =>
                      weight.setValue(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    placeholder={weight.placeholder}
                    className={`flex-1 neumorph-inset px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.weight ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={weight.toggle}
                    className="neumorph px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    {weight.unit}
                  </button>
                </div>
                {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
              </div>

              {/* Height Input */}
              <div>
                <label htmlFor="height" className="block text-sm font-medium mb-1">
                  Height
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="height"
                    type="number"
                    step="0.1"
                    value={height.value}
                    onChange={e =>
                      height.setValue(e.target.value === '' ? '' : parseFloat(e.target.value))
                    }
                    placeholder={height.placeholder}
                    className={`flex-1 neumorph-inset px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.height ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={height.toggle}
                    className="neumorph px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    {height.unit}
                  </button>
                </div>
                {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
              </div>

              {/* Body Fat Percentage Input */}
              <div>
                <label htmlFor="bodyFatPercentage" className="block text-sm font-medium mb-1">
                  Body Fat Percentage
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="bodyFatPercentage"
                  type="number"
                  step="0.1"
                  value={bodyFatPercentage}
                  onChange={e =>
                    setBodyFatPercentage(e.target.value === '' ? '' : parseFloat(e.target.value))
                  }
                  placeholder="e.g., 15"
                  className={`w-full neumorph-inset px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.bodyFatPercentage ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {errors.bodyFatPercentage && (
                  <p className="text-red-500 text-xs mt-1">{errors.bodyFatPercentage}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  If you don't know your body fat percentage, use our{' '}
                  <Link href={localizePath('/body-fat')} className="text-accent hover:underline">
                    Body Fat Calculator
                  </Link>{' '}
                  first.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition-colors neumorph-button"
              >
                Calculate FFMI
              </button>

              {/* Calculation Error */}
              {calculationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{calculationError}</p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Result Display */}
        {showResult && result && (
          <div>
            <FFMIResultDisplay result={result} />
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="mt-8 neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">What is FFMI?</h2>
        <div className="space-y-3 text-sm">
          <p>
            Fat-Free Mass Index (FFMI) is a measurement that normalizes lean body mass for height,
            similar to how BMI normalizes total body weight. It was developed to assess muscle
            development and help distinguish between natural and enhanced athletes.
          </p>
          <p>
            The formula was introduced by Kouri et al. (1995) in their landmark study comparing
            drug-free athletes to steroid users. They found that natural bodybuilders rarely
            exceeded an adjusted FFMI of 25, while steroid users commonly exceeded this threshold.
          </p>
          <p>
            <strong>Key FFMI Ranges:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>18-20: Average untrained individual</li>
            <li>20-22: Above average with consistent training</li>
            <li>22-23: Excellent development, dedicated training</li>
            <li>23-25: Superior, near natural genetic limit</li>
            <li>25+: Typically requires performance-enhancing drugs</li>
          </ul>
          <p>
            <strong>Important Notes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              FFMI requires an accurate body fat percentage measurement. Inaccurate body fat
              estimates will skew results.
            </li>
            <li>
              The adjusted FFMI accounts for height differences, normalizing all values to a 1.8m
              (5'11") reference height.
            </li>
            <li>
              While FFMI is a useful indicator, it's not a definitive test for steroid use.
              Exceptional genetic outliers and measurement errors can affect results.
            </li>
            <li>
              Factors like hydration, training status, and measurement timing can influence the
              calculation.
            </li>
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">What is a good FFMI?</h3>
            <p className="text-sm text-gray-600">
              For natural lifters, an adjusted FFMI of 20-22 is good, 22-24 is excellent, and 24-25
              is exceptional. Values above 25 are rare without performance-enhancing drugs.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">How is FFMI different from BMI?</h3>
            <p className="text-sm text-gray-600">
              BMI measures total body mass relative to height, while FFMI measures only lean mass
              (muscle, bone, organs) relative to height. FFMI is more useful for assessing muscle
              development and doesn't penalize muscular individuals like BMI does.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Why does FFMI need to be adjusted for height?</h3>
            <p className="text-sm text-gray-600">
              Taller individuals naturally have lower FFMI values due to the square relationship
              between height and mass. The adjustment formula normalizes all values to 1.8m height,
              making comparisons fair regardless of height.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Can I achieve an FFMI of 25 naturally?</h3>
            <p className="text-sm text-gray-600">
              While possible for genetic outliers with years of dedicated training and optimal
              nutrition, an adjusted FFMI of 25 represents the upper limit of natural potential for
              most people. Values significantly above 25 are very unlikely to be natural.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">
              How accurate does my body fat percentage need to be?
            </h3>
            <p className="text-sm text-gray-600">
              FFMI is highly sensitive to body fat percentage. A 5% error in body fat can change
              your FFMI by 1-2 points. Use the most accurate measurement method available (DEXA,
              hydrostatic weighing, or multiple-site caliper measurements).
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">What was the original FFMI research?</h3>
            <p className="text-sm text-gray-600">
              Kouri et al. (1995) studied 157 male athletes (83 drug-free, 74 steroid users). They
              found drug-free athletes had an adjusted FFMI of 22.8 ± 2.3, with a maximum of 25.4,
              while steroid users averaged 26.4 ± 2.4, with some exceeding 30.
            </p>
          </div>
        </div>
      </div>
    </CalculatorPageLayout>
  );
}
