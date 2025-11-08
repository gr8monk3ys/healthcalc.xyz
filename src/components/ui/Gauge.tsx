import React from 'react';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  segments?: {
    value: number;
    color: string;
    label?: string;
  }[];
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  label?: string;
  className?: string;
}

export default function Gauge({
  value,
  min,
  max,
  segments = [],
  size = 'md',
  showValue = true,
  valuePrefix = '',
  valueSuffix = '',
  label,
  className = '',
}: GaugeProps) {
  // Normalize value between 0 and 1
  const normalizedValue = Math.min(Math.max((value - min) / (max - min), 0), 1);

  // Calculate the angle for the gauge needle (from -90 to 90 degrees)
  const angle = -90 + normalizedValue * 180;

  // Size classes
  const sizeClasses = {
    sm: 'w-32 h-16',
    md: 'w-48 h-24',
    lg: 'w-64 h-32',
  };

  // Font size classes
  const fontSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Value font size classes
  const valueFontSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {label && (
        <div className={`text-center font-medium mb-2 ${fontSizeClasses[size]}`}>{label}</div>
      )}

      <div className={`relative ${sizeClasses[size]}`}>
        {/* Gauge background */}
        <div className="absolute inset-0 overflow-hidden rounded-t-full bg-gray-200 neumorph-inset">
          {/* Segments */}
          {segments.map((segment, index) => {
            const segmentNormalizedValue = Math.min(
              Math.max((segment.value - min) / (max - min), 0),
              1
            );
            const segmentWidth = `${segmentNormalizedValue * 100}%`;

            return (
              <div
                key={index}
                className="absolute bottom-0 left-0 h-full"
                style={{
                  width: segmentWidth,
                  backgroundColor: segment.color,
                  opacity: 0.3,
                }}
              />
            );
          })}

          {/* Gauge needle */}
          <div
            className="absolute bottom-0 left-1/2 w-1 bg-accent origin-bottom transform -translate-x-1/2"
            style={{
              height: '95%',
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.5s ease-out',
            }}
          >
            <div className="w-3 h-3 rounded-full bg-accent absolute -left-1 -top-1.5 shadow-md" />
          </div>
        </div>

        {/* Min and max labels */}
        <div className="absolute bottom-0 left-0 text-xs text-gray-600">{min}</div>
        <div className="absolute bottom-0 right-0 text-xs text-gray-600">{max}</div>

        {/* Segment labels */}
        {segments.map((segment, index) => {
          if (!segment.label) return null;

          const segmentNormalizedValue = Math.min(
            Math.max((segment.value - min) / (max - min), 0),
            1
          );
          const leftPosition = `${segmentNormalizedValue * 100}%`;

          return (
            <div
              key={`label-${index}`}
              className="absolute bottom-5 text-xs transform -translate-x-1/2"
              style={{
                left: leftPosition,
                color: segment.color,
              }}
            >
              {segment.label}
            </div>
          );
        })}
      </div>

      {showValue && (
        <div className={`mt-4 font-bold ${valueFontSizeClasses[size]}`}>
          {valuePrefix}
          {value}
          {valueSuffix}
        </div>
      )}
    </div>
  );
}
