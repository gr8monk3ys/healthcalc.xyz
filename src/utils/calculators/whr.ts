import { Gender } from '@/types/common';
import { WHR_CATEGORIES } from '@/constants/whr';

/**
 * Calculate Waist-to-Hip Ratio (WHR)
 * @param waistCm Waist circumference in centimeters
 * @param hipsCm Hip circumference in centimeters
 * @returns WHR value
 */
export function calculateWHR(waistCm: number, hipsCm: number): number {
  // Defensive input validation
  if (waistCm <= 0 || hipsCm <= 0) {
    throw new Error('Both waist and hip measurements must be positive numbers');
  }

  if (isNaN(waistCm) || isNaN(hipsCm)) {
    throw new Error('Both measurements must be valid numbers');
  }

  if (!isFinite(waistCm) || !isFinite(hipsCm)) {
    throw new Error('Measurements must be finite numbers');
  }

  const whr = waistCm / hipsCm;

  // WHR should be in a reasonable range (0.5 to 1.5 covers all realistic human proportions)
  if (whr < 0.5 || whr > 1.5) {
    throw new Error('WHR result is outside realistic range - please check your measurements');
  }

  return whr;
}

/**
 * Get WHR category based on gender and WHR value
 * @param gender Gender ('male' or 'female')
 * @param whr Waist-to-Hip Ratio value
 * @returns Category object with name, color, description, and health risk
 */
export function getWHRCategory(
  gender: Gender,
  whr: number
): {
  name: string;
  color: string;
  description: string;
  healthRisk: string;
} {
  for (const category of WHR_CATEGORIES) {
    const range = gender === 'male' ? category.ranges.male : category.ranges.female;

    if (range.max === undefined) {
      if (whr >= range.min) {
        return {
          name: category.name,
          color: category.color,
          description: category.description,
          healthRisk: category.healthRisk,
        };
      }
    } else if (whr >= range.min && whr < range.max) {
      return {
        name: category.name,
        color: category.color,
        description: category.description,
        healthRisk: category.healthRisk,
      };
    }
  }

  // Default fallback (should not reach here if categories are properly defined)
  return {
    name: 'Unknown',
    color: '#6B7280',
    description: 'Unable to determine category.',
    healthRisk: 'Unknown',
  };
}

/**
 * Calculate WHR and get category
 * @param waistCm Waist circumference in centimeters
 * @param hipsCm Hip circumference in centimeters
 * @param gender Gender ('male' or 'female')
 * @returns Object with WHR value and category information
 */
export function calculateWHRWithCategory(
  waistCm: number,
  hipsCm: number,
  gender: Gender
): {
  whr: number;
  category: string;
  color: string;
  description: string;
  healthRisk: string;
} {
  // Calculate WHR
  const whr = calculateWHR(waistCm, hipsCm);

  // Get category
  const { name: category, color, description, healthRisk } = getWHRCategory(gender, whr);

  return {
    whr,
    category,
    color,
    description,
    healthRisk,
  };
}
