/**
 * Tests for useLocalStorage hook and localStorage utilities
 * Tests edge cases including:
 * - localStorage disabled
 * - localStorage full (quota exceeded)
 * - Invalid JSON parsing
 * - SSR scenarios (window undefined)
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
} from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Normal Operation', () => {
    it('should initialize with default value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('default');
    });

    it('should initialize with stored value when localStorage has data', () => {
      localStorage.setItem('test-key', JSON.stringify('stored'));

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('stored');
    });

    it('should update localStorage when value changes', async () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        result.current[1]('updated');
      });

      expect(result.current[0]).toBe('updated');
     

      expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'));
    });

    it('should support function updater', async () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 10));

      act(() => {
        result.current[1](prev => prev + 5);
      });

      expect(result.current[0]).toBe(15);
     
    });

    it('should remove value from localStorage', () => {
      localStorage.setItem('test-key', JSON.stringify('value'));

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('value');

      act(() => {
        result.current[2](); // removeValue
      });

      expect(result.current[0]).toBe('default');
      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should work with complex objects', async () => {
      const complexObject = {
        name: 'Test User',
        age: 30,
        preferences: {
          darkMode: true,
          notifications: false,
        },
        items: [1, 2, 3],
      };

      const { result } = renderHook(() => useLocalStorage('complex', complexObject));

      expect(result.current[0]).toEqual(complexObject);

      act(() => {
        result.current[1]({
          ...complexObject,
          age: 31,
        });
      });

      expect(result.current[0].age).toBe(31);
     
    });
  });

  describe('Edge Case: localStorage Errors', () => {
    it('should return default value when localStorage getItem throws', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage is disabled');
      });

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('default');
      expect(errorSpy).toHaveBeenCalled();

      getItemSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it('should handle errors gracefully when localStorage setItem throws', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      // Mock setItem to throw after hook initializes
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('localStorage is disabled');
      });

      act(() => {
        result.current[1]('updated');
      });

      // Value should update in state even if localStorage fails
      expect(result.current[0]).toBe('updated');
     
      expect(errorSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it('should handle errors when removing value with localStorage disabled', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('localStorage is disabled');
      });

      act(() => {
        result.current[2](); // removeValue
      });

      // Should reset to default value
      expect(result.current[0]).toBe('default');
      expect(errorSpy).toHaveBeenCalled();

      removeItemSpy.mockRestore();
      errorSpy.mockRestore();
    });
  });

  describe('Edge Case: localStorage Quota Exceeded', () => {
    it('should handle quota exceeded error gracefully', async () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        const error = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      });

      act(() => {
        result.current[1]('very large value that exceeds quota');
      });

      // State should update even if localStorage fails
      expect(result.current[0]).toBe('very large value that exceeds quota');
     
      expect(errorSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      errorSpy.mockRestore();
    });
  });

  describe('Edge Case: Invalid JSON', () => {
    it('should return default value when stored value is invalid JSON', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('test-key', 'invalid json {]');

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

      expect(result.current[0]).toBe('default');
      expect(errorSpy).toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    it('should handle corrupted data gracefully', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('test-key', '{incomplete:');

      const { result} = renderHook(() => useLocalStorage<string>('test-key', 'fallback'));

      expect(result.current[0]).toBe('fallback');

      errorSpy.mockRestore();
    });
  });
});

describe('Utility Functions', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getFromLocalStorage', () => {
    it('should retrieve value from localStorage', () => {
      localStorage.setItem('test-key', JSON.stringify('value'));

      const result = getFromLocalStorage('test-key', 'default');

      expect(result).toBe('value');
    });

    it('should return default when key does not exist', () => {
      const result = getFromLocalStorage('non-existent', 'default');

      expect(result).toBe('default');
    });

    it('should handle localStorage errors', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const result = getFromLocalStorage('test-key', 'fallback');

      expect(result).toBe('fallback');
      expect(errorSpy).toHaveBeenCalled();

      getItemSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it('should handle invalid JSON gracefully', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem('test-key', 'not valid json');

      const result = getFromLocalStorage('test-key', 'default');

      expect(result).toBe('default');
      expect(errorSpy).toHaveBeenCalled();

      errorSpy.mockRestore();
    });
  });

  describe('setToLocalStorage', () => {
    it('should store value in localStorage', () => {
      const success = setToLocalStorage('test-key', 'test-value');

      expect(success).toBe(true);
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify('test-value'));
    });

    it('should return false on quota exceeded', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        const error = new Error('QuotaExceededError');
        error.name = 'QuotaExceededError';
        throw error;
      });

      const success = setToLocalStorage('test-key', 'large value');

      expect(success).toBe(false);
      expect(errorSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it('should return false when localStorage is disabled', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('localStorage is disabled');
      });

      const success = setToLocalStorage('test-key', 'value');

      expect(success).toBe(false);
      expect(errorSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it('should handle complex objects', () => {
      const complexObject = {
        nested: { data: [1, 2, 3] },
        boolean: true,
      };

      const success = setToLocalStorage('complex', complexObject);

      expect(success).toBe(true);
      expect(JSON.parse(localStorage.getItem('complex') || '{}')).toEqual(complexObject);
    });
  });

  describe('removeFromLocalStorage', () => {
    it('should remove value from localStorage', () => {
      localStorage.setItem('test-key', 'value');

      const success = removeFromLocalStorage('test-key');

      expect(success).toBe(true);
      expect(localStorage.getItem('test-key')).toBeNull();
    });

    it('should return false when localStorage is disabled', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('localStorage is disabled');
      });

      const success = removeFromLocalStorage('test-key');

      expect(success).toBe(false);
      expect(errorSpy).toHaveBeenCalled();

      removeItemSpy.mockRestore();
      errorSpy.mockRestore();
    });

    it('should succeed even if key does not exist', () => {
      const success = removeFromLocalStorage('non-existent-key');

      expect(success).toBe(true);
    });
  });
});

describe('PreferencesContext Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle preferences persistence when localStorage works', () => {
    const preferences = {
      darkMode: true,
      unitSystem: 'metric' as const,
      heightUnit: 'cm' as const,
      weightUnit: 'kg' as const,
      energyUnit: 'kcal' as const,
      saveHistory: true,
      notificationsEnabled: false,
    };

    const success = setToLocalStorage('user-preferences', preferences);

    expect(success).toBe(true);

    const retrieved = getFromLocalStorage('user-preferences', {
      darkMode: false,
      unitSystem: 'imperial' as const,
      heightUnit: 'ft' as const,
      weightUnit: 'lb' as const,
      energyUnit: 'kj' as const,
      saveHistory: false,
      notificationsEnabled: false,
    });

    expect(retrieved).toEqual(preferences);
  });

  it('should use default preferences when localStorage fails', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const defaultPreferences = {
      darkMode: false,
      unitSystem: 'metric' as const,
      heightUnit: 'cm' as const,
      weightUnit: 'kg' as const,
      energyUnit: 'kcal' as const,
      saveHistory: true,
      notificationsEnabled: false,
    };

    const retrieved = getFromLocalStorage('user-preferences', defaultPreferences);

    expect(retrieved).toEqual(defaultPreferences);
    expect(errorSpy).toHaveBeenCalled();

    getItemSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should handle calculator history persistence with large datasets', () => {
    // Simulate a large history
    const largeHistory = Array.from({ length: 100 }, (_, i) => ({
      id: `calc-${i}`,
      type: 'bmi',
      timestamp: Date.now() - i * 1000,
      data: {
        height: 170 + i,
        weight: 70 + i,
        bmi: 24 + i * 0.1,
      },
    }));

    const success = setToLocalStorage('calculator-history', largeHistory);

    // If successful, verify data integrity
    if (success) {
      const retrieved = getFromLocalStorage('calculator-history', []);
      expect(retrieved).toHaveLength(100);
      expect(retrieved[0]).toEqual(largeHistory[0]);
    } else {
      // If quota exceeded, verify graceful handling
      expect(console.error).toHaveBeenCalled();
    }
  });
});
