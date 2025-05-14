import React from 'react';
import type { StepsToMilesResult } from '@/types/stepsToMiles';

interface StepsToMilesResultProps {
  result: StepsToMilesResult | null;
}

export default function StepsToMilesResult({ result }: StepsToMilesResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Steps to Miles Result</h2>
        <p className="text-gray-600">Enter steps and stride length to convert.</p>
      </div>
    );
  }

  return (
    <div
      id="steps-to-miles-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Distance Covered</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Miles</p>
        <p className="text-3xl font-bold text-accent">{result.miles} miles</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {result.kilometers} km total
        </p>
      </div>
    </div>
  );
}
