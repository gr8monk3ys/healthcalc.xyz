/**
 * Calorie Deficit Result Display Component
 */

import React from 'react';
import Card from '@/components/ui/Card';
import ResultCard from '@/components/ui/ResultCard';
import { CalorieDeficitResult } from '@/types/calorieDeficit';
import { formatTargetDate, getDeficitSafetyMessage } from '@/app/api/calorieDeficit';

interface CalorieDeficitResultDisplayProps {
  result: CalorieDeficitResult;
  weightUnit: 'kg' | 'lb';
}

export default function CalorieDeficitResultDisplay({
  result,
  weightUnit,
}: CalorieDeficitResultDisplayProps) {
  // Convert weights if needed
  const displayGoalWeight =
    weightUnit === 'kg' ? result.goalWeightKg : result.goalWeightKg * 2.20462;
  const displayWeightToLose =
    weightUnit === 'kg' ? result.weightToLose : result.weightToLose * 2.20462;
  const displayWeeklyLoss =
    weightUnit === 'kg' ? result.weeklyWeightLoss : result.weeklyWeightLoss * 2.20462;

  const unitLabel = weightUnit === 'kg' ? 'kg' : 'lbs';

  return (
    <div className="space-y-6">
      {/* Main Timeline Result */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your Weight Loss Timeline</h2>
          <div className="flex items-center justify-center gap-4 my-6">
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {result.estimatedWeeks}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">weeks</div>
            </div>
            <div className="text-2xl text-gray-400">≈</div>
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {result.estimatedDays}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">days</div>
            </div>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Estimated target date: <span className="font-semibold">{formatTargetDate(result.targetDate)}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            You'll lose approximately {displayWeeklyLoss.toFixed(2)} {unitLabel}/week
          </p>
        </div>
      </Card>

      {/* Safety Warnings */}
      {result.warnings.length > 0 && (
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Important Considerations
              </h3>
              <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                {result.warnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          title="Goal Weight"
          value={`${displayGoalWeight.toFixed(1)} ${unitLabel}`}
          description={`Total to lose: ${displayWeightToLose.toFixed(1)} ${unitLabel}`}
        />
        <ResultCard
          title="Daily Calorie Target"
          value={`${result.dailyCalorieTarget}`}
          description={`${result.dailyDeficit} calorie deficit`}
          unit="calories"
        />
        <ResultCard
          title="Current TDEE"
          value={`${result.tdee}`}
          description="Your daily energy expenditure"
          unit="calories"
        />
        <ResultCard
          title="Basal Metabolic Rate"
          value={`${result.bmr}`}
          description="Calories burned at rest"
          unit="calories"
        />
      </div>

      {/* Deficit Level Info */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-3">Deficit Level: {result.deficitLevel === 'mild' ? 'Mild (Slow & Steady)' : result.deficitLevel === 'moderate' ? 'Moderate (Balanced)' : 'Aggressive (Fast Results)'}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {getDeficitSafetyMessage(result.deficitLevel)}
        </p>
      </Card>

      {/* Recommendations */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Nutritional Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {result.recommendations.proteinGrams}g
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Daily Protein</div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Essential for preserving muscle
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {result.recommendations.waterLiters}L
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Daily Water</div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Supports metabolism
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {result.recommendations.minCalories}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Minimum Calories</div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Don't go below this
            </p>
          </div>
        </div>
      </Card>

      {/* Weekly Projections Graph */}
      {result.weeklyProjections.length > 1 && (
        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">Weight Loss Projection</h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 600 250">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line
                  key={`grid-${i}`}
                  x1="50"
                  y1={50 + i * 40}
                  x2="580"
                  y2={50 + i * 40}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  className="text-gray-400"
                />
              ))}

              {/* Weight loss line */}
              <polyline
                points={result.weeklyProjections
                  .slice(0, Math.min(26, result.estimatedWeeks + 1)) // Show up to 26 weeks
                  .map((proj, index) => {
                    const x = 50 + (index / Math.min(26, result.estimatedWeeks)) * 530;
                    const y = 210 - (proj.cumulativeWeightLoss / result.weightToLose) * 150;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-purple-600 dark:text-purple-400"
              />

              {/* Axis labels */}
              <text x="25" y="130" className="text-xs fill-current text-gray-600 dark:text-gray-400">
                Weight Loss ({unitLabel})
              </text>
              <text x="300" y="240" className="text-xs fill-current text-gray-600 dark:text-gray-400" textAnchor="middle">
                Weeks
              </text>
            </svg>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Note: Weight loss naturally slows over time due to metabolic adaptation
          </p>
        </Card>
      )}

      {/* Tips */}
      <Card className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
        <h3 className="text-lg font-semibold mb-3">Tips for Success</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Track your calories consistently for best results</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Weigh yourself weekly at the same time for accurate progress tracking</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Prioritize protein to preserve muscle mass during weight loss</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Include strength training to maintain lean body mass</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Adjust your calorie target as you lose weight (recalculate every 5-10 {unitLabel})</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
