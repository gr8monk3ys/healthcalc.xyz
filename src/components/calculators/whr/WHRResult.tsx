'use client';

import React from 'react';
import { WHRResult } from '@/types/whr';
import { WHR_HEALTH_RISKS } from '@/constants/whr';

interface WHRResultDisplayProps {
  result: WHRResult;
  gender: 'male' | 'female';
}

const WHRResultDisplay: React.FC<WHRResultDisplayProps> = ({ result, gender }) => {
  // Format WHR value to 2 decimal places
  const formattedWHR = result.whr.toFixed(2);
  
  // Get gender-specific threshold
  const threshold = gender === 'male' ? 0.95 : 0.80;
  
  return (
    <div 
      id="whr-result" 
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Waist-to-Hip Ratio Results</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Waist-to-Hip Ratio</span>
          <span className="text-2xl font-bold">{formattedWHR}</span>
        </div>
        
        <div className="relative h-6 neumorph-inset rounded-full overflow-hidden mt-4">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-green-200" style={{ width: '25%' }}></div>
            <div className="h-full bg-yellow-100" style={{ width: '25%' }}></div>
            <div className="h-full bg-orange-100" style={{ width: '25%' }}></div>
            <div className="h-full bg-red-100" style={{ width: '25%' }}></div>
          </div>
          
          <div 
            className="absolute top-0 h-6 w-3 bg-accent rounded-full transform -translate-x-1/2 transition-all duration-500"
            style={{ 
              left: `${Math.min(Math.max((result.whr / (threshold * 1.5)) * 100, 0), 100)}%`,
            }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs mt-1">
          <span>Low Risk</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Very High</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Risk Category</h3>
        <div 
          className="neumorph-inset p-4 rounded-lg"
          style={{ borderLeft: `4px solid ${result.color}` }}
        >
          <p className="font-medium text-lg">{result.category}</p>
          <p className="text-sm text-gray-600 mt-1">{result.description}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">What This Means</h3>
        <p className="mb-2">
          Your waist-to-hip ratio of {formattedWHR} indicates a {result.healthRisk.toLowerCase()} risk level. 
          {result.whr > threshold ? (
            <span> Having a higher ratio means you carry more weight around your waist (apple-shaped) than your hips and thighs (pear-shaped).</span>
          ) : (
            <span> Your ratio indicates a healthier fat distribution pattern with less fat concentrated around your waist.</span>
          )}
        </p>
        
        {result.whr > threshold && (
          <div className="mt-4">
            <h4 className="font-medium">Health Risks Associated with Higher WHR</h4>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {WHR_HEALTH_RISKS.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Recommendations</h3>
        {result.whr > threshold ? (
          <div>
            <p className="mb-2">To improve your waist-to-hip ratio:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Focus on exercises that target abdominal fat, like cardio and core workouts</li>
              <li>Maintain a balanced diet rich in fruits, vegetables, lean proteins, and whole grains</li>
              <li>Reduce consumption of processed foods, sugary drinks, and alcohol</li>
              <li>Manage stress levels through meditation, yoga, or other relaxation techniques</li>
              <li>Aim for 7-9 hours of quality sleep each night</li>
              <li>Consider consulting with a healthcare provider for personalized advice</li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="mb-2">To maintain your healthy waist-to-hip ratio:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Continue with regular physical activity, including both cardio and strength training</li>
              <li>Maintain your balanced diet and healthy eating habits</li>
              <li>Stay hydrated and get adequate sleep</li>
              <li>Monitor your measurements periodically to track any changes</li>
            </ul>
          </div>
        )}
        <p className="text-sm text-gray-600 mt-4">
          Note: WHR is one of several metrics to assess health risks. For a comprehensive assessment, consider using other calculators like BMI, ABSI, or Body Fat Percentage, and consult with healthcare professionals.
        </p>
      </div>
    </div>
  );
};

export default WHRResultDisplay;
