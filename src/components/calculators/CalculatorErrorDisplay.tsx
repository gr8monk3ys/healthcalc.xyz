'use client';

interface CalculatorErrorDisplayProps {
  error: string | null;
  className?: string;
}

/**
 * Reusable error display component for calculator pages
 * Shows a styled error message when calculation fails
 */
export default function CalculatorErrorDisplay({
  error,
  className = '',
}: CalculatorErrorDisplayProps) {
  if (!error) {
    return null;
  }

  return (
    <div
      className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300 mt-4 ${className}`}
      role="alert"
    >
      {error}
    </div>
  );
}
