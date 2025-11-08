'use client';

import React, { useState, useEffect } from 'react';
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
  const [mounted, setMounted] = useState(false);

  // Only render after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleUnitSystem = (): void => {
    const newSystem: UnitSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(newSystem);
  };

  // Show a placeholder during SSR/hydration to avoid mismatch
  if (!mounted) {
    return (
      <div className={`flex items-center ${className}`}>
        <span className="text-sm mr-2">Units:</span>
        <button
          className="flex items-center px-3 py-1 rounded-lg neumorph text-sm"
          aria-label="Toggle units"
          disabled
        >
          <span className="text-gray-500">Metric</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">Imperial</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-sm mr-2">Units:</span>
      <button
        onClick={toggleUnitSystem}
        className="flex items-center px-3 py-1 rounded-lg neumorph text-sm"
        aria-label={`Switch to ${unitSystem === 'metric' ? 'imperial' : 'metric'} units`}
      >
        <span className={unitSystem === 'metric' ? 'font-bold text-accent' : 'text-gray-500'}>
          Metric
        </span>
        <span className="mx-2 text-gray-400">|</span>
        <span className={unitSystem === 'imperial' ? 'font-bold text-accent' : 'text-gray-500'}>
          Imperial
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleHeightUnit = (): void => {
    setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
  };

  if (!mounted) {
    return (
      <button
        className={`px-3 py-1 rounded-lg neumorph text-sm ${className}`}
        aria-label="Toggle height unit"
        disabled
      >
        cm
      </button>
    );
  }

  return (
    <button
      onClick={toggleHeightUnit}
      className={`px-3 py-1 rounded-lg neumorph text-sm ${className}`}
      aria-label={`Switch to ${heightUnit === 'cm' ? 'feet' : 'centimeters'}`}
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleWeightUnit = (): void => {
    setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg');
  };

  if (!mounted) {
    return (
      <button
        className={`px-3 py-1 rounded-lg neumorph text-sm ${className}`}
        aria-label="Toggle weight unit"
        disabled
      >
        kg
      </button>
    );
  }

  return (
    <button
      onClick={toggleWeightUnit}
      className={`px-3 py-1 rounded-lg neumorph text-sm ${className}`}
      aria-label={`Switch to ${weightUnit === 'kg' ? 'pounds' : 'kilograms'}`}
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleEnergyUnit = (): void => {
    setEnergyUnit(energyUnit === 'kcal' ? 'kj' : 'kcal');
  };

  if (!mounted) {
    return (
      <button
        className={`px-3 py-1 rounded-lg neumorph text-sm ${className}`}
        aria-label="Toggle energy unit"
        disabled
      >
        kcal
      </button>
    );
  }

  return (
    <button
      onClick={toggleEnergyUnit}
      className={`px-3 py-1 rounded-lg neumorph text-sm ${className}`}
      aria-label={`Switch to ${energyUnit === 'kcal' ? 'kilojoules' : 'kilocalories'}`}
    >
      {energyUnit === 'kcal' ? 'kcal' : 'kj'}
    </button>
  );
}
