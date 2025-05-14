'use client';

import React from 'react';
import InfoSection from '../InfoSection';

const TDEEInfo: React.FC = () => {
  return (
    <InfoSection title="About TDEE">
      <p>
        Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day.
        Understanding your TDEE is essential for effective weight management, whether your goal is
        to lose, maintain, or gain weight.
      </p>

      <h3 className="font-medium">TDEE Components:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Basal Metabolic Rate (BMR):</strong> The calories your body needs at complete rest
          for basic functions like breathing, circulation, and cell production (60-70% of TDEE).
        </li>
        <li>
          <strong>Thermic Effect of Food (TEF):</strong> Calories burned digesting and processing
          food (10% of TDEE).
        </li>
        <li>
          <strong>Exercise Activity Thermogenesis (EAT):</strong> Calories burned during intentional
          exercise.
        </li>
        <li>
          <strong>Non-Exercise Activity Thermogenesis (NEAT):</strong> Calories burned during
          non-exercise activities like walking, fidgeting, and daily tasks.
        </li>
      </ul>

      <h3 className="font-medium">Activity Levels Explained:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Sedentary (1.2):</strong> Little or no exercise, desk job (e.g., office worker
          with no additional physical activity).
        </li>
        <li>
          <strong>Lightly Active (1.375):</strong> Light exercise 1-3 days/week (e.g., walking,
          light gardening, or yoga a few times per week).
        </li>
        <li>
          <strong>Moderately Active (1.55):</strong> Moderate exercise 3-5 days/week (e.g., jogging,
          cycling, or weight training several times per week).
        </li>
        <li>
          <strong>Very Active (1.725):</strong> Hard exercise 6-7 days/week (e.g., daily intense
          workouts or physically demanding job).
        </li>
        <li>
          <strong>Extremely Active (1.9):</strong> Very hard exercise, physical job or training
          twice a day (e.g., professional athletes, very physically demanding jobs).
        </li>
      </ul>

      <h3 className="font-medium">Using Your TDEE:</h3>
      <p>Once you know your TDEE, you can adjust your calorie intake based on your goals:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Weight Maintenance:</strong> Consume calories equal to your TDEE.
        </li>
        <li>
          <strong>Weight Loss:</strong> Consume fewer calories than your TDEE (typically 10-25%
          less).
        </li>
        <li>
          <strong>Weight Gain:</strong> Consume more calories than your TDEE (typically 10-20%
          more).
        </li>
      </ul>
    </InfoSection>
  );
};

export default TDEEInfo;
