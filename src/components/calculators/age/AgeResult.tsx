import React from 'react';
import type { AgeResult } from '@/types/age';

interface AgeResultProps {
  result: AgeResult | null;
}

export default function AgeResult({ result }: AgeResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Age Result</h2>
        <p className="text-gray-600">Enter a birth date to calculate your age.</p>
      </div>
    );
  }

  return (
    <div
      id="age-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Age Result</h2>

      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-3xl font-bold text-accent">
          {result.years} years, {result.months} months, {result.days} days
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Total days lived: {result.totalDays.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
