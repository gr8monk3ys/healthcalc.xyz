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

// Define the types for our preferences
interface UserPreferences {
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
  /** Storage error if preferences couldn't be saved */
  storageError: LocalStorageError | null;
  /** Dismiss the storage error notification */
  dismissStorageError: () => void;
}

// localStorage shapes (same keys as before for backward compat)
interface DarkModePreferences {
  darkMode: boolean;
}
interface UnitSystemPreferences {
  unitSystem: 'metric' | 'imperial';
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  energyUnit: 'kcal' | 'kj';
}
interface AdditionalPreferences {
  saveHistory: boolean;
  notificationsEnabled: boolean;
}

const defaultDarkMode: DarkModePreferences = { darkMode: false };
const defaultUnits: UnitSystemPreferences = {
  unitSystem: 'metric',
  heightUnit: 'cm',
  weightUnit: 'kg',
  energyUnit: 'kcal',
};
const defaultAdditional: AdditionalPreferences = {
  saveHistory: true,
  notificationsEnabled: false,
};

// Create the context
const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

// Unified provider that manages dark mode, unit system, and additional preferences
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [displayedError, setDisplayedError] = useState<LocalStorageError | null>(null);
  const handleStorageError = useCallback((error: LocalStorageError) => {
    setDisplayedError(error);
  }, []);

  // Dark mode state
  const [storedDarkMode, setStoredDarkMode, , darkModeStorageError] =
    useLocalStorage<DarkModePreferences>('dark-mode-preferences', defaultDarkMode, {
      onError: handleStorageError,
    });
  const [darkMode, setDarkModeState] = useState<boolean>(storedDarkMode.darkMode);
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(false);

  // Unit system state
  const [storedUnits, setStoredUnits, , unitStorageError] = useLocalStorage<UnitSystemPreferences>(
    'unit-system-preferences',
    defaultUnits,
    {
      onError: handleStorageError,
    }
  );

  // Additional preferences state
  const [storedAdditional, setStoredAdditional, , additionalStorageError] =
    useLocalStorage<AdditionalPreferences>('additional-preferences', defaultAdditional, {
      onError: handleStorageError,
    });

  // Dismiss all storage errors
  const dismissStorageError = useCallback(() => {
    setDisplayedError(null);
  }, []);

  // Dark mode: sync to localStorage + DOM
  useEffect(() => {
    setStoredDarkMode({ darkMode });
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, setStoredDarkMode]);

  // Dark mode: detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsSystemDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Setters
  const setDarkMode = useCallback((enabled: boolean) => setDarkModeState(enabled), []);
  const toggleDarkMode = useCallback(() => setDarkModeState(prev => !prev), []);

  const setUnitSystem = useCallback(
    (system: 'metric' | 'imperial') => {
      setStoredUnits(prev => ({
        ...prev,
        unitSystem: system,
        heightUnit: system === 'metric' ? 'cm' : 'ft',
        weightUnit: system === 'metric' ? 'kg' : 'lb',
      }));
    },
    [setStoredUnits]
  );

  const setHeightUnit = useCallback(
    (unit: 'cm' | 'ft') => {
      setStoredUnits(prev => ({ ...prev, heightUnit: unit }));
    },
    [setStoredUnits]
  );

  const setWeightUnit = useCallback(
    (unit: 'kg' | 'lb') => {
      setStoredUnits(prev => ({ ...prev, weightUnit: unit }));
    },
    [setStoredUnits]
  );

  const setEnergyUnit = useCallback(
    (unit: 'kcal' | 'kj') => {
      setStoredUnits(prev => ({ ...prev, energyUnit: unit }));
    },
    [setStoredUnits]
  );

  const setSaveHistory = useCallback(
    (enabled: boolean) => {
      setStoredAdditional(prev => ({ ...prev, saveHistory: enabled }));
    },
    [setStoredAdditional]
  );

  const setNotificationsEnabled = useCallback(
    (enabled: boolean) => {
      setStoredAdditional(prev => ({ ...prev, notificationsEnabled: enabled }));
      if (enabled && typeof window !== 'undefined' && 'Notification' in window) {
        Notification.requestPermission();
      }
    },
    [setStoredAdditional]
  );

  const resetPreferences = useCallback(() => {
    setDarkModeState(false);
    setStoredUnits(defaultUnits);
    setStoredAdditional(defaultAdditional);
  }, [setStoredUnits, setStoredAdditional]);

  const preferences: UserPreferences = {
    darkMode,
    unitSystem: storedUnits.unitSystem,
    heightUnit: storedUnits.heightUnit,
    weightUnit: storedUnits.weightUnit,
    energyUnit: storedUnits.energyUnit,
    saveHistory: storedAdditional.saveHistory,
    notificationsEnabled: storedAdditional.notificationsEnabled,
  };

  const combinedStorageError =
    displayedError || darkModeStorageError || unitStorageError || additionalStorageError;

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
    storageError: combinedStorageError,
    dismissStorageError,
  };

  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
      {combinedStorageError && (
        <div
          className="fixed bottom-4 right-4 max-w-sm bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 shadow-lg z-50"
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Preferences Not Saved
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                {combinedStorageError.message}. Your preferences will reset when you leave.
              </p>
            </div>
            <button
              type="button"
              onClick={dismissStorageError}
              className="ml-auto -mx-1.5 -my-1.5 bg-yellow-50 dark:bg-yellow-900 text-yellow-500 rounded-lg p-1.5 hover:bg-yellow-100 dark:hover:bg-yellow-800 inline-flex h-8 w-8"
              aria-label="Dismiss notification"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </PreferencesContext.Provider>
  );
}

// Custom hook to use the preferences context
export function usePreferences(): PreferencesContextType {
  const context = useContext(PreferencesContext);

  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }

  return context;
}
