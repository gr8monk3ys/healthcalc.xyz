// Rule: Move localStorage logic to dedicated hooks/utilities for better separation of concerns

import { useState, useCallback, useEffect, useRef } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'useLocalStorage' });

export interface LocalStorageError {
  type: 'read' | 'write' | 'remove';
  message: string;
  key: string;
}

export interface UseLocalStorageOptions {
  /** Called when a storage error occurs */
  onError?: (error: LocalStorageError) => void;
}

/**
 * Custom hook for managing localStorage values with type safety
 * @param key The localStorage key
 * @param initialValue The initial value if no value exists in localStorage
 * @param options Optional configuration including error callback
 * @returns [storedValue, setValue, removeValue, error]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions
): [T, (value: T | ((val: T) => T)) => void, () => void, LocalStorageError | null] {
  const [error, setError] = useState<LocalStorageError | null>(null);

  // Rule: Use explicit return types for all functions
  const getStoredValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      const storageError: LocalStorageError = {
        type: 'read',
        message: err instanceof Error ? err.message : 'Failed to read from localStorage',
        key,
      };
      logger.logError(`Error reading localStorage key "${key}"`, err);
      setError(storageError);
      options?.onError?.(storageError);
      return initialValue;
    }
  }, [key, initialValue, options]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Use a ref to track current value to avoid setValue depending on storedValue
  // This prevents infinite loops when setValue is used in useEffect dependencies
  const storedValueRef = useRef<T>(storedValue);
  storedValueRef.current = storedValue;

  // Clear error when key changes
  useEffect(() => {
    setError(null);
  }, [key]);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)): void => {
      try {
        // Allow value to be a function so we have the same API as useState
        // Use ref to get current value without depending on storedValue in deps
        const valueToStore = value instanceof Function ? value(storedValueRef.current) : value;

        setStoredValue(valueToStore);
        setError(null);

        // Persist to localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (err) {
        const storageError: LocalStorageError = {
          type: 'write',
          message:
            err instanceof Error
              ? err.message
              : 'Failed to write to localStorage (storage may be full)',
          key,
        };
        logger.logError(`Error setting localStorage key "${key}"`, err);
        setError(storageError);
        options?.onError?.(storageError);
      }
    },
    [key, options]
  );

  // Function to remove the item from localStorage
  const removeValue = useCallback((): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
      setError(null);
    } catch (err) {
      const storageError: LocalStorageError = {
        type: 'remove',
        message: err instanceof Error ? err.message : 'Failed to remove from localStorage',
        key,
      };
      logger.logError(`Error removing localStorage key "${key}"`, err);
      setError(storageError);
      options?.onError?.(storageError);
    }
  }, [key, initialValue, options]);

  return [storedValue, setValue, removeValue, error];
}

/**
 * Backwards-compatible version without error state
 * @deprecated Use useLocalStorage with error handling instead
 */
export function useLocalStorageSimple<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);
  return [value, setValue, removeValue];
}

/**
 * Utility function to get a value from localStorage
 * @param key The localStorage key
 * @param defaultValue The default value if no value exists
 * @returns The stored value or defaultValue
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    logger.logError(`Error reading localStorage key "${key}"`, error);
    return defaultValue;
  }
}

/**
 * Utility function to set a value in localStorage
 * @param key The localStorage key
 * @param value The value to store
 * @returns true if successful, false otherwise
 */
export function setToLocalStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    logger.logError(`Error writing to localStorage key "${key}"`, error);
    return false;
  }
}

/**
 * Utility function to remove a value from localStorage
 * @param key The localStorage key
 * @returns true if successful, false otherwise
 */
export function removeFromLocalStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    logger.logError(`Error removing localStorage key "${key}"`, error);
    return false;
  }
}
