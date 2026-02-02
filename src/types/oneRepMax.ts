import { WeightUnit } from './common';

/**
 * One Rep Max (1RM) Calculator Types
 *
 * These types define the data structures used in the 1RM calculator,
 * which estimates the maximum weight a person can lift for one repetition
 * based on submaximal loads.
 */

/** Supported 1RM calculation formulas */
export type OneRepMaxFormula = 'epley' | 'brzycki' | 'lombardi';

/** Training zone types for strength programming */
export type TrainingZone = 'strength' | 'hypertrophy' | 'endurance';

/** Form values for the 1RM calculator */
export interface OneRepMaxFormValues {
  /** Weight lifted during the test set */
  weight: number;
  /** Weight unit (kg or lb) */
  weightUnit: WeightUnit;
  /** Number of repetitions performed */
  reps: number;
  /** Selected formula for calculation */
  formula: OneRepMaxFormula;
}

/** Result from a single 1RM formula calculation */
export interface OneRepMaxFormulaResult {
  /** The formula identifier */
  formula: OneRepMaxFormula;
  /** Display name of the formula */
  name: string;
  /** Calculated 1RM value */
  oneRepMax: number;
}

/** Training zone with percentage ranges */
export interface TrainingZoneResult {
  /** Zone identifier */
  zone: TrainingZone;
  /** Display name of the zone */
  name: string;
  /** Description of what this zone trains */
  description: string;
  /** Minimum percentage of 1RM */
  minPercentage: number;
  /** Maximum percentage of 1RM */
  maxPercentage: number;
  /** Minimum weight based on 1RM */
  minWeight: number;
  /** Maximum weight based on 1RM */
  maxWeight: number;
  /** Recommended rep range */
  repRange: string;
}

/** Complete result from 1RM calculation */
export interface OneRepMaxResult {
  /** Primary 1RM value (from selected formula) */
  oneRepMax: number;
  /** Results from all formulas */
  allFormulas: OneRepMaxFormulaResult[];
  /** Training zone recommendations based on 1RM */
  trainingZones: TrainingZoneResult[];
  /** Weight at various percentages of 1RM */
  percentageChart: PercentageChartEntry[];
  /** The formula used for the primary result */
  selectedFormula: OneRepMaxFormula;
  /** Weight unit used in calculations */
  weightUnit: WeightUnit;
}

/** Entry in the percentage chart */
export interface PercentageChartEntry {
  /** Percentage of 1RM */
  percentage: number;
  /** Weight at this percentage */
  weight: number;
  /** Approximate reps at this percentage */
  estimatedReps: string;
}

/** Formula metadata for display and selection */
export interface OneRepMaxFormulaInfo {
  /** Formula identifier */
  id: OneRepMaxFormula;
  /** Display name */
  name: string;
  /** Description of the formula */
  description: string;
  /** Accuracy notes */
  accuracy: string;
}

/** Training zone definition */
export interface TrainingZoneDefinition {
  /** Zone identifier */
  zone: TrainingZone;
  /** Display name */
  name: string;
  /** Description of what this zone targets */
  description: string;
  /** Minimum percentage of 1RM */
  minPercentage: number;
  /** Maximum percentage of 1RM */
  maxPercentage: number;
  /** Recommended rep range */
  repRange: string;
  /** Color for UI display */
  color: string;
}
