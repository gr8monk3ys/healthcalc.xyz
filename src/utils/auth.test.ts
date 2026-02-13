import { describe, expect, it } from 'vitest';
import { getClerkEnvState } from '@/utils/auth';

describe('getClerkEnvState', () => {
  it('returns disabled with missing keys', () => {
    const state = getClerkEnvState({
      NODE_ENV: 'production',
    });

    expect(state.enabled).toBe(false);
    expect(state.publishableKeyConfigured).toBe(false);
    expect(state.secretKeyConfigured).toBe(false);
    expect(state.productionKeysValid).toBe(true);
    expect(state.issue).toBe('missing_keys');
  });

  it('allows test keys in non-production environments', () => {
    const state = getClerkEnvState({
      NODE_ENV: 'development',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_demo',
      CLERK_SECRET_KEY: 'sk_test_demo',
    });

    expect(state.enabled).toBe(true);
    expect(state.productionKeysValid).toBe(true);
    expect(state.issue).toBe(null);
  });

  it('rejects test publishable keys in production', () => {
    const state = getClerkEnvState({
      NODE_ENV: 'production',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_demo',
      CLERK_SECRET_KEY: 'sk_live_demo',
    });

    expect(state.enabled).toBe(false);
    expect(state.productionKeysValid).toBe(false);
    expect(state.issue).toBe('test_publishable_key_in_production');
  });

  it('rejects test secret keys in production', () => {
    const state = getClerkEnvState({
      NODE_ENV: 'production',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_demo',
      CLERK_SECRET_KEY: 'sk_test_demo',
    });

    expect(state.enabled).toBe(false);
    expect(state.productionKeysValid).toBe(false);
    expect(state.issue).toBe('test_secret_key_in_production');
  });

  it('requires both live keys in production', () => {
    const state = getClerkEnvState({
      NODE_ENV: 'production',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_demo',
      CLERK_SECRET_KEY: 'sk_live_demo',
    });

    expect(state.enabled).toBe(true);
    expect(state.publishableKeyConfigured).toBe(true);
    expect(state.secretKeyConfigured).toBe(true);
    expect(state.productionKeysValid).toBe(true);
    expect(state.issue).toBe(null);
  });

  it('rejects partially configured Clerk env in production', () => {
    const state = getClerkEnvState({
      NODE_ENV: 'production',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_live_demo',
      CLERK_SECRET_KEY: '',
    });

    expect(state.enabled).toBe(false);
    expect(state.secretKeyConfigured).toBe(false);
    expect(state.issue).toBe('missing_secret_key');
  });
});
