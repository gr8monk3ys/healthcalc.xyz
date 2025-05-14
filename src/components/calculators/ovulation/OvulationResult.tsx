import React from 'react';
import type { OvulationResult } from '@/types/ovulation';

interface OvulationResultProps {
  result: OvulationResult | null;
}

export default function OvulationResult({ result }: OvulationResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ovulation Result</h2>
        <p className="text-gray-600">Enter your cycle details to estimate ovulation.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="ovulation-result">
      <h2 className="text-xl font-semibold mb-2">Estimated Ovulation</h2>
      <p className="text-3xl font-bold text-accent">{result.ovulationDate}</p>

      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <p>
          Fertile window: {result.fertileWindowStart} – {result.fertileWindowEnd}
        </p>
        <p>Next period estimate: {result.nextPeriodDate}</p>
      </div>
    </div>
  );
}
