import React from 'react';
import type { BloodPressureResult } from '@/types/bloodPressure';

interface BloodPressureResultProps {
  result: BloodPressureResult | null;
}

export default function BloodPressureResult({ result }: BloodPressureResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Blood Pressure Result</h2>
        <p className="text-gray-600">
          Enter your systolic and diastolic values to see your category.
        </p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="blood-pressure-result">
      <h2 className="text-xl font-semibold mb-2">Blood Pressure Result</h2>
      <p className="text-3xl font-bold text-accent">
        {result.systolic}/{result.diastolic} mmHg
      </p>

      <div className="mt-4">
        <p className={`text-lg font-semibold ${result.status === 'danger' ? 'text-red-600' : ''}`}>
          {result.categoryLabel}
        </p>
        <p className="text-sm text-gray-600 mt-1">{result.range}</p>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700">{result.description}</p>
      </div>
    </div>
  );
}
