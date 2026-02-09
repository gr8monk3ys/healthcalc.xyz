import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intermittent Fasting Calculator | Personalized IF Schedule & Meal Planning',
  description:
    'Calculate your personalized intermittent fasting schedule with our science-based IF calculator. Get eating windows, meal timing, calorie targets, and macro distribution for 16:8, 18:6, OMAD, and more protocols.',
  keywords: [
    'intermittent fasting calculator',
    '16:8 fasting',
    '18:6 fasting',
    'OMAD calculator',
    'fasting schedule',
    'eating window calculator',
    'IF meal planning',
    'fasting calorie calculator',
    'time-restricted eating',
    '5:2 diet calculator',
    'alternate day fasting',
    'fasting for weight loss',
  ],
  openGraph: {
    title: 'Intermittent Fasting Calculator | Personalized IF Schedule',
    description:
      'Calculate your optimal intermittent fasting schedule. Get personalized eating windows, meal timing, and nutrition targets for 16:8, 18:6, OMAD, and other IF protocols.',
    url: 'https://www.healthcalc.xyz/intermittent-fasting',
    type: 'website',
    images: [
      {
        url: 'https://www.healthcalc.xyz/og-intermittent-fasting.png',
        width: 1200,
        height: 630,
        alt: 'Intermittent Fasting Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intermittent Fasting Calculator | Personalized IF Schedule',
    description:
      'Calculate your optimal intermittent fasting schedule with personalized eating windows, meal timing, and nutrition targets.',
    images: ['https://www.healthcalc.xyz/og-intermittent-fasting.png'],
  },
  alternates: {
    canonical: 'https://www.healthcalc.xyz/intermittent-fasting',
  },
};

export default function IntermittentFastingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
