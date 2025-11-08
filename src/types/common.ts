// Common types used across multiple calculators

export interface CalculationResult {
  value: number;
  unit?: string;
  category?: string;
  description?: string;
  color?: string;
  status?: 'success' | 'warning' | 'danger' | 'info';
}

export interface FormError {
  [key: string]: string;
}

export interface GaugeSegment {
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

export interface ActivityFactor {
  value: number;
  label: string;
  description: string;
}

export type UnitSystem = 'metric' | 'imperial';

export type HeightUnit = 'cm' | 'ft';

export type WeightUnit = 'kg' | 'lb';

export type LengthUnit = 'cm' | 'in' | 'm' | 'ft' | 'yd' | 'mi' | 'km';

export type VolumeUnit = 'ml' | 'l' | 'floz' | 'cup' | 'pt' | 'qt' | 'gal';

export type TemperatureUnit = 'c' | 'f';

export type EnergyUnit = 'kcal' | 'kj';

export interface MenuItem {
  name: string;
  path: string;
  description: string;
}
