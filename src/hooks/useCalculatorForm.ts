import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'useCalculatorForm' });

interface FormErrors {
  [key: string]: string | undefined;
}

interface UseCalculatorFormOptions<T, R> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  calculate: (values: T) => R;
  resultElementId?: string;
  calculatorName?: string;
}

interface UseCalculatorFormReturn<T, R> {
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
 * Custom hook for managing calculator form state and logic
 * Reduces boilerplate in calculator pages by centralizing:
 * - Form values state
 * - Error state
 * - Result state
 * - Validation
 * - Calculation with error handling
 * - Scroll to result
 *
 * @example
 * const {
 *   values,
 *   errors,
 *   result,
 *   showResult,
 *   handleChange,
 *   handleSubmit,
 *   resetForm
 * } = useCalculatorForm({
 *   initialValues: { age: '', weight: '', height: '' },
 *   validate: (values) => validateBMIInputs(values),
 *   calculate: (values) => calculateBMI(values),
 *   resultElementId: 'bmi-result',
 *   calculatorName: 'BMI'
 * });
 */
export function useCalculatorForm<T extends Record<string, unknown>, R>({
  initialValues,
  validate,
  calculate,
  resultElementId,
  calculatorName = 'Calculator',
}: UseCalculatorFormOptions<T, R>): UseCalculatorFormReturn<T, R> {
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

// Also export the old API as default for backward compatibility
export default function useCalculatorFormLegacy<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const parsedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;

    setValues({
      ...values,
      [name]: parsedValue,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }

    if (isCalculated) {
      setIsCalculated(false);
    }
  };

  const handleRadioChange = (name: string, value: string | number) => {
    setValues({
      ...values,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }

    if (isCalculated) {
      setIsCalculated(false);
    }
  };

  const handleSliderChange = (name: string, value: number) => {
    setValues({
      ...values,
      [name]: value,
    });

    if (isCalculated) {
      setIsCalculated(false);
    }
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    validateForm?: (values: T) => FormErrors
  ) => {
    e.preventDefault();

    if (validateForm) {
      const validationErrors = validateForm(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    setIsCalculated(true);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsCalculated(false);
  };

  return {
    values,
    errors,
    isCalculated,
    handleChange,
    handleRadioChange,
    handleSliderChange,
    handleSubmit,
    resetForm,
    setValues,
  };
}
