import { NextResponse } from 'next/server';

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Best Smart Scales for Body Composition Tracking in 2026',
    description:
      'Compare top smart scales for tracking body fat, muscle mass, BMI, and more. See which scale fits your goals.',
    slug: 'best-smart-scales-body-composition',
    date: 'February 2, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Fitness Trackers for Calorie Tracking in 2026',
    description:
      'Find the best fitness trackers for accurate calorie burn estimates, heart rate monitoring, and activity tracking.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'February 2, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Kitchen Scales for Portion Control and Calorie Tracking in 2026',
    description:
      'Compare top food scales for accurate portion control and calorie counting to stay on track with your macros.',
    slug: 'best-kitchen-scales-portion-control',
    date: 'February 2, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Fitness Apps for Tracking Macros and Calories in 2026',
    description:
      'Compare the top calorie and macro tracking apps to find the right fit for consistent logging.',
    slug: 'best-fitness-apps-macro-tracking',
    date: 'February 2, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Meal Delivery Services for Weight Loss in 2026',
    description:
      'Compare meal delivery services built for calorie control, portion consistency, and weight loss goals.',
    slug: 'meal-delivery-services-weight-loss',
    date: 'February 2, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Supplements for Your Fitness Goals in 2026',
    description:
      'From protein powder to creatine, discover the best supplements to support muscle growth, recovery, and overall fitness performance.',
    slug: 'best-supplements-fitness-goals',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Home Gym Equipment for Beginners in 2026',
    description:
      'Build an effective home gym on any budget with these beginner-friendly picks for resistance bands, dumbbells, mats, and more.',
    slug: 'best-home-gym-equipment-beginners',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Treadmills for Home Weight Loss in 2026',
    description:
      'Compare the best home treadmills for weight loss. Reviews of NordicTrack Commercial 1750, Sole F80, ProForm Pro 2000, Horizon 7.0 AT, and budget options.',
    slug: 'best-treadmills-home-weight-loss',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Running Shoes for Weight Loss in 2026',
    description:
      'Compare the best running shoes for weight loss and beginners. Reviews of Brooks Ghost 16, HOKA Clifton 9, Nike Pegasus 41, and more.',
    slug: 'best-running-shoes-weight-loss',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Resistance Bands for Strength Training in 2026',
    description:
      'Compare the best resistance bands for home workouts and strength training. Reviews of Fit Simplify, WHATAFIT, Undersun, and more.',
    slug: 'best-resistance-bands-strength-training',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Body Tape Measures for Tracking Composition in 2026',
    description:
      'Compare the best body tape measures for tracking waist, hip, and body composition changes. Reviews of MyoTape, RENPHO, and more.',
    slug: 'best-body-tape-measures-composition',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Protein Bars for On-the-Go Nutrition in 2026',
    description:
      'Compare the best protein bars for weight loss, muscle building, and on-the-go nutrition. Reviews of Quest, Barebells, RXBAR, and more.',
    slug: 'best-protein-bars-on-the-go',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Foam Rollers and Recovery Tools in 2026',
    description:
      'Compare the best foam rollers and recovery tools for muscle soreness and workout recovery. Reviews of TriggerPoint GRID, LuxFit, TheraGun Mini, and more.',
    slug: 'best-foam-rollers-recovery',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Yoga Mats for Home Workouts in 2026',
    description:
      'Compare the best yoga mats for home workouts, from premium Manduka PRO to budget BalanceFrom. Reviews with real pros and cons.',
    slug: 'best-yoga-mats-home-workouts',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Jump Ropes for Cardio and Weight Loss in 2026',
    description:
      'Compare the best jump ropes for cardio, weight loss, and HIIT workouts. Reviews of Crossrope, WOD Nation, Rogue, and more.',
    slug: 'best-jump-ropes-cardio-weight-loss',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Water Bottles for Hydration Tracking in 2026',
    description:
      'Compare the best water bottles for tracking daily water intake. Reviews of HidrateSpark, Nalgene, Hydro Flask, and more.',
    slug: 'best-water-bottles-hydration-tracking',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Kettlebells for Full-Body Workouts in 2026',
    description:
      'Compare the best kettlebells for home workouts and strength training. Reviews of Kettlebell Kings, CAP Barbell, Rogue, and more.',
    slug: 'best-kettlebells-full-body-workouts',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Pull-Up Bars for Home Fitness in 2026',
    description:
      'Compare the best pull-up bars for home workouts. Reviews of doorway, wall-mount, and freestanding options.',
    slug: 'best-pull-up-bars-home-fitness',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Heart Rate Monitors for Training in 2026',
    description:
      'Compare the best heart rate monitors and chest straps for accurate training data. Reviews of Polar H10, Garmin HRM-Pro, and more.',
    slug: 'best-heart-rate-monitors-training',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Workout Headphones for the Gym in 2026',
    description:
      'Compare the best workout headphones and earbuds for the gym, running, and HIIT. Reviews of Beats Fit Pro, Jabra Elite 8, Shokz OpenRun, and more.',
    slug: 'best-workout-headphones-gym',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Adjustable Dumbbells for Your Home Gym in 2026',
    description:
      'Compare the best adjustable dumbbells for home workouts. Reviews of Bowflex SelectTech 552, PowerBlock Elite EXP, NordicTrack, Flybird, and Amazon Basics with real pros and cons.',
    slug: 'best-adjustable-dumbbells-home-gym',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Blender Bottles and Shaker Cups in 2026',
    description:
      'Compare the best blender bottles and shaker cups for protein shakes. Reviews of BlenderBottle Classic, BlenderBottle Pro, Helimix, Ice Shaker, and SHAKESPHERE.',
    slug: 'best-blender-bottles-protein-shakes',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Pre-Workout Supplements for Energy in 2026',
    description:
      'Compare the best pre-workout supplements for energy and performance. Reviews of C4 Original, Optimum Nutrition, Legion Pulse, Transparent Labs, and Ghost Legend.',
    slug: 'best-pre-workout-supplements-energy',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Rowing Machines for Full-Body Workouts in 2026',
    description:
      'Compare the best rowing machines for home cardio and strength training. Reviews of Concept2 Model D, Hydrow, Sunny Health, and more with honest pros and cons.',
    slug: 'best-rowing-machines-full-body',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Exercise Bikes for Weight Loss in 2026',
    description:
      'Compare the best exercise bikes for home weight loss. Reviews of Schwinn IC4, Sunny Health, Bowflex VeloCore, and more.',
    slug: 'best-exercise-bikes-weight-loss',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Weight Benches for Home Gym in 2026',
    description:
      'Compare the best weight benches for home workouts. Reviews of REP AB-3000, Bowflex 5.1S, Fitness Reality, and more.',
    slug: 'best-weight-benches-home-gym',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Creatine Supplements for Muscle Gain in 2026',
    description:
      'Compare the best creatine supplements for muscle gain and performance. Reviews of Optimum Nutrition, Thorne, BulkSupplements, and more.',
    slug: 'best-creatine-supplements-muscle-gain',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Massage Guns for Muscle Recovery in 2026',
    description:
      'Compare the best percussion massage guns for post-workout recovery. Reviews of Theragun Elite, Hypervolt 2, RENPHO R3, and more.',
    slug: 'best-massage-guns-recovery',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Meal Prep Containers for Weight Loss in 2026',
    description:
      'Compare the best meal prep containers for portion control and weight loss. Reviews of Prep Naturals, Freshware, Fitpacker, and more.',
    slug: 'best-meal-prep-containers-weight-loss',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Workout Gloves for Weightlifting in 2026',
    description:
      'Compare the best workout gloves for weightlifting and CrossFit. Reviews of Harbinger Pro, Fit Active Sports, RIMSports, and more.',
    slug: 'best-workout-gloves-weightlifting',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Ab Rollers for Core Training in 2026',
    description:
      'Compare the top ab rollers and ab wheels for building core strength. Reviews of Perfect Fitness Ab Carver Pro, Vinsguir, and more.',
    slug: 'best-ab-rollers-core-training',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Gym Bags for Workout Gear in 2026',
    description:
      'Compare the best gym bags and duffel bags for workout gear. Reviews of Adidas Defender, Under Armour Undeniable, Nike Brasilia, and more.',
    slug: 'best-gym-bags-workout-gear',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Compression Gear for Recovery in 2026',
    description:
      'Compare the best compression clothing for workout recovery and performance. Reviews of 2XU, CEP, Under Armour HeatGear, and more.',
    slug: 'best-compression-gear-recovery',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Barbell Weight Sets for Home Gym in 2026',
    description:
      'Compare the best barbell and weight plate sets for home gyms. Reviews of CAP 300lb set, REP Iron Plates, and more.',
    slug: 'best-barbell-weight-sets-home-gym',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Fitness Trackers for Kids in 2026',
    description:
      'Compare the best fitness trackers and smartwatches for kids. Reviews of Fitbit Ace 3, Garmin Vivofit Jr 3, BIGGERFIVE, and more.',
    slug: 'best-fitness-trackers-kids',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'Best Sleep Trackers for Recovery in 2026',
    description:
      'Compare the best sleep trackers for workout recovery and health. Reviews of Oura Ring, Whoop 4.0, Fitbit Sense 2, and more.',
    slug: 'best-sleep-trackers-recovery',
    date: 'February 8, 2026',
    category: 'Product Reviews',
  },
  {
    title: 'How to Measure Body Fat at Home: Methods, Accuracy, and What Works',
    description:
      'Learn how to measure body fat at home with the Navy method, calipers, smart scales, and more. Honest accuracy comparisons.',
    slug: 'how-to-measure-body-fat-at-home',
    date: 'February 8, 2026',
    category: 'Health & Science',
  },
  {
    title: 'Heart Rate Zones Explained: A Guide to Training Smarter',
    description:
      'Understand heart rate training zones, Zone 2 cardio, the Karvonen method, and when to push harder for better results.',
    slug: 'heart-rate-zones-explained-training',
    date: 'February 8, 2026',
    category: 'Training',
  },
  {
    title: 'Counting Calories vs Tracking Macros: Which Approach Fits You?',
    description:
      'Compare calorie counting vs macro tracking to find which approach works best for your personality and goals.',
    slug: 'counting-calories-vs-tracking-macros',
    date: 'February 8, 2026',
    category: 'Nutrition',
  },
  {
    title: 'How Fast Can You Build Muscle? Natural Expectations and Reality',
    description:
      'Realistic muscle building timelines based on research. Progressive overload, nutrition, and what to expect in your first year.',
    slug: 'how-fast-can-you-build-muscle',
    date: 'February 8, 2026',
    category: 'Training',
  },
  {
    title: 'Treadmill vs Exercise Bike: Which Burns More Calories?',
    description:
      'Compare treadmills and exercise bikes for calorie burn, joint impact, and weight loss effectiveness with real data.',
    slug: 'treadmill-vs-exercise-bike-calories',
    date: 'February 8, 2026',
    category: 'Comparisons',
  },
  {
    title: 'Adjustable Dumbbells vs Barbell for Home Gym: Which Should You Buy First?',
    description:
      'Compare adjustable dumbbells and barbells for home gym setups. Space, cost, exercise versatility, and recommendations.',
    slug: 'adjustable-dumbbells-vs-barbell-home-gym',
    date: 'February 8, 2026',
    category: 'Comparisons',
  },
  {
    title: 'Smart Scale vs Body Fat Calipers: Which Is More Accurate?',
    description:
      'Compare smart scales and body fat calipers for accuracy, consistency, and practical body composition tracking.',
    slug: 'smart-scale-vs-body-fat-calipers',
    date: 'February 8, 2026',
    category: 'Comparisons',
  },
  {
    title: 'Cardio vs Weights for Fat Loss: What Science Actually Says',
    description:
      'The truth about cardio versus resistance training for fat loss. Learn what research shows about EPOC, muscle mass, and metabolism - plus practical training splits that work.',
    slug: 'cardio-vs-weights-fat-loss',
    date: 'February 8, 2026',
    category: 'Training',
  },
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    category: 'Weight Management',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    category: 'Energy Expenditure',
  },
  {
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'February 15, 2025',
    category: 'Measurement Methods',
  },
];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<NextResponse> {
  const baseUrl = 'https://www.healthcalc.xyz';

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const rssItems = sortedPosts
    .map(
      post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${escapeXml(post.slug)}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${escapeXml(post.slug)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`
    )
    .join('');

  const latestDate =
    sortedPosts.length > 0 ? new Date(sortedPosts[0].date).toUTCString() : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HealthCheck Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Evidence-based articles on health, fitness, nutrition, and body composition</description>
    <language>en-us</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
