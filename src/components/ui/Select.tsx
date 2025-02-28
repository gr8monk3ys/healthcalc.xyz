import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

export default function Select({
  label,
  options,
  error,
  className = '',
  fullWidth = true,
  helperText,
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  const baseClasses = 'neumorph-select focus:outline-none focus:ring-2 focus:ring-accent';
  const errorClasses = error ? 'border border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClasses = `${baseClasses} ${errorClasses} ${widthClass} ${className}`;
  
  return (
    <div className={`mb-4 relative ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select 
          id={selectId}
          className={combinedClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      
      {helperText && (
        <p 
          id={`${selectId}-helper`}
          className="mt-1 text-xs text-gray-500"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
