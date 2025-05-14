'use client';

import React, { useState, FormEvent } from 'react';
import { useLocale } from '@/context/LocaleContext';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function useContactFormState() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  return {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    status,
    setStatus,
    statusMessage,
    setStatusMessage,
  };
}
export default function ContactForm() {
  const { t } = useLocale();
  const {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    status,
    setStatus,
    statusMessage,
    setStatusMessage,
  } = useContactFormState();

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
        setStatusMessage(data.error || t('contactForm.error.generic'));
      }
    } catch {
      setStatus('error');
      setStatusMessage(t('contactForm.error.network'));
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
        <h3 className="text-xl font-semibold mb-2">{t('contactForm.success.title')}</h3>
        <p className="text-gray-600 mb-4" role="status" aria-live="polite">
          {statusMessage}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="ui-btn-soft text-sm">
          {t('contactForm.success.button')}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} aria-busy={status === 'submitting'}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {t('contactForm.label.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={t('contactForm.placeholder.name')}
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t('contactForm.label.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={t('contactForm.placeholder.email')}
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
          required
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          {t('contactForm.label.subject')}
        </label>
        <select
          id="subject"
          name="subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="ui-select w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          required
        >
          <option value="">{t('contactForm.subject.placeholder')}</option>
          <option value="question">{t('contactForm.subject.question')}</option>
          <option value="feedback">{t('contactForm.subject.feedback')}</option>
          <option value="bug">{t('contactForm.subject.bug')}</option>
          <option value="feature">{t('contactForm.subject.feature')}</option>
          <option value="other">{t('contactForm.subject.other')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {t('contactForm.label.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="ui-textarea w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={t('contactForm.placeholder.message')}
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
        {status === 'submitting' ? t('contactForm.button.sending') : t('contactForm.button.send')}
      </button>
    </form>
  );
}
