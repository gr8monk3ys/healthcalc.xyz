'use client';

import React from 'react';
import { LifeExpectancyResult } from '@/types/lifeExpectancy';

interface LifeExpectancyResultDisplayProps {
  result: LifeExpectancyResult;
}

const LifeExpectancyResultDisplay: React.FC<LifeExpectancyResultDisplayProps> = ({ result }) => {
  const netPositive = result.netEffect >= 0;

  return (
    <div
      id="life-expectancy-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-6">Your Life Expectancy Results</h2>

      {/* Estimated Life Expectancy - Hero Number */}
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-gray-600 mb-1">Estimated Life Expectancy</p>
        <p className="text-5xl font-bold">{result.estimatedLifeExpectancy}</p>
        <p className="text-sm text-gray-600 mt-1">years</p>
      </div>

      {/* Baseline Comparison */}
      <div className="neumorph-inset p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-3">Baseline Comparison</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Gender Average</span>
          <span className="font-semibold">{result.baselineLifeExpectancy} years</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Your Estimate</span>
          <span className="font-semibold">{result.estimatedLifeExpectancy} years</span>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Difference</span>
            <span className={`font-semibold ${netPositive ? 'text-green-600' : 'text-red-600'}`}>
              {netPositive ? '+' : ''}
              {result.netEffect} years
            </span>
          </div>
        </div>
      </div>

      {/* Health Age vs Chronological Age */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="neumorph-inset p-4 rounded-lg text-center">
          <p className="text-xs font-medium text-gray-600 mb-1">Health Age</p>
          <p
            className={`text-3xl font-bold ${result.healthAge <= result.estimatedLifeExpectancy ? 'text-green-600' : 'text-red-600'}`}
          >
            {result.healthAge}
          </p>
        </div>
        <div className="neumorph-inset p-4 rounded-lg text-center">
          <p className="text-xs font-medium text-gray-600 mb-1">Remaining Years</p>
          <p className="text-3xl font-bold">{result.remainingYears}</p>
        </div>
      </div>

      {/* Percentile Rank */}
      <div className="neumorph-inset p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Percentile Rank</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="relative h-4 neumorph-inset rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  result.percentileRank >= 70
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : result.percentileRank >= 40
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      : 'bg-gradient-to-r from-orange-400 to-red-500'
                }`}
                style={{ width: `${result.percentileRank}%` }}
              ></div>
            </div>
          </div>
          <span className="font-semibold text-lg min-w-[3rem] text-right">
            {result.percentileRank}%
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          You rank in the {result.percentileRank}th percentile compared to the general population
          for your gender.
        </p>
      </div>

      {/* Net Effect */}
      <div className="neumorph-inset p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Net Lifestyle Effect</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-green-600">+{result.yearsAdded} years gained</span>
              <span className="text-red-600">-{result.yearsLost} years lost</span>
            </div>
            <div className="relative h-6 neumorph-inset rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                  style={{
                    width: `${result.yearsAdded + result.yearsLost > 0 ? (result.yearsAdded / (result.yearsAdded + result.yearsLost)) * 100 : 50}%`,
                  }}
                ></div>
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
                  style={{
                    width: `${result.yearsAdded + result.yearsLost > 0 ? (result.yearsLost / (result.yearsAdded + result.yearsLost)) * 100 : 50}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="text-center min-w-[4rem]">
            <p className={`text-xl font-bold ${netPositive ? 'text-green-600' : 'text-red-600'}`}>
              {netPositive ? '+' : ''}
              {result.netEffect}
            </p>
            <p className="text-xs text-gray-600">net</p>
          </div>
        </div>
      </div>

      {/* Positive Factors */}
      {result.positiveFactors.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-green-700">Positive Factors</h3>
          <div className="neumorph-inset p-4 rounded-lg space-y-2">
            {result.positiveFactors.map((factor, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-lg" aria-hidden="true">
                    +
                  </span>
                  <span className="text-sm">{factor.factor}</span>
                </div>
                {factor.yearsAdded > 0 && (
                  <span className="text-sm font-semibold text-green-600">
                    +{factor.yearsAdded} yr
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Negative Factors */}
      {result.negativeFactors.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-red-700">Negative Factors</h3>
          <div className="neumorph-inset p-4 rounded-lg space-y-2">
            {result.negativeFactors.map((factor, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-lg" aria-hidden="true">
                    -
                  </span>
                  <span className="text-sm capitalize">{factor.factor}</span>
                </div>
                <span className="text-sm font-semibold text-red-600">-{factor.yearsLost} yr</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Recommendations */}
      {result.topRecommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Top Recommendations</h3>
          <div className="neumorph-inset p-4 rounded-lg space-y-3">
            {result.topRecommendations.map((rec, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-accent font-bold text-sm min-w-[1.5rem]" aria-hidden="true">
                  {index + 1}.
                </span>
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p>
          <strong>Disclaimer:</strong> This calculator provides rough estimates based on
          population-level epidemiological data. Individual outcomes vary widely based on genetics,
          access to healthcare, environment, and factors not captured here. This tool is for
          educational purposes only and should not replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default LifeExpectancyResultDisplay;
