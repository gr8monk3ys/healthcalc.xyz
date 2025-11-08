/**
 * Utility functions for calculator pages
 * Note: Basic conversion functions are re-exported from @/utils/conversions for better organization
 */

import {
  heightFtInToCm as heightFtInToCmBase,
  heightCmToFtIn as heightCmToFtInBase,
  weightLbToKg as weightLbToKgBase,
  weightKgToLb as weightKgToLbBase,
  formatNumber as formatNumberBase,
} from '@/utils/conversions';

// Re-export conversion functions from conversions.ts
export { heightFtInToCmBase as heightFtInToCm };
export { heightCmToFtInBase as heightCmToFtIn };
export { weightLbToKgBase as weightLbToKg };
export { weightKgToLbBase as weightKgToLb };
export { formatNumberBase as formatNumber };

/**
 * Converts height between metric (cm) and imperial (inches) systems
 * This is a system-level converter that wraps the unit-specific converters
 */
export function convertHeight(
  height: number,
  from: 'imperial' | 'metric',
  to: 'imperial' | 'metric'
): number {
  if (from === to) return height;

  if (from === 'imperial' && to === 'metric') {
    // Convert inches to cm
    return height * 2.54;
  } else {
    // Convert cm to inches
    return height / 2.54;
  }
}

/**
 * Converts weight between metric (kg) and imperial (lb) systems
 * This is a system-level converter that wraps the unit-specific converters
 */
export function convertWeight(
  weight: number,
  from: 'imperial' | 'metric',
  to: 'imperial' | 'metric'
): number {
  if (from === to) return weight;

  if (from === 'imperial' && to === 'metric') {
    // Convert pounds to kg using the more accurate conversion from conversions.ts
    return weightLbToKgBase(weight);
  } else {
    // Convert kg to pounds using the more accurate conversion from conversions.ts
    return weightKgToLbBase(weight);
  }
}

/**
 * Calculates BMI (Body Mass Index)
 * @param weight Weight in kilograms
 * @param height Height in centimeters
 */
export function calculateBMI(weight: number, height: number): number {
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Gets BMI category based on BMI value
 */
export function getBMICategory(bmi: number): {
  category: string;
  color: string;
} {
  if (bmi < 18.5) {
    return { category: 'Underweight', color: '#3B82F6' }; // blue
  } else if (bmi < 25) {
    return { category: 'Normal', color: '#10B981' }; // green
  } else if (bmi < 30) {
    return { category: 'Overweight', color: '#F59E0B' }; // yellow
  } else {
    return { category: 'Obese', color: '#EF4444' }; // red
  }
}

/**
 * Calculates BMR (Basal Metabolic Rate) using the Mifflin-St Jeor Equation
 * @param weight Weight in kilograms
 * @param height Height in centimeters
 * @param age Age in years
 * @param isMale Boolean indicating if the person is male
 */
export function calculateBMR(weight: number, height: number, age: number, isMale: boolean): number {
  if (isMale) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculates TDEE (Total Daily Energy Expenditure) based on BMR and activity level
 * @param bmr Basal Metabolic Rate
 * @param activityLevel Activity level multiplier
 */
export function calculateTDEE(bmr: number, activityLevel: number): number {
  return bmr * activityLevel;
}

/**
 * Activity level multipliers for TDEE calculation
 */
export const activityLevels = [
  {
    value: 1.2,
    label: 'Sedentary (little or no exercise)',
    description: 'Office job, mostly sitting',
  },
  {
    value: 1.375,
    label: 'Lightly active (light exercise 1-3 days/week)',
    description: 'Light walking, yoga, or similar',
  },
  {
    value: 1.55,
    label: 'Moderately active (moderate exercise 3-5 days/week)',
    description: 'Jogging, cycling, or similar',
  },
  {
    value: 1.725,
    label: 'Very active (hard exercise 6-7 days/week)',
    description: 'Intense workouts most days',
  },
  {
    value: 1.9,
    label: 'Extremely active (very hard exercise & physical job)',
    description: 'Athletes, construction workers',
  },
];

/**
 * Calculates body fat percentage using the U.S. Navy method
 * @param waist Waist circumference in cm
 * @param neck Neck circumference in cm
 * @param height Height in cm
 * @param hip Hip circumference in cm (for females only)
 * @param isMale Boolean indicating if the person is male
 */
export function calculateNavyBodyFat(
  waist: number,
  neck: number,
  height: number,
  hip: number | null,
  isMale: boolean
): number {
  if (isMale) {
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    if (hip === null) {
      throw new Error('Hip measurement is required for females');
    }
    return (
      495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450
    );
  }
}

/**
 * Gets body fat category based on percentage and gender
 */
export function getBodyFatCategory(
  bodyFatPercentage: number,
  isMale: boolean
): {
  category: string;
  color: string;
} {
  if (isMale) {
    if (bodyFatPercentage < 6) {
      return { category: 'Essential Fat', color: '#3B82F6' }; // blue
    } else if (bodyFatPercentage < 14) {
      return { category: 'Athletic', color: '#10B981' }; // green
    } else if (bodyFatPercentage < 18) {
      return { category: 'Fitness', color: '#10B981' }; // green
    } else if (bodyFatPercentage < 25) {
      return { category: 'Average', color: '#F59E0B' }; // yellow
    } else {
      return { category: 'Obese', color: '#EF4444' }; // red
    }
  } else {
    if (bodyFatPercentage < 14) {
      return { category: 'Essential Fat', color: '#3B82F6' }; // blue
    } else if (bodyFatPercentage < 21) {
      return { category: 'Athletic', color: '#10B981' }; // green
    } else if (bodyFatPercentage < 25) {
      return { category: 'Fitness', color: '#10B981' }; // green
    } else if (bodyFatPercentage < 32) {
      return { category: 'Average', color: '#F59E0B' }; // yellow
    } else {
      return { category: 'Obese', color: '#EF4444' }; // red
    }
  }
}

/**
 * Calculates Waist-to-Hip Ratio
 */
export function calculateWHR(waist: number, hip: number): number {
  return waist / hip;
}

/**
 * Gets WHR category based on ratio and gender
 */
export function getWHRCategory(
  whr: number,
  isMale: boolean
): {
  category: string;
  risk: string;
  color: string;
} {
  if (isMale) {
    if (whr < 0.9) {
      return { category: 'Low', risk: 'Low', color: '#10B981' }; // green
    } else if (whr < 1.0) {
      return { category: 'Moderate', risk: 'Moderate', color: '#F59E0B' }; // yellow
    } else {
      return { category: 'High', risk: 'High', color: '#EF4444' }; // red
    }
  } else {
    if (whr < 0.8) {
      return { category: 'Low', risk: 'Low', color: '#10B981' }; // green
    } else if (whr < 0.85) {
      return { category: 'Moderate', risk: 'Moderate', color: '#F59E0B' }; // yellow
    } else {
      return { category: 'High', risk: 'High', color: '#EF4444' }; // red
    }
  }
}

/**
 * Calculates A Body Shape Index (ABSI)
 * @param waist Waist circumference in cm
 * @param weight Weight in kg
 * @param height Height in cm
 */
export function calculateABSI(waist: number, weight: number, height: number): number {
  const bmi = calculateBMI(weight, height);
  const heightInMeters = height / 100;

  // ABSI = WC / (BMI^(2/3) * Height^(1/2))
  return waist / (Math.pow(bmi, 2 / 3) * Math.pow(heightInMeters, 1 / 2));
}
