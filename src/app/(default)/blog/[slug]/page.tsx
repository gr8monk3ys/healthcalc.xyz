'use client';

import React, { Suspense } from 'react';
import { notFound, useParams } from 'next/navigation';
import { BlogLoadingFallback } from '@/components/DynamicComponent';
import dynamic from 'next/dynamic';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { BlogEmailCapture } from '@/components/BlogEmailCapture';
import { AuthorBio } from '@/components/AuthorBio';

// Map of blog post slugs to their dynamic components
const BLOG_POSTS: Record<string, React.ComponentType<Record<string, never>>> = {
  'measuring-body-fat': dynamic(() => import('@/app/blog/measuring-body-fat/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'tdee-explained': dynamic(() => import('@/app/blog/tdee-explained/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'understanding-absi': dynamic(() => import('@/app/blog/understanding-absi/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'understanding-body-fat-percentage': dynamic(
    () => import('@/app/blog/understanding-body-fat-percentage/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'waist-to-hip-ratio-guide': dynamic(() => import('@/app/blog/waist-to-hip-ratio-guide/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'calorie-deficit-myths': dynamic(() => import('@/app/blog/calorie-deficit-myths/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'best-smart-scales-body-composition': dynamic(
    () => import('@/app/blog/best-smart-scales-body-composition/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-fitness-trackers-calorie-tracking': dynamic(
    () => import('@/app/blog/best-fitness-trackers-calorie-tracking/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-kitchen-scales-portion-control': dynamic(
    () => import('@/app/blog/best-kitchen-scales-portion-control/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-fitness-apps-macro-tracking': dynamic(
    () => import('@/app/blog/best-fitness-apps-macro-tracking/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'meal-delivery-services-weight-loss': dynamic(
    () => import('@/app/blog/meal-delivery-services-weight-loss/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-supplements-fitness-goals': dynamic(
    () => import('@/app/blog/best-supplements-fitness-goals/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-home-gym-equipment-beginners': dynamic(
    () => import('@/app/blog/best-home-gym-equipment-beginners/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-running-shoes-weight-loss': dynamic(
    () => import('@/app/blog/best-running-shoes-weight-loss/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-resistance-bands-strength-training': dynamic(
    () => import('@/app/blog/best-resistance-bands-strength-training/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-body-tape-measures-composition': dynamic(
    () => import('@/app/blog/best-body-tape-measures-composition/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-protein-bars-on-the-go': dynamic(
    () => import('@/app/blog/best-protein-bars-on-the-go/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-foam-rollers-recovery': dynamic(
    () => import('@/app/blog/best-foam-rollers-recovery/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-adjustable-dumbbells-home-gym': dynamic(
    () => import('@/app/blog/best-adjustable-dumbbells-home-gym/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-water-bottles-hydration-tracking': dynamic(
    () => import('@/app/blog/best-water-bottles-hydration-tracking/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-jump-ropes-cardio-weight-loss': dynamic(
    () => import('@/app/blog/best-jump-ropes-cardio-weight-loss/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-pull-up-bars-home-fitness': dynamic(
    () => import('@/app/blog/best-pull-up-bars-home-fitness/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-kettlebells-full-body-workouts': dynamic(
    () => import('@/app/blog/best-kettlebells-full-body-workouts/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-workout-headphones-gym': dynamic(
    () => import('@/app/blog/best-workout-headphones-gym/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-blender-bottles-protein-shakes': dynamic(
    () => import('@/app/blog/best-blender-bottles-protein-shakes/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-heart-rate-monitors-training': dynamic(
    () => import('@/app/blog/best-heart-rate-monitors-training/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-treadmills-home-weight-loss': dynamic(
    () => import('@/app/blog/best-treadmills-home-weight-loss/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-pre-workout-supplements-energy': dynamic(
    () => import('@/app/blog/best-pre-workout-supplements-energy/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-rowing-machines-full-body': dynamic(
    () => import('@/app/blog/best-rowing-machines-full-body/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-creatine-supplements-muscle-gain': dynamic(
    () => import('@/app/blog/best-creatine-supplements-muscle-gain/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-weight-benches-home-gym': dynamic(
    () => import('@/app/blog/best-weight-benches-home-gym/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-exercise-bikes-weight-loss': dynamic(
    () => import('@/app/blog/best-exercise-bikes-weight-loss/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-yoga-mats-home-workouts': dynamic(
    () => import('@/app/blog/best-yoga-mats-home-workouts/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-ab-rollers-core-training': dynamic(
    () => import('@/app/blog/best-ab-rollers-core-training/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-barbell-weight-sets-home-gym': dynamic(
    () => import('@/app/blog/best-barbell-weight-sets-home-gym/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-compression-gear-recovery': dynamic(
    () => import('@/app/blog/best-compression-gear-recovery/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-massage-guns-recovery': dynamic(
    () => import('@/app/blog/best-massage-guns-recovery/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-meal-prep-containers-weight-loss': dynamic(
    () => import('@/app/blog/best-meal-prep-containers-weight-loss/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-workout-gloves-weightlifting': dynamic(
    () => import('@/app/blog/best-workout-gloves-weightlifting/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-gym-bags-workout-gear': dynamic(
    () => import('@/app/blog/best-gym-bags-workout-gear/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-fitness-trackers-kids': dynamic(
    () => import('@/app/blog/best-fitness-trackers-kids/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'best-sleep-trackers-recovery': dynamic(
    () => import('@/app/blog/best-sleep-trackers-recovery/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'cardio-vs-weights-fat-loss': dynamic(
    () => import('@/app/blog/cardio-vs-weights-fat-loss/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'counting-calories-vs-tracking-macros': dynamic(
    () => import('@/app/blog/counting-calories-vs-tracking-macros/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'heart-rate-zones-explained-training': dynamic(
    () => import('@/app/blog/heart-rate-zones-explained-training/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'how-fast-can-you-build-muscle': dynamic(
    () => import('@/app/blog/how-fast-can-you-build-muscle/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'how-to-measure-body-fat-at-home': dynamic(
    () => import('@/app/blog/how-to-measure-body-fat-at-home/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'treadmill-vs-exercise-bike-calories': dynamic(
    () => import('@/app/blog/treadmill-vs-exercise-bike-calories/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'adjustable-dumbbells-vs-barbell-home-gym': dynamic(
    () => import('@/app/blog/adjustable-dumbbells-vs-barbell-home-gym/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
  'smart-scale-vs-body-fat-calipers': dynamic(
    () => import('@/app/blog/smart-scale-vs-body-fat-calipers/content'),
    {
      loading: () => <BlogLoadingFallback />,
    }
  ),
};

const AFFILIATE_BLOG_SLUGS = new Set([
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
  'adjustable-dumbbells-vs-barbell-home-gym',
  'smart-scale-vs-body-fat-calipers',
]);

/**
 * Dynamic blog post page that uses code splitting to load content
 */
export default function BlogPost(): React.JSX.Element {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as string;

  // Get the dynamic component for this slug
  const PostContent = BLOG_POSTS[slug];

  if (!PostContent) {
    notFound();
  }

  return (
    <Suspense fallback={<BlogLoadingFallback />}>
      <AuthorBio variant="compact" className="mb-6" />
      <PostContent />
      <BlogEmailCapture className="mt-8 mb-8" />
      {AFFILIATE_BLOG_SLUGS.has(slug) && <AffiliateDisclosure />}
    </Suspense>
  );
}
