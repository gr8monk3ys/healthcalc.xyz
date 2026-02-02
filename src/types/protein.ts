import { ActivityLevel, Gender, HeightUnit, WeightUnit } from './common';

/**
 * Activity level specific to protein intake calculation
 * These are more granular than general activity levels to account
 * for different training intensities and goals
 */
export type ProteinActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'athlete'
  | 'strength_training'
  | 'endurance_athlete';

/**
 * Goal type for protein intake optimization
 */
export type ProteinGoal =
  | 'maintain'
  | 'weight_loss'
  | 'muscle_gain'
  | 'athletic_performance'
  | 'general_health';

/**
 * Form values for the protein calculator
 */
export interface ProteinFormValues {
  gender: Gender;
  age: number;
  heightUnit: HeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  weightUnit: WeightUnit;
  weightKg: number;
  weightLb: number;
  activityLevel: ActivityLevel;
  goal: ProteinGoal;
  bodyFatPercentage?: number;
}

/**
 * Result of protein intake calculation
 */
export interface ProteinResult {
  /** Daily protein requirement in grams */
  dailyProteinGrams: number;
  /** Minimum recommended protein in grams */
  minProteinGrams: number;
  /** Maximum recommended protein in grams */
  maxProteinGrams: number;
  /** Protein per kilogram of body weight */
  proteinPerKg: number;
  /** Protein per pound of body weight */
  proteinPerLb: number;
  /** Recommended protein per meal (assuming 3-4 meals) */
  proteinPerMeal: {
    threeMeals: number;
    fourMeals: number;
    fiveMeals: number;
  };
  /** Protein as percentage of typical calorie intake */
  proteinCalories: number;
  /** Category/recommendation based on goal */
  recommendation: string;
  /** Color indicator for the recommendation */
  color: string;
}

/**
 * Protein requirement range based on activity and goal
 */
export interface ProteinRequirement {
  id: string;
  name: string;
  description: string;
  /** Minimum g/kg body weight */
  minPerKg: number;
  /** Maximum g/kg body weight */
  maxPerKg: number;
  /** Optimal g/kg body weight */
  optimalPerKg: number;
}

/**
 * Protein source information for display
 */
export interface ProteinSource {
  name: string;
  proteinPer100g: number;
  category: 'meat' | 'dairy' | 'plant' | 'seafood' | 'other';
}
