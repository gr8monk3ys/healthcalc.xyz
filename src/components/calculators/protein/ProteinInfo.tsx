'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const ProteinInfo: React.FC = () => {
  return (
    <InfoSection title="About Protein Intake">
      <p>
        Protein is an essential macronutrient that plays a crucial role in building and repairing
        tissues, producing enzymes and hormones, and supporting overall health. Understanding your
        daily protein needs helps optimize your nutrition for your specific goals.
      </p>

      <h3 className="font-medium">Why Protein Matters:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Muscle Building & Repair:</strong> Protein provides amino acids necessary for
          muscle protein synthesis, essential for growth and recovery after exercise.
        </li>
        <li>
          <strong>Satiety & Weight Management:</strong> Protein is the most satiating macronutrient,
          helping you feel fuller longer and reducing overall calorie intake.
        </li>
        <li>
          <strong>Metabolism Support:</strong> Protein has a higher thermic effect than carbs or
          fat, meaning your body burns more calories digesting it.
        </li>
        <li>
          <strong>Immune Function:</strong> Antibodies and immune cells require adequate protein for
          proper function.
        </li>
      </ul>

      <h3 className="font-medium">Protein Requirements by Activity Level:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Sedentary (0.8 g/kg):</strong> The RDA minimum for basic health maintenance in
          adults with little physical activity.
        </li>
        <li>
          <strong>Lightly Active (1.0-1.2 g/kg):</strong> For those who engage in light exercise or
          have active jobs requiring moderate physical effort.
        </li>
        <li>
          <strong>Moderately Active (1.2-1.6 g/kg):</strong> Recommended for regular exercisers who
          work out 3-5 days per week.
        </li>
        <li>
          <strong>Very Active (1.6-2.0 g/kg):</strong> For those with intense training regimens or
          physically demanding occupations.
        </li>
        <li>
          <strong>Athletes (1.8-2.2 g/kg):</strong> Competitive athletes and those focused on
          maximizing performance or muscle growth.
        </li>
      </ul>

      <h3 className="font-medium">Goal-Based Adjustments:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Weight Loss:</strong> Higher protein (1.6-2.5 g/kg) helps preserve muscle mass
          during calorie restriction and increases satiety.
        </li>
        <li>
          <strong>Muscle Gain:</strong> Slightly elevated protein (1.6-2.2 g/kg) supports muscle
          protein synthesis when combined with resistance training.
        </li>
        <li>
          <strong>General Health:</strong> The baseline RDA of 0.8 g/kg is sufficient for most
          sedentary adults not focused on specific fitness goals.
        </li>
      </ul>

      <h3 className="font-medium">Age Considerations:</h3>
      <p>
        Older adults (65+) typically benefit from higher protein intake (1.0-1.2 g/kg or more) to
        help prevent age-related muscle loss (sarcopenia) and maintain functional strength.
      </p>

      <h3 className="font-medium">Protein Timing:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Per Meal:</strong> Distribute protein evenly across meals (20-40g per meal) to
          maximize muscle protein synthesis throughout the day.
        </li>
        <li>
          <strong>Post-Workout:</strong> Consuming protein within 2-3 hours after exercise supports
          recovery, though total daily intake matters most.
        </li>
      </ul>
    </InfoSection>
  );
};

export default ProteinInfo;
