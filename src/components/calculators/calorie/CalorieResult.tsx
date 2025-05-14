import React from 'react';
import type { CalorieResult } from '@/types/calorie';

interface CalorieResultProps {
  result: CalorieResult | null;
}

export default function CalorieResult({ result }: CalorieResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Daily Calorie Targets</h2>
        <p className="text-gray-600">Enter your details to see your calorie needs.</p>
      </div>
    );
  }

  return (
    <div
      id="calorie-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
      tabIndex={-1}
      aria-live="polite"
      role="region"
      aria-label="Daily Calorie Targets"
    >
      <h2 className="text-xl font-semibold mb-4">Daily Calorie Targets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Basal Metabolic Rate
          </h3>
          <p className="text-2xl font-bold">{result.bmr} calories/day</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Calories your body burns at complete rest
          </p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Maintenance Calories
          </h3>
          <p className="text-2xl font-bold">{result.tdee} calories/day</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Total calories burned daily with activity
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="neumorph-inset p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Maintain Weight</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Estimated maintenance</p>
            </div>
            <p className="text-xl font-bold">{result.dailyCalories.maintain} calories</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Weight Loss Targets</h4>
          <div className="space-y-2">
            <div className="neumorph-inset p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Mild loss</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">~0.25 kg (0.5 lb) / week</p>
              </div>
              <p className="text-lg font-bold">{result.dailyCalories.mildLoss} calories</p>
            </div>
            <div className="neumorph-inset p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Moderate loss</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">~0.5 kg (1 lb) / week</p>
              </div>
              <p className="text-lg font-bold">{result.dailyCalories.moderateLoss} calories</p>
            </div>
            <div className="neumorph-inset p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Aggressive loss</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">~0.75 kg (1.5 lb) / week</p>
              </div>
              <p className="text-lg font-bold">{result.dailyCalories.extremeLoss} calories</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Weight Gain Targets</h4>
          <div className="space-y-2">
            <div className="neumorph-inset p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Lean gain</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">~0.25 kg (0.5 lb) / week</p>
              </div>
              <p className="text-lg font-bold">{result.dailyCalories.mildGain} calories</p>
            </div>
            <div className="neumorph-inset p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Moderate gain</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">~0.5 kg (1 lb) / week</p>
              </div>
              <p className="text-lg font-bold">{result.dailyCalories.moderateGain} calories</p>
            </div>
            <div className="neumorph-inset p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">Aggressive gain</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">~0.75 kg (1.5 lb) / week</p>
              </div>
              <p className="text-lg font-bold">{result.dailyCalories.extremeGain} calories</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
        These targets are estimates. Track progress for 2-3 weeks and adjust by 100-200 calories if
        your weight trend is not moving as expected.
      </p>
    </div>
  );
}
