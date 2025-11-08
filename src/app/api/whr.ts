// Rule: Move calculation logic from /app/api to /utils/calculators for better organization
// This file now re-exports functions from the utils/calculators/whr.ts file

import { calculateWHR, getWHRCategory, calculateWHRWithCategory } from '@/utils/calculators/whr';

// Re-export all functions
export { calculateWHR, getWHRCategory, calculateWHRWithCategory };
