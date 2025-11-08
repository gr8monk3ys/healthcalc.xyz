import React from 'react';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';

export const metadata = {
  title: 'HeathCheck - Free Body Fat, BMI, TDEE Calculators',
  description:
    'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
  keywords:
    'body fat calculator, BMI calculator, TDEE calculator, calorie deficit calculator, weight loss calculator, fitness calculators, health calculators, waist-to-hip ratio, ABSI calculator',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HeathCheck - Free Body Fat, BMI, TDEE Calculators',
    description:
      'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
    url: 'https://www.heathcheck.info/',
    siteName: 'HealthCheck',
    locale: 'en_US',
    type: 'website',
  },
};

// Icons for calculator cards
const icons = {
  bodyFat: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  calorieDeficit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  weightManagement: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  maxFatLoss: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
      />
    </svg>
  ),
  tdee: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  ),
  absi: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  calorieBurn: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
      />
    </svg>
  ),
  bmi: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  whr: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  conversions: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  ),
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 mb-12 bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Accurate Health & Fitness Calculators
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Evidence-based tools to help you understand your body composition, set realistic
                goals, and track your progress.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/bmi"
                  className="px-6 py-3 neumorph rounded-lg text-accent font-medium hover:shadow-neumorph-inset transition-all"
                >
                  Calculate BMI
                </Link>
                <Link
                  href="/body-fat"
                  className="px-6 py-3 neumorph rounded-lg text-accent font-medium hover:shadow-neumorph-inset transition-all"
                >
                  Body Fat Calculator
                </Link>
                <Link
                  href="/tdee"
                  className="px-6 py-3 neumorph rounded-lg text-accent font-medium hover:shadow-neumorph-inset transition-all"
                >
                  TDEE Calculator
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="neumorph p-4 rounded-2xl">
                <div className="aspect-w-4 aspect-h-3 relative rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-5xl font-bold mb-2">9+</div>
                      <div className="text-xl">Free Calculators</div>
                      <div className="mt-4 text-sm">No sign-up required</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 neumorph p-3 rounded-lg transform rotate-3 bg-white">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Scientifically Validated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculators Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Health & Fitness Calculators</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your go-to resource for body fat, calorie needs, and weight management calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CalculatorCard
            title="Body Fat Calculator"
            description="Calculate your body fat percentage using various methods including Navy, skinfold, and BMI."
            path="/body-fat"
            icon={icons.bodyFat}
          />

          <CalculatorCard
            title="Body Fat Burn Calculator"
            description="Calculate calories burned during physical activities and estimate weight loss timeline."
            path="/body-fat-burn"
            icon={icons.calorieBurn}
          />

          <CalculatorCard
            title="Calorie Deficit Calculator"
            description="Discover how long it will take to reach your goal weight with different calorie deficits."
            path="/calorie-deficit"
            icon={icons.calorieDeficit}
          />

          <CalculatorCard
            title="Weight Management Calculator"
            description="Plan your weight loss with a target date and get daily calorie and macro recommendations."
            path="/weight-management"
            icon={icons.weightManagement}
          />

          <CalculatorCard
            title="Maximum Fat Loss Calculator"
            description="Find the optimal calorie intake for maximum fat loss while preserving muscle mass."
            path="/maximum-fat-loss"
            icon={icons.maxFatLoss}
          />

          <CalculatorCard
            title="TDEE Calculator"
            description="Calculate your Total Daily Energy Expenditure to maintain your current weight."
            path="/tdee"
            icon={icons.tdee}
          />

          <CalculatorCard
            title="ABSI Calculator"
            description="Calculate your A Body Shape Index to assess health risk based on body shape."
            path="/absi"
            icon={icons.absi}
          />

          <CalculatorCard
            title="BMI Calculator"
            description="Calculate Body Mass Index for adults and children with age-appropriate interpretations."
            path="/bmi"
            icon={icons.bmi}
          />

          <CalculatorCard
            title="Waist-to-Hip Ratio"
            description="Calculate your Waist-to-Hip Ratio to assess fat distribution and health risk."
            path="/whr"
            icon={icons.whr}
          />

          <CalculatorCard
            title="Measurement Conversions"
            description="Convert between different units of measurement for weight, length, and volume."
            path="/conversions"
            icon={icons.conversions}
          />
        </div>
      </section>

      {/* Blog Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Health & Fitness Blog</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evidence-based articles to help you understand health, fitness, and nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link
            href="/blog/calorie-deficit-myths"
            className="neumorph p-5 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <span className="inline-block bg-accent/10 text-accent text-xs px-2 py-1 rounded-full mb-2">
              Weight Management
            </span>
            <h3 className="font-bold mb-2">5 Myths About Calorie Deficits Debunked</h3>
            <p className="text-sm text-gray-600 mb-2">
              Discover the truth behind common misconceptions about calorie deficits and weight
              loss.
            </p>
            <p className="text-xs text-gray-500">February 25, 2025 • 8 min read</p>
          </Link>

          <Link
            href="/blog/tdee-explained"
            className="neumorph p-5 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <span className="inline-block bg-accent/10 text-accent text-xs px-2 py-1 rounded-full mb-2">
              Energy Expenditure
            </span>
            <h3 className="font-bold mb-2">
              TDEE Explained: How Many Calories Do You Really Need?
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Understand the components of TDEE and why it's crucial for weight management.
            </p>
            <p className="text-xs text-gray-500">February 20, 2025 • 10 min read</p>
          </Link>

          <Link
            href="/blog/measuring-body-fat"
            className="neumorph p-5 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <span className="inline-block bg-accent/10 text-accent text-xs px-2 py-1 rounded-full mb-2">
              Measurement Methods
            </span>
            <h3 className="font-bold mb-2">
              The Pros and Cons of Different Body Fat Measurement Methods
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Compare accuracy and practicality of various body fat assessment techniques.
            </p>
            <p className="text-xs text-gray-500">February 15, 2025 • 12 min read</p>
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 neumorph rounded-lg text-accent font-medium hover:shadow-neumorph-inset transition-all"
          >
            View All Articles
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <div className="neumorph p-6">
          <h2 className="text-2xl font-bold mb-4">About HealthCheck</h2>
          <p className="mb-4">
            HealthCheck provides evidence-based calculators to help you understand your body
            composition, calorie needs, and set realistic fitness goals. Our tools use
            scientifically validated formulas and provide educational content to help you make
            informed decisions about your health.
          </p>
          <p>
            Whether you're looking to lose weight, gain muscle, or simply understand your body
            better, our calculators offer personalized insights based on your unique measurements
            and goals.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="neumorph p-6">
          <h2 className="text-2xl font-bold mb-4">Common Misconceptions About Fat Loss</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">The 3,500 Calorie Rule</h3>
              <p>
                While it's commonly stated that a 3,500 calorie deficit equals one pound of fat
                loss, the reality is more complex. Your body adapts to calorie restriction over
                time, and weight loss isn't linear. Our calculators use advanced models that account
                for these adaptations.
              </p>
              <p className="mt-2">
                Research shows that factors like metabolic adaptation, hormone fluctuations, and
                individual genetics all affect how your body processes a calorie deficit. This is
                why some people may see rapid initial weight loss followed by a plateau, even while
                maintaining the same caloric intake.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Spot Reduction</h3>
              <p>
                You can't target fat loss from specific areas through exercise. Fat reduction occurs
                throughout the body based on genetics, hormones, and overall calorie deficit. Focus
                on total body fat percentage rather than "problem areas."
              </p>
              <p className="mt-2">
                When your body mobilizes fat stores for energy, it does so from all adipose tissue
                sites simultaneously, though the proportion may differ based on your genetic
                predisposition. This explains why some people may notice fat loss in certain areas
                before others, despite performing exercises that target different muscle groups.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Crash Diets</h3>
              <p>
                Extreme calorie restriction can lead to muscle loss, metabolic adaptation, and
                eventual weight regain. Our calculators promote sustainable approaches that preserve
                muscle mass and metabolic health.
              </p>
              <p className="mt-2">
                Studies have consistently shown that rapid weight loss through severe caloric
                restriction often results in a higher percentage of lean muscle loss compared to
                more moderate approaches. Additionally, the body responds to extreme restriction by
                lowering basal metabolic rate—a protective mechanism that makes maintaining weight
                loss even more challenging once normal eating patterns resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="neumorph p-6">
          <h2 className="text-2xl font-bold mb-4">The Science Behind Our Calculators</h2>
          <p className="mb-3">
            At HealthCheck, we believe in evidence-based approaches to health and fitness. Our
            calculators incorporate peer-reviewed scientific research and validated formulas to
            provide you with accurate information about your body composition and energy needs.
          </p>
          <p className="mb-3">
            For example, our Body Fat Calculator uses multiple methods including the Navy formula,
            which has been validated against gold standard DEXA scans. Our TDEE Calculator considers
            not only your basic metrics but also factors in the Thermic Effect of Food (TEF) and
            Non-Exercise Activity Thermogenesis (NEAT) for more precise estimations.
          </p>
          <p>
            We regularly review emerging research in nutrition and exercise science to ensure our
            calculators reflect the most current understanding of human physiology. While these
            tools provide excellent estimates, remember that individual variations exist, and
            results should be used as guidance rather than absolute values.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="neumorph p-6">
          <h2 className="text-2xl font-bold mb-4">Understanding Weight Management</h2>
          <p className="mb-3">
            Sustainable weight management goes beyond simple calorie counting. It involves
            understanding your body's unique needs, setting realistic goals, and developing
            consistent habits that support your long-term health.
          </p>
          <p className="mb-3">
            Protein intake plays a crucial role in preserving lean muscle mass during weight loss.
            Research suggests that consuming between 1.6-2.2g of protein per kilogram of body weight
            helps maintain muscle while in a calorie deficit. Our calculators factor this research
            into their recommendations.
          </p>
          <p className="mb-3">
            Adequate hydration is another often overlooked aspect of weight management. Proper fluid
            intake supports metabolic processes, helps regulate hunger signals, and enhances
            physical performance. A general guideline is to consume 30-40ml of water per kilogram of
            body weight daily, adjusted for activity level and climate.
          </p>
          <p>
            Remember that weight fluctuations due to water retention, hormonal changes, and glycogen
            storage are normal and don't necessarily reflect changes in body fat. Focus on
            longer-term trends rather than daily fluctuations for a more accurate picture of your
            progress.
          </p>
        </div>
      </section>
    </div>
  );
}
