// Rule: Move calculation logic from /app/api to /utils/calculators for better organization

import { BMIFormValues, BMIResult, BMICategory, BMIPercentileCategory } from '@/types/bmi';
import { BMI_CATEGORIES, BMI_PERCENTILE_CATEGORIES } from '@/constants/bmi';

/**
 * Calculates BMI (Body Mass Index) based on height and weight
 * @param heightCm Height in centimeters
 * @param weightKg Weight in kilograms
 * @returns BMI value
 */
export function calculateBMI(heightCm: number, weightKg: number): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (heightCm <= 0) {
    throw new Error('Height must be greater than 0');
  }
  
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than 0');
  }
  
  // BMI formula: weight (kg) / (height (m))^2
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Gets BMI category based on BMI value for adults
 * @param bmi BMI value
 * @returns Category object with name and color
 */
export function getBMICategory(bmi: number): { name: string; color: string } {
  // Rule: Implement proper error handling and validation in calculation functions
  if (bmi <= 0) {
    throw new Error('BMI must be greater than 0');
  }
  
  const category = BMI_CATEGORIES.find(
    (cat) => bmi >= cat.range.min && (cat.range.max === undefined || bmi < cat.range.max)
  );

  if (!category) {
    return { name: 'Unknown', color: '#6B7280' }; // gray
  }

  return { name: category.name, color: category.color };
}

/**
 * Gets BMI percentile category for children
 * @param percentile BMI percentile value
 * @returns Category object with name and color
 */
export function getBMIPercentileCategory(percentile: number): { name: string; color: string } {
  // Rule: Implement proper error handling and validation in calculation functions
  if (percentile < 0 || percentile > 100) {
    throw new Error('Percentile must be between 0 and 100');
  }
  
  const category = BMI_PERCENTILE_CATEGORIES.find(
    (cat) => percentile >= cat.range.min && (cat.range.max === undefined || percentile < cat.range.max)
  );

  if (!category) {
    return { name: 'Unknown', color: '#6B7280' }; // gray
  }

  return { name: category.name, color: category.color };
}

/**
 * Calculates healthy weight range for a given height
 * @param heightCm Height in centimeters
 * @returns Object with min and max weight in kg
 */
export function calculateHealthyWeightRange(heightCm: number): { min: number; max: number } {
  // Rule: Implement proper error handling and validation in calculation functions
  if (heightCm <= 0) {
    throw new Error('Height must be greater than 0');
  }
  
  const heightM = heightCm / 100;
  const minWeight = 18.5 * heightM * heightM; // Lower bound of normal BMI
  const maxWeight = 24.9 * heightM * heightM; // Upper bound of normal BMI
  
  return {
    min: Math.round(minWeight * 10) / 10, // Round to 1 decimal place
    max: Math.round(maxWeight * 10) / 10, // Round to 1 decimal place
  };
}

/**
 * Calculates BMI percentile for children (simplified version)
 * Note: In a real app, this would use CDC growth charts data
 * @param bmi BMI value
 * @param age Age in years
 * @param gender 'male' or 'female'
 * @returns Estimated percentile (0-100)
 */
export function estimateBMIPercentile(bmi: number, age: number, gender: 'male' | 'female'): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (bmi <= 0) {
    throw new Error('BMI must be greater than 0');
  }
  
  if (age < 2 || age > 20) {
    throw new Error('Age must be between 2 and 20 for percentile calculation');
  }
  
  // This is a simplified estimation
  // In a real app, you would use CDC growth chart data
  
  // Reference median BMI by age and gender (simplified)
  const medianBMI = gender === 'male' 
    ? 15 + (age * 0.4) // Simplified formula for boys
    : 14.5 + (age * 0.4); // Simplified formula for girls
  
  // Standard deviation (simplified)
  const sd = 2 + (age * 0.1);
  
  // Z-score calculation
  const zScore = (bmi - medianBMI) / sd;
  
  // Convert z-score to percentile
  // Using approximation of normal distribution CDF
  const percentile = Math.min(100, Math.max(0, 50 * (1 + zScore * 0.7)));
  
  return Math.round(percentile);
}

/**
 * Process BMI calculation based on form values
 * @param values Form values
 * @returns BMI result object
 */
export function processBMICalculation(values: BMIFormValues): BMIResult {
  // Rule: Implement proper error handling and validation in calculation functions
  if (!values) {
    throw new Error('Form values are required');
  }
  
  // Convert height to cm if needed
  const heightCm = values.heightUnit === 'cm' 
    ? values.heightCm 
    : (values.heightFt * 30.48) + (values.heightIn * 2.54);
  
  // Convert weight to kg if needed
  const weightKg = values.weightUnit === 'kg'
    ? values.weightKg
    : values.weightLb * 0.453592;
  
  // Calculate BMI
  const bmi = calculateBMI(heightCm, weightKg);
  
  // Get healthy weight range
  const healthyWeightRange = calculateHealthyWeightRange(heightCm);
  
  // For adults
  if (values.category === 'adult') {
    const { name: category, color } = getBMICategory(bmi);
    
    return {
      bmi: Math.round(bmi * 10) / 10, // Round to 1 decimal place
      category,
      color,
      healthyWeightRange,
    };
  } 
  // For children
  else {
    const percentile = estimateBMIPercentile(bmi, values.age, values.gender);
    const { name: category, color } = getBMIPercentileCategory(percentile);
    
    return {
      bmi: Math.round(bmi * 10) / 10, // Round to 1 decimal place
      category,
      color,
      healthyWeightRange,
      percentile,
    };
  }
}
