import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

export default function Input({
  label,
  error,
  className = '',
  fullWidth = true,
  helperText,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  const baseClasses = 'neumorph-input focus:outline-none focus:ring-2 focus:ring-accent';
  const errorClasses = error ? 'border border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${errorClasses} ${widthClass} ${className}`;

  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={combinedClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
        {...props}
      />

      {helperText && (
        <p id={`${inputId}-helper`} className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
