'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Gender, HeightUnit, WeightUnit } from '@/types/common';
import { BodyFatMethod, BodyFatResult as BodyFatResultType } from '@/types/bodyFat';
import {
  calculateBodyFat,
  getBodyFatCategory,
  getHealthyBodyFatRange,
  calculateFatAndLeanMass,
} from '@/app/api/bodyFat';
import { BODY_FAT_METHODS } from '@/constants/bodyFat';
import { calculateBMI } from '@/app/api/bmi';
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
import BodyFatUnderstanding from '@/components/calculators/body-fat/BodyFatUnderstanding';

export default function BodyFatCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
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

  // Handle form submission with useCallback to memoize the function
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

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
      if (isEmpty(height)) {
        newErrors.height = 'Height is required';
      } else {
        // Convert height to inches if in feet for validation
        const heightForValidation = heightUnit === 'ft' ? (typeof height === 'number' ? height * 12 : height) : height;
        const unitSystem = heightUnit === 'cm' ? 'metric' : 'imperial';
        const heightValidation = validateHeight(heightForValidation, unitSystem);
        if (!heightValidation.isValid) {
          newErrors.height = heightValidation.error;
        }
      }

      // Validate weight
      if (isEmpty(weight)) {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weightUnit === 'kg' ? 'metric' : 'imperial';
        const weightValidation = validateWeight(weight, unitSystem);
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

      // If no errors, calculate body fat
      if (
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        typeof height === 'number' &&
        typeof weight === 'number'
      ) {
        // Convert height to cm if needed
        const heightCm = heightUnit === 'cm' ? height : height * 30.48;

        // Convert weight to kg if needed
        const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;

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
          console.error('Error calculating body fat:', error);
          // Handle error (could set an error state here)
        }
      }
    },
    [
      age,
      gender,
      height,
      heightUnit,
      weight,
      weightUnit,
      method,
      waist,
      neck,
      hips,
      bodyFatPercentage,
    ]
  );

  // Handle unit toggle with useCallback
  const toggleHeightUnit = useCallback(() => {
    if (heightUnit === 'cm' && typeof height === 'number') {
      setHeight(parseFloat((height / 30.48).toFixed(1)));
      setHeightUnit('ft');
    } else if (heightUnit === 'ft' && typeof height === 'number') {
      setHeight(parseFloat((height * 30.48).toFixed(1)));
      setHeightUnit('cm');
    } else {
      setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
    }
  }, [height, heightUnit]);

  const toggleWeightUnit = useCallback(() => {
    if (weightUnit === 'kg' && typeof weight === 'number') {
      setWeight(parseFloat((weight * 2.20462).toFixed(1)));
      setWeightUnit('lb');
    } else if (weightUnit === 'lb' && typeof weight === 'number') {
      setWeight(parseFloat((weight / 2.20462).toFixed(1)));
      setWeightUnit('kg');
    } else {
      setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg');
    }
  }, [weight, weightUnit]);

  // Reset form with useCallback
  const handleReset = useCallback(() => {
    setGender('male');
    setAge('');
    setHeight('');
    setHeightUnit('cm');
    setWeight('');
    setWeightUnit('kg');
    setMethod('navy');
    setWaist('');
    setNeck('');
    setHips('');
    setBodyFatPercentage('');
    setErrors({});
    setResult(null);
    setShowResult(false);
  }, []);

  // Handle method change with useCallback
  const handleMethodChange = useCallback((newMethod: BodyFatMethod) => {
    setMethod(newMethod);
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
      {
        name: 'height',
        label: 'Height',
        type: 'number' as const,
        value: height,
        onChange: setHeight,
        error: errors.height,
        placeholder: heightUnit === 'cm' ? 'Centimeters' : 'Feet',
        unit: heightUnit === 'cm' ? 'cm' : 'ft',
        unitToggle: toggleHeightUnit,
        step: '0.1',
      },
      {
        name: 'weight',
        label: 'Weight',
        type: 'number' as const,
        value: weight,
        onChange: setWeight,
        error: errors.weight,
        placeholder: weightUnit === 'kg' ? 'Kilograms' : 'Pounds',
        unit: weightUnit === 'kg' ? 'kg' : 'lb',
        unitToggle: toggleWeightUnit,
        step: '0.1',
      },
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
    [
      gender,
      age,
      height,
      heightUnit,
      weight,
      weightUnit,
      method,
      errors,
      toggleHeightUnit,
      toggleWeightUnit,
      handleMethodChange,
      methodFields,
    ]
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
          </div>

          <div className="md:col-span-2">
            {showResult && result ? (
              <BodyFatResultDisplay
                result={result}
                gender={gender}
                weightUnit={weightUnit}
                method={methodLabel}
              />
            ) : (
              <BodyFatInfo />
            )}
          </div>
        </div>

        <BodyFatUnderstanding />
      </div>
    </ErrorBoundary>
  );
}
