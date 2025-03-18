import { describe, it, expect } from 'vitest';
import { calculateACFT } from './acftCalculator';
import { ACFTFormValues } from '@/types/acftCalculator';

describe('ACFT Calculator', () => {
  const strongMaleValues: ACFTFormValues = {
    gender: 'male',
    ageGroup: '22-26',
    deadliftWeight: 300,
    standingPowerThrow: 11,
    handReleasePushups: 50,
    sprintDragCarryTime: 100,
    plankTime: 200,
    twoMileRunTime: 840, // 14:00
  };

  const passingFemaleValues: ACFTFormValues = {
    gender: 'female',
    ageGroup: '22-26',
    deadliftWeight: 130,
    standingPowerThrow: 5,
    handReleasePushups: 20,
    sprintDragCarryTime: 160,
    plankTime: 140,
    twoMileRunTime: 1200, // 20:00
  };

  it('should calculate high scores for strong performance', () => {
    const result = calculateACFT(strongMaleValues);
    expect(result.totalScore).toBeGreaterThanOrEqual(480);
    expect(result.passing).toBe(true);
    expect(result.overallCategory).not.toBe('Fail');
  });

  it('should calculate passing scores for adequate performance', () => {
    const result = calculateACFT(passingFemaleValues);
    expect(result.passing).toBe(true);
    expect(result.eventScores.every(e => e.points >= 60)).toBe(true);
  });

  it('should fail if any event is below minimum', () => {
    const result = calculateACFT({
      ...strongMaleValues,
      deadliftWeight: 80, // below minimum
    });
    expect(result.eventScores[0].passing).toBe(false);
    expect(result.passing).toBe(false);
    expect(result.overallCategory).toBe('Fail');
  });

  it('should return 6 event scores', () => {
    const result = calculateACFT(strongMaleValues);
    expect(result.eventScores).toHaveLength(6);
  });

  it('should score deadlift correctly for male', () => {
    const result = calculateACFT(strongMaleValues);
    const deadlift = result.eventScores.find(e => e.event === 'deadlift')!;
    expect(deadlift.points).toBe(90);
    expect(deadlift.passing).toBe(true);
  });

  it('should score time events correctly (lower time = higher score)', () => {
    const fast = calculateACFT({ ...strongMaleValues, twoMileRunTime: 780 }); // 13:00
    const slow = calculateACFT({ ...strongMaleValues, twoMileRunTime: 1200 }); // 20:00
    const fastRun = fast.eventScores.find(e => e.event === 'twoMileRun')!;
    const slowRun = slow.eventScores.find(e => e.event === 'twoMileRun')!;
    expect(fastRun.points).toBeGreaterThan(slowRun.points);
  });

  it('should use female scoring tables', () => {
    const male = calculateACFT({
      ...strongMaleValues,
      gender: 'male',
      deadliftWeight: 150,
    });
    const female = calculateACFT({
      ...strongMaleValues,
      gender: 'female',
      deadliftWeight: 150,
    });
    const maleDL = male.eventScores.find(e => e.event === 'deadlift')!;
    const femaleDL = female.eventScores.find(e => e.event === 'deadlift')!;
    // Same weight should score higher for female (lower standards)
    expect(femaleDL.points).toBeGreaterThan(maleDL.points);
  });

  it('should identify strengths and weaknesses', () => {
    const result = calculateACFT({
      ...strongMaleValues,
      handReleasePushups: 5, // very low
    });
    expect(result.weaknesses.length).toBeGreaterThan(0);
    expect(result.strengths.length).toBeGreaterThan(0);
  });

  it('should generate recommendations for failing events', () => {
    const result = calculateACFT({
      ...strongMaleValues,
      handReleasePushups: 5,
      twoMileRunTime: 1400,
    });
    expect(result.recommendations.length).toBeGreaterThanOrEqual(2);
  });

  it('should assign correct overall category', () => {
    const gold = calculateACFT({
      ...strongMaleValues,
      deadliftWeight: 340,
      standingPowerThrow: 12.5,
      handReleasePushups: 60,
      sprintDragCarryTime: 93,
      plankTime: 220,
      twoMileRunTime: 780,
    });
    expect(gold.overallCategory).toBe('Gold');
  });

  it('should format time events correctly', () => {
    const result = calculateACFT(strongMaleValues);
    const run = result.eventScores.find(e => e.event === 'twoMileRun')!;
    expect(run.rawDisplay).toBe('14:00');
  });

  it('should cap scores at 100', () => {
    const result = calculateACFT({
      ...strongMaleValues,
      deadliftWeight: 500, // way above max
    });
    const deadlift = result.eventScores.find(e => e.event === 'deadlift')!;
    expect(deadlift.points).toBe(100);
  });

  it('should return 0 for extremely poor performance', () => {
    const result = calculateACFT({
      ...strongMaleValues,
      deadliftWeight: 50,
    });
    const deadlift = result.eventScores.find(e => e.event === 'deadlift')!;
    expect(deadlift.points).toBe(0);
  });

  it('should throw for negative inputs', () => {
    expect(() => calculateACFT({ ...strongMaleValues, deadliftWeight: -1 })).toThrow();
    expect(() => calculateACFT({ ...strongMaleValues, twoMileRunTime: -1 })).toThrow();
  });
});
