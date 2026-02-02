import { ProteinGoal, ProteinRequirement, ProteinSource } from '@/types/protein';
import { ActivityLevel } from '@/types/common';

/**
 * Protein requirements by activity level (g/kg body weight)
 *
 * Scientific References:
 * - RDA for sedentary adults: 0.8 g/kg (Institute of Medicine, 2005)
 * - Active individuals: 1.2-1.6 g/kg (ISSN Position Stand, 2017)
 * - Athletes/strength training: 1.6-2.2 g/kg (Morton et al., 2018, British Journal of Sports Medicine)
 * - Weight loss with resistance training: up to 2.5 g/kg (Helms et al., 2014)
 * - Endurance athletes: 1.2-1.4 g/kg (Rodriguez et al., 2009)
 */
export const PROTEIN_REQUIREMENTS_BY_ACTIVITY: Record<ActivityLevel, ProteinRequirement> = {
  sedentary: {
    id: 'sedentary',
    name: 'Sedentary',
    description: 'Little or no exercise, desk job',
    minPerKg: 0.8,
    maxPerKg: 1.0,
    optimalPerKg: 0.8,
  },
  lightly_active: {
    id: 'lightly_active',
    name: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
    minPerKg: 1.0,
    maxPerKg: 1.2,
    optimalPerKg: 1.0,
  },
  moderately_active: {
    id: 'moderately_active',
    name: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
    minPerKg: 1.2,
    maxPerKg: 1.6,
    optimalPerKg: 1.4,
  },
  very_active: {
    id: 'very_active',
    name: 'Very Active',
    description: 'Hard exercise 6-7 days/week',
    minPerKg: 1.6,
    maxPerKg: 2.0,
    optimalPerKg: 1.8,
  },
  extremely_active: {
    id: 'extremely_active',
    name: 'Extremely Active / Athlete',
    description: 'Very hard exercise, physical job, or training twice a day',
    minPerKg: 1.8,
    maxPerKg: 2.2,
    optimalPerKg: 2.0,
  },
};

/**
 * Protein adjustments by goal (multiplier applied to base requirement)
 *
 * Scientific References:
 * - Weight loss: Higher protein helps preserve lean mass (Phillips & Van Loon, 2011)
 * - Muscle gain: Positive nitrogen balance requires 1.6-2.2 g/kg (Schoenfeld & Aragon, 2018)
 * - Athletic performance: Varies by sport and training phase
 */
export const PROTEIN_GOAL_ADJUSTMENTS: Record<
  ProteinGoal,
  { multiplier: number; additionalPerKg: number; description: string }
> = {
  general_health: {
    multiplier: 1.0,
    additionalPerKg: 0,
    description: 'Maintain general health and basic bodily functions',
  },
  maintain: {
    multiplier: 1.0,
    additionalPerKg: 0,
    description: 'Maintain current body composition',
  },
  weight_loss: {
    multiplier: 1.25,
    additionalPerKg: 0.3,
    description: 'Preserve muscle mass during calorie deficit',
  },
  muscle_gain: {
    multiplier: 1.2,
    additionalPerKg: 0.2,
    description: 'Support muscle protein synthesis for growth',
  },
  athletic_performance: {
    multiplier: 1.15,
    additionalPerKg: 0.1,
    description: 'Optimize recovery and performance',
  },
};

/**
 * Maximum safe protein intake guidelines
 * Upper limit is generally considered safe up to 3.5 g/kg for healthy individuals
 * Reference: Antonio et al., 2016 - Journal of the International Society of Sports Nutrition
 */
export const PROTEIN_LIMITS = {
  /** Absolute minimum for health (RDA baseline) */
  absoluteMinPerKg: 0.8,
  /** Safe upper limit for most healthy adults */
  safeUpperLimitPerKg: 3.5,
  /** Recommended max for sustained intake */
  recommendedMaxPerKg: 2.5,
  /** Minimum calories from protein percentage */
  minCaloriePercentage: 10,
  /** Maximum recommended calories from protein percentage */
  maxCaloriePercentage: 35,
} as const;

/**
 * Age-based protein adjustment factors
 * Older adults need more protein to maintain muscle mass
 * Reference: Bauer et al., 2013 - PROT-AGE Study Group recommendations
 */
export const AGE_PROTEIN_ADJUSTMENTS: { minAge: number; maxAge: number; multiplier: number }[] = [
  { minAge: 0, maxAge: 17, multiplier: 1.0 }, // Children/teens - standard
  { minAge: 18, maxAge: 40, multiplier: 1.0 }, // Young adults - standard
  { minAge: 41, maxAge: 65, multiplier: 1.1 }, // Middle age - slightly higher
  { minAge: 66, maxAge: 120, multiplier: 1.2 }, // Older adults - higher for sarcopenia prevention
];

/**
 * Common protein sources for reference
 * Values are approximate grams of protein per 100g of food
 */
export const PROTEIN_SOURCES: ProteinSource[] = [
  // Meat
  { name: 'Chicken Breast (cooked)', proteinPer100g: 31, category: 'meat' },
  { name: 'Turkey Breast (cooked)', proteinPer100g: 29, category: 'meat' },
  { name: 'Lean Beef (cooked)', proteinPer100g: 26, category: 'meat' },
  { name: 'Pork Tenderloin (cooked)', proteinPer100g: 26, category: 'meat' },
  // Seafood
  { name: 'Tuna (canned)', proteinPer100g: 26, category: 'seafood' },
  { name: 'Salmon (cooked)', proteinPer100g: 25, category: 'seafood' },
  { name: 'Shrimp (cooked)', proteinPer100g: 24, category: 'seafood' },
  { name: 'Cod (cooked)', proteinPer100g: 20, category: 'seafood' },
  // Dairy
  { name: 'Greek Yogurt (plain)', proteinPer100g: 10, category: 'dairy' },
  { name: 'Cottage Cheese (low-fat)', proteinPer100g: 11, category: 'dairy' },
  { name: 'Cheddar Cheese', proteinPer100g: 25, category: 'dairy' },
  { name: 'Milk (whole)', proteinPer100g: 3.4, category: 'dairy' },
  { name: 'Eggs (whole)', proteinPer100g: 13, category: 'dairy' },
  // Plant-based
  { name: 'Tofu (firm)', proteinPer100g: 8, category: 'plant' },
  { name: 'Tempeh', proteinPer100g: 19, category: 'plant' },
  { name: 'Lentils (cooked)', proteinPer100g: 9, category: 'plant' },
  { name: 'Black Beans (cooked)', proteinPer100g: 9, category: 'plant' },
  { name: 'Chickpeas (cooked)', proteinPer100g: 9, category: 'plant' },
  { name: 'Quinoa (cooked)', proteinPer100g: 4, category: 'plant' },
  { name: 'Almonds', proteinPer100g: 21, category: 'plant' },
  { name: 'Peanut Butter', proteinPer100g: 25, category: 'plant' },
  // Other
  { name: 'Whey Protein Powder', proteinPer100g: 80, category: 'other' },
  { name: 'Pea Protein Powder', proteinPer100g: 75, category: 'other' },
];

/**
 * Default form values for protein calculator
 */
export const DEFAULT_PROTEIN_VALUES = {
  male: {
    age: 30,
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    weightKg: 75,
    weightLb: 165,
    activityLevel: 'moderately_active' as ActivityLevel,
    goal: 'maintain' as ProteinGoal,
  },
  female: {
    age: 30,
    heightCm: 163,
    heightFt: 5,
    heightIn: 4,
    weightKg: 62,
    weightLb: 137,
    activityLevel: 'moderately_active' as ActivityLevel,
    goal: 'maintain' as ProteinGoal,
  },
};

/**
 * Recommendation messages based on protein intake ranges
 */
export const PROTEIN_RECOMMENDATIONS = {
  low: {
    message: 'Below recommended intake',
    color: '#F59E0B', // yellow/warning
  },
  optimal: {
    message: 'Optimal protein intake',
    color: '#10B981', // green
  },
  high: {
    message: 'High protein intake',
    color: '#3B82F6', // blue
  },
  veryHigh: {
    message: 'Very high protein intake - monitor kidney health',
    color: '#EF4444', // red
  },
} as const;
