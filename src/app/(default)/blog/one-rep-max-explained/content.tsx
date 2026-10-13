import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AdBlock from '@/components/AdBlock';
import RelatedCalculatorLinks from '@/components/RelatedCalculatorLinks';
import RelatedGuides from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'One Rep Max Explained: Formulas, Accuracy, and How to Use It | HealthCalc Blog',
  description:
    'How 1RM calculators estimate your one-rep max from a submaximal set, which formula to trust at which rep range, and how to program off the number safely.',
  keywords:
    'one rep max, 1RM calculator, Epley formula, Brzycki formula, Lombardi formula, 1RM accuracy, strength training percentages, training zones, powerlifting max',
  openGraph: {
    title: 'One Rep Max Explained: Formulas, Accuracy, and How to Use It | HealthCalc Blog',
    description:
      'How 1RM calculators estimate your one-rep max from a submaximal set, which formula to trust at which rep range, and how to program off the number safely.',
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/one-rep-max-explained',
    images: [
      {
        url: '/images/blog/one-rep-max-explained.jpg',
        width: 1200,
        height: 630,
        alt: 'One Rep Max Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Rep Max Explained: Formulas, Accuracy, and How to Use It | HealthCalc Blog',
    description:
      'How 1RM calculators estimate your one-rep max from a submaximal set, which formula to trust at which rep range, and how to program off the number safely.',
    images: ['/images/blog/one-rep-max-explained.jpg'],
  },
};

const OneRepMaxExplainedPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Training
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        One Rep Max Explained: Formulas, Accuracy, and How to Use It
      </h1>
      <p className="text-gray-500 italic">10 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>A 1RM calculator estimates your true max from a lighter, safer submaximal set</li>
          <li>Epley, Brzycki, and Lombardi all use different math and can disagree by 5-10+ lb</li>
          <li>Accuracy drops fast past about 10-12 reps - low-rep sets estimate best</li>
          <li>Training percentages (not the raw number) are what actually drive programming</li>
          <li>Testing a true 1RM in the gym still beats any formula when it matters</li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <p>
        Most lifters never test a true one-rep max. Grinding out a single all-out lift carries real
        injury risk and needs a proper warm-up, spotters, and a fresh nervous system. A 1RM
        calculator sidesteps that: lift a manageable weight for a few reps, and a formula
        extrapolates what you probably could have lifted for one.
      </p>

      <p>
        This article covers how those formulas actually work, where they agree and disagree, and how
        to turn the number into a training plan rather than just a bragging point.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What a 1RM Calculator Is Estimating</h2>

      <p>
        Your one-rep max (1RM) is the heaviest weight you can lift for exactly one full repetition
        with good form. It is the reference point strength programs are built around: a &ldquo;5x5
        at 80%&rdquo; instruction is meaningless without a number to take 80% of.
      </p>

      <p>
        A 1RM calculator works backward from fatigue. Lift a submaximal weight for several reps to
        (or near) failure, and a formula converts that weight-and-reps pair into an estimated max.
        The math assumes a fairly consistent relationship between how many reps you can do and what
        percentage of your max that represents - which is true on average, but varies by lift, by
        lifter, and by how fresh you are that day.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Three Formulas, and How They Differ</h2>

      <p>
        Our{' '}
        <Link href="/one-rep-max" className="text-accent hover:underline">
          One Rep Max Calculator
        </Link>{' '}
        runs all three of the formulas below on the same input so you can see how much they disagree
        before picking one.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Epley</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">1RM = weight x (1 + reps / 30)</p>
        <p>
          The most widely used formula, published by Boyd Epley in 1985. It is linear and slightly
          more generous at higher rep counts than Brzycki. Most accurate in the 1-10 rep range.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Brzycki</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">1RM = weight x (36 / (37 - reps))</p>
        <p>
          Published by Matt Brzycki in 1993. Also linear, but the denominator means it breaks down
          mathematically as reps approaches 37 (division by a number near zero) - not a formula to
          trust for high-rep sets. Best in the 1-12 rep range.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Lombardi</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">1RM = weight x reps^0.10</p>
        <p>
          A power curve rather than a straight line, published by V.P. Lombardi in 1989. It rises
          more slowly than the other two, which tends to make it the better fit for higher-rep sets
          (10-15 reps) where Epley and Brzycki start to overestimate.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Worked Example</h3>

      <p>Same set, three answers. 100 kg for 5 reps:</p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Epley</strong>: 100 x (1 + 5/30) = <strong>116.7 kg</strong>
          </li>
          <li>
            <strong>Brzycki</strong>: 100 x (36/32) = <strong>112.5 kg</strong>
          </li>
          <li>
            <strong>Lombardi</strong>: 100 x 5^0.1 = <strong>117.5 kg</strong>
          </li>
        </ul>
      </div>

      <p>
        A roughly 5 kg spread from the same input set is normal, not a bug. None of the three is
        definitively &ldquo;correct&rdquo; - they are curve fits to old datasets, and your own
        strength curve will match one better than the others depending on the lift and your training
        history.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">How Accurate Is a 1RM Estimate, Really?</h2>

      <p>Accuracy depends almost entirely on rep count:</p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>1-5 reps</strong>: Estimates are typically within a few percent of a tested max.
            This is the sweet spot.
          </li>
          <li>
            <strong>6-10 reps</strong>: Still reasonable, though the gap between formulas widens.
          </li>
          <li>
            <strong>10-15 reps</strong>: Error grows noticeably. Fatigue and technique breakdown
            over a longer set stop scaling linearly with load.
          </li>
          <li>
            <strong>15+ reps</strong>: Treat the number as a rough ballpark, not a training input.
            Epley and Brzycki in particular were never validated at this range.
          </li>
        </ul>
      </div>

      <p>
        The formulas also assume you actually trained close to failure. A set of 5 with three reps
        left in the tank will underestimate your max - the math has no way to know how much you had
        left.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Turning 1RM Into Training Percentages</h2>

      <p>
        The 1RM number itself is not the point - what you do with it is. Once you have an estimate,
        training programs express work as a percentage of it:
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Strength (80-90% 1RM, 1-5 reps)</strong>: Neural adaptation and maximal force
            production. Long rests, low volume.
          </li>
          <li>
            <strong>Hypertrophy (65-75% 1RM, 8-12 reps)</strong>: The load range most associated
            with muscle growth.
          </li>
          <li>
            <strong>Endurance (50-65% 1RM, 15-20+ reps)</strong>: Muscular endurance and work
            capacity rather than peak force.
          </li>
        </ul>
      </div>

      <p>
        A percentage chart makes this concrete: at a 150 kg squat 1RM, 80% is 120 kg for a
        strength-focused set, while 65% is 97.5 kg for a hypertrophy set. Our calculator generates
        this full breakdown - 50% through 100% - automatically from whichever formula you pick, so
        you are not doing the multiplication by hand every training block.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">When to Actually Test a True Max</h2>

      <p>
        Calculators are a substitute for testing, not a replacement for it forever. Consider a real,
        supervised 1RM attempt when:
      </p>

      <ul className="list-disc list-inside space-y-2 my-4">
        <li>You are peaking for a powerlifting meet or a specific strength goal</li>
        <li>Your estimated max has not been re-checked in 3-6 months of consistent training</li>
        <li>You have the equipment, warm-up time, and (ideally) a spotter to do it safely</li>
      </ul>

      <p>
        Otherwise, re-estimating from your heaviest recent working sets every few weeks keeps your
        training percentages current without the fatigue cost of maxing out.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Common Mistakes</h2>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">
          Mistake #1: Estimating From a Set That Wasn&rsquo;t Close to Failure
        </h3>
        <p>
          If you stopped a set with several reps in reserve, every formula will underestimate your
          real max. Use your last set of a lift on a day you actually pushed it.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Mistake #2: Trusting One Formula Blindly</h3>
        <p>
          Since the three formulas can disagree by 5-10 lb or more, treat the spread as your margin
          of error rather than picking whichever number is highest.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Mistake #3: Estimating From High-Rep Sets</h3>
        <p>
          A set of 20 tells you a lot about muscular endurance and very little about your true
          one-rep max. Keep estimation sets under about 10 reps when possible.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>

      <p>
        A 1RM calculator gives you a working number without the injury risk of testing a true max
        every training block. Use a recent, near-failure set of 10 reps or fewer, treat the formula
        spread as your error bar rather than a precise answer, and remember that the training
        percentages built from that number matter more than the number itself.
      </p>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Tools to Help You Train Off Your 1RM</h3>
        <p className="mb-4">These calculators can help you put the concepts above into practice:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link href="/one-rep-max" className="text-accent hover:underline">
              One Rep Max Calculator
            </Link>{' '}
            - Estimate your 1RM with Epley, Brzycki, and Lombardi, plus training zones and a full
            percentage chart
          </li>
          <li>
            <Link href="/heart-rate-zones" className="text-accent hover:underline">
              Heart Rate Zones Calculator
            </Link>{' '}
            - Pair strength percentages with cardio intensity zones for a balanced program
          </li>
          <li>
            <Link href="/protein" className="text-accent hover:underline">
              Protein Calculator
            </Link>{' '}
            - Make sure recovery nutrition matches the training load
          </li>
        </ul>
      </div>

      <RelatedCalculatorLinks slugs={['one-rep-max', 'heart-rate-zones', 'protein']} />
      <RelatedGuides />

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>Epley B. Poundage Chart. Boyd Epley Workout. Nebraska Symposium. 1985.</li>
          <li>
            Brzycki M. Strength Testing - Predicting a One-Rep Max from Reps-to-Fatigue. Journal of
            Physical Education, Recreation & Dance. 1993;64(1):88-90.
          </li>
          <li>Lombardi VP. Beginning Weight Training: The Safe and Effective Way. 1989.</li>
          <li>
            Reynolds JM, Gordon TJ, Robergs RA. Prediction of One Repetition Maximum Strength from
            Multiple Repetition Maximum Testing and Anthropometry. Journal of Strength &
            Conditioning Research. 2006;20(3):584-592.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function OneRepMaxExplainedPage() {
  return OneRepMaxExplainedPageContent;
}
