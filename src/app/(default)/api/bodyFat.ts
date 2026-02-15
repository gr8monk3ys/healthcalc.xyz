// Rule: Move calculation logic from /app/api to /utils/calculators for better organization
// This file now re-exports functions from the utils/calculators/bodyFat.ts file

import {
  calculateNavyMethodBodyFat,
  calculateBMIMethodBodyFat,
  getBodyFatCategory,
  getHealthyBodyFatRange,
  calculateFatAndLeanMass,
  calculateBodyFat,
} from '@/utils/calculators/bodyFat';

// Re-export all functions
export {
  calculateNavyMethodBodyFat,
  calculateBMIMethodBodyFat,
  getBodyFatCategory,
  getHealthyBodyFatRange,
  calculateFatAndLeanMass,
  calculateBodyFat,
};
