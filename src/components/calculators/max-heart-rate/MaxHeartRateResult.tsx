import React from 'react';
import type { MaxHeartRateResult } from '@/types/maxHeartRate';

interface MaxHeartRateResultProps {
  result: MaxHeartRateResult | null;
}

export default function MaxHeartRateResult({ result }: MaxHeartRateResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Max Heart Rate Result</h2>
        <p className="text-gray-600">Enter your age to estimate max heart rate.</p>
      </div>
    );
  }

  return (
    <div
      id="max-heart-rate-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Max Heart Rate Estimates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Traditional (220 - age)</p>
          <p className="text-2xl font-bold text-accent">{result.traditional} bpm</p>
        </div>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tanaka (208 - 0.7 × age)</p>
          <p className="text-2xl font-bold text-accent">{result.tanaka} bpm</p>
        </div>
      </div>
    </div>
  );
}
