'use client';

// Rule: Move localStorage logic to dedicated hooks/utilities for better separation of concerns

import { usePreferences } from '@/context/PreferencesContext';
import { HeightUnit, WeightUnit, EnergyUnit } from '@/types/common';
import { convertHeight, convertWeight, convertEnergy } from '@/utils/conversions';

/**
 * Custom hook for handling unit preferences and conversions
 * Provides functions to convert values based on user preferences
 */
export function useUnitPreferences() {
  const { preferences, setUnitSystem, setHeightUnit, setWeightUnit, setEnergyUnit } =
    usePreferences();

  /**
   * Converts a height value to the user's preferred unit
   * @param value Height value
   * @param fromUnit Unit of the input value
   * @returns Converted height value in user's preferred unit
   */
  function convertHeightToPreferred(value: number, fromUnit: HeightUnit): number {
    return convertHeight(value, fromUnit, preferences.heightUnit);
  }

  /**
   * Converts a height value from the user's preferred unit
   * @param value Height value in user's preferred unit
   * @param toUnit Target unit
   * @returns Converted height value in target unit
   */
  function convertHeightFromPreferred(value: number, toUnit: HeightUnit): number {
    return convertHeight(value, preferences.heightUnit, toUnit);
  }

  /**
   * Converts a weight value to the user's preferred unit
   * @param value Weight value
   * @param fromUnit Unit of the input value
   * @returns Converted weight value in user's preferred unit
   */
  function convertWeightToPreferred(value: number, fromUnit: WeightUnit): number {
    return convertWeight(value, fromUnit, preferences.weightUnit);
  }

  /**
   * Converts a weight value from the user's preferred unit
   * @param value Weight value in user's preferred unit
   * @param toUnit Target unit
   * @returns Converted weight value in target unit
   */
  function convertWeightFromPreferred(value: number, toUnit: WeightUnit): number {
    return convertWeight(value, preferences.weightUnit, toUnit);
  }

  /**
   * Converts an energy value to the user's preferred unit
   * @param value Energy value
   * @param fromUnit Unit of the input value
   * @returns Converted energy value in user's preferred unit
   */
  function convertEnergyToPreferred(value: number, fromUnit: EnergyUnit): number {
    return convertEnergy(value, fromUnit, preferences.energyUnit);
  }

  /**
   * Converts an energy value from the user's preferred unit
   * @param value Energy value in user's preferred unit
   * @param toUnit Target unit
   * @returns Converted energy value in target unit
   */
  function convertEnergyFromPreferred(value: number, toUnit: EnergyUnit): number {
    return convertEnergy(value, preferences.energyUnit, toUnit);
  }

  /**
   * Gets the appropriate unit label for height based on user preferences
   * @returns Height unit label
   */
  function getHeightUnitLabel(): string {
    return preferences.heightUnit === 'cm' ? 'cm' : 'ft';
  }

  /**
   * Gets the appropriate unit label for weight based on user preferences
   * @returns Weight unit label
   */
  function getWeightUnitLabel(): string {
    return preferences.weightUnit === 'kg' ? 'kg' : 'lb';
  }

  /**
   * Gets the appropriate unit label for energy based on user preferences
   * @returns Energy unit label
   */
  function getEnergyUnitLabel(): string {
    return preferences.energyUnit === 'kcal' ? 'kcal' : 'kj';
  }

  return {
    // Current preferences
    unitSystem: preferences.unitSystem,
    heightUnit: preferences.heightUnit,
    weightUnit: preferences.weightUnit,
    energyUnit: preferences.energyUnit,
    darkMode: preferences.darkMode,

    // Setters
    setUnitSystem,
    setHeightUnit,
    setWeightUnit,
    setEnergyUnit,

    // Conversion functions
    convertHeightToPreferred,
    convertHeightFromPreferred,
    convertWeightToPreferred,
    convertWeightFromPreferred,
    convertEnergyToPreferred,
    convertEnergyFromPreferred,

    // Unit labels
    getHeightUnitLabel,
    getWeightUnitLabel,
    getEnergyUnitLabel,
  };
}
