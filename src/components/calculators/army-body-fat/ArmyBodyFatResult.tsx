import React from 'react';
import type { ArmyBodyFatResult } from '@/types/armyBodyFat';

interface ArmyBodyFatResultProps {
  result: ArmyBodyFatResult | null;
}

export default function ArmyBodyFatResult({ result }: ArmyBodyFatResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Army Body Fat Result</h2>
        <p className="text-gray-600">Enter your measurements to calculate body fat.</p>
      </div>
    );
  }

  return (
    <div
      id="army-body-fat-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Army Body Fat Estimate</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Body Fat Percentage</p>
        <p className="text-3xl font-bold text-accent">{result.bodyFatPercentage}%</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{result.category}</p>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Method: {result.method}. Results are estimates and depend on accurate measurements.
      </p>
    </div>
  );
}
