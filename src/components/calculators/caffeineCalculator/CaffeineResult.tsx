'use client';

import React from 'react';
import { CaffeineResult } from '@/types/caffeineCalculator';

interface CaffeineResultDisplayProps {
  result: CaffeineResult;
}

const CaffeineResultDisplay: React.FC<CaffeineResultDisplayProps> = ({ result }) => {
  return (
    <div
      id="caffeine-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Caffeine Intake Results</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Total Daily Caffeine</span>
          <span className="text-2xl font-bold">{result.totalDailyCaffeine}mg</span>
        </div>

        <div className="relative h-6 neumorph-inset rounded-full overflow-hidden mb-1">
          <div
            className={`h-full transition-all duration-500 ${
              result.isOverLimit
                ? 'bg-gradient-to-r from-orange-400 to-red-500'
                : result.percentOfLimit > 80
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                  : 'bg-gradient-to-r from-green-400 to-blue-400'
            }`}
            style={{ width: `${Math.min(result.percentOfLimit, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-gray-600">0mg</span>
          <span className="text-gray-600">Safe Limit: {result.safeDailyLimit}mg</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Intake Status</h3>
        <div
          className={`neumorph-inset p-4 rounded-lg ${
            result.isOverLimit
              ? 'border-l-4 border-red-500'
              : result.percentOfLimit > 80
                ? 'border-l-4 border-orange-500'
                : 'border-l-4 border-green-500'
          }`}
        >
          <p className="font-medium text-lg mb-1">{result.percentOfLimit}% of Safe Daily Limit</p>
          <p
            className={`text-sm ${
              result.isOverLimit
                ? 'text-red-600'
                : result.percentOfLimit > 80
                  ? 'text-orange-600'
                  : 'text-green-600'
            }`}
          >
            {result.isOverLimit
              ? 'Above safe limit'
              : result.percentOfLimit > 80
                ? 'Approaching limit'
                : 'Within safe range'}
          </p>
        </div>
      </div>

      {result.sourceBreakdown.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Caffeine Sources Breakdown</h3>
          <div className="neumorph-inset p-4 rounded-lg space-y-3">
            {result.sourceBreakdown.map((source, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium">{source.source}</p>
                  <p className="text-xs text-gray-600">{source.servings} serving(s)</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{source.caffeineMg}mg</p>
                  <p className="text-xs text-gray-600">
                    {Math.round((source.caffeineMg / result.totalDailyCaffeine) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-medium mb-2">Pre-Workout Recommendation</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg mb-1">{result.preWorkoutDose}mg</p>
          <p className="text-sm text-gray-600">
            Optimal dose for performance enhancement (take 30-60 minutes before exercise)
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Metabolism & Clearance</h3>
        <div className="neumorph-inset p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Half-Life:</span>
            <span className="font-medium">{result.halfLifeHours} hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Full Clearance Time:</span>
            <span className="font-medium">{result.clearanceTime}</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Caffeine is eliminated gradually. Avoid caffeine 6+ hours before bedtime for better
            sleep.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Personalized Recommendation</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm">{result.recommendation}</p>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p>
          <strong>Note:</strong> These calculations are based on FDA guidelines (~6mg/kg body
          weight) and sports nutrition research. Individual tolerance varies. Consult a healthcare
          provider if you have heart conditions, anxiety disorders, or are pregnant/nursing.
        </p>
      </div>
    </div>
  );
};

export default CaffeineResultDisplay;
