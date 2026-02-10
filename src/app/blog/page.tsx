import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogIndexClient from '@/components/BlogIndexClient';

export const metadata: Metadata = {
  title: 'Health & Fitness Blog | HealthCheck',
  description:
    'Explore articles on weight management, body composition, nutrition, and fitness to help you make informed decisions about your health.',
  keywords:
    'health blog, fitness blog, weight loss articles, body fat, nutrition, TDEE, calorie deficit, body composition',
};

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Best Smart Scales for Body Composition Tracking in 2026',
    description:
      'Compare top smart scales for tracking body fat, muscle mass, BMI, and more. See which scale fits your goals.',
    slug: 'best-smart-scales-body-composition',
    date: 'February 2, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-smart-scales-body-composition.jpg',
  },
  {
    title: 'Best Fitness Trackers for Calorie Tracking in 2026',
    description:
      'Find the best fitness trackers for accurate calorie burn estimates, heart rate monitoring, and activity tracking.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'February 2, 2026',
    readTime: '15 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-trackers-calorie-tracking.jpg',
  },
  {
    title: 'Best Kitchen Scales for Portion Control and Calorie Tracking in 2026',
    description:
      'Compare top food scales for accurate portion control and calorie counting to stay on track with your macros.',
    slug: 'best-kitchen-scales-portion-control',
    date: 'February 2, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-kitchen-scales-portion-control.jpg',
  },
  {
    title: 'Best Fitness Apps for Tracking Macros and Calories in 2026',
    description:
      'Compare the top calorie and macro tracking apps to find the right fit for consistent logging.',
    slug: 'best-fitness-apps-macro-tracking',
    date: 'February 2, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-apps-macro-tracking.jpg',
  },
  {
    title: 'Best Meal Delivery Services for Weight Loss in 2026',
    description:
      'Compare meal delivery services built for calorie control, portion consistency, and weight loss goals.',
    slug: 'meal-delivery-services-weight-loss',
    date: 'February 2, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/meal-delivery-services-weight-loss.jpg',
  },
  {
    title: 'Best Supplements for Your Fitness Goals in 2026',
    description:
      'From protein powder to creatine, discover the best supplements to support muscle growth, recovery, and overall fitness performance.',
    slug: 'best-supplements-fitness-goals',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-supplements-fitness-goals.jpg',
  },
  {
    title: 'Best Home Gym Equipment for Beginners in 2026',
    description:
      'Build an effective home gym on any budget with these beginner-friendly picks for resistance bands, dumbbells, mats, and more.',
    slug: 'best-home-gym-equipment-beginners',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-home-gym-equipment-beginners.jpg',
  },
  {
    title: 'Best Treadmills for Home Weight Loss in 2026',
    description:
      'Compare the best home treadmills for weight loss. Reviews of NordicTrack Commercial 1750, Sole F80, ProForm Pro 2000, Horizon 7.0 AT, and budget options.',
    slug: 'best-treadmills-home-weight-loss',
    date: 'February 8, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-treadmills-home-weight-loss.jpg',
  },
  {
    title: 'Best Running Shoes for Weight Loss in 2026',
    description:
      'Compare the best running shoes for weight loss and beginners. Reviews of Brooks Ghost 16, HOKA Clifton 9, Nike Pegasus 41, and more.',
    slug: 'best-running-shoes-weight-loss',
    date: 'February 8, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-running-shoes-weight-loss.jpg',
  },
  {
    title: 'Best Resistance Bands for Strength Training in 2026',
    description:
      'Compare the best resistance bands for home workouts and strength training. Reviews of Fit Simplify, WHATAFIT, Undersun, and more.',
    slug: 'best-resistance-bands-strength-training',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-resistance-bands-strength-training.jpg',
  },
  {
    title: 'Best Body Tape Measures for Tracking Composition in 2026',
    description:
      'Compare the best body tape measures for tracking waist, hip, and body composition changes. Reviews of MyoTape, RENPHO, and more.',
    slug: 'best-body-tape-measures-composition',
    date: 'February 8, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-body-tape-measures-composition.jpg',
  },
  {
    title: 'Best Protein Bars for On-the-Go Nutrition in 2026',
    description:
      'Compare the best protein bars for weight loss, muscle building, and on-the-go nutrition. Reviews of Quest, Barebells, RXBAR, and more.',
    slug: 'best-protein-bars-on-the-go',
    date: 'February 8, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-protein-bars-on-the-go.jpg',
  },
  {
    title: 'Best Foam Rollers and Recovery Tools in 2026',
    description:
      'Compare the best foam rollers and recovery tools for muscle soreness and workout recovery. Reviews of TriggerPoint GRID, LuxFit, TheraGun Mini, and more.',
    slug: 'best-foam-rollers-recovery',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-foam-rollers-recovery.jpg',
  },
  {
    title: 'Best Yoga Mats for Home Workouts in 2026',
    description:
      'Compare the best yoga mats for home workouts, from premium Manduka PRO to budget BalanceFrom. Reviews with real pros and cons.',
    slug: 'best-yoga-mats-home-workouts',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-yoga-mats-home-workouts.jpg',
  },
  {
    title: 'Best Jump Ropes for Cardio and Weight Loss in 2026',
    description:
      'Compare the best jump ropes for cardio, weight loss, and HIIT workouts. Reviews of Crossrope, WOD Nation, Rogue, and more.',
    slug: 'best-jump-ropes-cardio-weight-loss',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-jump-ropes-cardio-weight-loss.jpg',
  },
  {
    title: 'Best Water Bottles for Hydration Tracking in 2026',
    description:
      'Compare the best water bottles for tracking daily water intake. Reviews of HidrateSpark, Nalgene, Hydro Flask, and more.',
    slug: 'best-water-bottles-hydration-tracking',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-water-bottles-hydration-tracking.jpg',
  },
  {
    title: 'Best Kettlebells for Full-Body Workouts in 2026',
    description:
      'Compare the best kettlebells for home workouts and strength training. Reviews of Kettlebell Kings, CAP Barbell, Rogue, and more.',
    slug: 'best-kettlebells-full-body-workouts',
    date: 'February 8, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-kettlebells-full-body-workouts.jpg',
  },
  {
    title: 'Best Pull-Up Bars for Home Fitness in 2026',
    description:
      'Compare the best pull-up bars for home workouts. Reviews of doorway, wall-mount, and freestanding options.',
    slug: 'best-pull-up-bars-home-fitness',
    date: 'February 8, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-pull-up-bars-home-fitness.jpg',
  },
  {
    title: 'Best Heart Rate Monitors for Training in 2026',
    description:
      'Compare the best heart rate monitors and chest straps for accurate training data. Reviews of Polar H10, Garmin HRM-Pro, and more.',
    slug: 'best-heart-rate-monitors-training',
    date: 'February 8, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-heart-rate-monitors-training.jpg',
  },
  {
    title: 'Best Workout Headphones for the Gym in 2026',
    description:
      'Compare the best workout headphones and earbuds for the gym, running, and HIIT. Reviews of Beats Fit Pro, Jabra Elite 8, Shokz OpenRun, and more.',
    slug: 'best-workout-headphones-gym',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-workout-headphones-gym.jpg',
  },
  {
    title: 'Best Adjustable Dumbbells for Your Home Gym in 2026',
    description:
      'Compare the best adjustable dumbbells for home workouts. Reviews of Bowflex SelectTech 552, PowerBlock Elite EXP, NordicTrack, Flybird, and Amazon Basics with real pros and cons.',
    slug: 'best-adjustable-dumbbells-home-gym',
    date: 'February 8, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-adjustable-dumbbells-home-gym.jpg',
  },
  {
    title: 'Best Blender Bottles and Shaker Cups in 2026',
    description:
      'Compare the best blender bottles and shaker cups for protein shakes. Reviews of BlenderBottle Classic, BlenderBottle Pro, Helimix, Ice Shaker, and SHAKESPHERE.',
    slug: 'best-blender-bottles-protein-shakes',
    date: 'February 8, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-blender-bottles-protein-shakes.jpg',
  },
  {
    title: 'Best Pre-Workout Supplements for Energy in 2026',
    description:
      'Compare the best pre-workout supplements for energy and performance. Reviews of C4 Original, Optimum Nutrition, Legion Pulse, Transparent Labs, and Ghost Legend.',
    slug: 'best-pre-workout-supplements-energy',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-pre-workout-supplements-energy.jpg',
  },
  {
    title: 'Best Rowing Machines for Full-Body Workouts in 2026',
    description:
      'Compare the best rowing machines for home cardio and strength training. Reviews of Concept2 Model D, Hydrow, Sunny Health, and more with honest pros and cons.',
    slug: 'best-rowing-machines-full-body',
    date: 'February 8, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-rowing-machines-full-body.jpg',
  },
  {
    title: 'Best Exercise Bikes for Weight Loss in 2026',
    description:
      'Compare the best exercise bikes for home weight loss. Reviews of Schwinn IC4, Sunny Health, Bowflex VeloCore, and more.',
    slug: 'best-exercise-bikes-weight-loss',
    date: 'February 8, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-exercise-bikes-weight-loss.jpg',
  },
  {
    title: 'Best Weight Benches for Home Gym in 2026',
    description:
      'Compare the best weight benches for home workouts. Reviews of REP AB-3000, Bowflex 5.1S, Fitness Reality, and more.',
    slug: 'best-weight-benches-home-gym',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-weight-benches-home-gym.jpg',
  },
  {
    title: 'Best Creatine Supplements for Muscle Gain in 2026',
    description:
      'Compare the best creatine supplements for muscle gain and performance. Reviews of Optimum Nutrition, Thorne, BulkSupplements, and more.',
    slug: 'best-creatine-supplements-muscle-gain',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-creatine-supplements-muscle-gain.jpg',
  },
  {
    title: 'Best Massage Guns for Muscle Recovery in 2026',
    description:
      'Compare the best percussion massage guns for post-workout recovery. Reviews of Theragun Elite, Hypervolt 2, RENPHO R3, and more.',
    slug: 'best-massage-guns-recovery',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-massage-guns-recovery.jpg',
  },
  {
    title: 'Best Meal Prep Containers for Weight Loss in 2026',
    description:
      'Compare the best meal prep containers for portion control and weight loss. Reviews of Prep Naturals, Freshware, Fitpacker, and more.',
    slug: 'best-meal-prep-containers-weight-loss',
    date: 'February 8, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-meal-prep-containers-weight-loss.jpg',
  },
  {
    title: 'Best Workout Gloves for Weightlifting in 2026',
    description:
      'Compare the best workout gloves for weightlifting and CrossFit. Reviews of Harbinger Pro, Fit Active Sports, RIMSports, and more.',
    slug: 'best-workout-gloves-weightlifting',
    date: 'February 8, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-workout-gloves-weightlifting.jpg',
  },
  {
    title: 'Best Ab Rollers for Core Training in 2026',
    description:
      'Compare the top ab rollers and ab wheels for building core strength. Reviews of Perfect Fitness Ab Carver Pro, Vinsguir, and more.',
    slug: 'best-ab-rollers-core-training',
    date: 'February 8, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-ab-rollers-core-training.jpg',
  },
  {
    title: 'Best Gym Bags for Workout Gear in 2026',
    description:
      'Compare the best gym bags and duffel bags for workout gear. Reviews of Adidas Defender, Under Armour Undeniable, Nike Brasilia, and more.',
    slug: 'best-gym-bags-workout-gear',
    date: 'February 8, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-gym-bags-workout-gear.jpg',
  },
  {
    title: 'Best Compression Gear for Recovery in 2026',
    description:
      'Compare the best compression clothing for workout recovery and performance. Reviews of 2XU, CEP, Under Armour HeatGear, and more.',
    slug: 'best-compression-gear-recovery',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-compression-gear-recovery.jpg',
  },
  {
    title: 'Best Barbell Weight Sets for Home Gym in 2026',
    description:
      'Compare the best barbell and weight plate sets for home gyms. Reviews of CAP 300lb set, REP Iron Plates, and more.',
    slug: 'best-barbell-weight-sets-home-gym',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-barbell-weight-sets-home-gym.jpg',
  },
  {
    title: 'Best Fitness Trackers for Kids in 2026',
    description:
      'Compare the best fitness trackers and smartwatches for kids. Reviews of Fitbit Ace 3, Garmin Vivofit Jr 3, BIGGERFIVE, and more.',
    slug: 'best-fitness-trackers-kids',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-trackers-kids.jpg',
  },
  {
    title: 'Best Sleep Trackers for Recovery in 2026',
    description:
      'Compare the best sleep trackers for workout recovery and health. Reviews of Oura Ring, Whoop 4.0, Fitbit Sense 2, and more.',
    slug: 'best-sleep-trackers-recovery',
    date: 'February 8, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-sleep-trackers-recovery.jpg',
  },
  {
    title: 'How to Measure Body Fat at Home: Methods, Accuracy, and What Works',
    description:
      'Learn how to measure body fat at home with the Navy method, calipers, smart scales, and more. Honest accuracy comparisons.',
    slug: 'how-to-measure-body-fat-at-home',
    date: 'February 8, 2026',
    readTime: '15 min read',
    category: 'Health & Science',
    image: '/images/blog/how-to-measure-body-fat-at-home.jpg',
    featured: true,
  },
  {
    title: 'Heart Rate Zones Explained: A Guide to Training Smarter',
    description:
      'Understand heart rate training zones, Zone 2 cardio, the Karvonen method, and when to push harder for better results.',
    slug: 'heart-rate-zones-explained-training',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Training',
    image: '/images/blog/heart-rate-zones-explained-training.jpg',
    featured: true,
  },
  {
    title: 'Counting Calories vs Tracking Macros: Which Approach Fits You?',
    description:
      'Compare calorie counting vs macro tracking to find which approach works best for your personality and goals.',
    slug: 'counting-calories-vs-tracking-macros',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Nutrition',
    image: '/images/blog/counting-calories-vs-tracking-macros.jpg',
    featured: true,
  },
  {
    title: 'How Fast Can You Build Muscle? Natural Expectations and Reality',
    description:
      'Realistic muscle building timelines based on research. Progressive overload, nutrition, and what to expect in your first year.',
    slug: 'how-fast-can-you-build-muscle',
    date: 'February 8, 2026',
    readTime: '13 min read',
    category: 'Training',
    image: '/images/blog/how-fast-can-you-build-muscle.jpg',
  },
  {
    title: 'Treadmill vs Exercise Bike: Which Burns More Calories?',
    description:
      'Compare treadmills and exercise bikes for calorie burn, joint impact, and weight loss effectiveness with real data.',
    slug: 'treadmill-vs-exercise-bike-calories',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Comparisons',
    image: '/images/blog/treadmill-vs-exercise-bike-calories.jpg',
  },
  {
    title: 'Adjustable Dumbbells vs Barbell for Home Gym: Which Should You Buy First?',
    description:
      'Compare adjustable dumbbells and barbells for home gym setups. Space, cost, exercise versatility, and recommendations.',
    slug: 'adjustable-dumbbells-vs-barbell-home-gym',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Comparisons',
    image: '/images/blog/adjustable-dumbbells-vs-barbell-home-gym.jpg',
  },
  {
    title: 'Smart Scale vs Body Fat Calipers: Which Is More Accurate?',
    description:
      'Compare smart scales and body fat calipers for accuracy, consistency, and practical body composition tracking.',
    slug: 'smart-scale-vs-body-fat-calipers',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Comparisons',
    image: '/images/blog/smart-scale-vs-body-fat-calipers.jpg',
  },
  {
    title: 'Cardio vs Weights for Fat Loss: What Science Actually Says',
    description:
      'The truth about cardio versus resistance training for fat loss. Learn what research shows about EPOC, muscle mass, and metabolism - plus practical training splits that work.',
    slug: 'cardio-vs-weights-fat-loss',
    date: 'February 8, 2026',
    readTime: '13 min read',
    category: 'Training',
    image: '/images/blog/cardio-vs-weights-fat-loss.jpg',
  },
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    readTime: '8 min read',
    category: 'Weight Management',
    image: '/images/blog/calorie-deficit-myths.jpg',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Energy Expenditure',
    image: '/images/blog/tdee-explained.jpg',
  },
  {
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Measurement Methods',
    image: '/images/blog/measuring-body-fat.jpg',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl md:text-4xl font-bold">Health & Fitness Blog</h1>
        <a
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          title="Subscribe via RSS"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M3.429 16.571a3.429 3.429 0 1 1 0 6.858 3.429 3.429 0 0 1 0-6.858zM0 23.429h3.429C3.429 14.929 9.071 9.286 17.571 9.286V5.857C7.143 5.857 0 13 0 23.429zM0 23.429h3.429c0-5.714 4.571-10.286 10.285-10.286V9.714C6.857 9.714 0 16.571 0 23.429z" />
          </svg>
          RSS Feed
        </a>
      </div>
      <p className="text-gray-600 mb-8">
        Explore evidence-based articles on weight management, body composition, nutrition, and
        fitness to help you make informed decisions about your health.
      </p>
      <BlogIndexClient posts={blogPosts} />

      <div className="mt-12 neumorph p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Looking for Our Calculators?</h2>
        <p className="mb-4">
          Our health and fitness calculators can help you track and plan your fitness journey with
          precision.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/body-fat"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600">
              Calculate your body fat percentage using various methods
            </p>
          </Link>
          <Link
            href="/body-fat-burn"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">Body Fat Burn Calculator</h3>
            <p className="text-sm text-gray-600">
              Calculate calories burned during activities and weight loss timeline
            </p>
          </Link>
          <Link
            href="/tdee"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">TDEE Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your Total Daily Energy Expenditure</p>
          </Link>
          <Link
            href="/calorie-deficit"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">Calorie Deficit Calculator</h3>
            <p className="text-sm text-gray-600">Discover how long to reach your goal weight</p>
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/" className="text-accent hover:underline">
            View all calculators →
          </Link>
        </div>
      </div>
    </div>
  );
}
