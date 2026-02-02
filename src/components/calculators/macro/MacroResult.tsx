'use client';

import React from 'react';
import { MacroResult as MacroResultType } from '@/types/macro';

interface MacroResultProps {
  result: MacroResultType;
}

/**
 * Displays the calculated macronutrient results
 * Shows protein, carbs, fat in grams and percentages with visual breakdown
 */
const MacroResult: React.FC<MacroResultProps> = ({ result }) => {
  const { protein, carbs, fat, targetCalories, bmr, tdee, goal, perMeal } = result;

  /**
   * Gets the display name for the goal
   */
  const getGoalLabel = (): string => {
    switch (goal) {
      case 'weight_loss':
        return 'Weight Loss';
      case 'maintenance':
        return 'Maintenance';
      case 'muscle_gain':
        return 'Muscle Gain';
      case 'custom':
        return 'Custom';
      default:
        return 'Maintenance';
    }
  };

  /**
   * Gets the color class for each macro
   */
  const getMacroColor = (macro: 'protein' | 'carbs' | 'fat'): string => {
    switch (macro) {
      case 'protein':
        return 'bg-blue-500';
      case 'carbs':
        return 'bg-green-500';
      case 'fat':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      id="macro-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Macro Results</h2>

      {/* Calorie Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">BMR</h3>
          <p className="text-2xl font-bold">{bmr}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">calories/day at rest</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">TDEE</h3>
          <p className="text-2xl font-bold">{tdee}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">total daily expenditure</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg bg-primary/5">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Target Calories</h3>
          <p className="text-2xl font-bold text-primary">{targetCalories}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{getGoalLabel()} goal</p>
        </div>
      </div>

      {/* Visual Macro Bar */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Macro Distribution</h3>
        <div className="h-8 rounded-lg overflow-hidden flex">
          <div
            className={`${getMacroColor('protein')} flex items-center justify-center text-white text-sm font-medium`}
            style={{ width: `${protein.percentage}%` }}
          >
            {protein.percentage}%
          </div>
          <div
            className={`${getMacroColor('carbs')} flex items-center justify-center text-white text-sm font-medium`}
            style={{ width: `${carbs.percentage}%` }}
          >
            {carbs.percentage}%
          </div>
          <div
            className={`${getMacroColor('fat')} flex items-center justify-center text-white text-sm font-medium`}
            style={{ width: `${fat.percentage}%` }}
          >
            {fat.percentage}%
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded ${getMacroColor('protein')}`}></span>
            Protein
          </span>
          <span className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded ${getMacroColor('carbs')}`}></span>
            Carbs
          </span>
          <span className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded ${getMacroColor('fat')}`}></span>
            Fat
          </span>
        </div>
      </div>

      {/* Detailed Macro Breakdown */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Daily Macro Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Protein */}
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Protein</h4>
            <p className="text-3xl font-bold">{protein.grams}g</p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <p>{protein.calories} calories</p>
              <p>{protein.percentage}% of total</p>
            </div>
          </div>

          {/* Carbohydrates */}
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="text-lg font-semibold text-green-600 dark:text-green-400">Carbs</h4>
            <p className="text-3xl font-bold">{carbs.grams}g</p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <p>{carbs.calories} calories</p>
              <p>{carbs.percentage}% of total</p>
            </div>
          </div>

          {/* Fat */}
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">Fat</h4>
            <p className="text-3xl font-bold">{fat.grams}g</p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <p>{fat.calories} calories</p>
              <p>{fat.percentage}% of total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Per Meal Breakdown */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Per Meal (3 meals/day)</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
              <p className="text-lg font-semibold">{perMeal.calories}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
              <p className="text-lg font-semibold text-blue-600">{perMeal.protein}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
              <p className="text-lg font-semibold text-green-600">{perMeal.carbs}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fat</p>
              <p className="text-lg font-semibold text-yellow-600">{perMeal.fat}g</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div>
        <h3 className="font-medium mb-2">Tips for Hitting Your Macros</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <strong>Protein:</strong> Include a protein source at every meal - chicken, fish, eggs,
            tofu, or legumes.
          </li>
          <li>
            <strong>Carbs:</strong> Choose complex carbs like whole grains, fruits, and vegetables
            for sustained energy.
          </li>
          <li>
            <strong>Fat:</strong> Focus on healthy fats from avocados, nuts, olive oil, and fatty
            fish.
          </li>
          <li>Track your food intake with an app to ensure you are hitting your targets.</li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Note: These calculations are estimates based on standard formulas. Individual needs may
          vary. Adjust based on your progress and consult a healthcare professional for personalized
          advice.
        </p>
      </div>
    </div>
  );
};

export default MacroResult;
