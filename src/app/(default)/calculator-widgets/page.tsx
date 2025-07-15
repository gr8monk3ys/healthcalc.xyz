import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import EmbedWidgetPicker from '@/components/calculators/EmbedWidgetPicker';
import { getEmbedPartners, getEmbedShowcase } from '@/data/embedShowcase';

export const metadata: Metadata = {
  title: 'Calculator Widgets | HealthCheck',
  description:
    'Embed HealthCheck calculators on your site with an attribution link. Request approval, copy the code, and go live.',
};

export default async function CalculatorWidgetsPage() {
  const [partners, showcase] = await Promise.all([getEmbedPartners(), getEmbedShowcase()]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        customItems={[
          { name: 'Home', path: '/' },
          { name: 'Calculator Widgets', path: '/calculator-widgets' },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Calculator Widgets</h1>
        <p className="text-slate-700 dark:text-slate-200/80">
          Add HealthCheck calculators to your site and keep the attribution link included. We review
          embed requests to ensure quality placements and accurate context.
        </p>
      </div>

      <EmbedWidgetPicker />

      <div className="glass-panel rounded-3xl p-7 md:p-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">Featured Embed Partners</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Trusted by coaches, bloggers, and wellness teams who embed HealthCheck calculators.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {partners.map(partner => (
            <div key={partner.name} className="flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={180}
                height={48}
                className="h-12 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-7 md:p-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">Embed Guidelines</h2>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2">
          <li>Keep the “Powered by HealthCheck” attribution link visible below the widget.</li>
          <li>Don’t modify the embed code beyond width/height adjustments.</li>
          <li>Use the calculator in context so readers understand the inputs and outputs.</li>
          <li>We reserve the right to revoke embed access for misleading use cases.</li>
        </ul>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          By embedding a calculator, you agree to our{' '}
          <Link href="/embed-terms" className="text-accent hover:underline">
            Embed Terms
          </Link>
          .
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-7 md:p-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">Recently Embedded</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          A few examples of partners using HealthCheck calculators (submit yours to be featured).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showcase.map(item => (
            <div key={item.name} className="glass-panel-strong rounded-2xl p-5">
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {item.calculator}
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-400/80 mt-2">{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
