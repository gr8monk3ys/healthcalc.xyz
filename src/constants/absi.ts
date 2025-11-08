import { ABSIRiskCategory } from '@/types/absi';

/**
 * ABSI risk categories based on z-score
 */
export const ABSI_RISK_CATEGORIES: ABSIRiskCategory[] = [
  {
    name: 'Very Low Risk',
    color: '#10B981', // green
    description:
      'Your ABSI is significantly below average, suggesting a lower mortality risk compared to others of your age and sex.',
    zScoreRange: { min: -100, max: -0.868 },
  },
  {
    name: 'Low Risk',
    color: '#34D399', // light green
    description:
      'Your ABSI is below average, suggesting a somewhat lower mortality risk compared to others of your age and sex.',
    zScoreRange: { min: -0.868, max: -0.272 },
  },
  {
    name: 'Average Risk',
    color: '#FBBF24', // yellow
    description:
      'Your ABSI is close to the average for your age and sex, suggesting an average mortality risk.',
    zScoreRange: { min: -0.272, max: 0.229 },
  },
  {
    name: 'High Risk',
    color: '#F97316', // orange
    description:
      'Your ABSI is above average, suggesting a somewhat higher mortality risk compared to others of your age and sex.',
    zScoreRange: { min: 0.229, max: 0.798 },
  },
  {
    name: 'Very High Risk',
    color: '#EF4444', // red
    description:
      'Your ABSI is significantly above average, suggesting a higher mortality risk compared to others of your age and sex.',
    zScoreRange: { min: 0.798 },
  },
];

/**
 * ABSI mean values by age and gender
 * Source: Krakauer & Krakauer (2012)
 */
export const ABSI_MEAN = {
  male: [
    { ageRange: [2, 19], mean: 0.0785, sd: 0.0035 }, // Approximation for children
    { ageRange: [20, 29], mean: 0.0783, sd: 0.0037 },
    { ageRange: [30, 39], mean: 0.0799, sd: 0.0038 },
    { ageRange: [40, 49], mean: 0.0812, sd: 0.0038 },
    { ageRange: [50, 59], mean: 0.0823, sd: 0.004 },
    { ageRange: [60, 69], mean: 0.0833, sd: 0.0039 },
    { ageRange: [70, 79], mean: 0.0834, sd: 0.004 },
    { ageRange: [80, 120], mean: 0.0831, sd: 0.004 },
  ],
  female: [
    { ageRange: [2, 19], mean: 0.0768, sd: 0.0038 }, // Approximation for children
    { ageRange: [20, 29], mean: 0.0764, sd: 0.0038 },
    { ageRange: [30, 39], mean: 0.0773, sd: 0.004 },
    { ageRange: [40, 49], mean: 0.0782, sd: 0.0041 },
    { ageRange: [50, 59], mean: 0.0798, sd: 0.0042 },
    { ageRange: [60, 69], mean: 0.0812, sd: 0.0042 },
    { ageRange: [70, 79], mean: 0.0815, sd: 0.0042 },
    { ageRange: [80, 120], mean: 0.0815, sd: 0.0042 },
  ],
};

/**
 * Waist-to-height ratio risk categories
 */
export const WAIST_HEIGHT_RATIO_CATEGORIES = [
  {
    name: 'Underweight',
    range: { min: 0, max: 0.42 },
    description: 'You may be underweight. Consider consulting a healthcare provider.',
  },
  {
    name: 'Healthy',
    range: { min: 0.42, max: 0.5 },
    description: 'Your waist-to-height ratio is in the healthy range.',
  },
  {
    name: 'Overweight',
    range: { min: 0.5, max: 0.57 },
    description:
      'You may be overweight. Consider lifestyle changes to reduce your waist circumference.',
  },
  {
    name: 'Obese',
    range: { min: 0.57 },
    description:
      'Your waist-to-height ratio indicates obesity. Consider consulting a healthcare provider.',
  },
];
