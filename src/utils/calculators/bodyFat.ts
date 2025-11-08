/**
 * Body Fat Percentage Calculator
 *
 * Scientific References:
 * - U.S. Navy Method:
 *   Hodgdon & Beckett (1984). "Prediction of percent body fat for U.S. Navy men and women"
 *   Naval Health Research Center Technical Report No. 84-29
 *
 * - BMI-Based Method:
 *   Deurenberg et al. (1991). "Body mass index as a measure of body fatness"
 *   British Journal of Nutrition, 65(2), 105-114
 *
 * Formulas:
 * - Navy Method (Male): 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450
 * - Navy Method (Female): 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)) - 450
 * - BMI Method (Male): (1.20 × BMI) + (0.23 × Age) - 16.2
 * - BMI Method (Female): (1.20 × BMI) + (0.23 × Age) - 5.4
 *
 * Body Fat Categories (ACE):
 * - Essential: 2-5% (men), 10-13% (women)
 * - Athletes: 6-13% (men), 14-20% (women)
 * - Fitness: 14-17% (men), 21-24% (women)
 * - Average: 18-24% (men), 25-31% (women)
 * - Obese: 25%+ (men), 32%+ (women)
 */

import { Gender } from '@/types/common';
import { BodyFatMethod } from '@/types/bodyFat';
import { BODY_FAT_CATEGORIES } from '@/constants/bodyFat';

/**
 * Calculate body fat percentage using the U.S. Navy method
 * @param gender Gender ('male' or 'female')
 * @param waistCm Waist circumference in centimeters
 * @param neckCm Neck circumference in centimeters
 * @param heightCm Height in centimeters
 * @param hipsCm Hip circumference in centimeters (for women only)
 * @returns Body fat percentage
 */
export function calculateNavyMethodBodyFat(
  gender: Gender,
  waistCm: number,
  neckCm: number,
  heightCm: number,
  hipsCm?: number
): number {
  // Convert cm to inches for the formula
  const waistIn = waistCm / 2.54;
  const neckIn = neckCm / 2.54;
  const heightIn = heightCm / 2.54;

  let bodyFatPercentage: number;

  if (gender === 'male') {
    // Men: %BF = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    bodyFatPercentage =
      495 / (1.0324 - 0.19077 * Math.log10(waistIn - neckIn) + 0.15456 * Math.log10(heightIn)) -
      450;
  } else {
    // Women: %BF = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    if (!hipsCm) {
      throw new Error('Hip measurement is required for women using the Navy method');
    }

    const hipsIn = hipsCm / 2.54;
    bodyFatPercentage =
      495 /
        (1.29579 - 0.35004 * Math.log10(waistIn + hipsIn - neckIn) + 0.22100 * Math.log10(heightIn)) -
      450;
  }

  // Ensure the result is within reasonable bounds
  return Math.max(Math.min(bodyFatPercentage, 60), 2);
}

/**
 * Calculate body fat percentage using the BMI method
 * @param gender Gender ('male' or 'female')
 * @param age Age in years
 * @param bmi Body Mass Index
 * @returns Body fat percentage
 */
export function calculateBMIMethodBodyFat(gender: Gender, age: number, bmi: number): number {
  let bodyFatPercentage: number;

  if (gender === 'male') {
    // Men: %BF = (1.20 * BMI) + (0.23 * Age) - 16.2
    bodyFatPercentage = 1.2 * bmi + 0.23 * age - 16.2;
  } else {
    // Women: %BF = (1.20 * BMI) + (0.23 * Age) - 5.4
    bodyFatPercentage = 1.2 * bmi + 0.23 * age - 5.4;
  }

  // Ensure the result is within reasonable bounds
  return Math.max(Math.min(bodyFatPercentage, 60), 2);
}

/**
 * Get the body fat category based on gender and body fat percentage
 * @param gender Gender ('male' or 'female')
 * @param bodyFatPercentage Body fat percentage
 * @returns Category object with name and color
 */
export function getBodyFatCategory(
  gender: Gender,
  bodyFatPercentage: number
): { name: string; color: string } {
  for (const category of BODY_FAT_CATEGORIES) {
    const range = gender === 'male' ? category.ranges.male : category.ranges.female;

    if (range.max === undefined) {
      if (bodyFatPercentage >= range.min) {
        return { name: category.name, color: category.color };
      }
    } else if (bodyFatPercentage >= range.min && bodyFatPercentage <= range.max) {
      return { name: category.name, color: category.color };
    }
  }

  // Default fallback (should not reach here if categories are properly defined)
  return { name: 'Unknown', color: '#6B7280' };
}

/**
 * Get the healthy body fat range for a given gender
 * @param gender Gender ('male' or 'female')
 * @returns Healthy range object with min and max values
 */
export function getHealthyBodyFatRange(gender: Gender): { min: number; max: number } {
  // Find the "Fitness" category
  const fitnessCategory = BODY_FAT_CATEGORIES.find(cat => cat.name === 'Fitness');

  if (fitnessCategory) {
    const range = gender === 'male' ? fitnessCategory.ranges.male : fitnessCategory.ranges.female;
    return { min: range.min, max: range.max || range.min };
  }

  // Default fallback values if category not found
  return gender === 'male' ? { min: 14, max: 17 } : { min: 21, max: 24 };
}

/**
 * Calculate fat mass and lean mass from body weight and body fat percentage
 * @param weightKg Weight in kilograms
 * @param bodyFatPercentage Body fat percentage
 * @returns Object with fatMass and leanMass in kilograms
 */
export function calculateFatAndLeanMass(
  weightKg: number,
  bodyFatPercentage: number
): { fatMass: number; leanMass: number } {
  const fatMass = weightKg * (bodyFatPercentage / 100);
  const leanMass = weightKg - fatMass;

  return { fatMass, leanMass };
}

/**
 * Calculate body fat percentage using the selected method
 * @param method Body fat calculation method
 * @param params Parameters for the calculation
 * @returns Body fat percentage
 */
export function calculateBodyFat(
  method: BodyFatMethod,
  params: {
    gender: Gender;
    age: number;
    heightCm: number;
    weightKg: number;
    waistCm?: number;
    neckCm?: number;
    hipsCm?: number;
    bmi?: number;
    bodyFatPercentage?: number;
  }
): number {
  const { gender, age, heightCm, weightKg, waistCm, neckCm, hipsCm, bmi, bodyFatPercentage } =
    params;

  switch (method) {
    case 'navy':
      if (!waistCm || !neckCm) {
        throw new Error('Waist and neck measurements are required for the Navy method');
      }
      return calculateNavyMethodBodyFat(gender, waistCm, neckCm, heightCm, hipsCm);

    case 'bmi':
      // Calculate BMI if not provided
      const calculatedBmi = bmi || weightKg / Math.pow(heightCm / 100, 2);
      return calculateBMIMethodBodyFat(gender, age, calculatedBmi);

    case 'manual':
      if (bodyFatPercentage === undefined) {
        throw new Error('Body fat percentage is required for manual entry');
      }
      return bodyFatPercentage;

    default:
      throw new Error(`Unsupported body fat calculation method: ${method}`);
  }
}
