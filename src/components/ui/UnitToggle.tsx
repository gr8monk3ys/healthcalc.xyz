'use client';

import React from 'react';
import { useUnitPreferences } from '@/hooks/useUnitPreferences';
import { UnitSystem } from '@/types/common';

interface UnitToggleProps {
  className?: string;
}

/**
 * Unit system toggle component
 * Allows users to switch between metric and imperial units
 */
export default function UnitToggle({ className = '' }: UnitToggleProps): React.JSX.Element {
  const { unitSystem, setUnitSystem } = useUnitPreferences();

  const toggleUnitSystem = (): void => {
    const newSystem: UnitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(newSystem);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className="mr-2 text-sm font-medium text-slate-600 dark:text-slate-300">Units:</span>
      {/* Which option is highlighted comes from <html data-units> (set before
          first paint from stored preferences), so it never flashes. */}
      <button
        type="button"
        onClick={toggleUnitSystem}
        className="elevated-pill flex items-center rounded-full px-3 py-1 text-sm hover:border-accent/40"
      >
        <span className="unit-toggle-option" data-unit="metric">
          Metric
        </span>
        <span className="mx-2 text-slate-400 dark:text-slate-500">|</span>
        <span className="unit-toggle-option" data-unit="imperial">
          Imperial
        </span>
        <span className="sr-only">
          {`, switch to ${unitSystem === 'metric' ? 'imperial' : 'metric'} units`}
        </span>
      </button>
    </div>
  );
}

/**
 * Height unit toggle component
 * Allows users to switch between cm and ft/in
 */
export function HeightUnitToggle({ className = '' }: UnitToggleProps): React.JSX.Element {
  const { heightUnit, setHeightUnit } = useUnitPreferences();

  const toggleHeightUnit = (): void => {
    setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
  };

  return (
    <button
      type="button"
      onClick={toggleHeightUnit}
      className={`elevated-pill rounded-full px-3 py-1 text-sm hover:border-accent/40 ${className}`}
      aria-label={`${heightUnit === 'cm' ? 'cm' : 'ft'}, switch to ${heightUnit === 'cm' ? 'feet' : 'centimeters'}`}
    >
      {heightUnit === 'cm' ? 'cm' : 'ft'}
    </button>
  );
}

/**
 * Weight unit toggle component
 * Allows users to switch between kg and lb
 */
export function WeightUnitToggle({ className = '' }: UnitToggleProps): React.JSX.Element {
  const { weightUnit, setWeightUnit } = useUnitPreferences();

  const toggleWeightUnit = (): void => {
    setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg');
  };

  return (
    <button
      type="button"
      onClick={toggleWeightUnit}
      className={`elevated-pill rounded-full px-3 py-1 text-sm hover:border-accent/40 ${className}`}
      aria-label={`${weightUnit === 'kg' ? 'kg' : 'lb'}, switch to ${weightUnit === 'kg' ? 'pounds' : 'kilograms'}`}
    >
      {weightUnit === 'kg' ? 'kg' : 'lb'}
    </button>
  );
}

/**
 * Energy unit toggle component
 * Allows users to switch between kcal and kj
 */
export function EnergyUnitToggle({ className = '' }: UnitToggleProps): React.JSX.Element {
  const { energyUnit, setEnergyUnit } = useUnitPreferences();

  const toggleEnergyUnit = (): void => {
    setEnergyUnit(energyUnit === 'kcal' ? 'kj' : 'kcal');
  };

  return (
    <button
      type="button"
      onClick={toggleEnergyUnit}
      className={`elevated-pill rounded-full px-3 py-1 text-sm hover:border-accent/40 ${className}`}
      aria-label={`${energyUnit === 'kcal' ? 'kcal' : 'kJ'}, switch to ${energyUnit === 'kcal' ? 'kilojoules' : 'kilocalories'}`}
    >
      {energyUnit === 'kcal' ? 'kcal' : 'kJ'}
    </button>
  );
}
