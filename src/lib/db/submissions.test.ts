/**
 * @vitest-environment node
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getSubmissionCounts,
  resetSubmissionStoreForTests,
  saveContactSubmission,
  saveEmbedRequestSubmission,
  saveNewsletterSubmission,
} from './submissions';

// node:sqlite is not available in Bun — skip this suite when running under Bun.
const hasSqlite = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('node:sqlite');
    return true;
  } catch {
    return false;
  }
})();

describe.skipIf(!hasSqlite)('Submission store (SQLite)', () => {
  let tempDir: string;
  let dbPath: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'healthcheck-db-'));
    dbPath = path.join(tempDir, 'submissions.sqlite');
    vi.stubEnv('SQLITE_DB_PATH', dbPath);
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'sqlite');
  });

  afterEach(async () => {
    await resetSubmissionStoreForTests();
    vi.unstubAllEnvs();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('initializes with empty counts', async () => {
    expect(await getSubmissionCounts()).toEqual({
      newsletter: 0,
      contact: 0,
      embedRequests: 0,
    });
  });

  it('persists newsletter, contact, and embed request submissions', async () => {
    expect(
      await saveNewsletterSubmission({
        email: 'jane@example.com',
        source: 'blog',
        provider: 'mailchimp',
        status: 'subscribed',
      })
    ).toMatchObject({ success: true, driver: 'sqlite' });
    expect(
      await saveContactSubmission({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'question',
        message: 'Can you help with calculator embeds?',
        provider: 'resend',
        status: 'sent',
      })
    ).toMatchObject({ success: true, driver: 'sqlite' });
    expect(
      await saveEmbedRequestSubmission({
        name: 'Jane Doe',
        email: 'jane@example.com',
        website: 'https://example.com',
        calculator: 'BMI',
        calculatorSlug: 'bmi',
        notes: 'Please send integration docs.',
        provider: 'convertkit',
        status: 'submitted',
      })
    ).toMatchObject({ success: true, driver: 'sqlite' });

    expect(await getSubmissionCounts()).toEqual({
      newsletter: 1,
      contact: 1,
      embedRequests: 1,
    });
  });

  it('retains data across store reinitialization', async () => {
    await saveNewsletterSubmission({
      email: 'user@example.com',
      provider: 'none',
      status: 'queued',
    });

    await resetSubmissionStoreForTests();

    expect(await getSubmissionCounts()).toEqual({
      newsletter: 1,
      contact: 0,
      embedRequests: 0,
    });
  });

  it('normalizes optional and whitespace-heavy fields', async () => {
    await saveNewsletterSubmission({
      email: '  USER@EXAMPLE.COM  ',
      source: '  blog  ',
      provider: 'resend',
      status: 'subscribed',
      error: '   ',
    });

    await saveEmbedRequestSubmission({
      name: '  Jane  ',
      email: '  jane@example.com ',
      website: '  https://example.com  ',
      calculator: '  BMI  ',
      calculatorSlug: '  bmi  ',
      notes: '  note  ',
      provider: 'none',
      status: 'queued',
    });

    expect(await getSubmissionCounts()).toEqual({
      newsletter: 1,
      contact: 0,
      embedRequests: 1,
    });
    expect(fs.existsSync(dbPath)).toBe(true);
  });

  it('returns failure details when the database cannot be opened', async () => {
    vi.stubEnv('SQLITE_DB_PATH', tempDir);
    await resetSubmissionStoreForTests();

    expect(
      await saveNewsletterSubmission({
        email: 'user@example.com',
        provider: 'none',
        status: 'queued',
      })
    ).toMatchObject({ success: false, driver: 'sqlite' });
    expect(
      await saveContactSubmission({
        name: 'User',
        email: 'user@example.com',
        subject: 'other',
        message: 'This should fail to persist.',
        provider: 'none',
        status: 'queued',
      })
    ).toMatchObject({ success: false, driver: 'sqlite' });
    expect(
      await saveEmbedRequestSubmission({
        name: 'User',
        email: 'user@example.com',
        website: '',
        calculator: '',
        calculatorSlug: '',
        notes: '',
        provider: 'none',
        status: 'queued',
      })
    ).toMatchObject({ success: false, driver: 'sqlite' });
  });

  it('returns zero counts when the database cannot be opened', async () => {
    vi.stubEnv('SQLITE_DB_PATH', tempDir);
    await resetSubmissionStoreForTests();

    expect(await getSubmissionCounts()).toEqual({
      newsletter: 0,
      contact: 0,
      embedRequests: 0,
    });
  });
});
