import { KetoType, KetoGoal, KetoMacroRatios } from '@/types/ketoCalculator';

/**
 * Standard keto macro ratios for different keto types
 */
export const KETO_MACRO_RATIOS: Record<KetoType, KetoMacroRatios> = {
  standard: {
    fat: 70,
    protein: 25,
    carbs: 5,
  },
  targeted: {
    fat: 65,
    protein: 25,
    carbs: 10,
  },
  cyclical: {
    fat: 70,
    protein: 25,
    carbs: 5,
  },
};

/**
 * Calorie adjustments based on keto goal
 */
export const KETO_GOAL_ADJUSTMENTS: Record<KetoGoal, number> = {
  'weight-loss': -0.2, // 20% deficit
  maintenance: 0, // No change
  'muscle-gain': 0.1, // 10% surplus
};

/**
 * Minimum protein per pound of lean body mass (g/lb)
 */
export const MIN_PROTEIN_PER_LB_LEAN = 0.8;

/**
 * Standard net carb limits for keto (grams)
 */
export const KETO_CARB_LIMITS = {
  standard: 25,
  targeted: 50,
  cyclical: 25, // 5 days low, 2 days higher
};

/**
 * Fiber target range (grams per day)
 */
export const FIBER_TARGET_RANGE = {
  min: 25,
  max: 35,
};

/**
 * Calorie content per gram of macronutrient
 */
export const CALORIES_PER_GRAM = {
  fat: 9,
  protein: 4,
  carbs: 4,
};

/**
 * Keto type descriptions
 */
export const KETO_TYPE_INFO: Record<
  KetoType,
  { label: string; description: string; details: string }
> = {
  standard: {
    label: 'Standard Keto (SKD)',
    description: '70% fat, 25% protein, 5% carbs - Consistently low carb',
    details:
      'The most common form of keto. Maintains ketosis continuously with consistent daily macros. Best for steady fat loss and metabolic benefits.',
  },
  targeted: {
    label: 'Targeted Keto (TKD)',
    description: '65% fat, 25% protein, 10% carbs - Extra carbs around workouts',
    details:
      'Allows 15-30g extra carbs 30-60 minutes before high-intensity workouts. Provides glycogen for performance while maintaining ketosis most of the day.',
  },
  cyclical: {
    label: 'Cyclical Keto (CKD)',
    description: '70% fat, 25% protein, 5% carbs - 5 days keto, 2 days carb refeed',
    details:
      'Alternates 5-6 days of standard keto with 1-2 high-carb days. Best for athletes and bodybuilders who need periodic glycogen replenishment.',
  },
};

/**
 * Keto goal descriptions
 */
export const KETO_GOAL_INFO: Record<
  KetoGoal,
  { label: string; description: string; adjustment: string }
> = {
  'weight-loss': {
    label: 'Fat Loss',
    description: 'Lose fat while preserving muscle',
    adjustment: '20% calorie deficit',
  },
  maintenance: {
    label: 'Maintenance',
    description: 'Maintain current weight and body composition',
    adjustment: 'No calorie adjustment',
  },
  'muscle-gain': {
    label: 'Muscle Gain',
    description: 'Build muscle in ketosis',
    adjustment: '10% calorie surplus',
  },
};

/**
 * Food examples for each macronutrient
 */
export const KETO_FOOD_EXAMPLES = {
  fats: [
    'Avocados',
    'Olive oil & coconut oil',
    'Grass-fed butter & ghee',
    'MCT oil',
    'Nuts & seeds (macadamias, almonds)',
    'Fatty fish (salmon, sardines)',
    'Egg yolks',
  ],
  proteins: [
    'Grass-fed beef',
    'Wild-caught fish',
    'Free-range poultry',
    'Eggs',
    'Pork',
    'Lamb',
    'Bone broth',
  ],
  carbs: [
    'Leafy greens (spinach, kale)',
    'Cruciferous vegetables (broccoli, cauliflower)',
    'Zucchini & cucumber',
    'Asparagus',
    'Bell peppers',
    'Avocados',
    'Berries (limited amounts)',
  ],
};

/**
 * Common keto mistakes and warnings
 */
export const KETO_WARNINGS = {
  lowProtein: 'Protein intake may be too low. Consider increasing to preserve muscle mass.',
  highProtein:
    'Very high protein can interfere with ketosis through gluconeogenesis. Monitor ketones.',
  veryLowCalories:
    'Calorie intake is quite low. Ensure adequate nutrition and consider metabolic adaptation.',
  beginnerAdvice:
    'New to keto? Start with standard keto for 4-8 weeks before trying targeted or cyclical.',
  electrolytes:
    'Remember to supplement electrolytes: sodium (3000-5000mg), potassium (1000-3500mg), magnesium (300-500mg).',
};
