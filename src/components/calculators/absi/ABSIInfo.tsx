'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const ABSIInfo: React.FC = () => {
  return (
    <InfoSection title="About A Body Shape Index (ABSI)">
      <p>
        A Body Shape Index (ABSI) is a metric developed in 2012 that combines waist circumference
        with BMI and height to better predict mortality risk. ABSI focuses on the health risks
        associated with central obesity (excess abdominal fat).
      </p>

      <h3 className="font-medium mt-4">Why ABSI Matters</h3>
      <p className="mb-2">
        BMI doesn't tell you anything about fat distribution. Two people with the same BMI can have
        very different body shapes—one might have an "apple-shaped" body (fat concentrated around
        the waist) while another has a "pear-shaped" body (fat concentrated in the hips and thighs).
      </p>
      <p className="mb-2">
        Research has shown that abdominal fat (measured by waist circumference) is more strongly
        linked to health risks than fat in other areas of the body. ABSI was developed to address
        this limitation of BMI by incorporating waist circumference relative to a person's height
        and BMI.
      </p>
      <p>
        Studies have found that a higher ABSI correlates with increased mortality risk, even in
        people with normal BMI values. This makes it a valuable complementary measure to traditional
        body composition metrics.
      </p>

      <h3 className="font-medium mt-4">How to Measure Waist Circumference</h3>
      <p className="mb-2">
        It's very important to take an accurate waist measurement for calculating ABSI:
      </p>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Stand up straight and breathe normally</li>
        <li>Find the top of your hip bones and the bottom of your ribs</li>
        <li>
          Place the measuring tape midway between these points (usually at the level of your navel)
        </li>
        <li>Wrap the tape around your waist, keeping it parallel to the floor</li>
        <li>Measure after breathing out normally (don't suck in your stomach)</li>
        <li>Ensure the tape is snug but not digging into your skin</li>
      </ol>
      <p className="mt-2 text-sm text-gray-600">
        Use a flexible, non-stretchable measuring tape for the most accurate results.
      </p>

      <h3 className="font-medium mt-4">Understanding ABSI Z-Score</h3>
      <p className="mb-2">
        ABSI is typically expressed as a z-score, which compares your value to the average for your
        age and sex:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">Z-score below -0.868:</span> Very low risk (significantly
          below average)
        </li>
        <li>
          <span className="font-medium">Z-score between -0.868 and -0.272:</span> Low risk (below
          average)
        </li>
        <li>
          <span className="font-medium">Z-score between -0.272 and 0.229:</span> Average risk
        </li>
        <li>
          <span className="font-medium">Z-score between 0.229 and 0.798:</span> High risk (above
          average)
        </li>
        <li>
          <span className="font-medium">Z-score above 0.798:</span> Very high risk (significantly
          above average)
        </li>
      </ul>
      <p className="mt-2">
        The further your ABSI z-score is above zero, the higher your predicted health risk. Research
        has shown that an above-average ABSI is associated with substantially higher risk of
        premature death.
      </p>
    </InfoSection>
  );
};

export default ABSIInfo;
