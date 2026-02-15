import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Running Shoes for Weight Loss in 2026 | HealthCheck Blog',
  description:
    'Compare the best running shoes for weight loss and beginners. Reviews of Brooks Ghost 16, HOKA Clifton 9, Nike Pegasus 41, ASICS Gel-Kayano 31, and New Balance 1080v13.',
  keywords:
    'best running shoes weight loss 2026, Brooks Ghost 16, HOKA Clifton 9, Nike Pegasus 41, ASICS Gel-Kayano 31, New Balance 1080v13, running shoes for beginners',
  openGraph: {
    title: 'Best Running Shoes for Weight Loss in 2026 | HealthCheck Blog',
    description: 'Honest reviews of the best running shoes for weight loss and beginners.',
    type: 'article',
    url: 'https://www.healthcalc.xyz/blog/best-running-shoes-weight-loss',
    images: [
      {
        url: '/images/blog/best-running-shoes-weight-loss.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Running Shoes for Weight Loss in 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Running Shoes for Weight Loss in 2026',
    images: ['/images/blog/best-running-shoes-weight-loss.jpg'],
  },
};

export default function BestRunningShoesWeightLossPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Running Shoes for Weight Loss in 2026',
    description: 'Compare the best running shoes for weight loss and beginner runners.',
    datePublished: '2026-02-08',
    dateModified: '2026-02-08',
    author: { '@type': 'Organization', name: 'HealthCheck', url: 'https://www.healthcalc.xyz' },
    publisher: {
      '@type': 'Organization',
      name: 'HealthCheck',
      logo: { '@type': 'ImageObject', url: 'https://www.healthcalc.xyz/images/og-image.jpg' },
    },
    mainEntityOfPage: 'https://www.healthcalc.xyz/blog/best-running-shoes-weight-loss',
    image: ['https://www.healthcalc.xyz/images/blog/best-running-shoes-weight-loss.jpg'],
  };
  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Running Shoes for Weight Loss in 2026',
    itemListOrder: 'http://schema.org/ItemListOrderAscending',
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'Brooks Ghost 16' } },
      { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'HOKA Clifton 9' } },
      { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'Nike Pegasus 41' } },
      {
        '@type': 'ListItem',
        position: 4,
        item: { '@type': 'Product', name: 'ASICS Gel-Kayano 31' },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: { '@type': 'Product', name: 'New Balance Fresh Foam X 1080v13' },
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
            Best Running Shoes for Weight Loss in 2026
          </h1>
          <p className="text-gray-500 italic">Published: February 8, 2026 &middot; 14 min read</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="neumorph p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Picks</h2>
            <ul className="space-y-2">
              <li>
                <strong>Best for Beginners:</strong> Brooks Ghost 16 ($139.95) - Smooth ride,
                neutral cushion, great out of the box
              </li>
              <li>
                <strong>Best Cushioning:</strong> HOKA Clifton 9 ($145.00) - Marshmallow soft,
                lightweight for its stack height
              </li>
              <li>
                <strong>Best All-Around:</strong> Nike Pegasus 41 ($130.00) - Versatile workhorse,
                React X foam, Zoom Air unit
              </li>
              <li>
                <strong>Best Stability:</strong> ASICS Gel-Kayano 31 ($159.95) - 4D Guidance system
                for overpronators
              </li>
              <li>
                <strong>Best Premium:</strong> New Balance 1080v13 ($159.99) - Fresh Foam X, plush
                but responsive
              </li>
            </ul>
          </div>

          <div className="neumorph p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Top picks at a glance</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <Link href="#brooks" className="text-accent hover:underline">
                  Brooks Ghost 16
                </Link>
              </li>
              <li>
                <Link href="#hoka" className="text-accent hover:underline">
                  HOKA Clifton 9
                </Link>
              </li>
              <li>
                <Link href="#nike" className="text-accent hover:underline">
                  Nike Pegasus 41
                </Link>
              </li>
              <li>
                <Link href="#asics" className="text-accent hover:underline">
                  ASICS Gel-Kayano 31
                </Link>
              </li>
              <li>
                <Link href="#newbalance" className="text-accent hover:underline">
                  New Balance Fresh Foam X 1080v13
                </Link>
              </li>
            </ul>
          </div>

          <p>
            I put off running for years because my knees hurt after every attempt. Turns out the
            problem was not running itself but the flat $40 sneakers I was wearing. The right
            running shoe does not make you faster or burn more calories on its own, but it keeps you
            injury-free long enough to actually build a habit. That matters more than any shoe
            technology when your goal is weight loss. Use our{' '}
            <Link href="/body-fat-burn" className="text-accent hover:underline">
              Body Fat Burn Calculator
            </Link>{' '}
            to see how many calories running burns at your weight, then invest in shoes that let you
            do it consistently.
          </p>

          <div className="neumorph p-6 rounded-lg my-6">
            <h2 className="text-2xl font-bold mb-3">Running and weight loss toolkit</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pair the right shoes with the right data to stay on track.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/body-fat-burn" className="text-accent hover:underline font-medium">
                Body Fat Burn Calculator
              </Link>
              <Link href="/tdee" className="text-accent hover:underline font-medium">
                TDEE Calculator
              </Link>
              <Link href="/calorie-deficit" className="text-accent hover:underline font-medium">
                Calorie Deficit Calculator
              </Link>
              <Link href="/bmi" className="text-accent hover:underline font-medium">
                BMI Calculator
              </Link>
              <Link href="/weight-management" className="text-accent hover:underline font-medium">
                Weight Management Calculator
              </Link>
            </div>
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
                  href="/blog/best-foam-rollers-recovery"
                  className="text-accent hover:underline"
                >
                  Best Foam Rollers and Recovery Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/best-resistance-bands-strength-training"
                  className="text-accent hover:underline"
                >
                  Best Resistance Bands for Strength Training
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/best-supplements-fitness-goals"
                  className="text-accent hover:underline"
                >
                  Best Supplements for Your Fitness Goals
                </Link>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why running shoes matter for weight loss</h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <p className="mb-4">
              Running burns roughly 80-120 calories per mile depending on your body weight. You can
              calculate your exact number with our{' '}
              <Link href="/tdee" className="text-accent hover:underline">
                TDEE Calculator
              </Link>
              . But here is the thing: you only burn those calories if you actually run
              consistently. And the number one reason beginners quit running is joint pain from bad
              shoes.
            </p>
            <p className="mb-4">
              A proper running shoe absorbs 2-3x your body weight in impact force with each stride.
              If you weigh 200 pounds, your knees absorb 400-600 pounds of force per step in flat
              sneakers. Over a 3-mile run (roughly 5,000 steps), that adds up. The cushioning in the
              shoes below is not a luxury. It is what keeps you running next week instead of icing
              your knees on the couch.
            </p>
            <p>
              I am not going to tell you which shoe is &quot;best.&quot; Feet are different. I will
              tell you what each shoe does well, what it does poorly, and who it suits based on body
              weight, gait, and running surface. If you are starting a{' '}
              <Link href="/calorie-deficit" className="text-accent hover:underline">
                calorie deficit
              </Link>{' '}
              and adding running to the plan, start with 2-3 runs per week and build from there.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">How I picked these shoes</h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Cushioning first:</strong> Heavier runners need more shock absorption. Every
                shoe here has at least moderate cushioning.
              </li>
              <li>
                <strong>Durability:</strong> Cheap shoes break down after 200 miles. These all last
                400-500 miles.
              </li>
              <li>
                <strong>Weight range:</strong> I chose shoes that perform well for runners from 150
                to 250+ pounds.
              </li>
              <li>
                <strong>Price under $170:</strong> No carbon-plated race day shoes. These are daily
                trainers you will wear 3-5 times per week.
              </li>
              <li>
                <strong>Wide sizes available:</strong> Every shoe on this list comes in wide or
                extra-wide options.
              </li>
            </ul>
          </div>

          {/* Product 1 */}
          <h2 id="brooks" className="text-2xl font-bold mt-8 mb-4">
            1. Brooks Ghost 16 - Best for Beginners
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best for Beginners
                </span>
                <h3 className="text-xl font-semibold">Brooks Ghost 16</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9733; 4.7 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$139.95</span>
            </div>
            <p className="mb-4">
              The Ghost is the best-selling running shoe in America for a reason. It works for
              almost everybody. The DNA LOFT v2 midsole is soft enough for comfort but firm enough
              that you do not feel like you are running on a mattress. The 12mm heel-to-toe drop
              feels natural if you are transitioning from walking shoes or casual sneakers. I
              recommend this shoe to anyone who asks &quot;what running shoe should I get?&quot;
              without knowing their pronation type, because it handles neutral gaits without issue
              and mild overpronation without complaint.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>DNA LOFT v2 cushioning (nitrogen-infused midsole)</li>
              <li>12mm heel-to-toe drop</li>
              <li>Engineered mesh upper with 3D Fit Print</li>
              <li>Segmented crash pad outsole for smooth transitions</li>
              <li>Available in regular, wide (D), and extra-wide (2E) for men</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              First-time runners, walkers transitioning to running, and anyone who wants a reliable
              neutral shoe. It is the safe choice and that is not a criticism. Safe gets you out the
              door consistently.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Works for most foot types, smooth heel-to-toe transition,
                good durability (450+ miles), comfortable from the first run
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Not the lightest at 9.6 oz, some runners find it too soft for
                speed work, the upper runs warm in summer
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B0CLMHGPYP?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Product 2 */}
          <h2 id="hoka" className="text-2xl font-bold mt-8 mb-4">
            2. HOKA Clifton 9 - Best Cushioning
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best Cushioning
                </span>
                <h3 className="text-xl font-semibold">HOKA Clifton 9</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9733; 4.6 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$145.00</span>
            </div>
            <p className="mb-4">
              The Clifton is why HOKA became a household name. The compression-molded EVA midsole
              looks absurdly thick, but the shoe weighs only 8.9 oz for men. That ratio of cushion
              to weight is what makes it special. Heavier runners love it because the thick midsole
              absorbs more impact than any other shoe at this price. The rocker geometry helps your
              foot roll forward naturally, which reduces stress on your Achilles tendon. If you have
              had shin splints or knee pain from running, try this shoe before you give up on
              running entirely.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Compression-molded EVA midsole</li>
              <li>Meta-Rocker geometry for smooth stride</li>
              <li>5mm heel-to-toe drop</li>
              <li>Engineered knit upper with pull tab</li>
              <li>Durabrasion rubber outsole</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              Heavier runners (200+ lbs), people with joint pain, and anyone who prioritizes comfort
              over everything else. Also popular with nurses and people who stand all day.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Maximum cushion at minimal weight, rocker design reduces
                joint stress, wide toe box, looks good enough to wear casually
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Low 5mm drop feels unusual if you are used to traditional
                shoes, outsole wears faster than competitors (350-400 miles), the platform height
                can feel unstable on trails
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B0BWJXRXQ5?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Product 3 */}
          <h2 id="nike" className="text-2xl font-bold mt-8 mb-4">
            3. Nike Pegasus 41 - Best All-Around
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best All-Around
                </span>
                <h3 className="text-xl font-semibold">Nike Pegasus 41</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9734; 4.5 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$130.00</span>
            </div>
            <p className="mb-4">
              The Pegasus has been around for 41 versions and the formula is simple: it does
              everything reasonably well. The React X foam is more responsive than the Brooks Ghost
              but less plush than the HOKA Clifton. The Zoom Air unit in the forefoot adds spring to
              your step during faster efforts. This is the shoe for runners who do not want a
              one-trick pony. Easy runs, tempo runs, occasional 5K races. It handles all of it
              without excelling or failing at anything specific.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>React X foam midsole with Zoom Air unit</li>
              <li>10mm heel-to-toe drop</li>
              <li>Flywire cables integrated into the lacing system</li>
              <li>Waffle outsole with rubber pods</li>
              <li>Available in regular and wide widths</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              Runners who want one shoe for everything. If you run 3-4 times per week at different
              paces and do not want to own multiple pairs, the Pegasus covers all your bases. Also
              the cheapest shoe on this list at $130.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Versatile for all paces, responsive Zoom Air forefoot, lowest
                price on this list, proven 40-year track record
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Not as cushioned as HOKA or Brooks for long slow runs, Nike
                sizing runs narrow, upper can feel stiff for the first few runs
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B0D2DQ8S6X?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Product 4 */}
          <h2 id="asics" className="text-2xl font-bold mt-8 mb-4">
            4. ASICS Gel-Kayano 31 - Best Stability
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best Stability
                </span>
                <h3 className="text-xl font-semibold">ASICS Gel-Kayano 31</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9733; 4.6 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$159.95</span>
            </div>
            <p className="mb-4">
              If you overpronate (your feet roll inward when you run), you need a stability shoe.
              The Kayano is the one most physical therapists and running stores recommend. The 4D
              Guidance System in the midsole does not aggressively correct your gait like old-school
              motion control shoes did. Instead, it gently guides your foot through a more neutral
              path. The FF BLAST PLUS Eco cushioning is ASICS&apos;s softest midsole material, so
              you get stability without sacrificing comfort. Heavier runners who overpronate get the
              worst of both worlds with neutral shoes: joint pain from overpronation and joint pain
              from impact. This shoe addresses both.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>4D Guidance System for stability</li>
              <li>FF BLAST PLUS Eco cushioning (20% bio-based)</li>
              <li>PureGEL technology in the heel</li>
              <li>10mm heel-to-toe drop</li>
              <li>AHARPLUS outsole rubber for durability</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              Overpronators, heavier runners, and anyone who has been told they need a stability
              shoe. Also works well for flat-footed runners. If your old shoes show uneven wear on
              the inside edge, this is your shoe.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Excellent stability without feeling rigid, soft cushioning,
                durable outsole (500+ miles), good for heavier runners
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> Heavy at 10.9 oz, not great for speed work, $160 is on the
                expensive side, overkill if you have a neutral gait
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B0CNKYXFSY?tag=gr8monk3ys-20"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Check Price on Amazon
              </a>
            </div>
          </div>

          {/* Product 5 */}
          <h2 id="newbalance" className="text-2xl font-bold mt-8 mb-4">
            5. New Balance Fresh Foam X 1080v13 - Best Premium Comfort
          </h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mb-2">
                  Best Premium
                </span>
                <h3 className="text-xl font-semibold">New Balance Fresh Foam X 1080v13</h3>
                <p className="text-sm text-yellow-600 mt-1">
                  &#9733;&#9733;&#9733;&#9733;&#9733; 4.7 out of 5
                </p>
              </div>
              <span className="text-2xl font-bold text-accent">$159.99</span>
            </div>
            <p className="mb-4">
              The 1080 is New Balance&apos;s flagship daily trainer and it feels like it. The Fresh
              Foam X midsole is plush on landing but returns more energy than you would expect from
              something this soft. The Hypoknit upper adapts to your foot shape better than any
              engineered mesh on this list. Where the HOKA Clifton is pure cushion and the Nike
              Pegasus is pure versatility, the 1080 splits the difference. It is the shoe I would
              buy if I could only own one pair. The v13 updated the outsole with more rubber
              coverage, which fixed the durability issue the v12 had.
            </p>
            <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Fresh Foam X midsole (data-informed cushioning geometry)</li>
              <li>Hypoknit upper with bootie construction</li>
              <li>6mm heel-to-toe drop</li>
              <li>Blown rubber outsole with strategic coverage</li>
              <li>Available in wide (2E) and extra-wide (4E)</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Who it is best for:</h4>
            <p>
              Runners who want the plush feel of HOKA with more ground feel and responsiveness.
              Great for long runs, recovery runs, and anyone building up weekly mileage. The
              wide-size options make it ideal for runners with wider feet.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Pros:</strong> Excellent balance of soft and responsive, Hypoknit upper fits
                like a sock, great wide options, improved durability in v13
              </p>
              <p className="text-sm mt-2">
                <strong>Cons:</strong> $160 price tag, slightly heavier than the Clifton at 10.1 oz,
                the soft midsole can feel mushy for very fast paces
              </p>
            </div>
            <div className="mt-4">
              <a
                href="https://www.amazon.com/dp/B0BHZGJYFM?tag=gr8monk3ys-20"
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
                  <th className="border p-3 text-left">Shoe</th>
                  <th className="border p-3 text-center">Price</th>
                  <th className="border p-3 text-center">Weight</th>
                  <th className="border p-3 text-center">Drop</th>
                  <th className="border p-3 text-center">Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">Brooks Ghost 16</td>
                  <td className="border p-3 text-center">$139.95</td>
                  <td className="border p-3 text-center">9.6 oz</td>
                  <td className="border p-3 text-center">12mm</td>
                  <td className="border p-3 text-center">Beginners</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">HOKA Clifton 9</td>
                  <td className="border p-3 text-center">$145.00</td>
                  <td className="border p-3 text-center">8.9 oz</td>
                  <td className="border p-3 text-center">5mm</td>
                  <td className="border p-3 text-center">Cushioning</td>
                </tr>
                <tr>
                  <td className="border p-3">Nike Pegasus 41</td>
                  <td className="border p-3 text-center">$130.00</td>
                  <td className="border p-3 text-center">9.4 oz</td>
                  <td className="border p-3 text-center">10mm</td>
                  <td className="border p-3 text-center">All-around</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3">ASICS Gel-Kayano 31</td>
                  <td className="border p-3 text-center">$159.95</td>
                  <td className="border p-3 text-center">10.9 oz</td>
                  <td className="border p-3 text-center">10mm</td>
                  <td className="border p-3 text-center">Stability</td>
                </tr>
                <tr>
                  <td className="border p-3">NB 1080v13</td>
                  <td className="border p-3 text-center">$159.99</td>
                  <td className="border p-3 text-center">10.1 oz</td>
                  <td className="border p-3 text-center">6mm</td>
                  <td className="border p-3 text-center">Premium comfort</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Running tips for weight loss</h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Start with run/walk intervals:</strong> Run 2 minutes, walk 1 minute. Repeat
                for 20-30 minutes. This is not cheating; it is how most beginners build endurance
                without getting hurt.
              </li>
              <li>
                <strong>Calculate your calorie burn:</strong> Use our{' '}
                <Link href="/body-fat-burn" className="text-accent hover:underline">
                  Body Fat Burn Calculator
                </Link>{' '}
                to get an accurate number based on your weight and pace. Running burns roughly 100
                calories per mile for a 160-lb person.
              </li>
              <li>
                <strong>Do not out-eat your runs:</strong> A 30-minute run burns 250-400 calories. A
                post-run smoothie can easily match that. Track with our{' '}
                <Link href="/calorie-deficit" className="text-accent hover:underline">
                  Calorie Deficit Calculator
                </Link>
                .
              </li>
              <li>
                <strong>Replace shoes every 400-500 miles:</strong> Once the midsole is compressed,
                you lose cushioning and increase injury risk. Track your mileage.
              </li>
              <li>
                <strong>Run 3 times per week minimum:</strong> Twice a week maintains fitness. Three
                times builds it. You can fill other days with walking or strength training.
              </li>
              <li>
                <strong>Slow down:</strong> You should be able to hold a conversation while running.
                If you are gasping, slow down. Slow running still burns nearly the same calories per
                mile as fast running.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">How to know if you need stability shoes</h2>
          <div className="neumorph p-6 rounded-lg my-6">
            <p className="mb-4">
              Look at the soles of your current walking or running shoes. If the inside edge (near
              your big toe) shows more wear than the outside, you likely overpronate and would
              benefit from a stability shoe like the ASICS Gel-Kayano. If the wear is even or
              slightly on the outside, a neutral shoe (Brooks Ghost, HOKA Clifton, Nike Pegasus, or
              New Balance 1080) will work.
            </p>
            <p>
              Another simple test: wet your feet and step on a paper bag. If you see your entire
              footprint (flat arch), you probably overpronate. If you see only the heel, ball, and a
              thin strip on the outside, you have a neutral or high arch. Track your body metrics
              with our{' '}
              <Link href="/bmi" className="text-accent hover:underline">
                BMI Calculator
              </Link>{' '}
              and{' '}
              <Link href="/weight-management" className="text-accent hover:underline">
                Weight Management Calculator
              </Link>{' '}
              to measure your progress as you build a running routine.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Final recommendations</h2>
          <ul className="list-disc list-inside space-y-2 my-6">
            <li>
              <strong>New to running:</strong> <strong>Brooks Ghost 16 at $139.95</strong> works for
              almost everyone and feels good from the first run.
            </li>
            <li>
              <strong>Joint pain or heavier weight:</strong>{' '}
              <strong>HOKA Clifton 9 at $145.00</strong> has the most cushioning per ounce of shoe
              weight.
            </li>
            <li>
              <strong>One shoe for everything:</strong> <strong>Nike Pegasus 41 at $130.00</strong>{' '}
              handles easy runs, tempo runs, and races at the lowest price here.
            </li>
            <li>
              <strong>Overpronation:</strong> <strong>ASICS Gel-Kayano 31 at $159.95</strong> is the
              stability shoe that does not feel like a stability shoe.
            </li>
            <li>
              <strong>Want the best of everything:</strong>{' '}
              <strong>New Balance 1080v13 at $159.99</strong> if comfort, responsiveness, and fit
              quality all matter equally to you.
            </li>
          </ul>

          <p>
            The best running shoe for weight loss is the one that keeps you running. Buy a pair that
            fits, lace them up, and get out the door. Calculate your target calorie deficit with our{' '}
            <Link href="/calorie-deficit" className="text-accent hover:underline">
              Calorie Deficit Calculator
            </Link>{' '}
            and track your body composition changes with our{' '}
            <Link href="/body-fat" className="text-accent hover:underline">
              Body Fat Calculator
            </Link>
            . The shoes are the easy part.
          </p>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Related calculators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/body-fat-burn"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">Body Fat Burn Calculator</h4>
                <p className="text-sm text-gray-600">Estimate running calorie burn</p>
              </Link>
              <Link
                href="/tdee"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">TDEE Calculator</h4>
                <p className="text-sm text-gray-600">Calculate daily energy needs</p>
              </Link>
              <Link
                href="/calorie-deficit"
                className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
              >
                <h4 className="font-semibold">Calorie Deficit Calculator</h4>
                <p className="text-sm text-gray-600">Plan your weight loss deficit</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
