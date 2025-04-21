import type { Metadata } from 'next';
import { getPublicSiteUrl } from '@/lib/site';

/**
 * Single source of truth for every blog post.
 *
 * Merges data that was previously spread across:
 *   - src/lib/blog/posts.ts          (display metadata)
 *   - src/constants/blogMetadata.ts   (SEO metadata / keywords)
 *   - page.client.tsx                 (AFFILIATE_BLOG_SLUGS set)
 */

export interface BlogPostEntry {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  affiliate?: boolean;
  /** SEO keywords (comma-separated). */
  keywords: string;
  /**
   * When the SEO &lt;title&gt; tag should differ from the display title,
   * set this field. `generateBlogMetadata` will prefer it over `title`.
   */
  seoTitle?: string;
}

/** Backward-compatible type alias. */
export type BlogPost = BlogPostEntry;

// ── Registry ───────────────────────────────────────────────────────

export const BLOG_REGISTRY: BlogPostEntry[] = [
  // Educational / foundational posts (earliest dates)
  {
    title: "Understanding Body Fat Percentage: What's Healthy and Why It Matters",
    description:
      'Understand healthy body fat ranges, how body fat is measured, and what the numbers mean for your overall health.',
    slug: 'understanding-body-fat-percentage',
    date: 'January 3, 2026',
    readTime: '11 min read',
    category: 'Health & Science',
    image: '/images/blog/understanding-body-fat-percentage.jpg',
    featured: true,
    keywords:
      'body fat percentage, healthy body fat, body composition, body fat ranges, how to measure body fat',
    seoTitle: "Understanding Body Fat Percentage: What's Healthy and Why It Matters | HealthCheck",
  },
  {
    title: 'Understanding ABSI: Beyond BMI for Health Risk Assessment',
    description: 'Learn how ABSI works, why it beats BMI for risk, and how to use it.',
    slug: 'understanding-absi',
    date: 'January 4, 2026',
    readTime: '10 min read',
    category: 'Health & Science',
    image: '/images/blog/understanding-absi.jpg',
    keywords:
      'ABSI, A Body Shape Index, body shape, waist circumference, BMI limitations, health risk assessment, central obesity, mortality risk',
    seoTitle: 'Understanding ABSI: Beyond BMI for Health Risk Assessment | HealthCheck',
  },
  {
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'January 5, 2026',
    readTime: '12 min read',
    category: 'Measurement Methods',
    image: '/images/blog/measuring-body-fat.jpg',
    keywords:
      'body fat measurement, DEXA scan, skinfold calipers, Navy method, bioelectrical impedance, body fat percentage, hydrostatic weighing, accuracy, body composition',
    seoTitle: 'The Pros and Cons of Different Body Fat Measurement Methods | HealthCheck Blog',
  },
  {
    title: 'Waist-to-Hip Ratio: A Complete Guide to Understanding Your Body Shape',
    description:
      'Measure waist-to-hip ratio, interpret your body shape, and understand health risk.',
    slug: 'waist-to-hip-ratio-guide',
    date: 'January 6, 2026',
    readTime: '10 min read',
    category: 'Health & Science',
    image: '/images/blog/waist-to-hip-ratio-guide.jpg',
    keywords:
      'waist-to-hip ratio, WHR, apple shape, pear shape, body shape, central obesity, fat distribution, health risk assessment, waist circumference, hip circumference',
    seoTitle: 'Waist-to-Hip Ratio: A Complete Guide to Understanding Your Body Shape | HealthCheck',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'January 7, 2026',
    readTime: '10 min read',
    category: 'Energy Expenditure',
    image: '/images/blog/tdee-explained.jpg',
    featured: true,
    keywords:
      'TDEE, total daily energy expenditure, BMR, calorie needs, metabolism, weight management, energy balance, activity level, exercise, non-exercise activity thermogenesis',
    seoTitle: 'TDEE Explained: How Many Calories Do You Really Need? | HealthCheck Blog',
  },
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'January 9, 2026',
    readTime: '8 min read',
    category: 'Weight Management',
    image: '/images/blog/calorie-deficit-myths.jpg',
    featured: true,
    keywords:
      'calorie deficit myths, weight loss myths, 3500 calorie rule, starvation mode, metabolism myths, weight loss plateau, sustainable weight loss',
    seoTitle: '5 Myths About Calorie Deficits Debunked | HealthCheck Blog',
  },
  {
    title: 'How to Measure Body Fat at Home: Methods, Accuracy, and What Works',
    description:
      'Learn how to measure body fat at home with the Navy method, calipers, smart scales, and more. Honest accuracy comparisons.',
    slug: 'how-to-measure-body-fat-at-home',
    date: 'January 12, 2026',
    readTime: '15 min read',
    category: 'Health & Science',
    image: '/images/blog/how-to-measure-body-fat-at-home.jpg',
    keywords:
      'measure body fat at home, body fat percentage, Navy method, skinfold calipers, smart scale body fat, bioelectrical impedance, body composition, tape measure body fat, DEXA scan, hydrostatic weighing',
    seoTitle:
      'How to Measure Body Fat at Home: Methods, Accuracy, and What Actually Works | HealthCheck',
  },
  {
    title: 'Heart Rate Zones Explained: A Guide to Training Smarter',
    description:
      'Understand heart rate training zones, Zone 2 cardio, the Karvonen method, and when to push harder for better results.',
    slug: 'heart-rate-zones-explained-training',
    date: 'January 14, 2026',
    readTime: '12 min read',
    category: 'Training',
    image: '/images/blog/heart-rate-zones-explained-training.jpg',
    keywords:
      'heart rate zones, zone 2 training, max heart rate, Karvonen method, VO2 max, cardio training, heart rate training, target heart rate, exercise intensity, aerobic threshold',
    seoTitle: 'Heart Rate Zones Explained: How to Train Smarter | HealthCheck Blog',
  },
  {
    title: 'Counting Calories vs Tracking Macros: Which Approach Fits You?',
    description:
      'Compare calorie counting vs macro tracking to find which approach works best for your personality and goals.',
    slug: 'counting-calories-vs-tracking-macros',
    date: 'January 16, 2026',
    readTime: '11 min read',
    category: 'Nutrition',
    image: '/images/blog/counting-calories-vs-tracking-macros.jpg',
    keywords:
      'calorie counting, macro tracking, macros vs calories, IIFYM, flexible dieting, nutrition tracking, weight loss, body composition',
    seoTitle: 'Calorie Counting vs Tracking Macros: Which One Actually Works? | HealthCheck',
  },
  {
    title: 'How Fast Can You Build Muscle? Natural Expectations and Reality',
    description:
      'Realistic muscle building timelines based on research. Progressive overload, nutrition, and what to expect in your first year.',
    slug: 'how-fast-can-you-build-muscle',
    date: 'January 19, 2026',
    readTime: '13 min read',
    category: 'Training',
    image: '/images/blog/how-fast-can-you-build-muscle.jpg',
    keywords:
      'muscle building, muscle gain rate, Alan Aragon model, newbie gains, progressive overload, muscle growth timeline, hypertrophy, natural muscle building',
    seoTitle: 'How Fast Can You Build Muscle? Realistic Expectations | HealthCheck Blog',
  },
  {
    title: 'Cardio vs Weights for Fat Loss: What Science Actually Says',
    description:
      'The truth about cardio versus resistance training for fat loss. Learn what research shows about EPOC, muscle mass, and metabolism - plus practical training splits that work.',
    slug: 'cardio-vs-weights-fat-loss',
    date: 'January 21, 2026',
    readTime: '13 min read',
    category: 'Training',
    image: '/images/blog/cardio-vs-weights-fat-loss.jpg',
    keywords:
      'cardio vs weights, fat loss, resistance training, EPOC, muscle mass, metabolism, training split, body composition',
    seoTitle: 'Cardio vs Weights for Fat Loss: What Science Actually Says | HealthCheck',
  },
  // Comparison posts
  {
    title: 'Treadmill vs Exercise Bike: Which Burns More Calories?',
    description:
      'Compare treadmills and exercise bikes for calorie burn, joint impact, and weight loss effectiveness with real data.',
    slug: 'treadmill-vs-exercise-bike-calories',
    date: 'January 23, 2026',
    readTime: '11 min read',
    category: 'Comparisons',
    image: '/images/blog/treadmill-vs-exercise-bike-calories.jpg',
    keywords:
      'treadmill vs exercise bike, calories burned treadmill, calories burned bike, best cardio for weight loss, treadmill vs bike for fat loss, low impact cardio',
    seoTitle: 'Treadmill vs Exercise Bike: Which Burns More Calories? | HealthCheck Blog',
  },
  {
    title: 'Adjustable Dumbbells vs Barbell for Home Gym: Which Should You Buy First?',
    description:
      'Compare adjustable dumbbells and barbells for home gym setups. Space, cost, exercise versatility, and recommendations.',
    slug: 'adjustable-dumbbells-vs-barbell-home-gym',
    date: 'January 25, 2026',
    readTime: '12 min read',
    category: 'Comparisons',
    image: '/images/blog/adjustable-dumbbells-vs-barbell-home-gym.jpg',
    affiliate: true,
    keywords:
      'adjustable dumbbells vs barbell, home gym equipment, dumbbells or barbell first, home gym on a budget, Bowflex SelectTech 552, PowerBlock Elite, CAP Barbell Olympic set, REP Fitness plates, strength training equipment',
    seoTitle:
      'Adjustable Dumbbells vs Barbell for Home Gym: Which Should You Buy First? | HealthCheck Blog',
  },
  {
    title: 'Smart Scale vs Body Fat Calipers: Which Is More Accurate?',
    description:
      'Compare smart scales and body fat calipers for accuracy, consistency, and practical body composition tracking.',
    slug: 'smart-scale-vs-body-fat-calipers',
    date: 'January 27, 2026',
    readTime: '11 min read',
    category: 'Comparisons',
    image: '/images/blog/smart-scale-vs-body-fat-calipers.jpg',
    affiliate: true,
    keywords:
      'smart scale vs calipers, body fat measurement, BIA accuracy, skinfold calipers, body composition, body fat percentage, Withings scale, RENPHO scale, Accu-Measure caliper',
    seoTitle: 'Smart Scale vs Body Fat Calipers: Which Is More Accurate? | HealthCheck Blog',
  },
  // Product reviews (spread across late January and February)
  {
    title: 'Best Smart Scales for Body Composition Tracking in 2026',
    description:
      'Compare top smart scales for tracking body fat, muscle mass, BMI, and more. See which scale fits your goals.',
    slug: 'best-smart-scales-body-composition',
    date: 'January 29, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-smart-scales-body-composition.jpg',
    affiliate: true,
    keywords:
      'smart scale, body composition scale, body fat scale, Withings Body Smart, RENPHO scale, Eufy scale, best smart scale 2026, BMI scale, weight tracking',
    seoTitle: 'Best Smart Scales for Body Composition Tracking in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Fitness Trackers for Calorie Tracking in 2026',
    description:
      'Find the best fitness trackers for accurate calorie burn estimates, heart rate monitoring, and activity tracking.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'January 30, 2026',
    readTime: '15 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-trackers-calorie-tracking.jpg',
    affiliate: true,
    keywords:
      'fitness tracker, calorie tracker, Fitbit Charge 6, Garmin Venu, Apple Watch, Samsung Galaxy Watch, best fitness watch 2026, calorie burn tracking, TDEE tracking',
    seoTitle: 'Best Fitness Trackers for Calorie Tracking in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Kitchen Scales for Portion Control and Calorie Tracking in 2026',
    description:
      'Compare top food scales for accurate portion control and calorie counting to stay on track with your macros.',
    slug: 'best-kitchen-scales-portion-control',
    date: 'January 31, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-kitchen-scales-portion-control.jpg',
    affiliate: true,
    keywords:
      'kitchen scale, food scale, portion control scale, calorie counting scale, best food scale 2026, digital kitchen scale, nutrition scale, meal prep scale',
    seoTitle:
      'Best Kitchen Scales for Portion Control and Calorie Tracking in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Fitness Apps for Tracking Macros and Calories in 2026',
    description:
      'Compare the top calorie and macro tracking apps to find the right fit for consistent logging.',
    slug: 'best-fitness-apps-macro-tracking',
    date: 'February 1, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-apps-macro-tracking.jpg',
    keywords:
      'calorie tracking app, macro tracking app, MyFitnessPal, Cronometer, MacroFactor, Lose It, best diet app 2026, food logging app, nutrition tracker',
    seoTitle: 'Best Fitness Apps for Tracking Macros and Calories in 2026 | HealthCheck Blog',
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
    keywords:
      'meal delivery weight loss, Factor meals, HelloFresh calorie smart, Trifecta nutrition, best diet meal delivery 2026, calorie controlled meals, macro friendly meals',
    seoTitle: 'Best Meal Delivery Services for Weight Loss in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Supplements for Your Fitness Goals in 2026',
    description:
      'From protein powder to creatine, discover the best supplements to support muscle growth, recovery, and overall fitness performance.',
    slug: 'best-supplements-fitness-goals',
    date: 'February 2, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-supplements-fitness-goals.jpg',
    affiliate: true,
    keywords:
      'best supplements 2026, whey protein, creatine monohydrate, multivitamin, omega-3, pre-workout, Optimum Nutrition Gold Standard, Thorne creatine, fitness supplements, muscle building supplements',
    seoTitle: 'Best Supplements for Your Fitness Goals in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Home Gym Equipment for Beginners in 2026',
    description:
      'Build an effective home gym on any budget with these beginner-friendly picks for resistance bands, dumbbells, mats, and more.',
    slug: 'best-home-gym-equipment-beginners',
    date: 'February 3, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-home-gym-equipment-beginners.jpg',
    affiliate: true,
    keywords:
      'home gym equipment, beginner home gym, resistance bands, yoga mat, adjustable dumbbells, pull-up bar, kettlebell, jump rope, best home gym 2026, budget home gym',
    seoTitle: 'Best Home Gym Equipment for Beginners in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Treadmills for Home Weight Loss in 2026',
    description:
      'Compare the best home treadmills for weight loss. Reviews of NordicTrack Commercial 1750, Sole F80, ProForm Pro 2000, Horizon 7.0 AT, and budget options.',
    slug: 'best-treadmills-home-weight-loss',
    date: 'February 4, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-treadmills-home-weight-loss.jpg',
    affiliate: true,
    keywords:
      'best treadmills 2026, home treadmills weight loss, NordicTrack Commercial 1750, Sole F80, ProForm Pro 2000, Horizon 7.0 AT, budget treadmills',
    seoTitle: 'Best Treadmills for Home Weight Loss in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Running Shoes for Weight Loss in 2026',
    description:
      'Compare the best running shoes for weight loss and beginners. Reviews of Brooks Ghost 16, HOKA Clifton 9, Nike Pegasus 41, and more.',
    slug: 'best-running-shoes-weight-loss',
    date: 'February 4, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-running-shoes-weight-loss.jpg',
    affiliate: true,
    keywords:
      'best running shoes weight loss 2026, Brooks Ghost 16, HOKA Clifton 9, Nike Pegasus 41, ASICS Gel-Kayano 31, New Balance 1080v13, running shoes for beginners',
    seoTitle: 'Best Running Shoes for Weight Loss in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Resistance Bands for Strength Training in 2026',
    description:
      'Compare the best resistance bands for home workouts and strength training. Reviews of Fit Simplify, WHATAFIT, Undersun, and more.',
    slug: 'best-resistance-bands-strength-training',
    date: 'February 5, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-resistance-bands-strength-training.jpg',
    affiliate: true,
    keywords:
      'best resistance bands 2026, resistance bands for strength training, loop bands, tube bands, exercise bands, home workout bands, Fit Simplify, WHATAFIT, Undersun',
    seoTitle: 'Best Resistance Bands for Strength Training in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Body Tape Measures for Tracking Composition in 2026',
    description:
      'Compare the best body tape measures for tracking waist, hip, and body composition changes. Reviews of MyoTape, RENPHO, and more.',
    slug: 'best-body-tape-measures-composition',
    date: 'February 5, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-body-tape-measures-composition.jpg',
    affiliate: true,
    keywords:
      'best body tape measure 2026, body measuring tape, waist measurement tape, RENPHO smart tape measure, MyoTape, body composition tracking, WHR measurement, waist-to-hip ratio',
    seoTitle: 'Best Body Tape Measures for Tracking Body Composition in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Protein Bars for On-the-Go Nutrition in 2026',
    description:
      'Compare the best protein bars for weight loss, muscle building, and on-the-go nutrition. Reviews of Quest, Barebells, RXBAR, and more.',
    slug: 'best-protein-bars-on-the-go',
    date: 'February 6, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-protein-bars-on-the-go.jpg',
    affiliate: true,
    keywords:
      'best protein bars 2026, high protein bars, Quest protein bars, Barebells, RXBAR, ONE bar, low sugar protein bars, protein snacks, macro-friendly bars',
    seoTitle: 'Best Protein Bars for On-the-Go Nutrition in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Foam Rollers and Recovery Tools in 2026',
    description:
      'Compare the best foam rollers and recovery tools for muscle soreness and workout recovery. Reviews of TriggerPoint GRID, LuxFit, TheraGun Mini, and more.',
    slug: 'best-foam-rollers-recovery',
    date: 'February 6, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-foam-rollers-recovery.jpg',
    affiliate: true,
    keywords:
      'best foam roller 2026, TriggerPoint GRID, LuxFit foam roller, TheraGun Mini, recovery tools, muscle recovery, foam rolling, massage gun, Chirp Wheel',
    seoTitle: 'Best Foam Rollers and Recovery Tools in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Yoga Mats for Home Workouts in 2026',
    description:
      'Compare the best yoga mats for home workouts, from premium Manduka PRO to budget BalanceFrom. Reviews with real pros and cons.',
    slug: 'best-yoga-mats-home-workouts',
    date: 'February 7, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-yoga-mats-home-workouts.jpg',
    affiliate: true,
    keywords:
      'best yoga mats 2026, yoga mats for home workouts, Manduka PRO yoga mat, Liforme yoga mat, Gaiam yoga mat, Jade Harmony yoga mat, BalanceFrom GoYoga, thick yoga mat, non-slip yoga mat',
    seoTitle: 'Best Yoga Mats for Home Workouts in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Jump Ropes for Cardio and Weight Loss in 2026',
    description:
      'Compare the best jump ropes for cardio, weight loss, and HIIT workouts. Reviews of Crossrope, WOD Nation, Rogue, and more.',
    slug: 'best-jump-ropes-cardio-weight-loss',
    date: 'February 7, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-jump-ropes-cardio-weight-loss.jpg',
    affiliate: true,
    keywords:
      'best jump rope 2026, jump rope weight loss, Crossrope, WOD Nation, speed rope, weighted jump rope, cardio jump rope',
    seoTitle: 'Best Jump Ropes for Cardio and Weight Loss in 2026 | HealthCheck Blog',
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
    affiliate: true,
    keywords:
      'best water bottle 2026, hydration tracking, HidrateSpark, Nalgene, Hydro Flask, water intake, smart water bottle',
    seoTitle: 'Best Water Bottles for Hydration Tracking in 2026 | HealthCheck Blog',
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
    affiliate: true,
    keywords:
      'best kettlebell 2026, kettlebell workouts, Kettlebell Kings, CAP Barbell, Rogue kettlebell, cast iron kettlebell, home gym kettlebell',
    seoTitle: 'Best Kettlebells for Full-Body Workouts in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Pull-Up Bars for Home Fitness in 2026',
    description:
      'Compare the best pull-up bars for home workouts. Reviews of doorway, wall-mount, and freestanding options.',
    slug: 'best-pull-up-bars-home-fitness',
    date: 'February 9, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-pull-up-bars-home-fitness.jpg',
    affiliate: true,
    keywords:
      'best pull up bar 2026, doorway pull up bar, home pull up bar, wall mount pull up bar, power tower, home fitness equipment',
    seoTitle: 'Best Pull-Up Bars for Home Fitness in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Heart Rate Monitors for Training in 2026',
    description:
      'Compare the best heart rate monitors and chest straps for accurate training data. Reviews of Polar H10, Garmin HRM-Pro, and more.',
    slug: 'best-heart-rate-monitors-training',
    date: 'February 9, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-heart-rate-monitors-training.jpg',
    affiliate: true,
    keywords:
      'best heart rate monitor 2026, chest strap heart rate, Polar H10, Garmin HRM-Pro Plus, Wahoo TICKR X, heart rate training, HR monitor, heart rate chest strap, optical heart rate, armband HR monitor',
    seoTitle: 'Best Heart Rate Monitors for Training in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Workout Headphones for the Gym in 2026',
    description:
      'Compare the best workout headphones and earbuds for the gym, running, and HIIT. Reviews of Beats Fit Pro, Jabra Elite 8, Shokz OpenRun, and more.',
    slug: 'best-workout-headphones-gym',
    date: 'February 10, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-workout-headphones-gym.jpg',
    affiliate: true,
    keywords:
      'best workout headphones 2026, gym earbuds, Beats Fit Pro, Jabra Elite 8, Shokz OpenRun, sweatproof earbuds, running headphones',
    seoTitle: 'Best Workout Headphones for the Gym in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Adjustable Dumbbells for Your Home Gym in 2026',
    description:
      'Compare the best adjustable dumbbells for home workouts. Reviews of Bowflex SelectTech 552, PowerBlock Elite EXP, NordicTrack, Flybird, and Amazon Basics with real pros and cons.',
    slug: 'best-adjustable-dumbbells-home-gym',
    date: 'February 10, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-adjustable-dumbbells-home-gym.jpg',
    affiliate: true,
    keywords:
      'best adjustable dumbbells 2026, adjustable dumbbells home gym, Bowflex SelectTech 552, PowerBlock Elite EXP, NordicTrack Select-A-Weight, Flybird dumbbells, budget adjustable dumbbells, home gym dumbbells',
    seoTitle: 'Best Adjustable Dumbbells for Your Home Gym in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Blender Bottles and Shaker Cups in 2026',
    description:
      'Compare the best blender bottles and shaker cups for protein shakes. Reviews of BlenderBottle Classic, BlenderBottle Pro, Helimix, Ice Shaker, and SHAKESPHERE.',
    slug: 'best-blender-bottles-protein-shakes',
    date: 'February 11, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-blender-bottles-protein-shakes.jpg',
    affiliate: true,
    keywords:
      'best blender bottle 2026, protein shaker cup, BlenderBottle Classic, BlenderBottle Pro Series, Helimix Vortex, Ice Shaker, SHAKESPHERE Tumbler, shaker bottle, protein shake mixer',
    seoTitle: 'Best Blender Bottles and Shaker Cups in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Pre-Workout Supplements for Energy in 2026',
    description:
      'Compare the best pre-workout supplements for energy and performance. Reviews of C4 Original, Optimum Nutrition, Legion Pulse, Transparent Labs, and Ghost Legend.',
    slug: 'best-pre-workout-supplements-energy',
    date: 'February 11, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-pre-workout-supplements-energy.jpg',
    affiliate: true,
    keywords:
      'best pre-workout supplements 2026, C4 pre-workout, Optimum Nutrition pre-workout, Legion Pulse, Transparent Labs BULK, Ghost Legend, caffeine pre-workout, natural pre-workout, energy supplements',
    seoTitle: 'Best Pre-Workout Supplements for Energy in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Rowing Machines for Full-Body Workouts in 2026',
    description:
      'Compare the best rowing machines for home cardio and strength training. Reviews of Concept2 Model D, Hydrow, Sunny Health, and more with honest pros and cons.',
    slug: 'best-rowing-machines-full-body',
    date: 'February 12, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-rowing-machines-full-body.jpg',
    affiliate: true,
    keywords:
      'best rowing machines 2026, rowing machine reviews, Concept2 Model D, home rowing machine, cardio equipment, full-body workout, indoor rowing, air rower, water rower',
    seoTitle: 'Best Rowing Machines for Full-Body Workouts in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Exercise Bikes for Weight Loss in 2026',
    description:
      'Compare the best exercise bikes for home weight loss. Reviews of Schwinn IC4, Sunny Health, Bowflex VeloCore, and more.',
    slug: 'best-exercise-bikes-weight-loss',
    date: 'February 12, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-exercise-bikes-weight-loss.jpg',
    affiliate: true,
    keywords:
      'exercise bike, weight loss, indoor cycling, Schwinn IC4, Sunny Health, Bowflex VeloCore, Exerpeutic folding bike, YOSUDA cycling bike, best exercise bike 2026, stationary bike weight loss',
    seoTitle: 'Best Exercise Bikes for Weight Loss in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Weight Benches for Home Gym in 2026',
    description:
      'Compare the best weight benches for home workouts. Reviews of REP AB-3000, Bowflex 5.1S, Fitness Reality, and more.',
    slug: 'best-weight-benches-home-gym',
    date: 'February 13, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-weight-benches-home-gym.jpg',
    affiliate: true,
    keywords:
      'best weight bench 2026, home gym bench, adjustable weight bench, REP Fitness AB-3000, Bowflex 5.1S, Fitness Reality 1000, FLYBIRD bench, Rogue Adjustable Bench, flat incline decline bench, home gym equipment',
    seoTitle: 'Best Weight Benches for Home Gym in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Creatine Supplements for Muscle Gain in 2026',
    description:
      'Compare the best creatine supplements for muscle gain and performance. Reviews of Optimum Nutrition, Thorne, BulkSupplements, and more.',
    slug: 'best-creatine-supplements-muscle-gain',
    date: 'February 13, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-creatine-supplements-muscle-gain.jpg',
    affiliate: true,
    keywords:
      'best creatine supplements 2026, creatine monohydrate, Optimum Nutrition creatine, BulkSupplements creatine, Thorne creatine, MuscleTech Cell-Tech, Transparent Labs Creatine HMB, creatine for muscle gain, creatine loading phase',
    seoTitle: 'Best Creatine Supplements for Muscle Gain in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Massage Guns for Muscle Recovery in 2026',
    description:
      'Compare the best percussion massage guns for post-workout recovery. Reviews of Theragun Elite, Hypervolt 2, RENPHO R3, and more.',
    slug: 'best-massage-guns-recovery',
    date: 'February 14, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-massage-guns-recovery.jpg',
    affiliate: true,
    keywords:
      'best massage gun 2026, Theragun Elite, Hypervolt 2, RENPHO R3, Ekrin B37, Bob and Brad Q2 Mini, percussion massager, muscle recovery, workout recovery, deep tissue massage',
    seoTitle: 'Best Massage Guns for Muscle Recovery in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Meal Prep Containers for Weight Loss in 2026',
    description:
      'Compare the best meal prep containers for portion control and weight loss. Reviews of Prep Naturals, Freshware, Fitpacker, and more.',
    slug: 'best-meal-prep-containers-weight-loss',
    date: 'February 14, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-meal-prep-containers-weight-loss.jpg',
    affiliate: true,
    keywords:
      'meal prep containers, portion control containers, weight loss meal prep, glass meal prep, leak-proof containers, food prep storage, macro containers 2026',
    seoTitle: 'Best Meal Prep Containers for Weight Loss in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Workout Gloves for Weightlifting in 2026',
    description:
      'Compare the best workout gloves for weightlifting and CrossFit. Reviews of Harbinger Pro, Fit Active Sports, RIMSports, and more.',
    slug: 'best-workout-gloves-weightlifting',
    date: 'February 15, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-workout-gloves-weightlifting.jpg',
    affiliate: true,
    keywords:
      'best workout gloves 2026, weightlifting gloves, gym gloves for men, gym gloves for women, grip gloves, CrossFit gloves, Harbinger, RIMSports, Fit Active Sports',
    seoTitle: 'Best Workout Gloves for Weightlifting in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Ab Rollers for Core Training in 2026',
    description:
      'Compare the top ab rollers and ab wheels for building core strength. Reviews of Perfect Fitness Ab Carver Pro, Vinsguir, and more.',
    slug: 'best-ab-rollers-core-training',
    date: 'February 15, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-ab-rollers-core-training.jpg',
    affiliate: true,
    keywords:
      'ab roller, ab wheel, core training, core strength, Perfect Fitness Ab Carver Pro, Vinsguir ab roller, FLYBIRD ab roller, best ab wheel 2026, core workout equipment',
    seoTitle: 'Best Ab Rollers for Core Training in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Gym Bags for Workout Gear in 2026',
    description:
      'Compare the best gym bags and duffel bags for workout gear. Reviews of Adidas Defender, Under Armour Undeniable, Nike Brasilia, and more.',
    slug: 'best-gym-bags-workout-gear',
    date: 'February 16, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-gym-bags-workout-gear.jpg',
    affiliate: true,
    keywords:
      'best gym bags 2026, gym duffel bag, workout bag, Adidas Defender, Under Armour Undeniable, Nike Brasilia, King Kong gym bag, Vooray Burner',
    seoTitle: 'Best Gym Bags for Workout Gear in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Compression Gear for Recovery in 2026',
    description:
      'Compare the best compression clothing for workout recovery and performance. Reviews of 2XU, CEP, Under Armour HeatGear, and more.',
    slug: 'best-compression-gear-recovery',
    date: 'February 16, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-compression-gear-recovery.jpg',
    affiliate: true,
    keywords:
      'best compression gear 2026, 2XU compression tights, CEP compression socks, Under Armour HeatGear, CW-X Stabilyx, compression leggings recovery',
    seoTitle: 'Best Compression Gear for Recovery in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Barbell Weight Sets for Home Gym in 2026',
    description:
      'Compare the best barbell and weight plate sets for home gyms. Reviews of CAP 300lb set, REP Iron Plates, and more.',
    slug: 'best-barbell-weight-sets-home-gym',
    date: 'February 16, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-barbell-weight-sets-home-gym.jpg',
    affiliate: true,
    keywords:
      'best barbell weight sets 2026, home gym barbell sets, CAP Barbell 300-lb set, REP Fitness iron plates, BalanceFrom cast iron, Rogue Echo bumper plates, Olympic barbell sets, home gym equipment',
    seoTitle: 'Best Barbell Weight Sets for Your Home Gym in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Fitness Trackers for Kids in 2026',
    description:
      'Compare the best fitness trackers and smartwatches for kids. Reviews of Fitbit Ace 3, Garmin Vivofit Jr 3, BIGGERFIVE, and more.',
    slug: 'best-fitness-trackers-kids',
    date: 'February 16, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-trackers-kids.jpg',
    affiliate: true,
    keywords:
      'fitness tracker for kids, kids smartwatch, Fitbit Ace 3, Garmin Vivofit Jr 3, BIGGERFIVE Vigor 2, Garmin Bounce, XPLORA X6 Play, best kids fitness watch 2026, children activity tracker',
    seoTitle: 'Best Fitness Trackers for Kids in 2026 | HealthCheck Blog',
  },
  {
    title: 'Best Sleep Trackers for Recovery in 2026',
    description:
      'Compare the best sleep trackers for workout recovery and health. Reviews of Oura Ring, Whoop 4.0, Fitbit Sense 2, and more.',
    slug: 'best-sleep-trackers-recovery',
    date: 'February 16, 2026',
    readTime: '13 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-sleep-trackers-recovery.jpg',
    affiliate: true,
    keywords:
      'best sleep tracker 2026, sleep tracking, Oura Ring Gen 3, Whoop 4.0, Fitbit Sense 2, Garmin Venu 3, Amazfit GTR 4, HRV tracking, sleep stages, recovery tracking, REM sleep, deep sleep',
    seoTitle: 'Best Sleep Trackers for Recovery in 2026 | HealthCheck Blog',
  },

  // ─── GLP-1 Niche Hub ──────────────────────────────────────────────
  {
    title: 'The Complete Guide to GLP-1 Medications for Weight Loss',
    description:
      'Everything you need to know about GLP-1 receptor agonists for weight loss, from clinical trial data to real-world expectations.',
    slug: 'complete-guide-glp1-weight-loss',
    date: 'February 16, 2026',
    readTime: '18 min read',
    category: 'Health & Science',
    image: '/images/blog/complete-guide-glp1-weight-loss.jpg',
    featured: true,
    keywords:
      'GLP-1 weight loss, semaglutide, tirzepatide, Ozempic, Wegovy, Mounjaro, GLP-1 receptor agonist, weight loss medication, obesity treatment',
    seoTitle: 'The Complete Guide to GLP-1 Medications for Weight Loss | HealthCheck',
  },
  {
    title: 'GLP-1 Side Effects: What to Expect and How to Manage Them',
    description:
      'A detailed look at GLP-1 medication side effects from clinical trials, with practical management strategies.',
    slug: 'glp1-side-effects-what-to-expect',
    date: 'February 16, 2026',
    readTime: '16 min read',
    category: 'Health & Science',
    image: '/images/blog/glp1-side-effects-what-to-expect.jpg',
    keywords:
      'GLP-1 side effects, Ozempic side effects, semaglutide nausea, Ozempic face, GLP-1 muscle loss, tirzepatide side effects, Wegovy side effects, Mounjaro side effects',
    seoTitle: 'GLP-1 Side Effects: What to Expect and How to Manage Them | HealthCheck',
  },
  {
    title: 'Ozempic vs Wegovy vs Mounjaro: A Head-to-Head Comparison',
    description:
      'Compare semaglutide and tirzepatide medications for weight loss with clinical trial data, cost analysis, and practical guidance.',
    slug: 'ozempic-vs-wegovy-vs-mounjaro-comparison',
    date: 'February 16, 2026',
    readTime: '20 min read',
    category: 'Comparisons',
    image: '/images/blog/ozempic-vs-wegovy-vs-mounjaro-comparison.jpg',
    keywords:
      'Ozempic vs Wegovy, Ozempic vs Mounjaro, semaglutide vs tirzepatide, weight loss medication comparison, GLP-1 comparison, Wegovy vs Mounjaro',
    seoTitle: 'Ozempic vs Wegovy vs Mounjaro: A Head-to-Head Comparison | HealthCheck',
  },

  // ─── ACFT Niche Hub ────────────────────────────────────────────────
  {
    title: 'The Complete Guide to the Army Combat Fitness Test (ACFT)',
    description:
      'Everything you need to know about the ACFT: all 6 events, scoring, form cues, and training strategies.',
    slug: 'complete-acft-guide',
    date: 'February 16, 2026',
    readTime: '22 min read',
    category: 'Training',
    image: '/images/blog/complete-acft-guide.jpg',
    featured: true,
    keywords:
      'ACFT guide, Army Combat Fitness Test, ACFT events, ACFT scoring, deadlift, standing power throw, hand release push-ups, sprint drag carry, leg tuck, two mile run',
    seoTitle: 'The Complete Guide to the Army Combat Fitness Test (ACFT) | HealthCheck',
  },
  {
    title: 'ACFT Training Plan: Event-by-Event Breakdown',
    description:
      'Targeted training programs for each ACFT event with periodization, workout programming, and progression strategies.',
    slug: 'acft-training-plan-event-breakdown',
    date: 'February 16, 2026',
    readTime: '18 min read',
    category: 'Training',
    image: '/images/blog/acft-training-plan-event-breakdown.jpg',
    keywords:
      'ACFT training plan, ACFT workout, ACFT deadlift training, sprint drag carry training, hand release push-ups, ACFT preparation, Army fitness training',
    seoTitle: 'ACFT Training Plan: Event-by-Event Breakdown | HealthCheck',
  },
  {
    title: 'ACFT Scoring Standards: What You Need to Know',
    description:
      'Complete ACFT scoring tables by gender and age group, promotion point implications, and test day strategy.',
    slug: 'acft-scoring-standards-what-you-need',
    date: 'February 16, 2026',
    readTime: '24 min read',
    category: 'Training',
    image: '/images/blog/acft-scoring-standards-what-you-need.jpg',
    keywords:
      'ACFT scoring, ACFT standards, ACFT score chart, ACFT age groups, ACFT promotion points, Army fitness standards, ACFT minimum score',
    seoTitle: 'ACFT Scoring Standards: What You Need to Know | HealthCheck',
  },

  // ─── Educational Deep Guides ───────────────────────────────────────
  {
    title: 'The Science of TDEE: Understanding Energy Expenditure',
    description:
      'A deep dive into Total Daily Energy Expenditure, from the four components of metabolism to practical methods for finding your number.',
    slug: 'science-of-tdee-energy-expenditure',
    date: 'February 16, 2026',
    readTime: '15 min read',
    category: 'Health & Science',
    image: '/images/blog/science-of-tdee-energy-expenditure.jpg',
    keywords:
      'TDEE science, energy expenditure, BMR, NEAT, thermic effect of food, exercise activity thermogenesis, Mifflin-St Jeor, metabolic adaptation',
    seoTitle: 'The Science of TDEE: Understanding Energy Expenditure | HealthCheck',
  },
  {
    title: 'Body Composition Beyond BMI: What Actually Matters',
    description:
      'Why BMI fails many people and which body composition metrics actually predict health outcomes.',
    slug: 'body-composition-beyond-bmi',
    date: 'February 16, 2026',
    readTime: '17 min read',
    category: 'Health & Science',
    image: '/images/blog/body-composition-beyond-bmi.jpg',
    keywords:
      'body composition, BMI limitations, waist-to-height ratio, ABSI, normal weight obesity, body fat percentage, WHR, DEXA scan, body composition analysis',
    seoTitle: 'Body Composition Beyond BMI: What Actually Matters | HealthCheck',
  },
  {
    title: 'Evidence-Based Weight Loss: What the Research Actually Shows',
    description:
      'A research-backed guide to sustainable weight loss covering energy balance, protein, exercise, and behavioral strategies.',
    slug: 'evidence-based-weight-loss-guide',
    date: 'February 16, 2026',
    readTime: '15 min read',
    category: 'Weight Management',
    image: '/images/blog/evidence-based-weight-loss-guide.jpg',
    keywords:
      'evidence-based weight loss, sustainable weight loss, energy balance, metabolic adaptation, protein for weight loss, National Weight Control Registry',
    seoTitle: 'Evidence-Based Weight Loss: What the Research Actually Shows | HealthCheck',
  },
  {
    title: 'The Complete Guide to Macronutrients',
    description:
      'Everything you need to know about protein, carbs, and fat from the research, with practical macro-setting frameworks.',
    slug: 'complete-guide-to-macronutrients',
    date: 'February 16, 2026',
    readTime: '15 min read',
    category: 'Nutrition',
    image: '/images/blog/complete-guide-to-macronutrients.jpg',
    keywords:
      'macronutrients, protein intake, carbohydrates, dietary fat, macro tracking, macro ratios, protein for muscle, carbs for performance, fat minimum intake',
    seoTitle: 'The Complete Guide to Macronutrients | HealthCheck',
  },
  {
    title: 'Heart Rate Training: The Science Behind the Zones',
    description:
      'The physiology of heart rate zones, why 220-minus-age is wrong, and how to use polarized training for better results.',
    slug: 'heart-rate-training-science',
    date: 'February 16, 2026',
    readTime: '16 min read',
    category: 'Training',
    image: '/images/blog/heart-rate-training-science.jpg',
    keywords:
      'heart rate training, heart rate zones, zone 2 training, polarized training, 220 minus age, Tanaka formula, HRV, VO2 max, aerobic threshold',
    seoTitle: 'Heart Rate Training: The Science Behind the Zones | HealthCheck',
  },
  {
    title: 'Sleep and Recovery: What the Science Says',
    description:
      'How sleep affects body composition, athletic performance, and health, with evidence-based strategies for better recovery.',
    slug: 'sleep-recovery-science',
    date: 'February 16, 2026',
    readTime: '15 min read',
    category: 'Health & Science',
    image: '/images/blog/sleep-recovery-science.jpg',
    keywords:
      'sleep and recovery, sleep for weight loss, sleep and muscle growth, sleep deprivation, sleep hygiene, circadian rhythm, melatonin, sleep stages',
    seoTitle: 'Sleep and Recovery: What the Science Says | HealthCheck',
  },
  {
    title: 'Hydration Science: How Much Water Do You Actually Need?',
    description:
      'The truth about hydration needs, debunking the 8-glasses myth, and practical strategies for staying properly hydrated.',
    slug: 'hydration-science-how-much-water',
    date: 'February 16, 2026',
    readTime: '13 min read',
    category: 'Health & Science',
    image: '/images/blog/hydration-science-how-much-water.jpg',
    keywords:
      'hydration science, how much water, 8 glasses myth, water intake, dehydration, hyponatremia, urine color, electrolytes, hydration for exercise',
    seoTitle: 'Hydration Science: How Much Water Do You Actually Need? | HealthCheck',
  },
  {
    title: 'Calorie Counting: Does It Actually Work?',
    description:
      'An honest look at calorie counting from the research: accuracy issues, psychological effects, and who it works best for.',
    slug: 'calorie-counting-does-it-work',
    date: 'February 16, 2026',
    readTime: '13 min read',
    category: 'Nutrition',
    image: '/images/blog/calorie-counting-does-it-work.jpg',
    keywords:
      'calorie counting, does calorie counting work, food label accuracy, calorie tracking, food journal weight loss, calorie counting eating disorders',
    seoTitle: 'Calorie Counting: Does It Actually Work? | HealthCheck',
  },
  {
    title: 'Pregnancy Nutrition: A Trimester-by-Trimester Guide',
    description:
      'Evidence-based nutrition guidance for each trimester covering calorie needs, weight gain, key nutrients, and exercise safety.',
    slug: 'pregnancy-nutrition-guide',
    date: 'February 16, 2026',
    readTime: '15 min read',
    category: 'Health & Science',
    image: '/images/blog/pregnancy-nutrition-guide.jpg',
    keywords:
      'pregnancy nutrition, prenatal nutrition, trimester nutrition, pregnancy weight gain, folate pregnancy, prenatal vitamins, exercise during pregnancy, gestational diabetes',
    seoTitle: 'Pregnancy Nutrition: A Trimester-by-Trimester Guide | HealthCheck',
  },
  {
    title: 'Metabolic Adaptation and Weight Loss Plateaus',
    description:
      'Why your metabolism fights back during dieting, what the Biggest Loser study revealed, and evidence-based strategies for breaking through plateaus.',
    slug: 'metabolic-adaptation-plateaus',
    date: 'February 16, 2026',
    readTime: '15 min read',
    category: 'Weight Management',
    image: '/images/blog/metabolic-adaptation-plateaus.jpg',
    keywords:
      'metabolic adaptation, weight loss plateau, adaptive thermogenesis, Biggest Loser study, diet breaks, MATADOR study, reverse dieting, NEAT suppression',
    seoTitle: 'Metabolic Adaptation and Weight Loss Plateaus | HealthCheck',
  },
];

// ── SEO Metadata generator ────────────────────────────────────────

/**
 * Build a Next.js `Metadata` object for a blog post slug.
 *
 * Reproduces the exact output of the former `blogMeta()` helper in
 * `src/constants/blogMetadata.ts`.
 */
export function generateBlogMetadata(slug: string): Metadata | null {
  const post = BLOG_REGISTRY.find(p => p.slug === slug);
  if (!post) return null;

  const siteUrl = getPublicSiteUrl();
  const title = post.seoTitle ?? post.title;
  const { description, keywords } = post;
  const image = `/images/blog/${slug}.jpg`;
  const imageAlt = title.replace(/ \| HealthCheck.*$/, '');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  };
}
