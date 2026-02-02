'use client';

import React from 'react';
import { OneRepMaxResult } from '@/types/oneRepMax';
import { getPercentageColor } from '@/constants/oneRepMax';

interface OneRepMaxResultDisplayProps {
  result: OneRepMaxResult;
}

/**
 * OneRepMaxResultDisplay Component
 *
 * Displays the calculated 1RM value along with:
 * - Results from all calculation formulas
 * - Training zone recommendations with weight ranges
 * - Percentage chart for programming workouts
 */
const OneRepMaxResultDisplay: React.FC<OneRepMaxResultDisplayProps> = ({ result }) => {
  return (
    <div
      id="one-rep-max-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your One Rep Max Results</h2>

      {/* Primary 1RM Result */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Estimated 1RM ({result.selectedFormula})</span>
          <span className="text-3xl font-bold text-accent">
            {result.oneRepMax.toFixed(1)} {result.weightUnit}
          </span>
        </div>

        {/* 1RM Visual Gauge */}
        <div className="relative h-4 neumorph-inset rounded-full overflow-hidden mt-4">
          <div
            className="absolute h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full"
            style={{ width: '100%' }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-500">
          <span>Light</span>
          <span>Moderate</span>
          <span>Heavy</span>
          <span>Max</span>
        </div>
      </div>

      {/* All Formula Results */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Results by Formula</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {result.allFormulas.map(formulaResult => (
            <div
              key={formulaResult.formula}
              className={`neumorph-inset p-3 rounded-lg text-center ${
                formulaResult.formula === result.selectedFormula ? 'ring-2 ring-accent' : ''
              }`}
            >
              <p className="text-sm text-gray-600">{formulaResult.name}</p>
              <p className="text-lg font-bold">
                {formulaResult.oneRepMax.toFixed(1)} {result.weightUnit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Training Zones */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Training Zones</h3>
        <div className="space-y-3">
          {result.trainingZones.map(zone => (
            <div key={zone.zone} className="neumorph-inset p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold" style={{ color: getZoneColor(zone.zone) }}>
                    {zone.name}
                  </h4>
                  <p className="text-sm text-gray-600">{zone.repRange}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {zone.minWeight.toFixed(1)} - {zone.maxWeight.toFixed(1)} {result.weightUnit}
                  </p>
                  <p className="text-xs text-gray-500">
                    {zone.minPercentage}% - {zone.maxPercentage}% 1RM
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{zone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Percentage Chart */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Percentage Chart</h3>
        <div className="neumorph-inset rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">% of 1RM</th>
                <th className="px-4 py-2 text-right">Weight</th>
                <th className="px-4 py-2 text-right">Est. Reps</th>
              </tr>
            </thead>
            <tbody>
              {result.percentageChart.map((entry, index) => (
                <tr key={entry.percentage} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getPercentageColor(entry.percentage) }}
                    />
                    {entry.percentage}%
                  </td>
                  <td className="px-4 py-2 text-right font-medium">
                    {entry.weight.toFixed(1)} {result.weightUnit}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-600">{entry.estimatedReps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Note */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Important Note</h4>
        <p className="text-sm text-yellow-700">
          1RM calculations are estimates based on submaximal performance. Actual 1RM may vary based
          on factors like fatigue, technique, and training experience. Always use a spotter when
          attempting maximal lifts and never sacrifice form for weight.
        </p>
      </div>
    </div>
  );
};

/**
 * Gets the display color for a training zone
 */
function getZoneColor(zone: string): string {
  switch (zone) {
    case 'strength':
      return '#EF4444'; // red
    case 'hypertrophy':
      return '#F59E0B'; // amber
    case 'endurance':
      return '#10B981'; // green
    default:
      return '#6B7280'; // gray
  }
}

export default OneRepMaxResultDisplay;
