'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import InfoSection from '../InfoSection';

const ABSIUnderstanding: React.FC = () => {
  const { localizePath } = useLocale();

  return (
    <InfoSection title="Understanding ABSI" className="mt-12">
      <p>
        A Body Shape Index (ABSI) is a relatively new metric that provides insights beyond what BMI
        can tell you. By considering your waist circumference in relation to your height and weight,
        ABSI helps assess the health risks associated with your body shape.
      </p>

      <h3 className="font-medium mt-4">ABSI vs. Other Body Composition Metrics</h3>
      <p className="mb-2">Several metrics are used to assess body composition and health risks:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-medium">BMI (Body Mass Index):</span> Measures overall weight
          relative to height, but doesn't distinguish between fat and muscle or consider fat
          distribution
        </li>
        <li>
          <span className="font-medium">Waist Circumference:</span> Measures abdominal fat directly,
          but doesn't account for overall body size
        </li>
        <li>
          <span className="font-medium">Waist-to-Hip Ratio:</span> Compares waist and hip
          circumferences to assess fat distribution pattern
        </li>
        <li>
          <span className="font-medium">ABSI:</span> Combines waist circumference with height and
          weight to specifically assess the health risk of central obesity
        </li>
        <li>
          <span className="font-medium">Body Fat Percentage:</span> Measures the actual proportion
          of fat in your body, regardless of where it's distributed
        </li>
      </ul>

      <p className="mt-2">
        For the most comprehensive assessment, consider using multiple metrics. For example, check
        your BMI, ABSI, and body fat percentage to get a more complete picture of your body
        composition and health risks.
      </p>

      <h3 className="font-medium mt-4">The Science Behind ABSI</h3>
      <p className="mb-2">
        ABSI was developed by researchers Nir Y. Krakauer and Jesse C. Krakauer in 2012. Their
        study, published in PLOS ONE, analyzed data from over 14,000 adults in the National Health
        and Nutrition Examination Survey (NHANES) 1999-2004.
      </p>
      <p className="mb-2">
        They found that ABSI was a better predictor of premature death than BMI or waist
        circumference alone. Specifically, they observed that:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>ABSI was strongly associated with mortality risk, independent of other predictors</li>
        <li>
          The association between ABSI and mortality was consistent across age, sex, ethnicity, and
          weight categories
        </li>
        <li>People with high ABSI had an increased risk of death even if they had a normal BMI</li>
      </ul>
      <p className="mt-2">
        Subsequent studies have confirmed these findings and shown that ABSI is particularly useful
        for identifying health risks in people with normal or overweight BMI.
      </p>

      <h3 className="font-medium mt-4">Interpreting Your ABSI Z-Score</h3>
      <p className="mb-2">
        Your ABSI z-score tells you how your ABSI compares to the average for people of your age and
        sex:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>A z-score of 0 means your ABSI is exactly average</li>
        <li>A positive z-score means your ABSI is above average (higher risk)</li>
        <li>A negative z-score means your ABSI is below average (lower risk)</li>
      </ul>
      <p className="mt-2">
        The further your z-score is from zero, the more your ABSI deviates from the average.
        Research suggests that each standard deviation increase in ABSI (approximately a z-score
        increase of 1) is associated with a 33% higher risk of premature death.
      </p>

      <h3 className="font-medium mt-4">Improving Your ABSI</h3>
      <p className="mb-2">
        If your ABSI is high, you may want to focus on reducing your waist circumference. Here are
        some strategies that can help:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">Target abdominal fat:</span> Exercises that engage your
          core, like planks and Russian twists, can help strengthen abdominal muscles
        </li>
        <li>
          <span className="font-medium">Cardiovascular exercise:</span> Activities like walking,
          running, swimming, or cycling can help reduce overall body fat, including abdominal fat
        </li>
        <li>
          <span className="font-medium">Strength training:</span> Building muscle mass can improve
          your body composition and metabolic health
        </li>
        <li>
          <span className="font-medium">Healthy diet:</span> Focus on whole foods, lean proteins,
          fruits, vegetables, and whole grains while limiting processed foods, added sugars, and
          excessive alcohol
        </li>
        <li>
          <span className="font-medium">Stress management:</span> Chronic stress can contribute to
          abdominal fat accumulation, so practices like meditation, yoga, or deep breathing may help
        </li>
        <li>
          <span className="font-medium">Adequate sleep:</span> Poor sleep is associated with
          increased abdominal fat, so aim for 7-9 hours of quality sleep per night
        </li>
      </ul>

      <p className="mt-4">
        For more comprehensive health assessments, consider using our other calculators like the{' '}
        <Link href={localizePath('/bmi')} className="text-accent hover:underline">
          BMI Calculator
        </Link>
        ,{' '}
        <Link href={localizePath('/body-fat')} className="text-accent hover:underline">
          Body Fat Calculator
        </Link>
        , or{' '}
        <Link href={localizePath('/whr')} className="text-accent hover:underline">
          Waist-to-Hip Ratio Calculator
        </Link>
        .
      </p>
    </InfoSection>
  );
};

export default ABSIUnderstanding;
