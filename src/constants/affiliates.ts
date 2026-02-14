// Affiliate link configurations for health/fitness products
// Update the `AMAZON_ASSOCIATES_TAG` value with your actual affiliate tag when available.

const AMAZON_ASSOCIATES_TAG = 'gr8monk3ys-20';

// Notes:
// - Withings Body+ replaced with Withings Body Smart for a consistently available Amazon US listing.
// - eufy P2 Pro replaced with Etekcity Smart Scale for consistent availability on Amazon US.
const amazonProductUrl = (asin: string) =>
  `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATES_TAG}`;

export type CalculatorType =
  | 'bmi'
  | 'tdee'
  | 'calorie'
  | 'calories-burned'
  | 'calories-burned-walking'
  | 'calories-burned-running'
  | 'calories-burned-cycling'
  | 'calories-burned-swimming'
  | 'body-fat'
  | 'body-frame-size'
  | 'body-fat-burn'
  | 'calorie-deficit'
  | 'weight-management'
  | 'maximum-fat-loss'
  | 'absi'
  | 'whr'
  | 'waist-to-height-ratio'
  | 'conversions'
  | 'macro'
  | 'carb-intake'
  | 'fat-intake'
  | 'protein'
  | 'one-rep-max'
  | 'blood-pressure'
  | 'heart-rate-zones'
  | 'target-heart-rate'
  | 'max-heart-rate'
  | 'ideal-weight'
  | 'adjusted-body-weight'
  | 'body-surface-area'
  | 'lean-body-mass'
  | 'army-body-fat'
  | 'water-intake'
  | 'sleep'
  | 'pregnancy-due-date'
  | 'due-date-by-conception'
  | 'pregnancy-weight-gain'
  | 'ovulation'
  | 'bmr'
  | 'vo2-max'
  | 'running-pace'
  | 'age'
  | 'steps-to-miles'
  | 'steps-to-calories'
  | 'resting-heart-rate'
  | 'ffmi'
  | 'body-recomposition'
  | 'intermittent-fasting'
  | 'keto-calculator'
  | 'caffeine-calculator';

export type ProductCategory =
  | 'fitness-tracker'
  | 'smart-scale'
  | 'meal-delivery'
  | 'fitness-app'
  | 'supplement'
  | 'equipment';

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  url: string;
  imageUrl?: string;
  price?: string;
  rating?: number;
  badge?: string;
}

export interface AffiliateGuide {
  slug: string;
  title: string;
  description: string;
  category: ProductCategory;
}

export interface AffiliateCategoryConfig {
  title: string;
  description: string;
  icon: string;
}

// Product category display configurations
export const AFFILIATE_CATEGORY_CONFIG: Record<ProductCategory, AffiliateCategoryConfig> = {
  'fitness-tracker': {
    title: 'Fitness Trackers',
    description: 'Track your daily activity, heart rate, and calories burned',
    icon: 'watch',
  },
  'smart-scale': {
    title: 'Smart Scales',
    description: 'Monitor weight, body fat percentage, and more',
    icon: 'scale',
  },
  'meal-delivery': {
    title: 'Meal Delivery Services',
    description: 'Healthy, portion-controlled meals delivered to your door',
    icon: 'utensils',
  },
  'fitness-app': {
    title: 'Fitness Apps',
    description: 'Track workouts, nutrition, and achieve your goals',
    icon: 'smartphone',
  },
  supplement: {
    title: 'Supplements',
    description: 'Support your health and fitness journey',
    icon: 'pill',
  },
  equipment: {
    title: 'Fitness Equipment',
    description: 'Quality equipment for home workouts',
    icon: 'dumbbell',
  },
};

// All available affiliate products
// Partner links finalized
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  // Fitness Trackers
  {
    id: 'fitbit-charge-6',
    name: 'Fitbit Charge 6',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking',
    category: 'fitness-tracker',
    url: amazonProductUrl('B0CC63GZ3R'),
    price: '$159.95',
    rating: 4.5,
    badge: 'Popular',
  },
  {
    id: 'apple-watch-se',
    name: 'Apple Watch SE',
    description: 'Powerful fitness features including workout detection and activity rings',
    category: 'fitness-tracker',
    url: amazonProductUrl('B0CHX7R6WJ'),
    price: '$249.00',
    rating: 4.7,
  },
  {
    id: 'garmin-vivosmart-5',
    name: 'Garmin Vivosmart 5',
    description: 'Slim fitness tracker with Body Battery energy monitoring and stress tracking',
    category: 'fitness-tracker',
    url: amazonProductUrl('B09VY63659'),
    price: '$149.99',
    rating: 4.4,
  },

  // Smart Scales
  {
    id: 'withings-body-smart',
    name: 'Withings Body Smart',
    description: 'Wi-Fi smart scale with body composition analysis and app sync',
    category: 'smart-scale',
    url: amazonProductUrl('B0C3JNJPZ7'),
    price: '$99.95',
    rating: 4.6,
    badge: 'Best Value',
  },
  {
    id: 'renpho-smart-scale',
    name: 'RENPHO Smart Scale',
    description: 'Affordable scale measuring 13 body metrics including BMI and body fat',
    category: 'smart-scale',
    url: amazonProductUrl('B01N1UX8RW'),
    price: '$29.99',
    rating: 4.5,
  },
  {
    id: 'etekcity-smart-scale',
    name: 'Etekcity Smart Scale',
    description: 'Popular smart scale with body composition tracking and app sync',
    category: 'smart-scale',
    url: amazonProductUrl('B09HCJD6H1'),
    price: '$49.99',
    rating: 4.4,
  },

  // Supplements
  {
    id: 'protein-powder',
    name: 'Optimum Nutrition Whey Protein',
    description: 'High-quality whey protein for muscle recovery and growth',
    category: 'supplement',
    url: amazonProductUrl('B002DYIZH6'),
    price: '$32.99',
    rating: 4.7,
    badge: 'Best Seller',
  },
  {
    id: 'multivitamin',
    name: 'Garden of Life Multivitamin',
    description: 'Whole food multivitamin for men and women',
    category: 'supplement',
    url: amazonProductUrl('B00323NW5C'),
    price: '$44.99',
    rating: 4.5,
  },
  {
    id: 'omega-3',
    name: 'Nordic Naturals Omega-3',
    description: 'Pure, sustainable fish oil for heart and brain health',
    category: 'supplement',
    url: amazonProductUrl('B002CQU564'),
    price: '$27.95',
    rating: 4.6,
  },

  // Fitness Equipment
  {
    id: 'resistance-bands',
    name: 'Fit Simplify Resistance Bands',
    description: 'Set of 5 exercise bands for strength training anywhere',
    category: 'equipment',
    url: amazonProductUrl('B01AVDVHTI'),
    price: '$12.95',
    rating: 4.5,
  },
  {
    id: 'yoga-mat',
    name: 'Manduka PRO Yoga Mat',
    description: 'Premium, eco-friendly yoga mat with lifetime guarantee',
    category: 'equipment',
    url: amazonProductUrl('B00DJQFAV6'),
    price: '$120.00',
    rating: 4.8,
  },

  // Running Shoes
  {
    id: 'brooks-ghost-16',
    name: 'Brooks Ghost 16',
    description: 'Neutral running shoe with DNA LOFT v2 cushioning for beginners',
    category: 'equipment',
    url: amazonProductUrl('B0CLMHGPYP'),
    price: '$139.95',
    rating: 4.7,
    badge: 'Best Seller',
  },
  {
    id: 'hoka-clifton-9',
    name: 'HOKA Clifton 9',
    description: 'Maximum cushion running shoe at minimal weight with Meta-Rocker',
    category: 'equipment',
    url: amazonProductUrl('B0BWJXRXQ5'),
    price: '$145.00',
    rating: 4.6,
  },
  {
    id: 'nike-pegasus-41',
    name: 'Nike Pegasus 41',
    description: 'Versatile daily trainer with React X foam and Zoom Air',
    category: 'equipment',
    url: amazonProductUrl('B0D2DQ8S6X'),
    price: '$130.00',
    rating: 4.5,
  },

  // Resistance Bands
  {
    id: 'whatafit-resistance-bands',
    name: 'WHATAFIT Resistance Bands',
    description: '11-piece tube set with handles, door anchor, and ankle straps',
    category: 'equipment',
    url: amazonProductUrl('B0CDHBJYX3'),
    price: '$29.99',
    rating: 4.5,
  },
  {
    id: 'undersun-resistance-bands',
    name: 'Undersun Resistance Bands',
    description: 'Premium 5-band set for full-body strength training',
    category: 'equipment',
    url: amazonProductUrl('B07BKRTB3V'),
    price: '$79.95',
    rating: 4.7,
  },

  // Body Tape Measures
  {
    id: 'myotape-body-measure',
    name: 'MyoTape Body Tape Measure',
    description: 'Self-retracting tape for consistent one-handed body measurements',
    category: 'equipment',
    url: amazonProductUrl('B000G7YW7Y'),
    price: '$7.95',
    rating: 4.4,
  },
  {
    id: 'renpho-bluetooth-tape',
    name: 'RENPHO Bluetooth Body Tape Measure',
    description: 'Smart tape that syncs measurements to your phone via app',
    category: 'equipment',
    url: amazonProductUrl('B09QWFWTTL'),
    price: '$19.99',
    rating: 4.3,
  },

  // Protein Bars
  {
    id: 'quest-protein-bars',
    name: 'Quest Protein Bars',
    description: '21g protein, 1g sugar, gluten-free protein bars',
    category: 'supplement',
    url: amazonProductUrl('B07J2MM23Z'),
    price: '$25.99',
    rating: 4.5,
    badge: 'Popular',
  },
  {
    id: 'barebells-protein-bars',
    name: 'Barebells Protein Bars',
    description: '20g protein, no added sugar, candy bar taste',
    category: 'supplement',
    url: amazonProductUrl('B09PYB4MQS'),
    price: '$29.99',
    rating: 4.6,
  },
  {
    id: 'rxbar-protein-bars',
    name: 'RXBAR Protein Bars',
    description: 'Whole food protein bars with egg whites, dates, and nuts',
    category: 'supplement',
    url: amazonProductUrl('B018H3LFJG'),
    price: '$28.99',
    rating: 4.4,
  },

  // Recovery Tools
  {
    id: 'triggerpoint-grid',
    name: 'TriggerPoint GRID Foam Roller',
    description: 'Multi-density foam roller with hollow ABS core for deep tissue massage',
    category: 'equipment',
    url: amazonProductUrl('B0040EKZDY'),
    price: '$36.99',
    rating: 4.6,
  },
  {
    id: 'theragun-mini',
    name: 'TheraGun Mini (3rd Gen)',
    description: 'Ultra-portable percussion massage gun with 180-min battery',
    category: 'equipment',
    url: amazonProductUrl('B0DV7JN7ZD'),
    price: '$149.99',
    rating: 4.5,
  },
];

export const AFFILIATE_GUIDES: AffiliateGuide[] = [
  {
    slug: 'best-smart-scales-body-composition',
    title: 'Best Smart Scales for Body Composition',
    description: 'Top smart scales for tracking weight, body fat, and trends.',
    category: 'smart-scale',
  },
  {
    slug: 'best-fitness-trackers-calorie-tracking',
    title: 'Best Fitness Trackers for Calorie Tracking',
    description: 'Track activity, heart rate, and calories with the best wearables.',
    category: 'fitness-tracker',
  },
  {
    slug: 'best-kitchen-scales-portion-control',
    title: 'Best Kitchen Scales for Portion Control',
    description: 'Portion control and accurate food logging for nutrition goals.',
    category: 'equipment',
  },
  {
    slug: 'best-fitness-apps-macro-tracking',
    title: 'Best Fitness Apps for Tracking Macros',
    description: 'Macro and calorie tracking apps that make consistency easy.',
    category: 'fitness-app',
  },
  {
    slug: 'meal-delivery-services-weight-loss',
    title: 'Best Meal Delivery Services for Weight Loss',
    description: 'Calorie-smart meal kits and prepared plans.',
    category: 'meal-delivery',
  },
  {
    slug: 'best-supplements-fitness-goals',
    title: 'Best Supplements for Your Fitness Goals',
    description: 'Top-rated protein, creatine, and vitamins for performance and recovery.',
    category: 'supplement',
  },
  {
    slug: 'best-home-gym-equipment-beginners',
    title: 'Best Home Gym Equipment for Beginners',
    description: 'Budget-friendly gear to build a complete home gym.',
    category: 'equipment',
  },
  {
    slug: 'best-running-shoes-weight-loss',
    title: 'Best Running Shoes for Weight Loss',
    description: 'Top running shoes for beginners and weight loss goals.',
    category: 'equipment',
  },
  {
    slug: 'best-resistance-bands-strength-training',
    title: 'Best Resistance Bands for Strength Training',
    description: 'Resistance bands for home workouts and progressive overload.',
    category: 'equipment',
  },
  {
    slug: 'best-body-tape-measures-composition',
    title: 'Best Body Tape Measures for Tracking Composition',
    description: 'Accurate body tape measures for waist, hip, and limb tracking.',
    category: 'equipment',
  },
  {
    slug: 'best-protein-bars-on-the-go',
    title: 'Best Protein Bars for On-the-Go Nutrition',
    description: 'High-protein, low-sugar bars for weight loss and muscle building.',
    category: 'supplement',
  },
  {
    slug: 'best-foam-rollers-recovery',
    title: 'Best Foam Rollers and Recovery Tools',
    description: 'Foam rollers and massage tools for workout recovery.',
    category: 'equipment',
  },
  {
    slug: 'best-yoga-mats-home-workouts',
    title: 'Best Yoga Mats for Home Workouts',
    description: 'Top yoga mats for home exercise, stretching, and recovery.',
    category: 'equipment',
  },
  {
    slug: 'best-adjustable-dumbbells-home-gym',
    title: 'Best Adjustable Dumbbells for Home Gym',
    description: 'Space-saving adjustable dumbbells for strength training at home.',
    category: 'equipment',
  },
  {
    slug: 'best-jump-ropes-cardio-weight-loss',
    title: 'Best Jump Ropes for Cardio and Weight Loss',
    description: 'Jump ropes for HIIT, cardio, and calorie burning.',
    category: 'equipment',
  },
  {
    slug: 'best-water-bottles-hydration-tracking',
    title: 'Best Water Bottles for Hydration Tracking',
    description: 'Smart and standard water bottles for daily hydration goals.',
    category: 'equipment',
  },
  {
    slug: 'best-kettlebells-full-body-workouts',
    title: 'Best Kettlebells for Full-Body Workouts',
    description: 'Kettlebells for swings, squats, and full-body conditioning.',
    category: 'equipment',
  },
  {
    slug: 'best-workout-headphones-gym',
    title: 'Best Workout Headphones for the Gym',
    description: 'Sweat-proof headphones and earbuds for training.',
    category: 'equipment',
  },
  {
    slug: 'best-pull-up-bars-home-fitness',
    title: 'Best Pull-Up Bars for Home Fitness',
    description: 'Doorway, wall-mount, and freestanding pull-up bars.',
    category: 'equipment',
  },
  {
    slug: 'best-blender-bottles-protein-shakes',
    title: 'Best Blender Bottles and Shaker Cups',
    description: 'Shaker bottles for protein shakes and supplements.',
    category: 'equipment',
  },
  {
    slug: 'best-heart-rate-monitors-training',
    title: 'Best Heart Rate Monitors for Training',
    description: 'Chest straps and wrist monitors for accurate heart rate data.',
    category: 'fitness-tracker',
  },
  {
    slug: 'best-treadmills-home-weight-loss',
    title: 'Best Treadmills for Home Weight Loss',
    description: 'Top treadmills for home cardio and weight loss goals.',
    category: 'equipment',
  },
  {
    slug: 'best-exercise-bikes-weight-loss',
    title: 'Best Exercise Bikes for Weight Loss',
    description: 'Indoor cycling bikes for calorie burning and cardio.',
    category: 'equipment',
  },
  {
    slug: 'best-rowing-machines-full-body',
    title: 'Best Rowing Machines for Full-Body Workouts',
    description: 'Rowing machines for full-body cardio and strength.',
    category: 'equipment',
  },
  {
    slug: 'best-weight-benches-home-gym',
    title: 'Best Weight Benches for Home Gym',
    description: 'Adjustable and flat benches for home strength training.',
    category: 'equipment',
  },
  {
    slug: 'best-creatine-supplements-muscle-gain',
    title: 'Best Creatine Supplements for Muscle Gain',
    description: 'Top creatine monohydrate supplements for strength and muscle.',
    category: 'supplement',
  },
  {
    slug: 'best-pre-workout-supplements-energy',
    title: 'Best Pre-Workout Supplements for Energy',
    description: 'Pre-workout formulas for energy and training performance.',
    category: 'supplement',
  },
  {
    slug: 'best-massage-guns-recovery',
    title: 'Best Massage Guns for Muscle Recovery',
    description: 'Percussion massage guns for post-workout recovery.',
    category: 'equipment',
  },
  {
    slug: 'best-meal-prep-containers-weight-loss',
    title: 'Best Meal Prep Containers for Weight Loss',
    description: 'Portion-control containers for meal prep and weight loss.',
    category: 'equipment',
  },
  {
    slug: 'best-workout-gloves-weightlifting',
    title: 'Best Workout Gloves for Weightlifting',
    description: 'Grip gloves for weightlifting, CrossFit, and training.',
    category: 'equipment',
  },
  {
    slug: 'best-ab-rollers-core-training',
    title: 'Best Ab Rollers for Core Training',
    description: 'Ab wheels and rollers for building core strength.',
    category: 'equipment',
  },
  {
    slug: 'best-gym-bags-workout-gear',
    title: 'Best Gym Bags for Workout Gear',
    description: 'Duffel bags and gym bags for training gear.',
    category: 'equipment',
  },
  {
    slug: 'best-compression-gear-recovery',
    title: 'Best Compression Gear for Recovery',
    description: 'Compression clothing for workout recovery and performance.',
    category: 'equipment',
  },
  {
    slug: 'best-barbell-weight-sets-home-gym',
    title: 'Best Barbell Weight Sets for Home Gym',
    description: 'Barbell and weight plate sets for home strength training.',
    category: 'equipment',
  },
  {
    slug: 'best-fitness-trackers-kids',
    title: 'Best Fitness Trackers for Kids',
    description: 'Kid-friendly fitness trackers and smartwatches.',
    category: 'fitness-tracker',
  },
  {
    slug: 'best-sleep-trackers-recovery',
    title: 'Best Sleep Trackers for Recovery',
    description: 'Sleep trackers and wearables for recovery monitoring.',
    category: 'fitness-tracker',
  },
];

// Mapping of calculator types to relevant product categories
export const CALCULATOR_PRODUCT_MAPPING: Record<CalculatorType, ProductCategory[]> = {
  bmi: ['smart-scale', 'fitness-tracker', 'fitness-app'],
  tdee: ['fitness-tracker', 'meal-delivery', 'fitness-app'],
  calorie: ['fitness-app', 'meal-delivery', 'smart-scale'],
  'calories-burned': ['fitness-tracker', 'equipment', 'fitness-app'],
  'calories-burned-walking': ['fitness-tracker', 'equipment', 'fitness-app'],
  'calories-burned-running': ['fitness-tracker', 'equipment', 'fitness-app'],
  'calories-burned-cycling': ['fitness-tracker', 'equipment', 'fitness-app'],
  'calories-burned-swimming': ['fitness-tracker', 'equipment', 'fitness-app'],
  'body-fat': ['smart-scale', 'fitness-tracker', 'supplement'],
  'body-frame-size': ['smart-scale', 'fitness-app'],
  'body-fat-burn': ['fitness-tracker', 'fitness-app', 'equipment'],
  'calorie-deficit': ['meal-delivery', 'fitness-app', 'smart-scale'],
  'weight-management': ['meal-delivery', 'fitness-app', 'smart-scale'],
  'maximum-fat-loss': ['meal-delivery', 'supplement', 'fitness-tracker'],
  absi: ['smart-scale', 'meal-delivery', 'fitness-app'],
  whr: ['smart-scale', 'fitness-tracker', 'equipment'],
  'waist-to-height-ratio': ['smart-scale', 'fitness-tracker', 'fitness-app'],
  conversions: ['fitness-app', 'smart-scale'],
  macro: ['meal-delivery', 'fitness-app', 'supplement'],
  'carb-intake': ['fitness-app', 'meal-delivery', 'supplement'],
  'fat-intake': ['fitness-app', 'meal-delivery', 'supplement'],
  protein: ['supplement', 'meal-delivery', 'fitness-app'],
  'one-rep-max': ['equipment', 'fitness-app', 'supplement'],
  'blood-pressure': ['fitness-tracker', 'fitness-app', 'supplement'],
  'heart-rate-zones': ['fitness-tracker', 'equipment', 'fitness-app'],
  'target-heart-rate': ['fitness-tracker', 'equipment', 'fitness-app'],
  'max-heart-rate': ['fitness-tracker', 'equipment', 'fitness-app'],
  'ideal-weight': ['smart-scale', 'fitness-app', 'meal-delivery'],
  'adjusted-body-weight': ['fitness-app', 'smart-scale'],
  'body-surface-area': ['fitness-app', 'smart-scale'],
  'lean-body-mass': ['smart-scale', 'fitness-app', 'supplement'],
  'army-body-fat': ['smart-scale', 'fitness-tracker', 'fitness-app'],
  'water-intake': ['fitness-tracker', 'fitness-app', 'supplement'],
  sleep: ['fitness-tracker', 'supplement', 'fitness-app'],
  'pregnancy-due-date': ['fitness-tracker', 'supplement', 'fitness-app'],
  'due-date-by-conception': ['fitness-tracker', 'supplement', 'fitness-app'],
  'pregnancy-weight-gain': ['fitness-app', 'supplement', 'meal-delivery'],
  ovulation: ['fitness-app', 'supplement', 'meal-delivery'],
  bmr: ['fitness-app', 'meal-delivery', 'supplement'],
  'vo2-max': ['fitness-tracker', 'equipment', 'fitness-app'],
  'running-pace': ['equipment', 'fitness-tracker', 'fitness-app'],
  age: ['fitness-tracker', 'fitness-app'],
  'steps-to-miles': ['fitness-tracker', 'fitness-app', 'equipment'],
  'steps-to-calories': ['fitness-tracker', 'fitness-app', 'equipment'],
  'resting-heart-rate': ['fitness-tracker', 'fitness-app'],
  ffmi: ['smart-scale', 'supplement'],
  'body-recomposition': ['supplement', 'smart-scale', 'fitness-app'],
  'intermittent-fasting': ['fitness-app', 'meal-delivery', 'smart-scale'],
  'keto-calculator': ['meal-delivery', 'fitness-app', 'supplement'],
  'caffeine-calculator': ['supplement', 'fitness-app'],
};

export const CALCULATOR_GUIDE_MAPPING: Record<CalculatorType, AffiliateGuide['slug'][]> = {
  bmi: ['best-smart-scales-body-composition', 'best-fitness-apps-macro-tracking'],
  tdee: ['best-fitness-apps-macro-tracking', 'meal-delivery-services-weight-loss'],
  calorie: ['best-fitness-apps-macro-tracking', 'meal-delivery-services-weight-loss'],
  'calories-burned': [
    'best-fitness-trackers-calorie-tracking',
    'best-kettlebells-full-body-workouts',
    'best-rowing-machines-full-body',
  ],
  'calories-burned-walking': ['best-fitness-trackers-calorie-tracking'],
  'calories-burned-running': [
    'best-fitness-trackers-calorie-tracking',
    'best-running-shoes-weight-loss',
    'best-treadmills-home-weight-loss',
  ],
  'calories-burned-cycling': [
    'best-fitness-trackers-calorie-tracking',
    'best-exercise-bikes-weight-loss',
  ],
  'calories-burned-swimming': ['best-fitness-trackers-calorie-tracking'],
  'body-fat': ['best-smart-scales-body-composition', 'best-fitness-trackers-calorie-tracking'],
  'body-frame-size': ['best-smart-scales-body-composition'],
  'body-fat-burn': ['best-fitness-trackers-calorie-tracking', 'best-yoga-mats-home-workouts'],
  'calorie-deficit': ['meal-delivery-services-weight-loss', 'best-jump-ropes-cardio-weight-loss'],
  'weight-management': [
    'meal-delivery-services-weight-loss',
    'best-kitchen-scales-portion-control',
  ],
  'maximum-fat-loss': ['meal-delivery-services-weight-loss', 'best-supplements-fitness-goals'],
  absi: ['best-smart-scales-body-composition', 'best-kitchen-scales-portion-control'],
  whr: ['best-smart-scales-body-composition', 'best-body-tape-measures-composition'],
  'waist-to-height-ratio': [
    'best-smart-scales-body-composition',
    'best-fitness-trackers-calorie-tracking',
  ],
  conversions: ['best-kitchen-scales-portion-control'],
  macro: ['best-fitness-apps-macro-tracking', 'best-blender-bottles-protein-shakes'],
  'carb-intake': ['best-fitness-apps-macro-tracking', 'best-kitchen-scales-portion-control'],
  'fat-intake': ['best-fitness-apps-macro-tracking', 'best-kitchen-scales-portion-control'],
  protein: [
    'best-supplements-fitness-goals',
    'best-blender-bottles-protein-shakes',
    'best-creatine-supplements-muscle-gain',
  ],
  'one-rep-max': [
    'best-home-gym-equipment-beginners',
    'best-adjustable-dumbbells-home-gym',
    'best-barbell-weight-sets-home-gym',
    'best-weight-benches-home-gym',
  ],
  'blood-pressure': ['best-fitness-trackers-calorie-tracking'],
  'heart-rate-zones': [
    'best-fitness-trackers-calorie-tracking',
    'best-heart-rate-monitors-training',
  ],
  'target-heart-rate': [
    'best-fitness-trackers-calorie-tracking',
    'best-heart-rate-monitors-training',
  ],
  'max-heart-rate': ['best-fitness-trackers-calorie-tracking', 'best-heart-rate-monitors-training'],
  'ideal-weight': ['best-smart-scales-body-composition', 'meal-delivery-services-weight-loss'],
  'adjusted-body-weight': ['best-smart-scales-body-composition'],
  'body-surface-area': ['best-fitness-apps-macro-tracking'],
  'water-intake': [
    'best-fitness-trackers-calorie-tracking',
    'best-water-bottles-hydration-tracking',
  ],
  sleep: [
    'best-fitness-trackers-calorie-tracking',
    'best-sleep-trackers-recovery',
    'best-massage-guns-recovery',
  ],
  'pregnancy-due-date': [
    'best-fitness-trackers-calorie-tracking',
    'meal-delivery-services-weight-loss',
  ],
  'due-date-by-conception': [
    'best-fitness-trackers-calorie-tracking',
    'meal-delivery-services-weight-loss',
  ],
  'pregnancy-weight-gain': [
    'meal-delivery-services-weight-loss',
    'best-fitness-apps-macro-tracking',
  ],
  ovulation: ['best-fitness-apps-macro-tracking', 'meal-delivery-services-weight-loss'],
  bmr: ['best-fitness-apps-macro-tracking', 'meal-delivery-services-weight-loss'],
  'vo2-max': [
    'best-fitness-trackers-calorie-tracking',
    'best-heart-rate-monitors-training',
    'best-rowing-machines-full-body',
    'best-compression-gear-recovery',
  ],
  'running-pace': [
    'best-running-shoes-weight-loss',
    'best-workout-headphones-gym',
    'best-compression-gear-recovery',
  ],
  age: ['best-fitness-apps-macro-tracking'],
  'lean-body-mass': [
    'best-smart-scales-body-composition',
    'best-kettlebells-full-body-workouts',
    'best-creatine-supplements-muscle-gain',
  ],
  'army-body-fat': ['best-smart-scales-body-composition', 'best-fitness-trackers-calorie-tracking'],
  'steps-to-miles': ['best-fitness-trackers-calorie-tracking', 'best-fitness-trackers-kids'],
  'steps-to-calories': ['best-fitness-trackers-calorie-tracking', 'best-fitness-trackers-kids'],
  'resting-heart-rate': [
    'best-fitness-trackers-calorie-tracking',
    'best-heart-rate-monitors-training',
    'best-sleep-trackers-recovery',
  ],
  ffmi: ['best-smart-scales-body-composition', 'best-creatine-supplements-muscle-gain'],
  'body-recomposition': [
    'best-supplements-fitness-goals',
    'best-smart-scales-body-composition',
    'best-fitness-apps-macro-tracking',
  ],
  'intermittent-fasting': [
    'best-fitness-apps-macro-tracking',
    'meal-delivery-services-weight-loss',
  ],
  'keto-calculator': [
    'meal-delivery-services-weight-loss',
    'best-fitness-apps-macro-tracking',
    'best-supplements-fitness-goals',
  ],
  'caffeine-calculator': [
    'best-pre-workout-supplements-energy',
    'best-fitness-apps-macro-tracking',
  ],
};

// Helper function to get products for a specific calculator type
export function getProductsForCalculator(
  calculatorType: CalculatorType,
  maxProducts = 6
): AffiliateProduct[] {
  const relevantCategories = CALCULATOR_PRODUCT_MAPPING[calculatorType] || [];

  const products = AFFILIATE_PRODUCTS.filter(product =>
    relevantCategories.includes(product.category)
  );

  // Sort by rating (if available) and return top products
  return products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, maxProducts);
}

export function getGuidesForCalculator(
  calculatorType: CalculatorType,
  maxGuides = 2
): AffiliateGuide[] {
  const slugs = CALCULATOR_GUIDE_MAPPING[calculatorType] || [];
  const guidesBySlug = new Map(AFFILIATE_GUIDES.map(guide => [guide.slug, guide]));
  return slugs
    .map(slug => guidesBySlug.get(slug))
    .filter((guide): guide is AffiliateGuide => Boolean(guide))
    .slice(0, maxGuides);
}

// Helper function to get products by category
export function getProductsByCategory(category: ProductCategory): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter(product => product.category === category);
}

// Affiliate disclosure text
export const AFFILIATE_DISCLOSURE = {
  short:
    'As an affiliate, we may earn a commission from qualifying purchases at no extra cost to you.',
  full: `Disclosure: Some of the links on this page are affiliate links, meaning we may earn a small commission if you click through and make a purchase. This comes at no additional cost to you and helps support our free health calculators. We only recommend products we believe will be valuable to our users.`,
};
