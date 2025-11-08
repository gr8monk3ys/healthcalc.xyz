/**
 * Input validation utilities for calculator forms
 * Prevents garbage input and ensures data integrity
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Realistic ranges for health metrics
 */
export const VALIDATION_RANGES = {
  age: { min: 1, max: 120 },
  height: {
    cm: { min: 30, max: 300 }, // 1ft to ~10ft
    ft: { min: 1, max: 10 },
    in: { min: 0, max: 11 },
  },
  weight: {
    kg: { min: 2, max: 600 }, // covers extreme cases
    lb: { min: 5, max: 1300 },
  },
  waist: {
    cm: { min: 20, max: 300 },
    in: { min: 8, max: 120 },
  },
  hip: {
    cm: { min: 20, max: 300 },
    in: { min: 8, max: 120 },
  },
  neck: {
    cm: { min: 10, max: 100 },
    in: { min: 4, max: 40 },
  },
  bodyFatPercentage: { min: 1, max: 70 },
  calorieGoal: { min: -5000, max: 5000 },
  speed: { min: 0.1, max: 30 }, // mph
  duration: { min: 1, max: 1440 }, // minutes (max 24 hours)
  frequency: { min: 1, max: 14 }, // times per week
  burnGoal: { min: 0.1, max: 500 }, // pounds
} as const;

/**
 * Validates age input
 */
export function validateAge(age: number | string): ValidationResult {
  const numAge = Number(age);

  if (isNaN(numAge)) {
    return { isValid: false, error: 'Age must be a valid number' };
  }

  if (numAge < VALIDATION_RANGES.age.min) {
    return { isValid: false, error: 'Age must be at least 1 year' };
  }

  if (numAge > VALIDATION_RANGES.age.max) {
    return { isValid: false, error: 'Age must be less than 120 years' };
  }

  if (!Number.isInteger(numAge)) {
    return { isValid: false, error: 'Age must be a whole number' };
  }

  return { isValid: true };
}

/**
 * Validates height input (in cm)
 */
export function validateHeight(height: number | string, unit: 'metric' | 'imperial' = 'metric'): ValidationResult {
  const numHeight = Number(height);

  if (isNaN(numHeight)) {
    return { isValid: false, error: 'Height must be a valid number' };
  }

  if (numHeight <= 0) {
    return { isValid: false, error: 'Height must be greater than 0' };
  }

  const range = unit === 'metric' ? VALIDATION_RANGES.height.cm : { min: 12, max: 120 }; // inches

  if (numHeight < range.min) {
    return { isValid: false, error: `Height must be at least ${range.min}${unit === 'metric' ? 'cm' : '"'}` };
  }

  if (numHeight > range.max) {
    return { isValid: false, error: `Height must be less than ${range.max}${unit === 'metric' ? 'cm' : '"'}` };
  }

  return { isValid: true };
}

/**
 * Validates weight input
 */
export function validateWeight(weight: number | string, unit: 'metric' | 'imperial' = 'metric'): ValidationResult {
  const numWeight = Number(weight);

  if (isNaN(numWeight)) {
    return { isValid: false, error: 'Weight must be a valid number' };
  }

  if (numWeight <= 0) {
    return { isValid: false, error: 'Weight must be greater than 0' };
  }

  const range = unit === 'metric' ? VALIDATION_RANGES.weight.kg : VALIDATION_RANGES.weight.lb;

  if (numWeight < range.min) {
    return { isValid: false, error: `Weight must be at least ${range.min}${unit === 'metric' ? 'kg' : 'lb'}` };
  }

  if (numWeight > range.max) {
    return { isValid: false, error: `Weight must be less than ${range.max}${unit === 'metric' ? 'kg' : 'lb'}` };
  }

  return { isValid: true };
}

/**
 * Validates waist circumference
 */
export function validateWaist(waist: number | string, unit: 'metric' | 'imperial' = 'metric'): ValidationResult {
  const numWaist = Number(waist);

  if (isNaN(numWaist)) {
    return { isValid: false, error: 'Waist must be a valid number' };
  }

  if (numWaist <= 0) {
    return { isValid: false, error: 'Waist must be greater than 0' };
  }

  const range = unit === 'metric' ? VALIDATION_RANGES.waist.cm : VALIDATION_RANGES.waist.in;

  if (numWaist < range.min) {
    return { isValid: false, error: `Waist must be at least ${range.min}${unit === 'metric' ? 'cm' : '"'}` };
  }

  if (numWaist > range.max) {
    return { isValid: false, error: `Waist must be less than ${range.max}${unit === 'metric' ? 'cm' : '"'}` };
  }

  return { isValid: true };
}

/**
 * Validates hip circumference
 */
export function validateHip(hip: number | string, unit: 'metric' | 'imperial' = 'metric'): ValidationResult {
  const numHip = Number(hip);

  if (isNaN(numHip)) {
    return { isValid: false, error: 'Hip must be a valid number' };
  }

  if (numHip <= 0) {
    return { isValid: false, error: 'Hip must be greater than 0' };
  }

  const range = unit === 'metric' ? VALIDATION_RANGES.hip.cm : VALIDATION_RANGES.hip.in;

  if (numHip < range.min) {
    return { isValid: false, error: `Hip must be at least ${range.min}${unit === 'metric' ? 'cm' : '"'}` };
  }

  if (numHip > range.max) {
    return { isValid: false, error: `Hip must be less than ${range.max}${unit === 'metric' ? 'cm' : '"'}` };
  }

  return { isValid: true };
}

/**
 * Validates neck circumference
 */
export function validateNeck(neck: number | string, unit: 'metric' | 'imperial' = 'metric'): ValidationResult {
  const numNeck = Number(neck);

  if (isNaN(numNeck)) {
    return { isValid: false, error: 'Neck must be a valid number' };
  }

  if (numNeck <= 0) {
    return { isValid: false, error: 'Neck must be greater than 0' };
  }

  const range = unit === 'metric' ? VALIDATION_RANGES.neck.cm : VALIDATION_RANGES.neck.in;

  if (numNeck < range.min) {
    return { isValid: false, error: `Neck must be at least ${range.min}${unit === 'metric' ? 'cm' : '"'}` };
  }

  if (numNeck > range.max) {
    return { isValid: false, error: `Neck must be less than ${range.max}${unit === 'metric' ? 'cm' : '"'}` };
  }

  return { isValid: true };
}

/**
 * Validates body fat percentage
 */
export function validateBodyFatPercentage(bodyFat: number | string): ValidationResult {
  const numBodyFat = Number(bodyFat);

  if (isNaN(numBodyFat)) {
    return { isValid: false, error: 'Body fat percentage must be a valid number' };
  }

  if (numBodyFat <= 0) {
    return { isValid: false, error: 'Body fat percentage must be greater than 0' };
  }

  if (numBodyFat < VALIDATION_RANGES.bodyFatPercentage.min) {
    return { isValid: false, error: 'Body fat percentage must be at least 1%' };
  }

  if (numBodyFat > VALIDATION_RANGES.bodyFatPercentage.max) {
    return { isValid: false, error: 'Body fat percentage must be less than 70%' };
  }

  return { isValid: true };
}

/**
 * Validates calorie goal (can be negative for deficit)
 */
export function validateCalorieGoal(calories: number | string): ValidationResult {
  const numCalories = Number(calories);

  if (isNaN(numCalories)) {
    return { isValid: false, error: 'Calorie goal must be a valid number' };
  }

  if (numCalories < VALIDATION_RANGES.calorieGoal.min) {
    return { isValid: false, error: 'Calorie goal too low (max deficit: 5000 calories)' };
  }

  if (numCalories > VALIDATION_RANGES.calorieGoal.max) {
    return { isValid: false, error: 'Calorie goal too high (max surplus: 5000 calories)' };
  }

  return { isValid: true };
}

/**
 * Validates activity speed (mph)
 */
export function validateSpeed(speed: number | string): ValidationResult {
  const numSpeed = Number(speed);

  if (isNaN(numSpeed)) {
    return { isValid: false, error: 'Speed must be a valid number' };
  }

  if (numSpeed <= 0) {
    return { isValid: false, error: 'Speed must be greater than 0' };
  }

  if (numSpeed < VALIDATION_RANGES.speed.min) {
    return { isValid: false, error: 'Speed must be at least 0.1 mph' };
  }

  if (numSpeed > VALIDATION_RANGES.speed.max) {
    return { isValid: false, error: 'Speed must be less than 30 mph' };
  }

  return { isValid: true };
}

/**
 * Validates exercise duration (minutes)
 */
export function validateDuration(duration: number | string): ValidationResult {
  const numDuration = Number(duration);

  if (isNaN(numDuration)) {
    return { isValid: false, error: 'Duration must be a valid number' };
  }

  if (numDuration <= 0) {
    return { isValid: false, error: 'Duration must be greater than 0' };
  }

  if (numDuration < VALIDATION_RANGES.duration.min) {
    return { isValid: false, error: 'Duration must be at least 1 minute' };
  }

  if (numDuration > VALIDATION_RANGES.duration.max) {
    return { isValid: false, error: 'Duration must be less than 24 hours (1440 minutes)' };
  }

  return { isValid: true };
}

/**
 * Validates exercise frequency (times per week)
 */
export function validateFrequency(frequency: number | string): ValidationResult {
  const numFrequency = Number(frequency);

  if (isNaN(numFrequency)) {
    return { isValid: false, error: 'Frequency must be a valid number' };
  }

  if (numFrequency <= 0) {
    return { isValid: false, error: 'Frequency must be greater than 0' };
  }

  if (numFrequency < VALIDATION_RANGES.frequency.min) {
    return { isValid: false, error: 'Frequency must be at least 1 time per week' };
  }

  if (numFrequency > VALIDATION_RANGES.frequency.max) {
    return { isValid: false, error: 'Frequency must be less than 14 times per week' };
  }

  if (!Number.isInteger(numFrequency)) {
    return { isValid: false, error: 'Frequency must be a whole number' };
  }

  return { isValid: true };
}

/**
 * Validates burn goal (pounds of fat to lose)
 */
export function validateBurnGoal(burnGoal: number | string): ValidationResult {
  const numBurnGoal = Number(burnGoal);

  if (isNaN(numBurnGoal)) {
    return { isValid: false, error: 'Burn goal must be a valid number' };
  }

  if (numBurnGoal <= 0) {
    return { isValid: false, error: 'Burn goal must be greater than 0' };
  }

  if (numBurnGoal < VALIDATION_RANGES.burnGoal.min) {
    return { isValid: false, error: 'Burn goal must be at least 0.1 pounds' };
  }

  if (numBurnGoal > VALIDATION_RANGES.burnGoal.max) {
    return { isValid: false, error: 'Burn goal must be less than 500 pounds' };
  }

  return { isValid: true };
}

/**
 * Sanitize numeric input (remove non-numeric characters except decimal point and minus)
 */
export function sanitizeNumericInput(value: string): string {
  return value.replace(/[^0-9.-]/g, '');
}

/**
 * Check if a value is empty or null
 */
export function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}

/**
 * Validate that waist is less than hip for WHR
 */
export function validateWaistHipRatio(waist: number, hip: number): ValidationResult {
  if (waist >= hip) {
    return {
      isValid: false,
      error: 'Waist measurement should typically be less than hip measurement',
    };
  }

  return { isValid: true };
}

/**
 * Comprehensive BMI input validation
 */
export function validateBMIInputs(
  age: number | string,
  height: number | string,
  weight: number | string,
  unit: 'metric' | 'imperial'
): Record<string, string | undefined> {
  const errors: Record<string, string | undefined> = {};

  const ageValidation = validateAge(age);
  if (!ageValidation.isValid) {
    errors.age = ageValidation.error;
  }

  const heightValidation = validateHeight(height, unit);
  if (!heightValidation.isValid) {
    errors.height = heightValidation.error;
  }

  const weightValidation = validateWeight(weight, unit);
  if (!weightValidation.isValid) {
    errors.weight = weightValidation.error;
  }

  return errors;
}
