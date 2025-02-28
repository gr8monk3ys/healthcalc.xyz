import { BodyFatCategory } from '@/types/bodyFat';

/**
 * Body fat categories with ranges for males and females
 */
export const BODY_FAT_CATEGORIES: BodyFatCategory[] = [
  {
    name: 'Essential Fat',
    color: '#3B82F6', // blue
    description: 'The minimum amount of body fat necessary for basic physical and physiological health. Below this level, health risks increase significantly.',
    ranges: {
      male: { min: 2, max: 5 },
      female: { min: 10, max: 13 }
    }
  },
  {
    name: 'Athletic',
    color: '#10B981', // green
    description: 'The body fat percentage of athletes and those with very active lifestyles. Characterized by visible muscle definition and minimal fat.',
    ranges: {
      male: { min: 6, max: 13 },
      female: { min: 14, max: 20 }
    }
  },
  {
    name: 'Fitness',
    color: '#FBBF24', // yellow
    description: 'A healthy and sustainable level of body fat that allows for good athletic performance while maintaining overall health.',
    ranges: {
      male: { min: 14, max: 17 },
      female: { min: 21, max: 24 }
    }
  },
  {
    name: 'Average',
    color: '#F97316', // orange
    description: 'The average body fat percentage in the general population. While not optimal for athletic performance, this range is generally not associated with increased health risks.',
    ranges: {
      male: { min: 18, max: 24 },
      female: { min: 25, max: 31 }
    }
  },
  {
    name: 'Obese',
    color: '#EF4444', // red
    description: 'Excess body fat that is associated with increased risk of heart disease, diabetes, and other health conditions. Weight loss is recommended for health improvement.',
    ranges: {
      male: { min: 25 },
      female: { min: 32 }
    }
  }
];

/**
 * Body fat calculation methods with labels and descriptions
 */
export const BODY_FAT_METHODS = [
  {
    value: 'navy',
    label: 'U.S. Navy Method',
    description: 'Uses waist, neck, and hip (for women) measurements',
    requiredFields: ['waist', 'neck', 'hips']
  },
  {
    value: 'bmi',
    label: 'BMI Method',
    description: 'Estimates body fat based on BMI, age, and gender',
    requiredFields: []
  },
  {
    value: 'manual',
    label: 'Manual Entry',
    description: 'Enter your body fat percentage directly',
    requiredFields: ['bodyFatPercentage']
  }
];
