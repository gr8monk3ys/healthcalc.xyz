import React from 'react';
import type { RestingHeartRateResult } from '@/types/restingHeartRate';

interface RestingHeartRateResultProps {
  result: RestingHeartRateResult | null;
}

export default function RestingHeartRateResult({ result }: RestingHeartRateResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Resting Heart Rate Result</h2>
        <p className="text-gray-600">Enter your resting heart rate to see your category.</p>
      </div>
    );
  }

  return (
    <div
      id="resting-heart-rate-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Resting Heart Rate</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Resting Heart Rate</p>
        <p className="text-3xl font-bold text-accent">{result.restingHeartRate} bpm</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{result.category}</p>
      </div>

      <p className="text-gray-600 dark:text-gray-300">{result.guidance}</p>
    </div>
  );
}
