'use client';

import React from 'react';
import { FFMIResult } from '@/types/ffmi';
import { FFMI_CATEGORIES, NATURAL_FFMI_LIMIT } from '@/constants/ffmi';

interface FFMIResultDisplayProps {
  result: FFMIResult;
}

const FFMIResultDisplay: React.FC<FFMIResultDisplayProps> = ({ result }) => {
  // Calculate gauge position (0-100%)
  const getGaugePosition = () => {
    const maxValue = 30; // Display range up to FFMI 30
    const position = Math.min(Math.max((result.adjustedFFMI / maxValue) * 100, 0), 100);
    return position;
  };

  // Get category description
  const getCategoryDescription = () => {
    const category = FFMI_CATEGORIES.find(cat => cat.name === result.category);
    return category?.description || '';
  };

  // Calculate natural limit gauge position
  const naturalLimitPosition = (NATURAL_FFMI_LIMIT / 30) * 100;

  return (
    <div
      id="ffmi-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your FFMI Results</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Adjusted FFMI</span>
          <span className="text-2xl font-bold">{result.adjustedFFMI}</span>
        </div>

        <div className="relative h-6 neumorph-inset rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-gray-200" style={{ width: '6%' }}></div>
            <div className="h-full bg-blue-200" style={{ width: '7%' }}></div>
            <div className="h-full bg-green-200" style={{ width: '7%' }}></div>
            <div className="h-full bg-yellow-200" style={{ width: '3%' }}></div>
            <div className="h-full bg-orange-200" style={{ width: '7%' }}></div>
            <div className="h-full bg-red-200" style={{ width: '7%' }}></div>
            <div className="h-full bg-red-300" style={{ width: '63%' }}></div>
          </div>

          {/* Natural limit marker */}
          <div
            className="absolute top-0 h-6 w-0.5 bg-black opacity-50"
            style={{ left: `${naturalLimitPosition}%` }}
            title="Natural Limit (~25)"
          ></div>

          {/* User's position marker */}
          <div
            className="absolute top-0 h-6 w-3 bg-accent rounded-full transform -translate-x-1/2 transition-all duration-500"
            style={{ left: `${getGaugePosition()}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs mt-1">
          <span>Below</span>
          <span>Avg</span>
          <span>Above</span>
          <span>Exc</span>
          <span>Sup</span>
          <span>Sus</span>
          <span>Enhanced</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Classification</h3>
        <div
          className="neumorph-inset p-4 rounded-lg"
          style={{ borderLeft: `4px solid ${result.categoryColor}` }}
        >
          <p className="font-medium text-lg">{result.category}</p>
          <p className="text-sm text-gray-600 mt-1">{getCategoryDescription()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">FFMI (Raw)</h3>
          <p className="text-2xl font-bold">{result.ffmi}</p>
          <p className="text-xs text-gray-500 mt-1">Unadjusted for height</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Adjusted FFMI</h3>
          <p className="text-2xl font-bold">{result.adjustedFFMI}</p>
          <p className="text-xs text-gray-500 mt-1">Normalized to 1.8m height</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Lean Mass</h3>
          <p className="text-2xl font-bold">
            {result.leanMass.toFixed(1)} {result.weightUnit}
          </p>
          <p className="text-xs text-gray-500 mt-1">Muscle, bone, organs, water</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Fat Mass</h3>
          <p className="text-2xl font-bold">
            {result.fatMass.toFixed(1)} {result.weightUnit}
          </p>
          <p className="text-xs text-gray-500 mt-1">Body fat weight</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Natural Potential Assessment</h3>
        <div
          className={`neumorph-inset p-4 rounded-lg ${result.isNatural ? 'bg-green-50' : 'bg-red-50'}`}
        >
          <p className="font-medium text-lg">
            {result.isNatural ? 'Within Natural Range' : 'Above Typical Natural Limit'}
          </p>
          <p className="text-sm text-gray-600 mt-1">{result.naturalLimit}</p>
          <p className="text-xs text-gray-500 mt-2">
            Natural limit (adjusted FFMI ~25) based on research by Kouri et al. (1995) comparing
            drug-free and steroid-using athletes.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Understanding Your FFMI</h3>
        <div className="text-sm space-y-2">
          <p>
            Fat-Free Mass Index (FFMI) measures muscle mass relative to height, similar to how BMI
            measures total body mass. The adjusted FFMI normalizes for height differences, making it
            a better comparison tool.
          </p>
          <p>
            {result.adjustedFFMI < 20
              ? 'Your FFMI suggests you have average or below-average muscle development. With consistent resistance training and proper nutrition, you have significant potential for muscle growth.'
              : result.adjustedFFMI < 23
                ? 'Your FFMI indicates good muscle development. You have built a solid foundation and can continue to make natural progress with dedicated training.'
                : result.adjustedFFMI < 25
                  ? 'Your FFMI shows excellent muscle development. You are approaching or at the natural muscular potential for most individuals with good genetics and training.'
                  : result.adjustedFFMI < 26
                    ? 'Your FFMI is at the upper limit of what is typically achievable naturally. While possible with exceptional genetics and years of training, this level may raise questions about natural status.'
                    : 'Your FFMI exceeds the typical natural limit established by research. This level is rarely achieved without performance-enhancing substances, though exceptional genetic outliers may exist.'}
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Note: FFMI is a statistical tool, not a definitive test. Factors like measurement
            accuracy, hydration, and individual genetics affect results. Use this as one indicator
            among many when assessing muscle development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FFMIResultDisplay;
