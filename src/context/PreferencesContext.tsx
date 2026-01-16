'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useLocalStorage, LocalStorageError } from '@/hooks/useLocalStorage';
import { useDarkMode, DarkModeContextType } from './DarkModeContext';
import { useUnitSystem, UnitSystemContextType } from './UnitSystemContext';

// Define the types for our preferences (kept for backward compatibility)
export interface UserPreferences {
  darkMode: boolean;
  unitSystem: 'metric' | 'imperial';
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  energyUnit: 'kcal' | 'kj';
  saveHistory: boolean;
  notificationsEnabled: boolean;
}

// Additional preferences that don't fit into DarkMode or UnitSystem contexts
interface AdditionalPreferences {
  saveHistory: boolean;
  notificationsEnabled: boolean;
}

// Define the context type (kept for backward compatibility)
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

// Default additional preferences
const defaultAdditionalPreferences: AdditionalPreferences = {
  saveHistory: true,
  notificationsEnabled: false,
};

// Create the context
const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

// Internal provider that requires DarkMode and UnitSystem contexts
function PreferencesProviderInner({ children }: { children: ReactNode }) {
  // Get dark mode context
  const darkModeContext = useDarkMode();

  // Get unit system context
  const unitSystemContext = useUnitSystem();

  // Track storage error state for user notification
  const [displayedError, setDisplayedError] = useState<LocalStorageError | null>(null);

  // Handle storage errors
  const handleStorageError = useCallback((error: LocalStorageError) => {
    setDisplayedError(error);
  }, []);

  // Use localStorage for additional preferences
  const [storedAdditionalPrefs, setStoredAdditionalPrefs, , additionalStorageError] =
    useLocalStorage<AdditionalPreferences>('additional-preferences', defaultAdditionalPreferences, {
      onError: handleStorageError,
    });

  // Initialize additional preferences from localStorage
  const [additionalPrefs, setAdditionalPrefs] =
    useState<AdditionalPreferences>(storedAdditionalPrefs);

  // Dismiss storage error notification
  const dismissStorageError = useCallback(() => {
    setDisplayedError(null);
    darkModeContext.dismissStorageError();
    unitSystemContext.dismissStorageError();
  }, [darkModeContext, unitSystemContext]);

  // Update localStorage when additional preferences change
  useEffect(() => {
    setStoredAdditionalPrefs(additionalPrefs);
  }, [additionalPrefs, setStoredAdditionalPrefs]);

  // Additional preference setters
  const setSaveHistory = useCallback((enabled: boolean) => {
    setAdditionalPrefs(prev => ({ ...prev, saveHistory: enabled }));
  }, []);

  const setNotificationsEnabled = useCallback((enabled: boolean) => {
    setAdditionalPrefs(prev => ({ ...prev, notificationsEnabled: enabled }));

    // Request notification permission if enabled
    if (enabled && typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  // Reset all preferences to defaults
  const resetPreferences = useCallback(() => {
    darkModeContext.setDarkMode(false);
    unitSystemContext.setUnitSystem('metric');
    setAdditionalPrefs(defaultAdditionalPreferences);
  }, [darkModeContext, unitSystemContext]);

  // Build the combined preferences object for backward compatibility
  const preferences: UserPreferences = {
    darkMode: darkModeContext.darkMode,
    unitSystem: unitSystemContext.unitSystem,
    heightUnit: unitSystemContext.heightUnit,
    weightUnit: unitSystemContext.weightUnit,
    energyUnit: unitSystemContext.energyUnit,
    saveHistory: additionalPrefs.saveHistory,
    notificationsEnabled: additionalPrefs.notificationsEnabled,
  };

  // Combine storage errors from all contexts
  const combinedStorageError =
    displayedError ||
    additionalStorageError ||
    darkModeContext.storageError ||
    unitSystemContext.storageError;

  // Context value
  const contextValue: PreferencesContextType = {
    preferences,
    setDarkMode: darkModeContext.setDarkMode,
    toggleDarkMode: darkModeContext.toggleDarkMode,
    setUnitSystem: unitSystemContext.setUnitSystem,
    setHeightUnit: unitSystemContext.setHeightUnit,
    setWeightUnit: unitSystemContext.setWeightUnit,
    setEnergyUnit: unitSystemContext.setEnergyUnit,
    setSaveHistory,
    setNotificationsEnabled,
    resetPreferences,
    isSystemDarkMode: darkModeContext.isSystemDarkMode,
    storageError: combinedStorageError,
    dismissStorageError,
  };

  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
      {/* Storage error notification */}
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

// Provider component that wraps everything - this maintains backward compatibility
// but no longer manages state directly (it's handled by split providers)
export function PreferencesProvider({ children }: { children: ReactNode }) {
  // Note: This provider now expects DarkModeProvider and UnitSystemProvider
  // to be in the component tree above it. However, for backward compatibility,
  // if they're not present, the inner component will throw a clear error.
  return <PreferencesProviderInner>{children}</PreferencesProviderInner>;
}

// Custom hook to use the preferences context (backward compatible)
export function usePreferences(): PreferencesContextType {
  const context = useContext(PreferencesContext);

  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }

  return context;
}

// Re-export the split context hooks for direct access
export { useDarkMode } from './DarkModeContext';
export { useUnitSystem } from './UnitSystemContext';
export type { DarkModeContextType } from './DarkModeContext';
export type { UnitSystemContextType } from './UnitSystemContext';
