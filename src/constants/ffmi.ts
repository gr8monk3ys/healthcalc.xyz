import { FFMICategory } from '@/types/ffmi';

/**
 * FFMI categories with ranges and descriptions
 * Based on research by Kouri et al. (1995) and subsequent studies on natural muscular potential
 */
export const FFMI_CATEGORIES: FFMICategory[] = [
  {
    name: 'Below Average',
    color: '#6B7280', // gray
    description:
      'Lower than average muscle mass for height. May benefit from resistance training and adequate protein intake.',
    range: { min: 0, max: 18 },
  },
  {
    name: 'Average',
    color: '#3B82F6', // blue
    description:
      'Normal muscle mass for height. Represents typical untrained or recreationally active individuals.',
    range: { min: 18, max: 20 },
  },
  {
    name: 'Above Average',
    color: '#10B981', // green
    description:
      'Good muscle development. Achievable naturally with consistent training and proper nutrition.',
    range: { min: 20, max: 22 },
  },
  {
    name: 'Excellent',
    color: '#FBBF24', // yellow
    description:
      'Very good muscle development. Requires dedicated training, nutrition, and favorable genetics.',
    range: { min: 22, max: 23 },
  },
  {
    name: 'Superior',
    color: '#F97316', // orange
    description:
      'Exceptional muscle mass. Near the natural limit for most individuals with excellent genetics and training.',
    range: { min: 23, max: 25 },
  },
  {
    name: 'Suspicious',
    color: '#EF4444', // red
    description:
      'Very unlikely to achieve naturally. This level typically indicates performance-enhancing drug use.',
    range: { min: 25, max: 27 },
  },
  {
    name: 'Almost Certainly Not Natural',
    color: '#DC2626', // dark red
    description:
      'Extremely unlikely to be natural. Virtually impossible to achieve without performance-enhancing drugs.',
    range: { min: 27 },
  },
];

/**
 * Default FFMI form values
 */
export const DEFAULT_FFMI_VALUES = {
  weight: 70,
  heightCm: 175,
  heightFt: 5,
  heightIn: 9,
  bodyFatPercentage: 15,
};

/**
 * Validation ranges for FFMI inputs
 */
export const FFMI_VALIDATION = {
  bodyFatPercentage: { min: 1, max: 70 },
  weight: {
    kg: { min: 30, max: 300 },
    lb: { min: 66, max: 660 },
  },
  height: {
    cm: { min: 120, max: 250 },
    ft: { min: 4, max: 8 },
  },
};

/**
 * Natural FFMI limit (normalized to 1.8m height)
 * Based on Kouri et al. (1995) research
 */
export const NATURAL_FFMI_LIMIT = 25;

/**
 * Typical FFMI values for reference
 */
export const FFMI_REFERENCE_VALUES = {
  untrainedMale: 18.5,
  trainedMale: 22,
  eliteMale: 25,
  competitiveBBMale: 27,
};
