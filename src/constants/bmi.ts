import { BMICategory, BMIPercentileCategory } from '@/types/bmi';

// BMI categories for adults
export const BMI_CATEGORIES: BMICategory[] = [
  {
    name: 'Underweight',
    range: { min: 0, max: 18.5 },
    color: '#3B82F6', // blue
  },
  {
    name: 'Normal',
    range: { min: 18.5, max: 25 },
    color: '#10B981', // green
  },
  {
    name: 'Overweight',
    range: { min: 25, max: 30 },
    color: '#F59E0B', // yellow
  },
  {
    name: 'Obese',
    range: { min: 30 },
    color: '#EF4444', // red
  },
];

// BMI percentile categories for children
export const BMI_PERCENTILE_CATEGORIES: BMIPercentileCategory[] = [
  {
    name: 'Underweight',
    range: { min: 0, max: 5 },
    color: '#3B82F6', // blue
  },
  {
    name: 'Healthy weight',
    range: { min: 5, max: 85 },
    color: '#10B981', // green
  },
  {
    name: 'Overweight',
    range: { min: 85, max: 95 },
    color: '#F59E0B', // yellow
  },
  {
    name: 'Obese',
    range: { min: 95 },
    color: '#EF4444', // red
  },
];

// BMI gauge segments for visualization
export const BMI_GAUGE_SEGMENTS = [
  { value: 18.5, color: '#3B82F6', label: 'Underweight' }, // blue
  { value: 25, color: '#10B981', label: 'Normal' }, // green
  { value: 30, color: '#F59E0B', label: 'Overweight' }, // yellow
  { value: 35, color: '#EF4444', label: 'Obese' }, // red
];

// Default values for BMI calculator
export const DEFAULT_BMI_VALUES = {
  adult: {
    male: {
      heightCm: 175,
      heightFt: 5,
      heightIn: 9,
      weightKg: 70,
      weightLb: 154,
    },
    female: {
      heightCm: 163,
      heightFt: 5,
      heightIn: 4,
      weightKg: 60,
      weightLb: 132,
    },
  },
  child: {
    male: {
      heightCm: 150,
      heightFt: 4,
      heightIn: 11,
      weightKg: 40,
      weightLb: 88,
    },
    female: {
      heightCm: 145,
      heightFt: 4,
      heightIn: 9,
      weightKg: 38,
      weightLb: 84,
    },
  },
};
