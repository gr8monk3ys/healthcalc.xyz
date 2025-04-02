import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'useCalculatorForm' });

// ---------------------------------------------------------------------------
// Simple focused hook — field state lives in the calling page
// ---------------------------------------------------------------------------

interface UseCalculatorFormOptions<TResult> {
  calculate: () => TResult;
  validate: () => Record<string, string>;
}

interface UseCalculatorFormReturn<TResult> {
  result: TResult | null;
  showResult: boolean;
  calculationError: string | null;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSubmit: (e: React.FormEvent) => void;
  handleReset: (resetFields?: () => void) => void;
}

/**
 * Lightweight hook that centralises the error/result/submission boilerplate
 * shared by every calculator page.
 *
 * Field state (age, height, weight, …) remains in the calling component.
 * The `calculate` and `validate` arguments are closures over that state.
 *
 * @example
 * const { result, showResult, calculationError, errors, setErrors,
 *         handleSubmit, handleReset } = useCalculatorForm<MyResult>({
 *   validate: () => {
 *     const errs: Record<string, string> = {}
 *     if (!age) errs.age = 'Age is required'
 *     return errs
 *   },
 *   calculate: () => myCalculator({ age, weight }),
 * })
 */
export function useCalculatorForm<TResult>(
  options: UseCalculatorFormOptions<TResult>
): UseCalculatorFormReturn<TResult> {
  const [result, setResult] = useState<TResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      const newErrors = options.validate();

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});

      try {
        const calculationResult = options.calculate();
        setResult(calculationResult);
        setShowResult(true);
      } catch (error) {
        logger.logError('Error during calculation', error);
        setCalculationError('An error occurred. Please check your inputs.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.calculate, options.validate]
  );

  const handleReset = useCallback((resetFields?: () => void) => {
    setResult(null);
    setShowResult(false);
    setErrors({});
    setCalculationError(null);
    resetFields?.();
  }, []);

  return {
    result,
    showResult,
    calculationError,
    errors,
    setErrors,
    handleSubmit,
    handleReset,
  };
}

// ---------------------------------------------------------------------------
// Full-featured hook — manages field values internally
// (kept for calculators that prefer a single-hook approach)
// ---------------------------------------------------------------------------

interface FormErrors {
  [key: string]: string | undefined;
}

interface UseCalculatorFormWithStateOptions<T, R> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  calculate: (values: T) => R;
  resultElementId?: string;
  calculatorName?: string;
}

interface UseCalculatorFormWithStateReturn<T, R> {
  values: T;
  errors: FormErrors;
  result: R | null;
  showResult: boolean;
  calculationError: string | null;
  isCalculating: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRadioChange: (name: string, value: string | number) => void;
  handleSliderChange: (name: string, value: number) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  setFieldValue: (name: keyof T, value: T[keyof T]) => void;
}

/**
 * Full-featured calculator form hook that also manages field values internally.
 *
 * Prefer `useCalculatorForm` (above) when the page already manages its own
 * field state via `useHeight`, `useWeight`, or individual `useState` calls.
 */
export function useCalculatorFormWithState<T extends Record<string, unknown>, R>({
  initialValues,
  validate,
  calculate,
  resultElementId,
  calculatorName = 'Calculator',
}: UseCalculatorFormWithStateOptions<T, R>): UseCalculatorFormWithStateReturn<T, R> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<R | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const scrollToResult = useCallback(() => {
    if (resultElementId) {
      setTimeout(() => {
        const resultElement = document.getElementById(resultElementId);
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [resultElementId]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;

      const parsedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;

      setValues(prev => ({
        ...prev,
        [name]: parsedValue,
      }));

      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }

      if (showResult) {
        setShowResult(false);
      }
    },
    [errors, showResult]
  );

  const handleRadioChange = useCallback(
    (name: string, value: string | number) => {
      setValues(prev => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }

      if (showResult) {
        setShowResult(false);
      }
    },
    [errors, showResult]
  );

  const handleSliderChange = useCallback(
    (name: string, value: number) => {
      setValues(prev => ({
        ...prev,
        [name]: value,
      }));

      if (showResult) {
        setShowResult(false);
      }
    },
    [showResult]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues(prev => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name as string]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }

      if (showResult) {
        setShowResult(false);
      }
    },
    [errors, showResult]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setCalculationError(null);

      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);

        const hasErrors = Object.values(validationErrors).some(error => error !== undefined);
        if (hasErrors) {
          return;
        }
      }

      setIsCalculating(true);

      try {
        const calculationResult = calculate(values);
        setResult(calculationResult);
        setShowResult(true);
        scrollToResult();
      } catch (error) {
        logger.logError(`Error calculating ${calculatorName}`, error);
        setCalculationError(
          'An error occurred during calculation. Please check your inputs and try again.'
        );
      } finally {
        setIsCalculating(false);
      }
    },
    [values, validate, calculate, calculatorName, scrollToResult]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
    setIsCalculating(false);
  }, [initialValues]);

  return {
    values,
    errors,
    result,
    showResult,
    calculationError,
    isCalculating,
    handleChange,
    handleRadioChange,
    handleSliderChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
    setFieldValue,
  };
}
