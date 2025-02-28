'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function BodyFatCalculator() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Body Fat Calculator</h1>
        <p className="text-gray-600">
          Calculate your body fat percentage using various methods including Navy, skinfold, and BMI
        </p>
      </div>

      <Card className="p-6 mb-8">
        <p className="text-center text-lg">
          This calculator is coming soon! Check back later for a complete implementation.
        </p>
      </Card>

      <div className="mt-12 space-y-6">
        <Accordion title="What is Body Fat Percentage?">
          <p className="mb-4">
            Body fat percentage is the amount of fat mass in your body compared to your total body weight. It's a more accurate measure of fitness than BMI because it distinguishes between fat and lean mass (muscle, bone, organs, etc.).
          </p>
          <p>
            For example, a person with a lot of muscle might have a high BMI but a low body fat percentage, indicating they are fit rather than overweight.
          </p>
        </Accordion>

        <Accordion title="Methods of Measuring Body Fat">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">U.S. Navy Method</h3>
              <p>Uses measurements of waist, neck, and hip (for women) circumferences to estimate body fat. It's simple and requires only a tape measure.</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Skinfold Measurements</h3>
              <p>Uses calipers to measure the thickness of skin folds at specific body sites. More accurate than circumference methods but requires proper technique.</p>
            </div>
            
            <div>
              <h3 className="font-semibold">BMI-based Estimation</h3>
              <p>Uses height, weight, age, and sex to estimate body fat. Less accurate but requires no special equipment.</p>
            </div>
            
            <div>
              <h3 className="font-semibold">DEXA, Hydrostatic Weighing, BodPod</h3>
              <p>These are professional methods that provide the most accurate measurements but require specialized equipment.</p>
            </div>
          </div>
        </Accordion>

        <Accordion title="Healthy Body Fat Percentages">
          <div className="space-y-4">
            <p>Healthy body fat percentages vary by sex and age:</p>
            
            <div>
              <h3 className="font-semibold">For Men:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium">Essential fat:</span> 2-5%</li>
                <li><span className="font-medium">Athletes:</span> 6-13%</li>
                <li><span className="font-medium">Fitness:</span> 14-17%</li>
                <li><span className="font-medium">Average:</span> 18-24%</li>
                <li><span className="font-medium">Obese:</span> 25% and higher</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold">For Women:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium">Essential fat:</span> 10-13%</li>
                <li><span className="font-medium">Athletes:</span> 14-20%</li>
                <li><span className="font-medium">Fitness:</span> 21-24%</li>
                <li><span className="font-medium">Average:</span> 25-31%</li>
                <li><span className="font-medium">Obese:</span> 32% and higher</li>
              </ul>
            </div>
            
            <p>Note that very low body fat percentages can be unhealthy and may lead to health problems. Essential fat is necessary for normal physiological functions.</p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
