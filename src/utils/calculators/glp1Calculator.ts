/**
 * GLP-1 / Semaglutide Calorie & Protein Calculator
 *
 * Calculates adjusted calorie needs, protein targets, and macro distribution
 * for users on GLP-1 receptor agonist medications.
 *
 * Scientific References:
 * - Wilding et al. (2021): STEP 1 - Semaglutide reduces calorie intake ~20-35%
 * - Jastreboff et al. (2022): SURMOUNT-1 - Tirzepatide 5-15mg weight loss 15-22.5%
 * - Heymsfield et al. (2023): ~25-40% of weight lost on GLP-1s is lean mass
 * - Mechanick et al. (2023): Protein intake 1.2-1.6 g/kg recommended on GLP-1 therapy
 * - Mifflin-St Jeor (1990): BMR estimation formula
 *
 * Formula:
 * BMR (Mifflin-St Jeor):
 *   Male: 10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161 + 166
 *   Female: 10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161
 * TDEE = BMR * activity_multiplier
 * Adjusted Calories = TDEE * (1 - appetite_reduction_factor)
 */

import { GLP1FormValues, GLP1Result } from '@/types/glp1Calculator';
import {
  MEDICATION_INFO,
  ACTIVITY_MULTIPLIERS,
  PROTEIN_TARGETS,
  MINIMUM_CALORIES,
  FIBER_RANGE,
  NUTRIENT_PRIORITIES,
  GLP1_WARNINGS,
} from '@/constants/glp1Calculator';

/**
 * Calculate BMR using Mifflin-St Jeor equation
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (weightKg <= 0) throw new Error('Weight must be greater than 0');
  if (heightCm <= 0) throw new Error('Height must be greater than 0');
  if (age <= 0) throw new Error('Age must be greater than 0');

  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

/**
 * Process full GLP-1 calculator computation
 */
export function processGLP1Calculation(values: GLP1FormValues): GLP1Result {
  const { weight, height, age, gender, medication, activityLevel, goal } = values;

  if (weight <= 0) throw new Error('Weight must be greater than 0');
  if (height <= 0) throw new Error('Height must be greater than 0');
  if (age <= 0 || age > 120) throw new Error('Age must be between 1 and 120');

  // Step 1: Calculate BMR
  const bmr = calculateBMR(weight, height, age, gender);

  // Step 2: Calculate TDEE
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  const tdee = bmr * activityMultiplier;

  // Step 3: Apply medication-specific appetite reduction
  const medInfo = MEDICATION_INFO[medication];
  let adjustedCalories = Math.round(tdee * (1 - medInfo.appetiteReduction));

  // Step 4: Enforce minimum calorie floor
  const minCal = MINIMUM_CALORIES[gender];
  const warnings: string[] = [];

  if (adjustedCalories < minCal) {
    adjustedCalories = minCal;
    warnings.push(GLP1_WARNINGS.lowCalorie);
  }

  // Step 5: Calculate protein targets
  const proteinTargets = PROTEIN_TARGETS[goal];
  const proteinMinGrams = Math.round(weight * proteinTargets.min);
  const proteinMaxGrams = Math.round(weight * proteinTargets.max);
  const proteinGrams = Math.round((proteinMinGrams + proteinMaxGrams) / 2);
  const proteinCalories = proteinGrams * 4;
  const proteinPercentage = Math.round((proteinCalories / adjustedCalories) * 100);

  // Step 6: Calculate fat (25-30% of calories)
  const fatPercentage = goal === 'weight-loss' ? 0.25 : 0.3;
  const fatCalories = Math.round(adjustedCalories * fatPercentage);
  const fatGrams = Math.round(fatCalories / 9);

  // Step 7: Calculate carbs (remainder)
  const carbCalories = adjustedCalories - proteinCalories - fatCalories;
  const carbGrams = Math.max(0, Math.round(carbCalories / 4));

  // Step 8: Hydration (0.033 L per kg body weight, minimum 2L)
  const hydrationLiters = Math.max(2, Math.round(weight * 0.033 * 10) / 10);

  // Step 9: Expected weight loss
  const weeklyDeficit = (tdee - adjustedCalories) * 7;
  const expectedWeightLossPerWeek = {
    min: Math.round((weeklyDeficit / 7700) * 10) / 10, // 7700 cal per kg fat
    max: Math.round((weeklyDeficit / 7700) * 1.3 * 10) / 10, // medication boost
  };

  // Step 10: Add standard warnings
  warnings.push(GLP1_WARNINGS.highProtein);
  warnings.push(GLP1_WARNINGS.exercise);
  warnings.push(GLP1_WARNINGS.hydration);
  warnings.push(GLP1_WARNINGS.medical);

  return {
    adjustedCalories,
    proteinMinGrams,
    proteinMaxGrams,
    proteinPercentage,
    fatGrams,
    carbGrams,
    fiberMinGrams: FIBER_RANGE.min,
    hydrationLiters,
    expectedWeightLossPerWeek,
    nutrientPriorities: [...NUTRIENT_PRIORITIES],
    warnings,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
  };
}
