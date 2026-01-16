'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useLocalStorage, LocalStorageError } from '@/hooks/useLocalStorage';

// Unit system preferences stored in localStorage
export interface UnitSystemPreferences {
  unitSystem: 'metric' | 'imperial';
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  energyUnit: 'kcal' | 'kj';
}

// Context type for unit system
export interface UnitSystemContextType {
  unitSystem: 'metric' | 'imperial';
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  energyUnit: 'kcal' | 'kj';
  setUnitSystem: (system: 'metric' | 'imperial') => void;
  setHeightUnit: (unit: 'cm' | 'ft') => void;
  setWeightUnit: (unit: 'kg' | 'lb') => void;
  setEnergyUnit: (unit: 'kcal' | 'kj') => void;
  storageError: LocalStorageError | null;
  dismissStorageError: () => void;
}

// Default unit system preferences
const defaultUnitSystemPreferences: UnitSystemPreferences = {
  unitSystem: 'metric',
  heightUnit: 'cm',
  weightUnit: 'kg',
  energyUnit: 'kcal',
};

// Create the context
const UnitSystemContext = createContext<UnitSystemContextType | undefined>(undefined);

// Provider component
export function UnitSystemProvider({ children }: { children: ReactNode }) {
  // Track storage error state for user notification
  const [displayedError, setDisplayedError] = useState<LocalStorageError | null>(null);

  // Handle storage errors
  const handleStorageError = useCallback((error: LocalStorageError) => {
    setDisplayedError(error);
  }, []);

  // Use localStorage to persist unit system preferences
  const [storedPreferences, setStoredPreferences, , storageError] =
    useLocalStorage<UnitSystemPreferences>(
      'unit-system-preferences',
      defaultUnitSystemPreferences,
      {
        onError: handleStorageError,
      }
    );

  // Initialize unit preferences from localStorage
  const [preferences, setPreferences] = useState<UnitSystemPreferences>(storedPreferences);

  // Dismiss storage error notification
  const dismissStorageError = useCallback(() => {
    setDisplayedError(null);
  }, []);

  // Update localStorage when preferences change
  useEffect(() => {
    setStoredPreferences(preferences);
  }, [preferences, setStoredPreferences]);

  // Unit system setters
  const setUnitSystem = useCallback((system: 'metric' | 'imperial') => {
    setPreferences(prev => {
      // Update all units based on system
      const newPrefs = { ...prev, unitSystem: system };

      if (system === 'metric') {
        newPrefs.heightUnit = 'cm';
        newPrefs.weightUnit = 'kg';
      } else {
        newPrefs.heightUnit = 'ft';
        newPrefs.weightUnit = 'lb';
      }

      return newPrefs;
    });
  }, []);

  const setHeightUnit = useCallback((unit: 'cm' | 'ft') => {
    setPreferences(prev => ({ ...prev, heightUnit: unit }));
  }, []);

  const setWeightUnit = useCallback((unit: 'kg' | 'lb') => {
    setPreferences(prev => ({ ...prev, weightUnit: unit }));
  }, []);

  const setEnergyUnit = useCallback((unit: 'kcal' | 'kj') => {
    setPreferences(prev => ({ ...prev, energyUnit: unit }));
  }, []);

  // Context value
  const contextValue: UnitSystemContextType = {
    unitSystem: preferences.unitSystem,
    heightUnit: preferences.heightUnit,
    weightUnit: preferences.weightUnit,
    energyUnit: preferences.energyUnit,
    setUnitSystem,
    setHeightUnit,
    setWeightUnit,
    setEnergyUnit,
    storageError: displayedError || storageError,
    dismissStorageError,
  };

  return <UnitSystemContext.Provider value={contextValue}>{children}</UnitSystemContext.Provider>;
}

// Custom hook to use the unit system context
export function useUnitSystem(): UnitSystemContextType {
  const context = useContext(UnitSystemContext);

  if (context === undefined) {
    throw new Error('useUnitSystem must be used within a UnitSystemProvider');
  }

  return context;
}
