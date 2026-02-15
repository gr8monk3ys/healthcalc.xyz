import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Fitness Apps for Tracking Macros and Calories in 2026 | HealthCheck Blog',
  description:
    'Compare the top calorie and macro tracking apps. In-depth reviews of MyFitnessPal, Cronometer, MacroFactor, and Lose It for weight loss success.',
  keywords:
    'calorie tracking app, macro tracking app, MyFitnessPal, Cronometer, MacroFactor, Lose It, best diet app 2026, food logging app, nutrition tracker',
  openGraph: {
    title: 'Best Fitness Apps for Tracking Macros and Calories in 2026 | HealthCheck Blog',
    description:
      'Compare the top calorie and macro tracking apps. In-depth reviews of MyFitnessPal, Cronometer, MacroFactor, and Lose It for weight loss success.',
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/best-fitness-apps-macro-tracking',
    images: [
      {
        url: '/images/blog/best-fitness-apps-macro-tracking.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Fitness Apps for Tracking Macros and Calories in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Fitness Apps for Tracking Macros and Calories in 2026 | HealthCheck Blog',
    description:
      'Compare the top calorie and macro tracking apps. In-depth reviews of MyFitnessPal, Cronometer, MacroFactor, and Lose It for weight loss success.',
    images: ['/images/blog/best-fitness-apps-macro-tracking.jpg'],
  },
};

export default function BestFitnessAppsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Fitness Apps for Tracking Macros and Calories in 2026',
    description:
      'Compare the top calorie and macro tracking apps. In-depth reviews of MyFitnessPal, Cronometer, MacroFactor, and Lose It for weight loss success.',
    datePublished: '2026-02-02',
    dateModified: '2026-02-02',
    author: {
      '@type': 'Organization',
      name: 'HealthCheck',
      url: 'https://www.healthcalc.xyz',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HealthCheck',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.healthcalc.xyz/images/og-image.jpg',
      },
    },
    mainEntityOfPage: 'https://www.healthcalc.xyz/blog/best-fitness-apps-macro-tracking',
    image: ['https://www.healthcalc.xyz/images/blog/best-fitness-apps-macro-tracking.jpg'],
  };
  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Fitness Apps for Tracking Macros and Calories in 2026',
    itemListOrder: 'http://schema.org/ItemListOrderAscending',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'MyFitnessPal Premium',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Product',
          name: 'Cronometer',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Product',
          name: 'MacroFactor',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Product',
          name: 'Lose It!',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
            Product Reviews
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Best Fitness Apps for Tracking Macros and Calories in 2026
          </h1>
          <p className="text-gray-500 italic">Published: February 2, 2026 • 12 min read</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="neumorph p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Picks</h2>
            <ul className="space-y-2">
              <li>
                <strong>Best Overall:</strong> MyFitnessPal Premium ($79.99/year) - Largest
                database, most features
              </li>
              <li>
                <strong>Best for Accuracy:</strong> Cronometer ($49.99/year) - Verified database,
                micronutrients
              </li>
              <li>
                <strong>Best for Adaptive Dieting:</strong> MacroFactor ($71.99/year) - Auto-adjusts
                your TDEE
              </li>
              <li>
                <strong>Best Free Option:</strong> Lose It! (Free tier) - Simple and effective
              </li>
            </ul>
          </div>

          <div className="neumorph p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Top picks at a glance</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="#myfitnesspal-premium" className="text-accent hover:underline">
                  Best Overall: MyFitnessPal Premium
                </Link>
              </li>
              <li>
                <Link href="#cronometer" className="text-accent hover:underline">
                  Best for Accuracy: Cronometer
                </Link>
              </li>
              <li>
                <Link href="#macrofactor" className="text-accent hover:underline">
                  Best for Adaptive Dieting: MacroFactor
                </Link>
              </li>
              <li>
                <Link href="#lose-it" className="text-accent hover:underline">
                  Best Free Option: Lose It!
                </Link>
              </li>
            </ul>
          </div>

          <p>
            Our{' '}
            <Link href="/tdee" className="text-accent hover:underline">
              TDEE Calculator
            </Link>{' '}
            gives you a science-based estimate of your daily calorie needs. But to actually hit that
            target, you need a reliable way to track what you eat. The right app makes the
            difference between guessing and knowing your actual intake.
          </p>

          <div className="neumorph p-6 rounded-lg my-6">
            <h2 className="text-2xl font-bold mb-3">Nutrition planning toolkit</h2>
            <p className="text-gray-600 dark:text-gray-400">
              These calculators give you targets you can track directly inside your app.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/macro" className="text-accent hover:underline font-medium">
                Macro Calculator
              </Link>
              <Link href="/protein" className="text-accent hover:underline font-medium">
                Protein Calculator
              </Link>
              <Link href="/calorie-deficit" className="text-accent hover:underline font-medium">
                Calorie Deficit Calculator
              </Link>
            </div>
          </div>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">Related calculators</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="/macro" className="text-accent hover:underline">
                  Macro Calculator
                </Link>{' '}
                to set protein, carbs, and fats targets.
              </li>
              <li>
                <Link href="/protein" className="text-accent hover:underline">
                  Protein Calculator
                </Link>{' '}
                to lock in a muscle-supporting intake.
              </li>
              <li>
                <Link href="/calorie-deficit" className="text-accent hover:underline">
                  Calorie Deficit Calculator
                </Link>{' '}
                for weight loss pacing.
              </li>
            </ul>
          </div>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">More buying guides</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link
                  href="/blog/best-kitchen-scales-portion-control"
                  className="text-accent hover:underline"
                >
                  Best Kitchen Scales for Portion Control
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/meal-delivery-services-weight-loss"
                  className="text-accent hover:underline"
                >
                  Best Meal Delivery Services for Weight Loss
                </Link>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Track Macros, Not Just Calories?</h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <p className="mb-4">
              While calories determine weight loss/gain, macros determine body composition:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Protein:</strong> Preserves muscle during weight loss (aim for 1.6-2.2g per
                kg body weight)
              </li>
              <li>
                <strong>Carbs:</strong> Fuels workouts and brain function
              </li>
              <li>
                <strong>Fat:</strong> Supports hormones and nutrient absorption (minimum 0.5g per
                kg)
              </li>
            </ul>
            <p className="mt-4">
              A good tracking app helps you hit both your calorie target AND your macro ratios.
            </p>
          </div>

          <h2 id="myfitnesspal-premium" className="text-2xl font-bold mt-8 mb-4">
            1. MyFitnessPal Premium - Best Overall
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                  Most Popular
                </span>
                <h3 className="text-xl font-semibold">MyFitnessPal Premium</h3>
              </div>
              <span className="text-2xl font-bold text-accent">$79.99/year</span>
            </div>

            <p className="mb-4">
              MyFitnessPal has the largest food database in the world with over 14 million foods.
              The barcode scanner makes logging packaged foods instant, and the recipe importer can
              pull nutrition from any URL.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>14+ million food database (largest available)</li>
              <li>Barcode scanner with 99%+ recognition rate</li>
              <li>Recipe importer and nutrition calculator</li>
              <li>Meal planning and food suggestions</li>
              <li>Integrates with 50+ fitness apps and devices</li>
              <li>Custom macro goals (premium)</li>
              <li>AI-powered food logging (premium)</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              Pair with our{' '}
              <Link href="/tdee" className="text-accent hover:underline">
                TDEE Calculator
              </Link>{' '}
              - enter your calculated TDEE as your goal in MyFitnessPal, then track daily to ensure
              you're hitting your target.
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Largest database, excellent barcode scanner, massive
                integration ecosystem
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> User-submitted entries can be inaccurate, many features
                require premium
              </p>
            </div>
          </div>

          <h2 id="cronometer" className="text-2xl font-bold mt-8 mb-4">
            2. Cronometer - Best for Accuracy
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  Most Accurate
                </span>
                <h3 className="text-xl font-semibold">Cronometer Gold</h3>
              </div>
              <span className="text-2xl font-bold text-accent">$49.99/year</span>
            </div>

            <p className="mb-4">
              Cronometer uses a curated, verified database rather than user-submitted entries. It
              tracks 82+ nutrients including micronutrients, making it the choice for health-focused
              users who want to ensure they're getting complete nutrition.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Verified database from USDA and NCCDB</li>
              <li>82+ nutrient tracking (vitamins, minerals, amino acids)</li>
              <li>Custom biometrics tracking</li>
              <li>Fasting timer built-in</li>
              <li>Oracle AI nutrition assistant (Gold)</li>
              <li>No ads even on free tier</li>
              <li>Export data for healthcare providers</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              Perfect for users of our{' '}
              <Link href="/calorie-deficit" className="text-accent hover:underline">
                Calorie Deficit Calculator
              </Link>{' '}
              who want to ensure they're meeting nutritional needs while in a deficit. The
              micronutrient tracking helps prevent deficiencies.
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Most accurate database, comprehensive micronutrient tracking,
                no ads
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Smaller database than MFP, less social features, learning
                curve
              </p>
            </div>
          </div>

          <h2 id="macrofactor" className="text-2xl font-bold mt-8 mb-4">
            3. MacroFactor - Best Adaptive Tracking
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                  Most Innovative
                </span>
                <h3 className="text-xl font-semibold">MacroFactor</h3>
              </div>
              <span className="text-2xl font-bold text-accent">$71.99/year</span>
            </div>

            <p className="mb-4">
              Created by the team at Stronger By Science, MacroFactor is unique because it
              continuously calculates your actual TDEE based on your logged food and weight changes.
              It's like having our{' '}
              <Link href="/tdee" className="text-accent hover:underline">
                TDEE Calculator
              </Link>{' '}
              built into your tracking app.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Adaptive TDEE algorithm that learns your metabolism</li>
              <li>Adherence-neutral coaching (no guilt for off days)</li>
              <li>Research-grade NCC database (26,500 verified foods)</li>
              <li>Automatic macro adjustments based on progress</li>
              <li>Expenditure tracking shows your calculated TDEE over time</li>
              <li>Science-based approach from PhD researchers</li>
              <li>No food "scoring" or judgment</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              MacroFactor essentially replaces our TDEE calculator with real-time data. Use our{' '}
              <Link href="/tdee" className="text-accent hover:underline">
                calculator
              </Link>{' '}
              to get a starting point, then let MacroFactor refine it based on your actual results.
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Adaptive TDEE is revolutionary, science-backed approach, no
                diet culture guilt
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Smaller database, requires consistent logging for adaptation,
                no free tier
              </p>
            </div>
          </div>

          <h2 id="lose-it" className="text-2xl font-bold mt-8 mb-4">
            4. Lose It! - Best Free Option
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best Free
                </span>
                <h3 className="text-xl font-semibold">Lose It!</h3>
              </div>
              <span className="text-2xl font-bold text-accent">Free / $39.99/year</span>
            </div>

            <p className="mb-4">
              Lose It! offers the best free calorie tracking experience. The "Snap It" feature uses
              AI to identify foods from photos, making logging faster than typing. The free tier
              includes everything most people need.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Snap It photo recognition for food logging</li>
              <li>Personalized calorie budget based on goals</li>
              <li>Community challenges for motivation</li>
              <li>Restaurant menu database</li>
              <li>Device integrations (Fitbit, Apple Health, etc.)</li>
              <li>Goal tracking and progress charts</li>
              <li>Generous free tier</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              Great starter app for users of our{' '}
              <Link href="/bmi" className="text-accent hover:underline">
                BMI Calculator
              </Link>{' '}
              who are just beginning their weight loss journey. The simple interface reduces
              friction.
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Best free tier, photo recognition, simple interface, good
                community
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Database accuracy varies, less detailed than competitors,
                macro tracking limited on free tier
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Comparison Table</h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">App</th>
                  <th className="border p-3 text-center">Price</th>
                  <th className="border p-3 text-center">Database</th>
                  <th className="border p-3 text-center">Unique Feature</th>
                  <th className="border p-3 text-center">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">MyFitnessPal</td>
                  <td className="border p-3 text-center">$79.99/yr</td>
                  <td className="border p-3 text-center">14M+ foods</td>
                  <td className="border p-3 text-center">Barcode scanner</td>
                  <td className="border p-3 text-center">Most users</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Cronometer</td>
                  <td className="border p-3 text-center">$49.99/yr</td>
                  <td className="border p-3 text-center">Verified only</td>
                  <td className="border p-3 text-center">82+ nutrients</td>
                  <td className="border p-3 text-center">Health-focused</td>
                </tr>
                <tr>
                  <td className="border p-3">MacroFactor</td>
                  <td className="border p-3 text-center">$71.99/yr</td>
                  <td className="border p-3 text-center">26.5K verified</td>
                  <td className="border p-3 text-center">Adaptive TDEE</td>
                  <td className="border p-3 text-center">Data lovers</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Lose It!</td>
                  <td className="border p-3 text-center">Free/$39.99</td>
                  <td className="border p-3 text-center">Large</td>
                  <td className="border p-3 text-center">Photo logging</td>
                  <td className="border p-3 text-center">Beginners</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Tips for Successful Tracking</h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Log before you eat:</strong> Pre-logging helps you make better decisions
              </li>
              <li>
                <strong>Use a food scale:</strong> "Eyeballing" can be off by 50%+
              </li>
              <li>
                <strong>Track consistently:</strong> Even imperfect tracking beats no tracking
              </li>
              <li>
                <strong>Verify entries:</strong> Check that database entries match nutrition labels
              </li>
              <li>
                <strong>Don't obsess:</strong> 80% accuracy consistently beats 100% accuracy
                occasionally
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Related Calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/tdee"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">TDEE Calculator</h4>
                <p className="text-sm text-gray-600">Calculate your daily calorie needs</p>
              </Link>
              <Link
                href="/calorie-deficit"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">Calorie Deficit Calculator</h4>
                <p className="text-sm text-gray-600">Plan your weight loss deficit</p>
              </Link>
              <Link
                href="/weight-management"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">Weight Management Calculator</h4>
                <p className="text-sm text-gray-600">Set realistic weight goals</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
