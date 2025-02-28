'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function WeightManagementCalculator() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Weight Management Calculator</h1>
        <p className="text-gray-600">
          Plan your weight loss with a target date and get daily calorie and macro recommendations
        </p>
      </div>

      <Card className="p-6 mb-8">
        <p className="text-center text-lg">
          This calculator is coming soon! Check back later for a complete implementation.
        </p>
      </Card>

      <div className="mt-12 space-y-6">
        <Accordion title="What is the Weight Management Calculator?">
          <p className="mb-4">
            The Weight Management Calculator helps you plan your weight loss or gain journey by setting a specific target date. It calculates the daily calories needed to reach your goal weight by your chosen date, along with macronutrient recommendations.
          </p>
          <p>
            Unlike the Calorie Deficit Calculator, which shows various deficit options, this tool focuses on a specific timeframe and provides a complete nutrition plan.
          </p>
        </Accordion>

        <Accordion title="How to Use This Calculator">
          <div className="space-y-4">
            <p>
              To get the most accurate results:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <span className="font-medium">Enter your current stats:</span> Your sex, age, height, weight, and activity level all affect your calorie needs.
              </li>
              <li>
                <span className="font-medium">Set a realistic goal weight:</span> Aim for a healthy weight for your height and build.
              </li>
              <li>
                <span className="font-medium">Choose a reasonable timeframe:</span> The calculator will automatically adjust if your goal requires an unhealthy calorie restriction.
              </li>
              <li>
                <span className="font-medium">Select a diet type:</span> This affects your macronutrient distribution (carbs, protein, fat).
              </li>
            </ol>
            
            <p>
              The calculator will provide your daily calorie target and macronutrient breakdown to reach your goal by the target date.
            </p>
          </div>
        </Accordion>

        <Accordion title="Understanding Your Results">
          <div className="space-y-4">
            <p>
              The calculator provides several key pieces of information:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Daily calorie target:</span> The number of calories to consume each day to reach your goal by the target date.
              </li>
              <li>
                <span className="font-medium">Macronutrient breakdown:</span> The grams of protein, carbohydrates, and fat to aim for daily.
              </li>
              <li>
                <span className="font-medium">Projected timeline:</span> How your weight is expected to change over time following this plan.
              </li>
            </ul>
            
            <p className="font-medium">Important notes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>If your goal requires eating fewer than 1,200 calories (women) or 1,500 calories (men), the calculator will extend your timeline to ensure a safe minimum intake.</li>
              <li>Weight loss is rarely perfectly linear—expect some fluctuations even when following the plan exactly.</li>
              <li>As you lose weight, your calorie needs decrease. Consider recalculating every 10-15 pounds lost.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="Macronutrient Distribution">
          <div className="space-y-4">
            <p>
              Different diet types emphasize different macronutrient ratios:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Balanced:</span> 40% carbs, 30% protein, 30% fat
                <p className="text-sm mt-1">A well-rounded approach suitable for most people.</p>
              </li>
              <li>
                <span className="font-medium">Low-carb:</span> 25% carbs, 40% protein, 35% fat
                <p className="text-sm mt-1">May help control hunger and blood sugar levels.</p>
              </li>
              <li>
                <span className="font-medium">High-protein:</span> 30% carbs, 40% protein, 30% fat
                <p className="text-sm mt-1">Supports muscle preservation during weight loss and may increase satiety.</p>
              </li>
              <li>
                <span className="font-medium">Ketogenic:</span> 5% carbs, 30% protein, 65% fat
                <p className="text-sm mt-1">Very low carb approach that shifts metabolism to primarily burn fat.</p>
              </li>
            </ul>
            
            <p>
              The calculator will provide specific gram amounts for each macronutrient based on your daily calorie target and chosen diet type.
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
