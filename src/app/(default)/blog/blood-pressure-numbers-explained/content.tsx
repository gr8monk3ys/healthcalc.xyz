import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AdBlock from '@/components/AdBlock';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import RelatedCalculatorLinks from '@/components/RelatedCalculatorLinks';
import RelatedGuides from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'Blood Pressure Numbers Explained: What Your Reading Means | HealthCalc Blog',
  description:
    'What systolic and diastolic numbers mean, how the AHA/ACC categories work, why guidelines disagree on cut-offs, and how to take a home reading you can trust.',
  keywords:
    'blood pressure chart, systolic vs diastolic, blood pressure categories, stage 1 hypertension, elevated blood pressure, home blood pressure monitoring, white coat hypertension',
  openGraph: {
    title: 'Blood Pressure Numbers Explained: What Your Reading Means | HealthCalc Blog',
    description:
      'What systolic and diastolic numbers mean, how the AHA/ACC categories work, why guidelines disagree on cut-offs, and how to take a home reading you can trust.',
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/blood-pressure-numbers-explained',
    images: [
      {
        url: '/images/blog/blood-pressure-numbers-explained.jpg',
        width: 1200,
        height: 630,
        alt: 'Blood Pressure Numbers Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blood Pressure Numbers Explained: What Your Reading Means | HealthCalc Blog',
    description:
      'What systolic and diastolic numbers mean, how the AHA/ACC categories work, why guidelines disagree on cut-offs, and how to take a home reading you can trust.',
    images: ['/images/blog/blood-pressure-numbers-explained.jpg'],
  },
};

const BloodPressureNumbersExplainedPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Health Vitals
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        Blood Pressure Numbers Explained: What Your Reading Means
      </h1>
      <p className="text-gray-500 italic">9 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            The top number (systolic) is pressure during a heartbeat; the bottom (diastolic) is
            pressure between beats
          </li>
          <li>
            Your category is set by whichever number lands in the higher band, not by an average of
            the two
          </li>
          <li>
            US (AHA/ACC) cut-offs start &ldquo;stage 1 hypertension&rdquo; at 130/80; European and
            UK guidelines diagnose hypertension from 140/90
          </li>
          <li>
            One reading is not a diagnosis - technique, timing, and cuff size can move a result by
            several points
          </li>
          <li>
            A reading of 180/120 or higher is a reason to recheck promptly and get medical help if
            you have symptoms
          </li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <p>
        A blood pressure reading is two numbers and a lot of room for confusion. Is 128/78 fine? Why
        does 118/82 count as hypertension when the top number is under 120? And why does a doctor in
        London read the same numbers differently from one in Chicago?
      </p>

      <p>
        This guide explains what each number measures, how the categories used by our{' '}
        <Link href="/blood-pressure" className="text-accent hover:underline">
          Blood Pressure Calculator
        </Link>{' '}
        are defined, where other guidelines draw the lines, and how to take a reading at home that
        is worth acting on.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What the Two Numbers Measure</h2>

      <p>
        Blood pressure is recorded in millimetres of mercury (mmHg) as systolic over diastolic - for
        example, 120/80.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Systolic (top number)</strong>: the peak pressure in your arteries when the
            heart contracts and pushes blood out.
          </li>
          <li>
            <strong>Diastolic (bottom number)</strong>: the lowest pressure, while the heart relaxes
            and refills between beats.
          </li>
        </ul>
      </div>

      <p>
        Both matter. Systolic pressure tends to rise with age as large arteries stiffen, and after
        middle age it is the stronger predictor of heart disease and stroke for most people. A high
        diastolic number is more common in younger adults and still counts on its own.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The AHA/ACC Categories</h2>

      <p>
        Our calculator uses the adult categories from the 2017 American College of Cardiology /
        American Heart Association guideline:
      </p>

      <div className="neumorph p-6 rounded-lg my-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Systolic (mmHg)</th>
              <th className="py-2 pr-4"></th>
              <th className="py-2">Diastolic (mmHg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 pr-4 font-semibold">Normal</td>
              <td className="py-2 pr-4">under 120</td>
              <td className="py-2 pr-4">and</td>
              <td className="py-2">under 80</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Elevated</td>
              <td className="py-2 pr-4">120-129</td>
              <td className="py-2 pr-4">and</td>
              <td className="py-2">under 80</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Stage 1 hypertension</td>
              <td className="py-2 pr-4">130-139</td>
              <td className="py-2 pr-4">or</td>
              <td className="py-2">80-89</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Stage 2 hypertension</td>
              <td className="py-2 pr-4">140 or higher</td>
              <td className="py-2 pr-4">or</td>
              <td className="py-2">90 or higher</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold">Hypertensive crisis</td>
              <td className="py-2 pr-4">180 or higher</td>
              <td className="py-2 pr-4">or</td>
              <td className="py-2">120 or higher</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Notice the small words in the middle column. &ldquo;Normal&rdquo; and &ldquo;Elevated&rdquo;
        require <em>both</em> numbers to qualify. The hypertension stages need only <em>one</em>. In
        practice that means your category is decided by whichever number falls in the higher band.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Worked Examples</h3>

      <p>These are the categories our calculator returns for a few common readings:</p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>119/79</strong>: Normal - both numbers are under their limits.
          </li>
          <li>
            <strong>128/78</strong>: Elevated - systolic is 120-129 and diastolic is under 80.
          </li>
          <li>
            <strong>118/82</strong>: Stage 1 hypertension - the systolic is normal, but a diastolic
            of 82 is in the 80-89 band.
          </li>
          <li>
            <strong>122/80</strong>: Stage 1 hypertension - a diastolic of exactly 80 is already in
            the stage 1 band.
          </li>
          <li>
            <strong>132/92</strong>: Stage 2 hypertension - the diastolic of 92 outranks the stage 1
            systolic.
          </li>
          <li>
            <strong>185/100</strong>: Hypertensive crisis - systolic is 180 or higher.
          </li>
        </ul>
      </div>

      <p>
        These labels describe a reading. A diagnosis of hypertension is based on the average of
        several readings taken on separate occasions, ideally confirmed outside the clinic.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Why Guidelines Draw the Line in Different Places
      </h2>

      <p>
        If you have read that hypertension starts at 140/90, that is not out of date - it depends on
        which guideline you follow.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>US (2017 ACC/AHA)</strong>: hypertension from 130/80, with an
            &ldquo;elevated&rdquo; band of 120-129 systolic below it.
          </li>
          <li>
            <strong>Europe (2024 ESC)</strong>: hypertension from 140/90 measured in the office. It
            adds an &ldquo;elevated blood pressure&rdquo; band of 120-139 systolic or 70-89
            diastolic, and calls anything under 120/70 non-elevated.
          </li>
          <li>
            <strong>UK (NICE NG136)</strong>: hypertension when clinic readings are 140/90 or higher
            <em> and</em> home or 24-hour ambulatory readings average 135/85 or higher.
          </li>
        </ul>
      </div>

      <p>
        The guidelines largely agree on the underlying evidence: cardiovascular risk climbs steadily
        across the whole range of blood pressure. A large pooled analysis of 61 cohort studies found
        that, in middle-aged adults, every 20 mmHg higher systolic (or 10 mmHg higher diastolic)
        above about 115/75 was associated with roughly double the risk of death from heart disease
        and stroke. Where they differ is in where to put a label on a continuous risk, and at what
        point medication becomes worth it. A 130/80 threshold flags more people earlier, mostly for
        lifestyle changes rather than immediate medication.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">How to Take a Home Reading You Can Trust</h2>

      <p>
        Home readings are useful precisely because they are taken away from the clinic, but only if
        the technique is consistent. The American Heart Association&rsquo;s measurement guidance
        boils down to:
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ol className="list-decimal list-inside space-y-2">
          <li>Avoid caffeine, exercise, and smoking for at least 30 minutes beforehand</li>
          <li>Empty your bladder, then sit quietly for 5 minutes</li>
          <li>Sit with your back supported, feet flat on the floor, and legs uncrossed</li>
          <li>Rest your arm on a table so the cuff is at heart level</li>
          <li>Put the cuff on bare skin on your upper arm, not over a sleeve</li>
          <li>Don&rsquo;t talk while the reading is taken</li>
          <li>Take two or more readings about a minute apart and record the average</li>
        </ol>
      </div>

      <p>
        For a picture of your usual blood pressure, NICE suggests readings in the morning and
        evening for at least 4 days (ideally 7), discarding the first day and averaging the rest.
        Use a validated upper-arm monitor - wrist and finger devices are more sensitive to position.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Cuff Size Matters</h3>

      <p>
        A cuff that is too small for your arm tends to read <em>high</em>, and one that is too large
        tends to read low. Most monitors print the arm circumference range on the cuff; measure your
        upper arm at its midpoint and check it falls inside that range.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">White Coat and Masked Hypertension</h2>

      <p>Clinic and home readings don&rsquo;t always agree, and the mismatch has names:</p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>White coat hypertension</strong>: high in the clinic, normal at home. Nerves or
            the rush to get to the appointment can push readings up.
          </li>
          <li>
            <strong>Masked hypertension</strong>: normal in the clinic, high at home or over 24
            hours. It is easy to miss, which is one reason guidelines recommend out-of-office
            measurement.
          </li>
        </ul>
      </div>

      <p>
        Both are good reasons to share a log of home readings with your clinician instead of relying
        on a single number taken in the office.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">When a Reading Is an Emergency</h2>

      <p>
        A reading of 180/120 or higher is in the crisis range. The American Heart Association
        advises waiting a minute and measuring again. If it is still that high and you have no
        symptoms, contact your healthcare provider promptly. If you have symptoms such as chest
        pain, shortness of breath, back pain, numbness or weakness, a change in vision, or
        difficulty speaking, call emergency services rather than waiting to see whether it comes
        down.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What Moves the Numbers</h2>

      <p>
        For readings in the elevated and stage 1 range, the 2017 guideline puts lifestyle changes
        first. The measures with the best evidence are:
      </p>

      <ul className="list-disc list-inside space-y-2 my-4">
        <li>
          Losing excess weight, if you are carrying it (our{' '}
          <Link href="/bmi" className="text-accent hover:underline">
            BMI
          </Link>{' '}
          and{' '}
          <Link href="/waist-to-height-ratio" className="text-accent hover:underline">
            waist-to-height ratio
          </Link>{' '}
          calculators are a starting point)
        </li>
        <li>A DASH-style eating pattern: vegetables, fruit, whole grains, and low-fat dairy</li>
        <li>Eating less sodium</li>
        <li>
          More potassium from food, unless you have kidney disease or take medication that affects
          potassium
        </li>
        <li>Regular aerobic and resistance exercise</li>
        <li>Limiting alcohol</li>
      </ul>

      <p>
        Whether medication is also needed depends on your readings and your overall cardiovascular
        risk, which is a conversation to have with a clinician. Don&rsquo;t start, stop, or change
        blood pressure medication based on a calculator result.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Common Mistakes</h2>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Mistake #1: Ignoring the Bottom Number</h3>
        <p>
          A systolic under 120 doesn&rsquo;t make a reading normal. A diastolic of 80 or more puts
          it in stage 1 on its own.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Mistake #2: Reacting to a Single Reading</h3>
        <p>
          Blood pressure changes minute to minute. One high reading after climbing the stairs tells
          you very little; a week of consistent home readings tells you a lot.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Mistake #3: Measuring Over Clothing</h3>
        <p>
          A cuff over a sleeve, or a rolled-up sleeve squeezing the arm, can distort the reading.
          Bare upper arm, correct cuff size, arm supported at heart level.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">
          Mistake #4: Applying Adult Cut-offs to Children
        </h3>
        <p>
          These categories are for adults. Blood pressure in children and teenagers is judged
          against percentiles for age, sex, and height, so ask a pediatrician instead.
        </p>
      </div>

      <MedicalDisclaimer variant="full" className="my-8" />

      <RelatedCalculatorLinks
        slugs={['blood-pressure', 'resting-heart-rate', 'waist-to-height-ratio', 'bmi']}
      />
      <RelatedGuides />

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Whelton PK, Carey RM, Aronow WS, et al. 2017
            ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention,
            Detection, Evaluation, and Management of High Blood Pressure in Adults. Hypertension.
            2018;71(6):e13-e115.
          </li>
          <li>
            Muntner P, Shimbo D, Carey RM, et al. Measurement of Blood Pressure in Humans: A
            Scientific Statement From the American Heart Association. Hypertension.
            2019;73(5):e35-e66.
          </li>
          <li>
            McEvoy JW, McCarthy CP, Bruno RM, et al. 2024 ESC Guidelines for the management of
            elevated blood pressure and hypertension. European Heart Journal. 2024;45(38):3912-4018.
          </li>
          <li>
            National Institute for Health and Care Excellence. Hypertension in adults: diagnosis and
            management (NG136). 2019, updated 2023.
          </li>
          <li>
            Lewington S, Clarke R, Qizilbash N, Peto R, Collins R; Prospective Studies
            Collaboration. Age-specific relevance of usual blood pressure to vascular mortality: a
            meta-analysis of individual data for one million adults in 61 prospective studies.
            Lancet. 2002;360(9349):1903-1913.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function BloodPressureNumbersExplainedPage() {
  return BloodPressureNumbersExplainedPageContent;
}
