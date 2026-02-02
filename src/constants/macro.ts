/**
 * Constants for the Macro Calculator
 *
 * Scientific References:
 * - Macronutrient caloric values are standardized:
 *   Protein: 4 kcal/g, Carbohydrates: 4 kcal/g, Fat: 9 kcal/g
 *
 * - Recommended macro distributions:
 *   - Weight loss: Higher protein to preserve muscle mass (40% protein)
 *   - Maintenance: Balanced distribution (30/35/35)
 *   - Muscle gain: Higher carbs for energy, adequate protein (30/40/30)
 *
 * References:
 * - USDA Dietary Guidelines for Americans
 * - International Society of Sports Nutrition (ISSN) position stands
 * - American College of Sports Medicine guidelines
 */

import { MacroGoal, MacroRatioPreset } from '@/types/macro';

/**
 * Caloric values per gram for each macronutrient
 */
export const CALORIES_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fat: 9,
} as const;

/**
 * Macro ratio presets for different dietary goals
 * All percentages must sum to 100
 */
export const MACRO_RATIO_PRESETS: MacroRatioPreset[] = [
  {
    id: 'weight_loss',
    name: 'Weight Loss',
    description: 'High protein to preserve muscle while in a calorie deficit',
    proteinPercent: 40,
    carbsPercent: 40,
    fatPercent: 20,
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Balanced macros for maintaining current weight and health',
    proteinPercent: 30,
    carbsPercent: 35,
    fatPercent: 35,
  },
  {
    id: 'muscle_gain',
    name: 'Muscle Gain',
    description: 'Higher carbs for energy, adequate protein for muscle building',
    proteinPercent: 30,
    carbsPercent: 40,
    fatPercent: 30,
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Set your own macro percentages',
    proteinPercent: 30,
    carbsPercent: 40,
    fatPercent: 30,
  },
];

/**
 * Get macro preset by goal
 * @param goal The dietary goal
 * @returns The macro ratio preset or default (maintenance)
 */
export function getMacroPreset(goal: MacroGoal): MacroRatioPreset {
  const preset = MACRO_RATIO_PRESETS.find(p => p.id === goal);
  return preset || MACRO_RATIO_PRESETS[1]; // Default to maintenance
}

/**
 * Default calorie adjustments for different goals
 */
export const CALORIE_ADJUSTMENTS = {
  weight_loss: -500, // 500 calorie deficit
  maintenance: 0,
  muscle_gain: 300, // 300 calorie surplus
  custom: 0,
} as const;

/**
 * Recommended protein intake ranges (grams per kg of body weight)
 */
export const PROTEIN_RECOMMENDATIONS = {
  sedentary: { min: 0.8, max: 1.0 },
  lightly_active: { min: 1.0, max: 1.2 },
  moderately_active: { min: 1.2, max: 1.6 },
  very_active: { min: 1.6, max: 2.0 },
  extremely_active: { min: 1.8, max: 2.2 },
} as const;

/**
 * Minimum macro percentages for health
 */
export const MINIMUM_PERCENTAGES = {
  protein: 10, // Minimum protein for health
  carbs: 10, // Very low carb diets can go lower, but not recommended for most
  fat: 15, // Essential fatty acids requirement
} as const;

/**
 * Maximum macro percentages for health
 */
export const MAXIMUM_PERCENTAGES = {
  protein: 50, // Very high protein can strain kidneys
  carbs: 70, // Very high carb diets
  fat: 60, // High fat (keto-style) diets
} as const;

/**
 * Default form values for the Macro Calculator
 */
export const DEFAULT_MACRO_VALUES = {
  male: {
    age: 30,
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    weightKg: 70,
    weightLb: 154,
    activityLevel: 'moderately_active' as const,
    goal: 'maintenance' as MacroGoal,
  },
  female: {
    age: 30,
    heightCm: 163,
    heightFt: 5,
    heightIn: 4,
    weightKg: 60,
    weightLb: 132,
    activityLevel: 'moderately_active' as const,
    goal: 'maintenance' as MacroGoal,
  },
};

/**
 * Macro distribution validation
 * @param protein Protein percentage
 * @param carbs Carbohydrates percentage
 * @param fat Fat percentage
 * @returns Whether the percentages are valid (sum to 100)
 */
export function validateMacroDistribution(
  protein: number,
  carbs: number,
  fat: number
): { isValid: boolean; error?: string } {
  const total = protein + carbs + fat;

  if (Math.abs(total - 100) > 0.1) {
    return {
      isValid: false,
      error: `Macro percentages must sum to 100% (currently ${total.toFixed(1)}%)`,
    };
  }

  if (protein < MINIMUM_PERCENTAGES.protein) {
    return {
      isValid: false,
      error: `Protein must be at least ${MINIMUM_PERCENTAGES.protein}%`,
    };
  }

  if (fat < MINIMUM_PERCENTAGES.fat) {
    return {
      isValid: false,
      error: `Fat must be at least ${MINIMUM_PERCENTAGES.fat}% for essential fatty acids`,
    };
  }

  if (protein > MAXIMUM_PERCENTAGES.protein) {
    return {
      isValid: false,
      error: `Protein should not exceed ${MAXIMUM_PERCENTAGES.protein}%`,
    };
  }

  return { isValid: true };
}
