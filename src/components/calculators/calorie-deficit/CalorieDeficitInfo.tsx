/**
 * Calorie Deficit Info Component
 * Displays information before calculation
 */

import React from 'react';
import Card from '@/components/ui/Card';

export default function CalorieDeficitInfo() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The Calorie Deficit Calculator helps you plan your weight loss journey by calculating how
          long it will take to reach your goal weight based on your chosen calorie deficit.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Enter your details and select a deficit level to see personalized projections, calorie
          targets, and nutritional recommendations.
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">What You'll Get</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Weight Loss Timeline</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                See exactly when you'll reach your goal weight
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Daily Calorie Target</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Your personalized calorie goal for weight loss
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Weekly Progress Chart</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Visual projection of your weight loss over time
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Nutritional Guidance</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Protein, water, and minimum calorie recommendations
              </div>
            </div>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
          Choose Your Deficit Level
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">Mild (250-500 cal/day)</div>
            <div className="text-blue-700 dark:text-blue-300">
              Best for sustainable weight loss and muscle preservation
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">Moderate (500-750 cal/day)</div>
            <div className="text-blue-700 dark:text-blue-300">
              Balanced approach for steady progress
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">Aggressive (750-1000 cal/day)</div>
            <div className="text-blue-700 dark:text-blue-300">
              Faster results, but requires careful monitoring
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
