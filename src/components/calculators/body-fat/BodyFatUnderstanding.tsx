'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const BodyFatUnderstanding: React.FC = () => {
  return (
    <InfoSection title="Understanding Body Fat" className="mt-12">
      <p>
        Body fat percentage is a key indicator of health and fitness that goes beyond what a scale or BMI can tell you. Understanding your body composition can help you set more meaningful fitness goals and track your progress more effectively.
      </p>
      
      <h3 className="font-medium mt-4">Body Fat vs. Weight</h3>
      <p className="mb-2">
        Weight loss doesn't always mean fat loss. When you lose weight, you might be losing:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Body fat (the goal for most people)</li>
        <li>Muscle mass (usually undesirable)</li>
        <li>Water weight (temporary and fluctuates daily)</li>
        <li>Glycogen stores (carbohydrates stored in muscles and liver)</li>
      </ul>
      <p className="mt-2">
        By tracking body fat percentage instead of just weight, you can ensure you're losing fat while preserving muscle mass, which is crucial for long-term metabolic health.
      </p>
      
      <h3 className="font-medium mt-4">Fat Distribution Matters</h3>
      <p className="mb-2">
        Where your body stores fat is just as important as how much fat you have:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">Visceral fat</span> (around organs): Associated with higher health risks, including heart disease, type 2 diabetes, and certain cancers
        </li>
        <li>
          <span className="font-medium">Subcutaneous fat</span> (under the skin): Less metabolically active and generally poses fewer health risks
        </li>
      </ul>
      <p className="mt-2">
        People with an "apple" body shape (fat concentrated around the abdomen) typically have more visceral fat and higher health risks than those with a "pear" shape (fat concentrated in hips and thighs).
      </p>
      
      <h3 className="font-medium mt-4">Changing Your Body Composition</h3>
      <p className="mb-2">
        To reduce body fat percentage while maintaining or building muscle:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">Resistance training:</span> Helps preserve and build muscle mass during weight loss
        </li>
        <li>
          <span className="font-medium">Moderate calorie deficit:</span> Aim for 500-750 calories below maintenance for sustainable fat loss
        </li>
        <li>
          <span className="font-medium">Adequate protein:</span> Consume 0.8-1g of protein per pound of lean body mass to support muscle preservation
        </li>
        <li>
          <span className="font-medium">Cardiovascular exercise:</span> Helps create a calorie deficit and improves heart health
        </li>
        <li>
          <span className="font-medium">Consistency:</span> Body composition changes take time; aim for 0.5-1% body fat reduction per month
        </li>
      </ul>
      
      <h3 className="font-medium mt-4">Limitations of Body Fat Measurements</h3>
      <p className="mb-2">
        All body fat measurement methods have limitations:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Navy method and other circumference-based calculations provide estimates that may vary by 3-5%</li>
        <li>Skinfold measurements require proper technique and can vary based on the tester's skill</li>
        <li>Even DEXA scans (considered the gold standard) have a margin of error of 1-2%</li>
      </ul>
      <p className="mt-2">
        For the most accurate assessment, use the same measurement method consistently and track trends over time rather than focusing on a single measurement.
      </p>
      
      <p className="mt-4">
        For a more comprehensive health assessment, consider using our other calculators like the <a href="/bmi" className="text-accent hover:underline">BMI Calculator</a>, <a href="/tdee" className="text-accent hover:underline">TDEE Calculator</a>, or <a href="/whr" className="text-accent hover:underline">Waist-to-Hip Ratio Calculator</a>.
      </p>
    </InfoSection>
  );
};

export default BodyFatUnderstanding;
