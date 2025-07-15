import type { MetadataRoute } from 'next';

import { CALCULATOR_CATALOG, CALCULATOR_HUBS } from '@/constants/calculatorCatalog';
import { getAllProgrammaticPaths } from '@/utils/programmaticSeo';

const BASE_URL = 'https://www.healthcalc.xyz';

const BLOG_SLUGS = [
  // Affiliate posts
  'best-smart-scales-body-composition',
  'best-fitness-trackers-calorie-tracking',
  'best-kitchen-scales-portion-control',
  'best-fitness-apps-macro-tracking',
  'meal-delivery-services-weight-loss',
  'best-supplements-fitness-goals',
  'best-home-gym-equipment-beginners',
  'best-running-shoes-weight-loss',
  'best-resistance-bands-strength-training',
  'best-body-tape-measures-composition',
  'best-protein-bars-on-the-go',
  'best-foam-rollers-recovery',
  'best-adjustable-dumbbells-home-gym',
  'best-water-bottles-hydration-tracking',
  'best-jump-ropes-cardio-weight-loss',
  'best-pull-up-bars-home-fitness',
  'best-kettlebells-full-body-workouts',
  'best-workout-headphones-gym',
  'best-blender-bottles-protein-shakes',
  'best-heart-rate-monitors-training',
  'best-treadmills-home-weight-loss',
  'best-pre-workout-supplements-energy',
  'best-rowing-machines-full-body',
  'best-creatine-supplements-muscle-gain',
  'best-weight-benches-home-gym',
  'best-exercise-bikes-weight-loss',
  'best-yoga-mats-home-workouts',
  'best-ab-rollers-core-training',
  'best-barbell-weight-sets-home-gym',
  'best-compression-gear-recovery',
  'best-massage-guns-recovery',
  'best-meal-prep-containers-weight-loss',
  'best-workout-gloves-weightlifting',
  'best-gym-bags-workout-gear',
  'best-fitness-trackers-kids',
  'best-sleep-trackers-recovery',
  // Informational posts
  'measuring-body-fat',
  'tdee-explained',
  'understanding-absi',
  'understanding-body-fat-percentage',
  'waist-to-hip-ratio-guide',
  'calorie-deficit-myths',
  'how-to-measure-body-fat-at-home',
  'heart-rate-zones-explained-training',
  'counting-calories-vs-tracking-macros',
  'cardio-vs-weights-fat-loss',
  'how-fast-can-you-build-muscle',
  'treadmill-vs-exercise-bike-calories',
  'adjustable-dumbbells-vs-barbell-home-gym',
  'smart-scale-vs-body-fat-calipers',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/embed`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/chains`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/dashboard`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fitness-age`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/report`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.65,
    },
    // Learn pages
    {
      url: `${BASE_URL}/learn`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/learn/calorie-basics`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/learn/macro-planning`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/learn/body-composition-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/learn/heart-rate-training`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/learn/walking-running-energy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/learn/pregnancy-health`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Utility pages
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about/editorial`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/calculator-widgets`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/saved-results`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/embed-terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Calculator pages from catalog
  const calculatorPages: MetadataRoute.Sitemap = CALCULATOR_CATALOG.map(calc => ({
    url: `${BASE_URL}/${calc.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Calculator hub pages
  const hubPages: MetadataRoute.Sitemap = CALCULATOR_HUBS.map(hub => ({
    url: `${BASE_URL}/calculators/${hub.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Programmatic result pages (Phase 2)
  const programmaticPages: MetadataRoute.Sitemap = getAllProgrammaticPaths().map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }));

  // Only English URLs for now. Non-English locale routes redirect to English
  // via middleware (302), so there is nothing to index for other locales.
  // Each entry gets a self-referencing hreflang=en + x-default pointing at
  // the same English URL so search engines know this is the canonical version.
  // TODO: Re-enable hreflang alternates when translations are complete
  const allEntries = [
    ...staticPages,
    ...calculatorPages,
    ...hubPages,
    ...blogPages,
    ...programmaticPages,
  ];

  return allEntries.map(entry => ({
    ...entry,
    alternates: {
      languages: {
        en: entry.url,
        'x-default': entry.url,
      },
    },
  }));
}
