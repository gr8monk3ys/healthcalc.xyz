import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

export const metadata: Metadata = {
  title: 'Editorial Process | HealthCheck',
  description:
    'Learn how HealthCheck researches, develops, and reviews health calculator tools and content. Our editorial process ensures accuracy and trustworthiness.',
  alternates: {
    canonical: '/about/editorial',
  },
  openGraph: {
    title: 'Editorial Process | HealthCheck',
    description:
      'Learn how HealthCheck researches, develops, and reviews health calculator tools and content.',
    url: 'https://www.healthcalc.xyz/about/editorial',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
  },
};

export default function EditorialProcessPage(): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Our Editorial Process</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        How we research, build, and maintain trustworthy health tools and content.
      </p>

      {/* Overview */}
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment to Accuracy</h2>
        <p className="mb-4">
          HealthCheck provides health and fitness calculators that millions of people depend on to
          make decisions about their wellbeing. We take that responsibility seriously. Every
          calculator formula, every piece of educational content, and every recommendation on this
          site goes through a structured process designed to ensure it is accurate, current, and
          backed by credible science.
        </p>
        <p>
          Health content is classified as &quot;Your Money or Your Life&quot; (YMYL) by major search
          engines because it can directly affect a person&apos;s health and safety. That
          classification drives our editorial standards: we hold ourselves to the same rigor you
          would expect from a clinical reference, while keeping the language accessible to everyone.
        </p>
      </div>

      {/* Research Process */}
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How We Research Content</h2>
        <p className="mb-4">
          All content on HealthCheck starts with a review of the current scientific literature. We
          draw from peer-reviewed journals, clinical guidelines, and established textbooks in
          exercise science, nutrition, and public health. We do not rely on anecdotal claims or
          unverified sources.
        </p>
        <ul className="list-disc pl-6 space-y-3 mb-4">
          <li>
            <strong>Primary sources:</strong> Peer-reviewed journals such as the American Journal of
            Clinical Nutrition, Medicine &amp; Science in Sports &amp; Exercise, the British Journal
            of Nutrition, and the International Journal of Obesity.
          </li>
          <li>
            <strong>Clinical guidelines:</strong> Recommendations from organizations like the
            American College of Sports Medicine (ACSM), the World Health Organization (WHO), and the
            National Institutes of Health (NIH).
          </li>
          <li>
            <strong>Established textbooks:</strong> Reference works in exercise physiology,
            nutrition science, and clinical assessment that have been validated across multiple
            editions.
          </li>
        </ul>
        <p>
          When multiple valid approaches exist for a given calculation, we present them
          transparently and explain the trade-offs. For example, our body fat calculator offers both
          the U.S. Navy method and the BMI-based estimation so users can compare and understand the
          limitations of each approach.
        </p>
      </div>

      {/* Calculator Formulas */}
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Scientific Formulas Behind Our Calculators</h2>
        <p className="mb-4">
          Our calculators are built on formulas that have been validated in controlled research
          settings. Here are some of the key methodologies we use:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-semibold">Mifflin-St Jeor Equation (BMR and TDEE)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Published in 1990, this equation is considered the most accurate for estimating basal
              metabolic rate in healthy adults. The American Dietetic Association recommends it as
              the preferred formula for clinical use. We use it as the default in our TDEE, calorie
              deficit, and weight management calculators.
            </p>
          </div>

          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-semibold">Harris-Benedict Equation (BMR Alternative)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              One of the oldest and most widely cited BMR formulas, originally published in 1919 and
              revised in 1984 by Roza and Shizgal. We offer it as an alternative in our TDEE
              calculator for users who want to compare results across methodologies.
            </p>
          </div>

          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-semibold">Katch-McArdle Formula (BMR for Lean Mass)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              This formula accounts for lean body mass, making it more accurate for people who know
              their body fat percentage. It is especially useful for athletes and those with
              above-average muscle mass.
            </p>
          </div>

          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-semibold">U.S. Navy Body Fat Method</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Developed by Hodgdon and Beckett at the Naval Health Research Center, this
              circumference-based method provides a practical estimate of body fat percentage
              without specialized equipment. It correlates well with hydrostatic weighing in most
              populations.
            </p>
          </div>

          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-semibold">WHO BMI Classification</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Our BMI calculator follows the World Health Organization classification system for
              adults and uses CDC growth chart percentiles for children and adolescents, providing
              age- and sex-appropriate assessments.
            </p>
          </div>

          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-semibold">ABSI (A Body Shape Index)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Developed by Krakauer and Krakauer (2012), ABSI accounts for waist circumference
              relative to BMI and height. Research has shown it to be a stronger predictor of
              mortality risk than BMI alone, particularly for identifying abdominal obesity risk.
            </p>
          </div>

          <div className="border-l-4 border-accent pl-4">
            <h3 className="font-semibold">Heart Rate Training Zones</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              We support both the standard age-predicted maximum heart rate method (220 minus age)
              and the Karvonen formula, which factors in resting heart rate for more personalized
              training zone calculations used by the ACSM.
            </p>
          </div>
        </div>
      </div>

      {/* Review Process */}
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Review Process</h2>
        <p className="mb-4">
          Every piece of content goes through a multi-step review before publication:
        </p>

        <ol className="space-y-4 mb-4">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
              1
            </span>
            <div>
              <strong>Research and Drafting</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Content is drafted with references to primary scientific sources. Calculator
                formulas are implemented directly from published research papers.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
              2
            </span>
            <div>
              <strong>Technical Verification</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Calculator outputs are tested against known reference values from published studies.
                Our test suite runs over 850 automated tests to verify calculation accuracy across
                edge cases and different input ranges.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
              3
            </span>
            <div>
              <strong>Professional Review</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Content is reviewed by health and fitness professionals with credentials in exercise
                science, nutrition, or related clinical fields. Reviewers check for factual
                accuracy, appropriate disclaimers, and clarity.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
              4
            </span>
            <div>
              <strong>Publication and Monitoring</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                After publication, we monitor for user feedback, new research, and updated clinical
                guidelines that might require content revisions.
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* Update Frequency */}
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How Often We Update Content</h2>
        <p className="mb-4">
          Health science evolves, and so does our content. We review our calculators and educational
          articles on a regular basis:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <strong>Calculator formulas</strong> are reviewed when new research suggests improved
            methodologies or when existing formulas are updated by their original authors.
          </li>
          <li>
            <strong>Educational content</strong> is reviewed at least annually to ensure it reflects
            current clinical guidelines and best practices.
          </li>
          <li>
            <strong>Product recommendations</strong> in blog posts are updated when products are
            discontinued, new options become available, or pricing changes significantly.
          </li>
          <li>
            <strong>User-reported issues</strong> are investigated and addressed promptly. If you
            notice an error, please{' '}
            <Link href="/contact" className="text-accent hover:underline">
              contact us
            </Link>
            .
          </li>
        </ul>
      </div>

      {/* Sources Policy */}
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Sources and References</h2>
        <p className="mb-4">
          We believe in transparency about where our information comes from. When we cite a specific
          statistic, formula, or clinical recommendation, we reference the original source. Here are
          some of the key references that underpin our calculators:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Mifflin MD, St Jeor ST, et al. &quot;A new predictive equation for resting energy
            expenditure in healthy individuals.&quot; Am J Clin Nutr. 1990;51(2):241-247.
          </li>
          <li>
            Roza AM, Shizgal HM. &quot;The Harris Benedict equation reevaluated.&quot; Am J Clin
            Nutr. 1984;40(1):168-182.
          </li>
          <li>
            Hodgdon JA, Beckett MB. &quot;Prediction of percent body fat for U.S. Navy men and women
            from body circumferences and height.&quot; Naval Health Research Center. 1984.
          </li>
          <li>
            Krakauer NY, Krakauer JC. &quot;A new body shape index predicts mortality hazard
            independently of body mass index.&quot; PLoS One. 2012;7(7):e39504.
          </li>
          <li>
            World Health Organization. &quot;Obesity: preventing and managing the global
            epidemic.&quot; WHO Technical Report Series 894. 2000.
          </li>
          <li>
            American College of Sports Medicine. &quot;ACSM&apos;s Guidelines for Exercise Testing
            and Prescription.&quot; 11th Edition. 2021.
          </li>
        </ul>
      </div>

      {/* Limitations */}
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Limitations of Online Calculators</h2>
        <p className="mb-4">
          We are honest about what our tools can and cannot do. Online health calculators are useful
          screening and educational tools, but they have inherent limitations:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            They provide <strong>estimates</strong>, not precise measurements. Laboratory methods
            like DEXA scans, hydrostatic weighing, and indirect calorimetry will always be more
            accurate.
          </li>
          <li>
            Population-level formulas may be less accurate for certain groups, including elite
            athletes, older adults, and individuals with specific medical conditions.
          </li>
          <li>
            Results should be interpreted as part of a broader health picture, not as standalone
            diagnoses.
          </li>
          <li>
            No calculator can replace the personalized assessment of a qualified healthcare provider
            who knows your medical history.
          </li>
        </ul>
        <p>
          We encourage all users to discuss calculator results with their doctor, dietitian, or
          certified fitness professional, especially when making significant changes to their diet
          or exercise routine.
        </p>
      </div>

      {/* Medical Disclaimer */}
      <MedicalDisclaimer variant="full" className="mb-8" />

      {/* Contact */}
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Questions or Corrections?</h2>
        <p className="mb-4">
          We welcome feedback from users, healthcare professionals, and researchers. If you believe
          any of our content contains an error, or if you have suggestions for improvement, please
          reach out.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent-dark"
          >
            Contact us
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-accent/20 bg-white dark:bg-gray-800 px-6 py-3 font-semibold text-accent transition-all hover:border-accent hover:bg-accent/5"
          >
            About HealthCheck
          </Link>
        </div>
      </div>
    </div>
  );
}
