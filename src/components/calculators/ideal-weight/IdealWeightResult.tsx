import React from 'react';
import type { IdealWeightResult } from '@/types/idealWeight';

interface IdealWeightResultProps {
  result: IdealWeightResult | null;
}

export default function IdealWeightResult({ result }: IdealWeightResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ideal Weight Result</h2>
        <p className="text-gray-600">Enter your height and gender to see results.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="ideal-weight-result">
      <h2 className="text-xl font-semibold mb-2">Ideal Weight Result</h2>
      <p className="text-2xl font-bold text-accent">
        {result.rangeKg.min}-{result.rangeKg.max} kg ({result.rangeLb.min}-{result.rangeLb.max} lb)
      </p>
      <p className="text-sm text-gray-600 mt-1">
        Average: {result.averageKg} kg ({result.averageLb} lb)
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-2">Formula</th>
              <th className="py-2">kg</th>
              <th className="py-2">lb</th>
            </tr>
          </thead>
          <tbody>
            {result.formulas.map(formula => (
              <tr key={formula.id} className="border-t border-gray-100">
                <td className="py-2 font-medium">{formula.label}</td>
                <td className="py-2">{formula.weightKg}</td>
                <td className="py-2">{formula.weightLb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
