import React from 'react';
import type { BMRResult } from '@/types/bmr';

interface BMRResultProps {
  result: BMRResult | null;
}

export default function BMRResult({ result }: BMRResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">BMR Result</h2>
        <p className="text-gray-600">Enter your details to calculate your basal metabolic rate.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="bmr-result">
      <h2 className="text-xl font-semibold mb-2">Your BMR</h2>
      <p className="text-3xl font-bold text-accent">{result.bmr} kcal/day</p>
      <p className="text-sm text-gray-600 mt-1">Formula: {result.formulaName}</p>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p>BMR is the calories your body needs at rest to support vital functions.</p>
      </div>
    </div>
  );
}
