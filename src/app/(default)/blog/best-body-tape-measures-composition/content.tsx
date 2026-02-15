import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Body Tape Measures for Tracking Body Composition in 2026 | HealthCheck Blog',
  description:
    'Find the best body tape measures for tracking waist, hips, and body composition. Reviews of MyoTape, RENPHO Smart, and more for accurate WHR and body fat measurements.',
  keywords:
    'best body tape measure 2026, body measuring tape, waist measurement tape, RENPHO smart tape measure, MyoTape, body composition tracking, WHR measurement, waist-to-hip ratio',
  openGraph: {
    title: 'Best Body Tape Measures for Tracking Body Composition in 2026 | HealthCheck Blog',
    description: 'Find the best body tape measures for accurate WHR and body fat tracking.',
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/best-body-tape-measures-composition',
    images: [
      {
        url: '/images/blog/best-body-tape-measures-composition.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Body Tape Measures for Body Composition in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Body Tape Measures for Tracking Body Composition in 2026',
    description: 'Accurate body tape measures for WHR, ABSI, and body fat tracking.',
    images: ['/images/blog/best-body-tape-measures-composition.jpg'],
  },
};

export default function BestBodyTapeMeasuresCompositionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Body Tape Measures for Tracking Body Composition in 2026',
    description: 'Find the best body tape measures for accurate body composition tracking.',
    datePublished: '2026-02-08',
    dateModified: '2026-02-08',
    author: { '@type': 'Organization', name: 'HealthCheck', url: 'https://www.healthcalc.xyz' },
    publisher: {
      '@type': 'Organization',
      name: 'HealthCheck',
      logo: { '@type': 'ImageObject', url: 'https://www.healthcalc.xyz/images/og-image.jpg' },
    },
    mainEntityOfPage: 'https://www.healthcalc.xyz/blog/best-body-tape-measures-composition',
    image: ['https://www.healthcalc.xyz/images/blog/best-body-tape-measures-composition.jpg'],
  };
  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Body Tape Measures for Body Composition in 2026',
    itemListOrder: 'http://schema.org/ItemListOrderAscending',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: { '@type': 'Product', name: 'MyoTape Body Tape Measure' },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: { '@type': 'Product', name: 'RENPHO Smart Bluetooth Tape Measure' },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: { '@type': 'Product', name: 'RENPHO Smart Tape Measure' },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: { '@type': 'Product', name: 'Lightstuff Digital Body Tape Measure' },
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
            Best Body Tape Measures for Tracking Body Composition in 2026
          </h1>
          <p className="text-gray-500 italic">Published: February 8, 2026 &middot; 10 min read</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="neumorph p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Picks</h2>
            <ul className="space-y-2">
              <li>
                <strong>Best Overall:</strong> MyoTape ($7.95) - One-handed use, consistent
                readings, dead simple
              </li>
              <li>
                <strong>Best Smart Option:</strong> RENPHO Bluetooth ($19.99) - Syncs with app,
                tracks 12 body areas
              </li>
              <li>
                <strong>Best Budget Smart:</strong> RENPHO Standard ($14.99) - App-connected, works
                with Apple Health
              </li>
              <li>
                <strong>Best for Accuracy:</strong> Lightstuff Digital ($12.99) - LCD readout,
                eliminates guessing
              </li>
            </ul>
          </div>

          <div className="neumorph p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Top picks at a glance</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="#myotape" className="text-accent hover:underline">
                  MyoTape Body Tape Measure
                </Link>
              </li>
              <li>
                <Link href="#renpho-bluetooth" className="text-accent hover:underline">
                  RENPHO Smart Bluetooth Tape Measure
                </Link>
              </li>
              <li>
                <Link href="#renpho-standard" className="text-accent hover:underline">
                  RENPHO Smart Tape Measure (Standard)
                </Link>
              </li>
              <li>
                <Link href="#lightstuff" className="text-accent hover:underline">
                  Lightstuff Digital Body Tape Measure
                </Link>
              </li>
            </ul>
          </div>

          <p>
            If you use our{' '}
            <Link href="/whr" className="text-accent hover:underline">
              Waist-to-Hip Ratio Calculator
            </Link>{' '}
            or{' '}
            <Link href="/absi" className="text-accent hover:underline">
              ABSI Calculator
            </Link>
            , you need accurate waist and hip measurements. A regular sewing tape measure works, but
            it is hard to use on yourself. You end up twisting around trying to read the number
            while holding the tape in place. The whole process introduces measurement error, which
            defeats the purpose. A body-specific tape measure fixes this. Most lock in place and let
            you read the measurement after you step away.
          </p>

          <div className="neumorph p-6 rounded-lg my-6">
            <h2 className="text-2xl font-bold mb-3">Body composition toolkit</h2>
            <p className="text-gray-600 dark:text-gray-400">
              These calculators need accurate body measurements to work properly.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/whr" className="text-accent hover:underline font-medium">
                WHR Calculator
              </Link>
              <Link href="/absi" className="text-accent hover:underline font-medium">
                ABSI Calculator
              </Link>
              <Link href="/body-fat" className="text-accent hover:underline font-medium">
                Body Fat Calculator
              </Link>
              <Link
                href="/waist-to-height-ratio"
                className="text-accent hover:underline font-medium"
              >
                Waist-to-Height Ratio
              </Link>
            </div>
          </div>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">Related calculators</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="/whr" className="text-accent hover:underline">
                  Waist-to-Hip Ratio Calculator
                </Link>{' '}
                - needs waist and hip circumference measurements.
              </li>
              <li>
                <Link href="/absi" className="text-accent hover:underline">
                  ABSI Calculator
                </Link>{' '}
                - requires waist circumference for mortality risk assessment.
              </li>
              <li>
                <Link href="/body-fat" className="text-accent hover:underline">
                  Body Fat Calculator
                </Link>{' '}
                - Navy method uses neck, waist, and hip measurements.
              </li>
              <li>
                <Link href="/bmi" className="text-accent hover:underline">
                  BMI Calculator
                </Link>{' '}
                - pair with circumference data for a fuller picture.
              </li>
            </ul>
          </div>

          <div className="neumorph p-6 rounded-lg my-6">
            <h3 className="text-xl font-semibold mb-3">More buying guides</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link
                  href="/blog/best-smart-scales-body-composition"
                  className="text-accent hover:underline"
                >
                  Best Smart Scales for Body Composition
                </Link>
              </li>
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
                  href="/blog/best-kitchen-scales-portion-control"
                  className="text-accent hover:underline"
                >
                  Best Kitchen Scales for Portion Control
                </Link>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why accurate measurements matter</h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <p className="mb-4">
              A half-inch error on your waist measurement can meaningfully change your WHR, ABSI
              score, and body fat estimate. If you are tracking progress over weeks or months,
              inconsistent measurements hide real changes. The biggest source of error is not the
              tape itself. It is how you use it. A body tape measure that locks in place and lets
              you take a reading without contorting yourself eliminates most of that inconsistency.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Consistency beats precision:</strong> Measure at the same time of day, in
                the same spot, with the same tension. Morning before eating is best.
              </li>
              <li>
                <strong>Where to measure waist:</strong> At the narrowest point between your ribs
                and hips, usually at or just above the navel. Not at your belt line.
              </li>
              <li>
                <strong>Where to measure hips:</strong> At the widest point of your buttocks,
                standing with feet together.
              </li>
              <li>
                <strong>Tension matters:</strong> The tape should be snug against your skin without
                compressing the tissue. Self-tensioning tapes help with this.
              </li>
            </ul>
          </div>

          {/* Product 1 */}
          <h2 id="myotape" className="text-2xl font-bold mt-8 mb-4">
            1. MyoTape Body Tape Measure - Best Overall
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best Overall
                </span>
                <h3 className="text-xl font-semibold">MyoTape Body Tape Measure</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9734; 4.5 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$7.95</span>
            </div>
            <p className="mb-4">
              The MyoTape has been the go-to body tape for personal trainers and fitness enthusiasts
              for years, and it has not changed much because it does not need to. You wrap it around
              yourself, push the button, and the tape self-tensions to a consistent level. Then you
              read the measurement. That is it. No app, no Bluetooth, no batteries. It just works. I
              have used one for over two years and it still retracts smoothly.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>One-handed operation with push-button retraction</li>
              <li>Self-tensioning for consistent readings</li>
              <li>Locks in place so you can step away and read</li>
              <li>Vinyl tape, easy to clean</li>
              <li>Measures up to 65 inches</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              Anyone who wants reliable, repeatable body measurements without fuss. This is the tape
              to use with our{' '}
              <Link href="/whr" className="text-accent hover:underline">
                WHR Calculator
              </Link>{' '}
              and{' '}
              <Link href="/body-fat" className="text-accent hover:underline">
                Body Fat Calculator
              </Link>{' '}
              (Navy method). The consistent tension means your week-to-week comparisons actually
              mean something.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Dead simple, consistent tension every time, no batteries
                needed, lasts years, cheap
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> No digital readout, no app tracking, vinyl can yellow over
                time, readings in inches only on some models
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B000G7YW7Y?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Product 2 */}
          <h2 id="renpho-bluetooth" className="text-2xl font-bold mt-8 mb-4">
            2. RENPHO Smart Bluetooth Tape Measure - Best Smart Option
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best Smart
                </span>
                <h3 className="text-xl font-semibold">RENPHO Smart Bluetooth Tape Measure</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9734; 4.4 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$19.99</span>
            </div>
            <p className="mb-4">
              If you want your body measurements to sync to an app automatically, the RENPHO
              Bluetooth tape is the one to get. It connects to the RENPHO app (which also works with
              their smart scales) and lets you record measurements for 12 body areas plus 6 custom
              spots. The app graphs your progress over time and calculates your waist-to-hip ratio
              automatically. The LCD screen on the tape itself shows your reading, so you do not
              need your phone for quick measurements.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Bluetooth syncs with RENPHO app for automatic tracking</li>
              <li>LCD display shows measurement on the tape</li>
              <li>Tracks 12 body areas plus 6 custom areas</li>
              <li>Syncs with Apple Health, Google Fit, Samsung Health</li>
              <li>Retractable with lock hook, 60 inches / 150 cm</li>
              <li>USB rechargeable</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              People who already use the RENPHO app for their smart scale and want everything in one
              place. Also good if you measure multiple body areas regularly and want to track trends
              without a spreadsheet. The automatic WHR calculation pairs well with our{' '}
              <Link href="/whr" className="text-accent hover:underline">
                WHR Calculator
              </Link>
              .
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Automatic app tracking, LCD display, works with health
                ecosystems, rechargeable
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Requires RENPHO app, needs charging, more complex than a
                manual tape, Bluetooth can be finicky
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B09QWFWTTL?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Product 3 */}
          <h2 id="renpho-standard" className="text-2xl font-bold mt-8 mb-4">
            3. RENPHO Smart Tape Measure (Standard) - Best Budget Smart
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mb-2">
                  Budget Smart
                </span>
                <h3 className="text-xl font-semibold">RENPHO Smart Tape Measure</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9734; 4.3 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$14.99</span>
            </div>
            <p className="mb-4">
              This is the older, slightly cheaper version of the RENPHO smart tape. It does most of
              what the Bluetooth model does at $5 less. The app integration works the same way, and
              it still syncs with Apple Health and Google Fit. The main difference is the build
              quality feels a bit less premium. If you want smart tracking on a budget, this gets
              the job done.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Syncs with RENPHO app for measurement tracking</li>
              <li>Works with Apple Health and Google Fit</li>
              <li>Measures up to 60 inches / 150 cm</li>
              <li>Retractable design</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              Beginners who want app-based tracking without spending $20. Good enough for regular
              body measurements to feed into our{' '}
              <Link href="/absi" className="text-accent hover:underline">
                ABSI Calculator
              </Link>{' '}
              and{' '}
              <Link href="/body-fat" className="text-accent hover:underline">
                Body Fat Calculator
              </Link>
              .
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Cheaper than the Bluetooth model, app tracking included,
                compatible with health ecosystems
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Build quality is slightly lower, some users report occasional
                sync issues, still needs charging
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B082W886W9?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Product 4 */}
          <h2 id="lightstuff" className="text-2xl font-bold mt-8 mb-4">
            4. Lightstuff Digital Body Tape Measure - Best for Accuracy
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                  Most Accurate
                </span>
                <h3 className="text-xl font-semibold">Lightstuff Digital Body Tape Measure</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9734; 4.4 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$12.99</span>
            </div>
            <p className="mb-4">
              If you have trouble reading small numbers on a tape measure (especially when the tape
              is wrapped around your own body), the Lightstuff digital tape solves that problem. It
              has an LCD screen that shows your measurement in large numbers. No squinting. No
              rounding errors. You just read the screen. It also switches between metric and
              imperial with a button press, which is handy if you use different calculator tools.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Digital LCD readout for clear measurements</li>
              <li>One-handed retractable operation</li>
              <li>Metric and imperial switching</li>
              <li>Lock button holds measurement in place</li>
              <li>Battery powered (CR2032)</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              People who want precise digital readings without the complexity of a smart tape. Great
              for anyone who measures themselves regularly for the{' '}
              <Link href="/whr" className="text-accent hover:underline">
                WHR Calculator
              </Link>{' '}
              or{' '}
              <Link href="/waist-to-height-ratio" className="text-accent hover:underline">
                Waist-to-Height Ratio Calculator
              </Link>{' '}
              and wants to eliminate reading errors.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Clear digital readout, easy metric/imperial switching, good
                build quality, eliminates reading errors
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> No app connectivity, needs a battery, no automatic tension
                control
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B0B1DJL4WG?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <h2 className="text-2xl font-bold mt-8 mb-4">Comparison table</h2>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Product</th>
                  <th className="border p-3 text-center">Price</th>
                  <th className="border p-3 text-center">Rating</th>
                  <th className="border p-3 text-center">Type</th>
                  <th className="border p-3 text-center">Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">MyoTape</td>
                  <td className="border p-3 text-center">$7.95</td>
                  <td className="border p-3 text-center">
                    &#9733;&#9733;&#9733;&#9733;&#9734; 4.5
                  </td>
                  <td className="border p-3 text-center">Manual</td>
                  <td className="border p-3 text-center">Overall best</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">RENPHO Bluetooth</td>
                  <td className="border p-3 text-center">$19.99</td>
                  <td className="border p-3 text-center">
                    &#9733;&#9733;&#9733;&#9733;&#9734; 4.4
                  </td>
                  <td className="border p-3 text-center">Smart</td>
                  <td className="border p-3 text-center">App tracking</td>
                </tr>
                <tr>
                  <td className="border p-3">RENPHO Standard</td>
                  <td className="border p-3 text-center">$14.99</td>
                  <td className="border p-3 text-center">
                    &#9733;&#9733;&#9733;&#9733;&#9734; 4.3
                  </td>
                  <td className="border p-3 text-center">Smart</td>
                  <td className="border p-3 text-center">Budget smart</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">Lightstuff Digital</td>
                  <td className="border p-3 text-center">$12.99</td>
                  <td className="border p-3 text-center">
                    &#9733;&#9733;&#9733;&#9733;&#9734; 4.4
                  </td>
                  <td className="border p-3 text-center">Digital</td>
                  <td className="border p-3 text-center">Accuracy</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">How to take accurate body measurements</h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Waist:</strong> Measure at the narrowest point between your ribs and hips,
                usually at or just above the navel. Exhale normally, do not suck in.
              </li>
              <li>
                <strong>Hips:</strong> Measure at the widest point of your buttocks, standing with
                feet together.
              </li>
              <li>
                <strong>Neck:</strong> Measure just below the larynx (Adam&apos;s apple), tape
                angled slightly downward at the front.
              </li>
              <li>
                <strong>Timing:</strong> Measure first thing in the morning before eating or
                drinking. Hydration and meals can add an inch to your waist.
              </li>
              <li>
                <strong>Frequency:</strong> Once per week is enough. Daily measurements fluctuate
                too much to be useful.
              </li>
              <li>
                <strong>Record everything:</strong> Write down the numbers or use an app. Memory is
                unreliable. Feed the measurements into our{' '}
                <Link href="/whr" className="text-accent hover:underline">
                  WHR Calculator
                </Link>{' '}
                or{' '}
                <Link href="/absi" className="text-accent hover:underline">
                  ABSI Calculator
                </Link>{' '}
                to track your health risk over time.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Final recommendations</h2>
          <ul className="list-disc list-inside space-y-2 my-6">
            <li>
              <strong>Best for most people:</strong> The <strong>MyoTape at $7.95</strong> is cheap,
              reliable, and does not need batteries or an app. It will last years.
            </li>
            <li>
              <strong>Best for data nerds:</strong> The <strong>RENPHO Bluetooth at $19.99</strong>{' '}
              tracks everything in an app and graphs your progress automatically.
            </li>
            <li>
              <strong>Best for clear readings:</strong> The{' '}
              <strong>Lightstuff Digital at $12.99</strong> shows big numbers on an LCD so you never
              misread.
            </li>
          </ul>

          <p>
            A body tape measure is one of the cheapest and most useful tools for tracking your
            fitness progress. Waist circumference alone is a better predictor of health risk than
            BMI for many people. Combine it with our{' '}
            <Link href="/whr" className="text-accent hover:underline">
              WHR Calculator
            </Link>
            ,{' '}
            <Link href="/absi" className="text-accent hover:underline">
              ABSI Calculator
            </Link>
            , and{' '}
            <Link href="/body-fat" className="text-accent hover:underline">
              Body Fat Calculator
            </Link>{' '}
            to get a complete picture of your body composition without expensive equipment.
          </p>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Related calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/whr"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">WHR Calculator</h4>
                <p className="text-sm text-gray-600">Calculate waist-to-hip ratio</p>
              </Link>
              <Link
                href="/absi"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">ABSI Calculator</h4>
                <p className="text-sm text-gray-600">A Body Shape Index assessment</p>
              </Link>
              <Link
                href="/body-fat"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">Body Fat Calculator</h4>
                <p className="text-sm text-gray-600">Navy method body fat estimate</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
