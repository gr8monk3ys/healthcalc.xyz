'use client';

import React from 'react';
import { GLP1Result, GLP1Medication, GLP1Goal } from '@/types/glp1Calculator';
import { MEDICATION_LABELS, GOAL_LABELS } from '@/constants/glp1Calculator';

interface GLP1ResultDisplayProps {
  result: GLP1Result;
  medication: GLP1Medication;
  goal: GLP1Goal;
}

const GLP1ResultDisplay: React.FC<GLP1ResultDisplayProps> = ({ result, medication, goal }) => {
  const calorieReduction = result.tdee - result.adjustedCalories;
  const calorieReductionPercent = Math.round((calorieReduction / result.tdee) * 100);

  const proteinCalories = Math.round(((result.proteinMinGrams + result.proteinMaxGrams) / 2) * 4);
  const fatCalories = result.fatGrams * 9;
  const carbCalories = result.carbGrams * 4;

  const monthlyLossMin = Math.round(result.expectedWeightLossPerWeek.min * 4.3 * 10) / 10;
  const monthlyLossMax = Math.round(result.expectedWeightLossPerWeek.max * 4.3 * 10) / 10;

  return (
    <div
      id="glp1-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your GLP-1 Nutrition Targets</h2>

      {/* Medication & Goal */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="neumorph-inset px-3 py-1 rounded-full text-sm font-medium">
          {MEDICATION_LABELS[medication]}
        </span>
        <span className="neumorph-inset px-3 py-1 rounded-full text-sm font-medium">
          {GOAL_LABELS[goal]}
        </span>
      </div>

      {/* Adjusted Daily Calories */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Adjusted Daily Calories</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-3xl font-bold">{result.adjustedCalories}</span>
            <span className="text-sm text-gray-600">kcal/day</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Baseline TDEE: {result.tdee} kcal</span>
            <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-medium">
              -{calorieReduction} kcal ({calorieReductionPercent}%)
            </span>
          </div>

          <div className="relative h-4 neumorph-inset rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-500"
              style={{
                width: `${Math.round((result.adjustedCalories / result.tdee) * 100)}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1 text-gray-600">
            <span>0 kcal</span>
            <span>TDEE: {result.tdee} kcal</span>
          </div>
        </div>
      </div>

      {/* Macro Breakdown */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Macro Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Protein */}
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-xs font-medium text-gray-600 mb-1">Protein</p>
            <p className="text-xl font-bold">
              {result.proteinMinGrams}-{result.proteinMaxGrams}g
            </p>
            <p className="text-xs text-gray-600">{proteinCalories} kcal</p>
            <p className="text-xs text-gray-600">{result.proteinPercentage}% of calories</p>
          </div>

          {/* Fat */}
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="text-xs font-medium text-gray-600 mb-1">Fat</p>
            <p className="text-xl font-bold">{result.fatGrams}g</p>
            <p className="text-xs text-gray-600">{fatCalories} kcal</p>
            <p className="text-xs text-gray-600">
              {Math.round((fatCalories / result.adjustedCalories) * 100)}% of calories
            </p>
          </div>

          {/* Carbs */}
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-xs font-medium text-gray-600 mb-1">Carbs</p>
            <p className="text-xl font-bold">{result.carbGrams}g</p>
            <p className="text-xs text-gray-600">{carbCalories} kcal</p>
            <p className="text-xs text-gray-600">
              {Math.round((carbCalories / result.adjustedCalories) * 100)}% of calories
            </p>
          </div>
        </div>
      </div>

      {/* Hydration */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Daily Hydration Target</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{result.hydrationLiters}L</p>
              <p className="text-xs text-gray-600">
                Minimum daily water intake (GLP-1 medications increase dehydration risk)
              </p>
            </div>
            <div className="text-4xl opacity-30" aria-hidden="true">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Expected Monthly Weight Loss */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Expected Monthly Weight Loss</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="text-xl font-bold">
            {monthlyLossMin} - {monthlyLossMax} kg/month
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Based on weekly loss of {result.expectedWeightLossPerWeek.min} -{' '}
            {result.expectedWeightLossPerWeek.max} kg. Individual results vary based on adherence,
            exercise, and metabolic factors.
          </p>
        </div>
      </div>

      {/* Nutrient Priorities */}
      {result.nutrientPriorities.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Nutrient Priorities on GLP-1 Therapy</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-2">
              {result.nutrientPriorities.map((priority, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Important Notes</h3>
          <div className="space-y-2">
            {result.warnings.map((warning, index) => (
              <div
                key={index}
                className="neumorph-inset p-3 rounded-lg border-l-4 border-amber-500"
              >
                <p className="text-sm">{warning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p>
          <strong>Disclaimer:</strong> This calculator provides general nutrition guidance for
          individuals on GLP-1 receptor agonist therapy. It is not a substitute for medical advice.
          Always consult your prescribing physician or registered dietitian before making
          significant dietary changes while on these medications.
        </p>
      </div>
    </div>
  );
};

export default GLP1ResultDisplay;
