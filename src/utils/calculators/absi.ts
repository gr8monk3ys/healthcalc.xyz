import { Gender } from '@/types/common';
import { ABSI_MEAN, ABSI_RISK_CATEGORIES, WAIST_HEIGHT_RATIO_CATEGORIES } from '@/constants/absi';
import { getBMICategory } from './bmi';

/**
 * Calculate A Body Shape Index (ABSI)
 * @param waistCm Waist circumference in centimeters
 * @param heightCm Height in centimeters
 * @param weightKg Weight in kilograms
 * @returns ABSI value
 */
export function calculateABSI(waistCm: number, heightCm: number, weightKg: number): number {
  // Convert waist from cm to m
  const waistM = waistCm / 100;

  // Convert height from cm to m
  const heightM = heightCm / 100;

  // Calculate BMI
  const bmi = weightKg / (heightM * heightM);

  // Calculate ABSI
  // Formula: ABSI = WC / (BMI^(2/3) * H^(1/2))
  const absi = waistM / (Math.pow(bmi, 2 / 3) * Math.pow(heightM, 1 / 2));

  return absi;
}

/**
 * Calculate ABSI z-score based on age and gender
 * @param absi ABSI value
 * @param age Age in years
 * @param gender Gender ('male' or 'female')
 * @returns ABSI z-score
 */
export function calculateABSIZScore(absi: number, age: number, gender: Gender): number {
  // Find the appropriate mean and standard deviation for the age and gender
  const meanData = ABSI_MEAN[gender].find(data => {
    const [min, max] = data.ageRange;
    return age >= min && age <= max;
  });

  if (!meanData) {
    throw new Error(`No ABSI mean data found for ${gender} age ${age}`);
  }

  // Calculate z-score: (value - mean) / standard deviation
  const zScore = (absi - meanData.mean) / meanData.sd;

  return zScore;
}

/**
 * Get ABSI risk category based on z-score
 * @param zScore ABSI z-score
 * @returns Risk category object with name and color
 */
export function getABSIRiskCategory(zScore: number): {
  name: string;
  color: string;
  description: string;
} {
  for (const category of ABSI_RISK_CATEGORIES) {
    if (category.zScoreRange.max === undefined) {
      if (zScore >= category.zScoreRange.min) {
        return {
          name: category.name,
          color: category.color,
          description: category.description,
        };
      }
    } else if (zScore >= category.zScoreRange.min && zScore < category.zScoreRange.max) {
      return {
        name: category.name,
        color: category.color,
        description: category.description,
      };
    }
  }

  // Default fallback (should not reach here if categories are properly defined)
  return {
    name: 'Unknown',
    color: '#6B7280',
    description: 'Unable to determine risk category.',
  };
}

/**
 * Calculate waist-to-height ratio
 * @param waistCm Waist circumference in centimeters
 * @param heightCm Height in centimeters
 * @returns Waist-to-height ratio
 */
export function calculateWaistHeightRatio(waistCm: number, heightCm: number): number {
  return waistCm / heightCm;
}

/**
 * Get waist-to-height ratio category
 * @param ratio Waist-to-height ratio
 * @returns Category object with name and description
 */
export function getWaistHeightRatioCategory(ratio: number): { name: string; description: string } {
  for (const category of WAIST_HEIGHT_RATIO_CATEGORIES) {
    if (category.range.max === undefined) {
      if (ratio >= category.range.min) {
        return { name: category.name, description: category.description };
      }
    } else if (ratio >= category.range.min && ratio < category.range.max) {
      return { name: category.name, description: category.description };
    }
  }

  // Default fallback
  return { name: 'Unknown', description: 'Unable to determine category.' };
}

/**
 * Calculate ABSI and related metrics
 * @param waistCm Waist circumference in centimeters
 * @param heightCm Height in centimeters
 * @param weightKg Weight in kilograms
 * @param age Age in years
 * @param gender Gender ('male' or 'female')
 * @returns Object with ABSI, z-score, risk category, BMI, and waist-to-height ratio
 */
export function calculateABSIMetrics(
  waistCm: number,
  heightCm: number,
  weightKg: number,
  age: number,
  gender: Gender
): {
  absi: number;
  absiZScore: number;
  riskCategory: string;
  color: string;
  bmi: number;
  bmiCategory: string;
  waistHeightRatio: number;
} {
  // Calculate BMI
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  const { name: bmiCategory } = getBMICategory(bmi);

  // Calculate ABSI
  const absi = calculateABSI(waistCm, heightCm, weightKg);

  // Calculate ABSI z-score
  const absiZScore = calculateABSIZScore(absi, age, gender);

  // Get ABSI risk category
  const { name: riskCategory, color } = getABSIRiskCategory(absiZScore);

  // Calculate waist-to-height ratio
  const waistHeightRatio = calculateWaistHeightRatio(waistCm, heightCm);

  return {
    absi,
    absiZScore,
    riskCategory,
    color,
    bmi,
    bmiCategory,
    waistHeightRatio,
  };
}
