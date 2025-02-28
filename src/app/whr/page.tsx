'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function WaistToHipRatioCalculator() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Waist-to-Hip Ratio Calculator</h1>
        <p className="text-gray-600">
          Calculate your waist-to-hip ratio to assess your body fat distribution and health risks
        </p>
      </div>

      <Card className="p-6 mb-8">
        <p className="text-center text-lg">
          This calculator is coming soon! Check back later for a complete implementation.
        </p>
      </Card>

      <div className="mt-12 space-y-6">
        <Accordion title="What is Waist-to-Hip Ratio?">
          <p className="mb-4">
            Waist-to-Hip Ratio (WHR) is a simple measurement that compares the circumference of your waist to the circumference of your hips. It's a quick way to assess how your body fat is distributed and the associated health risks.
          </p>
          <p>
            The formula is simple: WHR = Waist measurement ÷ Hip measurement
          </p>
        </Accordion>

        <Accordion title="Why Body Fat Distribution Matters">
          <div className="space-y-4">
            <p>
              The amount of fat, but more importantly, where that fat is stored on your body can significantly impact your health risk profile. There are two main body fat distribution patterns:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">"Apple" shape (central obesity):</span> Fat concentrated around the abdomen and waist
              </li>
              <li>
                <span className="font-medium">"Pear" shape (peripheral obesity):</span> Fat concentrated around the hips and thighs
              </li>
            </ul>
            
            <p>
              Research has consistently shown that central obesity ("apple" shape) is associated with higher risks for:
            </p>
            
            <ul className="list-disc pl-5 space-y-1">
              <li>Type 2 diabetes</li>
              <li>Heart disease</li>
              <li>High blood pressure</li>
              <li>Stroke</li>
              <li>Certain cancers</li>
            </ul>
            
            <p>
              This is because abdominal fat (especially visceral fat that surrounds organs) is more metabolically active and releases substances that can damage your health.
            </p>
          </div>
        </Accordion>

        <Accordion title="How to Measure Correctly">
          <div className="space-y-4">
            <p>
              For accurate WHR calculation, follow these measurement guidelines:
            </p>
            
            <div>
              <h3 className="font-semibold">Waist Measurement:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Stand up straight and breathe normally</li>
                <li>Find the narrowest part of your waist, typically just above your belly button</li>
                <li>Keep the tape measure snug but not tight against your skin</li>
                <li>Take the measurement at the end of a normal exhale</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold">Hip Measurement:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Stand with your feet together</li>
                <li>Measure around the widest part of your hips and buttocks</li>
                <li>Ensure the tape measure is parallel to the floor</li>
                <li>Keep the tape snug but not tight against your body</li>
              </ol>
            </div>
            
            <p>
              Use a flexible, non-stretchable measuring tape for both measurements, and record them in the same unit (inches or centimeters).
            </p>
          </div>
        </Accordion>

        <Accordion title="Understanding Your Results">
          <div className="space-y-4">
            <p>
              The World Health Organization (WHO) provides the following WHR thresholds for health risk assessment:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Gender</th>
                    <th className="py-2 px-4 text-left">Low Risk</th>
                    <th className="py-2 px-4 text-left">Moderate Risk</th>
                    <th className="py-2 px-4 text-left">High Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 px-4">Men</td>
                    <td className="py-2 px-4">Below 0.90</td>
                    <td className="py-2 px-4">0.90 - 0.99</td>
                    <td className="py-2 px-4">1.00 or higher</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Women</td>
                    <td className="py-2 px-4">Below 0.80</td>
                    <td className="py-2 px-4">0.80 - 0.84</td>
                    <td className="py-2 px-4">0.85 or higher</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p>
              Note that these are general guidelines, and individual health risks depend on many factors beyond WHR.
            </p>
          </div>
        </Accordion>

        <Accordion title="WHR vs. Other Body Composition Metrics">
          <div className="space-y-4">
            <p>
              WHR is one of several metrics used to assess body composition and health risks:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">BMI (Body Mass Index):</span> Measures overall weight relative to height, but doesn't distinguish between fat and muscle or consider fat distribution
              </li>
              <li>
                <span className="font-medium">Waist Circumference:</span> Measures abdominal fat directly, but doesn't account for overall body size
              </li>
              <li>
                <span className="font-medium">WHR (Waist-to-Hip Ratio):</span> Assesses fat distribution pattern by comparing waist and hip measurements
              </li>
              <li>
                <span className="font-medium">ABSI (A Body Shape Index):</span> A more complex metric that combines waist circumference with height and weight
              </li>
              <li>
                <span className="font-medium">Body Fat Percentage:</span> Measures the actual proportion of fat in your body
              </li>
            </ul>
            
            <p>
              Each metric has its strengths and limitations. For a comprehensive assessment, consider using multiple measurements and consulting with healthcare professionals.
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
