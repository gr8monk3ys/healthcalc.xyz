import React from 'react';
import type { WaterIntakeResult } from '@/types/waterIntake';

interface WaterIntakeResultProps {
  result: WaterIntakeResult | null;
}

export default function WaterIntakeResult({ result }: WaterIntakeResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Water Intake Result</h2>
        <p className="text-gray-600">Enter your weight and activity level to see results.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="water-intake-result">
      <h2 className="text-xl font-semibold mb-2">Daily Water Intake</h2>
      <p className="text-3xl font-bold text-accent">{result.liters} L</p>
      <p className="text-sm text-gray-600 mt-1">
        ~{result.ounces} oz ({result.cups} cups)
      </p>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700">Total: {result.totalMl} ml per day</p>
        <p className="text-sm text-gray-600 mt-2">
          Hydration needs vary with climate, diet, and training intensity. Adjust based on thirst
          and urine color.
        </p>
      </div>
    </div>
  );
}
