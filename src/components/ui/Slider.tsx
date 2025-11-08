import React, { InputHTMLAttributes, useState } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  min: number;
  max: number;
  step?: number;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  helperText?: string;
}

export default function Slider({
  label,
  min,
  max,
  step = 1,
  showValue = true,
  valuePrefix = '',
  valueSuffix = '',
  className = '',
  helperText,
  id,
  value,
  onChange,
  ...props
}: SliderProps) {
  const sliderId = id || `slider-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const [internalValue, setInternalValue] = useState<number>(
    value !== undefined ? Number(value) : min
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInternalValue(newValue);

    if (onChange) {
      onChange(e);
    }
  };

  // Calculate percentage for background fill
  const percentage = ((internalValue - min) / (max - min)) * 100;

  // Custom style for the slider track fill
  const sliderStyle = {
    background: `linear-gradient(to right, var(--tw-shadow-color) ${percentage}%, var(--tw-shadow-color) ${percentage}%)`,
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        {label && (
          <label htmlFor={sliderId} className="block text-sm font-medium">
            {label}
          </label>
        )}

        {showValue && (
          <div className="text-sm font-medium">
            {valuePrefix}
            {value !== undefined ? value : internalValue}
            {valueSuffix}
          </div>
        )}
      </div>

      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        className={`neumorph-slider ${className}`}
        aria-describedby={helperText ? `${sliderId}-helper` : undefined}
        style={sliderStyle}
        {...props}
      />

      {helperText && (
        <p id={`${sliderId}-helper`} className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>
          {valuePrefix}
          {min}
          {valueSuffix}
        </span>
        <span>
          {valuePrefix}
          {max}
          {valueSuffix}
        </span>
      </div>
    </div>
  );
}
