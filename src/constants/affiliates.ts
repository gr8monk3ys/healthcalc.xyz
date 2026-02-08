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
  | 'resting-heart-rate';

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

  // Meal Delivery Services
  {
    id: 'factor-meals',
    name: 'Factor Meals',
    description: 'Chef-prepared, ready-to-eat meals tailored to your diet goals',
    category: 'meal-delivery',
    // TODO: Replace with direct partner link once approved.
    url: 'https://www.factor75.com/',
    price: 'From $11/meal',
    rating: 4.3,
    badge: 'Editor Choice',
  },
  {
    id: 'hello-fresh',
    name: 'HelloFresh',
    description: 'Fresh ingredients and easy recipes delivered weekly with calorie-smart options',
    category: 'meal-delivery',
    // TODO: Replace with direct partner link once approved.
    url: 'https://www.hellofresh.com/',
    price: 'From $8/serving',
    rating: 4.4,
  },
  {
    id: 'noom',
    name: 'Noom',
    description: 'Psychology-based weight loss program with personalized meal plans',
    category: 'meal-delivery',
    // TODO: Replace with direct partner link once approved.
    url: 'https://www.noom.com/',
    price: 'From $59/month',
    rating: 4.2,
  },

  // Fitness Apps
  {
    id: 'myfitnesspal-premium',
    name: 'MyFitnessPal Premium',
    description: 'Comprehensive calorie and macro tracking with barcode scanner',
    category: 'fitness-app',
    // TODO: Replace with direct partner link once approved.
    url: 'https://www.myfitnesspal.com/',
    price: '$19.99/month',
    rating: 4.6,
    badge: 'Most Popular',
  },
  {
    id: 'lose-it',
    name: 'Lose It!',
    description: 'Easy-to-use calorie counter and weight loss app with community support',
    category: 'fitness-app',
    // TODO: Replace with direct partner link once approved.
    url: 'https://www.loseit.com/',
    price: '$39.99/year',
    rating: 4.5,
  },
  {
    id: 'cronometer',
    name: 'Cronometer',
    description: 'Detailed nutrition tracking with micronutrient analysis for health optimization',
    category: 'fitness-app',
    // TODO: Replace with direct partner link once approved.
    url: 'https://cronometer.com/',
    price: '$49.99/year',
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
};

export const CALCULATOR_GUIDE_MAPPING: Record<CalculatorType, AffiliateGuide['slug'][]> = {
  bmi: ['best-smart-scales-body-composition', 'best-fitness-apps-macro-tracking'],
  tdee: ['best-fitness-apps-macro-tracking', 'meal-delivery-services-weight-loss'],
  calorie: ['best-fitness-apps-macro-tracking', 'meal-delivery-services-weight-loss'],
  'calories-burned': ['best-fitness-trackers-calorie-tracking', 'best-fitness-apps-macro-tracking'],
  'calories-burned-walking': ['best-fitness-trackers-calorie-tracking'],
  'calories-burned-running': ['best-fitness-trackers-calorie-tracking'],
  'calories-burned-cycling': ['best-fitness-trackers-calorie-tracking'],
  'calories-burned-swimming': ['best-fitness-trackers-calorie-tracking'],
  'body-fat': ['best-smart-scales-body-composition', 'best-fitness-trackers-calorie-tracking'],
  'body-frame-size': ['best-smart-scales-body-composition'],
  'body-fat-burn': ['best-fitness-trackers-calorie-tracking', 'best-fitness-apps-macro-tracking'],
  'calorie-deficit': ['meal-delivery-services-weight-loss', 'best-fitness-apps-macro-tracking'],
  'weight-management': [
    'meal-delivery-services-weight-loss',
    'best-kitchen-scales-portion-control',
  ],
  'maximum-fat-loss': ['meal-delivery-services-weight-loss', 'best-supplements-fitness-goals'],
  absi: ['best-smart-scales-body-composition', 'best-kitchen-scales-portion-control'],
  whr: ['best-smart-scales-body-composition', 'best-fitness-trackers-calorie-tracking'],
  'waist-to-height-ratio': [
    'best-smart-scales-body-composition',
    'best-fitness-trackers-calorie-tracking',
  ],
  conversions: ['best-kitchen-scales-portion-control'],
  macro: ['best-fitness-apps-macro-tracking', 'best-kitchen-scales-portion-control'],
  'carb-intake': ['best-fitness-apps-macro-tracking', 'best-kitchen-scales-portion-control'],
  'fat-intake': ['best-fitness-apps-macro-tracking', 'best-kitchen-scales-portion-control'],
  protein: ['best-supplements-fitness-goals', 'best-fitness-apps-macro-tracking'],
  'one-rep-max': ['best-home-gym-equipment-beginners', 'best-supplements-fitness-goals'],
  'blood-pressure': ['best-fitness-trackers-calorie-tracking'],
  'heart-rate-zones': ['best-fitness-trackers-calorie-tracking'],
  'target-heart-rate': ['best-fitness-trackers-calorie-tracking'],
  'max-heart-rate': ['best-fitness-trackers-calorie-tracking'],
  'ideal-weight': ['best-smart-scales-body-composition', 'meal-delivery-services-weight-loss'],
  'adjusted-body-weight': ['best-smart-scales-body-composition'],
  'body-surface-area': ['best-fitness-apps-macro-tracking'],
  'water-intake': ['best-fitness-trackers-calorie-tracking'],
  sleep: ['best-fitness-trackers-calorie-tracking'],
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
  'vo2-max': ['best-fitness-trackers-calorie-tracking'],
  'running-pace': ['best-fitness-trackers-calorie-tracking', 'best-home-gym-equipment-beginners'],
  age: ['best-fitness-apps-macro-tracking'],
  'lean-body-mass': ['best-smart-scales-body-composition', 'best-supplements-fitness-goals'],
  'army-body-fat': ['best-smart-scales-body-composition', 'best-fitness-trackers-calorie-tracking'],
  'steps-to-miles': ['best-fitness-trackers-calorie-tracking'],
  'steps-to-calories': ['best-fitness-trackers-calorie-tracking'],
  'resting-heart-rate': ['best-fitness-trackers-calorie-tracking'],
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
