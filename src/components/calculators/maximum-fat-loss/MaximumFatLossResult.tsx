/**
 * Maximum Fat Loss Result Display Component
 */

import React from 'react';
import Card from '@/components/ui/Card';
import ResultCard from '@/components/ui/ResultCard';
import { MaximumFatLossResult } from '@/types/maximumFatLoss';
import { formatBodyFatWithContext } from '@/app/api/maximumFatLoss';

interface MaximumFatLossResultDisplayProps {
  result: MaximumFatLossResult;
  weightUnit: 'kg' | 'lb';
  gender: 'male' | 'female';
}

export default function MaximumFatLossResultDisplay({
  result,
  weightUnit,
  gender,
}: MaximumFatLossResultDisplayProps) {
  const displayWeight = weightUnit === 'kg' ? result.currentWeightKg : result.currentWeightKg * 2.20462;
  const displayFatMass = weightUnit === 'kg' ? result.fatMassKg : result.fatMassLbs;
  const displayLeanMass = weightUnit === 'kg' ? result.leanMassKg : result.leanMassLbs;
  const displayWeeklyLoss = weightUnit === 'kg' ? result.expectedWeeklyFatLoss : result.expectedWeeklyFatLossLbs;
  const unitLabel = weightUnit === 'kg' ? 'kg' : 'lbs';

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your Maximum Fat Loss Plan</h2>
          <div className="flex items-center justify-center gap-6 my-6">
            <div>
              <div className="text-5xl font-bold text-orange-600 dark:text-orange-400">
                {result.minimumCalories}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">calories/day</div>
            </div>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Maximum deficit: <span className="font-semibold">{result.maximumDeficit} cal/day</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Expected fat loss: {displayWeeklyLoss} {unitLabel}/week
          </p>
        </div>
      </Card>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Notes</h3>
              <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                {result.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Body Composition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          title="Current Weight"
          value={`${displayWeight.toFixed(1)} ${unitLabel}`}
          description={formatBodyFatWithContext(result.bodyFatPercentage, gender)}
        />
        <ResultCard
          title="Fat vs Lean Mass"
          value={`${displayFatMass.toFixed(1)} / ${displayLeanMass.toFixed(1)}`}
          description={`${unitLabel} (fat / lean)`}
        />
        <ResultCard
          title="Current TDEE"
          value={`${result.tdee}`}
          description="Daily energy expenditure"
          unit="calories"
        />
        <ResultCard
          title="Basal Metabolic Rate"
          value={`${result.bmr}`}
          description="Calories burned at rest"
          unit="calories"
        />
      </div>

      {/* Protein Requirements */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Protein Requirements for Muscle Preservation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {result.recommendations.minimumProtein}g
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Minimum</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {result.recommendations.optimalProtein}g
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Optimal ⭐</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center col-span-2 md:col-span-1">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {(result.recommendations.optimalProtein / result.leanMassKg).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">g per kg lean mass</div>
          </div>
        </div>
      </Card>

      {/* Recovery Recommendations */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Recovery & Training</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.recommendations.strengthTrainingDays}x
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Strength/Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {result.recommendations.sleepHours}h
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sleep Nightly</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {result.recommendations.waterLiters}L
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Water Daily</div>
          </div>
        </div>
      </Card>

      {/* Projections */}
      {result.projections.length > 1 && (
        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">12-Week Projection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Note: Your maximum deficit decreases as you lose fat. The projection shows how your calorie target adjusts over time.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2">Week</th>
                  <th className="text-right py-2">Weight ({unitLabel})</th>
                  <th className="text-right py-2">Body Fat %</th>
                  <th className="text-right py-2">Max Deficit</th>
                </tr>
              </thead>
              <tbody>
                {result.projections.map((proj, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">{proj.weeks}</td>
                    <td className="text-right py-2">
                      {weightUnit === 'kg' ? proj.projectedWeightKg.toFixed(1) : (proj.projectedWeightKg * 2.20462).toFixed(1)}
                    </td>
                    <td className="text-right py-2">{proj.projectedBodyFatPercentage.toFixed(1)}%</td>
                    <td className="text-right py-2">{proj.adjustedDeficit} cal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card className="p-5 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10">
        <h3 className="text-lg font-semibold mb-3">Critical Success Factors</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 flex-shrink-0">✓</span>
            <span>Hit your protein target EVERY day - this is non-negotiable for muscle preservation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 flex-shrink-0">✓</span>
            <span>Strength train 3x/week with progressive overload</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 flex-shrink-0">✓</span>
            <span>Recalculate every 5-{unitLabel === 'kg' ? '7' : '10-15'} {unitLabel} of fat loss</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 flex-shrink-0">✓</span>
            <span>Track your lifts - if strength drops significantly, reduce your deficit</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 flex-shrink-0">✓</span>
            <span>Get 7-9 hours of quality sleep for optimal recovery and fat loss</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
