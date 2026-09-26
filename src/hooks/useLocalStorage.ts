// Rule: Move localStorage logic to dedicated hooks/utilities for better separation of concerns

import { useState, useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'useLocalStorage' });

export interface LocalStorageError {
  type: 'read' | 'write' | 'remove';
  message: string;
  key: string;
}

interface UseLocalStorageOptions<T> {
  /** Called when a storage error occurs */
  onError?: (error: LocalStorageError) => void;
  /** Older key names to migrate from (read once, copied, then removed). */
  legacyKeys?: readonly string[];
  /** Shape check for parsed data; invalid data falls back to the initial value. */
  validate?: (value: unknown) => value is T;
}

/* ----------------------------------------------------------------------------
 * Module-level store: one cached parse per key (localStorage reads are
 * synchronous and not free), shared by every hook instance, and notified on
 * writes from this tab (setValue) and other tabs (storage event).
 * ------------------------------------------------------------------------- */

type CacheEntry = { raw: string | null; value: unknown; error: LocalStorageError | null };
const snapshotCache = new Map<string, CacheEntry>();
const listeners = new Map<string, Set<() => void>>();
const migratedKeys = new Set<string>();

function notify(key: string): void {
  listeners.get(key)?.forEach(listener => listener());
}

function migrateLegacyKeys(key: string, legacyKeys: readonly string[] | undefined): void {
  if (!legacyKeys?.length || migratedKeys.has(key)) return;
  migratedKeys.add(key);
  try {
    if (window.localStorage.getItem(key) !== null) return;
    for (const legacyKey of legacyKeys) {
      const legacyRaw = window.localStorage.getItem(legacyKey);
      if (legacyRaw === null) continue;
      window.localStorage.setItem(key, legacyRaw);
      window.localStorage.removeItem(legacyKey);
      return;
    }
  } catch {
    // Storage unavailable: nothing to migrate.
  }
}

function readSnapshot<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T
): CacheEntry {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(key);
  } catch (err) {
    const cached = snapshotCache.get(key);
    if (cached && cached.raw === null && cached.error) return cached;
    logger.logError(`Error reading localStorage key "${key}"`, err);
    const entry: CacheEntry = {
      raw: null,
      value: initialValue,
      error: {
        type: 'read',
        message: err instanceof Error ? err.message : 'Failed to read from localStorage',
        key,
      },
    };
    snapshotCache.set(key, entry);
    return entry;
  }

  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw && (raw !== null || cached.value === initialValue)) {
    return cached;
  }

  let value: unknown = initialValue;
  let error: LocalStorageError | null = null;
  if (raw !== null) {
    try {
      const parsed: unknown = JSON.parse(raw);
      value = !validate || validate(parsed) ? parsed : initialValue;
    } catch (err) {
      logger.logError(`Error reading localStorage key "${key}"`, err);
      error = {
        type: 'read',
        message: err instanceof Error ? err.message : 'Failed to read from localStorage',
        key,
      };
    }
  }
  const entry: CacheEntry = { raw, value, error };
  snapshotCache.set(key, entry);
  return entry;
}

/**
 * Custom hook for managing localStorage values with type safety.
 *
 * Built on useSyncExternalStore: the server render and the hydration pass use
 * `initialValue` (so prerendered HTML hydrates without a mismatch), then the
 * stored value takes over. Reads are cached per key, and every instance using
 * the same key stays in sync.
 *
 * @param key The localStorage key
 * @param initialValue The initial value if no value exists in localStorage
 * @param options Optional configuration including error callback
 * @returns [storedValue, setValue, removeValue, error]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions<T>
): [T, (value: T | ((val: T) => T)) => void, () => void, LocalStorageError | null] {
  const [error, setError] = useState<LocalStorageError | null>(null);
  // A value we could not persist (storage full or disabled) still has to show
  // up in the UI for this session.
  const [unpersisted, setUnpersisted] = useState<{ value: T } | null>(null);
  const unpersistedRef = useRef(unpersisted);
  const onErrorRef = useRef(options?.onError);
  const validateRef = useRef(options?.validate);
  const legacyKeys = options?.legacyKeys;

  useEffect(() => {
    onErrorRef.current = options?.onError;
    validateRef.current = options?.validate;
  }, [options?.onError, options?.validate]);

  const subscribe = useCallback(
    (onChange: () => void) => {
      let keyListeners = listeners.get(key);
      if (!keyListeners) {
        keyListeners = new Set();
        listeners.set(key, keyListeners);
      }
      keyListeners.add(onChange);
      const onStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) onChange();
      };
      window.addEventListener('storage', onStorage);
      return () => {
        keyListeners.delete(onChange);
        window.removeEventListener('storage', onStorage);
      };
    },
    [key]
  );

  const getSnapshot = useCallback((): unknown => {
    migrateLegacyKeys(key, legacyKeys);
    return readSnapshot(key, initialValue, validateRef.current).value;
  }, [key, initialValue, legacyKeys]);

  const getServerSnapshot = useCallback((): unknown => initialValue, [initialValue]);

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) as T;
  const value = unpersisted ? unpersisted.value : storedValue;

  // Surface read errors (disabled storage, corrupt JSON) once per key.
  useEffect(() => {
    const readError = snapshotCache.get(key)?.error ?? null;
    setError(readError);
    if (readError) onErrorRef.current?.(readError);
  }, [key]);

  const reportError = useCallback((storageError: LocalStorageError) => {
    setError(storageError);
    onErrorRef.current?.(storageError);
  }, []);

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback(
    (next: T | ((val: T) => T)): void => {
      // Functional updates start from the latest value, not the last render's,
      // so two updates in the same tick both apply.
      const current =
        unpersistedRef.current?.value ??
        (typeof window === 'undefined'
          ? initialValue
          : (readSnapshot(key, initialValue, validateRef.current).value as T));
      const valueToStore = next instanceof Function ? next(current) : next;

      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        unpersistedRef.current = null;
        setUnpersisted(null);
        setError(null);
        notify(key);
      } catch (err) {
        unpersistedRef.current = { value: valueToStore };
        setUnpersisted({ value: valueToStore });
        logger.logError(`Error setting localStorage key "${key}"`, err);
        reportError({
          type: 'write',
          message:
            err instanceof Error
              ? err.message
              : 'Failed to write to localStorage (storage may be full)',
          key,
        });
      }
    },
    [key, initialValue, reportError]
  );

  // Function to remove the item from localStorage
  const removeValue = useCallback((): void => {
    try {
      window.localStorage.removeItem(key);
      unpersistedRef.current = null;
      setUnpersisted(null);
      setError(null);
      notify(key);
    } catch (err) {
      unpersistedRef.current = { value: initialValue };
      setUnpersisted({ value: initialValue });
      logger.logError(`Error removing localStorage key "${key}"`, err);
      reportError({
        type: 'remove',
        message: err instanceof Error ? err.message : 'Failed to remove from localStorage',
        key,
      });
    }
  }, [key, initialValue, reportError]);

  return [value, setValue, removeValue, error];
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
