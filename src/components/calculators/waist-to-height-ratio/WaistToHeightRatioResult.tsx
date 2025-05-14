import React from 'react';
import type { WaistToHeightRatioResult } from '@/types/waistToHeightRatio';

interface WaistToHeightRatioResultProps {
  result: WaistToHeightRatioResult | null;
}

export default function WaistToHeightRatioResult({ result }: WaistToHeightRatioResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Waist-to-Height Ratio Result</h2>
        <p className="text-gray-600">Enter your measurements to see your ratio.</p>
      </div>
    );
  }

  return (
    <div
      id="waist-to-height-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Waist-to-Height Ratio Result</h2>

      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Your Ratio</p>
        <p className="text-3xl font-bold text-accent">{result.ratio.toFixed(2)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{result.category}</p>
      </div>

      <div className="neumorph-inset p-4 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">Guidance</p>
        <p className="text-gray-700 dark:text-gray-300">{result.guidance}</p>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        This ratio is a screening tool, not a diagnosis. Consider other health indicators and
        consult a professional for personalized advice.
      </p>
    </div>
  );
}
