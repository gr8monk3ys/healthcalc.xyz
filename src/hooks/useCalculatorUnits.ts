'use client';

/**
 * Custom hook for managing calculator form units with toggle functionality.
 * Centralizes height/weight state management and unit conversion logic.
 */

import { useState, useCallback, useMemo } from 'react';
import { HeightUnit, WeightUnit } from '@/types/common';
import { convertHeight, convertWeight } from '@/utils/conversions';
import { useLocale } from '@/context/LocaleContext';

type NumericValue = number | '';

interface HeightState {
  value: NumericValue;
  unit: HeightUnit;
  setValue: (value: NumericValue) => void;
  toggle: () => void;
  /** Get value converted to cm (for calculations) */
  toCm: () => number | null;
  placeholder: string;
}

interface WeightState {
  value: NumericValue;
  unit: WeightUnit;
  setValue: (value: NumericValue) => void;
  toggle: () => void;
  /** Get value converted to kg (for calculations) */
  toKg: () => number | null;
  placeholder: string;
}

interface UseHeightOptions {
  initialUnit?: HeightUnit;
  initialValue?: NumericValue;
}

interface UseWeightOptions {
  initialUnit?: WeightUnit;
  initialValue?: NumericValue;
}

/**
 * Hook for managing height input with unit toggle
 */
export function useHeight(options: UseHeightOptions = {}): HeightState {
  const { initialUnit = 'cm', initialValue = '' } = options;

  const { t } = useLocale();
  const [value, setValueRaw] = useState<NumericValue>(initialValue);
  const [unit, setUnit] = useState<HeightUnit>(initialUnit);

  const setValue = useCallback((newValue: NumericValue) => {
    setValueRaw(newValue);
  }, []);

  const toggle = useCallback(() => {
    if (unit === 'cm') {
      if (typeof value === 'number') {
        const converted = convertHeight(value, 'cm', 'ft');
        setValueRaw(parseFloat(converted.toFixed(1)));
      }
      setUnit('ft');
    } else {
      if (typeof value === 'number') {
        const converted = convertHeight(value, 'ft', 'cm');
        setValueRaw(parseFloat(converted.toFixed(1)));
      }
      setUnit('cm');
    }
  }, [value, unit]);

  const toCm = useCallback((): number | null => {
    if (typeof value !== 'number') return null;
    return unit === 'cm' ? value : convertHeight(value, 'ft', 'cm');
  }, [value, unit]);

  const placeholder = unit === 'cm' ? t('unit.height.cm') : t('unit.height.ft');

  // Stable identity until something in it changes, so consumers can list the
  // object in effect/memo deps without re-running on every render.
  return useMemo(
    () => ({ value, unit, setValue, toggle, toCm, placeholder }),
    [value, unit, setValue, toggle, toCm, placeholder]
  );
}

/**
 * Hook for managing weight input with unit toggle
 */
export function useWeight(options: UseWeightOptions = {}): WeightState {
  const { initialUnit = 'kg', initialValue = '' } = options;

  const { t } = useLocale();
  const [value, setValueRaw] = useState<NumericValue>(initialValue);
  const [unit, setUnit] = useState<WeightUnit>(initialUnit);

  const setValue = useCallback((newValue: NumericValue) => {
    setValueRaw(newValue);
  }, []);

  const toggle = useCallback(() => {
    if (unit === 'kg') {
      if (typeof value === 'number') {
        const converted = convertWeight(value, 'kg', 'lb');
        setValueRaw(parseFloat(converted.toFixed(1)));
      }
      setUnit('lb');
    } else {
      if (typeof value === 'number') {
        const converted = convertWeight(value, 'lb', 'kg');
        setValueRaw(parseFloat(converted.toFixed(1)));
      }
      setUnit('kg');
    }
  }, [value, unit]);

  const toKg = useCallback((): number | null => {
    if (typeof value !== 'number') return null;
    return unit === 'kg' ? value : convertWeight(value, 'lb', 'kg');
  }, [value, unit]);

  const placeholder = unit === 'kg' ? t('unit.weight.kg') : t('unit.weight.lb');

  return useMemo(
    () => ({ value, unit, setValue, toggle, toKg, placeholder }),
    [value, unit, setValue, toggle, toKg, placeholder]
  );
}

/**
 * Combined hook for calculators that need both height and weight
 */
export function useCalculatorUnits(
  options: {
    height?: UseHeightOptions;
    weight?: UseWeightOptions;
  } = {}
) {
  const height = useHeight(options.height);
  const weight = useWeight(options.weight);

  const { setValue: setHeightValue } = height;
  const { setValue: setWeightValue } = weight;
  const reset = useCallback(() => {
    setHeightValue('');
    setWeightValue('');
  }, [setHeightValue, setWeightValue]);

  return useMemo(() => ({ height, weight, reset }), [height, weight, reset]);
}

/**
 * Creates form field config for height input compatible with CalculatorForm
 */
export function createHeightField(heightState: HeightState, error?: string, label = 'Height') {
  return {
    name: 'height',
    label,
    labelKey: 'form.label.height' as const,
    type: 'number' as const,
    value: heightState.value,
    onChange: heightState.setValue,
    error,
    placeholder: heightState.placeholder,
    unit: heightState.unit,
    unitToggle: heightState.toggle,
    step: '0.1',
  };
}

/**
 * Creates form field config for weight input compatible with CalculatorForm
 */
export function createWeightField(weightState: WeightState, error?: string, label = 'Weight') {
  return {
    name: 'weight',
    label,
    labelKey: 'form.label.weight' as const,
    type: 'number' as const,
    value: weightState.value,
    onChange: weightState.setValue,
    error,
    placeholder: weightState.placeholder,
    unit: weightState.unit,
    unitToggle: weightState.toggle,
    step: '0.1',
  };
}
