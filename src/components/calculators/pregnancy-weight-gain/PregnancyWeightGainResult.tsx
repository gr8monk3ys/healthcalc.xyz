import React from 'react';
import type { PregnancyWeightGainResult } from '@/types/pregnancyWeightGain';

interface PregnancyWeightGainResultProps {
  result: PregnancyWeightGainResult | null;
}

export default function PregnancyWeightGainResult({ result }: PregnancyWeightGainResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Pregnancy Weight Gain Result</h2>
        <p className="text-gray-600">Enter your pre-pregnancy details to see guidance.</p>
      </div>
    );
  }

  return (
    <div
      id="pregnancy-weight-gain-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Recommended Weight Gain</h2>

      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Pre-pregnancy BMI</p>
        <p className="text-2xl font-bold text-accent">{result.bmi}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{result.category}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Pregnancy Gain</p>
          <p className="text-xl font-semibold">
            {result.totalGain.minLb}-{result.totalGain.maxLb} lb
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ({result.totalGain.minKg}-{result.totalGain.maxKg} kg)
          </p>
        </div>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Weekly Gain (2nd/3rd trimester)
          </p>
          <p className="text-xl font-semibold">
            {result.weeklyGain.minLb}-{result.weeklyGain.maxLb} lb/week
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ({result.weeklyGain.minKg}-{result.weeklyGain.maxKg} kg/week)
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        These ranges are general guidelines. Always follow guidance from your healthcare provider.
      </p>
    </div>
  );
}
