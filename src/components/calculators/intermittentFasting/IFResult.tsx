import React from 'react';
import { IFResult as IFResultType } from '@/types/intermittentFasting';
import { getFormattedEatingWindow } from '@/utils/calculators/intermittentFasting';

interface IFResultProps {
  result: IFResultType;
  weightUnit: 'kg' | 'lb';
}

export default function IFResult({ result, weightUnit }: IFResultProps) {
  const formatTime12Hour = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <div className="space-y-6">
      {/* Protocol Overview */}
      <div className="neumorph-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Fasting Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="neumorph-inset p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Protocol</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {result.protocol.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {result.protocolDescription}
            </p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Eating Window</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatTime12Hour(result.eatingWindowStart)} -{' '}
              {formatTime12Hour(result.eatingWindowEnd)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {result.eatingHours} hours eating, {result.fastingHours} hours fasting
            </p>
          </div>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="neumorph-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Daily Timeline</h3>
        <div className="relative h-16 neumorph-inset rounded-full overflow-hidden">
          {/* Fasting period */}
          <div
            className="absolute top-0 left-0 h-full bg-blue-200 dark:bg-blue-900"
            style={{ width: `${(result.fastingHours / 24) * 100}%` }}
          >
            <div className="flex items-center justify-center h-full">
              <span className="text-xs font-medium text-blue-800 dark:text-blue-200">
                Fasting {result.fastingHours}h
              </span>
            </div>
          </div>
          {/* Eating period */}
          <div
            className="absolute top-0 h-full bg-green-200 dark:bg-green-900"
            style={{
              left: `${(result.fastingHours / 24) * 100}%`,
              width: `${(result.eatingHours / 24) * 100}%`,
            }}
          >
            <div className="flex items-center justify-center h-full">
              <span className="text-xs font-medium text-green-800 dark:text-green-200">
                Eating {result.eatingHours}h
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Calorie & Energy Metrics */}
      <div className="neumorph-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Energy Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">BMR</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{result.bmr}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">cal/day</p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">TDEE</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{result.tdee}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">cal/day</p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Target Calories</p>
            <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {result.dailyCalories}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">cal/day</p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Adjustment</p>
            <p
              className={`text-xl font-bold ${
                result.calorieAdjustment < 0
                  ? 'text-red-600 dark:text-red-400'
                  : result.calorieAdjustment > 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {result.calorieAdjustment > 0 ? '+' : ''}
              {result.calorieAdjustment}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">cal/day</p>
          </div>
        </div>
      </div>

      {/* Meal Planning */}
      <div className="neumorph-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Meal Planning</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Meals</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {result.mealsInWindow}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">per day</p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Calories per Meal</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {result.caloriesPerMeal}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">calories</p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Water Target</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {result.waterTarget}L
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">per day</p>
          </div>
        </div>

        {/* Meal Times */}
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Suggested Meal Times
          </p>
          <div className="flex flex-wrap gap-2">
            {result.mealTimes.map((time, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
              >
                Meal {index + 1}: {formatTime12Hour(time)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Macronutrient Targets */}
      <div className="neumorph-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Daily Nutrition Targets
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {result.proteinTarget}g
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {Math.round(((result.proteinTarget * 4) / result.dailyCalories) * 100)}%
            </p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {result.carbTarget}g
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {Math.round(((result.carbTarget * 4) / result.dailyCalories) * 100)}%
            </p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {result.fatTarget}g
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {Math.round(((result.fatTarget * 9) / result.dailyCalories) * 100)}%
            </p>
          </div>
          <div className="neumorph-inset p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Fiber</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {result.fiberTarget}g
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">minimum</p>
          </div>
        </div>
      </div>

      {/* Weight Loss Projections */}
      {result.weeklyProjections && result.weeklyProjections.length > 0 && (
        <div className="neumorph-card p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            12-Week Weight Loss Projection
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Week</th>
                  <th className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">
                    Weight ({weightUnit})
                  </th>
                  <th className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">
                    Total Loss ({weightUnit})
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.weeklyProjections.slice(0, 12).map((projection, index) => (
                  <tr
                    key={projection.week}
                    className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}
                  >
                    <td className="py-2 px-3 text-gray-900 dark:text-white">{projection.week}</td>
                    <td className="text-right py-2 px-3 text-gray-900 dark:text-white">
                      {weightUnit === 'lb'
                        ? (projection.projectedWeight * 2.20462).toFixed(1)
                        : projection.projectedWeight.toFixed(1)}
                    </td>
                    <td className="text-right py-2 px-3 text-green-600 dark:text-green-400 font-medium">
                      -
                      {weightUnit === 'lb'
                        ? (projection.cumulativeWeightLoss * 2.20462).toFixed(1)
                        : projection.cumulativeWeightLoss.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Projections account for metabolic adaptation over time. Individual results may vary.
          </p>
        </div>
      )}

      {/* Protocol Benefits */}
      <div className="neumorph-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Protocol Benefits
        </h3>
        <ul className="space-y-2">
          {result.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tips */}
      <div className="neumorph-card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Tips for Success
        </h3>
        <ul className="space-y-2">
          {result.tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
