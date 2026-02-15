// Rule: Move calculation logic from /app/api to /utils/calculators for better organization
// This file now re-exports functions from the utils/calculators/absi.ts file

import {
  calculateABSI,
  calculateABSIZScore,
  getABSIRiskCategory,
  calculateWaistHeightRatio,
  getWaistHeightRatioCategory,
  calculateABSIMetrics,
} from '@/utils/calculators/absi';

// Re-export all functions
export {
  calculateABSI,
  calculateABSIZScore,
  getABSIRiskCategory,
  calculateWaistHeightRatio,
  getWaistHeightRatioCategory,
  calculateABSIMetrics,
};
