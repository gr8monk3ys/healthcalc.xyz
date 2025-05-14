import React from 'react';
import type { BodySurfaceAreaResult } from '@/types/bodySurfaceArea';

interface BodySurfaceAreaResultProps {
  result: BodySurfaceAreaResult | null;
}

export default function BodySurfaceAreaResult({ result }: BodySurfaceAreaResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Body Surface Area Result</h2>
        <p className="text-gray-600">Enter your measurements to calculate BSA.</p>
      </div>
    );
  }

  return (
    <div
      id="body-surface-area-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Body Surface Area Result</h2>
      <div className="neumorph-inset p-5 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">Estimated BSA</p>
        <p className="text-3xl font-bold text-accent">{result.bsa} m²</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Commonly used for medication dosing and clinical metrics.
        </p>
      </div>
    </div>
  );
}
