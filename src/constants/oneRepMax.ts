import {
  OneRepMaxFormulaInfo,
  TrainingZoneDefinition,
  PercentageChartEntry,
} from '@/types/oneRepMax';

/**
 * One Rep Max Calculator Constants
 *
 * Contains training zone percentages, formula information, and default values
 * for the 1RM calculator.
 *
 * Scientific References:
 * - Epley (1985): "Poundage Chart"
 * - Brzycki, Matt (1993): "Strength Testing—Predicting a One-Rep Max from Reps-to-Fatigue"
 * - Lombardi, V.P. (1989): "Beginning Weight Training"
 */

/**
 * Training zone definitions with percentage ranges of 1RM
 *
 * Strength: 80-90% 1RM (1-5 reps) - Maximal strength development
 * Hypertrophy: 65-75% 1RM (8-12 reps) - Muscle growth focus
 * Endurance: 50-65% 1RM (15-20+ reps) - Muscular endurance
 */
export const TRAINING_ZONES: TrainingZoneDefinition[] = [
  {
    zone: 'strength',
    name: 'Strength',
    description:
      'Maximum strength and power development. Focus on neural adaptations and force production.',
    minPercentage: 80,
    maxPercentage: 90,
    repRange: '1-5 reps',
    color: '#EF4444', // red
  },
  {
    zone: 'hypertrophy',
    name: 'Hypertrophy',
    description: 'Muscle growth and size. Optimal time under tension for muscular development.',
    minPercentage: 65,
    maxPercentage: 75,
    repRange: '8-12 reps',
    color: '#F59E0B', // amber
  },
  {
    zone: 'endurance',
    name: 'Endurance',
    description: 'Muscular endurance and conditioning. Improves work capacity and recovery.',
    minPercentage: 50,
    maxPercentage: 65,
    repRange: '15-20+ reps',
    color: '#10B981', // green
  },
];

/**
 * 1RM formula information for display and selection
 */
export const ONE_REP_MAX_FORMULAS: OneRepMaxFormulaInfo[] = [
  {
    id: 'epley',
    name: 'Epley',
    description: 'Weight x (1 + Reps/30). Most widely used formula.',
    accuracy: 'Most accurate for 1-10 reps',
  },
  {
    id: 'brzycki',
    name: 'Brzycki',
    description: 'Weight x (36 / (37 - Reps)). Linear relationship formula.',
    accuracy: 'Best for 1-12 reps',
  },
  {
    id: 'lombardi',
    name: 'Lombardi',
    description: 'Weight x Reps^0.10. Power-based formula.',
    accuracy: 'Good for higher rep ranges (10-15)',
  },
];

/**
 * Percentage chart template for 1RM calculations
 * Shows weight at various percentages with estimated rep ranges
 */
export const PERCENTAGE_CHART_TEMPLATE: Omit<PercentageChartEntry, 'weight'>[] = [
  { percentage: 100, estimatedReps: '1' },
  { percentage: 95, estimatedReps: '2' },
  { percentage: 90, estimatedReps: '3-4' },
  { percentage: 85, estimatedReps: '5-6' },
  { percentage: 80, estimatedReps: '7-8' },
  { percentage: 75, estimatedReps: '9-10' },
  { percentage: 70, estimatedReps: '11-12' },
  { percentage: 65, estimatedReps: '13-15' },
  { percentage: 60, estimatedReps: '16-18' },
  { percentage: 55, estimatedReps: '19-22' },
  { percentage: 50, estimatedReps: '23+' },
];

/**
 * Default values for the 1RM calculator
 */
export const DEFAULT_ONE_REP_MAX_VALUES = {
  weight: 100,
  weightKg: 100,
  weightLb: 225,
  reps: 5,
  formula: 'epley' as const,
};

/**
 * Validation ranges for 1RM inputs
 */
export const ONE_REP_MAX_VALIDATION = {
  weight: {
    kg: { min: 1, max: 500 },
    lb: { min: 2, max: 1100 },
  },
  reps: { min: 1, max: 30 },
};

/**
 * Color palette for the percentage chart visualization
 */
export const PERCENTAGE_CHART_COLORS = {
  high: '#EF4444', // 90-100% - red (maximal strength)
  medium: '#F59E0B', // 70-89% - amber (hypertrophy/strength)
  low: '#10B981', // below 70% - green (endurance)
};

/**
 * Get the color for a given percentage
 */
export function getPercentageColor(percentage: number): string {
  if (percentage >= 90) return PERCENTAGE_CHART_COLORS.high;
  if (percentage >= 70) return PERCENTAGE_CHART_COLORS.medium;
  return PERCENTAGE_CHART_COLORS.low;
}
