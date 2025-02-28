import { TDEEFormValues, TDEEResult } from '@/types/tdee';
import { ACTIVITY_MULTIPLIERS, TDEE_FORMULAS, WEIGHT_GOAL_ADJUSTMENTS } from '@/constants/tdee';

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor formula
 * @param gender 'male' or 'female'
 * @param age Age in years
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @returns BMR in calories per day
 */
export function calculateBMR(
  gender: 'male' | 'female',
  age: number,
  weightKg: number,
  heightCm: number
): number {
  // Use the Mifflin-St Jeor formula (default)
  const formula = TDEE_FORMULAS.find(f => f.id === 'mifflin_st_jeor');
  
  if (!formula) {
    throw new Error('Formula not found');
  }
  
  return formula.calculate(gender, age, weightKg, heightCm);
}

/**
 * Gets activity multiplier based on activity level
 * @param activityLevel Activity level string
 * @returns Activity multiplier value
 */
export function getActivityMultiplier(activityLevel: string): number {
  const activity = ACTIVITY_MULTIPLIERS.find(a => a.level === activityLevel);
  
  if (!activity) {
    // Default to sedentary if not found
    return 1.2;
  }
  
  return activity.value;
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE)
 * @param bmr Basal Metabolic Rate
 * @param activityMultiplier Activity multiplier
 * @returns TDEE in calories per day
 */
export function calculateTDEE(bmr: number, activityMultiplier: number): number {
  return bmr * activityMultiplier;
}

/**
 * Calculates calorie targets for different weight goals
 * @param tdee Total Daily Energy Expenditure
 * @returns Object with calorie targets for different goals
 */
export function calculateWeightGoals(tdee: number): {
  maintain: number;
  mildLoss: number;
  moderateLoss: number;
  extremeLoss: number;
  mildGain: number;
  moderateGain: number;
  extremeGain: number;
} {
  return {
    maintain: Math.round(tdee),
    mildLoss: Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.mildLoss),
    moderateLoss: Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.moderateLoss),
    extremeLoss: Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.extremeLoss),
    mildGain: Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.mildGain),
    moderateGain: Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.moderateGain),
    extremeGain: Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.extremeGain),
  };
}

/**
 * Process TDEE calculation based on form values
 * @param values Form values
 * @returns TDEE result object
 */
export function processTDEECalculation(values: TDEEFormValues): TDEEResult {
  // Convert height to cm if needed
  const heightCm = values.heightUnit === 'cm' 
    ? values.heightCm 
    : (values.heightFt * 30.48) + (values.heightIn * 2.54);
  
  // Convert weight to kg if needed
  const weightKg = values.weightUnit === 'kg'
    ? values.weightKg
    : values.weightLb * 0.453592;
  
  // Calculate BMR
  const bmr = calculateBMR(values.gender, values.age, weightKg, heightCm);
  
  // Get activity multiplier
  const activityMultiplier = getActivityMultiplier(values.activityLevel);
  
  // Calculate TDEE
  const tdee = calculateTDEE(bmr, activityMultiplier);
  
  // Calculate weight goals
  const weightGoals = calculateWeightGoals(tdee);
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    activityMultiplier,
    weightGoals,
  };
}

/**
 * Estimates weight change over time based on calorie deficit/surplus
 * @param currentWeightKg Current weight in kg
 * @param tdee Total Daily Energy Expenditure
 * @param targetCalories Target daily calorie intake
 * @param days Number of days to project
 * @returns Estimated weight in kg after the specified days
 */
export function estimateWeightChange(
  currentWeightKg: number,
  tdee: number,
  targetCalories: number,
  days: number
): number {
  // Daily calorie deficit/surplus
  const calorieChange = targetCalories - tdee;
  
  // Simplified model: 7700 kcal deficit = 1 kg fat loss
  // This is a simplification; in reality, the relationship is non-linear
  const weightChangeKg = (calorieChange * days) / 7700;
  
  return currentWeightKg + weightChangeKg;
}
