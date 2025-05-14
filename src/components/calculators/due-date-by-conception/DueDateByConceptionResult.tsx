import React from 'react';
import type { DueDateByConceptionResult } from '@/types/dueDateByConception';

interface DueDateByConceptionResultProps {
  result: DueDateByConceptionResult | null;
}

export default function DueDateByConceptionResult({ result }: DueDateByConceptionResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Due Date Result</h2>
        <p className="text-gray-600">Enter your conception date to estimate due date.</p>
      </div>
    );
  }

  return (
    <div
      id="due-date-by-conception-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Estimated Due Date</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Due Date</p>
        <p className="text-3xl font-bold text-accent">{result.dueDateFormatted}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Based on conception date {result.conceptionDate}
        </p>
      </div>

      {typeof result.daysRemaining === 'number' && (
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Days remaining (approx.)</p>
          <p className="text-xl font-semibold">{result.daysRemaining} days</p>
        </div>
      )}
    </div>
  );
}
