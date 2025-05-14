'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const BodyFatInfo: React.FC = () => {
  return (
    <InfoSection title="About Body Fat Percentage">
      <p>
        Body fat percentage is the amount of fat mass in your body compared to your total body
        weight. It's a more accurate measure of fitness than BMI because it distinguishes between
        fat and lean mass (muscle, bone, organs, etc.).
      </p>

      <h3 className="font-medium mt-4">Why Body Fat Matters</h3>
      <p className="mb-2">
        Body fat is essential for health, but the right amount varies by gender, age, and fitness
        goals. Some body fat is vital for:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Hormone production and regulation</li>
        <li>Insulation and temperature regulation</li>
        <li>Protection of internal organs</li>
        <li>Energy storage during periods of fasting</li>
      </ul>

      <h3 className="font-medium mt-4">Measurement Methods</h3>
      <div className="space-y-2">
        <div>
          <h4 className="font-medium">U.S. Navy Method</h4>
          <p className="text-sm">
            Uses measurements of waist, neck, and hip (for women) circumferences to estimate body
            fat. It's simple and requires only a tape measure.
          </p>
        </div>

        <div>
          <h4 className="font-medium">Skinfold Measurements</h4>
          <p className="text-sm">
            Uses calipers to measure the thickness of skin folds at specific body sites. More
            accurate than circumference methods but requires proper technique.
          </p>
        </div>

        <div>
          <h4 className="font-medium">BMI-based Estimation</h4>
          <p className="text-sm">
            Uses height, weight, age, and sex to estimate body fat. Less accurate but requires no
            special equipment.
          </p>
        </div>

        <div>
          <h4 className="font-medium">Professional Methods</h4>
          <p className="text-sm">
            DEXA scans, hydrostatic weighing, and BodPod measurements provide the most accurate
            results but require specialized equipment.
          </p>
        </div>
      </div>

      <h3 className="font-medium mt-4">Healthy Body Fat Percentages</h3>
      <div className="space-y-2">
        <div>
          <h4 className="font-medium">For Men:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">Essential fat:</span> 2-5%
            </li>
            <li>
              <span className="font-medium">Athletes:</span> 6-13%
            </li>
            <li>
              <span className="font-medium">Fitness:</span> 14-17%
            </li>
            <li>
              <span className="font-medium">Average:</span> 18-24%
            </li>
            <li>
              <span className="font-medium">Obese:</span> 25% and higher
            </li>
          </ul>
        </div>

        <div className="mt-2">
          <h4 className="font-medium">For Women:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">Essential fat:</span> 10-13%
            </li>
            <li>
              <span className="font-medium">Athletes:</span> 14-20%
            </li>
            <li>
              <span className="font-medium">Fitness:</span> 21-24%
            </li>
            <li>
              <span className="font-medium">Average:</span> 25-31%
            </li>
            <li>
              <span className="font-medium">Obese:</span> 32% and higher
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Note that very low body fat percentages can be unhealthy and may lead to health problems.
        Essential fat is necessary for normal physiological functions.
      </p>
    </InfoSection>
  );
};

export default BodyFatInfo;
