import { BodyFatCategory, BodyFatMethodInfo } from '@/types/bodyFat';
import { Gender } from '@/types/common';

// Body fat categories with ranges for males and females
export const BODY_FAT_CATEGORIES: BodyFatCategory[] = [
  {
    name: 'Essential Fat',
    ranges: {
      male: { min: 2, max: 5 },
      female: { min: 10, max: 13 },
    },
    color: '#3B82F6', // blue
    description: 'Minimum level of fat necessary for basic physical and physiological health',
  },
  {
    name: 'Athletic',
    ranges: {
      male: { min: 6, max: 13 },
      female: { min: 14, max: 20 },
    },
    color: '#10B981', // green
    description: 'Typical for elite athletes',
  },
  {
    name: 'Fitness',
    ranges: {
      male: { min: 14, max: 17 },
      female: { min: 21, max: 24 },
    },
    color: '#10B981', // green
    description: 'Lean and defined appearance',
  },
  {
    name: 'Average',
    ranges: {
      male: { min: 18, max: 24 },
      female: { min: 25, max: 31 },
    },
    color: '#F59E0B', // yellow
    description: 'Typical for the general population',
  },
  {
    name: 'Obese',
    ranges: {
      male: { min: 25 },
      female: { min: 32 },
    },
    color: '#EF4444', // red
    description: 'Increased risk for health issues',
  },
];

// Body fat measurement methods
export const BODY_FAT_METHODS: BodyFatMethodInfo[] = [
  {
    id: 'navy',
    name: 'U.S. Navy Method',
    description: 'Uses waist, neck, and hip (for women) measurements',
    accuracy: 'medium',
    requiredMeasurements: ['waist', 'neck', 'hips (women only)'],
  },
  {
    id: 'skinfold3',
    name: '3-Site Skinfold',
    description: 'Uses calipers to measure 3 skinfold sites',
    accuracy: 'high',
    requiredMeasurements: ['chest, abdomen, thigh (men)', 'triceps, suprailiac, thigh (women)'],
  },
  {
    id: 'skinfold4',
    name: '4-Site Skinfold',
    description: 'Uses calipers to measure 4 skinfold sites',
    accuracy: 'high',
    requiredMeasurements: ['abdomen, suprailiac, triceps, thigh'],
  },
  {
    id: 'skinfold7',
    name: '7-Site Skinfold',
    description: 'Uses calipers to measure 7 skinfold sites (most accurate)',
    accuracy: 'high',
    requiredMeasurements: ['chest, axilla, triceps, subscapular, abdomen, suprailiac, thigh'],
  },
  {
    id: 'bmi',
    name: 'BMI Method',
    description: 'Estimates body fat based on BMI, age, and gender',
    accuracy: 'low',
    requiredMeasurements: ['height', 'weight'],
  },
  {
    id: 'manual',
    name: 'Manual Entry',
    description: 'Enter your body fat percentage directly',
    accuracy: 'medium',
    requiredMeasurements: ['body fat percentage'],
  },
];

// Default values for Body Fat calculator
export const DEFAULT_BODY_FAT_VALUES = {
  male: {
    age: 30,
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    weightKg: 70,
    weightLb: 154,
    waistCm: 85,
    waistIn: 33.5,
    neckCm: 38,
    neckIn: 15,
    hipsCm: 0, // Not used for males
    hipsIn: 0, // Not used for males
    bodyFatPercentage: 15, // For manual entry
  },
  female: {
    age: 30,
    heightCm: 163,
    heightFt: 5,
    heightIn: 4,
    weightKg: 60,
    weightLb: 132,
    waistCm: 74,
    waistIn: 29,
    neckCm: 32,
    neckIn: 12.5,
    hipsCm: 97,
    hipsIn: 38,
    bodyFatPercentage: 25, // For manual entry
  },
};

// Body fat gauge segments for visualization
export const BODY_FAT_GAUGE_SEGMENTS = {
  male: [
    { value: 5, color: '#3B82F6', label: 'Essential' }, // blue
    { value: 13, color: '#10B981', label: 'Athletic' }, // green
    { value: 17, color: '#10B981', label: 'Fitness' }, // green
    { value: 24, color: '#F59E0B', label: 'Average' }, // yellow
    { value: 30, color: '#EF4444', label: 'Obese' }, // red
  ],
  female: [
    { value: 13, color: '#3B82F6', label: 'Essential' }, // blue
    { value: 20, color: '#10B981', label: 'Athletic' }, // green
    { value: 24, color: '#10B981', label: 'Fitness' }, // green
    { value: 31, color: '#F59E0B', label: 'Average' }, // yellow
    { value: 40, color: '#EF4444', label: 'Obese' }, // red
  ],
};
