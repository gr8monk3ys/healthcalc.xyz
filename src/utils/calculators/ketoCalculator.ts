/**
 * Keto Macro Calculator
 *
 * Calculates personalized ketogenic diet macronutrient targets based on:
 * - Body composition and metabolic rate
 * - Keto diet type (standard, targeted, cyclical)
 * - Goal (fat loss, maintenance, muscle gain)
 *
 * Scientific References:
 * - Volek, J.S. & Phinney, S.D. (2011). "The Art and Science of Low Carbohydrate Living"
 * - Paoli, A. et al. (2013). "Beyond weight loss: a review of the therapeutic uses of
 *   very-low-carbohydrate (ketogenic) diets"
 * - Wilson, J.M. et al. (2017). "The effects of ketogenic dieting on skeletal muscle and fat mass"
 */

import { createLogger } from '@/utils/logger';
import { KetoFormValues, KetoResult, KetoType, KetoGoal } from '@/types/ketoCalculator';
import {
  KETO_MACRO_RATIOS,
  KETO_GOAL_ADJUSTMENTS,
  MIN_PROTEIN_PER_LB_LEAN,
  KETO_CARB_LIMITS,
  FIBER_TARGET_RANGE,
  CALORIES_PER_GRAM,
  KETO_WARNINGS,
} from '@/constants/ketoCalculator';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from './tdee';
import { convertWeight, heightFtInToCm } from '@/utils/conversions';

const logger = createLogger({ component: 'KetoCalculator' });

/**
 * Estimates body fat percentage if not provided
 * Uses a simplified estimation based on gender
 * @param gender User's gender
 * @returns Estimated body fat percentage
 */
function estimateBodyFat(gender: 'male' | 'female'): number {
  return gender === 'male' ? 20 : 28;
}

/**
 * Calculates lean body mass
 * @param weightKg Total body weight in kg
 * @param bodyFatPercentage Body fat percentage
 * @returns Lean body mass in kg
 */
function calculateLeanBodyMass(weightKg: number, bodyFatPercentage: number): number {
  return weightKg * (1 - bodyFatPercentage / 100);
}

/**
 * Calculates minimum protein requirement based on lean body mass
 * @param leanBodyMassKg Lean body mass in kg
 * @returns Minimum protein in grams
 */
function calculateMinProtein(leanBodyMassKg: number): number {
  const leanBodyMassLb = leanBodyMassKg * 2.20462;
  return Math.round(leanBodyMassLb * MIN_PROTEIN_PER_LB_LEAN);
}

/**
 * Adjusts daily calorie target based on goal
 * @param tdee Total Daily Energy Expenditure
 * @param goal Keto goal
 * @returns Adjusted calorie target
 */
function adjustCaloriesForGoal(tdee: number, goal: KetoGoal): number {
  const adjustment = KETO_GOAL_ADJUSTMENTS[goal];
  const adjustedCalories = tdee * (1 + adjustment);

  // Ensure minimum safe calorie intake
  const minCalories = 1200;
  return Math.max(Math.round(adjustedCalories), minCalories);
}

/**
 * Calculates keto macros based on type and adjusted calories
 * @param dailyCalories Adjusted daily calorie target
 * @param ketoType Type of keto diet
 * @param minProteinGrams Minimum protein requirement
 * @returns Object with macro amounts and percentages
 */
function computeKetoMacros(
  dailyCalories: number,
  ketoType: KetoType,
  minProteinGrams: number
): {
  fatGrams: number;
  fatCalories: number;
  fatPercentage: number;
  proteinGrams: number;
  proteinCalories: number;
  proteinPercentage: number;
  netCarbGrams: number;
  netCarbCalories: number;
  netCarbPercentage: number;
} {
  const ratios = KETO_MACRO_RATIOS[ketoType];

  // Calculate protein calories and grams
  const proteinCalories = Math.round((dailyCalories * ratios.protein) / 100);
  let proteinGrams = Math.round(proteinCalories / CALORIES_PER_GRAM.protein);

  // Ensure protein meets minimum requirement
  if (proteinGrams < minProteinGrams) {
    proteinGrams = minProteinGrams;
  }

  const actualProteinCalories = proteinGrams * CALORIES_PER_GRAM.protein;

  // Calculate net carb limit based on keto type
  const netCarbGrams =
    ketoType === 'standard' || ketoType === 'cyclical'
      ? KETO_CARB_LIMITS.standard
      : KETO_CARB_LIMITS.targeted;

  const netCarbCalories = netCarbGrams * CALORIES_PER_GRAM.carbs;

  // Remaining calories go to fat
  const fatCalories = dailyCalories - actualProteinCalories - netCarbCalories;
  const fatGrams = Math.round(fatCalories / CALORIES_PER_GRAM.fat);

  // Calculate actual percentages
  const totalCalories = actualProteinCalories + netCarbCalories + fatCalories;
  const fatPercentage = Math.round((fatCalories / totalCalories) * 100);
  const proteinPercentage = Math.round((actualProteinCalories / totalCalories) * 100);
  const netCarbPercentage = Math.round((netCarbCalories / totalCalories) * 100);

  return {
    fatGrams,
    fatCalories: Math.round(fatCalories),
    fatPercentage,
    proteinGrams,
    proteinCalories: actualProteinCalories,
    proteinPercentage,
    netCarbGrams,
    netCarbCalories,
    netCarbPercentage,
  };
}

/**
 * Generates personalized recommendation based on keto type and goal
 * @param ketoType Type of keto diet
 * @param goal Keto goal
 * @param bodyFatPercentage Body fat percentage
 * @returns Recommendation string
 */
function generateRecommendation(
  ketoType: KetoType,
  goal: KetoGoal,
  bodyFatPercentage: number
): string {
  const recommendations: string[] = [];

  if (ketoType === 'standard') {
    recommendations.push(
      'Standard keto is perfect for consistent ketosis and steady fat loss. Focus on whole, unprocessed foods.'
    );
  } else if (ketoType === 'targeted') {
    recommendations.push(
      'Targeted keto works well for active individuals. Consume extra carbs 30-60 minutes before intense workouts.'
    );
  } else {
    recommendations.push(
      'Cyclical keto requires discipline. Follow strict keto 5-6 days, then refeed with healthy carbs for 1-2 days.'
    );
  }

  if (goal === 'weight-loss') {
    recommendations.push(
      'Track your ketones weekly and adjust if needed. Expect 1-2 lbs fat loss per week once adapted.'
    );
  } else if (goal === 'muscle-gain') {
    recommendations.push(
      'Building muscle in ketosis requires patience. Prioritize heavy resistance training and adequate protein.'
    );
  }

  if (bodyFatPercentage < 15) {
    recommendations.push(
      'At your body fat level, consider targeted or cyclical keto for performance.'
    );
  }

  return recommendations.join(' ');
}

/**
 * Generates warnings based on calculated macros
 * @param proteinGrams Daily protein target
 * @param dailyCalories Daily calorie target
 * @param leanBodyMassKg Lean body mass
 * @returns Array of warning strings
 */
function generateWarnings(
  proteinGrams: number,
  dailyCalories: number,
  leanBodyMassKg: number
): string[] {
  const warnings: string[] = [];

  // Check protein adequacy
  const proteinPerLb = proteinGrams / (leanBodyMassKg * 2.20462);
  if (proteinPerLb < 0.7) {
    warnings.push(KETO_WARNINGS.lowProtein);
  } else if (proteinPerLb > 1.5) {
    warnings.push(KETO_WARNINGS.highProtein);
  }

  // Check calorie adequacy
  if (dailyCalories < 1400) {
    warnings.push(KETO_WARNINGS.veryLowCalories);
  }

  // Always include electrolyte reminder
  warnings.push(KETO_WARNINGS.electrolytes);

  return warnings;
}

/**
 * Main keto calculator function
 * @param values Form input values
 * @returns Keto calculation results
 */
export function calculateKetoMacros(values: KetoFormValues): KetoResult {
  try {
    // Convert height to cm if needed
    const heightCm = values.useMetric
      ? values.heightCm
      : heightFtInToCm(values.heightFt, values.heightIn);

    // Convert weight to kg if needed
    const weightKg =
      values.weightUnit === 'kg' ? values.weight : convertWeight(values.weight, 'lb', 'kg');

    // Validate inputs
    if (values.age <= 0 || values.age > 120) {
      throw new Error('Age must be between 1 and 120 years');
    }

    if (weightKg <= 0) {
      throw new Error('Weight must be greater than 0');
    }

    if (heightCm <= 0) {
      throw new Error('Height must be greater than 0');
    }

    // Calculate BMR
    const bmr = calculateBMR(values.gender, values.age, weightKg, heightCm);

    // Get activity multiplier and calculate TDEE
    const activityMultiplier = getActivityMultiplier(values.activityLevel);
    const tdee = calculateTDEE(bmr, activityMultiplier);

    // Estimate body fat if not provided
    const bodyFatPercentage = values.bodyFatPercentage || estimateBodyFat(values.gender);

    // Calculate lean body mass
    const leanBodyMassKg = calculateLeanBodyMass(weightKg, bodyFatPercentage);

    // Calculate minimum protein requirement
    const minProteinGrams = calculateMinProtein(leanBodyMassKg);

    // Adjust calories for goal
    const dailyCalories = adjustCaloriesForGoal(tdee, values.goal);

    // Calculate macros
    const macros = computeKetoMacros(dailyCalories, values.ketoType, minProteinGrams);

    // Calculate fiber target
    const fiberTarget = Math.round((FIBER_TARGET_RANGE.min + FIBER_TARGET_RANGE.max) / 2);

    // Generate recommendation
    const recommendation = generateRecommendation(values.ketoType, values.goal, bodyFatPercentage);

    // Generate warnings
    const warnings = generateWarnings(macros.proteinGrams, dailyCalories, leanBodyMassKg);

    return {
      dailyCalories,
      ...macros,
      fiberTarget,
      tdee: Math.round(tdee),
      bmr: Math.round(bmr),
      recommendation,
      warnings,
    };
  } catch (error) {
    logger.logError('Error calculating keto macros', error);
    throw error;
  }
}
