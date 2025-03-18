import { describe, it, expect } from 'vitest';
import { calculateRunningPace } from './runningPace';

describe('Running Pace Calculator', () => {
  it('calculates pace and speed for 5 km in 25:00', () => {
    // pace/km = 25 / 5 = 5:00; speed = 5 / (25/60) = 12 km/h
    // miles = 5 × 100000 / 160934 = 3.10686; pace/mi = 25 / 3.10686 = 8.0467 min
    //   → 482.8 s → 483 s = 8:03; mph = 3.10686 / (25/60) = 7.4565 → 7.46
    const result = calculateRunningPace({
      distance: 5,
      distanceUnit: 'km',
      hours: 0,
      minutes: 25,
      seconds: 0,
    });
    expect(result.totalMinutes).toBe(25);
    expect(result.pacePerKm).toBe('5:00');
    expect(result.speedKph).toBe(12);
    expect(result.pacePerMile).toBe('8:03');
    expect(result.speedMph).toBeCloseTo(7.46, 2);
  });

  it('calculates pace and speed for 10 miles in 1:20:00', () => {
    // totalMinutes = 80; pace/mi = 80 / 10 = 8:00; mph = 10 / (80/60) = 7.5
    // km = 10 × 160934 / 100000 = 16.0934; pace/km = 80 / 16.0934 = 4.971 min
    //   → 298.26 s → 298 s = 4:58; kph = 16.0934 / (80/60) = 12.07
    const result = calculateRunningPace({
      distance: 10,
      distanceUnit: 'mi',
      hours: 1,
      minutes: 20,
      seconds: 0,
    });
    expect(result.totalMinutes).toBe(80);
    expect(result.pacePerMile).toBe('8:00');
    expect(result.speedMph).toBe(7.5);
    expect(result.pacePerKm).toBe('4:58');
    expect(result.speedKph).toBeCloseTo(12.07, 2);
  });

  it('includes seconds in total time (5 km in 24:30)', () => {
    // totalMinutes = 24 + 30/60 = 24.5; pace/km = 24.5 / 5 = 4.9 min → 294 s = 4:54
    // kph = 5 / (24.5/60) = 12.2449 → 12.24
    const result = calculateRunningPace({
      distance: 5,
      distanceUnit: 'km',
      hours: 0,
      minutes: 24,
      seconds: 30,
    });
    expect(result.totalMinutes).toBe(24.5);
    expect(result.pacePerKm).toBe('4:54');
    expect(result.speedKph).toBeCloseTo(12.24, 2);
  });

  it('reports a slower pace for the same distance in more time', () => {
    const fast = calculateRunningPace({
      distance: 10,
      distanceUnit: 'km',
      hours: 0,
      minutes: 50,
      seconds: 0,
    });
    const slow = calculateRunningPace({
      distance: 10,
      distanceUnit: 'km',
      hours: 1,
      minutes: 0,
      seconds: 0,
    });
    expect(fast.speedKph).toBeGreaterThan(slow.speedKph);
  });

  it('throws on non-positive distance or time', () => {
    expect(() =>
      calculateRunningPace({ distance: 0, distanceUnit: 'km', hours: 0, minutes: 25, seconds: 0 })
    ).toThrow('Distance must be greater than 0');
    expect(() =>
      calculateRunningPace({ distance: 5, distanceUnit: 'km', hours: 0, minutes: 0, seconds: 0 })
    ).toThrow('Time must be greater than 0');
  });
});
