/**
 * Maximum Fat Loss Calculator Logic
 * Based on Alpert S.S. (2005) research on maximum fat oxidation rates
 */

import { MaximumFatLossFormData, MaximumFatLossResult } from '@/types/maximumFatLoss';
import { Gender, ActivityLevel } from '@/types/common';
import {
  FAT_OXIDATION_RATE_PER_LB,
  PROTEIN_RECOMMENDATIONS,
  MIN_BODY_FAT_PERCENTAGE,
  ABSOLUTE_MIN_CALORIES,
  WATER_INTAKE,
  RECOVERY_RECOMMENDATIONS,
  PROJECTION_WEEKS,
  CALORIES_PER_KG_FAT,
} from '@/constants/maximumFatLoss';
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
 * Main maximum fat loss calculation
 */
export function calculateMaximumFatLoss(
  formData: MaximumFatLossFormData
): MaximumFatLossResult {
  const { gender, age, heightCm, weightKg, activityLevel, bodyFatPercentage } = formData;

  // Calculate current TDEE
  const bmr = calculateBMR(gender, age, weightKg, heightCm);
  const tdee = calculateTDEE(bmr, activityLevel);

  // Calculate body composition
  const fatMassKg = (weightKg * bodyFatPercentage) / 100;
  const leanMassKg = weightKg - fatMassKg;
  const fatMassLbs = fatMassKg * 2.20462;
  const leanMassLbs = leanMassKg * 2.20462;

  // Calculate maximum sustainable deficit based on fat mass
  // Alpert (2005): ~22-31 kcal/lb/day, we use 26.5 as moderate estimate
  const maximumDeficit = Math.round(fatMassLbs * FAT_OXIDATION_RATE_PER_LB);

  // Calculate minimum calories
  let minimumCalories = tdee - maximumDeficit;

  // Apply safety limits
  const absoluteMin = ABSOLUTE_MIN_CALORIES[gender];
  const warnings: string[] = [];

  if (minimumCalories < absoluteMin) {
    warnings.push(
      `Your calculated minimum calories (${minimumCalories}) is below the safe minimum of ${absoluteMin} cal. We've adjusted it to ensure adequate nutrition.`
    );
    minimumCalories = absoluteMin;
  }

  // Check body fat percentage safety
  const minBodyFat = MIN_BODY_FAT_PERCENTAGE[gender];
  if (bodyFatPercentage <= minBodyFat + 2) {
    warnings.push(
      `Your body fat percentage (${bodyFatPercentage}%) is very low. Further fat loss may compromise health. Consult a healthcare professional.`
    );
  } else if (bodyFatPercentage <= minBodyFat + 5) {
    warnings.push(
      `You're approaching a low body fat percentage (${bodyFatPercentage}%). Monitor your health closely and consider a smaller deficit.`
    );
  }

  // Check if deficit is too large
  const adjustedDeficit = tdee - minimumCalories;
  if (adjustedDeficit > 1000) {
    warnings.push(
      'This is an aggressive deficit. Ensure you hit protein targets and prioritize strength training to preserve muscle.'
    );
  }

  // Calculate expected weekly fat loss
  const dailyDeficit = adjustedDeficit;
  const weeklyDeficit = dailyDeficit * 7;
  const expectedWeeklyFatLoss = weeklyDeficit / CALORIES_PER_KG_FAT;
  const expectedWeeklyFatLossLbs = expectedWeeklyFatLoss * 2.20462;

  // Calculate protein recommendations
  const minimumProtein = Math.round(leanMassKg * PROTEIN_RECOMMENDATIONS.minimum);
  const optimalProtein = Math.round(leanMassKg * PROTEIN_RECOMMENDATIONS.optimal);

  // Calculate water recommendation
  const waterLiters = Number((WATER_INTAKE.base + weightKg * WATER_INTAKE.perKgBodyWeight).toFixed(1));

  // Generate projections
  const projections = [];
  let currentWeight = weightKg;
  let currentBodyFat = bodyFatPercentage;

  for (let week = 0; week <= PROJECTION_WEEKS; week += 2) {
    // Calculate current fat mass
    const currentFatMass = (currentWeight * currentBodyFat) / 100;
    const currentFatMassLbs = currentFatMass * 2.20462;

    // Recalculate maximum deficit based on current fat mass
    const adjustedMaxDeficit = Math.round(currentFatMassLbs * FAT_OXIDATION_RATE_PER_LB);
    const safeDeficit = Math.min(adjustedMaxDeficit, adjustedDeficit);

    projections.push({
      weeks: week,
      projectedWeightKg: Number(currentWeight.toFixed(1)),
      projectedBodyFatPercentage: Number(currentBodyFat.toFixed(1)),
      adjustedDeficit: safeDeficit,
    });

    // Project next period (assume only fat loss, not muscle loss with optimal approach)
    const biWeeklyDeficit = safeDeficit * 14;
    const fatLostKg = biWeeklyDeficit / CALORIES_PER_KG_FAT;
    currentWeight -= fatLostKg;
    currentBodyFat = ((currentWeight * currentBodyFat) / 100 - fatLostKg) / currentWeight * 100;

    // Ensure body fat doesn't go below minimum
    if (currentBodyFat < minBodyFat) {
      break;
    }
  }

  // Additional recommendations and warnings
  if (bodyFatPercentage > 25 && gender === 'male') {
    warnings.push(
      'At higher body fat percentages, you can sustain larger deficits. As you lose fat, your maximum deficit will decrease.'
    );
  } else if (bodyFatPercentage > 32 && gender === 'female') {
    warnings.push(
      'At higher body fat percentages, you can sustain larger deficits. As you lose fat, your maximum deficit will decrease.'
    );
  }

  if (adjustedDeficit < 250) {
    warnings.push(
      'Your maximum safe deficit is very small. This is normal at lower body fat percentages. Consider maintenance or a small deficit with focus on recomposition.'
    );
  }

  return {
    tdee,
    bmr,
    currentWeightKg: weightKg,
    bodyFatPercentage,
    fatMassKg: Number(fatMassKg.toFixed(1)),
    leanMassKg: Number(leanMassKg.toFixed(1)),
    fatMassLbs: Number(fatMassLbs.toFixed(1)),
    leanMassLbs: Number(leanMassLbs.toFixed(1)),
    maximumDeficit: adjustedDeficit,
    minimumCalories,
    expectedWeeklyFatLoss: Number(expectedWeeklyFatLoss.toFixed(2)),
    expectedWeeklyFatLossLbs: Number(expectedWeeklyFatLossLbs.toFixed(2)),
    proteinRecommendation: optimalProtein,
    warnings,
    recommendations: {
      minimumProtein,
      optimalProtein,
      waterLiters,
      sleepHours: RECOVERY_RECOMMENDATIONS.sleepHoursOptimal,
      strengthTrainingDays: RECOVERY_RECOMMENDATIONS.strengthTrainingDaysPerWeek,
    },
    projections,
  };
}

/**
 * Get body fat category for context
 */
export function getBodyFatCategory(bodyFatPercentage: number, gender: Gender): string {
  if (gender === 'male') {
    if (bodyFatPercentage < 6) return 'Essential fat (very low)';
    if (bodyFatPercentage < 14) return 'Athletic';
    if (bodyFatPercentage < 18) return 'Fitness';
    if (bodyFatPercentage < 25) return 'Average';
    return 'Above average';
  } else {
    if (bodyFatPercentage < 14) return 'Essential fat (very low)';
    if (bodyFatPercentage < 21) return 'Athletic';
    if (bodyFatPercentage < 25) return 'Fitness';
    if (bodyFatPercentage < 32) return 'Average';
    return 'Above average';
  }
}

/**
 * Format body fat percentage with context
 */
export function formatBodyFatWithContext(bodyFatPercentage: number, gender: Gender): string {
  const category = getBodyFatCategory(bodyFatPercentage, gender);
  return `${bodyFatPercentage.toFixed(1)}% (${category})`;
}
