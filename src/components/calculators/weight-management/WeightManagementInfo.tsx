/**
 * Weight Management Info Component
 * Displays information before calculation
 */

import React from 'react';
import Card from '@/components/ui/Card';

export default function WeightManagementInfo() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The Weight Management Calculator creates a personalized nutrition plan to help you reach
          your goal weight by a specific target date. Unlike the Calorie Deficit Calculator, this
          tool focuses on a timeline-based approach.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Simply enter your current stats, goal weight, target date, and diet preference to get a
          complete daily nutrition plan with calorie and macronutrient targets.
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
              <div className="font-medium text-gray-900 dark:text-gray-100">Daily Calorie Target</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Precise calories needed to reach your goal by your target date
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
              <div className="font-medium text-gray-900 dark:text-gray-100">Macronutrient Breakdown</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Exact protein, carbs, and fat grams for your chosen diet type
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
              <div className="font-medium text-gray-900 dark:text-gray-100">Weekly Projection Chart</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Visual timeline of expected weight changes
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
              <div className="font-medium text-gray-900 dark:text-gray-100">Lifestyle Recommendations</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Water intake, sleep, and exercise guidance
              </div>
            </div>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
          Diet Type Options
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">Balanced (40/30/30)</div>
            <div className="text-blue-700 dark:text-blue-300">
              Well-rounded approach suitable for most people
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">Low-Carb (25/40/35)</div>
            <div className="text-blue-700 dark:text-blue-300">
              For blood sugar management and appetite control
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">High-Protein (30/40/30)</div>
            <div className="text-blue-700 dark:text-blue-300">
              Best for muscle building and preservation
            </div>
          </div>
          <div>
            <div className="font-medium text-blue-800 dark:text-blue-200">Ketogenic (5/30/65)</div>
            <div className="text-blue-700 dark:text-blue-300">
              Very low carb for metabolic optimization
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
