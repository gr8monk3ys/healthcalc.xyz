'use client';

import React, { memo, useState } from 'react';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { EmbedCodeGenerator } from '@/components/EmbedCodeGenerator';
import { useLocale } from '@/context/LocaleContext';

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
   * onChange handler that receives the new value.
   * Compatible with React state setters like useState's setState function.
   */
  onChange: (value: NumberFieldValue) => void;
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
   * onChange handler that receives the selected option value.
   * Compatible with React state setters for string or string literal types.
   */
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
}

interface SelectFormField extends BaseFormField {
  type: 'select';
  value: string;
  /**
   * onChange handler that receives the selected option value.
   * Compatible with React state setters for string or string literal types.
   */
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
}

interface DateFormField extends BaseFormField {
  type: 'date';
  value: string;
  /**
   * onChange handler that receives the date string value.
   * Compatible with React state setters for string types.
   */
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

interface TimeFormField extends BaseFormField {
  type: 'time';
  value: string;
  /**
   * onChange handler that receives the time string value.
   * Compatible with React state setters for string types.
   */
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

// Union type for all form field types
type FormField = NumberFormField | RadioFormField | SelectFormField | DateFormField | TimeFormField;

interface CalculatorFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  submitButtonText?: string;
  resetButtonText?: string;
  /** When provided, shows a subtle "Embed this calculator" link below the form */
  calculatorSlug?: string;
}

const EMBEDDABLE_SLUGS = new Set(['bmi', 'tdee', 'body-fat', 'calorie-deficit']);

function formatTemplate(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return out;
}

const CalculatorForm: React.FC<CalculatorFormProps> = memo(function CalculatorForm({
  title,
  fields,
  onSubmit,
  onReset,
  submitButtonText,
  resetButtonText,
  calculatorSlug,
}) {
  const [showEmbed, setShowEmbed] = useState(false);
  const { t } = useLocale();
  const resolvedSubmitButtonText = submitButtonText ?? t('calculatorForm.submit');
  const resolvedResetButtonText = resetButtonText ?? t('calculatorForm.reset');
  const isEmbeddable = calculatorSlug && EMBEDDABLE_SLUGS.has(calculatorSlug);
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
                  aria-invalid={field.error ? true : undefined}
                  aria-describedby={field.error ? `${field.name}-error` : undefined}
                />
                <button
                  type="button"
                  onClick={field.unitToggle}
                  className="px-4 neumorph rounded-r-lg hover:shadow-neumorph-inset transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={formatTemplate(t('calculatorForm.unitToggleAriaTemplate'), {
                    field: field.label,
                    unit: field.unit ?? '',
                  })}
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
                aria-invalid={field.error ? true : undefined}
                aria-describedby={field.error ? `${field.name}-error` : undefined}
              />
            )}
            {field.error && (
              <p
                id={`${field.name}-error`}
                role="alert"
                aria-live="polite"
                className="text-red-500 dark:text-red-400 text-sm mt-1"
              >
                {field.error}
              </p>
            )}
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
                    name={field.name}
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
              aria-invalid={field.error ? true : undefined}
              aria-describedby={field.error ? `${field.name}-error` : undefined}
            />
            {field.error && (
              <p
                id={`${field.name}-error`}
                role="alert"
                aria-live="polite"
                className="text-red-500 dark:text-red-400 text-sm mt-1"
              >
                {field.error}
              </p>
            )}
          </div>
        );

      case 'time':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type="time"
              id={field.name}
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                field.error ? 'border border-red-500' : ''
              }`}
              min={field.min}
              max={field.max}
              aria-invalid={field.error ? true : undefined}
              aria-describedby={field.error ? `${field.name}-error` : undefined}
            />
            {field.error && (
              <p
                id={`${field.name}-error`}
                role="alert"
                aria-live="polite"
                className="text-red-500 dark:text-red-400 text-sm mt-1"
              >
                {field.error}
              </p>
            )}
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
            className="flex-1 py-3 px-4 neumorph text-accent font-medium rounded-lg hover:shadow-neumorph-inset transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {resolvedSubmitButtonText}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="py-3 px-4 neumorph text-gray-500 dark:text-gray-400 font-medium rounded-lg hover:shadow-neumorph-inset transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {resolvedResetButtonText}
          </button>
        </div>
      </form>

      <MedicalDisclaimer variant="compact" className="mt-4" />

      {isEmbeddable && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setShowEmbed(!showEmbed)}
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-accent dark:hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            aria-expanded={showEmbed}
          >
            {t('calculatorForm.embedToggle')}
          </button>
        </div>
      )}

      {showEmbed && isEmbeddable && calculatorSlug && (
        <EmbedCodeGenerator calculatorSlug={calculatorSlug} calculatorTitle={title} />
      )}
    </div>
  );
});

export default CalculatorForm;
