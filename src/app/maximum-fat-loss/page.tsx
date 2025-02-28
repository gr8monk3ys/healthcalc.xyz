'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function MaximumFatLossCalculator() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Maximum Fat Loss Calculator</h1>
        <p className="text-gray-600">
          Find the optimal calorie intake for maximum fat loss while preserving muscle mass
        </p>
      </div>

      <Card className="p-6 mb-8">
        <p className="text-center text-lg">
          This calculator is coming soon! Check back later for a complete implementation.
        </p>
      </Card>

      <div className="mt-12 space-y-6">
        <Accordion title="What is Maximum Fat Loss?">
          <p className="mb-4">
            Maximum fat loss refers to the largest calorie deficit you can create while primarily losing fat, not muscle. This calculator determines your optimal calorie intake based on your body's ability to mobilize fat stores.
          </p>
          <p>
            Unlike general weight loss calculators, this tool focuses specifically on preserving lean mass while maximizing fat loss.
          </p>
        </Accordion>

        <Accordion title="The Science Behind Maximum Fat Loss">
          <div className="space-y-4">
            <p>
              Research by Dr. Alpert published in the International Journal of Obesity established that your body can only mobilize about 22-31 calories per pound of body fat per day. This means:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>If your calorie deficit exceeds this limit, you'll likely lose muscle along with fat</li>
              <li>The more body fat you have, the larger deficit you can sustain without muscle loss</li>
              <li>As you lose fat, your maximum sustainable deficit decreases</li>
            </ul>
            
            <p>
              For example, someone with 40 pounds of body fat can theoretically mobilize about 880 calories per day from fat stores (40 lbs × 22 kcal/lb). A larger deficit would likely result in muscle loss.
            </p>
          </div>
        </Accordion>

        <Accordion title="Understanding Your Results">
          <div className="space-y-4">
            <p>
              The calculator provides:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Your TDEE (Total Daily Energy Expenditure):</span> The calories you burn daily
              </li>
              <li>
                <span className="font-medium">Maximum sustainable deficit:</span> Based on your body fat percentage
              </li>
              <li>
                <span className="font-medium">Optimal calorie intake:</span> TDEE minus your maximum sustainable deficit
              </li>
              <li>
                <span className="font-medium">Expected fat loss rate:</span> How quickly you can expect to lose fat following this approach
              </li>
            </ul>
            
            <p className="font-medium">Important notes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>This approach prioritizes fat loss quality over speed</li>
              <li>The calculator requires your body fat percentage for accurate results (you can estimate this using our Body Fat Calculator)</li>
              <li>As you lose fat, your maximum deficit decreases, so recalculate periodically</li>
              <li>Even with optimal calorie intake, adequate protein (0.8-1g per pound of lean mass) is essential for muscle preservation</li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="Benefits of This Approach">
          <div className="space-y-4">
            <p>
              Following the maximum fat loss approach offers several advantages:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Preserved muscle mass:</span> Maintaining lean tissue keeps your metabolism higher
              </li>
              <li>
                <span className="font-medium">Better body composition:</span> You'll look leaner at the same weight compared to rapid weight loss approaches
              </li>
              <li>
                <span className="font-medium">Improved strength retention:</span> Less muscle loss means better performance in physical activities
              </li>
              <li>
                <span className="font-medium">More sustainable:</span> The deficit is tailored to your body's capabilities, making it easier to adhere to
              </li>
              <li>
                <span className="font-medium">Reduced risk of weight regain:</span> Preserving muscle and avoiding metabolic adaptation reduces rebound weight gain
              </li>
            </ul>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
