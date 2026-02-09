import { CaffeineSource, SensitivityLevel } from '@/types/caffeineCalculator';

/**
 * Caffeine content per serving for different sources
 * Values in milligrams (mg)
 */
export const CAFFEINE_CONTENT: Record<CaffeineSource, { mg: number; servingSize: string }> = {
  coffee: { mg: 95, servingSize: '8 oz cup' },
  espresso: { mg: 63, servingSize: '1 shot (1 oz)' },
  'green-tea': { mg: 35, servingSize: '8 oz cup' },
  'black-tea': { mg: 47, servingSize: '8 oz cup' },
  'energy-drink': { mg: 80, servingSize: '8.4 oz can' },
  'pre-workout': { mg: 200, servingSize: '1 scoop' },
  cola: { mg: 34, servingSize: '12 oz can' },
  'dark-chocolate': { mg: 12, servingSize: '1 oz' },
};

/**
 * Source display labels
 */
export const CAFFEINE_SOURCE_LABELS: Record<CaffeineSource, string> = {
  coffee: 'Coffee',
  espresso: 'Espresso',
  'green-tea': 'Green Tea',
  'black-tea': 'Black Tea',
  'energy-drink': 'Energy Drink',
  'pre-workout': 'Pre-Workout',
  cola: 'Cola',
  'dark-chocolate': 'Dark Chocolate',
};

/**
 * Safe daily caffeine limit: 6mg per kg bodyweight
 * FDA guideline is approximately 400mg for average adult (70kg)
 */
export const SAFE_CAFFEINE_PER_KG = 6;

/**
 * Pre-workout optimal dose range: 3-6mg per kg bodyweight
 * To be consumed 30-60 minutes before exercise
 */
export const PRE_WORKOUT_DOSE_RANGE = {
  min: 3,
  max: 6,
};

/**
 * Caffeine half-life in hours based on sensitivity level
 * Average is ~5 hours, but varies from 3-7 hours based on metabolism
 */
export const HALF_LIFE_HOURS: Record<SensitivityLevel, number> = {
  low: 3, // Fast metabolizer
  normal: 5, // Average metabolizer
  high: 7, // Slow metabolizer
};

/**
 * Sensitivity level descriptions
 */
export const SENSITIVITY_DESCRIPTIONS: Record<SensitivityLevel, string> = {
  low: 'Fast metabolizer - Can handle more caffeine',
  normal: 'Average metabolism - Standard caffeine tolerance',
  high: 'Slow metabolizer - More sensitive to caffeine effects',
};

/**
 * Default form values
 */
export const DEFAULT_CAFFEINE_VALUES = {
  weight: 70,
  weightUnit: 'kg' as const,
  sources: [{ source: 'coffee' as CaffeineSource, servings: 2 }],
  sensitivityLevel: 'normal' as SensitivityLevel,
  preWorkoutTiming: false,
};

/**
 * Validation ranges for caffeine calculator
 */
export const CAFFEINE_VALIDATION = {
  servings: { min: 0, max: 20 },
  maxSources: 8,
};
