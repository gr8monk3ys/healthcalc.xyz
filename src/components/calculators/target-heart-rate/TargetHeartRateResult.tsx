import React from 'react';
import type { TargetHeartRateResult } from '@/types/targetHeartRate';

interface TargetHeartRateResultProps {
  result: TargetHeartRateResult | null;
}

export default function TargetHeartRateResult({ result }: TargetHeartRateResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Target Heart Rate Result</h2>
        <p className="text-gray-600">Enter your details to see your target zone.</p>
      </div>
    );
  }

  return (
    <div
      id="target-heart-rate-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Target Heart Rate Zone</h2>

      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Target Range</p>
        <p className="text-3xl font-bold text-accent">
          {result.targetMin}-{result.targetMax} bpm
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{result.method}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Max Heart Rate</p>
          <p className="text-xl font-semibold">{result.maxHeartRate} bpm</p>
        </div>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Intensity Range</p>
          <p className="text-xl font-semibold">
            {result.intensityMin}-{result.intensityMax}%
          </p>
        </div>
      </div>
    </div>
  );
}
