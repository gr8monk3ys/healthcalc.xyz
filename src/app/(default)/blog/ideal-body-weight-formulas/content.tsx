import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AdBlock from '@/components/AdBlock';
import RelatedCalculatorLinks from '@/components/RelatedCalculatorLinks';
import RelatedGuides from '@/components/RelatedGuides';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

const TITLE =
  'Ideal Body Weight Formulas Explained: Devine, Hamwi, Robinson, and Miller | HealthCalc Blog';
const DESCRIPTION =
  'Where the four ideal body weight formulas come from, why they disagree, what they were built for (drug dosing, not goal weights), and how to read your result.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'ideal body weight, ideal weight calculator, Devine formula, Hamwi formula, Robinson formula, Miller formula, IBW, adjusted body weight, healthy weight range, BMI',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/ideal-body-weight-formulas',
    images: [
      {
        url: '/images/blog/ideal-body-weight-formulas.jpg',
        width: 1200,
        height: 630,
        alt: 'Ideal Body Weight Formulas Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/blog/ideal-body-weight-formulas.jpg'],
  },
};

const IdealBodyWeightFormulasPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Health &amp; Science
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        Ideal Body Weight Formulas Explained: Devine, Hamwi, Robinson, and Miller
      </h1>
      <p className="text-gray-500 italic">9 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>All four common ideal body weight (IBW) formulas use only height and sex</li>
          <li>
            They were designed for clinical calculations such as drug dosing, not as goal weights
          </li>
          <li>
            The formulas can disagree by several kilograms, and the gap widens at shorter heights
          </li>
          <li>None of them account for muscle, frame, age, or where you carry fat</li>
          <li>Treat the result as a reference point to discuss with a clinician, not a target</li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <p>
        Type your height into an ideal weight calculator and you get a confident-looking number.
        Type it into a different calculator and you may get a different one. That is not a bug:
        there are several &ldquo;ideal body weight&rdquo; formulas in common use, they were
        published by different authors for different purposes, and they do not agree with each
        other.
      </p>

      <p>
        This guide walks through the four formulas our{' '}
        <Link href="/ideal-weight" className="text-accent hover:underline">
          Ideal Weight Calculator
        </Link>{' '}
        uses, shows exactly how each one is calculated, and explains what the result can and cannot
        tell you.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What &ldquo;Ideal Body Weight&rdquo; Means</h2>

      <p>
        In clinical use, ideal body weight (IBW) is a height-based reference weight. Its best-known
        job is in pharmacy: some medications are dosed on a weight that is less affected by body fat
        than actual body weight, and IBW is one way to estimate that. The Devine formula, for
        example, was published in 1974 in a paper on dosing the antibiotic gentamicin.
      </p>

      <p>
        Over time the same formulas migrated into consumer tools and started being read as
        &ldquo;the weight you should be.&rdquo; That is a much bigger claim than the formulas were
        built to support. A 2000 review in the <em>Annals of Pharmacotherapy</em> (Pai and Paloucek)
        traced the origins of these equations and cautioned that they were not derived from data
        linking weight to health outcomes.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Four Formulas</h2>

      <p>
        Every formula has the same shape: a base weight at 5 feet (60 inches) tall, plus a fixed
        number of kilograms for each inch above that. Only the numbers change.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Devine (1974)</h3>
      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">Men: 50 kg + 2.3 kg per inch over 5 ft</p>
        <p className="font-mono text-sm mb-2">Women: 45.5 kg + 2.3 kg per inch over 5 ft</p>
        <p>
          The most widely used IBW formula in clinical settings. Our{' '}
          <Link href="/adjusted-body-weight" className="text-accent hover:underline">
            Adjusted Body Weight Calculator
          </Link>{' '}
          uses Devine as its starting point.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Hamwi (1964)</h3>
      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">Men: 48 kg + 2.7 kg per inch over 5 ft</p>
        <p className="font-mono text-sm mb-2">Women: 45.5 kg + 2.2 kg per inch over 5 ft</p>
        <p>
          The oldest of the four, originally a rule of thumb in pounds (106 lb plus 6 lb per inch
          for men, 100 lb plus 5 lb per inch for women). Its steeper per-inch slope for men means it
          usually gives the highest result for taller men.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Robinson (1983)</h3>
      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">Men: 52 kg + 1.9 kg per inch over 5 ft</p>
        <p className="font-mono text-sm mb-2">Women: 49 kg + 1.7 kg per inch over 5 ft</p>
        <p>
          Published as a proposed modification of Devine for drug dosing. A higher base and a
          gentler slope mean it gives more weight to shorter people and less to taller people than
          Devine does.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Miller (1983)</h3>
      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">Men: 56.2 kg + 1.41 kg per inch over 5 ft</p>
        <p className="font-mono text-sm mb-2">Women: 53.1 kg + 1.36 kg per inch over 5 ft</p>
        <p>
          Also published in 1983 as an alternative to Devine. It has the highest base and the
          flattest slope, so it tends to give the highest number for shorter people and the lowest
          for taller men.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Worked Examples</h2>

      <p>
        These are the exact results our calculator returns. Height is converted to inches (height in
        cm divided by 2.54), 60 is subtracted, and each formula is applied.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Man, 180 cm (about 5 ft 10.9 in)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Devine</strong>: 50 + 2.3 &times; 10.87 = <strong>75.0 kg</strong>
          </li>
          <li>
            <strong>Hamwi</strong>: 48 + 2.7 &times; 10.87 = <strong>77.3 kg</strong>
          </li>
          <li>
            <strong>Robinson</strong>: 52 + 1.9 &times; 10.87 = <strong>72.6 kg</strong>
          </li>
          <li>
            <strong>Miller</strong>: 56.2 + 1.41 &times; 10.87 = <strong>71.5 kg</strong>
          </li>
        </ul>
        <p className="mt-3">
          Average 74.1 kg (163.4 lb); range 71.5-77.3 kg, a spread of about 6 kg.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Woman, 165 cm (about 5 ft 5 in)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Devine</strong>: 45.5 + 2.3 &times; 4.96 = <strong>56.9 kg</strong>
          </li>
          <li>
            <strong>Hamwi</strong>: 45.5 + 2.2 &times; 4.96 = <strong>56.4 kg</strong>
          </li>
          <li>
            <strong>Robinson</strong>: 49 + 1.7 &times; 4.96 = <strong>57.4 kg</strong>
          </li>
          <li>
            <strong>Miller</strong>: 53.1 + 1.36 &times; 4.96 = <strong>59.8 kg</strong>
          </li>
        </ul>
        <p className="mt-3">Average 57.6 kg (127.0 lb); range 56.4-59.8 kg.</p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Why the Formulas Disagree</h2>

      <p>
        Because each formula is a straight line with a different starting point and slope, the lines
        cross. Near the middle of the height range they land fairly close together; toward the short
        and tall ends they spread apart.
      </p>

      <p>
        The formulas were also framed around adults 5 feet tall and over. Below 60 inches the
        &ldquo;inches over 5 feet&rdquo; term turns negative and the formulas subtract weight
        instead of adding it. For a woman at 150 cm (about 4 ft 11 in), our calculator returns 43.3
        kg with Devine but 51.8 kg with Miller, a gap of 8.5 kg. If you are under 5 feet, treat any
        single IBW number with extra caution.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">How IBW Compares With BMI</h2>

      <p>
        A useful sanity check is to compare an IBW result with the adult BMI range the World Health
        Organization classifies as &ldquo;normal weight&rdquo; (18.5-24.9). At 180 cm that range
        runs from about 59.9 kg to 80.7 kg; the four formulas above (71.5-77.3 kg) all sit inside
        it, at BMIs of roughly 22-24. At 165 cm the BMI range is about 50.4-67.8 kg, and the
        formulas again fall inside it.
      </p>

      <p>
        In other words, the formulas pick a single point inside a much wider range. The{' '}
        <Link href="/bmi" className="text-accent hover:underline">
          BMI Calculator
        </Link>{' '}
        shows that wider range, and our guide to{' '}
        <Link href="/blog/body-composition-beyond-bmi" className="text-accent hover:underline">
          body composition beyond BMI
        </Link>{' '}
        covers why neither number tells the whole story on its own.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What IBW Leaves Out</h2>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Muscle mass</strong>: Two people of the same height and sex get the same IBW
            whether they carry a lot of muscle or very little. A muscular person can sit well above
            their IBW while having a low body fat percentage.
          </li>
          <li>
            <strong>Fat distribution</strong>: Where fat is stored matters for health risk. Waist
            measures such as the{' '}
            <Link href="/waist-to-height-ratio" className="text-accent hover:underline">
              waist-to-height ratio
            </Link>{' '}
            capture this; height-only formulas cannot.
          </li>
          <li>
            <strong>Age, frame, and ethnicity</strong>: None of the four formulas adjust for these.
          </li>
          <li>
            <strong>Children, pregnancy, and medical conditions</strong>: The formulas are for
            adults and are not a guide for anyone in these groups.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Adjusted Body Weight: The Clinical Follow-On</h2>

      <p>
        When someone&rsquo;s actual weight is well above their IBW, some clinical calculations use
        an adjusted body weight that sits between the two. Our calculator uses the common form:
      </p>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">
          Adjusted weight = IBW + 0.4 &times; (actual weight - IBW)
        </p>
        <p>
          For a 180 cm man weighing 110 kg: 75.0 + 0.4 &times; (110 - 75.0) ={' '}
          <strong>89.0 kg</strong>.
        </p>
      </div>

      <p>
        This is a calculation tool for clinicians, not a weight goal. If a medication dose or
        nutrition plan depends on it, the prescribing clinician or dietitian should choose the
        method.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">How to Use Your Result</h2>

      <ul className="list-disc list-inside space-y-2 my-4">
        <li>Read the range across all four formulas, not the single highest or lowest number</li>
        <li>Pair it with a body composition measure such as body fat or lean body mass</li>
        <li>Check a waist-based measure for a view of fat distribution</li>
        <li>
          Talk to a doctor or registered dietitian before setting a weight goal, especially if you
          have a medical condition
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>

      <p>
        Ideal body weight formulas are simple height-and-sex equations that were built for clinical
        arithmetic. They are useful as a rough reference, and comparing all four shows how much
        uncertainty sits behind any single number. They are not a measure of health and not a weight
        you are obliged to reach.
      </p>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Calculators Mentioned in This Guide</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link href="/ideal-weight" className="text-accent hover:underline">
              Ideal Weight Calculator
            </Link>{' '}
            - Devine, Hamwi, Robinson, and Miller side by side, with the average and range
          </li>
          <li>
            <Link href="/adjusted-body-weight" className="text-accent hover:underline">
              Adjusted Body Weight Calculator
            </Link>{' '}
            - Devine IBW plus the 40% correction
          </li>
          <li>
            <Link href="/bmi" className="text-accent hover:underline">
              BMI Calculator
            </Link>{' '}
            - The wider weight-for-height range
          </li>
          <li>
            <Link href="/body-fat" className="text-accent hover:underline">
              Body Fat Calculator
            </Link>{' '}
            - What your weight is made of
          </li>
          <li>
            <Link href="/waist-to-height-ratio" className="text-accent hover:underline">
              Waist-to-Height Ratio Calculator
            </Link>{' '}
            - Where you carry it
          </li>
        </ul>
      </div>

      <MedicalDisclaimer variant="full" className="mt-8" />

      <RelatedCalculatorLinks
        slugs={['ideal-weight', 'adjusted-body-weight', 'bmi', 'lean-body-mass']}
      />
      <RelatedGuides />

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974;8:650-655.</li>
          <li>
            Hamwi GJ. Therapy: changing dietary concepts. In: Danowski TS, ed. Diabetes Mellitus:
            Diagnosis and Treatment. American Diabetes Association; 1964:73-78.
          </li>
          <li>
            Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M. Determination of ideal body
            weight for drug dosage calculations. Am J Hosp Pharm. 1983;40(6):1016-1019.
          </li>
          <li>
            Miller DR, Carlson JD, Lloyd BJ, Day BJ. Determining ideal body weight (and mass). Am J
            Hosp Pharm. 1983;40(10):1622-1625.
          </li>
          <li>
            Pai MP, Paloucek FP. The origin of the &ldquo;ideal&rdquo; body weight equations. Ann
            Pharmacother. 2000;34(9):1066-1069.
          </li>
          <li>World Health Organization. Body mass index (BMI) classification for adults.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default function IdealBodyWeightFormulasPage() {
  return IdealBodyWeightFormulasPageContent;
}
