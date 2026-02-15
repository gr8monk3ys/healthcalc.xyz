import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Embed Terms | HealthCheck',
  description: 'Terms for embedding HealthCheck calculators on external websites.',
};

export default function EmbedTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        customItems={[
          { name: 'Home', path: '/' },
          { name: 'Embed Terms', path: '/embed-terms' },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">Embed Terms</h1>

      <div className="space-y-6 text-sm text-gray-600">
        <section>
          <h2 className="text-xl font-semibold mb-2">Attribution Required</h2>
          <p>
            All embedded calculators must display the “Powered by HealthCheck” attribution link
            directly beneath the widget. Removing or obscuring attribution is not permitted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Allowed Modifications</h2>
          <p>
            You may adjust iframe width and height to fit your layout. You may not alter calculator
            content, branding, or functionality, or remove tracking parameters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Accuracy & Context</h2>
          <p>
            Embed calculators in relevant content so users understand inputs and outputs. Avoid
            misleading placement or claims that imply medical advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Revocation</h2>
          <p>
            We reserve the right to revoke embed access if placements are misleading, violate terms,
            or damage user trust. We may also update widgets or attribution requirements at any
            time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>Questions about embeds or partnerships? Email us at info@healthcalc.xyz.</p>
        </section>
      </div>
    </div>
  );
}
