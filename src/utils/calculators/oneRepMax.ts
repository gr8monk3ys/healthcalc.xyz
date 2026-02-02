/**
 * One Rep Max (1RM) Calculator
 *
 * Estimates the maximum weight a person can lift for one repetition
 * based on submaximal loads and repetitions performed.
 *
 * Scientific References:
 * - Epley, Boyd (1985): "Poundage Chart" - Nebraska Symposium
 * - Brzycki, Matt (1993): "Strength Testing—Predicting a One-Rep Max from Reps-to-Fatigue"
 *   Journal of Physical Education, Recreation & Dance
 * - Lombardi, V.P. (1989): "Beginning Weight Training"
 * - Reynolds JM et al. (2006): "Prediction of one repetition maximum strength"
 *   Journal of Strength & Conditioning Research
 *
 * Formulas:
 * - Epley: 1RM = weight x (1 + reps/30)
 * - Brzycki: 1RM = weight x (36 / (37 - reps))
 * - Lombardi: 1RM = weight x reps^0.10
 */

import {
  OneRepMaxFormula,
  OneRepMaxFormValues,
  OneRepMaxResult,
  OneRepMaxFormulaResult,
  TrainingZoneResult,
  PercentageChartEntry,
} from '@/types/oneRepMax';
import { WeightUnit } from '@/types/common';
import {
  TRAINING_ZONES,
  PERCENTAGE_CHART_TEMPLATE,
  ONE_REP_MAX_FORMULAS,
} from '@/constants/oneRepMax';

/**
 * Calculates 1RM using the Epley formula
 *
 * Formula: 1RM = weight x (1 + reps/30)
 *
 * @param weight - Weight lifted
 * @param reps - Number of repetitions performed
 * @returns Estimated 1RM
 * @throws Error if weight or reps are invalid
 */
export function calculateEpley(weight: number, reps: number): number {
  if (weight <= 0) {
    throw new Error('Weight must be greater than 0');
  }
  if (reps <= 0) {
    throw new Error('Reps must be greater than 0');
  }
  if (reps > 30) {
    throw new Error('Reps must be 30 or less for accurate estimation');
  }

  // For 1 rep, the weight IS the 1RM
  if (reps === 1) {
    return weight;
  }

  return weight * (1 + reps / 30);
}

/**
 * Calculates 1RM using the Brzycki formula
 *
 * Formula: 1RM = weight x (36 / (37 - reps))
 *
 * Note: This formula becomes invalid when reps >= 37
 *
 * @param weight - Weight lifted
 * @param reps - Number of repetitions performed
 * @returns Estimated 1RM
 * @throws Error if weight or reps are invalid
 */
export function calculateBrzycki(weight: number, reps: number): number {
  if (weight <= 0) {
    throw new Error('Weight must be greater than 0');
  }
  if (reps <= 0) {
    throw new Error('Reps must be greater than 0');
  }
  if (reps >= 37) {
    throw new Error('Brzycki formula is invalid for 37 or more reps');
  }

  // For 1 rep, the weight IS the 1RM
  if (reps === 1) {
    return weight;
  }

  return weight * (36 / (37 - reps));
}

/**
 * Calculates 1RM using the Lombardi formula
 *
 * Formula: 1RM = weight x reps^0.10
 *
 * @param weight - Weight lifted
 * @param reps - Number of repetitions performed
 * @returns Estimated 1RM
 * @throws Error if weight or reps are invalid
 */
export function calculateLombardi(weight: number, reps: number): number {
  if (weight <= 0) {
    throw new Error('Weight must be greater than 0');
  }
  if (reps <= 0) {
    throw new Error('Reps must be greater than 0');
  }
  if (reps > 30) {
    throw new Error('Reps must be 30 or less for accurate estimation');
  }

  // For 1 rep, the weight IS the 1RM
  if (reps === 1) {
    return weight;
  }

  return weight * Math.pow(reps, 0.1);
}

/**
 * Calculates 1RM using the specified formula
 *
 * @param weight - Weight lifted
 * @param reps - Number of repetitions performed
 * @param formula - Formula to use for calculation
 * @returns Estimated 1RM
 * @throws Error if weight, reps, or formula are invalid
 */
export function calculateOneRepMax(
  weight: number,
  reps: number,
  formula: OneRepMaxFormula = 'epley'
): number {
  switch (formula) {
    case 'epley':
      return calculateEpley(weight, reps);
    case 'brzycki':
      return calculateBrzycki(weight, reps);
    case 'lombardi':
      return calculateLombardi(weight, reps);
    default:
      throw new Error(`Unknown formula: ${formula}`);
  }
}

/**
 * Calculates 1RM using all available formulas
 *
 * @param weight - Weight lifted
 * @param reps - Number of repetitions performed
 * @returns Array of results from all formulas
 */
export function calculateAllFormulas(weight: number, reps: number): OneRepMaxFormulaResult[] {
  if (weight <= 0) {
    throw new Error('Weight must be greater than 0');
  }
  if (reps <= 0) {
    throw new Error('Reps must be greater than 0');
  }

  const results: OneRepMaxFormulaResult[] = [];

  for (const formulaInfo of ONE_REP_MAX_FORMULAS) {
    try {
      const oneRepMax = calculateOneRepMax(weight, reps, formulaInfo.id);
      results.push({
        formula: formulaInfo.id,
        name: formulaInfo.name,
        oneRepMax: Math.round(oneRepMax * 10) / 10,
      });
    } catch {
      // Skip formulas that can't calculate for the given reps
      continue;
    }
  }

  return results;
}

/**
 * Calculates training zone weights based on 1RM
 *
 * @param oneRepMax - Calculated 1RM value
 * @returns Array of training zone results with weight ranges
 */
export function calculateTrainingZones(oneRepMax: number): TrainingZoneResult[] {
  if (oneRepMax <= 0) {
    throw new Error('1RM must be greater than 0');
  }

  return TRAINING_ZONES.map(zone => ({
    zone: zone.zone,
    name: zone.name,
    description: zone.description,
    minPercentage: zone.minPercentage,
    maxPercentage: zone.maxPercentage,
    minWeight: Math.round(((oneRepMax * zone.minPercentage) / 100) * 10) / 10,
    maxWeight: Math.round(((oneRepMax * zone.maxPercentage) / 100) * 10) / 10,
    repRange: zone.repRange,
  }));
}

/**
 * Generates a percentage chart for the calculated 1RM
 *
 * @param oneRepMax - Calculated 1RM value
 * @returns Array of percentage chart entries
 */
export function generatePercentageChart(oneRepMax: number): PercentageChartEntry[] {
  if (oneRepMax <= 0) {
    throw new Error('1RM must be greater than 0');
  }

  return PERCENTAGE_CHART_TEMPLATE.map(entry => ({
    percentage: entry.percentage,
    weight: Math.round(((oneRepMax * entry.percentage) / 100) * 10) / 10,
    estimatedReps: entry.estimatedReps,
  }));
}

/**
 * Estimates reps at a given percentage of 1RM using Epley formula inverted
 *
 * @param percentage - Percentage of 1RM (0-100)
 * @returns Estimated number of reps
 */
export function estimateRepsAtPercentage(percentage: number): number {
  if (percentage <= 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }

  // Inverted Epley formula: reps = 30 * (100/percentage - 1)
  const reps = 30 * (100 / percentage - 1);
  return Math.max(1, Math.round(reps));
}

/**
 * Validates weight input for 1RM calculation
 *
 * @param weight - Weight value to validate
 * @param unit - Weight unit (kg or lb)
 * @returns Validation result
 */
export function validateOneRepMaxWeight(
  weight: number | string,
  unit: WeightUnit = 'kg'
): { isValid: boolean; error?: string } {
  const numWeight = Number(weight);

  if (isNaN(numWeight)) {
    return { isValid: false, error: 'Weight must be a valid number' };
  }

  if (numWeight <= 0) {
    return { isValid: false, error: 'Weight must be greater than 0' };
  }

  const maxWeight = unit === 'kg' ? 500 : 1100;
  if (numWeight > maxWeight) {
    return { isValid: false, error: `Weight must be less than ${maxWeight}${unit}` };
  }

  return { isValid: true };
}

/**
 * Validates reps input for 1RM calculation
 *
 * @param reps - Number of repetitions to validate
 * @returns Validation result
 */
export function validateReps(reps: number | string): { isValid: boolean; error?: string } {
  const numReps = Number(reps);

  if (isNaN(numReps)) {
    return { isValid: false, error: 'Reps must be a valid number' };
  }

  if (!Number.isInteger(numReps)) {
    return { isValid: false, error: 'Reps must be a whole number' };
  }

  if (numReps <= 0) {
    return { isValid: false, error: 'Reps must be greater than 0' };
  }

  if (numReps > 30) {
    return { isValid: false, error: 'Reps must be 30 or less for accurate estimation' };
  }

  return { isValid: true };
}

/**
 * Processes the full 1RM calculation based on form values
 *
 * @param values - Form values containing weight, reps, and formula
 * @returns Complete 1RM result with training zones and percentage chart
 * @throws Error if form values are invalid
 */
export function processOneRepMaxCalculation(values: OneRepMaxFormValues): OneRepMaxResult {
  if (!values) {
    throw new Error('Form values are required');
  }

  const { weight, reps, formula, weightUnit } = values;

  // Validate inputs
  const weightValidation = validateOneRepMaxWeight(weight, weightUnit);
  if (!weightValidation.isValid) {
    throw new Error(weightValidation.error);
  }

  const repsValidation = validateReps(reps);
  if (!repsValidation.isValid) {
    throw new Error(repsValidation.error);
  }

  // Calculate 1RM with selected formula
  const oneRepMax = calculateOneRepMax(weight, reps, formula);
  const roundedOneRepMax = Math.round(oneRepMax * 10) / 10;

  // Calculate with all formulas
  const allFormulas = calculateAllFormulas(weight, reps);

  // Calculate training zones
  const trainingZones = calculateTrainingZones(roundedOneRepMax);

  // Generate percentage chart
  const percentageChart = generatePercentageChart(roundedOneRepMax);

  return {
    oneRepMax: roundedOneRepMax,
    allFormulas,
    trainingZones,
    percentageChart,
    selectedFormula: formula,
    weightUnit,
  };
}

/**
 * Calculates the average 1RM from all formulas
 *
 * @param weight - Weight lifted
 * @param reps - Number of repetitions performed
 * @returns Average 1RM across all formulas
 */
export function calculateAverageOneRepMax(weight: number, reps: number): number {
  const results = calculateAllFormulas(weight, reps);

  if (results.length === 0) {
    throw new Error('Unable to calculate 1RM with given inputs');
  }

  const sum = results.reduce((acc, result) => acc + result.oneRepMax, 0);
  return Math.round((sum / results.length) * 10) / 10;
}

/**
 * Gets the weight needed to lift at a specific percentage of 1RM
 *
 * @param oneRepMax - The calculated 1RM
 * @param percentage - Target percentage (0-100)
 * @returns Weight at the specified percentage
 */
export function getWeightAtPercentage(oneRepMax: number, percentage: number): number {
  if (oneRepMax <= 0) {
    throw new Error('1RM must be greater than 0');
  }
  if (percentage <= 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }

  return Math.round(((oneRepMax * percentage) / 100) * 10) / 10;
}
