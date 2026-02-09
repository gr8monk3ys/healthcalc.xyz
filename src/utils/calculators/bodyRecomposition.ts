/**
 * Body Recomposition Calculator
 *
 * Scientific References:
 * - Protein Synthesis: Phillips et al. "Protein requirements and supplementation in strength sports"
 *   International Journal of Sport Nutrition, 14(4), 359-375
 *
 * - Calorie Cycling: Trexler et al. "Metabolic adaptation to weight loss"
 *   Journal of the International Society of Sports Nutrition, 11(1), 7
 *
 * - Muscle Gain Rates: McDonald, Lyle. "What's My Genetic Muscular Potential?"
 *   Based on research compilation of natural muscle building studies
 *
 * Formulas:
 * - Training day: TDEE + 10% surplus for muscle protein synthesis
 * - Rest day: TDEE - 15% deficit for fat loss
 * - Protein: 1g per lb bodyweight (2.2g/kg) for muscle preservation
 * - Fat: 25% of daily calories for hormone production
 * - Carbs: Remaining calories (primarily around training)
 */

import { createLogger } from '@/utils/logger';
import {
  BodyRecompFormValues,
  BodyRecompResult,
  TrainingExperience,
} from '@/types/bodyRecomposition';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from '@/utils/calculators/tdee';
import { convertWeight, heightFtInToCm } from '@/utils/conversions';

const logger = createLogger({ component: 'BodyRecompositionCalculator' });

/**
 * Estimates monthly muscle gain potential based on training experience
 * @param experience Training experience level
 * @param gender Gender (affects muscle building potential)
 * @returns Estimated muscle gain in pounds per month
 */
export function estimateMonthlyMuscleGain(
  experience: TrainingExperience,
  gender: 'male' | 'female'
): number {
  // Research shows natural muscle gain rates decline with training age
  // Source: Lyle McDonald's model based on natural bodybuilding research
  const maleRates = {
    beginner: 1.5, // 1-2 lbs per month
    intermediate: 0.75, // 0.5-1 lb per month
    advanced: 0.375, // 0.25-0.5 lb per month
  };

  const femaleRates = {
    beginner: 0.75, // ~50% of male rates
    intermediate: 0.375,
    advanced: 0.1875,
  };

  const rates = gender === 'male' ? maleRates : femaleRates;
  return rates[experience];
}

/**
 * Estimates weekly fat loss based on calorie deficit
 * @param weeklyDeficit Average weekly calorie deficit
 * @returns Estimated fat loss in pounds per week
 */
export function estimateWeeklyFatLoss(weeklyDeficit: number): number {
  // 3500 calories = 1 lb of fat (simplified model)
  // This is conservative to account for metabolic adaptation
  return Math.abs(weeklyDeficit / 3500);
}

/**
 * Generates personalized recommendation based on goal and experience
 * @param goal Recomposition goal
 * @param experience Training experience
 * @param bodyFatPercentage Current body fat percentage
 * @returns Recommendation string
 */
export function generateRecommendation(
  goal: string,
  experience: TrainingExperience,
  bodyFatPercentage: number
): string {
  const recommendations: Record<string, string> = {
    'lose-fat-build-muscle': `Focus on progressive strength training 3-4x/week. Prioritize compound movements like squats, deadlifts, and bench press. The calorie cycling approach allows muscle growth on training days while burning fat on rest days. ${
      bodyFatPercentage > 25
        ? 'With your current body fat, expect faster fat loss initially.'
        : 'Your body fat level is optimal for recomposition.'
    }`,
    'maintain-build-muscle': `Maintain current body composition while building muscle steadily. Train 4-5x/week with emphasis on progressive overload. ${
      experience === 'beginner'
        ? 'As a beginner, you have great potential for muscle growth - focus on form and consistency.'
        : 'Continue challenging yourself with increased volume or intensity each training cycle.'
    }`,
    'aggressive-cut': `Aggressive fat loss while preserving muscle. Train 3-4x/week focusing on maintaining strength. Prioritize protein at every meal and consider HIIT cardio 2-3x/week on rest days. ${
      bodyFatPercentage < 15
        ? 'Warning: Lower body fat increases risk of muscle loss - ensure adequate protein.'
        : 'Monitor strength levels and adjust deficit if performance drops significantly.'
    }`,
  };

  return recommendations[goal] || recommendations['lose-fat-build-muscle'];
}

/**
 * Calculates calorie and macro targets for body recomposition
 * @param values Form input values
 * @returns Recomposition result with calorie cycling and macro targets
 */
export function calculateBodyRecomposition(values: BodyRecompFormValues): BodyRecompResult {
  try {
    // Convert height to cm if needed
    const heightCm =
      values.heightUnit === 'cm'
        ? values.heightCm
        : heightFtInToCm(values.heightFt, values.heightIn);

    // Convert weight to kg if needed
    const weightKg =
      values.weightUnit === 'kg' ? values.weight : convertWeight(values.weight, 'lb', 'kg');

    // Calculate BMR and TDEE
    const bmr = calculateBMR(values.gender, values.age, weightKg, heightCm);
    const activityMultiplier = getActivityMultiplier(values.activityLevel);
    const tdee = calculateTDEE(bmr, activityMultiplier);

    // Calculate calorie targets based on goal
    let trainingDayCalories: number;
    let restDayCalories: number;

    switch (values.goal) {
      case 'lose-fat-build-muscle':
        // Moderate recomp: +10% on training days, -15% on rest days
        trainingDayCalories = Math.round(tdee * 1.1);
        restDayCalories = Math.round(tdee * 0.85);
        break;
      case 'maintain-build-muscle':
        // Lean bulk: +15% on training days, maintenance on rest days
        trainingDayCalories = Math.round(tdee * 1.15);
        restDayCalories = Math.round(tdee);
        break;
      case 'aggressive-cut':
        // Aggressive cut: maintenance on training days, -25% on rest days
        trainingDayCalories = Math.round(tdee);
        restDayCalories = Math.round(tdee * 0.75);
        break;
      default:
        trainingDayCalories = Math.round(tdee * 1.1);
        restDayCalories = Math.round(tdee * 0.85);
    }

    // Calculate average daily calories (assuming 4 training days, 3 rest days per week)
    const trainingDaysPerWeek = 4;
    const restDaysPerWeek = 3;
    const dailyCalories = Math.round(
      (trainingDayCalories * trainingDaysPerWeek + restDayCalories * restDaysPerWeek) / 7
    );

    // Calculate macros
    // Protein: 1g per lb bodyweight (high for muscle preservation)
    const weightLb =
      values.weightUnit === 'lb' ? values.weight : convertWeight(weightKg, 'kg', 'lb');
    const proteinGrams = Math.round(weightLb);

    // Fat: 25% of daily calories (important for hormone production)
    const fatCalories = dailyCalories * 0.25;
    const fatGrams = Math.round(fatCalories / 9); // 9 calories per gram of fat

    // Carbs: Remaining calories
    const proteinCalories = proteinGrams * 4; // 4 calories per gram
    const carbCalories = dailyCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4); // 4 calories per gram

    // Calculate weekly deficit/surplus
    const weeklyCalorieBalance =
      trainingDayCalories * trainingDaysPerWeek + restDayCalories * restDaysPerWeek - tdee * 7;

    // Estimate fat loss (if in deficit)
    const estimatedWeeklyFatLoss =
      weeklyCalorieBalance < 0 ? estimateWeeklyFatLoss(weeklyCalorieBalance) : 0;

    // Estimate muscle gain
    const estimatedMonthlyMuscleGain = estimateMonthlyMuscleGain(
      values.trainingExperience,
      values.gender
    );

    // Calculate realistic timeline (12-16 weeks for visible results)
    const timelineWeeks = values.goal === 'aggressive-cut' ? 8 : 12;

    // Generate personalized recommendation
    const recommendation = generateRecommendation(
      values.goal,
      values.trainingExperience,
      values.bodyFatPercentage
    );

    return {
      dailyCalories,
      proteinGrams,
      fatGrams,
      carbGrams,
      trainingDayCalories,
      restDayCalories,
      estimatedWeeklyFatLoss,
      estimatedMonthlyMuscleGain,
      timelineWeeks,
      recommendation,
    };
  } catch (error) {
    logger.logError('Error calculating body recomposition', error);
    throw error;
  }
}
