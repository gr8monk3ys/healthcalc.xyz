'use client';

import React from 'react';
import InfoSection from '../InfoSection';

/**
 * OneRepMaxInfo Component
 *
 * Provides educational information about:
 * - What 1RM is and why it matters
 * - How the formulas work
 * - Training zone explanations
 * - Best practices for using 1RM data
 */
const OneRepMaxInfo: React.FC = () => {
  return (
    <InfoSection title="About One Rep Max (1RM)">
      <p>
        One Rep Max (1RM) is the maximum amount of weight you can lift for a single repetition with
        proper form. It is a fundamental measure of strength used by athletes, coaches, and fitness
        enthusiasts to program training and track progress.
      </p>

      <h3 className="font-medium">Why Calculate Your 1RM?</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Program Design:</strong> Base training percentages on your actual strength
        </li>
        <li>
          <strong>Track Progress:</strong> Monitor strength gains over time
        </li>
        <li>
          <strong>Set Goals:</strong> Establish realistic strength targets
        </li>
        <li>
          <strong>Compare Performance:</strong> Benchmark across different exercises
        </li>
      </ul>

      <h3 className="font-medium">Calculation Formulas:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Epley:</strong> 1RM = Weight x (1 + Reps/30) - Most widely used, accurate for 1-10
          reps
        </li>
        <li>
          <strong>Brzycki:</strong> 1RM = Weight x (36 / (37 - Reps)) - Linear relationship, best
          for 1-12 reps
        </li>
        <li>
          <strong>Lombardi:</strong> 1RM = Weight x Reps^0.10 - Good for higher rep ranges (10-15)
        </li>
      </ul>

      <h3 className="font-medium">Training Zones:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Strength (80-90% 1RM):</strong> 1-5 reps for maximum strength and power
        </li>
        <li>
          <strong>Hypertrophy (65-75% 1RM):</strong> 8-12 reps for muscle growth
        </li>
        <li>
          <strong>Endurance (50-65% 1RM):</strong> 15-20+ reps for muscular endurance
        </li>
      </ul>

      <h3 className="font-medium">Tips for Accurate Estimation:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Use weight you can lift with proper form for 3-10 reps</li>
        <li>Perform the set to near failure (1-2 reps in reserve)</li>
        <li>Rest adequately before the test set (2-3 minutes)</li>
        <li>Higher rep tests (10+) tend to overestimate 1RM</li>
      </ul>

      <h3 className="font-medium">Important Considerations:</h3>
      <p>
        These calculations are estimates. Your actual 1RM may differ based on training experience,
        fatigue levels, technique proficiency, and exercise type. Always prioritize safety when
        testing maximal strength - use spotters and proper equipment.
      </p>
    </InfoSection>
  );
};

export default OneRepMaxInfo;
