'use client';

import React from 'react';
import { SubstanceImpactResult } from '@/types/substanceImpact';

interface SubstanceImpactResultDisplayProps {
  result: SubstanceImpactResult;
}

const SubstanceImpactResultDisplay: React.FC<SubstanceImpactResultDisplayProps> = ({ result }) => {
  const lifespanColor =
    result.totalLifespanImpact < 0
      ? 'text-red-600'
      : result.totalLifespanImpact === 0
        ? 'text-green-600'
        : 'text-green-600';

  const lifespanBorderColor =
    result.totalLifespanImpact < -5
      ? 'border-red-500'
      : result.totalLifespanImpact < 0
        ? 'border-orange-500'
        : 'border-green-500';

  return (
    <div
      id="substance-impact-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Substance Impact Results</h2>

      {/* Total Lifespan Impact */}
      <div className="mb-6">
        <div className={`neumorph-inset p-4 rounded-lg border-l-4 ${lifespanBorderColor}`}>
          <p className="text-sm font-medium text-gray-600 mb-1">Estimated Lifespan Impact</p>
          <p className={`text-3xl font-bold ${lifespanColor}`}>
            {result.totalLifespanImpact > 0 ? '+' : ''}
            {result.totalLifespanImpact} years
          </p>
          {result.totalLifespanImpact < 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Based on epidemiological data for your usage pattern
            </p>
          )}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Financial Impact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="neumorph-inset p-4 rounded-lg">
            <p className="text-sm text-gray-600">Cost Per Year</p>
            <p className="text-2xl font-bold">
              ${result.totalFinancialCostPerYear.toLocaleString()}
            </p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg">
            <p className="text-sm text-gray-600">Estimated Lifetime Cost</p>
            <p className="text-2xl font-bold">${result.totalLifetimeCost.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Alcohol Details */}
      {result.alcoholCaloriesPerWeek !== undefined && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Alcohol Impact</h3>
          <div className="neumorph-inset p-4 rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Weekly Calories</p>
                <p className="font-semibold">
                  {result.alcoholCaloriesPerWeek.toLocaleString()} cal
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Yearly Calories</p>
                <p className="font-semibold">
                  {(result.alcoholCaloriesPerYear ?? 0).toLocaleString()} cal
                </p>
              </div>
            </div>
            {result.alcoholEquivalentFatLbs !== undefined && (
              <div>
                <p className="text-sm text-gray-600">Equivalent Fat Gain Per Year</p>
                <p className="font-semibold">{result.alcoholEquivalentFatLbs} lbs</p>
              </div>
            )}
            {result.alcoholLifespanImpactYears !== undefined && (
              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-sm text-gray-600">Alcohol-Specific Lifespan Impact</p>
                <p
                  className={`font-semibold ${
                    result.alcoholLifespanImpactYears < 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {result.alcoholLifespanImpactYears > 0 ? '+' : ''}
                  {result.alcoholLifespanImpactYears} years
                </p>
              </div>
            )}
            {result.alcoholFinancialCostPerYear !== undefined && (
              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-sm text-gray-600">Alcohol Cost Per Year</p>
                <p className="font-semibold">
                  ${result.alcoholFinancialCostPerYear.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Smoking Details */}
      {result.smokingLifespanImpactYears !== undefined && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Smoking Impact</h3>
          <div className="neumorph-inset p-4 rounded-lg space-y-3">
            {result.cigarettesSmoked !== undefined && (
              <div>
                <p className="text-sm text-gray-600">Total Cigarettes Smoked</p>
                <p className="font-semibold">{result.cigarettesSmoked.toLocaleString()}</p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Smoking-Specific Lifespan Impact</p>
              <p
                className={`font-semibold ${
                  result.smokingLifespanImpactYears < 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {result.smokingLifespanImpactYears > 0 ? '+' : ''}
                {result.smokingLifespanImpactYears} years
              </p>
            </div>
            {result.smokingFinancialCostPerYear !== undefined && (
              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-sm text-gray-600">Smoking Cost Per Year</p>
                <p className="font-semibold">
                  ${result.smokingFinancialCostPerYear.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Health Recovery Timeline */}
      {result.healthRecoveryTimeline.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Health Recovery Timeline (If You Quit)</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <div className="relative">
              {result.healthRecoveryTimeline.map((milestone, index) => (
                <div key={index} className="flex gap-4 mb-4 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0 mt-1" />
                    {index < result.healthRecoveryTimeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-green-200 mt-1" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-semibold text-sm text-green-700">{milestone.timeframe}</p>
                    <p className="text-sm text-gray-600">{milestone.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Recommendations</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <span className="text-blue-500 flex-shrink-0 mt-0.5">&#x2022;</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p>
          <strong>Note:</strong> These estimates are based on population-level epidemiological data
          from the CDC, WHO, and peer-reviewed studies. Individual outcomes vary. This calculator is
          for educational purposes only and is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default SubstanceImpactResultDisplay;
