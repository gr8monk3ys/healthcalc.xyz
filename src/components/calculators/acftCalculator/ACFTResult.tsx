'use client';

import React from 'react';
import { ACFTResult } from '@/types/acftCalculator';

interface ACFTResultDisplayProps {
  result: ACFTResult;
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Gold':
      return 'text-yellow-600';
    case 'Silver':
      return 'text-gray-500';
    case 'Bronze':
      return 'text-amber-700';
    case 'Pass':
      return 'text-green-600';
    case 'Fail':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

function getCategoryBgColor(category: string): string {
  switch (category) {
    case 'Gold':
      return 'bg-yellow-100 border-yellow-400';
    case 'Silver':
      return 'bg-gray-100 border-gray-400';
    case 'Bronze':
      return 'bg-amber-100 border-amber-400';
    case 'Pass':
      return 'bg-green-100 border-green-400';
    case 'Fail':
      return 'bg-red-100 border-red-400';
    default:
      return 'bg-gray-100 border-gray-300';
  }
}

function getProgressBarColor(points: number): string {
  if (points >= 90) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
  if (points >= 80) return 'bg-gradient-to-r from-gray-400 to-gray-500';
  if (points >= 70) return 'bg-gradient-to-r from-amber-500 to-amber-600';
  if (points >= 60) return 'bg-gradient-to-r from-green-400 to-green-500';
  return 'bg-gradient-to-r from-red-400 to-red-500';
}

const ACFTResultDisplay: React.FC<ACFTResultDisplayProps> = ({ result }) => {
  return (
    <div
      id="acft-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your ACFT Results</h2>

      {/* Total Score */}
      <div className="mb-6 text-center">
        <p className="text-sm font-medium text-gray-600 mb-1">Total Score</p>
        <p className="text-5xl font-bold">{result.totalScore}</p>
        <p className="text-sm text-gray-500 mt-1">out of 600</p>

        <div className="relative h-4 neumorph-inset rounded-full overflow-hidden mt-3 mx-auto max-w-md">
          <div
            className={`h-full transition-all duration-700 ${
              result.passing
                ? 'bg-gradient-to-r from-green-400 to-blue-500'
                : 'bg-gradient-to-r from-red-400 to-orange-400'
            }`}
            style={{ width: `${Math.min((result.totalScore / 600) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Overall Category Badge */}
      <div className="flex justify-center gap-4 mb-6">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-semibold ${getCategoryBgColor(result.overallCategory)}`}
        >
          <span className={`text-lg ${getCategoryColor(result.overallCategory)}`}>
            {result.overallCategory}
          </span>
        </div>

        <div
          className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-semibold ${
            result.passing
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'bg-red-100 border-red-400 text-red-700'
          }`}
        >
          {result.passing ? 'PASS' : 'FAIL'}
        </div>
      </div>

      {/* Individual Event Scores */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Event Scores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.eventScores.map(event => (
            <div key={event.event} className="neumorph-inset p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{event.eventName}</p>
                  <p className="text-xs text-gray-500">{event.rawDisplay}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-bold text-lg">{event.points}</p>
                  <p className="text-xs text-gray-500">/ 100</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative h-3 neumorph-inset rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-500 ${getProgressBarColor(event.points)}`}
                  style={{ width: `${event.points}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryBgColor(event.category)} ${getCategoryColor(event.category)}`}
                >
                  {event.category}
                </span>
                <span
                  className={`text-xs font-medium ${event.passing ? 'text-green-600' : 'text-red-600'}`}
                >
                  {event.passing ? 'Pass' : 'Fail'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      {result.strengths.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Strengths</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-1">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">&#10003;</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Weaknesses */}
      {result.weaknesses.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Weaknesses</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-1">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-red-500 mr-2 mt-0.5 flex-shrink-0">&#10007;</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Training Recommendations</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p>
          <strong>Note:</strong> Scores are based on the ACFT scoring tables effective April 2023
          (FM 7-22). Actual official scores may vary slightly based on age-group-specific standards.
          This calculator uses gender-based scoring as a general reference. Consult your unit
          fitness leader for official scoring.
        </p>
      </div>
    </div>
  );
};

export default ACFTResultDisplay;
