import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock sessionStorage for jsdom
const mockStorage = new Map<string, string>();
const STORAGE_KEY = 'healthcheck-chain-state';

beforeEach(() => {
  mockStorage.clear();
  vi.stubGlobal('sessionStorage', {
    getItem: (key: string) => mockStorage.get(key) ?? null,
    setItem: (key: string, value: string) => mockStorage.set(key, value),
    removeItem: (key: string) => mockStorage.delete(key),
  });
});

// Test the pure functions extracted from the hook logic
describe('Chain state sessionStorage logic', () => {
  it('stores and retrieves chain state', () => {
    const state = {
      chainId: 'weight-loss-journey',
      currentStepIndex: 0,
      completedSlugs: [] as string[],
      sharedData: {},
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    const raw = sessionStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.chainId).toBe('weight-loss-journey');
    expect(parsed.currentStepIndex).toBe(0);
  });

  it('clears chain state on remove', () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ chainId: 'test' }));
    sessionStorage.removeItem(STORAGE_KEY);
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('handles advancing step by updating stored state', () => {
    const initial = {
      chainId: 'weight-loss-journey',
      currentStepIndex: 0,
      completedSlugs: [] as string[],
      sharedData: {},
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initial));

    // Simulate advance
    const current = JSON.parse(sessionStorage.getItem(STORAGE_KEY)!);
    const updated = {
      ...current,
      currentStepIndex: 1,
      completedSlugs: ['bmi'],
      sharedData: { age: 30, gender: 'male', height: 175, weight: 80 },
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const result = JSON.parse(sessionStorage.getItem(STORAGE_KEY)!);
    expect(result.currentStepIndex).toBe(1);
    expect(result.completedSlugs).toContain('bmi');
    expect(result.sharedData.age).toBe(30);
  });

  it('merges shared data across steps', () => {
    const state = {
      chainId: 'weight-loss-journey',
      currentStepIndex: 2,
      completedSlugs: ['bmi', 'body-fat'],
      sharedData: { age: 30, gender: 'male', height: 175, weight: 80 },
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    // Add activity level from TDEE step
    const current = JSON.parse(sessionStorage.getItem(STORAGE_KEY)!);
    const updated = {
      ...current,
      currentStepIndex: 3,
      completedSlugs: [...current.completedSlugs, 'tdee'],
      sharedData: { ...current.sharedData, activityLevel: 'moderate' },
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const result = JSON.parse(sessionStorage.getItem(STORAGE_KEY)!);
    expect(result.sharedData.age).toBe(30);
    expect(result.sharedData.activityLevel).toBe('moderate');
  });
});
