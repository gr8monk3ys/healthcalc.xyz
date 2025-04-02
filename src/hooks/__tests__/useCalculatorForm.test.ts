import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculatorForm } from '../useCalculatorForm';

// Suppress logger output during tests
vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    logError: vi.fn(),
    logInfo: vi.fn(),
    logWarn: vi.fn(),
    logDebug: vi.fn(),
  }),
}));

describe('useCalculatorForm', () => {
  const makeOptions = (
    overrides: {
      calculate?: () => unknown;
      validate?: () => Record<string, string>;
    } = {}
  ) => ({
    calculate: vi.fn(() => ({ value: 42 })),
    validate: vi.fn(() => ({})),
    ...overrides,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ---------------------------------------------------------------------------
  // 1. handleSubmit clears previous errors and calculationError before re-validating
  // ---------------------------------------------------------------------------
  it('clears previous errors and calculationError before re-validating on submit', () => {
    const options = makeOptions({
      // First call returns errors; second call returns none
      validate: vi.fn().mockReturnValueOnce({ age: 'Age is required' }).mockReturnValueOnce({}),
      calculate: vi.fn(() => ({ value: 99 })),
    });

    const { result } = renderHook(() => useCalculatorForm(options));

    // First submit — produces validation errors
    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.errors).toEqual({ age: 'Age is required' });

    // Second submit — validation passes; errors and calculationError should be cleared
    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.errors).toEqual({});
    expect(result.current.calculationError).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // 2. When validate() returns errors, setErrors is called and result stays null
  // ---------------------------------------------------------------------------
  it('sets errors and keeps result null when validate() returns errors', () => {
    const options = makeOptions({
      validate: vi.fn(() => ({ height: 'Height is required', weight: 'Weight is required' })),
    });

    const { result } = renderHook(() => useCalculatorForm(options));

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.errors).toEqual({
      height: 'Height is required',
      weight: 'Weight is required',
    });
    expect(result.current.result).toBeNull();
    expect(options.calculate).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // 3. When validate() returns no errors, calculate() is called and result is set
  // ---------------------------------------------------------------------------
  it('calls calculate() and sets result when validation passes', () => {
    const mockResult = { bmi: 22.5, category: 'Normal' };
    const options = makeOptions({
      validate: vi.fn(() => ({})),
      calculate: vi.fn(() => mockResult),
    });

    const { result } = renderHook(() => useCalculatorForm(options));

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(options.calculate).toHaveBeenCalledTimes(1);
    expect(result.current.result).toEqual(mockResult);
    expect(result.current.showResult).toBe(true);
    expect(result.current.calculationError).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // 4. When calculate() throws, calculationError is set and result stays null
  // ---------------------------------------------------------------------------
  it('sets calculationError and keeps result null when calculate() throws', () => {
    const options = makeOptions({
      validate: vi.fn(() => ({})),
      calculate: vi.fn(() => {
        throw new Error('Division by zero');
      }),
    });

    const { result } = renderHook(() => useCalculatorForm(options));

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.result).toBeNull();
    expect(result.current.showResult).toBe(false);
    expect(result.current.calculationError).toBe('An error occurred. Please check your inputs.');
  });

  // ---------------------------------------------------------------------------
  // 5. handleReset clears result, errors, showResult, and calculationError
  // ---------------------------------------------------------------------------
  it('handleReset clears result, errors, showResult, and calculationError', () => {
    const options = makeOptions({
      validate: vi.fn(() => ({})),
      calculate: vi.fn(() => ({ score: 100 })),
    });

    const { result } = renderHook(() => useCalculatorForm(options));

    // Populate state by submitting successfully
    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.result).not.toBeNull();
    expect(result.current.showResult).toBe(true);

    // Now reset
    act(() => {
      result.current.handleReset();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.showResult).toBe(false);
    expect(result.current.errors).toEqual({});
    expect(result.current.calculationError).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // 6. handleReset calls the optional resetFields callback
  // ---------------------------------------------------------------------------
  it('handleReset calls the optional resetFields callback', () => {
    const options = makeOptions();
    const resetFields = vi.fn();

    const { result } = renderHook(() => useCalculatorForm(options));

    act(() => {
      result.current.handleReset(resetFields);
    });

    expect(resetFields).toHaveBeenCalledTimes(1);
  });

  it('handleReset works without a resetFields callback (no error thrown)', () => {
    const options = makeOptions();

    const { result } = renderHook(() => useCalculatorForm(options));

    expect(() => {
      act(() => {
        result.current.handleReset();
      });
    }).not.toThrow();
  });

  // ---------------------------------------------------------------------------
  // Additional: initial state is correct
  // ---------------------------------------------------------------------------
  it('starts with null result, empty errors, showResult false, no calculationError', () => {
    const { result } = renderHook(() => useCalculatorForm(makeOptions()));

    expect(result.current.result).toBeNull();
    expect(result.current.showResult).toBe(false);
    expect(result.current.errors).toEqual({});
    expect(result.current.calculationError).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // Additional: setErrors is exposed and works
  // ---------------------------------------------------------------------------
  it('exposes setErrors for inline error clearing', () => {
    const { result } = renderHook(() => useCalculatorForm(makeOptions()));

    act(() => {
      result.current.setErrors({ waist: 'Waist is required' });
    });

    expect(result.current.errors).toEqual({ waist: 'Waist is required' });

    act(() => {
      result.current.setErrors(prev => {
        const updated = { ...prev };
        delete updated.waist;
        return updated;
      });
    });

    expect(result.current.errors).toEqual({});
  });
});
