'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function ABSICalculator() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">A Body Shape Index (ABSI) Calculator</h1>
        <p className="text-gray-600">
          Calculate your ABSI to assess health risks related to body shape and fat distribution
        </p>
      </div>

      <Card className="p-6 mb-8">
        <p className="text-center text-lg">
          This calculator is coming soon! Check back later for a complete implementation.
        </p>
      </Card>

      <div className="mt-12 space-y-6">
        <Accordion title="What is ABSI?">
          <p className="mb-4">
            A Body Shape Index (ABSI) is a metric developed in 2012 that combines waist circumference with BMI and height to better predict mortality risk. ABSI focuses on the health risks associated with central obesity (excess abdominal fat).
          </p>
          <p>
            Unlike BMI, which treats all body weight equally, ABSI specifically accounts for the concentration of body fat in the abdominal area, which is associated with higher health risks.
          </p>
        </Accordion>

        <Accordion title="Why ABSI Matters">
          <div className="space-y-4">
            <p>
              BMI doesn't tell you anything about fat distribution. Two people with the same BMI can have very different body shapes—one might have an "apple-shaped" body (fat concentrated around the waist) while another has a "pear-shaped" body (fat concentrated in the hips and thighs).
            </p>
            
            <p>
              Research has shown that abdominal fat (measured by waist circumference) is more strongly linked to health risks than fat in other areas of the body. ABSI was developed to address this limitation of BMI by incorporating waist circumference relative to a person's height and BMI.
            </p>
            
            <p>
              Studies have found that a higher ABSI correlates with increased mortality risk, even in people with normal BMI values. This makes it a valuable complementary measure to traditional body composition metrics.
            </p>
          </div>
        </Accordion>

        <Accordion title="How to Measure Waist Circumference">
          <div className="space-y-4">
            <p>
              It's very important to take an accurate waist measurement for calculating ABSI:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Stand up straight and breathe normally</li>
              <li>Find the top of your hip bones and the bottom of your ribs</li>
              <li>Place the measuring tape midway between these points (usually at the level of your navel)</li>
              <li>Wrap the tape around your waist, keeping it parallel to the floor</li>
              <li>Measure after breathing out normally (don't suck in your stomach)</li>
              <li>Ensure the tape is snug but not digging into your skin</li>
            </ol>
            
            <p>
              Use a flexible, non-stretchable measuring tape for the most accurate results.
            </p>
          </div>
        </Accordion>

        <Accordion title="Understanding Your ABSI Result">
          <div className="space-y-4">
            <p>
              ABSI is typically expressed as a z-score, which compares your value to the average for your age and sex:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">ABSI z-score below -1:</span> Lower than average risk
              </li>
              <li>
                <span className="font-medium">ABSI z-score between -1 and 1:</span> Average risk
              </li>
              <li>
                <span className="font-medium">ABSI z-score above 1:</span> Higher than average risk
              </li>
            </ul>
            
            <p>
              The further your ABSI z-score is above zero, the higher your predicted health risk. Research has shown that an above-average ABSI is associated with substantially higher risk of premature death.
            </p>
            
            <p className="font-medium mt-4">Important notes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>ABSI should be used alongside other health metrics, not as a standalone measure</li>
              <li>The calculator provides an estimate—individual health risks depend on many factors</li>
              <li>Always consult healthcare professionals for personalized health advice</li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="ABSI vs. Other Body Composition Metrics">
          <div className="space-y-4">
            <p>
              Several metrics are used to assess body composition and health risks:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">BMI (Body Mass Index):</span> Measures overall weight relative to height, but doesn't distinguish between fat and muscle or consider fat distribution
              </li>
              <li>
                <span className="font-medium">Waist Circumference:</span> Measures abdominal fat directly, but doesn't account for overall body size
              </li>
              <li>
                <span className="font-medium">Waist-to-Hip Ratio:</span> Compares waist and hip circumferences to assess fat distribution pattern
              </li>
              <li>
                <span className="font-medium">ABSI:</span> Combines waist circumference with height and weight to specifically assess the health risk of central obesity
              </li>
              <li>
                <span className="font-medium">Body Fat Percentage:</span> Measures the actual proportion of fat in your body, regardless of where it's distributed
              </li>
            </ul>
            
            <p>
              For the most comprehensive assessment, consider using multiple metrics. For example, check your BMI, ABSI, and body fat percentage to get a more complete picture of your body composition and health risks.
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
