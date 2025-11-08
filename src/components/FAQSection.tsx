'use client';

import React, { useState } from 'react';
import StructuredData, { createFAQSchema } from './StructuredData';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  className?: string;
}

/**
 * FAQ Section component with structured data
 * Displays a list of FAQs with expandable answers
 * Adds FAQ schema for SEO
 */
export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  className = '',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`neumorph p-6 rounded-lg my-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left font-medium py-2 focus:outline-none"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="pr-8">{faq.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`mt-2 transition-all duration-200 overflow-hidden ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="prose prose-sm max-w-none text-gray-600">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add structured data for FAQs */}
      <StructuredData data={createFAQSchema(faqs)} />
    </div>
  );
}
