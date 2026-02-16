'use client';

import React from 'react';
import InfoSection from '../InfoSection';
import type { BMIPageCopy } from '@/i18n/pages/bmi';

interface BMIInfoProps {
  copy?: BMIPageCopy['info'];
}

const FALLBACK_COPY: BMIPageCopy['info'] = {
  title: 'About BMI',
  intro:
    "Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.",
  adultCategoriesTitle: 'BMI Categories for Adults:',
  adultCategories: [
    { label: 'Underweight:', body: 'BMI less than 18.5' },
    { label: 'Normal weight:', body: 'BMI 18.5 to 24.9' },
    { label: 'Overweight:', body: 'BMI 25 to 29.9' },
    { label: 'Obesity:', body: 'BMI 30 or greater' },
  ],
  youthTitle: 'For Children and Teens (2-19 years):',
  youthIntro:
    'BMI is calculated the same way, but the interpretation is different. Results are compared to typical values for other children of the same age and sex, using percentiles:',
  youthCategories: [
    { label: 'Underweight:', body: 'Less than the 5th percentile' },
    { label: 'Healthy weight:', body: '5th to 84th percentile' },
    { label: 'Overweight:', body: '85th to 94th percentile' },
    { label: 'Obesity:', body: '95th percentile or greater' },
  ],
  limitationsTitle: 'Limitations of BMI:',
  limitationsBody:
    "BMI is a useful screening tool, but it has limitations. It doesn't distinguish between muscle and fat, nor does it account for factors like age, sex, ethnicity, or muscle mass. Athletes and muscular individuals may have a high BMI without excess fat.",
};

const BMIInfo: React.FC<BMIInfoProps> = ({ copy }) => {
  const content = copy ?? FALLBACK_COPY;

  return (
    <InfoSection title={content.title}>
      <p>{content.intro}</p>

      <h3 className="font-medium">{content.adultCategoriesTitle}</h3>
      <ul className="list-disc pl-5 space-y-1">
        {content.adultCategories.map(item => (
          <li key={item.label}>
            <strong>{item.label}</strong> {item.body}
          </li>
        ))}
      </ul>

      <h3 className="font-medium">{content.youthTitle}</h3>
      <p>{content.youthIntro}</p>
      <ul className="list-disc pl-5 space-y-1">
        {content.youthCategories.map(item => (
          <li key={item.label}>
            <strong>{item.label}</strong> {item.body}
          </li>
        ))}
      </ul>

      <h3 className="font-medium">{content.limitationsTitle}</h3>
      <p>{content.limitationsBody}</p>
    </InfoSection>
  );
};

export default BMIInfo;
