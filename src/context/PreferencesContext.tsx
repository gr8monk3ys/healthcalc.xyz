'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { useLocalStorage, LocalStorageError } from '@/hooks/useLocalStorage';

// Page background (identity.css --background) for <meta name="theme-color">.
const THEME_COLOR_LIGHT = '#f9f8f5';
const THEME_COLOR_DARK = '#111318';

/** Also read by the pre-paint bootstrap script in (default)/layout.tsx. */
export const DARK_MODE_STORAGE_KEY = 'dark-mode-preferences:v1';

function applyDarkModeToDocument(enabled: boolean): void {
  document.documentElement.classList.toggle('dark', enabled);
  // Keep the browser chrome color in step with the page background.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', enabled ? THEME_COLOR_DARK : THEME_COLOR_LIGHT);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object';
}

function isDarkModePreferences(value: unknown): value is DarkModePreferences {
  return isRecord(value) && typeof value.darkMode === 'boolean';
}

function isUnitSystemPreferences(value: unknown): value is UnitSystemPreferences {
  return (
    isRecord(value) &&
    (value.unitSystem === 'metric' || value.unitSystem === 'imperial') &&
    (value.heightUnit === 'cm' || value.heightUnit === 'ft') &&
    (value.weightUnit === 'kg' || value.weightUnit === 'lb') &&
    (value.energyUnit === 'kcal' || value.energyUnit === 'kj')
  );
}

function isAdditionalPreferences(value: unknown): value is AdditionalPreferences {
  return (
    isRecord(value) &&
    typeof value.saveHistory === 'boolean' &&
    typeof value.notificationsEnabled === 'boolean'
  );
}

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

  // Dark mode state. The <html class="dark"> itself is applied before first
  // paint by the bootstrap script in the root layout; after that it only
  // changes in the setters below, never in an effect.
  const [storedDarkMode, setStoredDarkMode, , darkModeStorageError] =
    useLocalStorage<DarkModePreferences>(DARK_MODE_STORAGE_KEY, defaultDarkMode, {
      onError: handleStorageError,
      legacyKeys: ['dark-mode-preferences'],
      validate: isDarkModePreferences,
    });
  const darkMode = storedDarkMode.darkMode;
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(false);

  // Unit system state
  const [storedUnits, setStoredUnits, , unitStorageError] = useLocalStorage<UnitSystemPreferences>(
    'unit-system-preferences:v1',
    defaultUnits,
    {
      onError: handleStorageError,
      legacyKeys: ['unit-system-preferences'],
      validate: isUnitSystemPreferences,
    }
  );

  // Additional preferences state
  const [storedAdditional, setStoredAdditional, , additionalStorageError] =
    useLocalStorage<AdditionalPreferences>('additional-preferences:v1', defaultAdditional, {
      onError: handleStorageError,
      legacyKeys: ['additional-preferences'],
      validate: isAdditionalPreferences,
    });

  // Dismiss all storage errors
  const dismissStorageError = useCallback(() => {
    setDisplayedError(null);
  }, []);

  // Dark mode: detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsSystemDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Setters: persist and apply in the same event, no state→effect hop.
  const setDarkMode = useCallback(
    (enabled: boolean) => {
      setStoredDarkMode({ darkMode: enabled });
      applyDarkModeToDocument(enabled);
    },
    [setStoredDarkMode]
  );
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!document.documentElement.classList.contains('dark'));
  }, [setDarkMode]);

  const setUnitSystem = useCallback(
    (system: 'metric' | 'imperial') => {
      document.documentElement.dataset.units = system;
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
    setDarkMode(false);
    document.documentElement.dataset.units = defaultUnits.unitSystem;
    setStoredUnits(defaultUnits);
    setStoredAdditional(defaultAdditional);
  }, [setDarkMode, setStoredUnits, setStoredAdditional]);

  const preferences = useMemo<UserPreferences>(
    () => ({
      darkMode,
      unitSystem: storedUnits.unitSystem,
      heightUnit: storedUnits.heightUnit,
      weightUnit: storedUnits.weightUnit,
      energyUnit: storedUnits.energyUnit,
      saveHistory: storedAdditional.saveHistory,
      notificationsEnabled: storedAdditional.notificationsEnabled,
    }),
    [darkMode, storedUnits, storedAdditional]
  );

  const combinedStorageError =
    displayedError || darkModeStorageError || unitStorageError || additionalStorageError;

  const contextValue = useMemo<PreferencesContextType>(
    () => ({
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
    }),
    [
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
      combinedStorageError,
      dismissStorageError,
    ]
  );

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
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
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
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
