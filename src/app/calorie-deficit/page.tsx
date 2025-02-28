'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function CalorieDeficitCalculator() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Calorie Deficit Calculator</h1>
        <p className="text-gray-600">
          Discover how long it will take to reach your goal weight with different calorie deficits
        </p>
      </div>

      <Card className="p-6 mb-8">
        <p className="text-center text-lg">
          This calculator is coming soon! Check back later for a complete implementation.
        </p>
      </Card>

      <div className="mt-12 space-y-6">
        <Accordion title="What is a Calorie Deficit?">
          <p className="mb-4">
            A calorie deficit occurs when you consume fewer calories than your body burns. This forces your body to use stored energy (primarily fat) for fuel, resulting in weight loss.
          </p>
          <p>
            For example, if your body burns 2,500 calories per day and you consume 2,000 calories, you're in a 500-calorie deficit.
          </p>
        </Accordion>

        <Accordion title="The Science of Weight Loss">
          <div className="space-y-4">
            <p>
              While the old rule of "3,500 calories equals one pound of fat" is commonly cited, the reality is more complex. Your body adapts to calorie restriction over time, and weight loss isn't linear.
            </p>
            
            <p>
              This calculator uses an advanced mathematical model developed by researchers at the National Institutes of Health that accounts for:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>Metabolic adaptation (your body becoming more efficient as you lose weight)</li>
              <li>Changes in body composition (fat vs. lean mass)</li>
              <li>The non-linear nature of weight loss over time</li>
            </ul>
            
            <p>
              This provides a more accurate prediction than simple calorie counting methods.
            </p>
          </div>
        </Accordion>

        <Accordion title="Safe Calorie Deficits">
          <div className="space-y-4">
            <p>
              While larger deficits lead to faster weight loss, there are limits to what's healthy and sustainable:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Minimum calorie intake:</span> Women should generally not consume less than 1,200 calories per day, and men not less than 1,500 calories per day, to ensure adequate nutrition.
              </li>
              <li>
                <span className="font-medium">Moderate deficits (500-1,000 calories/day):</span> Generally safe and sustainable for most people, resulting in 1-2 pounds of weight loss per week.
              </li>
              <li>
                <span className="font-medium">Large deficits (over 1,000 calories/day):</span> May lead to faster weight loss but can also cause:
                <ul className="list-disc pl-5 mt-1">
                  <li>Muscle loss</li>
                  <li>Nutrient deficiencies</li>
                  <li>Metabolic slowdown</li>
                  <li>Increased hunger and difficulty adhering to the diet</li>
                </ul>
              </li>
            </ul>
            
            <p>
              The most effective weight loss plan is one you can maintain consistently over time, even if progress is slower.
            </p>
          </div>
        </Accordion>

        <Accordion title="How to Use Your Results">
          <div className="space-y-4">
            <p>
              When this calculator is fully implemented, it will provide:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Your TDEE (Total Daily Energy Expenditure):</span> The calories you burn daily
              </li>
              <li>
                <span className="font-medium">Weight loss projections:</span> How long it will take to reach your goal weight at different calorie deficits
              </li>
              <li>
                <span className="font-medium">Recommended calorie intake:</span> Based on your chosen deficit
              </li>
              <li>
                <span className="font-medium">Graphical representation:</span> Visual chart showing your projected weight loss over time
              </li>
            </ul>
            
            <p>
              You can use these results to:
            </p>
            
            <ul className="list-disc pl-5 space-y-1">
              <li>Set realistic weight loss goals and timelines</li>
              <li>Choose a calorie deficit that balances speed with sustainability</li>
              <li>Plan your diet and exercise regimen accordingly</li>
              <li>Track your progress against the projected timeline</li>
            </ul>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
