import { useState, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'useCalculatorForm' });

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
