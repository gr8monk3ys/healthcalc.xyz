import React from 'react';
import type { AdjustedBodyWeightResult } from '@/types/adjustedBodyWeight';

interface AdjustedBodyWeightResultProps {
  result: AdjustedBodyWeightResult | null;
}

export default function AdjustedBodyWeightResult({ result }: AdjustedBodyWeightResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Adjusted Body Weight Result</h2>
        <p className="text-gray-600">Enter your height and weight to calculate ABW.</p>
      </div>
    );
  }

  return (
    <div
      id="adjusted-body-weight-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Adjusted Body Weight</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Adjusted Body Weight</p>
        <p className="text-3xl font-bold text-accent">
          {result.adjustedBodyWeightKg} kg ({result.adjustedBodyWeightLb} lb)
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{result.formula}</p>
      </div>

      <div className="neumorph-inset p-4 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">Ideal Body Weight</p>
        <p className="text-xl font-semibold">
          {result.idealBodyWeightKg} kg ({result.idealBodyWeightLb} lb)
        </p>
      </div>
    </div>
  );
}
