import React from 'react';
import type { Vo2MaxResult } from '@/types/vo2Max';

interface Vo2MaxResultProps {
  result: Vo2MaxResult | null;
}

export default function Vo2MaxResult({ result }: Vo2MaxResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">VO2 Max Result</h2>
        <p className="text-gray-600">Enter your details to estimate VO2 max.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="vo2-max-result">
      <h2 className="text-xl font-semibold mb-2">Estimated VO2 Max</h2>
      <p className="text-3xl font-bold text-accent">{result.vo2Max} ml/kg/min</p>
      <p className="text-sm text-gray-600 mt-1">Based on the Rockport 1-mile walk test.</p>
    </div>
  );
}
