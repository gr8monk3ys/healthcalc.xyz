import { BodyFatFormValues, BodyFatResult } from '@/types/bodyFat';
import { BODY_FAT_CATEGORIES } from '@/constants/bodyFat';

/**
 * Calculates body fat percentage using the U.S. Navy Method
 * @param gender 'male' or 'female'
 * @param waistCm Waist circumference in cm
 * @param neckCm Neck circumference in cm
 * @param hipsCm Hip circumference in cm (for women only)
 * @param heightCm Height in cm
 * @returns Body fat percentage
 */
export function calculateNavyMethodBodyFat(
  gender: 'male' | 'female',
  waistCm: number,
  neckCm: number,
  hipsCm: number,
  heightCm: number
): number {
  // Convert to inches for the formula
  const waistIn = waistCm / 2.54;
  const neckIn = neckCm / 2.54;
  const heightIn = heightCm / 2.54;
  const hipsIn = hipsCm / 2.54;
  
  let bodyFat: number;
  
  if (gender === 'male') {
    // Men: %BF = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistIn - neckIn) + 0.15456 * Math.log10(heightIn)) - 450;
  } else {
    // Women: %BF = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistIn + hipsIn - neckIn) + 0.22100 * Math.log10(heightIn)) - 450;
  }
  
  return Math.max(0, Math.min(bodyFat, 60)); // Clamp between 0% and 60%
}

/**
 * Calculates body fat percentage using the BMI method (estimation)
 * @param gender 'male' or 'female'
 * @param bmi Body Mass Index
 * @param age Age in years
 * @returns Estimated body fat percentage
 */
export function estimateBodyFatFromBMI(
  gender: 'male' | 'female',
  bmi: number,
  age: number
): number {
  // Simplified Deurenberg formula
  // Men: BF% = (1.20 × BMI) + (0.23 × Age) - (10.8 × gender) - 5.4
  // Women: BF% = (1.20 × BMI) + (0.23 × Age) - 5.4
  // where gender = 1 for males, 0 for females
  
  const genderFactor = gender === 'male' ? 1 : 0;
  const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
  
  return Math.max(0, Math.min(bodyFat, 60)); // Clamp between 0% and 60%
}

/**
 * Calculates body fat percentage using the 3-site Jackson-Pollock method
 * @param gender 'male' or 'female'
 * @param age Age in years
 * @param skinfolds Object containing skinfold measurements in mm
 * @returns Body fat percentage
 */
export function calculateJacksonPollock3SiteBodyFat(
  gender: 'male' | 'female',
  age: number,
  skinfolds: {
    chest?: number;
    abdomen?: number;
    thigh?: number;
    triceps?: number;
    suprailiac?: number;
  }
): number {
  let sum: number;
  let bodyDensity: number;
  
  if (gender === 'male') {
    // Men: Chest, Abdomen, Thigh
    if (!skinfolds.chest || !skinfolds.abdomen || !skinfolds.thigh) {
      throw new Error('Missing required skinfold measurements for men');
    }
    
    sum = skinfolds.chest + skinfolds.abdomen + skinfolds.thigh;
    bodyDensity = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
  } else {
    // Women: Triceps, Suprailiac, Thigh
    if (!skinfolds.triceps || !skinfolds.suprailiac || !skinfolds.thigh) {
      throw new Error('Missing required skinfold measurements for women');
    }
    
    sum = skinfolds.triceps + skinfolds.suprailiac + skinfolds.thigh;
    bodyDensity = 1.0994921 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * age);
  }
  
  // Siri equation to convert body density to body fat percentage
  const bodyFat = (495 / bodyDensity) - 450;
  
  return Math.max(0, Math.min(bodyFat, 60)); // Clamp between 0% and 60%
}

/**
 * Gets body fat category based on percentage and gender
 * @param bodyFatPercentage Body fat percentage
 * @param gender 'male' or 'female'
 * @returns Category object with name, color, and description
 */
export function getBodyFatCategory(
  bodyFatPercentage: number,
  gender: 'male' | 'female'
): { name: string; color: string; description: string } {
  const category = BODY_FAT_CATEGORIES.find(cat => {
    const range = cat.ranges[gender];
    return bodyFatPercentage >= range.min && (range.max === undefined || bodyFatPercentage < range.max);
  });
  
  if (!category) {
    return { 
      name: 'Unknown', 
      color: '#6B7280', // gray
      description: 'Unable to determine category'
    };
  }
  
  return {
    name: category.name,
    color: category.color,
    description: category.description
  };
}

/**
 * Calculates lean body mass and fat mass
 * @param weightKg Weight in kg
 * @param bodyFatPercentage Body fat percentage
 * @returns Object with lean mass and fat mass in kg
 */
export function calculateBodyComposition(
  weightKg: number,
  bodyFatPercentage: number
): { leanMass: number; fatMass: number } {
  const fatMass = weightKg * (bodyFatPercentage / 100);
  const leanMass = weightKg - fatMass;
  
  return {
    leanMass: Math.round(leanMass * 10) / 10, // Round to 1 decimal place
    fatMass: Math.round(fatMass * 10) / 10, // Round to 1 decimal place
  };
}

/**
 * Calculates healthy body fat range based on gender and age
 * @param gender 'male' or 'female'
 * @param age Age in years
 * @returns Object with min and max body fat percentage
 */
export function calculateHealthyBodyFatRange(
  gender: 'male' | 'female'
): { min: number; max: number } {
  // Fitness and Athletic categories are considered healthy
  if (gender === 'male') {
    return { min: 6, max: 17 }; // Athletic to Fitness for men
  } else {
    return { min: 14, max: 24 }; // Athletic to Fitness for women
  }
}

/**
 * Process body fat calculation based on form values
 * @param values Form values
 * @returns Body fat result object
 */
export function processBodyFatCalculation(values: BodyFatFormValues): BodyFatResult {
  // Convert height to cm if needed
  const heightCm = values.heightUnit === 'cm' 
    ? values.heightCm 
    : (values.heightFt * 30.48) + (values.heightIn * 2.54);
  
  // Convert weight to kg if needed
  const weightKg = values.weightUnit === 'kg'
    ? values.weightKg
    : values.weightLb * 0.453592;
  
  // Convert circumferences to cm if needed
  const waistCm = values.waistCm || values.waistIn * 2.54;
  const neckCm = values.neckCm || values.neckIn * 2.54;
  const hipsCm = values.hipsCm || values.hipsIn * 2.54;
  
  let bodyFatPercentage: number;
  
  // Calculate body fat based on selected method
  switch (values.method) {
    case 'navy':
      bodyFatPercentage = calculateNavyMethodBodyFat(
        values.gender,
        waistCm,
        neckCm,
        hipsCm,
        heightCm
      );
      break;
      
    case 'bmi':
      // Calculate BMI first
      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);
      bodyFatPercentage = estimateBodyFatFromBMI(values.gender, bmi, values.age);
      break;
      
    case 'skinfold3':
      bodyFatPercentage = calculateJacksonPollock3SiteBodyFat(
        values.gender,
        values.age,
        {
          chest: values.skinfoldChest,
          abdomen: values.skinfoldAbdomen,
          thigh: values.skinfoldThigh,
          triceps: values.skinfoldTriceps,
          suprailiac: values.skinfoldSuprailiac,
        }
      );
      break;
      
    case 'manual':
      bodyFatPercentage = values.bodyFatPercentage;
      break;
      
    default:
      throw new Error(`Method ${values.method} not implemented`);
  }
  
  // Get category
  const { name: category, color, description } = getBodyFatCategory(bodyFatPercentage, values.gender);
  
  // Calculate body composition
  const { leanMass, fatMass } = calculateBodyComposition(weightKg, bodyFatPercentage);
  
  // Get healthy range
  const healthyRange = calculateHealthyBodyFatRange(values.gender);
  
  return {
    bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10, // Round to 1 decimal place
    category,
    color,
    leanMass,
    fatMass,
    healthyRange,
  };
}
