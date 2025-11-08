/**
 * Weight Management Result Display Component
 */

import React from 'react';
import Card from '@/components/ui/Card';
import ResultCard from '@/components/ui/ResultCard';
import { WeightManagementResult } from '@/types/weightManagement';
import { formatDate, getGoalTypeMessage } from '@/app/api/weightManagement';

interface WeightManagementResultDisplayProps {
  result: WeightManagementResult;
  weightUnit: 'kg' | 'lb';
}

export default function WeightManagementResultDisplay({
  result,
  weightUnit,
}: WeightManagementResultDisplayProps) {
  // Convert weights if needed
  const displayGoalWeight =
    weightUnit === 'kg' ? result.goalWeightKg : result.goalWeightKg * 2.20462;
  const displayCurrentWeight =
    weightUnit === 'kg' ? result.currentWeightKg : result.currentWeightKg * 2.20462;
  const displayWeightChange =
    weightUnit === 'kg' ? result.weightToChange : result.weightToChange * 2.20462;
  const displayWeeklyChange =
    weightUnit === 'kg' ? result.weeklyWeightChange : result.weeklyWeightChange * 2.20462;

  const unitLabel = weightUnit === 'kg' ? 'kg' : 'lbs';

  const goalTypeLabel =
    result.goalType === 'lose' ? 'Weight Loss' : result.goalType === 'gain' ? 'Weight Gain' : 'Weight Maintenance';

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your {goalTypeLabel} Plan</h2>
          <div className="flex items-center justify-center gap-6 my-6">
            <div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                {result.dailyCalorieTarget}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">calories/day</div>
            </div>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            Target Date: <span className="font-semibold">{formatDate(result.targetDate)}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {result.weeksToGoal} weeks ({result.daysToGoal} days) • {Math.abs(displayWeeklyChange).toFixed(2)} {unitLabel}/week
          </p>
          {result.adjustedTargetDate && (
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
              ⚠️ Timeline adjusted for safety
            </p>
          )}
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

      {/* Goal Type Message */}
      <Card className="p-5 bg-blue-50 dark:bg-blue-900/20">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {getGoalTypeMessage(result.goalType)}
        </p>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard
          title="Current Weight"
          value={`${displayCurrentWeight.toFixed(1)} ${unitLabel}`}
          description={`Goal: ${displayGoalWeight.toFixed(1)} ${unitLabel}`}
        />
        <ResultCard
          title="Weight Change Needed"
          value={`${Math.abs(displayWeightChange).toFixed(1)} ${unitLabel}`}
          description={result.goalType === 'lose' ? 'to lose' : 'to gain'}
        />
        <ResultCard
          title="Current TDEE"
          value={`${result.tdee}`}
          description="Daily energy expenditure"
          unit="calories"
        />
        <ResultCard
          title="Calorie Adjustment"
          value={`${Math.abs(result.dailyCalorieChange)}`}
          description={result.dailyCalorieChange < 0 ? 'deficit' : 'surplus'}
          unit="calories"
        />
      </div>

      {/* Macronutrient Breakdown */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Daily Macronutrient Targets</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Based on your {result.dietType} diet preference
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {result.macros.proteinGrams}g
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Protein</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {result.macros.proteinPercentage}% • {result.macros.proteinCalories} cal
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {result.macros.carbsGrams}g
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Carbohydrates</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {result.macros.carbsPercentage}% • {result.macros.carbsCalories} cal
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {result.macros.fatGrams}g
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fat</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {result.macros.fatPercentage}% • {result.macros.fatCalories} cal
            </div>
          </div>
        </div>
      </Card>

      {/* Lifestyle Recommendations */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Lifestyle Recommendations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {result.recommendations.waterLiters}L
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Water Daily</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {result.recommendations.sleepHours}h
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sleep Nightly</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              {result.recommendations.exerciseDays}x
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Exercise/Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {result.recommendations.minCalories}+
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Min Calories</div>
          </div>
        </div>
      </Card>

      {/* Weekly Projections Graph */}
      {result.weeklyProjections.length > 1 && (
        <Card className="p-5">
          <h3 className="text-lg font-semibold mb-4">Weight Projection Timeline</h3>
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

              {/* Weight projection line */}
              <polyline
                points={result.weeklyProjections
                  .slice(0, Math.min(26, Math.ceil(result.weeksToGoal) + 1))
                  .map((proj, index) => {
                    const maxWeeks = Math.min(26, Math.ceil(result.weeksToGoal));
                    const x = 50 + (index / maxWeeks) * 530;
                    const minWeight = Math.min(result.currentWeightKg, result.goalWeightKg);
                    const maxWeight = Math.max(result.currentWeightKg, result.goalWeightKg);
                    const range = maxWeight - minWeight || 1;
                    const normalizedWeight = (proj.projectedWeight - minWeight) / range;
                    const y = 210 - normalizedWeight * 150;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-blue-600 dark:text-blue-400"
              />

              {/* Axis labels */}
              <text x="25" y="130" className="text-xs fill-current text-gray-600 dark:text-gray-400">
                Weight ({unitLabel})
              </text>
              <text x="300" y="240" className="text-xs fill-current text-gray-600 dark:text-gray-400" textAnchor="middle">
                Weeks
              </text>
            </svg>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Note: Actual results may vary due to metabolic adaptation and adherence
          </p>
        </Card>
      )}

      {/* Success Tips */}
      <Card className="p-5 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
        <h3 className="text-lg font-semibold mb-3">Tips for Success</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Track your macros using a food tracking app for accuracy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Weigh yourself weekly at the same time (morning, after bathroom)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Prioritize whole, nutrient-dense foods for better satiety</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Stay hydrated - drink water consistently throughout the day</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Get adequate sleep - it's crucial for weight management and recovery</span>
          </li>
          {result.goalType === 'gain' && (
            <li className="flex items-start gap-2">
              <span className="text-green-500 flex-shrink-0">✓</span>
              <span>Combine with progressive strength training for optimal muscle gain</span>
            </li>
          )}
        </ul>
      </Card>
    </div>
  );
}
