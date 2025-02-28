'use client';

import React from 'react';
import { Gender, HeightUnit, WeightUnit } from '@/types/common';

interface FormField {
  name: string;
  label: string;
  type: 'number' | 'radio' | 'select';
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  options?: Array<{ value: string; label: string; description?: string }>;
  unit?: string;
  unitToggle?: () => void;
  min?: number;
  max?: number;
  step?: string;
}

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
                  onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className={`w-full p-3 neumorph-inset rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    field.error ? 'border border-red-500' : ''
                  }`}
                  placeholder={field.placeholder}
                  step={field.step || "0.1"}
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
                onChange={(e) => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                  field.error ? 'border border-red-500' : ''
                }`}
                placeholder={field.placeholder}
                step={field.step || "0.1"}
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
              {field.options?.map((option) => (
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
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {field.options?.map((option) => (
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
