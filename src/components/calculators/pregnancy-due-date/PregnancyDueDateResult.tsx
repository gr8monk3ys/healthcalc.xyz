import React from 'react';
import type { PregnancyDueDateResult } from '@/types/pregnancyDueDate';

interface PregnancyDueDateResultProps {
  result: PregnancyDueDateResult | null;
}

export default function PregnancyDueDateResult({ result }: PregnancyDueDateResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Due Date Result</h2>
        <p className="text-gray-600">Enter a date to estimate your due date.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="pregnancy-due-date-result">
      <h2 className="text-xl font-semibold mb-2">Estimated Due Date</h2>
      <p className="text-3xl font-bold text-accent">{result.dueDate}</p>
      {typeof result.gestationalWeeks === 'number' && (
        <p className="text-sm text-gray-600 mt-1">
          Estimated gestational age: {result.gestationalWeeks} weeks
        </p>
      )}

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>First trimester ends: {result.milestones.firstTrimesterEnd}</p>
        <p>Second trimester ends: {result.milestones.secondTrimesterEnd}</p>
        <p>Third trimester starts: {result.milestones.thirdTrimesterStart}</p>
      </div>
    </div>
  );
}
