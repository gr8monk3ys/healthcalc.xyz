'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import InfoSection from '../InfoSection';
import type { BMIPageCopy } from '@/i18n/pages/bmi';

interface BMIUnderstandingProps {
  copy?: BMIPageCopy['understanding'];
}

const FALLBACK_COPY: BMIPageCopy['understanding'] = {
  title: 'Understanding Your BMI',
  intro:
    'BMI provides a simple numeric measure of your weight relative to height. It was developed in the 19th century by Belgian mathematician Adolphe Quetelet and is widely used as a screening tool to categorize weight status.',
  whyTitle: 'Why BMI Matters',
  whyBody:
    'Research has shown that BMI correlates with direct measures of body fat and with various health risks. Higher BMIs are associated with increased risk for conditions like:',
  whyList: [
    'Heart disease and stroke',
    'Type 2 diabetes',
    'High blood pressure',
    'Certain types of cancer',
    'Sleep apnea and breathing problems',
    'Osteoarthritis',
  ],
  beyondTitle: 'Beyond BMI',
  beyondBody:
    "While BMI is useful for population studies and general screening, it doesn't tell the complete story about your health. Other factors to consider include:",
  beyondList: [
    { label: 'Body composition:', body: 'The ratio of fat to muscle in your body' },
    {
      label: 'Fat distribution:',
      body: 'Where fat is stored on your body (abdominal fat carries higher health risks)',
    },
    { label: 'Waist circumference:', body: 'A measurement of abdominal fat' },
    { label: 'Lifestyle factors:', body: 'Diet quality, physical activity, sleep, and stress' },
    { label: 'Family history:', body: 'Genetic predisposition to certain conditions' },
  ],
  outroPrefix:
    'For a more comprehensive assessment of your health status, consider using our other calculators like the ',
  linkBodyFat: 'Body Fat Calculator',
  outroMiddle: ' or ',
  linkAbsi: 'ABSI Calculator',
  outroSuffix: ', and consult with healthcare professionals.',
};

const BMIUnderstanding: React.FC<BMIUnderstandingProps> = ({ copy }) => {
  const { localizePath } = useLocale();
  const content = copy ?? FALLBACK_COPY;

  return (
    <InfoSection title={content.title} className="mt-12">
      <p>{content.intro}</p>

      <h3 className="font-medium">{content.whyTitle}</h3>
      <p>{content.whyBody}</p>
      <ul className="list-disc pl-5 space-y-1">
        {content.whyList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3 className="font-medium">{content.beyondTitle}</h3>
      <p>{content.beyondBody}</p>
      <ul className="list-disc pl-5 space-y-1">
        {content.beyondList.map(item => (
          <li key={item.label}>
            <strong>{item.label}</strong> {item.body}
          </li>
        ))}
      </ul>

      <p>
        {content.outroPrefix}
        <Link href={localizePath('/body-fat')} className="text-accent hover:underline">
          {content.linkBodyFat}
        </Link>{' '}
        {content.outroMiddle}
        <Link href={localizePath('/absi')} className="text-accent hover:underline">
          {content.linkAbsi}
        </Link>
        {content.outroSuffix}
      </p>
    </InfoSection>
  );
};

export default BMIUnderstanding;
