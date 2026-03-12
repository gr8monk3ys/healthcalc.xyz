import React from 'react';

interface MedicalDisclaimerProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function MedicalDisclaimer({
  variant = 'compact',
  className = '',
}: MedicalDisclaimerProps): React.JSX.Element {
  if (variant === 'compact') {
    return (
      <div
        className={`py-1 text-amber-900 dark:text-amber-200 ${className}`}
        role="note"
        aria-label="Informational only. This tool does not provide medical advice."
      >
        <p className="text-[11px] font-medium leading-4">Info only. Not medical advice.</p>
      </div>
    );
  }

  return (
    <div
      className={`neumorph rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30 p-6 ${className}`}
      role="note"
      aria-label="Medical disclaimer"
    >
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div>
          <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-2">
            Medical Disclaimer
          </h3>
          <p className="text-sm text-amber-800 dark:text-amber-300 mb-2">
            The information and tools provided on HealthCheck are for educational and informational
            purposes only. They are not intended to be a substitute for professional medical advice,
            diagnosis, or treatment.
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-300 mb-2">
            Always seek the advice of your physician or other qualified health provider with any
            questions you may have regarding a medical condition. Never disregard professional
            medical advice or delay seeking it because of something you have read or calculated on
            this website.
          </p>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Our calculators use established scientific formulas to provide estimates, but individual
            results may vary. Factors such as medical conditions, medications, and genetics can
            affect accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}
