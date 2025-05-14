import React from 'react';
import type { StepsToCaloriesResult } from '@/types/stepsToCalories';

interface StepsToCaloriesResultProps {
  result: StepsToCaloriesResult | null;
}

export default function StepsToCaloriesResult({ result }: StepsToCaloriesResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Steps to Calories Result</h2>
        <p className="text-gray-600">Enter your steps and duration to see results.</p>
      </div>
    );
  }

  return (
    <div
      id="steps-to-calories-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Steps to Calories</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Calories Burned</p>
        <p className="text-3xl font-bold text-accent">{result.calories} calories</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {result.steps.toLocaleString()} steps • {result.durationMinutes} minutes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Distance</p>
          <p className="text-xl font-semibold">
            {result.distanceMiles} mi • {result.distanceKm} km
          </p>
        </div>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Estimated pace</p>
          <p className="text-xl font-semibold">{result.speedMph} mph</p>
        </div>
      </div>
    </div>
  );
}
