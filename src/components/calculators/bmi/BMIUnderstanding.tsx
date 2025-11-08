'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const BMIUnderstanding: React.FC = () => {
  return (
    <InfoSection title="Understanding Your BMI" className="mt-12">
      <p>
        BMI provides a simple numeric measure of your weight relative to height. It was developed in
        the 19th century by Belgian mathematician Adolphe Quetelet and is widely used as a screening
        tool to categorize weight status.
      </p>

      <h3 className="font-medium">Why BMI Matters</h3>
      <p>
        Research has shown that BMI correlates with direct measures of body fat and with various
        health risks. Higher BMIs are associated with increased risk for conditions like:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Heart disease and stroke</li>
        <li>Type 2 diabetes</li>
        <li>High blood pressure</li>
        <li>Certain types of cancer</li>
        <li>Sleep apnea and breathing problems</li>
        <li>Osteoarthritis</li>
      </ul>

      <h3 className="font-medium">Beyond BMI</h3>
      <p>
        While BMI is useful for population studies and general screening, it doesn't tell the
        complete story about your health. Other factors to consider include:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Body composition:</strong> The ratio of fat to muscle in your body
        </li>
        <li>
          <strong>Fat distribution:</strong> Where fat is stored on your body (abdominal fat carries
          higher health risks)
        </li>
        <li>
          <strong>Waist circumference:</strong> A measurement of abdominal fat
        </li>
        <li>
          <strong>Lifestyle factors:</strong> Diet quality, physical activity, sleep, and stress
        </li>
        <li>
          <strong>Family history:</strong> Genetic predisposition to certain conditions
        </li>
      </ul>

      <p>
        For a more comprehensive assessment of your health status, consider using our other
        calculators like the{' '}
        <a href="/body-fat" className="text-accent hover:underline">
          Body Fat Calculator
        </a>{' '}
        or{' '}
        <a href="/absi" className="text-accent hover:underline">
          ABSI Calculator
        </a>
        , and consult with healthcare professionals.
      </p>
    </InfoSection>
  );
};

export default BMIUnderstanding;
