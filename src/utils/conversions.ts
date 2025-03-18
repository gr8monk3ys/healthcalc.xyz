// Rule: Move calculation logic from /app/api to /utils/calculators for better organization

import {
  ConversionHeightUnit,
  ConversionWeightUnit,
  TemperatureUnit,
  LengthUnit,
  VolumeUnit,
  EnergyUnit,
  ExtendedWeightUnit,
  ExtendedHeightUnit,
  ExtendedVolumeUnit,
} from '@/types/common';

/**
 * Utility functions for unit conversions
 */

// Height conversions
export function convertHeight(
  value: number,
  from: ConversionHeightUnit,
  to: ConversionHeightUnit
): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (value < 0) {
    throw new Error('Height value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  // Convert to cm first (base unit)
  let valueCm: number;

  switch (from) {
    case 'cm':
      valueCm = value;
      break;
    case 'in':
      valueCm = value * 2.54;
      break;
    case 'ft':
      valueCm = value * 30.48;
      break;
    case 'm':
      valueCm = value * 100;
      break;
    default:
      throw new Error(`Unsupported height unit: ${from}`);
  }

  // Convert from cm to target unit
  switch (to) {
    case 'cm':
      return valueCm;
    case 'in':
      return valueCm / 2.54;
    case 'ft':
      return valueCm / 30.48;
    case 'm':
      return valueCm / 100;
    default:
      throw new Error(`Unsupported height unit: ${to}`);
  }
}

/**
 * Converts height from feet and inches to centimeters
 */
export function heightFtInToCm(feet: number, inches: number): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (feet < 0 || inches < 0) {
    throw new Error('Height values cannot be negative');
  }

  return feet * 30.48 + inches * 2.54;
}

/**
 * Converts height from centimeters to feet and inches
 */
export function heightCmToFtIn(cm: number): { feet: number; inches: number } {
  // Rule: Implement proper error handling and validation in calculation functions
  if (cm < 0) {
    throw new Error('Height value cannot be negative');
  }

  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = parseFloat((totalInches % 12).toFixed(1));

  // Handle case where inches rounds up to 12
  if (inches >= 11.95) {
    return { feet: feet + 1, inches: 0 };
  }

  return { feet, inches };
}

// Weight conversions
export function convertWeight(
  value: number,
  from: ConversionWeightUnit,
  to: ConversionWeightUnit
): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (value < 0) {
    throw new Error('Weight value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  // Convert to kg first (base unit)
  let valueKg: number;

  switch (from) {
    case 'kg':
      valueKg = value;
      break;
    case 'lb':
      valueKg = value / 2.20462;
      break;
    case 'g':
      valueKg = value / 1000;
      break;
    case 'oz':
      valueKg = value / 35.274;
      break;
    case 'stone':
      valueKg = value * 6.35029;
      break;
    default:
      throw new Error(`Unsupported weight unit: ${from}`);
  }

  // Convert from kg to target unit
  switch (to) {
    case 'kg':
      return valueKg;
    case 'lb':
      return valueKg * 2.20462;
    case 'g':
      return valueKg * 1000;
    case 'oz':
      return valueKg * 35.274;
    case 'stone':
      return valueKg / 6.35029;
    default:
      throw new Error(`Unsupported weight unit: ${to}`);
  }
}

/**
 * Converts weight from pounds to kilograms
 */
export function weightLbToKg(lb: number): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (lb < 0) {
    throw new Error('Weight value cannot be negative');
  }

  return lb / 2.20462;
}

/**
 * Converts weight from kilograms to pounds
 */
export function weightKgToLb(kg: number): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (kg < 0) {
    throw new Error('Weight value cannot be negative');
  }

  return kg * 2.20462;
}

// Temperature conversions
export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number {
  if (from === to) {
    return value;
  }

  if (from === 'c' && to === 'f') {
    return (value * 9) / 5 + 32;
  } else if (from === 'f' && to === 'c') {
    return ((value - 32) * 5) / 9;
  }

  throw new Error(`Unsupported temperature conversion from ${from} to ${to}`);
}

// Energy conversions
export function convertEnergy(value: number, from: EnergyUnit, to: EnergyUnit): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (value < 0) {
    throw new Error('Energy value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  if (from === 'kcal' && to === 'kj') {
    return value * 4.184;
  } else if (from === 'kj' && to === 'kcal') {
    return value / 4.184;
  }

  throw new Error(`Unsupported energy conversion from ${from} to ${to}`);
}

// Length conversions
export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (value < 0) {
    throw new Error('Length value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  // Convert to cm first (base unit)
  let valueCm: number;

  switch (from) {
    case 'cm':
      valueCm = value;
      break;
    case 'in':
      valueCm = value * 2.54;
      break;
    case 'm':
      valueCm = value * 100;
      break;
    case 'ft':
      valueCm = value * 30.48;
      break;
    case 'yd':
      valueCm = value * 91.44;
      break;
    case 'mi':
      valueCm = value * 160934;
      break;
    case 'km':
      valueCm = value * 100000;
      break;
    default:
      throw new Error(`Unsupported length unit: ${from}`);
  }

  // Convert from cm to target unit
  switch (to) {
    case 'cm':
      return valueCm;
    case 'in':
      return valueCm / 2.54;
    case 'm':
      return valueCm / 100;
    case 'ft':
      return valueCm / 30.48;
    case 'yd':
      return valueCm / 91.44;
    case 'mi':
      return valueCm / 160934;
    case 'km':
      return valueCm / 100000;
    default:
      throw new Error(`Unsupported length unit: ${to}`);
  }
}

// Volume conversions
export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  // Rule: Implement proper error handling and validation in calculation functions
  if (value < 0) {
    throw new Error('Volume value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  // Convert to ml first (base unit)
  let valueMl: number;

  switch (from) {
    case 'ml':
      valueMl = value;
      break;
    case 'l':
      valueMl = value * 1000;
      break;
    case 'floz':
      valueMl = value * 29.5735;
      break;
    case 'cup':
      valueMl = value * 236.588;
      break;
    case 'tbsp':
      valueMl = value * 14.787;
      break;
    case 'tsp':
      valueMl = value * 4.929;
      break;
    case 'pt':
      valueMl = value * 473.176;
      break;
    case 'qt':
      valueMl = value * 946.353;
      break;
    case 'gal':
      valueMl = value * 3785.41;
      break;
    default:
      throw new Error(`Unsupported volume unit: ${from}`);
  }

  // Convert from ml to target unit
  switch (to) {
    case 'ml':
      return valueMl;
    case 'l':
      return valueMl / 1000;
    case 'floz':
      return valueMl / 29.5735;
    case 'cup':
      return valueMl / 236.588;
    case 'tbsp':
      return valueMl / 14.787;
    case 'tsp':
      return valueMl / 4.929;
    case 'pt':
      return valueMl / 473.176;
    case 'qt':
      return valueMl / 946.353;
    case 'gal':
      return valueMl / 3785.41;
    default:
      throw new Error(`Unsupported volume unit: ${to}`);
  }
}

/**
 * Formats a number with commas for thousands and specified decimal places
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Extended conversion functions for the conversions page

/**
 * Extended weight conversion supporting additional units (g, oz, stone)
 */
export function convertExtendedWeight(
  value: number,
  from: ExtendedWeightUnit,
  to: ExtendedWeightUnit
): number {
  if (value < 0) {
    throw new Error('Weight value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  // Convert to grams first (base unit)
  let valueGrams: number;

  switch (from) {
    case 'g':
      valueGrams = value;
      break;
    case 'kg':
      valueGrams = value * 1000;
      break;
    case 'lb':
      valueGrams = value * 453.592;
      break;
    case 'oz':
      valueGrams = value * 28.3495;
      break;
    case 'stone':
      valueGrams = value * 6350.29;
      break;
    default:
      throw new Error(`Unsupported weight unit: ${from}`);
  }

  // Convert from grams to target unit
  switch (to) {
    case 'g':
      return valueGrams;
    case 'kg':
      return valueGrams / 1000;
    case 'lb':
      return valueGrams / 453.592;
    case 'oz':
      return valueGrams / 28.3495;
    case 'stone':
      return valueGrams / 6350.29;
    default:
      throw new Error(`Unsupported weight unit: ${to}`);
  }
}

/**
 * Extended height/length conversion for the conversion page
 */
export function convertExtendedHeight(
  value: number,
  from: ExtendedHeightUnit,
  to: ExtendedHeightUnit
): number {
  if (value < 0) {
    throw new Error('Height value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  // Convert to cm first (base unit)
  let valueCm: number;

  switch (from) {
    case 'cm':
      valueCm = value;
      break;
    case 'in':
      valueCm = value * 2.54;
      break;
    case 'ft':
      valueCm = value * 30.48;
      break;
    case 'm':
      valueCm = value * 100;
      break;
    default:
      throw new Error(`Unsupported height unit: ${from}`);
  }

  // Convert from cm to target unit
  switch (to) {
    case 'cm':
      return valueCm;
    case 'in':
      return valueCm / 2.54;
    case 'ft':
      return valueCm / 30.48;
    case 'm':
      return valueCm / 100;
    default:
      throw new Error(`Unsupported height unit: ${to}`);
  }
}

/**
 * Extended volume conversion supporting additional units (tbsp, tsp)
 */
export function convertExtendedVolume(
  value: number,
  from: ExtendedVolumeUnit,
  to: ExtendedVolumeUnit
): number {
  if (value < 0) {
    throw new Error('Volume value cannot be negative');
  }

  if (from === to) {
    return value;
  }

  // Convert to ml first (base unit)
  let valueMl: number;

  switch (from) {
    case 'ml':
      valueMl = value;
      break;
    case 'l':
      valueMl = value * 1000;
      break;
    case 'floz':
      valueMl = value * 29.5735;
      break;
    case 'cup':
      valueMl = value * 236.588;
      break;
    case 'pt':
      valueMl = value * 473.176;
      break;
    case 'qt':
      valueMl = value * 946.353;
      break;
    case 'gal':
      valueMl = value * 3785.41;
      break;
    case 'tbsp':
      valueMl = value * 14.7868;
      break;
    case 'tsp':
      valueMl = value * 4.92892;
      break;
    default:
      throw new Error(`Unsupported volume unit: ${from}`);
  }

  // Convert from ml to target unit
  switch (to) {
    case 'ml':
      return valueMl;
    case 'l':
      return valueMl / 1000;
    case 'floz':
      return valueMl / 29.5735;
    case 'cup':
      return valueMl / 236.588;
    case 'pt':
      return valueMl / 473.176;
    case 'qt':
      return valueMl / 946.353;
    case 'gal':
      return valueMl / 3785.41;
    case 'tbsp':
      return valueMl / 14.7868;
    case 'tsp':
      return valueMl / 4.92892;
    default:
      throw new Error(`Unsupported volume unit: ${to}`);
  }
}
