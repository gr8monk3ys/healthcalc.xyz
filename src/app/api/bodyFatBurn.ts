// Rule: Move calculation logic from /app/api to /utils/calculators for better organization
// This file now re-exports functions from the utils/calculators/bodyFatBurn.ts file

import { calculateBodyFatBurn } from '@/utils/calculators/bodyFatBurn';

// Re-export all functions
export { calculateBodyFatBurn };
