import React from 'react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | HealthCheck',
  description: 'Get in touch with the HealthCheck team for questions, feedback, or support.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="neumorph p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6">
            Have questions, feedback, or suggestions? We&apos;d love to hear from you! Fill out the
            form and we&apos;ll get back to you as soon as possible.
          </p>

          <ContactForm />
        </div>

        <div>
          <div className="neumorph p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-5 w-5 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">info@healthcalc.xyz</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-5 w-5 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Response Time</p>
                  <p className="text-sm text-gray-600">
                    We aim to respond within 1-2 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="neumorph p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">How accurate are your calculators?</h3>
                <p className="text-sm text-gray-600">
                  Our calculators use scientifically validated formulas, but results should be
                  considered estimates. For clinical accuracy, consult healthcare professionals.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Do you store my personal data?</h3>
                <p className="text-sm text-gray-600">
                  No, all calculations are performed locally in your browser. We don't store or
                  transmit your personal measurement data to our servers.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Can I use your calculators for my clients?</h3>
                <p className="text-sm text-gray-600">
                  Yes, fitness professionals are welcome to use our calculators with their clients.
                  Please refer to our Terms of Service for commercial usage details.
                </p>
              </div>

              <div>
                <h3 className="font-medium">I found a bug or have a feature request</h3>
                <p className="text-sm text-gray-600">
                  Please use the contact form to report bugs or suggest features. We appreciate your
                  feedback and continuously work to improve our calculators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
