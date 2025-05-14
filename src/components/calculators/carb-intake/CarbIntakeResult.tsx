import React from 'react';
import type { CarbIntakeResult } from '@/types/carbIntake';

interface CarbIntakeResultProps {
  result: CarbIntakeResult | null;
}

export default function CarbIntakeResult({ result }: CarbIntakeResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Carb Intake Result</h2>
        <p className="text-gray-600">Enter calories and carb percentage to see results.</p>
      </div>
    );
  }

  return (
    <div
      id="carb-intake-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Daily Carbohydrate Target</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Carbohydrates</p>
        <p className="text-3xl font-bold text-accent">{result.carbGrams} g/day</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {result.carbCalories} calories ({result.carbPercent}% of intake)
        </p>
      </div>
    </div>
  );
}
