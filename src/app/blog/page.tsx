import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | HealthCheck',
  description: 'Health and fitness articles, tips, and insights from HealthCheck.',
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">HealthCheck Blog</h1>
      <p className="mb-8">
        Explore our articles on health, fitness, nutrition, and body composition to help you make 
        informed decisions about your wellness journey.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Link href="/blog/understanding-body-fat-percentage" className="block">
          <div className="neumorph h-full p-6 rounded-lg transition-all hover:shadow-neumorph-inset">
            <div className="mb-4">
              <span className="inline-block bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">Body Composition</span>
              <span className="inline-block ml-2 text-xs text-gray-500">February 28, 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Understanding Body Fat Percentage: What's Healthy and Why It Matters</h2>
            <p className="text-gray-600 mb-4">
              Learn what body fat percentage really means, how it's measured, and what ranges are considered 
              healthy for men and women of different ages and fitness levels.
            </p>
            <span className="text-accent font-medium">Read Article →</span>
          </div>
        </Link>
        
        <Link href="/blog/calorie-deficit-myths" className="block">
          <div className="neumorph h-full p-6 rounded-lg transition-all hover:shadow-neumorph-inset">
            <div className="mb-4">
              <span className="inline-block bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">Weight Management</span>
              <span className="inline-block ml-2 text-xs text-gray-500">February 25, 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">5 Myths About Calorie Deficits Debunked</h2>
            <p className="text-gray-600 mb-4">
              We examine common misconceptions about calorie deficits, including the "3,500 calorie rule" 
              and why weight loss isn't always linear, even with consistent diet and exercise.
            </p>
            <span className="text-accent font-medium">Read Article →</span>
          </div>
        </Link>
        
        <Link href="/blog/tdee-explained" className="block">
          <div className="neumorph h-full p-6 rounded-lg transition-all hover:shadow-neumorph-inset">
            <div className="mb-4">
              <span className="inline-block bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">Energy Expenditure</span>
              <span className="inline-block ml-2 text-xs text-gray-500">February 20, 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">TDEE Explained: How Many Calories Do You Really Need?</h2>
            <p className="text-gray-600 mb-4">
              Understand the components of Total Daily Energy Expenditure, how it's calculated, and why 
              knowing your TDEE is crucial for effective weight management.
            </p>
            <span className="text-accent font-medium">Read Article →</span>
          </div>
        </Link>
        
        <Link href="/blog/measuring-body-fat" className="block">
          <div className="neumorph h-full p-6 rounded-lg transition-all hover:shadow-neumorph-inset">
            <div className="mb-4">
              <span className="inline-block bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">Measurement Methods</span>
              <span className="inline-block ml-2 text-xs text-gray-500">February 15, 2025</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">The Pros and Cons of Different Body Fat Measurement Methods</h2>
            <p className="text-gray-600 mb-4">
              From DEXA scans to skinfold calipers to Navy method measurements, we compare the accuracy, 
              accessibility, and practicality of various body fat assessment techniques.
            </p>
            <span className="text-accent font-medium">Read Article →</span>
          </div>
        </Link>
      </div>
      
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-4">
          Get the latest articles, calculator updates, and health tips delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="py-3 px-6 neumorph text-accent font-medium rounded-lg hover:shadow-neumorph-inset transition-all">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
