'use client';

import React from 'react';

// Discriminated union for type-safe form fields
type NumberFieldValue = number | '';

interface BaseFormField {
  name: string;
  label: string;
  error?: string;
}

interface NumberFormField extends BaseFormField {
  type: 'number';
  placeholder?: string;
  value: NumberFieldValue;
  /**
   * onChange handler that accepts React.Dispatch<React.SetStateAction<NumberFieldValue>>
   * Uses `any` to support function bivariance needed for React state setters.
   * At call sites, full type safety is maintained with specific types.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  unit?: string;
  unitToggle?: () => void;
  min?: number;
  max?: number;
  step?: string;
}

interface RadioFormField extends BaseFormField {
  type: 'radio';
  value: string;
  /**
   * onChange handler that accepts React.Dispatch<React.SetStateAction<T>> for any string subtype T
   * (e.g., Gender, ActivityLevel, etc.). Uses `any` to support function bivariance.
   * At call sites, full type safety is maintained with specific types.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  options: Array<{ value: string; label: string; description?: string }>;
}

interface SelectFormField extends BaseFormField {
  type: 'select';
  value: string;
  /**
   * onChange handler that accepts React.Dispatch<React.SetStateAction<T>> for any string subtype T
   * (e.g., Gender, ActivityLevel, BodyFatMethod, etc.). Uses `any` to support function bivariance.
   * At call sites, full type safety is maintained with specific types.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  options: Array<{ value: string; label: string; description?: string }>;
}

interface DateFormField extends BaseFormField {
  type: 'date';
  value: string;
  /**
   * onChange handler that accepts React.Dispatch<React.SetStateAction<string>>
   * Uses `any` to support function bivariance needed for React state setters.
   * At call sites, full type safety is maintained.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  min?: string;
  max?: string;
}

// Union type for all form field types
type FormField =
  | NumberFormField
  | RadioFormField
  | SelectFormField
  | DateFormField;

interface CalculatorFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  submitButtonText?: string;
  resetButtonText?: string;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  title,
  fields,
  onSubmit,
  onReset,
  submitButtonText = 'Calculate',
  resetButtonText = 'Reset',
}) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'number':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            {field.unitToggle ? (
              <div className="flex">
                <input
                  type="number"
                  id={field.name}
                  value={field.value}
                  onChange={e =>
                    field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))
                  }
                  className={`w-full p-3 neumorph-inset rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    field.error ? 'border border-red-500' : ''
                  }`}
                  placeholder={field.placeholder}
                  step={field.step || '0.1'}
                  min={field.min}
                  max={field.max}
                />
                <button
                  type="button"
                  onClick={field.unitToggle}
                  className="px-4 neumorph rounded-r-lg hover:shadow-neumorph-inset transition-all"
                >
                  {field.unit}
                </button>
              </div>
            ) : (
              <input
                type="number"
                id={field.name}
                value={field.value}
                onChange={e =>
                  field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  field.error ? 'border border-red-500' : ''
                }`}
                placeholder={field.placeholder}
                step={field.step || '0.1'}
                min={field.min}
                max={field.max}
              />
            )}
            {field.error && <p className="text-red-500 text-sm mt-1">{field.error}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <div className="flex space-x-4">
              {field.options?.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'select':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <select
              id={field.name}
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {field.options?.find(option => option.value === field.value)?.description && (
              <p className="text-sm text-gray-500 mt-1">
                {field.options.find(option => option.value === field.value)?.description}
              </p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type="date"
              id={field.name}
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                field.error ? 'border border-red-500' : ''
              }`}
              min={field.min as string}
              max={field.max as string}
            />
            {field.error && <p className="text-red-500 text-sm mt-1">{field.error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="neumorph p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map(renderField)}

        <div className="flex space-x-4 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 px-4 neumorph text-accent font-medium rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            {submitButtonText}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="py-3 px-4 neumorph text-gray-500 font-medium rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            {resetButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
