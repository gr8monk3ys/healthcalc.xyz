/**
 * Protein Intake Calculator
 *
 * Scientific References:
 * - Institute of Medicine (2005): Dietary Reference Intakes for Energy, Carbohydrate,
 *   Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. RDA: 0.8 g/kg
 *
 * - Morton et al. (2018): "A systematic review, meta-analysis and meta-regression of
 *   the effect of protein supplementation on resistance training-induced gains in
 *   muscle mass and strength in healthy adults." British Journal of Sports Medicine.
 *   Recommendation: 1.6-2.2 g/kg for strength athletes.
 *
 * - Phillips & Van Loon (2011): "Dietary protein for athletes: From requirements to
 *   optimum adaptation." Journal of Sports Sciences. Higher protein during weight loss.
 *
 * - Bauer et al. (2013): "Evidence-based recommendations for optimal dietary protein
 *   intake in older people: A position paper from the PROT-AGE Study Group."
 *   Older adults need 1.0-1.2 g/kg or higher.
 *
 * - Helms et al. (2014): "A systematic review of dietary protein during caloric
 *   restriction in resistance trained lean athletes." Recommendation: 2.3-3.1 g/kg
 *   of lean body mass during aggressive cuts.
 *
 * Formulas:
 * - Base protein = weight (kg) × protein factor (g/kg)
 * - Adjusted for goal and age
 * - Protein calories = protein (g) × 4 kcal/g
 */

import { createLogger } from '@/utils/logger';
import { ProteinFormValues, ProteinResult, ProteinGoal } from '@/types/protein';
import { ActivityLevel } from '@/types/common';
import {
  PROTEIN_REQUIREMENTS_BY_ACTIVITY,
  PROTEIN_GOAL_ADJUSTMENTS,
  PROTEIN_LIMITS,
  AGE_PROTEIN_ADJUSTMENTS,
  PROTEIN_RECOMMENDATIONS,
} from '@/constants/protein';
import { convertWeight, heightFtInToCm } from '@/utils/conversions';

const logger = createLogger({ component: 'ProteinCalculator' });

/**
 * Gets the protein requirement range for a given activity level
 * @param activityLevel - User's activity level
 * @returns Protein requirement object with min, max, and optimal g/kg values
 */
export function getProteinRequirement(activityLevel: ActivityLevel): {
  minPerKg: number;
  maxPerKg: number;
  optimalPerKg: number;
} {
  const requirement = PROTEIN_REQUIREMENTS_BY_ACTIVITY[activityLevel];

  if (!requirement) {
    logger.warn(`Activity level '${activityLevel}' not found, defaulting to sedentary`);
    return PROTEIN_REQUIREMENTS_BY_ACTIVITY.sedentary;
  }

  return {
    minPerKg: requirement.minPerKg,
    maxPerKg: requirement.maxPerKg,
    optimalPerKg: requirement.optimalPerKg,
  };
}

/**
 * Gets the age-based protein adjustment multiplier
 * @param age - User's age in years
 * @returns Multiplier to apply to base protein requirements
 */
export function getAgeAdjustment(age: number): number {
  if (age <= 0 || age > 120) {
    throw new Error('Age must be between 1 and 120 years');
  }

  const adjustment = AGE_PROTEIN_ADJUSTMENTS.find(adj => age >= adj.minAge && age <= adj.maxAge);

  return adjustment?.multiplier ?? 1.0;
}

/**
 * Gets the goal-based protein adjustment
 * @param goal - User's protein/fitness goal
 * @returns Adjustment object with multiplier and additional g/kg
 */
export function getGoalAdjustment(goal: ProteinGoal): {
  multiplier: number;
  additionalPerKg: number;
} {
  const adjustment = PROTEIN_GOAL_ADJUSTMENTS[goal];

  if (!adjustment) {
    logger.warn(`Goal '${goal}' not found, defaulting to maintain`);
    return PROTEIN_GOAL_ADJUSTMENTS.maintain;
  }

  return {
    multiplier: adjustment.multiplier,
    additionalPerKg: adjustment.additionalPerKg,
  };
}

/**
 * Calculates daily protein intake based on weight and activity level
 * @param weightKg - Body weight in kilograms
 * @param activityLevel - Activity level
 * @param goal - Fitness/health goal
 * @param age - Age in years
 * @returns Optimal daily protein intake in grams
 */
export function calculateDailyProtein(
  weightKg: number,
  activityLevel: ActivityLevel,
  goal: ProteinGoal = 'maintain',
  age: number = 30
): number {
  // Input validation
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0 kg');
  }

  if (age <= 0 || age > 120) {
    throw new Error('Age must be between 1 and 120 years');
  }

  // Get base requirement
  const requirement = getProteinRequirement(activityLevel);
  const baseProteinPerKg = requirement.optimalPerKg;

  // Apply goal adjustment
  const goalAdjustment = getGoalAdjustment(goal);
  const adjustedProteinPerKg =
    baseProteinPerKg * goalAdjustment.multiplier + goalAdjustment.additionalPerKg;

  // Apply age adjustment
  const ageMultiplier = getAgeAdjustment(age);
  const finalProteinPerKg = adjustedProteinPerKg * ageMultiplier;

  // Calculate total daily protein
  const dailyProtein = weightKg * finalProteinPerKg;

  // Ensure minimum intake
  const minimumProtein = weightKg * PROTEIN_LIMITS.absoluteMinPerKg;

  return Math.max(dailyProtein, minimumProtein);
}

/**
 * Calculates the protein intake range (min/max) for a given set of parameters
 * @param weightKg - Body weight in kilograms
 * @param activityLevel - Activity level
 * @param goal - Fitness/health goal
 * @param age - Age in years
 * @returns Object with min and max protein intake in grams
 */
export function calculateProteinRange(
  weightKg: number,
  activityLevel: ActivityLevel,
  goal: ProteinGoal = 'maintain',
  age: number = 30
): { min: number; max: number } {
  // Input validation
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0 kg');
  }

  if (age <= 0 || age > 120) {
    throw new Error('Age must be between 1 and 120 years');
  }

  // Get base requirement range
  const requirement = getProteinRequirement(activityLevel);

  // Apply goal adjustment
  const goalAdjustment = getGoalAdjustment(goal);
  const adjustedMinPerKg =
    requirement.minPerKg * goalAdjustment.multiplier + goalAdjustment.additionalPerKg * 0.5;
  const adjustedMaxPerKg =
    requirement.maxPerKg * goalAdjustment.multiplier + goalAdjustment.additionalPerKg;

  // Apply age adjustment
  const ageMultiplier = getAgeAdjustment(age);
  const finalMinPerKg = adjustedMinPerKg * ageMultiplier;
  const finalMaxPerKg = Math.min(
    adjustedMaxPerKg * ageMultiplier,
    PROTEIN_LIMITS.recommendedMaxPerKg
  );

  // Calculate actual grams
  const minProtein = Math.max(weightKg * finalMinPerKg, weightKg * PROTEIN_LIMITS.absoluteMinPerKg);
  const maxProtein = weightKg * finalMaxPerKg;

  return {
    min: Math.round(minProtein),
    max: Math.round(maxProtein),
  };
}

/**
 * Calculates protein per meal based on daily requirement
 * @param dailyProtein - Total daily protein in grams
 * @returns Protein per meal for different meal frequencies
 */
export function calculateProteinPerMeal(dailyProtein: number): {
  threeMeals: number;
  fourMeals: number;
  fiveMeals: number;
} {
  if (dailyProtein <= 0) {
    throw new Error('Daily protein must be greater than 0');
  }

  return {
    threeMeals: Math.round(dailyProtein / 3),
    fourMeals: Math.round(dailyProtein / 4),
    fiveMeals: Math.round(dailyProtein / 5),
  };
}

/**
 * Gets recommendation text and color based on protein per kg
 * @param proteinPerKg - Protein intake per kg of body weight
 * @returns Recommendation object with message and color
 */
export function getProteinRecommendation(proteinPerKg: number): {
  message: string;
  color: string;
} {
  if (proteinPerKg < PROTEIN_LIMITS.absoluteMinPerKg) {
    return {
      message: PROTEIN_RECOMMENDATIONS.low.message,
      color: PROTEIN_RECOMMENDATIONS.low.color,
    };
  }

  if (proteinPerKg > PROTEIN_LIMITS.safeUpperLimitPerKg) {
    return {
      message: PROTEIN_RECOMMENDATIONS.veryHigh.message,
      color: PROTEIN_RECOMMENDATIONS.veryHigh.color,
    };
  }

  if (proteinPerKg > PROTEIN_LIMITS.recommendedMaxPerKg) {
    return {
      message: PROTEIN_RECOMMENDATIONS.high.message,
      color: PROTEIN_RECOMMENDATIONS.high.color,
    };
  }

  return {
    message: PROTEIN_RECOMMENDATIONS.optimal.message,
    color: PROTEIN_RECOMMENDATIONS.optimal.color,
  };
}

/**
 * Process protein calculation based on form values
 * @param values - Form values from the calculator
 * @returns Complete protein result object
 */
export function processProteinCalculation(values: ProteinFormValues): ProteinResult {
  if (!values) {
    throw new Error('Form values are required');
  }

  try {
    // Convert height to cm if needed (for potential future use/BMI calculations)
    const heightCm =
      values.heightUnit === 'cm'
        ? values.heightCm
        : heightFtInToCm(values.heightFt, values.heightIn);

    // Convert weight to kg if needed
    const weightKg =
      values.weightUnit === 'kg' ? values.weightKg : convertWeight(values.weightLb, 'lb', 'kg');

    // Validate inputs
    if (weightKg <= 0) {
      throw new Error('Weight must be greater than 0');
    }

    if (values.age <= 0 || values.age > 120) {
      throw new Error('Age must be between 1 and 120 years');
    }

    // Calculate daily protein
    const dailyProteinGrams = calculateDailyProtein(
      weightKg,
      values.activityLevel,
      values.goal,
      values.age
    );

    // Calculate protein range
    const proteinRange = calculateProteinRange(
      weightKg,
      values.activityLevel,
      values.goal,
      values.age
    );

    // Calculate protein per kg and per lb
    const proteinPerKg = dailyProteinGrams / weightKg;
    const proteinPerLb = dailyProteinGrams / convertWeight(weightKg, 'kg', 'lb');

    // Calculate protein per meal
    const proteinPerMeal = calculateProteinPerMeal(dailyProteinGrams);

    // Calculate calories from protein (4 kcal per gram)
    const proteinCalories = Math.round(dailyProteinGrams * 4);

    // Get recommendation
    const recommendation = getProteinRecommendation(proteinPerKg);

    return {
      dailyProteinGrams: Math.round(dailyProteinGrams),
      minProteinGrams: proteinRange.min,
      maxProteinGrams: proteinRange.max,
      proteinPerKg: parseFloat(proteinPerKg.toFixed(2)),
      proteinPerLb: parseFloat(proteinPerLb.toFixed(2)),
      proteinPerMeal,
      proteinCalories,
      recommendation: recommendation.message,
      color: recommendation.color,
    };
  } catch (error) {
    logger.logError('Error calculating protein intake', error);
    throw error;
  }
}

/**
 * Calculates lean body mass protein requirement
 * Uses body fat percentage to calculate protein based on lean mass
 * @param weightKg - Total body weight in kg
 * @param bodyFatPercentage - Body fat percentage
 * @param proteinPerKgLeanMass - Protein per kg of lean body mass
 * @returns Daily protein requirement in grams
 */
export function calculateProteinFromLeanMass(
  weightKg: number,
  bodyFatPercentage: number,
  proteinPerKgLeanMass: number = 2.2
): number {
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0 kg');
  }

  if (bodyFatPercentage < 0 || bodyFatPercentage > 70) {
    throw new Error('Body fat percentage must be between 0 and 70');
  }

  if (proteinPerKgLeanMass <= 0) {
    throw new Error('Protein per kg of lean mass must be greater than 0');
  }

  const leanBodyMass = weightKg * (1 - bodyFatPercentage / 100);
  return leanBodyMass * proteinPerKgLeanMass;
}
