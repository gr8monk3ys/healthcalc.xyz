/**
 * Weight Management Calculator Logic
 */

import {
  WeightManagementFormData,
  WeightManagementResult,
  MacronutrientBreakdown,
  DietType,
  GoalType,
} from '@/types/weightManagement';
import { Gender, ActivityLevel } from '@/types/common';
import {
  CALORIES_PER_KG_FAT,
  CALORIES_PER_KG_MUSCLE,
  MIN_CALORIES,
  MAX_CALORIES,
  SAFE_WEIGHT_LOSS_MAX,
  SAFE_WEIGHT_LOSS_MIN,
  SAFE_WEIGHT_GAIN_MAX,
  MIN_TIMELINE_WEEKS,
  CALORIES_PER_GRAM,
  DIET_TYPES,
  ADAPTATION_PARAMS,
  RECOMMENDATION_PARAMS,
} from '@/constants/weightManagement';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';

/**
 * Calculate BMR using Mifflin-St Jeor equation
 */
function calculateBMR(gender: Gender, age: number, weightKg: number, heightCm: number): number {
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

/**
 * Calculate TDEE from BMR and activity level
 */
function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multiplier = ACTIVITY_MULTIPLIERS.find(a => a.level === activityLevel);
  return Math.round(bmr * (multiplier?.value || 1.2));
}

/**
 * Get diet type configuration
 */
export function getDietTypeConfig(dietType: DietType) {
  return DIET_TYPES.find(d => d.type === dietType) || DIET_TYPES[0];
}

/**
 * Calculate macronutrient breakdown based on calories and diet type
 */
function calculateMacros(dailyCalories: number, dietType: DietType): MacronutrientBreakdown {
  const config = getDietTypeConfig(dietType);

  // Calculate calories for each macro
  const proteinCalories = Math.round(dailyCalories * (config.proteinPercentage / 100));
  const carbsCalories = Math.round(dailyCalories * (config.carbsPercentage / 100));
  const fatCalories = Math.round(dailyCalories * (config.fatPercentage / 100));

  // Calculate grams (rounded)
  const proteinGrams = Math.round(proteinCalories / CALORIES_PER_GRAM.protein);
  const carbsGrams = Math.round(carbsCalories / CALORIES_PER_GRAM.carbs);
  const fatGrams = Math.round(fatCalories / CALORIES_PER_GRAM.fat);

  return {
    proteinGrams,
    proteinPercentage: config.proteinPercentage,
    carbsGrams,
    carbsPercentage: config.carbsPercentage,
    fatGrams,
    fatPercentage: config.fatPercentage,
    proteinCalories,
    carbsCalories,
    fatCalories,
  };
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate days between two dates
 */
function daysBetween(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / msPerDay);
}

/**
 * Main calculation function
 */
export function calculateWeightManagement(
  formData: WeightManagementFormData
): WeightManagementResult {
  const {
    gender,
    age,
    heightCm,
    weightKg,
    activityLevel,
    goalWeightKg,
    goalType,
    targetDate,
    dietType,
  } = formData;

  // Calculate current TDEE
  const bmr = calculateBMR(gender, age, weightKg, heightCm);
  const tdee = calculateTDEE(bmr, activityLevel);

  // Calculate weight change needed
  const weightToChange = goalWeightKg - weightKg;
  const isWeightLoss = weightToChange < 0;
  const isWeightGain = weightToChange > 0;
  const absoluteWeightChange = Math.abs(weightToChange);

  // Calculate timeline
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDateCopy = new Date(targetDate);
  targetDateCopy.setHours(0, 0, 0, 0);
  const daysToGoal = daysBetween(today, targetDateCopy);
  const weeksToGoal = daysToGoal / 7;

  // Validate timeline
  const warnings: string[] = [];
  let adjustedTargetDate: Date | undefined;
  let adjustedDays = daysToGoal;
  let adjustedWeeks = weeksToGoal;

  if (daysToGoal < MIN_TIMELINE_WEEKS * 7) {
    warnings.push(
      `Your target date is too soon (${daysToGoal} days). For safe weight management, we recommend at least ${MIN_TIMELINE_WEEKS} weeks.`
    );
    adjustedDays = MIN_TIMELINE_WEEKS * 7;
    adjustedWeeks = MIN_TIMELINE_WEEKS;
    adjustedTargetDate = new Date(today);
    adjustedTargetDate.setDate(today.getDate() + adjustedDays);
  }

  // Calculate required weekly weight change
  const weeklyWeightChange = weightToChange / adjustedWeeks;

  // Check if weekly rate is safe
  let isGoalRealistic = true;

  if (isWeightLoss) {
    const weeklyLossKg = Math.abs(weeklyWeightChange);
    if (weeklyLossKg > SAFE_WEIGHT_LOSS_MAX) {
      warnings.push(
        `Your target requires losing ${weeklyLossKg.toFixed(2)} kg/week, which exceeds the safe maximum of ${SAFE_WEIGHT_LOSS_MAX} kg/week. This may lead to muscle loss and metabolic slowdown.`
      );
      isGoalRealistic = false;

      // Adjust timeline for safe rate
      const safeWeeks = Math.ceil(absoluteWeightChange / SAFE_WEIGHT_LOSS_MAX);
      adjustedWeeks = safeWeeks;
      adjustedDays = safeWeeks * 7;
      adjustedTargetDate = new Date(today);
      adjustedTargetDate.setDate(today.getDate() + adjustedDays);

      warnings.push(
        `We recommend extending your timeline to at least ${safeWeeks} weeks (${formatDate(adjustedTargetDate)}) for safe weight loss.`
      );
    } else if (weeklyLossKg < SAFE_WEIGHT_LOSS_MIN) {
      warnings.push(
        `Your target requires losing only ${weeklyLossKg.toFixed(2)} kg/week. While safe, this is a very slow rate. You may reach your goal faster with a moderate deficit.`
      );
    }
  } else if (isWeightGain) {
    if (weeklyWeightChange > SAFE_WEIGHT_GAIN_MAX) {
      warnings.push(
        `Your target requires gaining ${weeklyWeightChange.toFixed(2)} kg/week, which exceeds the safe maximum of ${SAFE_WEIGHT_GAIN_MAX} kg/week. Rapid weight gain leads to more fat gain.`
      );
      isGoalRealistic = false;

      // Adjust timeline for safe rate
      const safeWeeks = Math.ceil(absoluteWeightChange / SAFE_WEIGHT_GAIN_MAX);
      adjustedWeeks = safeWeeks;
      adjustedDays = safeWeeks * 7;
      adjustedTargetDate = new Date(today);
      adjustedTargetDate.setDate(today.getDate() + adjustedDays);

      warnings.push(
        `We recommend extending your timeline to at least ${safeWeeks} weeks (${formatDate(adjustedTargetDate)}) for lean muscle gain.`
      );
    }
  }

  // Calculate daily calorie change needed
  const caloriesPerKg = isWeightLoss ? CALORIES_PER_KG_FAT : CALORIES_PER_KG_MUSCLE;
  const totalCaloriesNeeded = absoluteWeightChange * caloriesPerKg;
  const dailyCalorieChange = isWeightLoss
    ? -(totalCaloriesNeeded / adjustedDays)
    : totalCaloriesNeeded / adjustedDays;

  // Calculate target daily calories
  let dailyCalorieTarget = Math.round(tdee + dailyCalorieChange);

  // Apply safety limits
  const minCalories = MIN_CALORIES[gender];
  const maxCalories = MAX_CALORIES[gender];

  if (dailyCalorieTarget < minCalories) {
    warnings.push(
      `Your calculated daily target (${dailyCalorieTarget} cal) is below the safe minimum of ${minCalories} cal. We've adjusted it to ${minCalories} cal, which may extend your timeline.`
    );
    dailyCalorieTarget = minCalories;
    isGoalRealistic = false;
  }

  if (dailyCalorieTarget > maxCalories) {
    warnings.push(
      `Your calculated daily target (${dailyCalorieTarget} cal) exceeds the recommended maximum of ${maxCalories} cal. Consider a longer timeline or more moderate surplus.`
    );
    isGoalRealistic = false;
  }

  // Calculate macronutrient breakdown
  const macros = calculateMacros(dailyCalorieTarget, dietType);

  // Generate recommendations
  const waterLiters = Number(
    (RECOMMENDATION_PARAMS.baseWaterLiters + weightKg * RECOMMENDATION_PARAMS.waterPerKgBodyWeight).toFixed(1)
  );

  const exerciseDaysMap = RECOMMENDATION_PARAMS.exerciseDaysPerWeek as Record<string, number>;
  const exerciseDays = exerciseDaysMap[activityLevel] || 3;

  const recommendations = {
    minCalories,
    maxCalories,
    waterLiters,
    sleepHours: RECOMMENDATION_PARAMS.sleepHoursRecommended,
    exerciseDays,
  };

  // Generate weekly projections
  const weeklyProjections = [];
  const finalWeeks = Math.ceil(adjustedWeeks);

  for (let week = 0; week <= finalWeeks; week++) {
    const weekDate = new Date(today);
    weekDate.setDate(today.getDate() + week * 7);

    // Account for metabolic adaptation
    let adaptationFactor = 1.0;
    if (isWeightLoss) {
      const percentLost = (week * Math.abs(weeklyWeightChange)) / weightKg;
      adaptationFactor = 1 - percentLost * ADAPTATION_PARAMS.weightLossSlowdown;
    } else if (isWeightGain) {
      const percentGained = (week * weeklyWeightChange) / weightKg;
      adaptationFactor = 1 - percentGained * ADAPTATION_PARAMS.weightGainSlowdown;
    }

    const adjustedWeeklyChange = weeklyWeightChange * adaptationFactor;
    const cumulativeChange = week * adjustedWeeklyChange;
    const projectedWeight = weightKg + cumulativeChange;

    weeklyProjections.push({
      week,
      date: weekDate,
      projectedWeight: Number(projectedWeight.toFixed(2)),
      cumulativeWeightChange: Number(cumulativeChange.toFixed(2)),
      dailyCalories: dailyCalorieTarget,
    });
  }

  // Additional warnings
  if (goalType === 'lose' && goalWeightKg < 45 && gender === 'female') {
    warnings.push('Your goal weight may be too low. Consult a healthcare provider before pursuing extreme weight loss.');
  }
  if (goalType === 'lose' && goalWeightKg < 55 && gender === 'male') {
    warnings.push('Your goal weight may be too low. Consult a healthcare provider before pursuing extreme weight loss.');
  }

  if (dietType === 'keto') {
    warnings.push('Ketogenic diets require careful planning. Consider consulting a dietitian for proper implementation.');
  }

  return {
    tdee,
    bmr,
    currentWeightKg: weightKg,
    goalWeightKg,
    weightToChange,
    goalType,
    targetDate: adjustedTargetDate || targetDateCopy,
    daysToGoal: adjustedDays,
    weeksToGoal: Number(adjustedWeeks.toFixed(1)),
    dailyCalorieTarget,
    dailyCalorieChange: Math.round(dailyCalorieChange),
    weeklyWeightChange: Number(weeklyWeightChange.toFixed(2)),
    isGoalRealistic,
    adjustedTargetDate,
    warnings,
    macros,
    dietType,
    recommendations,
    weeklyProjections,
  };
}

/**
 * Get goal type message
 */
export function getGoalTypeMessage(goalType: GoalType): string {
  switch (goalType) {
    case 'lose':
      return 'Your plan is optimized for safe, sustainable weight loss while preserving lean muscle mass.';
    case 'gain':
      return 'Your plan is optimized for lean muscle gain while minimizing fat gain. Combine with strength training for best results.';
    case 'maintain':
      return 'Your plan is optimized for maintaining your current weight while supporting your activity level.';
  }
}
