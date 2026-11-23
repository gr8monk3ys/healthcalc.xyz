import React from 'react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: './' },
  title: 'Body Composition Guide | HealthCalc',
  description:
    'What BMI, body fat percentage, lean mass, and waist measurements each tell you, how the calculators estimate them, and where each one falls short.',
};

export default function BodyCompositionGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Body Composition Guide</h1>
      <p className="text-gray-600 mb-6">
        Body weight alone does not say much about health. Two people with the same weight can carry
        very different amounts of muscle and fat, and fat stored around the abdomen carries
        different risks from fat stored elsewhere. Body composition tools try to separate these
        pieces. Below we go through the main measures and the formulas our calculators use, then
        suggest how to read them as a set.
      </p>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Body Mass Index (BMI)</h2>
        <p className="text-gray-600 mb-3">
          BMI is weight in kilograms divided by height in meters squared. The World Health
          Organization classifies adult BMI as:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Underweight: below 18.5</li>
          <li>Healthy weight: 18.5 to 24.9</li>
          <li>Overweight: 25.0 to 29.9</li>
          <li>
            Obesity: 30.0 or higher, split into class I (30 to 34.9), class II (35 to 39.9), and
            class III (40 or higher)
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          Worked example: someone who is 1.75 m tall and weighs 82 kg has a BMI of 82 ÷ (1.75 ×
          1.75) = 26.8, which falls in the overweight range.
        </p>
        <p className="text-gray-600 mb-3">
          BMI earns its place because it is quick and, across large populations, it tracks health
          risk well. Applied to one person, it is a blunt tool. It cannot tell muscle from fat, so
          muscular athletes can score as overweight. It also tends to underestimate risk in older
          adults who have lost muscle, and a WHO expert consultation noted that many Asian
          populations have higher health risk at lower BMI values than the standard cut-offs
          suggest.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Body Fat Percentage</h2>
        <p className="text-gray-600 mb-3">
          Body fat percentage is the share of your weight that is fat tissue. Our body fat
          calculator uses the U.S. Navy circumference method, which estimates body fat from height
          and neck and waist measurements (plus hips for women). For men, using measurements in
          centimeters:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            Body fat % = 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) −
            450
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          Continuing the example, if the same person has a 90 cm waist and a 38 cm neck, the formula
          gives about 20.7 percent body fat. That means roughly 17 kg of fat mass and 65 kg of
          everything else.
        </p>
        <p className="text-gray-600 mb-3">
          Circumference methods are typically within a few percentage points of laboratory methods
          for many people, but error grows at the extremes of body size. Smart scales using
          bioelectrical impedance are affected by hydration, meals, and exercise. DEXA scans are
          more precise but cost more. Whichever method you use, stick with the same one to track
          change.
        </p>
        <p className="text-gray-600 mb-3">
          The American Council on Exercise publishes widely used reference ranges. It describes
          average body fat as about 18 to 24 percent for men and 25 to 31 percent for women, with
          fitness ranges of about 14 to 17 percent for men and 21 to 24 percent for women. Women
          naturally carry more essential fat than men, so their ranges are higher.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Lean Body Mass</h2>
        <p className="text-gray-600 mb-3">
          Lean body mass is everything that is not fat: muscle, bone, organs, and water. It is
          calculated as total weight minus fat mass. In the example above, lean mass is about 65 kg.
          Tracking lean mass during a diet shows whether you are mostly losing fat or also losing
          muscle. Adequate protein and resistance training help preserve it.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Waist Measurements and Fat Distribution</h2>
        <p className="text-gray-600 mb-3">
          Where fat is stored matters. Abdominal fat, especially around the organs, is more closely
          linked to type 2 diabetes and heart disease than fat on the hips and thighs. Two simple
          measures capture this:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Waist-to-height ratio:</strong> waist divided by height, in the same units. A
            widely used rule of thumb is to keep your waist below half your height, a ratio under
            0.5. In the example, 90 ÷ 175 = 0.51, just above that line.
          </li>
          <li>
            <strong>Waist-to-hip ratio:</strong> waist divided by hip circumference. The WHO uses
            ratios of 0.90 or more for men and 0.85 or more for women as markers of increased risk.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          Measure your waist at the midpoint between your lowest rib and the top of your hip bone,
          after breathing out normally, with the tape level and snug but not compressing the skin.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Using the Numbers Together</h2>
        <p className="text-gray-600 mb-3">
          We would look at these together. BMI gives context, a waist measure shows where fat sits,
          and body fat percentage or lean mass becomes worth tracking once you start changing your
          training or diet. A person with a BMI of 26 and a waist-to-height ratio of 0.45 is in a
          very different position from someone with the same BMI and a ratio of 0.58.
        </p>
        <p className="text-gray-600 mb-3">
          Recheck every four to eight weeks rather than daily. Body composition changes slowly, and
          measurement noise can hide real progress over short periods.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">When to Talk to a Professional</h2>
        <p className="text-gray-600 mb-3">
          Talk to a doctor if your waist measure or BMI places you in a higher-risk range, if you
          are losing weight without trying, or if you have symptoms such as fatigue or changes in
          thirst and urination. A clinician can order blood pressure, blood sugar, and cholesterol
          tests, which say more about metabolic health than body measurements alone.
        </p>
      </section>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/bmi" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">BMI Calculator</h3>
            <p className="text-sm text-gray-600">Body mass index screening tool.</p>
          </Link>
          <Link href="/body-fat" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600">Estimate body fat percentage.</p>
          </Link>
          <Link
            href="/lean-body-mass"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Lean Body Mass Calculator</h3>
            <p className="text-sm text-gray-600">Estimate lean mass and fat mass.</p>
          </Link>
          <Link
            href="/waist-to-height-ratio"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Waist-to-Height Ratio</h3>
            <p className="text-sm text-gray-600">Assess central fat distribution.</p>
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">References</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            World Health Organization. Obesity: preventing and managing the global epidemic. Report
            of a WHO consultation. WHO Technical Report Series 894. Geneva; 2000.
          </li>
          <li>
            WHO Expert Consultation. Appropriate body-mass index for Asian populations and its
            implications for policy and intervention strategies. Lancet. 2004;363(9403):157-163.
          </li>
          <li>
            World Health Organization. Waist circumference and waist-hip ratio: report of a WHO
            expert consultation. Geneva; 2008.
          </li>
          <li>
            Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from
            body circumferences and height. Naval Health Research Center Reports No. 84-11 and
            84-29. San Diego, CA; 1984.
          </li>
          <li>
            Ashwell M, Gunn P, Gibson S. Waist-to-height ratio is a better screening tool than waist
            circumference and BMI for adult cardiometabolic risk factors: systematic review and
            meta-analysis. Obes Rev. 2012;13(3):275-286.
          </li>
          <li>American Council on Exercise. Percent body fat norms for men and women.</li>
        </ul>
      </div>
    </div>
  );
}
