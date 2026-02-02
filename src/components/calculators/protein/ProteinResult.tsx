'use client';

import React from 'react';
import { ProteinResult as ProteinResultType } from '@/types/protein';
import { PROTEIN_SOURCES } from '@/constants/protein';

interface ProteinResultProps {
  result: ProteinResultType;
  weightUnit: 'kg' | 'lb';
}

const ProteinResult: React.FC<ProteinResultProps> = ({ result, weightUnit }) => {
  // Filter protein sources for display (top sources)
  const topProteinSources = PROTEIN_SOURCES.filter(source => source.proteinPer100g >= 20).slice(
    0,
    6
  );

  return (
    <div
      id="protein-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Daily Protein Needs</h2>

      {/* Main Result */}
      <div className="neumorph-inset p-6 rounded-lg mb-6 text-center">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Recommended Daily Protein
        </h3>
        <p className="text-4xl font-bold mb-2" style={{ color: result.color }}>
          {result.dailyProteinGrams}g
        </p>
        <p className="text-sm" style={{ color: result.color }}>
          {result.recommendation}
        </p>
      </div>

      {/* Protein Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Protein Range</h3>
          <p className="text-xl font-bold">
            {result.minProteinGrams}g - {result.maxProteinGrams}g
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Minimum to maximum recommended
          </p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Protein Ratio</h3>
          <p className="text-xl font-bold">
            {weightUnit === 'kg' ? `${result.proteinPerKg}g/kg` : `${result.proteinPerLb}g/lb`}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Per {weightUnit === 'kg' ? 'kilogram' : 'pound'} of body weight
          </p>
        </div>
      </div>

      {/* Protein Per Meal */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Protein Per Meal</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="neumorph-inset p-3 rounded-lg text-center">
            <p className="text-lg font-bold">{result.proteinPerMeal.threeMeals}g</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">3 meals/day</p>
          </div>
          <div className="neumorph-inset p-3 rounded-lg text-center">
            <p className="text-lg font-bold">{result.proteinPerMeal.fourMeals}g</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">4 meals/day</p>
          </div>
          <div className="neumorph-inset p-3 rounded-lg text-center">
            <p className="text-lg font-bold">{result.proteinPerMeal.fiveMeals}g</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">5 meals/day</p>
          </div>
        </div>
      </div>

      {/* Calorie Contribution */}
      <div className="neumorph-inset p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Calories from Protein</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Protein provides 4 calories per gram
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{result.proteinCalories} kcal</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ~{Math.round((result.proteinCalories / 2000) * 100)}% of 2000 kcal diet
            </p>
          </div>
        </div>
      </div>

      {/* Top Protein Sources */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">High-Protein Food Sources</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {topProteinSources.map((source, index) => (
            <div key={index} className="neumorph-inset p-3 rounded-lg">
              <p className="font-medium text-sm">{source.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {source.proteinPer100g}g per 100g
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Meet Your Goal */}
      <div>
        <h3 className="font-medium mb-2">Meeting Your Protein Goal</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          To consume {result.dailyProteinGrams}g of protein daily, you could eat approximately:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>{Math.round((result.dailyProteinGrams / 31) * 100)}g of chicken breast</li>
          <li>
            {Math.round(result.dailyProteinGrams / 13)} whole eggs (
            {Math.round(result.dailyProteinGrams / 13) * 75}g)
          </li>
          <li>{Math.round((result.dailyProteinGrams / 10) * 100)}g of Greek yogurt</li>
          <li>
            {Math.round(result.dailyProteinGrams / 25)} scoops of whey protein (~
            {Math.round(result.dailyProteinGrams / 25) * 30}g)
          </li>
        </ul>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Note: Combine multiple protein sources throughout the day for optimal results. Aim for
          20-40g of protein per meal to maximize muscle protein synthesis.
        </p>
      </div>
    </div>
  );
};

export default ProteinResult;
