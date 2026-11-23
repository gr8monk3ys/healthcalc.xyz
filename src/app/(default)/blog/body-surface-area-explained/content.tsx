import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AdBlock from '@/components/AdBlock';
import RelatedCalculatorLinks from '@/components/RelatedCalculatorLinks';
import RelatedGuides from '@/components/RelatedGuides';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

const TITLE =
  'Body Surface Area Explained: The Mosteller Formula and Why Doses Use It | HealthCalc Blog';
const DESCRIPTION =
  'How body surface area is estimated from height and weight, why the Mosteller and DuBois formulas disagree for larger bodies, and what clinicians use the number for.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'body surface area, BSA, BSA calculator, Mosteller formula, DuBois formula, body surface area formula, chemotherapy dosing, mg/m2, eGFR 1.73 m2',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/body-surface-area-explained',
    images: [
      {
        url: '/images/blog/body-surface-area-explained.jpg',
        width: 1200,
        height: 630,
        alt: 'Body Surface Area Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/blog/body-surface-area-explained.jpg'],
  },
};

const linkClass = 'text-accent hover:underline';

const SOURCES = {
  mosteller: 'https://pubmed.ncbi.nlm.nih.gov/3657876/',
  dubois: 'https://pubmed.ncbi.nlm.nih.gov/2520314/',
  verbraecken: 'https://pubmed.ncbi.nlm.nih.gov/16546483/',
  redlarski: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4914842/',
  sawyer: 'https://pubmed.ncbi.nlm.nih.gov/11392451/',
  gurney: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2375356/',
  asco: 'https://pubmed.ncbi.nlm.nih.gov/22473167/',
  nkf: 'https://www.kidney.org/professionals/gfr_calculator',
} as const;

const BodySurfaceAreaExplainedPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Health &amp; Science
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        Body surface area explained: the Mosteller formula and why doses use it
      </h1>
      <p className="text-gray-500 italic">8 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key takeaways</h2>
        <ul className="space-y-2">
          <li>
            Body surface area (BSA) is a number in square metres, usually estimated from height and
            weight with one of many published formulas.
          </li>
          <li>
            Our calculator uses the Mosteller formula: the square root of height in centimetres
            times weight in kilograms, divided by 3,600.
          </li>
          <li>
            Clinicians use BSA to scale some drug doses, chemotherapy above all, and to index
            measurements such as cardiac output and kidney function.
          </li>
          <li>
            The common formulas agree closely for average-sized adults and drift apart as weight
            rises, and dosing by BSA has serious critics.
          </li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <p>
        Most numbers on this site answer a question about you. Body surface area mostly answers a
        question about a dose. It is the figure a pharmacist multiplies when an order reads
        &ldquo;mg/m&sup2;&rdquo;, and the denominator hiding in a kidney result reported in
        mL/min/1.73 m&sup2;.
      </p>

      <p>
        It is also an estimate, and there is no single way to make it. A 2016 analysis in{' '}
        <em>Scientific Reports</em> by{' '}
        <a href={SOURCES.redlarski} className={linkClass} target="_blank" rel="noopener noreferrer">
          Redlarski, Palkowski and Krawczuk
        </a>{' '}
        lined up 25 published BSA formulas, the oldest from 1879, and found that two of them can
        disagree by as much as 0.5 m&sup2; for an adult of ordinary build. This post covers the
        formula our{' '}
        <Link href="/body-surface-area" className={linkClass}>
          Body Surface Area Calculator
        </Link>{' '}
        uses, set against the older one it is usually compared with, and then where the number
        actually gets used.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The formula our calculator uses</h2>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">
          BSA (m&sup2;) = &radic;( height (cm) &times; weight (kg) / 3600 )
        </p>
        <p>
          This is the Mosteller formula, published as a one-page letter in the{' '}
          <a
            href={SOURCES.mosteller}
            className={linkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>New England Journal of Medicine</em> in 1987
          </a>
          .
        </p>
      </div>

      <p>
        Its selling point was convenience. A 2006 comparison study in <em>Metabolism</em> (
        <a
          href={SOURCES.verbraecken}
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          Verbraecken and colleagues
        </a>
        ) described it as a formula that &ldquo;could be easily remembered and evaluated on a pocket
        calculator&rdquo;, and noted in the same breath that validation data in adults were rare. If
        you enter feet, inches and pounds, our calculator converts them to centimetres and kilograms
        first, applies the same formula and rounds the answer to two decimal places.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Worked examples</h2>

      <p>
        The Mosteller column below is what the calculator returns for each input. The DuBois column
        applies the 1916 formula covered in the next section, for comparison.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              <th className="py-2 pr-4">Height</th>
              <th className="py-2 pr-4">Weight</th>
              <th className="py-2 pr-4">Mosteller (calculator)</th>
              <th className="py-2 pr-4">DuBois</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 pr-4">180 cm</td>
              <td className="py-2 pr-4">80 kg</td>
              <td className="py-2 pr-4">2.00 m&sup2;</td>
              <td className="py-2 pr-4">2.00 m&sup2;</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">170 cm</td>
              <td className="py-2 pr-4">70 kg</td>
              <td className="py-2 pr-4">1.82 m&sup2;</td>
              <td className="py-2 pr-4">1.81 m&sup2;</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">160 cm</td>
              <td className="py-2 pr-4">50 kg</td>
              <td className="py-2 pr-4">1.49 m&sup2;</td>
              <td className="py-2 pr-4">1.50 m&sup2;</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">165 cm</td>
              <td className="py-2 pr-4">110 kg</td>
              <td className="py-2 pr-4">2.25 m&sup2;</td>
              <td className="py-2 pr-4">2.15 m&sup2;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The first row is the tidy one. 180 times 80 is 14,400; divided by 3,600 that is 4, and the
        square root of 4 is 2. The last row is the one worth looking at, and the rest of this post
        is mostly about why it differs.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The older formula: DuBois and DuBois, 1916</h2>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-mono text-sm mb-2">
          BSA (m&sup2;) = 0.007184 &times; weight (kg)<sup>0.425</sup> &times; height (cm)
          <sup>0.725</sup>
        </p>
        <p>
          Published by D. Du Bois and E. F. Du Bois in the <em>Archives of Internal Medicine</em> in
          1916 (
          <a href={SOURCES.dubois} className={linkClass} target="_blank" rel="noopener noreferrer">
            reprinted in <em>Nutrition</em>, 1989
          </a>
          ). The coefficients are as listed in Table 1 of{' '}
          <a
            href={SOURCES.redlarski}
            className={linkClass}
            target="_blank"
            rel="noopener noreferrer"
          >
            Redlarski 2016
          </a>
          .
        </p>
      </div>

      <p>
        DuBois is the formula Mosteller is measured against, and it rests on very little data.
        Verbraecken&rsquo;s paper points out it was derived from only nine subjects. In a 2001
        review in <em>Investigational New Drugs</em>,{' '}
        <a href={SOURCES.sawyer} className={linkClass} target="_blank" rel="noopener noreferrer">
          Sawyer and Ratain
        </a>{' '}
        called it the formula used in adult medical oncology anyway, and added that later attempts
        to validate it had found it to over- or underestimate measured BSA.
      </p>

      <p>
        It also survives in kidney medicine. The National Kidney Foundation&rsquo;s{' '}
        <a href={SOURCES.nkf} className={linkClass} target="_blank" rel="noopener noreferrer">
          eGFR calculator
        </a>{' '}
        uses the DuBois method when it converts a kidney result to a person&rsquo;s own body size.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Where the two formulas part ways</h2>

      <p>
        For the three average-sized adults in the table, Mosteller and DuBois land within 0.01
        m&sup2; of each other. At 165 cm and 110 kg the gap is 0.10 m&sup2;, close to 5%.
      </p>

      <p>
        That pattern matches the largest comparison in the reading list. Verbraecken and colleagues
        ran Mosteller and a set of other formulas over 1,868 adults, grouped by BMI. Mosteller
        averaged 1.81 m&sup2; in the normal-weight group, the same as DuBois. In the obese group it
        averaged 2.21 m&sup2; against 2.14 m&sup2; for DuBois, and the authors estimated that DuBois
        underestimated BSA in obese patients by as much as 3% in men and 5% in women.
      </p>

      <p>
        Which number is closer to the truth depends on what you treat as the truth. The same paper
        also checked the traditional formulas against one built from three-dimensional body scans
        (Yu and colleagues, 2003) and found that, by that yardstick, the traditional formulas
        overestimate. Redlarski&rsquo;s group, looking across all 25 formulas, concluded that
        choosing one &ldquo;is a difficult task&rdquo;. None of them has settled it.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What the number is used for</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">Scaling drug doses</h3>

      <p>
        Chemotherapy is where BSA most often shows up in a prescription; Verbraecken&rsquo;s paper
        names it first among the formula&rsquo;s uses. Sawyer and Ratain trace the habit back to
        early drug trials: BSA was brought into medical oncology to translate animal toxicology data
        into a safe starting dose for first-in-human (phase I) studies. They add that &ldquo;it is
        not clear&rdquo; why the practice spread from there to routine dosing.
      </p>

      <p>
        The arithmetic is plain multiplication. Take a hypothetical drug ordered at 100 mg/m&sup2;.
        For the 180 cm, 80 kg adult in the table that is 200 mg by either formula. For the 165 cm,
        110 kg adult it is 225 mg by Mosteller and 215 mg by DuBois. That example is invented to
        show the mechanics, not to model a real prescription.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Indexing other measurements</h3>

      <p>
        BSA is also a denominator. Verbraecken&rsquo;s paper lists indexing cardiac output as one of
        its common uses. Kidney function is the more familiar case. The National Kidney
        Foundation&rsquo;s calculator reports eGFR standardized to a body surface area of 1.73
        m&sup2;, says CKD staging should generally use that indexed value, and says drug dosing
        decisions should generally use the value adjusted to the patient&rsquo;s own BSA instead.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The case against dosing by surface area</h2>

      <p>
        The strongest criticism comes from the oncologists who use it. Sawyer and Ratain found that
        the link between BSA and the measures that matter for how a drug is cleared, such as kidney
        and liver function, is weak or nonexistent. They also noted that only three drugs
        (epirubicin, etoposide and carboplatin) had been studied to see whether BSA dosing reduced
        variation between patients, and none showed a significant relationship between how the body
        handled the drug and BSA.
      </p>

      <p>
        In a 2002 paper in the <em>British Journal of Cancer</em>,{' '}
        <a href={SOURCES.gurney} className={linkClass} target="_blank" rel="noopener noreferrer">
          Howard Gurney
        </a>{' '}
        argued that unrecognised underdosing may affect 30% or more of patients on standard
        regimens, and proposed rules for calculating doses until better methods arrived.
      </p>

      <p>
        Body size cuts the other way as well. A 2012{' '}
        <a href={SOURCES.asco} className={linkClass} target="_blank" rel="noopener noreferrer">
          American Society of Clinical Oncology guideline
        </a>{' '}
        reported that up to 40% of obese patients received limited chemotherapy doses not based on
        actual body weight, found concerns about toxicity from full doses &ldquo;unfounded&rdquo;,
        and recommended full weight-based doses, particularly when the goal of treatment is cure.
        That is where the gap between formulas stops being academic. The people for whom Mosteller
        and DuBois disagree most, adults with obesity, are the people that guideline was written
        about.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Reading your own result</h2>

      <p>
        The calculator gives one number in square metres. None of the papers above treat BSA as a
        health score, and nothing in this post suggests a bigger or smaller one is better. It is an
        input to other calculations. If you are curious how your size breaks down, the{' '}
        <Link href="/lean-body-mass" className={linkClass}>
          Lean Body Mass Calculator
        </Link>{' '}
        and{' '}
        <Link href="/bmi" className={linkClass}>
          BMI Calculator
        </Link>{' '}
        answer different questions from the same height and weight, and our guide to{' '}
        <Link href="/blog/body-composition-beyond-bmi" className={linkClass}>
          body composition beyond BMI
        </Link>{' '}
        covers what weight alone misses.
      </p>

      <p>
        If a treatment you are receiving is dosed by BSA, the care team chooses the formula and the
        weight that go into it, and their figure may not match this one to the second decimal. Ask
        them which formula they use. On the hypothetical 100 mg/m&sup2; order for the 165 cm, 110 kg
        adult above, the answer was worth ten milligrams.
      </p>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Calculators mentioned in this guide</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link href="/body-surface-area" className={linkClass}>
              Body Surface Area Calculator
            </Link>{' '}
            - the Mosteller formula, rounded to two decimals
          </li>
          <li>
            <Link href="/lean-body-mass" className={linkClass}>
              Lean Body Mass Calculator
            </Link>{' '}
            - how much of your weight is not fat
          </li>
          <li>
            <Link href="/bmi" className={linkClass}>
              BMI Calculator
            </Link>{' '}
            - weight relative to height
          </li>
          <li>
            <Link href="/ideal-weight" className={linkClass}>
              Ideal Weight Calculator
            </Link>{' '}
            - a reference weight from height and sex
          </li>
        </ul>
      </div>

      <MedicalDisclaimer variant="full" className="mt-8" />

      <RelatedCalculatorLinks
        slugs={['body-surface-area', 'lean-body-mass', 'bmi', 'ideal-weight']}
      />
      <RelatedGuides />

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Mosteller RD. Simplified calculation of body-surface area. N Engl J Med.
            1987;317(17):1098.{' '}
            <a
              href={SOURCES.mosteller}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              PubMed 3657876
            </a>
          </li>
          <li>
            Du Bois D, Du Bois EF. A formula to estimate the approximate surface area if height and
            weight be known. Arch Intern Med. 1916;17:863-871. Reprinted in Nutrition.
            1989;5(5):303-311.{' '}
            <a
              href={SOURCES.dubois}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              PubMed 2520314
            </a>
          </li>
          <li>
            Verbraecken J, Van de Heyning P, De Backer W, Van Gaal L. Body surface area in
            normal-weight, overweight, and obese adults. A comparison study. Metabolism.
            2006;55(4):515-524.{' '}
            <a
              href={SOURCES.verbraecken}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              PubMed 16546483
            </a>
          </li>
          <li>
            Redlarski G, Palkowski A, Krawczuk M. Body surface area formulae: an alarming ambiguity.
            Sci Rep. 2016;6:27966.{' '}
            <a
              href={SOURCES.redlarski}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              PMC4914842
            </a>
          </li>
          <li>
            Sawyer M, Ratain MJ. Body surface area as a determinant of pharmacokinetics and drug
            dosing. Invest New Drugs. 2001;19(2):171-177.{' '}
            <a
              href={SOURCES.sawyer}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              PubMed 11392451
            </a>
          </li>
          <li>
            Gurney H. How to calculate the dose of chemotherapy. Br J Cancer. 2002;86(8):1297-1302.{' '}
            <a
              href={SOURCES.gurney}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              PMC2375356
            </a>
          </li>
          <li>
            Griggs JJ, Mangu PB, Anderson H, et al. Appropriate chemotherapy dosing for obese adult
            patients with cancer: American Society of Clinical Oncology clinical practice guideline.
            J Clin Oncol. 2012;30(13):1553-1561.{' '}
            <a href={SOURCES.asco} className={linkClass} target="_blank" rel="noopener noreferrer">
              PubMed 22473167
            </a>
          </li>
          <li>
            National Kidney Foundation. eGFR calculator.{' '}
            <a href={SOURCES.nkf} className={linkClass} target="_blank" rel="noopener noreferrer">
              kidney.org
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function BodySurfaceAreaExplainedPage() {
  return BodySurfaceAreaExplainedPageContent;
}
