'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const TDEEUnderstanding: React.FC = () => {
  return (
    <InfoSection title="Understanding Your TDEE" className="mt-12">
      <p>
        Your TDEE is influenced by several factors, including age, gender, weight, height, and
        activity level. Understanding these factors can help you make more informed decisions about
        your nutrition and exercise.
      </p>

      <h3 className="font-medium">Factors Affecting TDEE</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Age:</strong> Metabolism typically slows with age, reducing TDEE by approximately
          1-2% per decade after age 20.
        </li>
        <li>
          <strong>Gender:</strong> Men generally have higher TDEEs than women of similar size due to
          greater muscle mass and less body fat.
        </li>
        <li>
          <strong>Body Composition:</strong> Muscle tissue burns more calories at rest than fat
          tissue, so individuals with more muscle mass have higher TDEEs.
        </li>
        <li>
          <strong>Hormones:</strong> Thyroid hormones, cortisol, and other hormones can
          significantly impact metabolic rate and TDEE.
        </li>
        <li>
          <strong>Environmental Factors:</strong> Temperature, altitude, and stress can all affect
          energy expenditure.
        </li>
      </ul>

      <h3 className="font-medium">Tracking and Adjusting</h3>
      <p>
        While TDEE calculators provide a good starting point, individual metabolism varies. For best
        results:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Track your calorie intake accurately using a food diary or app</li>
        <li>Monitor your weight changes over 2-4 weeks</li>
        <li>Adjust your calorie intake based on actual results</li>
        <li>Recalculate your TDEE periodically as your weight, activity level, or goals change</li>
      </ul>

      <p>
        For more personalized guidance on nutrition and exercise, consider consulting with a
        registered dietitian or certified fitness professional.
      </p>
    </InfoSection>
  );
};

export default TDEEUnderstanding;
