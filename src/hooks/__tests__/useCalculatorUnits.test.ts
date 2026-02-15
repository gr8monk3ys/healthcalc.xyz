import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import {
  useHeight,
  useWeight,
  useCalculatorUnits,
  createHeightField,
  createWeightField,
} from '../useCalculatorUnits';
import { LocaleProvider } from '@/context/LocaleContext';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(LocaleProvider, null, children);

describe('useHeight', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });

    expect(result.current.value).toBe('');
    expect(result.current.unit).toBe('cm');
    expect(result.current.placeholder).toBe('Centimeters');
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() => useHeight({ initialUnit: 'ft', initialValue: 5.5 }), {
      wrapper,
    });

    expect(result.current.value).toBe(5.5);
    expect(result.current.unit).toBe('ft');
    expect(result.current.placeholder).toBe('Feet');
  });

  it('should update value when setValue is called', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });

    act(() => {
      result.current.setValue(175);
    });

    expect(result.current.value).toBe(175);
  });

  it('should toggle from cm to ft and convert value', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });

    act(() => {
      result.current.setValue(182.88); // 6 feet in cm
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.unit).toBe('ft');
    expect(result.current.value).toBeCloseTo(6, 1);
    expect(result.current.placeholder).toBe('Feet');
  });

  it('should toggle from ft to cm and convert value', () => {
    const { result } = renderHook(() => useHeight({ initialUnit: 'ft', initialValue: 6 }), {
      wrapper,
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.unit).toBe('cm');
    expect(result.current.value).toBeCloseTo(182.9, 1);
    expect(result.current.placeholder).toBe('Centimeters');
  });

  it('should toggle unit without value when value is empty', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.unit).toBe('ft');
    expect(result.current.value).toBe('');
  });

  it('should convert to cm correctly', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });

    act(() => {
      result.current.setValue(175);
    });

    expect(result.current.toCm()).toBe(175);
  });

  it('should convert ft to cm when toCm is called', () => {
    const { result } = renderHook(() => useHeight({ initialUnit: 'ft', initialValue: 6 }), {
      wrapper,
    });

    expect(result.current.toCm()).toBeCloseTo(182.88, 2);
  });

  it('should return null from toCm when value is empty', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });

    expect(result.current.toCm()).toBeNull();
  });
});

describe('useWeight', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });

    expect(result.current.value).toBe('');
    expect(result.current.unit).toBe('kg');
    expect(result.current.placeholder).toBe('Kilograms');
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() => useWeight({ initialUnit: 'lb', initialValue: 150 }), {
      wrapper,
    });

    expect(result.current.value).toBe(150);
    expect(result.current.unit).toBe('lb');
    expect(result.current.placeholder).toBe('Pounds');
  });

  it('should update value when setValue is called', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });

    act(() => {
      result.current.setValue(70);
    });

    expect(result.current.value).toBe(70);
  });

  it('should toggle from kg to lb and convert value', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });

    act(() => {
      result.current.setValue(70);
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.unit).toBe('lb');
    expect(result.current.value).toBeCloseTo(154.3, 1);
    expect(result.current.placeholder).toBe('Pounds');
  });

  it('should toggle from lb to kg and convert value', () => {
    const { result } = renderHook(() => useWeight({ initialUnit: 'lb', initialValue: 154.324 }), {
      wrapper,
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.unit).toBe('kg');
    expect(result.current.value).toBeCloseTo(70, 1);
    expect(result.current.placeholder).toBe('Kilograms');
  });

  it('should toggle unit without value when value is empty', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.unit).toBe('lb');
    expect(result.current.value).toBe('');
  });

  it('should convert to kg correctly', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });

    act(() => {
      result.current.setValue(70);
    });

    expect(result.current.toKg()).toBe(70);
  });

  it('should convert lb to kg when toKg is called', () => {
    const { result } = renderHook(() => useWeight({ initialUnit: 'lb', initialValue: 154.324 }), {
      wrapper,
    });

    expect(result.current.toKg()).toBeCloseTo(70, 2);
  });

  it('should return null from toKg when value is empty', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });

    expect(result.current.toKg()).toBeNull();
  });
});

describe('useCalculatorUnits', () => {
  it('should provide both height and weight', () => {
    const { result } = renderHook(() => useCalculatorUnits(), { wrapper });

    expect(result.current.height).toBeDefined();
    expect(result.current.weight).toBeDefined();
    expect(result.current.height.unit).toBe('cm');
    expect(result.current.weight.unit).toBe('kg');
  });

  it('should reset both values', () => {
    const { result } = renderHook(() => useCalculatorUnits(), { wrapper });

    act(() => {
      result.current.height.setValue(175);
      result.current.weight.setValue(70);
    });

    expect(result.current.height.value).toBe(175);
    expect(result.current.weight.value).toBe(70);

    act(() => {
      result.current.reset();
    });

    expect(result.current.height.value).toBe('');
    expect(result.current.weight.value).toBe('');
  });

  it('should accept custom initial values', () => {
    const { result } = renderHook(
      () =>
        useCalculatorUnits({
          height: { initialUnit: 'ft', initialValue: 6 },
          weight: { initialUnit: 'lb', initialValue: 150 },
        }),
      { wrapper }
    );

    expect(result.current.height.unit).toBe('ft');
    expect(result.current.height.value).toBe(6);
    expect(result.current.weight.unit).toBe('lb');
    expect(result.current.weight.value).toBe(150);
  });
});

describe('createHeightField', () => {
  it('should create correct field config', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });

    act(() => {
      result.current.setValue(175);
    });

    const field = createHeightField(result.current, 'Height is required');

    expect(field.name).toBe('height');
    expect(field.label).toBe('Height');
    expect(field.type).toBe('number');
    expect(field.value).toBe(175);
    expect(field.error).toBe('Height is required');
    expect(field.placeholder).toBe('Centimeters');
    expect(field.unit).toBe('cm');
    expect(field.step).toBe('0.1');
    expect(typeof field.onChange).toBe('function');
    expect(typeof field.unitToggle).toBe('function');
  });

  it('should work without error', () => {
    const { result } = renderHook(() => useHeight(), { wrapper });
    const field = createHeightField(result.current);

    expect(field.error).toBeUndefined();
  });
});

describe('createWeightField', () => {
  it('should create correct field config', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });

    act(() => {
      result.current.setValue(70);
    });

    const field = createWeightField(result.current, 'Weight is required');

    expect(field.name).toBe('weight');
    expect(field.label).toBe('Weight');
    expect(field.type).toBe('number');
    expect(field.value).toBe(70);
    expect(field.error).toBe('Weight is required');
    expect(field.placeholder).toBe('Kilograms');
    expect(field.unit).toBe('kg');
    expect(field.step).toBe('0.1');
    expect(typeof field.onChange).toBe('function');
    expect(typeof field.unitToggle).toBe('function');
  });

  it('should work without error', () => {
    const { result } = renderHook(() => useWeight(), { wrapper });
    const field = createWeightField(result.current);

    expect(field.error).toBeUndefined();
  });
});
