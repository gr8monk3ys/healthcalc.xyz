'use client';

// Rule: Move form validation logic to dedicated hooks/utilities for better separation of concerns

import { useState, useCallback, FormEvent } from 'react';

export interface ValidationRule<T> {
  validate: (value: T, formValues?: Record<string, unknown>) => boolean;
  errorMessage: string;
}

export interface FieldConfig<T> {
  initialValue: T;
  required?: boolean;
  requiredMessage?: string;
  validationRules?: ValidationRule<T>[];
}

export interface FormConfig {
  [key: string]: FieldConfig<unknown>;
}

export interface FormState<T extends FormConfig> {
  values: { [K in keyof T]: T[K]['initialValue'] };
  errors: { [K in keyof T]?: string };
  touched: { [K in keyof T]?: boolean };
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

// Rule: Use explicit return types for all functions
export function useFormWithValidation<T extends FormConfig>(config: T) {
  // Initialize form state
  const initialValues = Object.entries(config).reduce(
    (acc, [key, field]) => {
      acc[key as keyof T] = field.initialValue;
      return acc;
    },
    {} as { [K in keyof T]: T[K]['initialValue'] }
  );

  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    isDirty: false,
  });

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]['initialValue']): string | undefined => {
      const fieldConfig = config[name];

      // Check if required
      if (fieldConfig.required && (value === undefined || value === null || value === '')) {
        return fieldConfig.requiredMessage || 'This field is required';
      }

      // Skip other validations if empty and not required
      if (value === undefined || value === null || value === '') {
        return undefined;
      }

      // Check validation rules
      if (fieldConfig.validationRules) {
        for (const rule of fieldConfig.validationRules) {
          if (!rule.validate(value, formState.values)) {
            return rule.errorMessage;
          }
        }
      }

      return undefined;
    },
    [config, formState.values]
  );

  // Validate all fields
  const validateForm = useCallback((): { [K in keyof T]?: string } => {
    const newErrors: { [K in keyof T]?: string } = {};

    Object.keys(config).forEach(key => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, formState.values[fieldName]);

      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  }, [config, formState.values, validateField]);

  // Handle field change
  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]['initialValue']): void => {
      setFormState(prev => {
        // Validate the field
        const error = validateField(name, value);

        // Check if form is dirty (any value changed from initial)
        const isDirty =
          JSON.stringify(value) !== JSON.stringify(initialValues[name]) ||
          Object.keys(prev.values).some(
            key => JSON.stringify(prev.values[key]) !== JSON.stringify(initialValues[key])
          );

        return {
          ...prev,
          values: { ...prev.values, [name]: value },
          errors: { ...prev.errors, [name]: error },
          touched: { ...prev.touched, [name]: true },
          isDirty,
        };
      });
    },
    [initialValues, validateField]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (
      onSubmit: (values: { [K in keyof T]: T[K]['initialValue'] }) => void,
      onError?: (errors: { [K in keyof T]?: string }) => void
    ) => {
      return (e: FormEvent): void => {
        e.preventDefault();

        // Set all fields as touched
        const touchedFields = Object.keys(config).reduce(
          (acc, key) => {
            acc[key as keyof T] = true;
            return acc;
          },
          {} as { [K in keyof T]: boolean }
        );

        // Validate all fields
        const errors = validateForm();
        const hasErrors = Object.keys(errors).length > 0;

        setFormState(prev => ({
          ...prev,
          errors,
          touched: touchedFields,
          isSubmitting: !hasErrors,
          isValid: !hasErrors,
        }));

        if (hasErrors) {
          if (onError) onError(errors);
          return;
        }

        // Call onSubmit with form values
        onSubmit(formState.values);

        // Reset submission state
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
        }));
      };
    },
    [config, formState.values, validateForm]
  );

  // Reset form to initial values
  const resetForm = useCallback((): void => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
      isDirty: false,
    });
  }, [initialValues]);

  // Set a specific field value
  const setFieldValue = useCallback(
    (name: keyof T, value: T[keyof T]['initialValue']): void => {
      handleChange(name, value);
    },
    [handleChange]
  );

  // Set multiple field values at once
  const setValues = useCallback(
    (newValues: Partial<{ [K in keyof T]: T[K]['initialValue'] }>): void => {
      setFormState(prev => {
        const updatedValues = { ...prev.values, ...newValues };

        // Validate all updated fields
        const newErrors = { ...prev.errors };
        let isDirty = prev.isDirty;

        Object.keys(newValues).forEach(key => {
          const fieldName = key as keyof T;
          newErrors[fieldName] = validateField(fieldName, newValues[fieldName]);

          // Check if this field is dirty
          if (JSON.stringify(newValues[fieldName]) !== JSON.stringify(initialValues[fieldName])) {
            isDirty = true;
          }
        });

        return {
          ...prev,
          values: updatedValues,
          errors: newErrors,
          isDirty,
        };
      });
    },
    [initialValues, validateField]
  );

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setValues,
    validateField,
    validateForm,
  };
}

// Common validation rules
export const validationRules = {
  // Number validation
  number: {
    min: (min: number): ValidationRule<number> => ({
      validate: value => value >= min,
      errorMessage: `Value must be at least ${min}`,
    }),
    max: (max: number): ValidationRule<number> => ({
      validate: value => value <= max,
      errorMessage: `Value must be at most ${max}`,
    }),
    range: (min: number, max: number): ValidationRule<number> => ({
      validate: value => value >= min && value <= max,
      errorMessage: `Value must be between ${min} and ${max}`,
    }),
    positive: (): ValidationRule<number> => ({
      validate: value => value > 0,
      errorMessage: 'Value must be positive',
    }),
    integer: (): ValidationRule<number> => ({
      validate: value => Number.isInteger(value),
      errorMessage: 'Value must be an integer',
    }),
  },

  // String validation
  string: {
    minLength: (min: number): ValidationRule<string> => ({
      validate: value => value.length >= min,
      errorMessage: `Must be at least ${min} characters`,
    }),
    maxLength: (max: number): ValidationRule<string> => ({
      validate: value => value.length <= max,
      errorMessage: `Must be at most ${max} characters`,
    }),
    email: (): ValidationRule<string> => ({
      validate: value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
      errorMessage: 'Invalid email address',
    }),
    url: (): ValidationRule<string> => ({
      validate: value => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value),
      errorMessage: 'Invalid URL',
    }),
    matches: (pattern: RegExp): ValidationRule<string> => ({
      validate: value => pattern.test(value),
      errorMessage: 'Invalid format',
    }),
  },

  // Custom validation
  custom: <T>(
    validator: (value: T, formValues?: Record<string, unknown>) => boolean,
    errorMessage: string
  ): ValidationRule<T> => ({
    validate: validator,
    errorMessage,
  }),
};
