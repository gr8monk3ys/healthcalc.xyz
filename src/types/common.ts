// Common types used across multiple calculators

interface _CalculationResult {
  value: number;
  unit?: string;
  category?: string;
  description?: string;
  color?: string;
  status?: 'success' | 'warning' | 'danger' | 'info';
}

interface _FormError {
  [key: string]: string;
}

interface _GaugeSegment {
  value: number;
  color: string;
  label: string;
}

export type Gender = 'male' | 'female';

export type AgeCategory = 'adult' | 'child';

export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extremely_active';

interface _ActivityFactor {
  value: number;
  label: string;
  description: string;
}

export type UnitSystem = 'metric' | 'imperial';

// Basic units used in calculators (narrow types for compatibility)
export type HeightUnit = 'cm' | 'ft';

export type WeightUnit = 'kg' | 'lb';

// Extended units for conversion utilities (broader types)
export type ConversionHeightUnit = 'cm' | 'in' | 'ft' | 'm';

export type ConversionWeightUnit = 'kg' | 'lb' | 'g' | 'oz' | 'stone';

/** Extended weight units for conversion page (alias) */
export type ExtendedWeightUnit = ConversionWeightUnit;

/** Extended height/length units for conversion page (alias) */
export type ExtendedHeightUnit = ConversionHeightUnit;

export type LengthUnit = 'cm' | 'in' | 'm' | 'ft' | 'yd' | 'mi' | 'km';

export type VolumeUnit = 'ml' | 'l' | 'floz' | 'cup' | 'pt' | 'qt' | 'gal' | 'tbsp' | 'tsp';

/** Extended volume units for conversion page */
export type ExtendedVolumeUnit = 'ml' | 'l' | 'floz' | 'cup' | 'pt' | 'qt' | 'gal' | 'tbsp' | 'tsp';

export type TemperatureUnit = 'c' | 'f';

export type EnergyUnit = 'kcal' | 'kj';

interface _MenuItem {
  name: string;
  path: string;
  description: string;
}
