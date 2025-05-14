import React from 'react';
import type { CaloriesBurnedSwimmingResult } from '@/types/caloriesBurnedSwimming';

interface CaloriesBurnedSwimmingResultProps {
  result: CaloriesBurnedSwimmingResult | null;
}

export default function CaloriesBurnedSwimmingResult({
  result,
}: CaloriesBurnedSwimmingResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Calories Burned Swimming Result</h2>
        <p className="text-gray-600">Enter your swim details to see results.</p>
      </div>
    );
  }

  return (
    <div
      id="calories-burned-swimming-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Calories Burned Swimming</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Calories Burned</p>
        <p className="text-3xl font-bold text-accent">{result.calories} calories</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Intensity: {result.intensity} • {result.durationMinutes} minutes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Calories per hour</p>
          <p className="text-xl font-semibold">{result.caloriesPerHour} cal/hr</p>
        </div>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">MET estimate</p>
          <p className="text-xl font-semibold">{result.met}</p>
        </div>
      </div>
    </div>
  );
}
