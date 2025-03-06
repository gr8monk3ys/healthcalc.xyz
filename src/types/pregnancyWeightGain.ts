export interface PregnancyWeightGainResult {
  bmi: number;
  category: string;
  totalGain: {
    minLb: number;
    maxLb: number;
    minKg: number;
    maxKg: number;
  };
  weeklyGain: {
    minLb: number;
    maxLb: number;
    minKg: number;
    maxKg: number;
  };
}
