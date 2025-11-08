/**
 * Calorie Deficit Calculator
 * Calculates weight loss timeline based on calorie deficit
 */

import {
  CalorieDeficitFormData,
  CalorieDeficitResult,
  DeficitOption,
} from '@/types/calorieDeficit';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from './tdee';
import {
  DEFICIT_OPTIONS,
  MIN_CALORIES,
  CALORIES_PER_KG_FAT,
  PROTEIN_PER_KG,
  WATER_PER_KG,
  PROJECTION_PARAMS,
} from '@/constants/calorieDeficit';

/**
 * Get deficit option by level
 */
export function getDeficitOption(level: 'mild' | 'moderate' | 'aggressive'): DeficitOption {
  const option = DEFICIT_OPTIONS.find(opt => opt.level === level);
  if (!option) {
    throw new Error(`Invalid deficit level: ${level}`);
  }
  return option;
}

/**
 * Calculate calorie deficit and weight loss timeline
 */
export function calculateCalorieDeficit(
  formData: CalorieDeficitFormData
): CalorieDeficitResult {
  const { gender, age, heightCm, weightKg, activityLevel, goalWeightKg, deficitLevel } = formData;

  // Validation
  if (goalWeightKg >= weightKg) {
    throw new Error('Goal weight must be less than current weight');
  }

  // Calculate current TDEE
  const activityMultiplier = getActivityMultiplier(activityLevel);
  const bmr = calculateBMR(gender, age, weightKg, heightCm);
  const tdee = calculateTDEE(bmr, activityMultiplier);

  // Get deficit option
  const deficitOption = getDeficitOption(deficitLevel);
  const dailyDeficit = deficitOption.dailyDeficit;
  const dailyCalorieTarget = Math.round(tdee - dailyDeficit);

  // Safety checks
  const minCalories = MIN_CALORIES[gender];
  const warnings: string[] = [];

  if (dailyCalorieTarget < minCalories) {
    warnings.push(
      `Your daily calorie target (${dailyCalorieTarget} cal) is below the recommended minimum for ${gender}s (${minCalories} cal). Consider a smaller deficit or increasing physical activity.`
    );
  }

  // Calculate weight to lose
  const weightToLose = weightKg - goalWeightKg;

  // Calculate timeline (accounting for metabolic adaptation)
  const totalCalorieDeficit = weightToLose * CALORIES_PER_KG_FAT;
  const rawDays = totalCalorieDeficit / dailyDeficit;
  const estimatedDays = Math.ceil(rawDays * PROJECTION_PARAMS.metabolicAdaptation);
  const estimatedWeeks = Math.ceil(estimatedDays / 7);

  // Calculate weekly weight loss
  const weeklyDeficit = dailyDeficit * 7;
  const weeklyWeightLoss = weeklyDeficit / CALORIES_PER_KG_FAT;

  // Safety warnings
  if (weeklyWeightLoss > 1.0) {
    warnings.push(
      'Weight loss exceeds 1 kg/week. This may be too aggressive and could lead to muscle loss. Consider a smaller deficit.'
    );
  }

  if (estimatedWeeks < 4) {
    warnings.push(
      'Very short timeline. Rapid weight loss is difficult to sustain and may not be healthy.'
    );
  }

  // Calculate target date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + estimatedDays);

  // Recommendations
  const proteinGrams = Math.round(weightKg * PROTEIN_PER_KG.active);
  const waterLiters = parseFloat((weightKg * WATER_PER_KG).toFixed(1));
  const maxDeficit = Math.round(tdee - minCalories);

  // Generate weekly projections
  const weeklyProjections: Array<{
    week: number;
    projectedWeight: number;
    cumulativeWeightLoss: number;
  }> = [];

  for (let week = 0; week <= Math.min(estimatedWeeks, PROJECTION_PARAMS.maxWeeks); week++) {
    // Account for metabolic adaptation over time
    const adaptationFactor = 1 - (week / (estimatedWeeks * 2)) * 0.1; // Max 10% slowdown
    const adjustedWeeklyLoss = weeklyWeightLoss * adaptationFactor;
    const cumulativeWeightLoss = Math.min(
      adjustedWeeklyLoss * week,
      weightToLose
    );
    const projectedWeight = weightKg - cumulativeWeightLoss;

    weeklyProjections.push({
      week,
      projectedWeight: parseFloat(projectedWeight.toFixed(2)),
      cumulativeWeightLoss: parseFloat(cumulativeWeightLoss.toFixed(2)),
    });
  }

  return {
    // Current metrics
    tdee: Math.round(tdee),
    bmr: Math.round(bmr),

    // Target metrics
    goalWeightKg,
    weightToLose: parseFloat(weightToLose.toFixed(2)),

    // Calorie deficit info
    deficitLevel,
    dailyDeficit,
    dailyCalorieTarget,
    weeklyWeightLoss: parseFloat(weeklyWeightLoss.toFixed(3)),

    // Timeline
    estimatedWeeks,
    estimatedDays,
    targetDate,

    // Safety warnings
    warnings,

    // Recommendations
    recommendations: {
      minCalories,
      maxDeficit,
      proteinGrams,
      waterLiters,
    },

    // Weekly projections
    weeklyProjections,
  };
}

/**
 * Format date for display
 */
export function formatTargetDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get deficit safety message
 */
export function getDeficitSafetyMessage(
  deficitLevel: 'mild' | 'moderate' | 'aggressive'
): string {
  const messages = {
    mild: 'This deficit is safe and sustainable for most people. You\'ll lose weight gradually while maintaining muscle mass and energy levels.',
    moderate: 'This deficit balances speed with sustainability. Most people can maintain this deficit while staying healthy and energized.',
    aggressive: 'This deficit leads to faster results but requires careful monitoring. Ensure adequate protein intake and consider consulting a healthcare provider.',
  };

  return messages[deficitLevel];
}
