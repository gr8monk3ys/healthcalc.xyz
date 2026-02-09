'use client';

import React from 'react';

const BodyRecompInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Understanding Body Recomposition</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">What is Body Recomposition?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Body recomposition is the process of simultaneously losing fat and building muscle
              mass, resulting in improved body composition without necessarily changing overall body
              weight significantly. Unlike traditional bulking and cutting cycles, recomposition
              focuses on optimizing body composition through strategic calorie cycling and training.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">The Science Behind Calorie Cycling</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Calorie cycling alternates between higher calories on training days and lower calories
              on rest days to create the optimal environment for both muscle growth and fat loss:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
              <li>
                <strong>Training Days:</strong> Eating at a small surplus (10-15% above maintenance)
                provides energy for intense workouts and maximizes muscle protein synthesis in the
                24-48 hours following training.
              </li>
              <li>
                <strong>Rest Days:</strong> Eating at a deficit (15-20% below maintenance) promotes
                fat oxidation while the body has lower energy demands and is not actively building
                muscle tissue.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Protein Requirements</h3>
            <p className="text-gray-700 dark:text-gray-300">
              High protein intake (1g per pound of bodyweight or 2.2g per kg) is crucial for body
              recomposition. This amount ensures adequate amino acids for muscle protein synthesis
              while protecting against muscle breakdown during calorie deficits. Protein also has a
              high thermic effect, meaning your body burns 20-30% of protein calories just digesting
              it, compared to only 5-10% for carbs and fats.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Who Benefits Most from Recomposition?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Body recomposition works best for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
              <li>
                <strong>Beginners:</strong> Those with less than 1 year of consistent training have
                the highest potential for simultaneous muscle gain and fat loss due to greater
                responsiveness to training stimuli.
              </li>
              <li>
                <strong>Moderate Body Fat:</strong> Individuals at 15-25% body fat (men) or 23-35%
                (women) have sufficient energy stores to support muscle growth while losing fat.
              </li>
              <li>
                <strong>Returning Trainees:</strong> Those returning after a training break can
                experience "muscle memory" effects and rapid recomposition.
              </li>
              <li>
                <strong>Natural Lifters:</strong> Those not using performance-enhancing drugs
                benefit from the sustainable, lifestyle-compatible approach.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Training Requirements</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Successful body recomposition requires progressive resistance training:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
              <li>
                Train 3-5 days per week with compound movements (squats, deadlifts, bench press)
              </li>
              <li>Focus on progressive overload - increasing weight or reps each session</li>
              <li>Train each muscle group 2-3 times per week for optimal stimulus</li>
              <li>
                Include both heavy weight (6-8 reps) and moderate weight (10-15 reps) training
              </li>
              <li>Optional: Add 2-3 HIIT cardio sessions on rest days for aggressive cuts</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Expected Timeline and Results</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Body recomposition is slower than aggressive cutting or bulking but produces more
              sustainable results:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
              <li>
                <strong>Weeks 1-4:</strong> Strength improvements, better workout performance,
                slight changes in how clothes fit
              </li>
              <li>
                <strong>Weeks 4-8:</strong> Visible fat loss, emerging muscle definition, scale
                weight may stay similar
              </li>
              <li>
                <strong>Weeks 8-12:</strong> Noticeable muscle growth, clear reduction in body fat,
                friends comment on changes
              </li>
              <li>
                <strong>Weeks 12-16:</strong> Significant transformation, potentially 5-10 lbs fat
                lost and 3-6 lbs muscle gained (beginners)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Common Mistakes to Avoid</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
              <li>
                Not tracking calories and macros accurately - estimation leads to poor results
              </li>
              <li>
                Impatience - expecting weekly scale changes rather than monthly body composition
                changes
              </li>
              <li>
                Inconsistent training - missing workouts destroys the muscle-building stimulus
              </li>
              <li>Inadequate protein - below 0.8g per lb leads to muscle loss during deficits</li>
              <li>Poor sleep (less than 7 hours) - disrupts recovery and hormone production</li>
              <li>Not adjusting calories as weight changes - recalculate every 4-6 weeks</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">
              Scientific Support
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Research supports body recomposition as an effective strategy, particularly for
              beginners and those with moderate body fat. Studies show that when combined with
              resistance training and high protein intake, individuals can lose 0.5-1.5 lbs of fat
              per week while gaining 0.5-2 lbs of muscle per month, depending on training
              experience. The key is consistency, proper programming, and adequate protein intake to
              support both goals simultaneously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyRecompInfo;
