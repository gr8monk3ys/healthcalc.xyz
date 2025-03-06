/**
 * Constants for Intermittent Fasting Calculator
 */

import { FastingProtocolDetails } from '@/types/intermittentFasting';

export const FASTING_PROTOCOLS: FastingProtocolDetails[] = [
  {
    id: '16:8',
    name: '16:8 Method',
    description:
      'Fast for 16 hours, eat within an 8-hour window. Most popular and beginner-friendly.',
    fastingHours: 16,
    eatingHours: 8,
    mealsRecommended: 2,
    difficulty: 'beginner',
    benefits: [
      'Improves insulin sensitivity',
      'Supports fat burning',
      'Easy to maintain long-term',
      'Fits most lifestyles',
    ],
    bestFor: ['Beginners', 'Weight loss', 'General health', 'Busy schedules'],
  },
  {
    id: '18:6',
    name: '18:6 Method',
    description: 'Fast for 18 hours, eat within a 6-hour window. Moderate intensity.',
    fastingHours: 18,
    eatingHours: 6,
    mealsRecommended: 2,
    difficulty: 'intermediate',
    benefits: [
      'Enhanced autophagy',
      'Greater fat oxidation',
      'Improved metabolic flexibility',
      'Better blood sugar control',
    ],
    bestFor: ['Intermediate fasters', 'Fat loss', 'Metabolic health', 'Athletic performance'],
  },
  {
    id: '20:4',
    name: '20:4 Warrior Diet',
    description: 'Fast for 20 hours, eat within a 4-hour window. Advanced protocol.',
    fastingHours: 20,
    eatingHours: 4,
    mealsRecommended: 1,
    difficulty: 'advanced',
    benefits: [
      'Maximum autophagy',
      'Significant calorie restriction',
      'Enhanced mental clarity',
      'Hormetic stress benefits',
    ],
    bestFor: ['Experienced fasters', 'Aggressive fat loss', 'Longevity', 'Mental performance'],
  },
  {
    id: 'omad',
    name: 'OMAD (One Meal a Day)',
    description: 'Fast for 23 hours, eat one large meal within a 1-hour window.',
    fastingHours: 23,
    eatingHours: 1,
    mealsRecommended: 1,
    difficulty: 'advanced',
    benefits: [
      'Extreme simplicity',
      'Maximum fasting benefits',
      'Time-efficient',
      'Strong autophagy activation',
    ],
    bestFor: [
      'Advanced fasters',
      'Busy professionals',
      'Simplicity seekers',
      'Experienced dieters',
    ],
  },
  {
    id: '5:2',
    name: '5:2 Diet',
    description:
      'Eat normally 5 days, restrict to 500-600 calories 2 non-consecutive days per week.',
    fastingHours: 0,
    eatingHours: 24,
    mealsRecommended: 3,
    difficulty: 'intermediate',
    benefits: [
      'Flexible approach',
      'No daily restriction',
      'Proven weight loss results',
      'Sustainable long-term',
    ],
    bestFor: ['Social eaters', 'Gradual weight loss', 'Flexible schedules', 'Long-term adherence'],
  },
  {
    id: 'alternate-day',
    name: 'Alternate Day Fasting',
    description: 'Alternate between fasting days (500 calories) and normal eating days.',
    fastingHours: 0,
    eatingHours: 24,
    mealsRecommended: 3,
    difficulty: 'advanced',
    benefits: [
      'Rapid weight loss',
      'Strong metabolic effects',
      'Research-backed benefits',
      'Significant calorie reduction',
    ],
    bestFor: [
      'Rapid fat loss',
      'Research participants',
      'Structured approach',
      'Experienced dieters',
    ],
  },
];

export const FASTING_GOALS = {
  'weight-loss': {
    calorieAdjustment: -0.2, // 20% deficit
    proteinMultiplier: 2.0, // g per kg bodyweight
    description: 'Calorie deficit to promote fat loss while preserving muscle',
  },
  maintenance: {
    calorieAdjustment: 0, // maintenance calories
    proteinMultiplier: 1.6, // g per kg bodyweight
    description: 'Maintain current weight while enjoying fasting benefits',
  },
  health: {
    calorieAdjustment: -0.1, // slight deficit
    proteinMultiplier: 1.8, // g per kg bodyweight
    description: 'Optimize metabolic health and longevity markers',
  },
  'muscle-gain': {
    calorieAdjustment: 0.1, // 10% surplus
    proteinMultiplier: 2.2, // g per kg bodyweight
    description: 'Calorie surplus to support muscle growth during eating window',
  },
};

// Minimum safe calorie intakes
export const MIN_CALORIES = {
  male: 1500,
  female: 1200,
};

// Maximum safe calorie intakes (for sanity checks)
export const MAX_CALORIES = 5000;

// Macronutrient percentages for different goals
export const MACRO_SPLITS = {
  'weight-loss': {
    protein: 0.35, // 35% of calories
    fat: 0.3, // 30% of calories
    carb: 0.35, // 35% of calories
  },
  maintenance: {
    protein: 0.3,
    fat: 0.3,
    carb: 0.4,
  },
  health: {
    protein: 0.3,
    fat: 0.35,
    carb: 0.35,
  },
  'muscle-gain': {
    protein: 0.3,
    fat: 0.25,
    carb: 0.45,
  },
};

// Fiber recommendation (grams per 1000 calories)
export const FIBER_PER_1000_CAL = 14;

// Water intake (ml per kg bodyweight)
export const WATER_PER_KG = 35;

// Meal timing offsets from eating window start (hours)
export const MEAL_TIMING_OFFSETS = {
  1: [0], // OMAD - eat immediately when window opens
  2: [0, 0.67], // 2 meals - spread across window (0h, 5.3h for 8h window)
  3: [0, 0.5, 0.85], // 3 meals - breakfast, lunch, dinner spacing
};

// Weight loss projection parameters
export const WEIGHT_LOSS_PARAMS = {
  caloriesPerKgFat: 7700,
  maxWeeks: 52,
  metabolicAdaptation: 0.95,
};
