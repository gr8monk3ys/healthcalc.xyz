'use client';

import { useState, useCallback, useMemo } from 'react';

export type ValidationRule<T> = {
  validate: (value: T, formValues?: Record<string, unknown>) => boolean;
  errorMessage: string;
};

export type FieldValidation<T> = {
  required?: boolean | { value: boolean; message: string };
  rules?: ValidationRule<T>[];
};

export type FormValidationConfig<T extends Record<string, unknown>> = {
  [K in keyof T]?: FieldValidation<T[K]>;
};

export type ValidationErrors<T extends Record<string, unknown>> = {
  [K in keyof T]?: string;
};

export type FormValidationResult<T extends Record<string, unknown>> = {
  values: T;
  errors: ValidationErrors<T>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isDirty: boolean;
  handleChange: (field: keyof T, value: T[keyof T]) => void;
  handleBlur: (field: keyof T) => void;
  validateField: (field: keyof T) => boolean;
  validateForm: () => boolean;
  setFieldValue: (field: keyof T, value: T[keyof T], shouldValidate?: boolean) => void;
  resetForm: (newValues?: Partial<T>) => void;
  setFieldError: (field: keyof T, error: string) => void;
  clearFieldError: (field: keyof T) => void;
};

/**
 * Custom hook for form validation
 * @param initialValues Initial form values
 * @param validationConfig Validation configuration for each field
 * @param validateOnChange Whether to validate on change (default: true)
 * @param validateOnBlur Whether to validate on blur (default: true)
 * @returns Form validation result
 */
export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validationConfig: FormValidationConfig<T>,
  validateOnChange: boolean = true,
  validateOnBlur: boolean = true
): FormValidationResult<T> {
  // State for form values, errors, touched fields, and dirty status
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialValues).reduce(
      (acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      },
      {} as Record<keyof T, boolean>
    )
  );
  const [isDirty, setIsDirty] = useState(false);

  /**
   * Validates a single field
   */
  const validateField = useCallback(
    (field: keyof T, fieldValue: T[keyof T] = values[field]): boolean => {
      const fieldValidation = validationConfig[field];

      // If no validation config is provided for this field, it's valid
      if (!fieldValidation) {
        return true;
      }

      // Check if field is required
      if (fieldValidation.required) {
        const isRequired =
          typeof fieldValidation.required === 'boolean'
            ? fieldValidation.required
            : fieldValidation.required.value;

        const requiredMessage =
          typeof fieldValidation.required === 'boolean'
            ? 'This field is required'
            : fieldValidation.required.message;

        if (isRequired && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
          setErrors(prev => ({ ...prev, [field]: requiredMessage }));
          return false;
        }
      }

      // Check validation rules
      if (fieldValidation.rules) {
        for (const rule of fieldValidation.rules) {
          if (!rule.validate(fieldValue, values)) {
            setErrors(prev => ({ ...prev, [field]: rule.errorMessage }));
            return false;
          }
        }
      }

      // Clear error if field is valid
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });

      return true;
    },
    [values, validationConfig]
  );

  /**
   * Validates the entire form
   */
  const validateForm = useCallback((): boolean => {
    let isValid = true;

    for (const field of Object.keys(validationConfig) as Array<keyof T>) {
      const fieldIsValid = validateField(field);
      isValid = isValid && fieldIsValid;

      // Mark all fields as touched during form validation
      setTouched(prev => ({ ...prev, [field]: true }));
    }

    return isValid;
  }, [validateField, validationConfig]);

  /**
   * Handles field change
   */
  const handleChange = useCallback(
    (field: keyof T, value: T[keyof T]): void => {
      setValues(prev => ({ ...prev, [field]: value }));
      setIsDirty(true);

      if (validateOnChange && touched[field]) {
        validateField(field, value);
      }
    },
    [touched, validateField, validateOnChange]
  );

  /**
   * Handles field blur
   */
  const handleBlur = useCallback(
    (field: keyof T): void => {
      setTouched(prev => ({ ...prev, [field]: true }));

      if (validateOnBlur) {
        validateField(field);
      }
    },
    [validateField, validateOnBlur]
  );

  /**
   * Sets a field value
   */
  const setFieldValue = useCallback(
    (field: keyof T, value: T[keyof T], shouldValidate: boolean = true): void => {
      setValues(prev => ({ ...prev, [field]: value }));
      setIsDirty(true);

      if (shouldValidate) {
        validateField(field, value);
      }
    },
    [validateField]
  );

  /**
   * Resets the form
   */
  const resetForm = useCallback(
    (newValues?: Partial<T>): void => {
      const resetValues = newValues ? { ...initialValues, ...newValues } : initialValues;
      setValues(resetValues as T);
      setErrors({});
      setTouched(
        Object.keys(initialValues).reduce(
          (acc, key) => {
            acc[key as keyof T] = false;
            return acc;
          },
          {} as Record<keyof T, boolean>
        )
      );
      setIsDirty(false);
    },
    [initialValues]
  );

  /**
   * Sets a field error
   */
  const setFieldError = useCallback((field: keyof T, error: string): void => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  /**
   * Clears a field error
   */
  const clearFieldError = useCallback((field: keyof T): void => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Compute whether the form is valid
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // Create a wrapper for validateField that guarantees a boolean return
  const validateFieldSafe = useCallback(
    (field: keyof T): boolean => {
      return validateField(field) === true;
    },
    [validateField]
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    validateField: validateFieldSafe,
    validateForm,
    setFieldValue,
    resetForm,
    setFieldError,
    clearFieldError,
  };
}

/**
 * Common validation rules
 */
export const validationRules = {
  /**
   * Validates that a value is a number
   */
  isNumber: (errorMessage: string = 'Must be a number'): ValidationRule<unknown> => ({
    validate: value => !isNaN(Number(value)),
    errorMessage,
  }),

  /**
   * Validates that a number is greater than a minimum value
   */
  min: (min: number, errorMessage?: string): ValidationRule<number> => ({
    validate: value => Number(value) >= min,
    errorMessage: errorMessage || `Must be at least ${min}`,
  }),

  /**
   * Validates that a number is less than a maximum value
   */
  max: (max: number, errorMessage?: string): ValidationRule<number> => ({
    validate: value => Number(value) <= max,
    errorMessage: errorMessage || `Must be at most ${max}`,
  }),

  /**
   * Validates that a number is between a minimum and maximum value
   */
  range: (min: number, max: number, errorMessage?: string): ValidationRule<number> => ({
    validate: value => Number(value) >= min && Number(value) <= max,
    errorMessage: errorMessage || `Must be between ${min} and ${max}`,
  }),

  /**
   * Validates that a string has a minimum length
   */
  minLength: (min: number, errorMessage?: string): ValidationRule<string> => ({
    validate: value => value.length >= min,
    errorMessage: errorMessage || `Must be at least ${min} characters`,
  }),

  /**
   * Validates that a string has a maximum length
   */
  maxLength: (max: number, errorMessage?: string): ValidationRule<string> => ({
    validate: value => value.length <= max,
    errorMessage: errorMessage || `Must be at most ${max} characters`,
  }),

  /**
   * Validates that a string matches a pattern
   */
  pattern: (pattern: RegExp, errorMessage: string): ValidationRule<string> => ({
    validate: value => pattern.test(value),
    errorMessage,
  }),

  /**
   * Validates that a string is a valid email address
   */
  email: (errorMessage: string = 'Invalid email address'): ValidationRule<string> => ({
    validate: value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
    errorMessage,
  }),

  /**
   * Validates that a value matches another field
   */
  matches: (field: string, errorMessage: string): ValidationRule<unknown> => ({
    validate: (value, formValues) => formValues !== undefined && value === formValues[field],
    errorMessage,
  }),

  /**
   * Creates a custom validation rule
   */
  custom: <T>(
    validator: (value: T, formValues?: Record<string, unknown>) => boolean,
    errorMessage: string
  ): ValidationRule<T> => ({
    validate: validator,
    errorMessage,
  }),
};
