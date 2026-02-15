import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Body Recomposition Calculator | Lose Fat & Build Muscle Simultaneously',
  description:
    'Calculate your calorie and macro targets for body recomposition. Get personalized calorie cycling recommendations to lose fat and build muscle at the same time with our science-based calculator.',
  keywords: [
    'body recomposition',
    'body recomp calculator',
    'lose fat build muscle',
    'calorie cycling',
    'macro calculator',
    'muscle gain',
    'fat loss',
    'lean bulk calculator',
    'recomp diet',
    'body transformation',
  ],
  openGraph: {
    title: 'Body Recomposition Calculator | Lose Fat & Build Muscle',
    description:
      'Calculate your calorie cycling and macro targets for body recomposition. Science-based approach to lose fat and build muscle simultaneously.',
    url: 'https://www.healthcalc.xyz/body-recomposition',
    type: 'website',
    images: [
      {
        url: 'https://www.healthcalc.xyz/images/og-body-recomposition.png',
        width: 1200,
        height: 630,
        alt: 'Body Recomposition Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Recomposition Calculator | Lose Fat & Build Muscle',
    description:
      'Calculate your calorie cycling and macro targets for body recomposition. Science-based approach to simultaneous fat loss and muscle gain.',
    images: ['https://www.healthcalc.xyz/images/og-body-recomposition.png'],
  },
  alternates: {
    canonical: 'https://www.healthcalc.xyz/body-recomposition',
  },
};

export default function BodyRecompositionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
