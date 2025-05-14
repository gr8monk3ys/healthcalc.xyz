import React from 'react';
import type { FatIntakeResult } from '@/types/fatIntake';

interface FatIntakeResultProps {
  result: FatIntakeResult | null;
}

export default function FatIntakeResult({ result }: FatIntakeResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Fat Intake Result</h2>
        <p className="text-gray-600">Enter calories and fat percentage to see results.</p>
      </div>
    );
  }

  return (
    <div
      id="fat-intake-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Daily Fat Target</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Fat Intake</p>
        <p className="text-3xl font-bold text-accent">{result.fatGrams} g/day</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {result.fatCalories} calories ({result.fatPercent}% of intake)
        </p>
      </div>
    </div>
  );
}
