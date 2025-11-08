'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Define the types for our preferences
export interface UserPreferences {
  darkMode: boolean;
  unitSystem: 'metric' | 'imperial';
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  energyUnit: 'kcal' | 'kj';
  saveHistory: boolean;
  notificationsEnabled: boolean;
}

// Define the context type
interface PreferencesContextType {
  preferences: UserPreferences;
  setDarkMode: (enabled: boolean) => void;
  toggleDarkMode: () => void;
  setUnitSystem: (system: 'metric' | 'imperial') => void;
  setHeightUnit: (unit: 'cm' | 'ft') => void;
  setWeightUnit: (unit: 'kg' | 'lb') => void;
  setEnergyUnit: (unit: 'kcal' | 'kj') => void;
  setSaveHistory: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetPreferences: () => void;
  isSystemDarkMode: boolean;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  darkMode: false, // Default to light mode
  unitSystem: 'metric', // Default to metric
  heightUnit: 'cm', // Default to centimeters
  weightUnit: 'kg', // Default to kilograms
  energyUnit: 'kcal', // Default to kilocalories
  saveHistory: true, // Default to saving history
  notificationsEnabled: false, // Default to notifications off
};

// Create the context
const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

// Provider component
export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Use localStorage to persist preferences
  const [storedPreferences, setStoredPreferences] = useLocalStorage<UserPreferences>(
    'user-preferences',
    defaultPreferences
  );

  // Track system dark mode preference
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(false);

  // Initialize preferences from localStorage
  const [preferences, setPreferences] = useState<UserPreferences>(storedPreferences);

  // Update localStorage when preferences change
  useEffect(() => {
    setStoredPreferences(preferences);

    // Apply dark mode to document
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences, setStoredPreferences]);

  // Detect system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial value
    setIsSystemDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setIsSystemDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  // Preference setters
  const setDarkMode = (enabled: boolean) => {
    setPreferences(prev => ({ ...prev, darkMode: enabled }));
  };

  const toggleDarkMode = () => {
    setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setUnitSystem = (system: 'metric' | 'imperial') => {
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
  };

  const setHeightUnit = (unit: 'cm' | 'ft') => {
    setPreferences(prev => ({ ...prev, heightUnit: unit }));
  };

  const setWeightUnit = (unit: 'kg' | 'lb') => {
    setPreferences(prev => ({ ...prev, weightUnit: unit }));
  };

  const setEnergyUnit = (unit: 'kcal' | 'kj') => {
    setPreferences(prev => ({ ...prev, energyUnit: unit }));
  };

  const setSaveHistory = (enabled: boolean) => {
    setPreferences(prev => ({ ...prev, saveHistory: enabled }));
  };

  const setNotificationsEnabled = (enabled: boolean) => {
    setPreferences(prev => ({ ...prev, notificationsEnabled: enabled }));

    // Request notification permission if enabled
    if (enabled && 'Notification' in window) {
      Notification.requestPermission();
    }
  };

  // Reset to defaults
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  // Context value
  const contextValue: PreferencesContextType = {
    preferences,
    setDarkMode,
    toggleDarkMode,
    setUnitSystem,
    setHeightUnit,
    setWeightUnit,
    setEnergyUnit,
    setSaveHistory,
    setNotificationsEnabled,
    resetPreferences,
    isSystemDarkMode,
  };

  return <PreferencesContext.Provider value={contextValue}>{children}</PreferencesContext.Provider>;
}

// Custom hook to use the preferences context
export function usePreferences(): PreferencesContextType {
  const context = useContext(PreferencesContext);

  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }

  return context;
}
