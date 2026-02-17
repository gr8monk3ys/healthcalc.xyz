import React from 'react';
import type { BodyShapeResult } from '@/types/bodyShape';

interface BodyShapeResultDisplayProps {
  result: BodyShapeResult | null;
}

function formatShapeName(shape: string): string {
  return shape
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatSomatotypeName(somatotype: string): string {
  return somatotype
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
}

export default function BodyShapeResultDisplay({ result }: BodyShapeResultDisplayProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Body Shape Result</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your measurements to discover your body shape and somatotype.
        </p>
      </div>
    );
  }

  return (
    <div
      id="body-shape-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Body Shape Results</h2>

      {/* Body Shape */}
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Body Shape</p>
        <p className="text-3xl font-bold text-accent">{formatShapeName(result.bodyShape)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{result.shapeDescription}</p>
      </div>

      {/* Somatotype */}
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Somatotype</p>
        <p className="text-3xl font-bold text-accent">{formatSomatotypeName(result.somatotype)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {result.somatotypeDescription}
        </p>
      </div>

      {/* Ratios */}
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Body Ratios</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Bust-to-Waist</p>
            <p className="text-lg font-bold text-accent">{result.bustToWaistRatio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Waist-to-Hip</p>
            <p className="text-lg font-bold text-accent">{result.waistToHipRatio}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Bust-to-Hip</p>
            <p className="text-lg font-bold text-accent">{result.bustToHipRatio}</p>
          </div>
        </div>
      </div>

      {/* Health Implications */}
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Health Implications
        </p>
        <ul className="space-y-1">
          {result.healthImplications.map((item, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
              <span className="text-accent mr-2 mt-0.5" aria-hidden="true">
                *
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Exercise Recommendations */}
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Exercise Recommendations
        </p>
        <ul className="space-y-1">
          {result.exerciseRecommendations.map((item, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
              <span className="text-accent mr-2 mt-0.5" aria-hidden="true">
                *
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Nutrition Tips */}
      <div className="neumorph-inset p-5 rounded-lg">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Nutrition Tips</p>
        <ul className="space-y-1">
          {result.nutritionTips.map((item, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
              <span className="text-accent mr-2 mt-0.5" aria-hidden="true">
                *
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
