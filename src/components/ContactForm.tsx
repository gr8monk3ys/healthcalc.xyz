'use client';

import React, { useState, FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage(data.message);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="neumorph p-6 rounded-lg text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-4" role="status" aria-live="polite">
          {statusMessage}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="ui-btn-soft text-sm">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} aria-busy={status === 'submitting'}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Your name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="your.email@example.com"
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
          required
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="ui-select w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          required
        >
          <option value="">Select a subject</option>
          <option value="question">General Question</option>
          <option value="feedback">Feedback</option>
          <option value="bug">Report a Bug</option>
          <option value="feature">Feature Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="ui-textarea w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Your message here..."
          autoComplete="off"
          enterKeyHint="send"
          required
          minLength={10}
          maxLength={5000}
        />
      </div>

      {status === 'error' && statusMessage && (
        <p className="text-sm text-red-600" role="alert">
          {statusMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="ui-btn-primary w-full py-3 px-4"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
