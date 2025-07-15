import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | HealthCheck',
  description:
    'Learn about HealthCheck, our mission, and the science behind our health and fitness calculators.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About HealthCheck</h1>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          HealthCheck is a collection of 52 health and fitness calculators. Body fat, BMI, TDEE,
          macros, calorie deficit planning, and dozens more. Each one runs a published,
          peer-reviewed formula on the numbers you type in, and gives you a result you can actually
          use.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          That is the whole idea. No accounts required, no paywalls, no selling your data. The
          calculations happen in your browser. We built the site because most online health
          calculators are either buried in ads or use outdated equations, and we thought that was a
          solvable problem.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How the Calculators Work</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Every calculator cites the specific formula it uses. Body fat estimation relies on the
          U.S. Navy circumference method, Jackson-Pollock skinfold equations, or BMI-derived
          correlations depending on what inputs you provide. Energy expenditure calculations use the
          Mifflin-St Jeor equation, which a 2005 meta-analysis in the{' '}
          <em>Journal of the American Dietetic Association</em> found to be the most accurate
          predictive equation for resting metabolic rate in healthy adults.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          We pick formulas based on what the research actually supports, not what is easiest to
          implement. When a newer study supersedes an older method, we update. The Mifflin-St Jeor
          equation replaced Harris-Benedict here years ago for exactly that reason.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          These are still estimates. A DEXA scan will always beat a circumference formula. If you
          are making medical decisions, talk to a doctor who can order proper lab work. Our
          calculators are a good starting point, not a diagnosis.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Who Reviews the Content</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Three subject-matter reviewers check our calculator logic, result interpretations, and
          blog posts before they go live.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">Sarah Chen, MS, CSCS</strong> reviews
          exercise science content. She has a Master of Science in Exercise Physiology from the
          University of Florida and is an NSCA-certified Strength and Conditioning Specialist with
          over eight years of experience in clinical exercise testing and sports performance.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">James Morton, RD, CSSD</strong>{' '}
          handles nutrition and dietetics. He is a Registered Dietitian and Board Certified
          Specialist in Sports Dietetics who spent five years in hospital clinical nutrition before
          moving into sports and public health nutrition.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">Lisa Patel, PhD, CPH</strong> covers
          public health and epidemiology. She earned her doctorate in Epidemiology from Emory
          University and holds a Certified in Public Health credential. Her research focused on
          population-level body composition metrics and mortality risk prediction.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          You can read more about our review process on the{' '}
          <Link href="/about/editorial" className="text-accent hover:underline">
            editorial standards
          </Link>{' '}
          page.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your numbers stay in your browser. Calculations run client-side. We do not send your
          height, weight, or any other inputs to a server unless you explicitly choose to save
          results to an account. If you do create an account, your saved data is protected by
          row-level security so only you can access it. We do not sell or share user data.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Try a Calculator</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Here are some of the most-used ones:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/body-fat"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Estimate body fat percentage using Navy, Jackson-Pollock, or BMI methods
            </p>
          </Link>
          <Link
            href="/bmi"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">BMI Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Calculate your Body Mass Index with WHO and CDC classifications
            </p>
          </Link>
          <Link
            href="/tdee"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">TDEE Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find your Total Daily Energy Expenditure via Mifflin-St Jeor
            </p>
          </Link>
          <Link
            href="/calorie-deficit"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">Calorie Deficit Calculator</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set a daily calorie target based on your TDEE and weight goal
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
