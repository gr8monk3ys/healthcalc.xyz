/**
 * Fat-Free Mass Index (FFMI) Calculator
 *
 * Scientific References:
 * - Kouri et al. (1995). "Fat-free mass index in users and nonusers of anabolic-androgenic steroids"
 *   Clinical Journal of Sport Medicine, 5(4), 223-228
 *
 * - Schutz et al. (2002). "Fat-free mass index and fat mass index percentiles in Caucasians aged 18-98 y"
 *   International Journal of Obesity, 26(7), 953-960
 *
 * Formulas:
 * - Lean Mass (kg) = Weight (kg) × (1 - Body Fat % / 100)
 * - FFMI = Lean Mass (kg) / (Height (m))²
 * - Adjusted FFMI = FFMI + 6.1 × (1.8 - Height (m))
 *
 * The adjusted FFMI normalizes for height differences, as taller individuals tend to have lower FFMI.
 *
 * FFMI Categories:
 * - Below 18: Below Average
 * - 18-20: Average (typical untrained)
 * - 20-22: Above Average (good training)
 * - 22-23: Excellent (dedicated training)
 * - 23-25: Superior (near natural limit)
 * - 25-27: Suspicious (likely not natural)
 * - 27+: Almost certainly not natural
 *
 * The natural limit (FFMI ~25) is based on research comparing drug-free and steroid-using athletes.
 */

import { WeightUnit } from '@/types/common';
import { FFMIResult } from '@/types/ffmi';
import { FFMI_CATEGORIES, NATURAL_FFMI_LIMIT } from '@/constants/ffmi';
import { validateWeight, validateHeight, validateBodyFatPercentage } from '@/utils/validation';

/**
 * Calculate lean mass from weight and body fat percentage
 * @param weightKg Weight in kilograms
 * @param bodyFatPercentage Body fat percentage (0-100)
 * @returns Lean mass in kilograms
 */
export function calculateLeanMass(weightKg: number, bodyFatPercentage: number): number {
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0');
  }

  if (bodyFatPercentage < 0 || bodyFatPercentage > 100) {
    throw new Error('Body fat percentage must be between 0 and 100');
  }

  const leanMass = weightKg * (1 - bodyFatPercentage / 100);
  return Math.max(leanMass, 0);
}

/**
 * Calculate fat mass from weight and body fat percentage
 * @param weightKg Weight in kilograms
 * @param bodyFatPercentage Body fat percentage (0-100)
 * @returns Fat mass in kilograms
 */
export function calculateFatMass(weightKg: number, bodyFatPercentage: number): number {
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0');
  }

  if (bodyFatPercentage < 0 || bodyFatPercentage > 100) {
    throw new Error('Body fat percentage must be between 0 and 100');
  }

  const fatMass = weightKg * (bodyFatPercentage / 100);
  return Math.max(fatMass, 0);
}

/**
 * Calculate FFMI (Fat-Free Mass Index)
 * @param leanMassKg Lean mass in kilograms
 * @param heightM Height in meters
 * @returns FFMI value
 */
export function calculateFFMI(leanMassKg: number, heightM: number): number {
  if (leanMassKg <= 0) {
    throw new Error('Lean mass must be greater than 0');
  }

  if (heightM <= 0) {
    throw new Error('Height must be greater than 0');
  }

  const ffmi = leanMassKg / Math.pow(heightM, 2);
  return ffmi;
}

/**
 * Calculate adjusted FFMI (normalized for height)
 * Adjusts FFMI to account for height differences, normalizing to 1.8m (5'11")
 * @param ffmi FFMI value
 * @param heightM Height in meters
 * @returns Adjusted FFMI value
 */
export function calculateAdjustedFFMI(ffmi: number, heightM: number): number {
  if (ffmi <= 0) {
    throw new Error('FFMI must be greater than 0');
  }

  if (heightM <= 0) {
    throw new Error('Height must be greater than 0');
  }

  const adjustedFFMI = ffmi + 6.1 * (1.8 - heightM);
  return adjustedFFMI;
}

/**
 * Get FFMI category based on adjusted FFMI value
 * @param adjustedFFMI Adjusted FFMI value
 * @returns Category object with name, color, and description
 */
export function getFFMICategory(adjustedFFMI: number): {
  name: string;
  color: string;
  description: string;
} {
  for (const category of FFMI_CATEGORIES) {
    if (category.range.max === undefined) {
      if (adjustedFFMI >= category.range.min) {
        return {
          name: category.name,
          color: category.color,
          description: category.description,
        };
      }
    } else if (adjustedFFMI >= category.range.min && adjustedFFMI < category.range.max) {
      return {
        name: category.name,
        color: category.color,
        description: category.description,
      };
    }
  }

  // Default fallback
  return {
    name: 'Unknown',
    color: '#6B7280',
    description: 'Unable to determine category',
  };
}

/**
 * Determine if FFMI is likely natural
 * @param adjustedFFMI Adjusted FFMI value
 * @returns Boolean indicating if likely natural
 */
export function isLikelyNatural(adjustedFFMI: number): boolean {
  return adjustedFFMI < NATURAL_FFMI_LIMIT;
}

/**
 * Get natural limit interpretation
 * @param adjustedFFMI Adjusted FFMI value
 * @returns Description of how close to natural limit
 */
export function getNaturalLimitInterpretation(adjustedFFMI: number): string {
  if (adjustedFFMI < 18) {
    return 'Well below natural limit';
  } else if (adjustedFFMI < 22) {
    return 'Below natural limit with room for growth';
  } else if (adjustedFFMI < 24) {
    return 'Approaching natural limit';
  } else if (adjustedFFMI < 25) {
    return 'Near natural limit';
  } else if (adjustedFFMI < 26) {
    return 'At or slightly above typical natural limit';
  } else if (adjustedFFMI < 27) {
    return 'Above natural limit, likely enhanced';
  } else {
    return 'Well above natural limit, almost certainly enhanced';
  }
}

/**
 * Validate FFMI calculation inputs
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @param bodyFatPercentage Body fat percentage (0-100)
 * @returns Validation result with any errors
 */
export function validateFFMIInputs(
  weightKg: number,
  heightCm: number,
  bodyFatPercentage: number
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate weight
  const weightValidation = validateWeight(weightKg, 'metric');
  if (!weightValidation.isValid && weightValidation.error) {
    errors.push(weightValidation.error);
  }

  // Validate height
  const heightValidation = validateHeight(heightCm, 'metric');
  if (!heightValidation.isValid && heightValidation.error) {
    errors.push(heightValidation.error);
  }

  // Validate body fat percentage
  const bodyFatValidation = validateBodyFatPercentage(bodyFatPercentage);
  if (!bodyFatValidation.isValid && bodyFatValidation.error) {
    errors.push(bodyFatValidation.error);
  }

  // Additional FFMI-specific validations
  if (bodyFatPercentage > 60) {
    errors.push('Body fat percentage seems unusually high. Please verify your input.');
  }

  if (weightKg > 0 && heightCm > 0) {
    const leanMass = calculateLeanMass(weightKg, bodyFatPercentage);
    if (leanMass < 20) {
      errors.push('Calculated lean mass is very low. Please verify your inputs.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Process complete FFMI calculation
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @param bodyFatPercentage Body fat percentage (0-100)
 * @param weightUnit Weight unit for display
 * @returns Complete FFMI result
 */
export function processFFMICalculation(
  weightKg: number,
  heightCm: number,
  bodyFatPercentage: number,
  weightUnit: WeightUnit = 'kg'
): FFMIResult {
  // Validate inputs
  const validation = validateFFMIInputs(weightKg, heightCm, bodyFatPercentage);
  if (!validation.isValid) {
    throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
  }

  // Convert height to meters
  const heightM = heightCm / 100;

  // Calculate lean and fat mass
  const leanMass = calculateLeanMass(weightKg, bodyFatPercentage);
  const fatMass = calculateFatMass(weightKg, bodyFatPercentage);

  // Calculate FFMI and adjusted FFMI
  const ffmi = calculateFFMI(leanMass, heightM);
  const adjustedFFMI = calculateAdjustedFFMI(ffmi, heightM);

  // Get category and natural status
  const category = getFFMICategory(adjustedFFMI);
  const isNatural = isLikelyNatural(adjustedFFMI);
  const naturalLimit = getNaturalLimitInterpretation(adjustedFFMI);

  // Convert masses to display unit if needed
  let displayLeanMass = leanMass;
  let displayFatMass = fatMass;
  if (weightUnit === 'lb') {
    displayLeanMass = leanMass * 2.20462;
    displayFatMass = fatMass * 2.20462;
  }

  return {
    ffmi: Math.round(ffmi * 10) / 10,
    adjustedFFMI: Math.round(adjustedFFMI * 10) / 10,
    leanMass: Math.round(displayLeanMass * 10) / 10,
    fatMass: Math.round(displayFatMass * 10) / 10,
    category: category.name,
    categoryColor: category.color,
    isNatural,
    naturalLimit,
    weightUnit,
  };
}
