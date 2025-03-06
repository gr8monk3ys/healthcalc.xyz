export type DistanceUnit = 'mi' | 'km';

export interface RunningPaceResult {
  distance: number;
  distanceUnit: DistanceUnit;
  totalMinutes: number;
  pacePerMile: string;
  pacePerKm: string;
  speedMph: number;
  speedKph: number;
}
