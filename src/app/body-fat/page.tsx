'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'BodyFatCalculator' });
import dynamic from 'next/dynamic';
import { Gender } from '@/types/common';
import { BodyFatMethod, BodyFatResult as BodyFatResultType } from '@/types/bodyFat';
import {
  calculateBodyFat,
  getBodyFatCategory,
  getHealthyBodyFatRange,
  calculateFatAndLeanMass,
} from '@/utils/calculators/bodyFat';
import { BODY_FAT_METHODS } from '@/constants/bodyFat';
import { calculateBMI } from '@/utils/calculators/bmi';
import {
  validateAge,
  validateHeight,
  validateWeight,
  validateWaist,
  validateNeck,
  validateHip,
  validateBodyFatPercentage,
  isEmpty,
} from '@/utils/validation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BodyFatResultDisplay from '@/components/calculators/body-fat/BodyFatResult';
import BodyFatInfo from '@/components/calculators/body-fat/BodyFatInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

// Dynamic imports for below-the-fold components
const BodyFatUnderstanding = dynamic(
  () => import('@/components/calculators/body-fat/BodyFatUnderstanding')
);

export default function BodyFatCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const height = useHeight();
  const weight = useWeight();
  const [method, setMethod] = useState<BodyFatMethod>('navy');
  const [waist, setWaist] = useState<number | ''>('');
  const [neck, setNeck] = useState<number | ''>('');
  const [hips, setHips] = useState<number | ''>('');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | ''>('');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    waist?: string;
    neck?: string;
    hips?: string;
    bodyFatPercentage?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<BodyFatResultType | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // State for user-facing calculation errors
  const [calculationError, setCalculationError] = useState<string | null>(null);

  // Handle form submission with useCallback to memoize the function
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      // Validate form
      const newErrors: {
        age?: string;
        height?: string;
        weight?: string;
        waist?: string;
        neck?: string;
        hips?: string;
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

      // Method-specific validations
      if (method === 'navy') {
        // Validate waist
        if (isEmpty(waist)) {
          newErrors.waist = 'Waist measurement is required';
        } else {
          const waistValidation = validateWaist(waist, 'metric');
          if (!waistValidation.isValid) {
            newErrors.waist = waistValidation.error;
          }
        }

        // Validate neck
        if (isEmpty(neck)) {
          newErrors.neck = 'Neck measurement is required';
        } else {
          const neckValidation = validateNeck(neck, 'metric');
          if (!neckValidation.isValid) {
            newErrors.neck = neckValidation.error;
          }
        }

        // Validate hips (female only)
        if (gender === 'female') {
          if (isEmpty(hips)) {
            newErrors.hips = 'Hip measurement is required for women';
          } else {
            const hipValidation = validateHip(hips, 'metric');
            if (!hipValidation.isValid) {
              newErrors.hips = hipValidation.error;
            }
          }
        }
      } else if (method === 'manual') {
        // Validate body fat percentage
        if (isEmpty(bodyFatPercentage)) {
          newErrors.bodyFatPercentage = 'Body fat percentage is required';
        } else {
          const bfValidation = validateBodyFatPercentage(bodyFatPercentage);
          if (!bfValidation.isValid) {
            newErrors.bodyFatPercentage = bfValidation.error;
          }
        }
      }

      setErrors(newErrors);

      // Get converted values
      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      // If no errors, calculate body fat
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
        // Calculate BMI
        const bmi = calculateBMI(heightCm, weightKg);

        // Prepare parameters for body fat calculation
        const params = {
          gender,
          age,
          heightCm,
          weightKg,
          bmi,
          waistCm: typeof waist === 'number' ? waist : undefined,
          neckCm: typeof neck === 'number' ? neck : undefined,
          hipsCm: typeof hips === 'number' ? hips : undefined,
          bodyFatPercentage: typeof bodyFatPercentage === 'number' ? bodyFatPercentage : undefined,
        };

        try {
          // Calculate body fat percentage
          const bodyFatPercentage = calculateBodyFat(method, params);

          // Get category
          const { name: category, color } = getBodyFatCategory(gender, bodyFatPercentage);

          // Get healthy range
          const healthyRange = getHealthyBodyFatRange(gender);

          // Calculate fat mass and lean mass
          const { fatMass, leanMass } = calculateFatAndLeanMass(weightKg, bodyFatPercentage);

          // Create result object
          const bodyFatResult: BodyFatResultType = {
            bodyFatPercentage,
            category,
            color,
            fatMass,
            leanMass,
            healthyRange,
          };

          setResult(bodyFatResult);
          setShowResult(true);

          // Scroll to result with smooth animation
          setTimeout(() => {
            const resultElement = document.getElementById('body-fat-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating body fat', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [age, gender, height, weight, method, waist, neck, hips, bodyFatPercentage]
  );

  // Reset form with useCallback
  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    height.setValue('');
    weight.setValue('');
    setMethod('navy');
    setWaist('');
    setNeck('');
    setHips('');
    setBodyFatPercentage('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  // Handle method change with useCallback
  const handleMethodChange = useCallback((newMethod: string) => {
    setMethod(newMethod as BodyFatMethod);
    // Clear method-specific errors when changing methods
    setErrors(prev => {
      const updated = { ...prev };
      delete updated.waist;
      delete updated.neck;
      delete updated.hips;
      delete updated.bodyFatPercentage;
      return updated;
    });
  }, []);

  // Get method-specific fields with useMemo
  const methodFields = useMemo(() => {
    const fields = [];

    if (method === 'navy') {
      fields.push(
        {
          name: 'waist',
          label: 'Waist Circumference (cm)',
          type: 'number' as const,
          value: waist,
          onChange: setWaist,
          error: errors.waist,
          placeholder: 'Centimeters',
          step: '0.1',
        },
        {
          name: 'neck',
          label: 'Neck Circumference (cm)',
          type: 'number' as const,
          value: neck,
          onChange: setNeck,
          error: errors.neck,
          placeholder: 'Centimeters',
          step: '0.1',
        }
      );

      if (gender === 'female') {
        fields.push({
          name: 'hips',
          label: 'Hip Circumference (cm)',
          type: 'number' as const,
          value: hips,
          onChange: setHips,
          error: errors.hips,
          placeholder: 'Centimeters',
          step: '0.1',
        });
      }
    } else if (method === 'manual') {
      fields.push({
        name: 'bodyFatPercentage',
        label: 'Body Fat Percentage (%)',
        type: 'number' as const,
        value: bodyFatPercentage,
        onChange: setBodyFatPercentage,
        error: errors.bodyFatPercentage,
        placeholder: 'Percentage',
        step: '0.1',
      });
    }

    return fields;
  }, [method, gender, waist, neck, hips, bodyFatPercentage, errors]);

  // Form fields for the CalculatorForm component with useMemo
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
      },
      createHeightField(height, errors.height),
      createWeightField(weight, errors.weight),
      {
        name: 'method',
        label: 'Calculation Method',
        type: 'select' as const,
        value: method,
        onChange: handleMethodChange,
        options: BODY_FAT_METHODS.map(m => ({
          value: m.value,
          label: m.label,
          description: m.description,
        })),
      },
      ...methodFields,
    ],
    [gender, age, height, weight, method, errors, handleMethodChange, methodFields]
  );

  // Memoize the method label for the result display
  const methodLabel = useMemo(
    () => BODY_FAT_METHODS.find(m => m.value === method)?.label || method,
    [method]
  );

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Body Fat Calculator</h1>
        <p className="text-gray-600 mb-6">
          Calculate your body fat percentage using various methods including Navy, skinfold, and BMI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <CalculatorForm
              title="Enter Your Details"
              fields={formFields}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />

            {/* User-facing error state */}
            {calculationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-4">
                {calculationError}
              </div>
            )}
          </div>

          <div className="md:col-span-2" id="body-fat-result">
            {showResult && result ? (
              <BodyFatResultDisplay
                result={result}
                gender={gender}
                weightUnit={weight.unit}
                method={methodLabel}
              />
            ) : (
              <BodyFatInfo />
            )}
          </div>
        </div>

        <BodyFatUnderstanding />

        {/* Recommended Products - shown after calculation */}
        {showResult && result && (
          <AffiliateLinks
            calculatorType="body-fat"
            title="Recommended Products for Body Composition Tracking"
            maxProducts={6}
            showDisclosure={true}
            className="my-8"
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
