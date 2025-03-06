import { TDEEFormValues, TDEEResult } from '@/types/tdee';
import { ACTIVITY_MULTIPLIERS, TDEE_FORMULAS, WEIGHT_GOAL_ADJUSTMENTS } from '@/constants/tdee';
import { convertWeight, heightFtInToCm } from '@/utils/conversions';

/**
 * Calculates Basal Metabolic Rate (BMR) using the specified formula
 * @param gender 'male' or 'female'
 * @param age Age in years
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @param formulaId Optional formula ID to use (defaults to Mifflin-St Jeor)
 * @param bodyFatPercentage Optional body fat percentage for Katch-McArdle formula
 * @returns BMR in calories per day
 */
export function calculateBMR(
  gender: 'male' | 'female',
  age: number,
  weightKg: number,
  heightCm: number,
  formulaId: string = 'mifflin_st_jeor',
  bodyFatPercentage?: number
): number {
  // Input validation
  if (age <= 0 || age > 120) {
    throw new Error('Age must be between 1 and 120 years');
  }
  
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0 kg');
  }
  
  if (heightCm <= 0) {
    throw new Error('Height must be greater than 0 cm');
  }
  
  // Find the requested formula
  const formula = TDEE_FORMULAS.find(f => f.id === formulaId);
  
  if (!formula) {
    throw new Error(`Formula '${formulaId}' not found`);
  }
  
  // Use the Katch-McArdle formula if body fat percentage is provided
  if (formulaId === 'katch_mcardle' && bodyFatPercentage !== undefined) {
    // Calculate lean body mass
    const leanBodyMass = weightKg * (1 - bodyFatPercentage / 100);
    
    // Katch-McArdle formula
    return 370 + (21.6 * leanBodyMass);
  }
  
  // Use the selected formula
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
    console.warn(`Activity level '${activityLevel}' not found, defaulting to sedentary`);
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
  if (bmr <= 0) {
    throw new Error('BMR must be greater than 0');
  }
  
  if (activityMultiplier <= 0) {
    throw new Error('Activity multiplier must be greater than 0');
  }
  
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
  if (tdee <= 0) {
    throw new Error('TDEE must be greater than 0');
  }
  
  // Calculate minimum safe calorie intake
  const minSafeCalories = 1200; // General minimum safe calorie intake
  
  return {
    maintain: Math.round(tdee),
    mildLoss: Math.max(Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.mildLoss), minSafeCalories),
    moderateLoss: Math.max(Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.moderateLoss), minSafeCalories),
    extremeLoss: Math.max(Math.round(tdee + WEIGHT_GOAL_ADJUSTMENTS.extremeLoss), minSafeCalories),
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
  try {
    // Convert height to cm if needed
    const heightCm = values.heightUnit === 'cm' 
      ? values.heightCm 
      : heightFtInToCm(values.heightFt, values.heightIn);
    
    // Convert weight to kg if needed
    const weightKg = values.weightUnit === 'kg'
      ? values.weightKg
      : convertWeight(values.weightLb, 'lb', 'kg');
    
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
  } catch (error) {
    console.error('Error calculating TDEE:', error);
    throw error;
  }
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
  // Input validation
  if (currentWeightKg <= 0) {
    throw new Error('Current weight must be greater than 0 kg');
  }
  
  if (tdee <= 0) {
    throw new Error('TDEE must be greater than 0');
  }
  
  if (targetCalories <= 0) {
    throw new Error('Target calories must be greater than 0');
  }
  
  if (days <= 0) {
    throw new Error('Days must be greater than 0');
  }
  
  // Daily calorie deficit/surplus
  const calorieChange = targetCalories - tdee;
  
  // Simplified model: 7700 kcal deficit = 1 kg fat loss
  // This is a simplification; in reality, the relationship is non-linear
  const weightChangeKg = (calorieChange * days) / 7700;
  
  return currentWeightKg + weightChangeKg;
}

/**
 * Calculates the time required to reach a target weight
 * @param currentWeightKg Current weight in kg
 * @param targetWeightKg Target weight in kg
 * @param tdee Total Daily Energy Expenditure
 * @param targetCalories Target daily calorie intake
 * @returns Number of days to reach the target weight
 */
export function calculateTimeToTargetWeight(
  currentWeightKg: number,
  targetWeightKg: number,
  tdee: number,
  targetCalories: number
): number {
  // Input validation
  if (currentWeightKg <= 0) {
    throw new Error('Current weight must be greater than 0 kg');
  }
  
  if (targetWeightKg <= 0) {
    throw new Error('Target weight must be greater than 0 kg');
  }
  
  if (tdee <= 0) {
    throw new Error('TDEE must be greater than 0');
  }
  
  if (targetCalories <= 0) {
    throw new Error('Target calories must be greater than 0');
  }
  
  // If target weight equals current weight, no time needed
  if (Math.abs(targetWeightKg - currentWeightKg) < 0.01) {
    return 0;
  }
  
  // Daily calorie deficit/surplus
  const calorieChange = targetCalories - tdee;
  
  // If calorie change is zero or in wrong direction, impossible to reach target
  if (calorieChange === 0 || 
      (targetWeightKg > currentWeightKg && calorieChange < 0) || 
      (targetWeightKg < currentWeightKg && calorieChange > 0)) {
    return Infinity;
  }
  
  // Weight change needed in kg
  const weightChangeKg = targetWeightKg - currentWeightKg;
  
  // Simplified model: 7700 kcal deficit = 1 kg fat loss
  const daysRequired = Math.abs((weightChangeKg * 7700) / calorieChange);
  
  return Math.ceil(daysRequired);
}
