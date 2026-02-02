import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Kitchen Scales for Portion Control and Calorie Tracking in 2026 | HealthCheck Blog',
  description:
    'Compare the top food scales for accurate portion control and calorie counting. Reviews of OXO, Etekcity, URAMAZ, and more digital kitchen scales.',
  keywords:
    'kitchen scale, food scale, portion control scale, calorie counting scale, best food scale 2026, digital kitchen scale, nutrition scale, meal prep scale',
};

export default function BestKitchenScalesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
          Product Reviews
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          Best Kitchen Scales for Portion Control and Calorie Tracking in 2026
        </h1>
        <p className="text-gray-500 italic">Published: February 2, 2026 • 10 min read</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="neumorph p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Picks</h2>
          <ul className="space-y-2">
            <li>
              <strong>Best Overall:</strong> OXO Good Grips ($49.99) - Pull-out display, chef
              recommended
            </li>
            <li>
              <strong>Best Budget:</strong> Etekcity Digital Scale ($14.99) - Amazon bestseller,
              reliable
            </li>
            <li>
              <strong>Best with Nutrition:</strong> Greater Goods Nourish ($29.99) - Built-in
              calorie database
            </li>
            <li>
              <strong>Best Smart:</strong> URAMAZ Smart Scale ($24.99) - App-connected nutrition
              tracking
            </li>
          </ul>
        </div>

        <p>
          Here's the truth about calorie tracking: without a food scale, you're probably eating more
          than you think. Studies show people underestimate portions by 30-50% when eyeballing. If
          you've calculated your daily calories with our{' '}
          <Link href="/tdee" className="text-accent hover:underline">
            TDEE Calculator
          </Link>{' '}
          but aren't seeing results, inaccurate portions could be why.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Why You Need a Food Scale</h2>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="font-semibold mb-3">The Portion Problem:</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Food</th>
                <th className="p-2 text-center">Serving Size</th>
                <th className="p-2 text-center">Typical "Eyeball"</th>
                <th className="p-2 text-center">Calorie Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Peanut Butter</td>
                <td className="p-2 text-center">2 tbsp (32g)</td>
                <td className="p-2 text-center">~50g</td>
                <td className="p-2 text-center text-red-600">+100 calories</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2">Pasta (dry)</td>
                <td className="p-2 text-center">2 oz (56g)</td>
                <td className="p-2 text-center">~100g</td>
                <td className="p-2 text-center text-red-600">+160 calories</td>
              </tr>
              <tr>
                <td className="p-2">Olive Oil</td>
                <td className="p-2 text-center">1 tbsp (13g)</td>
                <td className="p-2 text-center">~25g</td>
                <td className="p-2 text-center text-red-600">+110 calories</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2">Chicken Breast</td>
                <td className="p-2 text-center">4 oz (113g)</td>
                <td className="p-2 text-center">~170g</td>
                <td className="p-2 text-center text-red-600">+85 calories</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-sm text-gray-600">
            These "small" differences can add up to 500+ extra calories per day - enough to
            completely eliminate your deficit.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          1. OXO Good Grips Food Scale - Best Overall
        </h2>

        <div className="neumorph p-6 rounded-lg my-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                Chef's Choice
              </span>
              <h3 className="text-xl font-semibold">OXO Good Grips Food Scale</h3>
            </div>
            <span className="text-2xl font-bold text-accent">$49.99</span>
          </div>

          <p className="mb-4">
            The OXO Good Grips is recommended by professional chefs like Ina Garten for good reason.
            The pull-out display solves the biggest annoyance with food scales - you can actually
            see the reading when using a large bowl.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Pull-out display prevents bowl from blocking view</li>
            <li>11 lb (5 kg) capacity</li>
            <li>Measures in grams, ounces, pounds, and milliliters</li>
            <li>Zero/tare function for easy multi-ingredient measuring</li>
            <li>Slim design stores easily in drawers</li>
            <li>Non-slip feet and stainless steel platform</li>
            <li>AAA batteries included</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
          <p>
            Essential for users of our{' '}
            <Link href="/calorie-deficit" className="text-accent hover:underline">
              Calorie Deficit Calculator
            </Link>
            . Accurate weighing ensures your calculated deficit translates to real results.
          </p>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong>Pros:</strong> Pull-out display is game-changing, professional quality,
              excellent tare function
            </p>
            <p className="text-sm mt-2">
              <strong>Cons:</strong> Higher price, no app connectivity, requires batteries
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Etekcity Digital Scale - Best Budget</h2>

        <div className="neumorph p-6 rounded-lg my-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                #1 Bestseller
              </span>
              <h3 className="text-xl font-semibold">Etekcity Digital Kitchen Scale</h3>
            </div>
            <span className="text-2xl font-bold text-accent">$14.99</span>
          </div>

          <p className="mb-4">
            With over 140,000 Amazon reviews and a 4.7-star rating, the Etekcity is the people's
            choice. It does everything you need at an unbeatable price.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>11 lb (5 kg) capacity</li>
            <li>Accurate to 1g above 5g</li>
            <li>Slim, easy-to-store design</li>
            <li>Stainless steel weighing platform</li>
            <li>4 unit measurements (g, oz, lb, ml)</li>
            <li>Tare/zero function</li>
            <li>Auto-off to save batteries</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
          <p>
            Perfect starter scale for users beginning their{' '}
            <Link href="/weight-management" className="text-accent hover:underline">
              weight management
            </Link>{' '}
            journey. The low price removes any barrier to accurate tracking.
          </p>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong>Pros:</strong> Unbeatable price, proven reliability, compact
            </p>
            <p className="text-sm mt-2">
              <strong>Cons:</strong> Display can be blocked by large bowls, basic features
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          3. Greater Goods Nourish - Best with Built-in Nutrition
        </h2>

        <div className="neumorph p-6 rounded-lg my-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-2">
                Nutrition Built-in
              </span>
              <h3 className="text-xl font-semibold">Greater Goods Nourish Scale</h3>
            </div>
            <span className="text-2xl font-bold text-accent">$29.99</span>
          </div>

          <p className="mb-4">
            The Nourish scale has a built-in database of 2,000+ foods. Enter a food code, weigh your
            portion, and it calculates calories, carbs, protein, and fat instantly - no app needed.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>2,000+ food nutritional database</li>
            <li>Displays calories, carbs, protein, fat, fiber, sodium</li>
            <li>No smartphone or app required</li>
            <li>Add custom foods with food codes</li>
            <li>11 lb capacity</li>
            <li>Meal memory function</li>
            <li>Includes food code reference booklet</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
          <p>
            Great for users who've calculated their targets with our{' '}
            <Link href="/tdee" className="text-accent hover:underline">
              TDEE Calculator
            </Link>{' '}
            but don't want to use a phone app. All-in-one nutrition tracking.
          </p>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong>Pros:</strong> No app needed, instant nutrition info, good value
            </p>
            <p className="text-sm mt-2">
              <strong>Cons:</strong> Food code lookup can be tedious, limited database vs. apps
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. URAMAZ Smart Scale - Best App-Connected</h2>

        <div className="neumorph p-6 rounded-lg my-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mb-2">
                Smart Connected
              </span>
              <h3 className="text-xl font-semibold">URAMAZ Smart Food Scale</h3>
            </div>
            <span className="text-2xl font-bold text-accent">$24.99</span>
          </div>

          <p className="mb-4">
            The URAMAZ connects to a smartphone app with a massive food database. Weigh your food,
            select it in the app, and it automatically logs the exact nutrition to your diary.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Bluetooth app connectivity</li>
            <li>Large food database in companion app</li>
            <li>Tracks calories, protein, carbs, fat, fiber</li>
            <li>11 lb capacity with 0.1oz precision</li>
            <li>5 unit measurements</li>
            <li>Syncs with Apple Health and Google Fit</li>
            <li>USB rechargeable</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">Calculator Relevance:</h4>
          <p>
            Streamlines logging for users tracking their{' '}
            <Link href="/calorie-deficit" className="text-accent hover:underline">
              calorie deficit
            </Link>
            . Weigh once, log automatically - reduces friction in the tracking process.
          </p>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong>Pros:</strong> App integration, automatic logging, rechargeable
            </p>
            <p className="text-sm mt-2">
              <strong>Cons:</strong> Requires phone nearby, app quality varies, dependency on app
              updates
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">How to Use a Food Scale Effectively</h2>

        <div className="neumorph p-6 rounded-lg my-6">
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Weigh everything raw:</strong> Cooking changes weight. 4 oz raw chicken ≠ 4 oz
              cooked chicken
            </li>
            <li>
              <strong>Use the tare function:</strong> Place bowl, press tare (zero), then add
              ingredients
            </li>
            <li>
              <strong>Weigh in grams:</strong> More precise than ounces for calorie tracking
            </li>
            <li>
              <strong>Weigh calorie-dense foods first:</strong> Oils, nuts, cheese - small errors
              matter most here
            </li>
            <li>
              <strong>Build habits gradually:</strong> Start with just weighing protein, then expand
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Comparison Table</h2>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Scale</th>
                <th className="border p-3 text-center">Price</th>
                <th className="border p-3 text-center">Capacity</th>
                <th className="border p-3 text-center">Special Feature</th>
                <th className="border p-3 text-center">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">OXO Good Grips</td>
                <td className="border p-3 text-center">$49.99</td>
                <td className="border p-3 text-center">11 lb</td>
                <td className="border p-3 text-center">Pull-out display</td>
                <td className="border p-3 text-center">Serious cooks</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-3">Etekcity</td>
                <td className="border p-3 text-center">$14.99</td>
                <td className="border p-3 text-center">11 lb</td>
                <td className="border p-3 text-center">Low price</td>
                <td className="border p-3 text-center">Beginners</td>
              </tr>
              <tr>
                <td className="border p-3">Greater Goods</td>
                <td className="border p-3 text-center">$29.99</td>
                <td className="border p-3 text-center">11 lb</td>
                <td className="border p-3 text-center">Nutrition display</td>
                <td className="border p-3 text-center">No-app users</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-3">URAMAZ</td>
                <td className="border p-3 text-center">$24.99</td>
                <td className="border p-3 text-center">11 lb</td>
                <td className="border p-3 text-center">App connected</td>
                <td className="border p-3 text-center">Tech lovers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Final Recommendations</h2>

        <ul className="list-disc list-inside space-y-2 my-6">
          <li>
            <strong>Just starting out:</strong> Get the <strong>Etekcity</strong> - $15 removes any
            excuse not to weigh your food
          </li>
          <li>
            <strong>Want quality:</strong> The <strong>OXO Good Grips</strong> pull-out display is
            worth every penny
          </li>
          <li>
            <strong>Hate apps:</strong> The <strong>Greater Goods Nourish</strong> has nutrition
            built-in
          </li>
          <li>
            <strong>Love tech:</strong> The <strong>URAMAZ</strong> app integration streamlines
            logging
          </li>
        </ul>

        <p>
          A food scale is the single most impactful purchase for anyone serious about hitting their
          calorie goals. Combined with our calculators, you'll have everything needed for successful
          weight management.
        </p>

        <div className="neumorph p-6 rounded-lg my-8 bg-gray-50">
          <p className="text-sm text-gray-600">
            <strong>Disclosure:</strong> Some of the links in this article are affiliate links,
            meaning we may earn a small commission if you make a purchase. This comes at no
            additional cost to you and helps support our free health calculators.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-4">Related Calculators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/calorie-deficit"
              className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
            >
              <h4 className="font-semibold">Calorie Deficit Calculator</h4>
              <p className="text-sm text-gray-600">Plan your weight loss deficit</p>
            </Link>
            <Link
              href="/tdee"
              className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
            >
              <h4 className="font-semibold">TDEE Calculator</h4>
              <p className="text-sm text-gray-600">Find your maintenance calories</p>
            </Link>
            <Link
              href="/weight-management"
              className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
            >
              <h4 className="font-semibold">Weight Management Calculator</h4>
              <p className="text-sm text-gray-600">Set your goal weight timeline</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
