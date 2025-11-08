import React, { InputHTMLAttributes } from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  options: RadioOption[];
  error?: string;
  helperText?: string;
  inline?: boolean;
}

export default function Radio({
  label,
  options,
  error,
  className = '',
  helperText,
  name,
  inline = false,
  ...props
}: RadioProps) {
  const radioGroupId = `radio-group-${name}`;

  return (
    <div className="mb-4">
      {label && <div className="block text-sm font-medium mb-2">{label}</div>}

      <div
        className={`${inline ? 'flex gap-4' : 'space-y-2'}`}
        role="radiogroup"
        aria-labelledby={label ? radioGroupId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${radioGroupId}-error` : undefined}
      >
        {options.map(option => {
          const optionId = `${name}-${option.value}`;

          return (
            <div key={option.value} className={`flex items-center ${className}`}>
              <div className="relative">
                <input
                  id={optionId}
                  type="radio"
                  name={name}
                  value={option.value}
                  className="sr-only"
                  {...props}
                />
                <div className="neumorph w-5 h-5 rounded-full cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="radio-dot w-2.5 h-2.5 rounded-full bg-accent opacity-0 transform scale-0 transition-all duration-200"></div>
                  </div>
                </div>
                {/* Custom styles applied via classes instead of styled-jsx */}
              </div>
              <label htmlFor={optionId} className="ml-2 text-sm cursor-pointer">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}

      {error && (
        <p id={`${radioGroupId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
