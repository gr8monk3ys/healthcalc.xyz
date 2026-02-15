// Rule: Move calculation logic from /app/api to /utils/calculators for better organization

import {
  calculateBMI,
  getBMICategory,
  getBMIPercentileCategory,
  calculateHealthyWeightRange,
  estimateBMIPercentile,
  processBMICalculation,
} from '@/utils/calculators/bmi';

// Re-export the functions from the calculator utility
export {
  calculateBMI,
  getBMICategory,
  getBMIPercentileCategory,
  calculateHealthyWeightRange,
  estimateBMIPercentile,
  processBMICalculation,
};
