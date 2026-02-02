/**
 * Macro Calculator
 *
 * Calculates daily macronutrient (protein, carbohydrates, fat) targets
 * based on Total Daily Energy Expenditure (TDEE) and dietary goals.
 *
 * Scientific References:
 * - Macronutrient caloric values:
 *   Protein: 4 kcal/g, Carbohydrates: 4 kcal/g, Fat: 9 kcal/g
 *
 * - Position of the International Society of Sports Nutrition:
 *   protein and exercise (Jager et al., 2017)
 *
 * - Dietary Reference Intakes (DRI) for macronutrients (USDA)
 *
 * Formulas:
 * - Protein grams = (target calories * protein%) / 4
 * - Carbs grams = (target calories * carbs%) / 4
 * - Fat grams = (target calories * fat%) / 9
 */

import { createLogger } from '@/utils/logger';
import { MacroBreakdown, MacroCalculationInput, MacroFormValues, MacroResult } from '@/types/macro';
import {
  CALORIES_PER_GRAM,
  CALORIE_ADJUSTMENTS,
  getMacroPreset,
  validateMacroDistribution,
} from '@/constants/macro';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from './tdee';
import { convertWeight, heightFtInToCm } from '@/utils/conversions';

const logger = createLogger({ component: 'MacroCalculator' });

/**
 * Calculates macronutrient breakdown for a single macro
 * @param targetCalories Total daily calorie target
 * @param percentage Percentage of calories for this macro (0-100)
 * @param caloriesPerGram Calories per gram of this macro
 * @returns MacroBreakdown with grams, calories, and percentage
 */
export function calculateMacroBreakdown(
  targetCalories: number,
  percentage: number,
  caloriesPerGram: number
): MacroBreakdown {
  if (targetCalories <= 0) {
    throw new Error('Target calories must be greater than 0');
  }

  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }

  if (caloriesPerGram <= 0) {
    throw new Error('Calories per gram must be greater than 0');
  }

  const calories = (targetCalories * percentage) / 100;
  const grams = calories / caloriesPerGram;

  return {
    grams: Math.round(grams),
    calories: Math.round(calories),
    percentage: percentage,
  };
}

/**
 * Calculates all macronutrients based on target calories and percentages
 * @param input Calculation input with target calories and macro percentages
 * @returns Object with protein, carbs, and fat breakdowns
 */
export function calculateMacros(input: MacroCalculationInput): {
  protein: MacroBreakdown;
  carbs: MacroBreakdown;
  fat: MacroBreakdown;
} {
  const { targetCalories, proteinPercent, carbsPercent, fatPercent } = input;

  // Validate that percentages sum to 100
  const validation = validateMacroDistribution(proteinPercent, carbsPercent, fatPercent);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const protein = calculateMacroBreakdown(
    targetCalories,
    proteinPercent,
    CALORIES_PER_GRAM.protein
  );

  const carbs = calculateMacroBreakdown(targetCalories, carbsPercent, CALORIES_PER_GRAM.carbs);

  const fat = calculateMacroBreakdown(targetCalories, fatPercent, CALORIES_PER_GRAM.fat);

  return { protein, carbs, fat };
}

/**
 * Calculates target calories based on TDEE and goal
 * @param tdee Total Daily Energy Expenditure
 * @param goal Dietary goal
 * @param customAdjustment Optional custom calorie adjustment
 * @returns Target daily calories
 */
export function calculateTargetCalories(
  tdee: number,
  goal: keyof typeof CALORIE_ADJUSTMENTS,
  customAdjustment?: number
): number {
  if (tdee <= 0) {
    throw new Error('TDEE must be greater than 0');
  }

  const adjustment = customAdjustment ?? CALORIE_ADJUSTMENTS[goal] ?? 0;
  const targetCalories = tdee + adjustment;

  // Ensure minimum safe calorie intake
  const minimumCalories = 1200;
  return Math.max(Math.round(targetCalories), minimumCalories);
}

/**
 * Calculates per-meal macro breakdown (assuming 3 meals)
 * @param protein Total daily protein grams
 * @param carbs Total daily carbs grams
 * @param fat Total daily fat grams
 * @param targetCalories Total daily calories
 * @returns Per-meal breakdown
 */
export function calculatePerMealMacros(
  protein: number,
  carbs: number,
  fat: number,
  targetCalories: number
): {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
} {
  const meals = 3;
  return {
    protein: Math.round(protein / meals),
    carbs: Math.round(carbs / meals),
    fat: Math.round(fat / meals),
    calories: Math.round(targetCalories / meals),
  };
}

/**
 * Process Macro calculation based on form values
 * @param values Form values from the calculator
 * @returns Complete MacroResult with all calculations
 */
export function processMacroCalculation(values: MacroFormValues): MacroResult {
  try {
    // Convert height to cm if needed
    const heightCm =
      values.heightUnit === 'cm'
        ? values.heightCm
        : heightFtInToCm(values.heightFt, values.heightIn);

    // Convert weight to kg if needed
    const weightKg =
      values.weightUnit === 'kg' ? values.weightKg : convertWeight(values.weightLb, 'lb', 'kg');

    // Calculate BMR using Mifflin-St Jeor formula
    const bmr = calculateBMR(values.gender, values.age, weightKg, heightCm);

    // Get activity multiplier
    const activityMultiplier = getActivityMultiplier(values.activityLevel);

    // Calculate TDEE
    const tdee = calculateTDEE(bmr, activityMultiplier);

    // Calculate target calories based on goal
    const targetCalories = calculateTargetCalories(tdee, values.goal, values.calorieAdjustment);

    // Get macro percentages based on goal or custom values
    let proteinPercent: number;
    let carbsPercent: number;
    let fatPercent: number;

    if (values.goal === 'custom' && values.customProteinPercent !== undefined) {
      proteinPercent = values.customProteinPercent;
      carbsPercent = values.customCarbsPercent ?? 40;
      fatPercent = values.customFatPercent ?? 30;
    } else {
      const preset = getMacroPreset(values.goal);
      proteinPercent = preset.proteinPercent;
      carbsPercent = preset.carbsPercent;
      fatPercent = preset.fatPercent;
    }

    // Calculate macros
    const { protein, carbs, fat } = calculateMacros({
      targetCalories,
      proteinPercent,
      carbsPercent,
      fatPercent,
    });

    // Calculate per-meal breakdown
    const perMeal = calculatePerMealMacros(protein.grams, carbs.grams, fat.grams, targetCalories);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      protein,
      carbs,
      fat,
      goal: values.goal,
      perMeal,
    };
  } catch (error) {
    logger.logError('Error calculating macros', error);
    throw error;
  }
}

/**
 * Calculates protein requirement based on body weight and activity level
 * @param weightKg Body weight in kilograms
 * @param activityLevel Activity level
 * @returns Recommended protein range in grams
 */
export function calculateProteinRequirement(
  weightKg: number,
  activityLevel: string
): { min: number; max: number } {
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0 kg');
  }

  // Protein recommendations in g/kg based on activity level
  const recommendations: Record<string, { min: number; max: number }> = {
    sedentary: { min: 0.8, max: 1.0 },
    lightly_active: { min: 1.0, max: 1.2 },
    moderately_active: { min: 1.2, max: 1.6 },
    very_active: { min: 1.6, max: 2.0 },
    extremely_active: { min: 1.8, max: 2.2 },
  };

  const rec = recommendations[activityLevel] || recommendations['sedentary'];

  return {
    min: Math.round(weightKg * rec.min),
    max: Math.round(weightKg * rec.max),
  };
}

/**
 * Converts macro grams to food equivalents for easier understanding
 * @param protein Grams of protein
 * @param carbs Grams of carbohydrates
 * @param fat Grams of fat
 * @returns Food equivalent descriptions
 */
export function getMacroFoodEquivalents(
  protein: number,
  carbs: number,
  fat: number
): {
  protein: string;
  carbs: string;
  fat: string;
} {
  // Approximate food equivalents
  const chickenBreastGrams = 100; // ~31g protein per 100g chicken breast
  const riceGrams = 100; // ~28g carbs per 100g cooked rice
  const avocadoGrams = 200; // ~30g fat per avocado (~200g)

  const chickenServings = protein / 31;
  const riceServings = carbs / 28;
  const avocadoServings = fat / 15;

  return {
    protein: `~${(chickenServings * chickenBreastGrams).toFixed(0)}g chicken breast`,
    carbs: `~${(riceServings * riceGrams).toFixed(0)}g cooked rice`,
    fat: `~${avocadoServings.toFixed(1)} avocados`,
  };
}
