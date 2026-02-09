/**
 * Caffeine Intake Calculator
 *
 * Scientific References:
 * - FDA Safe Caffeine Intake: ~400mg per day for healthy adults (~6mg/kg)
 *   U.S. Food & Drug Administration. (2018). "Spilling the Beans: How Much Caffeine is Too Much?"
 *
 * - Pre-workout Caffeine Dosing: 3-6mg per kg bodyweight
 *   Goldstein et al. (2010). "International society of sports nutrition position stand: caffeine and performance"
 *   Journal of the International Society of Sports Nutrition, 7(1), 5.
 *
 * - Caffeine Half-Life: Average 5 hours (range 3-7 hours)
 *   Institute of Medicine (US) Committee on Military Nutrition Research. (2001).
 *   "Caffeine for the Sustainment of Mental Task Performance"
 *
 * - Clearance Time: 5 half-lives until effectively zero (~97% cleared)
 */

import { createLogger } from '@/utils/logger';
import {
  CaffeineFormValues,
  CaffeineResult,
  CaffeineSourceBreakdown,
} from '@/types/caffeineCalculator';
import {
  CAFFEINE_CONTENT,
  CAFFEINE_SOURCE_LABELS,
  SAFE_CAFFEINE_PER_KG,
  PRE_WORKOUT_DOSE_RANGE,
  HALF_LIFE_HOURS,
} from '@/constants/caffeineCalculator';
import { convertWeight } from '@/utils/conversions';

const logger = createLogger({ component: 'CaffeineCalculator' });

/**
 * Calculates total caffeine intake from multiple sources
 * @param sources Array of caffeine sources with servings
 * @returns Total caffeine in mg and breakdown by source
 */
export function calculateTotalCaffeine(sources: Array<{ source: string; servings: number }>): {
  total: number;
  breakdown: CaffeineSourceBreakdown[];
} {
  let total = 0;
  const breakdown: CaffeineSourceBreakdown[] = [];

  for (const item of sources) {
    const sourceData = CAFFEINE_CONTENT[item.source as keyof typeof CAFFEINE_CONTENT];
    if (!sourceData) {
      logger.warn(`Unknown caffeine source: ${item.source}`);
      continue;
    }

    const caffeineMg = sourceData.mg * item.servings;
    total += caffeineMg;

    breakdown.push({
      source: CAFFEINE_SOURCE_LABELS[item.source as keyof typeof CAFFEINE_SOURCE_LABELS],
      caffeineMg,
      servings: item.servings,
    });
  }

  return { total, breakdown };
}

/**
 * Calculates safe daily caffeine limit based on bodyweight
 * @param weightKg Weight in kilograms
 * @returns Safe daily limit in mg
 */
export function calculateSafeDailyLimit(weightKg: number): number {
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0 kg');
  }

  return Math.round(weightKg * SAFE_CAFFEINE_PER_KG);
}

/**
 * Calculates optimal pre-workout caffeine dose
 * @param weightKg Weight in kilograms
 * @returns Object with min and max pre-workout doses in mg
 */
export function calculatePreWorkoutDose(weightKg: number): { min: number; max: number } {
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0 kg');
  }

  return {
    min: Math.round(weightKg * PRE_WORKOUT_DOSE_RANGE.min),
    max: Math.round(weightKg * PRE_WORKOUT_DOSE_RANGE.max),
  };
}

/**
 * Calculates clearance time for caffeine
 * @param halfLifeHours Half-life in hours
 * @returns Clearance time string (e.g., "25 hours")
 */
export function calculateClearanceTime(halfLifeHours: number): string {
  // 5 half-lives = ~97% cleared (effectively zero)
  const clearanceHours = halfLifeHours * 5;

  if (clearanceHours < 24) {
    return `${Math.round(clearanceHours)} hours`;
  } else {
    const days = Math.floor(clearanceHours / 24);
    const hours = Math.round(clearanceHours % 24);
    return hours > 0
      ? `${days} day${days > 1 ? 's' : ''} ${hours} hours`
      : `${days} day${days > 1 ? 's' : ''}`;
  }
}

/**
 * Generates personalized recommendation based on caffeine intake
 * @param totalCaffeine Total daily caffeine in mg
 * @param safeLimit Safe daily limit in mg
 * @param percentOfLimit Percentage of safe limit
 * @param preWorkoutTiming Whether timing for pre-workout
 * @returns Recommendation string
 */
export function generateRecommendation(
  totalCaffeine: number,
  safeLimit: number,
  percentOfLimit: number,
  preWorkoutTiming: boolean
): string {
  if (totalCaffeine === 0) {
    return 'You are not consuming any caffeine. If you need an energy boost, consider moderate caffeine intake within safe limits.';
  }

  if (percentOfLimit <= 50) {
    return preWorkoutTiming
      ? 'Your caffeine intake is well below the safe limit. You can safely increase intake for pre-workout benefits if desired.'
      : 'Your caffeine intake is low and well within safe limits. This is a healthy level of consumption.';
  }

  if (percentOfLimit <= 80) {
    return preWorkoutTiming
      ? 'Your caffeine intake is moderate. Consider timing your intake 30-60 minutes before exercise for optimal performance benefits.'
      : 'Your caffeine intake is moderate and within safe limits. This is a reasonable amount for most people.';
  }

  if (percentOfLimit <= 100) {
    return preWorkoutTiming
      ? 'You are at the upper safe limit. Be cautious with pre-workout timing to avoid side effects like jitters or sleep disruption.'
      : 'You are approaching the safe limit. Consider monitoring for side effects like anxiety, jitters, or sleep issues.';
  }

  const excessMg = Math.round(totalCaffeine - safeLimit);
  return `You are exceeding the safe daily limit by ${excessMg}mg. This may cause side effects including anxiety, insomnia, rapid heart rate, and digestive issues. Consider reducing your caffeine intake gradually to avoid withdrawal symptoms.`;
}

/**
 * Process caffeine calculation based on form values
 * @param values Form values
 * @returns Caffeine result object
 */
export function processCaffeineCalculation(values: CaffeineFormValues): CaffeineResult {
  try {
    // Convert weight to kg if needed
    const weightKg =
      values.weightUnit === 'kg' ? values.weight : convertWeight(values.weight, 'lb', 'kg');

    // Validate weight
    if (weightKg <= 0) {
      throw new Error('Weight must be greater than 0');
    }

    // Calculate total caffeine intake
    const { total: totalDailyCaffeine, breakdown: sourceBreakdown } = calculateTotalCaffeine(
      values.sources
    );

    // Calculate safe daily limit
    const safeDailyLimit = calculateSafeDailyLimit(weightKg);

    // Calculate percentage of safe limit
    const percentOfLimit = Math.round((totalDailyCaffeine / safeDailyLimit) * 100);

    // Check if over limit
    const isOverLimit = totalDailyCaffeine > safeDailyLimit;

    // Calculate pre-workout dose range
    const preWorkoutDoseRange = calculatePreWorkoutDose(weightKg);
    const preWorkoutDose = Math.round((preWorkoutDoseRange.min + preWorkoutDoseRange.max) / 2);

    // Get half-life based on sensitivity
    const halfLifeHours = HALF_LIFE_HOURS[values.sensitivityLevel];

    // Calculate clearance time
    const clearanceTime = calculateClearanceTime(halfLifeHours);

    // Generate recommendation
    const recommendation = generateRecommendation(
      totalDailyCaffeine,
      safeDailyLimit,
      percentOfLimit,
      values.preWorkoutTiming
    );

    return {
      totalDailyCaffeine,
      safeDailyLimit,
      isOverLimit,
      percentOfLimit,
      preWorkoutDose,
      halfLifeHours,
      clearanceTime,
      recommendation,
      sourceBreakdown,
    };
  } catch (error) {
    logger.logError('Error calculating caffeine intake', error);
    throw error;
  }
}
