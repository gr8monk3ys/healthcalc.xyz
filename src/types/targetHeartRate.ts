export interface TargetHeartRateResult {
  maxHeartRate: number;
  restingHeartRate?: number;
  intensityMin: number;
  intensityMax: number;
  targetMin: number;
  targetMax: number;
  method: string;
}
