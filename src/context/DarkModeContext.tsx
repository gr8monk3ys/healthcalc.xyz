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

// Dark mode preferences stored in localStorage
interface DarkModePreferences {
  darkMode: boolean;
}

// Context type for dark mode
export interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  toggleDarkMode: () => void;
  isSystemDarkMode: boolean;
  storageError: LocalStorageError | null;
  dismissStorageError: () => void;
}

// Default dark mode preference
const defaultDarkModePreferences: DarkModePreferences = {
  darkMode: false,
};

// Create the context
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Provider component
export function DarkModeProvider({ children }: { children: ReactNode }) {
  // Track storage error state for user notification
  const [displayedError, setDisplayedError] = useState<LocalStorageError | null>(null);

  // Handle storage errors
  const handleStorageError = useCallback((error: LocalStorageError) => {
    setDisplayedError(error);
  }, []);

  // Use localStorage to persist dark mode preference
  const [storedPreferences, setStoredPreferences, , storageError] =
    useLocalStorage<DarkModePreferences>('dark-mode-preferences', defaultDarkModePreferences, {
      onError: handleStorageError,
    });

  // Track system dark mode preference
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  const [darkMode, setDarkModeState] = useState<boolean>(storedPreferences.darkMode);

  // Dismiss storage error notification
  const dismissStorageError = useCallback(() => {
    setDisplayedError(null);
  }, []);

  // Update localStorage when dark mode changes
  useEffect(() => {
    setStoredPreferences({ darkMode });

    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, setStoredPreferences]);

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

  // Dark mode setters
  const setDarkMode = useCallback((enabled: boolean) => {
    setDarkModeState(enabled);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkModeState(prev => !prev);
  }, []);

  // Context value
  const contextValue: DarkModeContextType = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
    isSystemDarkMode,
    storageError: displayedError || storageError,
    dismissStorageError,
  };

  return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
}

// Custom hook to use the dark mode context
export function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }

  return context;
}
