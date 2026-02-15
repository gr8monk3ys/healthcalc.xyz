import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { CALCULATOR_HUBS } from '@/constants/calculatorCatalog';

// Metadata for the sitemap page
export const metadata: Metadata = {
  title: 'Sitemap | HealthCheck',
  description:
    'A complete list of all pages on HealthCheck, including calculators, articles, and information pages.',
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Sitemap page component
 * Displays all pages on the site in a user-friendly format
 */
export default function Sitemap() {
  // Define site sections
  const sections = [
    {
      title: 'Main Pages',
      pages: [
        {
          title: 'Home',
          url: '/',
          description: 'Health and fitness calculators for body fat, BMI, TDEE, and more',
        },
        {
          title: 'Calculator Categories',
          url: '/calculators',
          description: 'Browse calculators by category',
        },
        { title: 'About', url: '/about', description: 'Learn about our mission and team' },
        { title: 'Contact', url: '/contact', description: 'Get in touch with us' },
        { title: 'Blog', url: '/blog', description: 'Health and fitness articles and guides' },
        {
          title: 'Health Guides',
          url: '/learn',
          description: 'Quick guides for key health metrics',
        },
        {
          title: 'Calculator Widgets',
          url: '/calculator-widgets',
          description: 'Embed HealthCheck calculators with attribution',
        },
        {
          title: 'Embed Terms',
          url: '/embed-terms',
          description: 'Terms for embedding HealthCheck calculators',
        },
      ],
    },
    {
      title: 'Guides',
      pages: [
        {
          title: 'Health Guides',
          url: '/learn',
          description: 'Educational hubs for key health metrics',
        },
        {
          title: 'Calorie Basics',
          url: '/learn/calorie-basics',
          description: 'How calories work for maintenance, loss, and gain',
        },
        {
          title: 'Macro Planning',
          url: '/learn/macro-planning',
          description: 'Set carb, fat, and protein targets',
        },
        {
          title: 'Heart Rate Training',
          url: '/learn/heart-rate-training',
          description: 'Use max heart rate and zones to train smarter',
        },
        {
          title: 'Body Composition Guide',
          url: '/learn/body-composition-guide',
          description: 'Understand BMI, body fat, and lean mass',
        },
        {
          title: 'Walking & Running Energy',
          url: '/learn/walking-running-energy',
          description: 'Estimate calories burned from walking or running',
        },
        {
          title: 'Pregnancy Health',
          url: '/learn/pregnancy-health',
          description: 'Due dates and pregnancy weight guidance',
        },
      ],
    },
    {
      title: 'Calculator Categories',
      pages: CALCULATOR_HUBS.map(hub => ({
        title: hub.title,
        url: `/calculators/${hub.slug}`,
        description: hub.description,
      })),
    },
    {
      title: 'Calculators',
      pages: [
        { title: 'BMI Calculator', url: '/bmi', description: 'Calculate your Body Mass Index' },
        {
          title: 'Body Fat Calculator',
          url: '/body-fat',
          description: 'Estimate your body fat percentage',
        },
        {
          title: 'TDEE Calculator',
          url: '/tdee',
          description: 'Calculate your Total Daily Energy Expenditure',
        },
        {
          title: 'Calorie Calculator',
          url: '/calorie',
          description: 'Calculate daily calorie needs for maintenance or goals',
        },
        {
          title: 'Calories Burned Calculator',
          url: '/calories-burned',
          description: 'Estimate calories burned from workouts',
        },
        {
          title: 'Calories Burned Walking Calculator',
          url: '/calories-burned-walking',
          description: 'Estimate calories burned from walking',
        },
        {
          title: 'Calories Burned Running Calculator',
          url: '/calories-burned-running',
          description: 'Estimate calories burned from running',
        },
        {
          title: 'Calories Burned Cycling Calculator',
          url: '/calories-burned-cycling',
          description: 'Estimate calories burned from cycling',
        },
        {
          title: 'Calories Burned Swimming Calculator',
          url: '/calories-burned-swimming',
          description: 'Estimate calories burned from swimming',
        },
        {
          title: 'Body Fat Burn Calculator',
          url: '/body-fat-burn',
          description: 'Calculate calories burned during activities',
        },
        {
          title: 'Calorie Deficit Calculator',
          url: '/calorie-deficit',
          description: 'Calculate your optimal calorie deficit',
        },
        {
          title: 'Weight Management Calculator',
          url: '/weight-management',
          description: 'Plan your weight loss or gain journey',
        },
        {
          title: 'Maximum Fat Loss Calculator',
          url: '/maximum-fat-loss',
          description: 'Calculate maximum sustainable fat loss',
        },
        {
          title: 'ABSI Calculator',
          url: '/absi',
          description: 'Calculate your A Body Shape Index',
        },
        {
          title: 'Waist-to-Hip Ratio Calculator',
          url: '/whr',
          description: 'Calculate your Waist-to-Hip Ratio',
        },
        {
          title: 'Waist-to-Height Ratio Calculator',
          url: '/waist-to-height-ratio',
          description: 'Calculate your Waist-to-Height Ratio',
        },
        {
          title: 'Body Frame Size Calculator',
          url: '/body-frame-size',
          description: 'Estimate body frame size from wrist measurements',
        },
        {
          title: 'Adjusted Body Weight Calculator',
          url: '/adjusted-body-weight',
          description: 'Estimate adjusted body weight based on ideal weight',
        },
        {
          title: 'Army Body Fat Calculator',
          url: '/army-body-fat',
          description: 'Estimate body fat with circumference measurements',
        },
        {
          title: 'Conversions',
          url: '/conversions',
          description: 'Convert between different units of measurement',
        },
        {
          title: 'Age Calculator',
          url: '/age',
          description: 'Calculate age in years, months, and days',
        },
        {
          title: 'Macro Calculator',
          url: '/macro',
          description: 'Calculate macro targets based on calories and goals',
        },
        {
          title: 'Carb Intake Calculator',
          url: '/carb-intake',
          description: 'Calculate daily carbohydrate targets',
        },
        {
          title: 'Fat Intake Calculator',
          url: '/fat-intake',
          description: 'Calculate daily fat targets',
        },
        {
          title: 'Protein Calculator',
          url: '/protein',
          description: 'Calculate daily protein intake targets',
        },
        {
          title: 'One Rep Max Calculator',
          url: '/one-rep-max',
          description: 'Estimate your one rep max strength',
        },
        {
          title: 'Ideal Weight Calculator',
          url: '/ideal-weight',
          description: 'Estimate your ideal weight range',
        },
        {
          title: 'Lean Body Mass Calculator',
          url: '/lean-body-mass',
          description: 'Estimate lean body mass from height and weight',
        },
        {
          title: 'Body Surface Area Calculator',
          url: '/body-surface-area',
          description: 'Calculate body surface area from height and weight',
        },
        {
          title: 'Max Heart Rate Calculator',
          url: '/max-heart-rate',
          description: 'Estimate your maximum heart rate',
        },
        {
          title: 'Heart Rate Zones Calculator',
          url: '/heart-rate-zones',
          description: 'Calculate training zones for cardio',
        },
        {
          title: 'Target Heart Rate Calculator',
          url: '/target-heart-rate',
          description: 'Calculate target heart rate zones',
        },
        {
          title: 'Resting Heart Rate Calculator',
          url: '/resting-heart-rate',
          description: 'Classify resting heart rate fitness',
        },
        {
          title: 'Water Intake Calculator',
          url: '/water-intake',
          description: 'Estimate daily hydration needs',
        },
        {
          title: 'Sleep Calculator',
          url: '/sleep',
          description: 'Find optimal sleep and wake times',
        },
        {
          title: 'Blood Pressure Calculator',
          url: '/blood-pressure',
          description: 'Check your blood pressure category',
        },
        {
          title: 'BMR Calculator',
          url: '/bmr',
          description: 'Calculate basal metabolic rate',
        },
        {
          title: 'VO2 Max Calculator',
          url: '/vo2-max',
          description: 'Estimate cardiovascular fitness',
        },
        {
          title: 'Running Pace Calculator',
          url: '/running-pace',
          description: 'Calculate pace per mile or kilometer',
        },
        {
          title: 'Pregnancy Due Date Calculator',
          url: '/pregnancy-due-date',
          description: 'Estimate pregnancy due date',
        },
        {
          title: 'Due Date by Conception Calculator',
          url: '/due-date-by-conception',
          description: 'Estimate due date from conception date',
        },
        {
          title: 'Pregnancy Weight Gain Calculator',
          url: '/pregnancy-weight-gain',
          description: 'Estimate recommended pregnancy weight gain',
        },
        {
          title: 'Ovulation Calculator',
          url: '/ovulation',
          description: 'Estimate ovulation and fertile window',
        },
        {
          title: 'Steps to Miles Calculator',
          url: '/steps-to-miles',
          description: 'Convert steps into distance',
        },
        {
          title: 'Steps to Calories Calculator',
          url: '/steps-to-calories',
          description: 'Estimate calories burned from steps',
        },
      ],
    },
    {
      title: 'Blog Articles',
      pages: [
        {
          title: 'TDEE Explained',
          url: '/blog/tdee-explained',
          description: 'How many calories do you really need?',
        },
        {
          title: 'Calorie Deficit Myths',
          url: '/blog/calorie-deficit-myths',
          description: '5 myths about calorie deficits debunked',
        },
        {
          title: 'Measuring Body Fat',
          url: '/blog/measuring-body-fat',
          description: 'Pros and cons of different methods',
        },
        {
          title: 'Understanding ABSI',
          url: '/blog/understanding-absi',
          description: 'A better measure of body shape',
        },
        {
          title: 'Understanding Body Fat Percentage',
          url: '/blog/understanding-body-fat-percentage',
          description: 'What the numbers really mean',
        },
        {
          title: 'Waist-to-Hip Ratio Guide',
          url: '/blog/waist-to-hip-ratio-guide',
          description: 'What it means for your health',
        },
      ],
    },
    {
      title: 'Legal Pages',
      pages: [
        {
          title: 'Privacy Policy',
          url: '/privacy',
          description: 'How we collect, use, and protect your data',
        },
        {
          title: 'Terms of Service',
          url: '/terms',
          description: 'Rules and guidelines for using our website',
        },
        {
          title: 'Medical Disclaimer',
          url: '/disclaimer',
          description: 'Limitations of our calculators and content',
        },
      ],
    },
    {
      title: 'Utility Pages',
      pages: [
        {
          title: 'Search',
          url: '/search',
          description: 'Find calculators, articles, and information',
        },
        {
          title: 'Sitemap',
          url: '/sitemap',
          description: 'A complete list of all pages on the site',
        },
        {
          title: 'XML Sitemap',
          url: '/sitemap.xml',
          description: 'XML sitemap for search engines',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        customItems={[
          { name: 'Home', path: '/' },
          { name: 'Sitemap', path: '/sitemap' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>

      <p className="text-gray-600 mb-8">
        Welcome to the HealthCheck sitemap. This page provides a complete list of all pages on our
        website, organized by category for easy navigation.
      </p>

      {sections.map((section, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-accent">{section.title}</h2>
          <div className="neumorph rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {section.pages.map((page, pageIndex) => (
                <li key={pageIndex}>
                  <Link href={page.url} className="block p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="font-medium text-accent">{page.title}</span>
                      <span className="text-sm text-gray-500 mt-1 sm:mt-0">{page.url}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="mt-12 p-6 neumorph rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Looking for Something Specific?</h2>
        <p className="mb-4">
          If you can't find what you're looking for, try using our search feature:
        </p>
        <Link
          href="/search"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
        >
          Search HealthCheck
        </Link>
      </div>

      {/* Structured data for breadcrumb */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.healthcalc.xyz/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Sitemap',
              item: 'https://www.healthcalc.xyz/sitemap',
            },
          ],
        }}
      />

      {/* Structured data for the sitemap page */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Sitemap',
          description:
            'A complete list of all pages on HealthCheck, including calculators, articles, and information pages.',
          url: 'https://www.healthcalc.xyz/sitemap',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: sections.flatMap((section, sectionIndex) =>
              section.pages.map((page, pageIndex) => ({
                '@type': 'ListItem',
                position: sectionIndex * 100 + pageIndex + 1,
                url: `https://www.healthcalc.xyz${page.url}`,
                name: page.title,
                description: page.description,
              }))
            ),
          },
        }}
      />
    </div>
  );
}
