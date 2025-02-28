'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const BMIInfo: React.FC = () => {
  return (
    <InfoSection title="About BMI">
      <p>
        Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.
      </p>
      
      <h3 className="font-medium">BMI Categories for Adults:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Underweight:</strong> BMI less than 18.5</li>
        <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
        <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
        <li><strong>Obesity:</strong> BMI 30 or greater</li>
      </ul>
      
      <h3 className="font-medium">For Children and Teens (2-19 years):</h3>
      <p>
        BMI is calculated the same way, but the interpretation is different. Results are compared to typical values for other children of the same age and sex, using percentiles:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Underweight:</strong> Less than the 5th percentile</li>
        <li><strong>Healthy weight:</strong> 5th to 84th percentile</li>
        <li><strong>Overweight:</strong> 85th to 94th percentile</li>
        <li><strong>Obesity:</strong> 95th percentile or greater</li>
      </ul>
      
      <h3 className="font-medium">Limitations of BMI:</h3>
      <p>
        BMI is a useful screening tool, but it has limitations. It doesn't distinguish between muscle and fat, nor does it account for factors like age, sex, ethnicity, or muscle mass. Athletes and muscular individuals may have a high BMI without excess fat.
      </p>
    </InfoSection>
  );
};

export default BMIInfo;
