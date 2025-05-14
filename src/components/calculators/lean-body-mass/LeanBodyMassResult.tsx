import React from 'react';
import type { LeanBodyMassResult } from '@/types/leanBodyMass';

interface LeanBodyMassResultProps {
  result: LeanBodyMassResult | null;
}

export default function LeanBodyMassResult({ result }: LeanBodyMassResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Lean Body Mass Result</h2>
        <p className="text-gray-600">Enter your measurements to calculate lean body mass.</p>
      </div>
    );
  }

  return (
    <div
      id="lean-body-mass-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Lean Body Mass</h2>

      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Lean Mass</p>
        <p className="text-3xl font-bold text-accent">
          {result.leanMassKg} kg ({result.leanMassLb} lb)
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Formula: {result.formula}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Fat Mass</p>
          <p className="text-xl font-semibold">{result.fatMassKg} kg</p>
        </div>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Body Fat %</p>
          <p className="text-xl font-semibold">
            {result.bodyFatPercentage ? `${result.bodyFatPercentage.toFixed(1)}%` : 'Estimated'}
          </p>
        </div>
      </div>
    </div>
  );
}
