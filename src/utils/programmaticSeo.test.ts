import { describe, expect, it } from 'vitest';
import {
  buildBmiProgrammaticPage,
  buildBmiResultSlug,
  buildBodyFatProgrammaticPage,
  buildBodyFatResultSlug,
  buildCalorieDeficitProgrammaticPage,
  buildCalorieDeficitResultSlug,
  buildMacroProgrammaticPage,
  buildMacroResultSlug,
  buildTdeeProgrammaticPage,
  buildTdeeResultSlug,
  getAllProgrammaticPaths,
  getBmiProgrammaticSlugs,
  getBodyFatProgrammaticSlugs,
  getCalorieDeficitProgrammaticSlugs,
  getMacroProgrammaticSlugs,
  getTdeeProgrammaticSlugs,
  parseBmiResultSlug,
  parseBodyFatResultSlug,
  parseCalorieDeficitResultSlug,
  parseMacroResultSlug,
  parseTdeeResultSlug,
} from './programmaticSeo';

describe('programmatic SEO slug parsing', () => {
  it('round-trips BMI slugs', () => {
    const slug = buildBmiResultSlug({ heightIn: 68, weightLb: 170, gender: 'female' });
    expect(slug).toBe('68-170-female');
    expect(parseBmiResultSlug(slug)).toEqual({ heightIn: 68, weightLb: 170, gender: 'female' });
  });

  it('round-trips TDEE slugs', () => {
    const slug = buildTdeeResultSlug({
      age: 35,
      gender: 'male',
      weightLb: 190,
      activity: 'moderate',
    });

    expect(slug).toBe('35-year-old-male-190-lbs-moderate');
    expect(parseTdeeResultSlug(slug)).toEqual({
      age: 35,
      gender: 'male',
      weightLb: 190,
      activity: 'moderate',
    });
  });

  it('round-trips calorie deficit slugs', () => {
    const slug = buildCalorieDeficitResultSlug({
      weightLb: 210,
      gender: 'female',
      rate: 'aggressive',
    });

    expect(slug).toBe('210-lbs-female-lose-aggressive-per-week');
    expect(parseCalorieDeficitResultSlug(slug)).toEqual({
      weightLb: 210,
      gender: 'female',
      rate: 'aggressive',
    });
  });

  it('round-trips body fat slugs', () => {
    const slug = buildBodyFatResultSlug({ age: 45, gender: 'male', method: 'bmi' });
    expect(slug).toBe('45-year-old-male-bmi');
    expect(parseBodyFatResultSlug(slug)).toEqual({ age: 45, gender: 'male', method: 'bmi' });
  });

  it('round-trips macro slugs', () => {
    const slug = buildMacroResultSlug({ calories: 2200, goal: 'maintenance', diet: 'balanced' });
    expect(slug).toBe('2200-calories-maintenance-balanced');
    expect(parseMacroResultSlug(slug)).toEqual({
      calories: 2200,
      goal: 'maintenance',
      diet: 'balanced',
    });
  });
});

describe('programmatic SEO static coverage', () => {
  it('generates deterministic static slug counts', () => {
    expect(getBmiProgrammaticSlugs()).toHaveLength(420);
    expect(getTdeeProgrammaticSlugs()).toHaveLength(500);
    expect(getCalorieDeficitProgrammaticSlugs()).toHaveLength(126);
    expect(getBodyFatProgrammaticSlugs()).toHaveLength(22);
    expect(getMacroProgrammaticSlugs()).toHaveLength(120);
  });

  it('generates unique programmatic sitemap paths', () => {
    const paths = getAllProgrammaticPaths();
    expect(paths).toHaveLength(1188);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe('programmatic SEO page builders', () => {
  it('builds a BMI page payload', () => {
    const data = buildBmiProgrammaticPage('68-170-male');
    expect(data).not.toBeNull();
    expect(data!.canonicalPath).toBe('/bmi/results/68-170-male');
    expect(data!.comparisonRows.length).toBeGreaterThan(0);
    expect(data!.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('builds a TDEE page payload', () => {
    const data = buildTdeeProgrammaticPage('35-year-old-female-160-lbs-moderate');
    expect(data).not.toBeNull();
    expect(data!.heroValue).toContain('kcal/day');
  });

  it('builds a calorie-deficit page payload', () => {
    const data = buildCalorieDeficitProgrammaticPage('180-lbs-male-lose-moderate-per-week');
    expect(data).not.toBeNull();
    expect(data!.comparisonRows.length).toBe(3);
  });

  it('builds a body-fat page payload', () => {
    const data = buildBodyFatProgrammaticPage('40-year-old-female-bmi');
    expect(data).not.toBeNull();
    expect(data!.heroValue).toContain('%');
  });

  it('builds a macro page payload', () => {
    const data = buildMacroProgrammaticPage('2400-calories-muscle-gain-high-protein');
    expect(data).not.toBeNull();
    expect(data!.comparisonRows.length).toBe(4);
  });

  it('returns null for invalid slugs', () => {
    expect(buildBmiProgrammaticPage('bad-slug')).toBeNull();
    expect(buildTdeeProgrammaticPage('bad-slug')).toBeNull();
    expect(buildCalorieDeficitProgrammaticPage('bad-slug')).toBeNull();
    expect(buildBodyFatProgrammaticPage('bad-slug')).toBeNull();
    expect(buildMacroProgrammaticPage('bad-slug')).toBeNull();
  });
});
