'use client';

import React from 'react';

interface BodyRecompResultProps {
  result: {
    dailyCalories: number;
    proteinGrams: number;
    fatGrams: number;
    carbGrams: number;
    trainingDayCalories: number;
    restDayCalories: number;
    estimatedWeeklyFatLoss: number;
    estimatedMonthlyMuscleGain: number;
    timelineWeeks: number;
    recommendation: string;
  };
}

const BodyRecompResult: React.FC<BodyRecompResultProps> = ({ result }) => {
  return (
    <div
      id="recomp-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Body Recomposition Plan</h2>

      {/* Calorie Cycling Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="neumorph-inset p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
            Training Day Calories
          </h3>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">
            {result.trainingDayCalories}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Higher calories to fuel performance and muscle growth
          </p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Rest Day Calories
          </h3>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
            {result.restDayCalories}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Lower calories to promote fat loss
          </p>
        </div>
      </div>

      {/* Average Daily Calories */}
      <div className="neumorph-inset p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Average Daily Calories
        </h3>
        <p className="text-2xl font-bold">{result.dailyCalories} calories/day</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Based on 4 training days and 3 rest days per week
        </p>
      </div>

      {/* Macronutrient Breakdown */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Daily Macronutrient Targets</h3>

        <div className="space-y-3">
          <div className="neumorph-inset p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-medium">Protein</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  For muscle growth and preservation
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{result.proteinGrams}g</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(((result.proteinGrams * 4) / result.dailyCalories) * 100).toFixed(0)}% of
                  calories
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${((result.proteinGrams * 4) / result.dailyCalories) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="neumorph-inset p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-medium">Fats</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  For hormone production and health
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{result.fatGrams}g</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(((result.fatGrams * 9) / result.dailyCalories) * 100).toFixed(0)}% of calories
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${((result.fatGrams * 9) / result.dailyCalories) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="neumorph-inset p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-medium">Carbohydrates</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  For energy and performance
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{result.carbGrams}g</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(((result.carbGrams * 4) / result.dailyCalories) * 100).toFixed(0)}% of calories
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${((result.carbGrams * 4) / result.dailyCalories) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Estimates */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Expected Progress</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="neumorph-inset p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Estimated Fat Loss
            </h4>
            <p className="text-2xl font-bold">
              {result.estimatedWeeklyFatLoss.toFixed(2)} lbs/week
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              ~{(result.estimatedWeeklyFatLoss * 4).toFixed(1)} lbs per month
            </p>
          </div>

          <div className="neumorph-inset p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Estimated Muscle Gain
            </h4>
            <p className="text-2xl font-bold">
              {result.estimatedMonthlyMuscleGain.toFixed(2)} lbs/month
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Based on training experience
            </p>
          </div>
        </div>

        <div className="neumorph-inset p-4 rounded-lg mt-4">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Recommended Timeline
          </h4>
          <p className="text-2xl font-bold">{result.timelineWeeks} weeks</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            For visible body composition changes
          </p>
        </div>
      </div>

      {/* Personalized Recommendation */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h3 className="font-medium mb-2 text-purple-900 dark:text-purple-100">
          Personalized Recommendation
        </h3>
        <p className="text-sm text-purple-800 dark:text-purple-200">{result.recommendation}</p>
      </div>

      {/* Important Notes */}
      <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h3 className="font-medium mb-2 text-yellow-900 dark:text-yellow-100">Important Notes</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
          <li>Consistency is key - track your intake and training religiously</li>
          <li>Adjust calories every 4-6 weeks based on progress and body weight changes</li>
          <li>Prioritize protein at every meal for optimal muscle protein synthesis</li>
          <li>Get 7-9 hours of sleep for recovery and hormone optimization</li>
          <li>Take progress photos and measurements - scale weight can be misleading</li>
          <li>If strength drops significantly, increase calories slightly</li>
        </ul>
      </div>
    </div>
  );
};

export default BodyRecompResult;
