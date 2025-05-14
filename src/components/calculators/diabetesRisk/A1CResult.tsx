'use client';

import React from 'react';
import type { A1CResult } from '@/types/diabetesRisk';

interface A1CResultProps {
  result: A1CResult | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  Normal: '#22c55e',
  Prediabetes: '#eab308',
  Diabetes: '#ef4444',
};

const REFERENCE_RANGES = [
  { label: 'Normal', range: 'Below 5.7%', glucose: '< 117 mg/dL (6.5 mmol/L)' },
  { label: 'Prediabetes', range: '5.7% - 6.4%', glucose: '117-137 mg/dL (6.5-7.6 mmol/L)' },
  { label: 'Diabetes', range: '6.5% or above', glucose: '> 140 mg/dL (7.8 mmol/L)' },
];

export default function A1CResultDisplay({ result }: A1CResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">A1C Conversion Result</h2>
        <p className="text-gray-600">
          Enter your A1C percentage to see the estimated average glucose and interpretation.
        </p>
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[result.category] || '#6b7280';

  return (
    <div
      id="a1c-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">A1C Conversion Result</h2>

      {/* Category Badge */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold"
          style={{ backgroundColor: categoryColor }}
        >
          {result.category}
        </span>
        <span className="text-sm text-gray-600">A1C: {result.a1cPercentage}%</span>
      </div>

      {/* Estimated Average Glucose */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Estimated Average Glucose (eAG)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-accent">{result.estimatedAverageGlucose.mgdl}</p>
            <p className="text-sm text-gray-600 mt-1">mg/dL</p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-accent">{result.estimatedAverageGlucose.mmol}</p>
            <p className="text-sm text-gray-600 mt-1">mmol/L</p>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Interpretation</h3>
        <div
          className="neumorph-inset p-4 rounded-lg border-l-4"
          style={{ borderLeftColor: categoryColor }}
        >
          <p className="text-sm">{result.interpretation}</p>
        </div>
      </div>

      {/* Reference Ranges */}
      <div className="mb-4">
        <h3 className="font-medium mb-3">Reference Ranges</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <div className="space-y-3">
            {REFERENCE_RANGES.map(ref => (
              <div
                key={ref.label}
                className={`flex items-center justify-between text-sm ${
                  result.category === ref.label ? 'font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[ref.label] }}
                  />
                  <span>{ref.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-600">{ref.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p>
          <strong>Note:</strong> The eAG conversion uses the ADAG study formula (Nathan et al.,
          2008): eAG (mg/dL) = 28.7 x A1C - 46.7. This is an estimate and may differ from individual
          finger-stick or continuous glucose monitor readings.
        </p>
      </div>
    </div>
  );
}
