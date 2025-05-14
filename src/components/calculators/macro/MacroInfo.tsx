'use client';

import React from 'react';
import InfoSection from '../InfoSection';

/**
 * Informational component explaining macronutrients and how the calculator works
 */
const MacroInfo: React.FC = () => {
  return (
    <InfoSection title="About Macronutrients">
      <p>
        Macronutrients (macros) are the three main nutrients your body needs in large amounts:
        protein, carbohydrates, and fat. Each plays a unique role in your health and body
        composition.
      </p>

      <h3 className="font-medium">The Three Macronutrients:</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Protein (4 calories per gram):</strong> Essential for building and repairing
          muscle tissue, producing enzymes and hormones, and supporting immune function. Found in
          meat, fish, eggs, dairy, legumes, and tofu.
        </li>
        <li>
          <strong>Carbohydrates (4 calories per gram):</strong> Your body&apos;s primary energy
          source. They fuel your brain, muscles, and organs. Found in grains, fruits, vegetables,
          and legumes.
        </li>
        <li>
          <strong>Fat (9 calories per gram):</strong> Essential for hormone production, nutrient
          absorption, and cell structure. Provides long-lasting energy. Found in oils, nuts, seeds,
          avocados, and fatty fish.
        </li>
      </ul>

      <h3 className="font-medium">Macro Ratios by Goal:</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Weight Loss (40/40/20):</strong> Higher protein helps preserve muscle mass during
          a calorie deficit, while moderate carbs maintain energy. Lower fat keeps calories in
          check.
        </li>
        <li>
          <strong>Maintenance (30/35/35):</strong> Balanced distribution for maintaining weight and
          overall health. Suitable for most people not pursuing specific fitness goals.
        </li>
        <li>
          <strong>Muscle Gain (30/40/30):</strong> Higher carbs fuel intense workouts and recovery.
          Adequate protein supports muscle protein synthesis. Moderate fat supports hormones.
        </li>
      </ul>

      <h3 className="font-medium">How to Use Your Results:</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Use a food tracking app to monitor your daily macro intake.</li>
        <li>Plan your meals around your protein target first, as it is often hardest to hit.</li>
        <li>Adjust your macros based on how you feel and your progress over time.</li>
        <li>Remember that hitting your calorie target is most important for weight goals.</li>
      </ul>

      <h3 className="font-medium">Important Considerations:</h3>
      <p>
        While macro tracking can be effective, it is not necessary for everyone. Focus on whole
        foods, adequate protein, and a variety of nutrients. Individual needs vary based on age,
        gender, activity level, and health conditions. Consult a registered dietitian for
        personalized advice.
      </p>
    </InfoSection>
  );
};

export default MacroInfo;
