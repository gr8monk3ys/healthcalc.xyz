// Rule: Move calculation logic from /app/api to /utils/calculators for better organization
// This file now re-exports functions from the utils/calculators/tdee.ts file

import {
  calculateBMR,
  calculateTDEE,
  calculateWeightGoals,
  estimateWeightChange,
  getActivityMultiplier,
  processTDEECalculation,
  calculateTimeToTargetWeight,
} from '@/utils/calculators/tdee';

// Re-export all functions
export {
  calculateBMR,
  calculateTDEE,
  calculateWeightGoals,
  estimateWeightChange,
  getActivityMultiplier,
  processTDEECalculation,
  calculateTimeToTargetWeight,
};
