import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

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
        { title: 'About', url: '/about', description: 'Learn about our mission and team' },
        { title: 'Contact', url: '/contact', description: 'Get in touch with us' },
        { title: 'Blog', url: '/blog', description: 'Health and fitness articles and guides' },
      ],
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
          title: 'Conversions',
          url: '/conversions',
          description: 'Convert between different units of measurement',
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
              item: 'https://www.heathcheck.info/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Sitemap',
              item: 'https://www.heathcheck.info/sitemap',
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
          url: 'https://www.heathcheck.info/sitemap',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: sections.flatMap((section, sectionIndex) =>
              section.pages.map((page, pageIndex) => ({
                '@type': 'ListItem',
                position: sectionIndex * 100 + pageIndex + 1,
                url: `https://www.heathcheck.info${page.url}`,
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
