import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Smart Scales for Body Composition Tracking in 2026 | HealthCheck Blog',
  description:
    'Compare the top smart scales for tracking body fat, muscle mass, BMI, and more. In-depth reviews of Withings, RENPHO, Eufy, and other leading body composition scales.',
  keywords:
    'smart scale, body composition scale, body fat scale, Withings Body Smart, RENPHO scale, Eufy scale, best smart scale 2026, BMI scale, weight tracking',
  openGraph: {
    title: 'Best Smart Scales for Body Composition Tracking in 2026 | HealthCheck Blog',
    description:
      'Compare the top smart scales for tracking body fat, muscle mass, BMI, and more. In-depth reviews of Withings, RENPHO, Eufy, and other leading body composition scales.',
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/best-smart-scales-body-composition',
    images: [
      {
        url: '/images/blog/best-smart-scales-body-composition.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Smart Scales for Body Composition Tracking in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Smart Scales for Body Composition Tracking in 2026 | HealthCheck Blog',
    description:
      'Compare the top smart scales for tracking body fat, muscle mass, BMI, and more. In-depth reviews of Withings, RENPHO, Eufy, and other leading body composition scales.',
    images: ['/images/blog/best-smart-scales-body-composition.jpg'],
  },
};

export default function BestSmartScalesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Smart Scales for Body Composition Tracking in 2026',
    description:
      'Compare the top smart scales for tracking body fat, muscle mass, BMI, and more. In-depth reviews of Withings, RENPHO, Eufy, and other leading body composition scales.',
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
    mainEntityOfPage: 'https://www.healthcalc.xyz/blog/best-smart-scales-body-composition',
    image: ['https://www.healthcalc.xyz/images/blog/best-smart-scales-body-composition.jpg'],
  };
  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Smart Scales for Body Composition Tracking in 2026',
    itemListOrder: 'http://schema.org/ItemListOrderAscending',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'Withings Body Smart',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Product',
          name: 'RENPHO Smart Scale',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Product',
          name: 'eufy Smart Scale P2 Pro',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Product',
          name: 'Etekcity ESF-551',
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
            Best Smart Scales for Body Composition Tracking in 2026
          </h1>
          <p className="text-gray-500 italic">Published: February 2, 2026 • 12 min read</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="neumorph p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Picks</h2>
            <ul className="space-y-2">
              <li>
                <strong>Best Overall:</strong> Withings Body Smart ($129.95) - Most accurate with
                excellent app
              </li>
              <li>
                <strong>Best Budget:</strong> RENPHO Smart Scale ($19.99-$34.99) - Incredible value
                with 13 metrics
              </li>
              <li>
                <strong>Best Mid-Range:</strong> Eufy Smart Scale P2 Pro ($69.99) - 16 metrics with
                3D body model
              </li>
              <li>
                <strong>Best for Beginners:</strong> Etekcity ESF-551 ($24.99) - Simple, reliable,
                Amazon bestseller
              </li>
            </ul>
          </div>

          <div className="neumorph p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Top picks at a glance</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="#withings-body-smart" className="text-accent hover:underline">
                  Best Overall: Withings Body Smart
                </Link>
              </li>
              <li>
                <Link href="#renpho-smart-scale" className="text-accent hover:underline">
                  Best Budget: RENPHO Smart Scale
                </Link>
              </li>
              <li>
                <Link href="#eufy-smart-scale-p2-pro" className="text-accent hover:underline">
                  Best Mid-Range: Eufy Smart Scale P2 Pro
                </Link>
              </li>
              <li>
                <Link href="#etekcity-esf-551" className="text-accent hover:underline">
                  Best for Beginners: Etekcity ESF-551
                </Link>
              </li>
            </ul>
          </div>

          <p>
            If you're using our{' '}
            <Link href="/body-fat" className="text-accent hover:underline">
              Body Fat Calculator
            </Link>{' '}
            or{' '}
            <Link href="/bmi" className="text-accent hover:underline">
              BMI Calculator
            </Link>
            , you know how important accurate measurements are for tracking your health journey.
            While our calculators provide excellent estimates using proven formulas, a smart scale
            can give you daily tracking data and help you monitor trends over time.
          </p>

          <div className="neumorph p-6 rounded-lg my-6">
            <h2 className="text-2xl font-bold mb-3">Body composition starter kit</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pair your scale data with calculators so you can track trends and set realistic goals.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/body-fat" className="text-accent hover:underline font-medium">
                Body Fat Calculator
              </Link>
              <Link href="/bmi" className="text-accent hover:underline font-medium">
                BMI Calculator
              </Link>
              <Link href="/ideal-weight" className="text-accent hover:underline font-medium">
                Ideal Weight Calculator
              </Link>
            </div>
          </div>

          <p>
            In this comprehensive guide, we'll review the best smart scales for body composition
            tracking, comparing their accuracy, features, and value to help you make an informed
            decision.
          </p>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">Related calculators</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="/body-fat" className="text-accent hover:underline">
                  Body Fat Calculator
                </Link>{' '}
                to estimate body fat percentage between weigh-ins.
              </li>
              <li>
                <Link href="/bmi" className="text-accent hover:underline">
                  BMI Calculator
                </Link>{' '}
                for a fast weight-to-height benchmark.
              </li>
              <li>
                <Link href="/ideal-weight" className="text-accent hover:underline">
                  Ideal Weight Calculator
                </Link>{' '}
                to understand healthy weight ranges.
              </li>
            </ul>
          </div>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">More buying guides</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link
                  href="/blog/best-fitness-trackers-calorie-tracking"
                  className="text-accent hover:underline"
                >
                  Best Fitness Trackers for Calorie Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/best-fitness-apps-macro-tracking"
                  className="text-accent hover:underline"
                >
                  Best Fitness Apps for Tracking Macros
                </Link>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            What to Look for in a Body Composition Scale
          </h2>

          <p>Before diving into specific products, here's what matters most:</p>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-4">Key Features to Consider</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Accuracy:</strong> Look for scales with multiple sensors and ITO (Indium Tin
                Oxide) coating for better conductivity
              </li>
              <li>
                <strong>Metrics Tracked:</strong> Basic scales track weight; advanced ones measure
                body fat %, muscle mass, bone mass, water %, BMI, and more
              </li>
              <li>
                <strong>App Quality:</strong> A good companion app makes data useful with trends,
                graphs, and insights
              </li>
              <li>
                <strong>Connectivity:</strong> Wi-Fi scales sync automatically; Bluetooth requires
                your phone nearby
              </li>
              <li>
                <strong>Multi-User Support:</strong> Important for families - look for automatic
                user recognition
              </li>
            </ul>
          </div>

          <h2 id="withings-body-smart" className="text-2xl font-bold mt-8 mb-4">
            1. Withings Body Smart - Best Overall
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                  Editor's Choice
                </span>
                <h3 className="text-xl font-semibold">Withings Body Smart</h3>
              </div>
              <span className="text-2xl font-bold text-accent">$129.95</span>
            </div>

            <p className="mb-4">
              The Withings Body Smart represents the gold standard in consumer body composition
              scales. With its medical-grade accuracy and comprehensive Health Mate app, it's the
              top choice for serious health trackers.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                8 body composition metrics (weight, BMI, fat mass, muscle mass, bone mass, water %,
                visceral fat, BMR)
              </li>
              <li>Standing heart rate monitoring</li>
              <li>Wi-Fi + Bluetooth connectivity (auto-sync without phone)</li>
              <li>Color display with weather and air quality</li>
              <li>15-month battery life</li>
              <li>Athlete, pregnancy, and baby modes</li>
              <li>Free Health Mate app with detailed analytics</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              Perfect companion for our{' '}
              <Link href="/bmi" className="text-accent hover:underline">
                BMI Calculator
              </Link>
              ,{' '}
              <Link href="/body-fat" className="text-accent hover:underline">
                Body Fat Calculator
              </Link>
              , and{' '}
              <Link href="/tdee" className="text-accent hover:underline">
                TDEE Calculator
              </Link>{' '}
              (tracks BMR directly).
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Excellent accuracy, comprehensive metrics, no subscription
                for core features, beautiful design
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Premium price, some advanced features require Withings+
                subscription
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B0C3JNJPZ7?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          <h2 id="renpho-smart-scale" className="text-2xl font-bold mt-8 mb-4">
            2. RENPHO Smart Scale - Best Budget Option
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best Value
                </span>
                <h3 className="text-xl font-semibold">RENPHO Smart Scale</h3>
              </div>
              <span className="text-2xl font-bold text-accent">$19.99-$34.99</span>
            </div>

            <p className="mb-4">
              With over 350,000 Amazon reviews and a 4.6-star rating, the RENPHO Smart Scale proves
              you don't need to spend a fortune for quality body composition tracking. It's the
              people's choice for good reason.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                13 body measurements including weight, BMI, body fat, muscle mass, metabolic age
              </li>
              <li>Bluetooth connectivity with free RENPHO app</li>
              <li>Syncs with Apple Health, Google Fit, Fitbit, Samsung Health</li>
              <li>Unlimited user profiles</li>
              <li>High-precision sensors (0.2lb/0.05kg accuracy)</li>
              <li>Sleek tempered glass design</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              Great entry point for users of our{' '}
              <Link href="/bmi" className="text-accent hover:underline">
                BMI Calculator
              </Link>{' '}
              and{' '}
              <Link href="/weight-management" className="text-accent hover:underline">
                Weight Management Calculator
              </Link>
              .
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Unbeatable price, good accuracy for the cost, excellent app
                integration, huge user community
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Bluetooth only (need phone nearby), body fat accuracy
                slightly lower than premium options
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B01N1UX8RW?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          <h2 id="eufy-smart-scale-p2-pro" className="text-2xl font-bold mt-8 mb-4">
            3. Eufy Smart Scale P2 Pro - Best Mid-Range
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                  Most Features
                </span>
                <h3 className="text-xl font-semibold">Eufy Smart Scale P2 Pro</h3>
              </div>
              <span className="text-2xl font-bold text-accent">$69.99</span>
            </div>

            <p className="mb-4">
              The Eufy Smart Scale P2 Pro from Anker offers an impressive 16 body measurements and a
              unique 3D virtual body model feature that visualizes your progress over time. It's the
              sweet spot between budget and premium.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>16 body measurements including heart rate, BMI, body fat, muscle mass, BMR</li>
              <li>ITO coating for accurate bioelectrical impedance analysis</li>
              <li>3D Virtual Body Model showing visual progress</li>
              <li>Wi-Fi and Bluetooth connectivity</li>
              <li>Baby mode and Pet mode</li>
              <li>High-precision sensors (50g/0.1lb accuracy)</li>
              <li>Syncs with Apple Health, Google Fit, Fitbit</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              Ideal for users tracking with our{' '}
              <Link href="/body-fat" className="text-accent hover:underline">
                Body Fat Calculator
              </Link>
              ,{' '}
              <Link href="/tdee" className="text-accent hover:underline">
                TDEE Calculator
              </Link>{' '}
              (BMR tracking), and{' '}
              <Link href="/maximum-fat-loss" className="text-accent hover:underline">
                Maximum Fat Loss Calculator
              </Link>
              .
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Most metrics in this price range, unique 3D body model, Wi-Fi
                auto-sync, reliable Anker quality
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> App not as polished as Withings, 3D model feature is more
                gimmick than useful
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B09PDTB2XB?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          <h2 id="etekcity-esf-551" className="text-2xl font-bold mt-8 mb-4">
            4. Etekcity ESF-551 - Best for Beginners
          </h2>

          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                  Beginner Friendly
                </span>
                <h3 className="text-xl font-semibold">Etekcity ESF-551</h3>
              </div>
              <span className="text-2xl font-bold text-accent">$24.99</span>
            </div>

            <p className="mb-4">
              A straightforward, no‑frills scale for people who want reliable weigh-ins and a simple
              app experience without the extra bells and whistles.
            </p>

            <h4 className="font-semibold mt-4 mb-2">Best For:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>First-time smart scale buyers</li>
              <li>Households that want an easy setup</li>
              <li>Budget-conscious tracking</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
            <p>
              Pairs well with our{' '}
              <Link href="/bmi" className="text-accent hover:underline">
                BMI Calculator
              </Link>{' '}
              and{' '}
              <Link href="/weight-management" className="text-accent hover:underline">
                Weight Management Calculator
              </Link>
              .
            </p>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B095YJW56C?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            How Smart Scales Measure Body Composition
          </h2>

          <p>
            Smart scales use Bioelectrical Impedance Analysis (BIA) to estimate body composition. A
            small, safe electrical current is sent through your body via the scale's sensors. Since
            different tissues (fat, muscle, bone, water) conduct electricity differently, the scale
            can estimate your body composition.
          </p>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-4">Accuracy Considerations</h3>
            <p>
              BIA scales are not as accurate as DEXA scans or hydrostatic weighing (the gold
              standards), but they excel at <strong>tracking trends over time</strong>. This is
              actually what matters most for health monitoring.
            </p>
            <p className="mt-4">For best accuracy with any smart scale:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Weigh yourself at the same time daily (morning, after bathroom, before eating)
              </li>
              <li>Ensure bare feet are dry and positioned correctly on sensors</li>
              <li>Stay hydrated consistently from day to day</li>
              <li>Avoid weighing immediately after exercise</li>
              <li>Focus on weekly averages, not daily fluctuations</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Using Smart Scale Data with Our Calculators
          </h2>

          <p>Your smart scale data becomes more powerful when combined with our calculators:</p>

          <ul className="list-disc list-inside space-y-3 my-6">
            <li>
              <strong>BMI Trends:</strong> Use our{' '}
              <Link href="/bmi" className="text-accent hover:underline">
                BMI Calculator
              </Link>{' '}
              to understand what your scale's BMI reading means and see your healthy weight range
            </li>
            <li>
              <strong>Body Fat Context:</strong> Compare your scale's body fat % with our{' '}
              <Link href="/body-fat" className="text-accent hover:underline">
                Body Fat Calculator
              </Link>{' '}
              (Navy method) for a second opinion
            </li>
            <li>
              <strong>Calorie Planning:</strong> Input your scale's weight into our{' '}
              <Link href="/tdee" className="text-accent hover:underline">
                TDEE Calculator
              </Link>{' '}
              regularly to adjust your calorie targets as you progress
            </li>
            <li>
              <strong>Goal Setting:</strong> Use our{' '}
              <Link href="/calorie-deficit" className="text-accent hover:underline">
                Calorie Deficit Calculator
              </Link>{' '}
              with your current scale weight to plan realistic weight loss timelines
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Comparison Table</h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Scale</th>
                  <th className="border p-3 text-center">Price</th>
                  <th className="border p-3 text-center">Metrics</th>
                  <th className="border p-3 text-center">Connectivity</th>
                  <th className="border p-3 text-center">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Withings Body Smart</td>
                  <td className="border p-3 text-center">$129.95</td>
                  <td className="border p-3 text-center">8</td>
                  <td className="border p-3 text-center">Wi-Fi + BT</td>
                  <td className="border p-3 text-center">Serious trackers</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">RENPHO Smart Scale</td>
                  <td className="border p-3 text-center">$19.99</td>
                  <td className="border p-3 text-center">13</td>
                  <td className="border p-3 text-center">Bluetooth</td>
                  <td className="border p-3 text-center">Budget-conscious</td>
                </tr>
                <tr>
                  <td className="border p-3">Eufy P2 Pro</td>
                  <td className="border p-3 text-center">$69.99</td>
                  <td className="border p-3 text-center">16</td>
                  <td className="border p-3 text-center">Wi-Fi + BT</td>
                  <td className="border p-3 text-center">Feature seekers</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Etekcity ESF-551</td>
                  <td className="border p-3 text-center">$24.99</td>
                  <td className="border p-3 text-center">13</td>
                  <td className="border p-3 text-center">Bluetooth</td>
                  <td className="border p-3 text-center">Beginners</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Final Recommendations</h2>

          <p>The best smart scale for you depends on your budget and needs:</p>

          <ul className="list-disc list-inside space-y-2 my-6">
            <li>
              <strong>Invest in accuracy:</strong> Get the <strong>Withings Body Smart</strong> if
              you want the most reliable data and can afford the premium
            </li>
            <li>
              <strong>Best bang for buck:</strong> The <strong>RENPHO Smart Scale</strong> at under
              $25 is an incredible value that does 90% of what premium scales do
            </li>
            <li>
              <strong>Middle ground:</strong> The <strong>Eufy P2 Pro</strong> offers premium
              features (Wi-Fi, 16 metrics) at a mid-range price
            </li>
          </ul>

          <p>
            Whichever scale you choose, remember that consistency is more important than absolute
            accuracy. Pick one, use it regularly at the same time each day, and focus on trends
            rather than individual readings. Combined with our calculators, you'll have a complete
            picture of your health journey.
          </p>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Related Calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/bmi"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">BMI Calculator</h4>
                <p className="text-sm text-gray-600">Calculate your Body Mass Index</p>
              </Link>
              <Link
                href="/body-fat"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">Body Fat Calculator</h4>
                <p className="text-sm text-gray-600">Estimate your body fat percentage</p>
              </Link>
              <Link
                href="/tdee"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">TDEE Calculator</h4>
                <p className="text-sm text-gray-600">Find your daily calorie needs</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
