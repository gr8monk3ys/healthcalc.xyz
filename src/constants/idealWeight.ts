export type IdealWeightFormulaId = 'devine' | 'hamwi' | 'robinson' | 'miller';

interface IdealWeightFormulaDefinition {
  id: IdealWeightFormulaId;
  label: string;
  maleBase: number;
  femaleBase: number;
  malePerInch: number;
  femalePerInch: number;
}

export const IDEAL_WEIGHT_FORMULAS: IdealWeightFormulaDefinition[] = [
  {
    id: 'devine',
    label: 'Devine (1974)',
    maleBase: 50,
    femaleBase: 45.5,
    malePerInch: 2.3,
    femalePerInch: 2.3,
  },
  {
    id: 'hamwi',
    label: 'Hamwi (1964)',
    maleBase: 48,
    femaleBase: 45.5,
    malePerInch: 2.7,
    femalePerInch: 2.2,
  },
  {
    id: 'robinson',
    label: 'Robinson (1983)',
    maleBase: 52,
    femaleBase: 49,
    malePerInch: 1.9,
    femalePerInch: 1.7,
  },
  {
    id: 'miller',
    label: 'Miller (1983)',
    maleBase: 56.2,
    femaleBase: 53.1,
    malePerInch: 1.41,
    femalePerInch: 1.36,
  },
];
