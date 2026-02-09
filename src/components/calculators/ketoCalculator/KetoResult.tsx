/**
 * Keto Result Display Component
 */

import React from 'react';
import Card from '@/components/ui/Card';
import ResultCard from '@/components/ui/ResultCard';
import { KetoResult } from '@/types/ketoCalculator';
import { KETO_TYPE_INFO, KETO_FOOD_EXAMPLES } from '@/constants/ketoCalculator';

interface KetoResultDisplayProps {
  result: KetoResult;
  ketoType: 'standard' | 'targeted' | 'cyclical';
}

export default function KetoResultDisplay({ result, ketoType }: KetoResultDisplayProps) {
  const ketoTypeInfo = KETO_TYPE_INFO[ketoType];

  return (
    <div className="space-y-6">
      {/* Main Macro Pie Chart */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Keto Macros</h2>
        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
          {/* CSS-based Pie Chart */}
          <div className="relative w-48 h-48">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  #10b981 0% ${result.fatPercentage}%,
                  #3b82f6 ${result.fatPercentage}% ${result.fatPercentage + result.proteinPercentage}%,
                  #f59e0b ${result.fatPercentage + result.proteinPercentage}% 100%
                )`,
              }}
            />
            <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {result.dailyCalories}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">calories/day</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <div>
                <div className="font-semibold">
                  Fat: {result.fatGrams}g ({result.fatPercentage}%)
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {result.fatCalories} calories
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <div>
                <div className="font-semibold">
                  Protein: {result.proteinGrams}g ({result.proteinPercentage}%)
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {result.proteinCalories} calories
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded"></div>
              <div>
                <div className="font-semibold">
                  Net Carbs: {result.netCarbGrams}g ({result.netCarbPercentage}%)
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {result.netCarbCalories} calories
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fiber Target: <span className="font-semibold">{result.fiberTarget}g</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Important Notes
              </h3>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
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
          title="Daily Calories"
          value={`${result.dailyCalories}`}
          description="Adjusted for your goal"
          unit="kcal"
        />
        <ResultCard
          title="Current TDEE"
          value={`${result.tdee}`}
          description="Maintenance calories"
          unit="kcal"
        />
        <ResultCard
          title="Net Carbs Limit"
          value={`${result.netCarbGrams}`}
          description="Stay under this daily"
          unit="grams"
        />
        <ResultCard
          title="Protein Target"
          value={`${result.proteinGrams}`}
          description="Preserve muscle mass"
          unit="grams"
        />
      </div>

      {/* Keto Type Info */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-3">{ketoTypeInfo.label}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{ketoTypeInfo.description}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{ketoTypeInfo.details}</p>
      </Card>

      {/* Recommendation */}
      <Card className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
        <h3 className="text-lg font-semibold mb-3">Personalized Recommendation</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {result.recommendation}
        </p>
      </Card>

      {/* Food Examples */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold mb-4">Keto Food Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Healthy Fats</h4>
            <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
              {KETO_FOOD_EXAMPLES.fats.map((food, index) => (
                <li key={index}>• {food}</li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Quality Proteins
            </h4>
            <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
              {KETO_FOOD_EXAMPLES.proteins.map((food, index) => (
                <li key={index}>• {food}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
              Low-Carb Veggies
            </h4>
            <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
              {KETO_FOOD_EXAMPLES.carbs.map((food, index) => (
                <li key={index}>• {food}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
        <h3 className="text-lg font-semibold mb-3">Keto Success Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>
              Track your macros carefully during the first 2-4 weeks until you learn portion sizes
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>
              Drink plenty of water and supplement electrolytes to avoid the &quot;keto flu&quot;
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Test your ketone levels weekly using blood, breath, or urine strips</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>
              Focus on whole, nutrient-dense foods rather than processed &quot;keto&quot; products
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Give your body 2-4 weeks to fully adapt before judging results</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span>Prioritize sleep and stress management for optimal ketone production</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
