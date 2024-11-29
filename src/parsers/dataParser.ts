import { getDY } from '@/utils/getDY';
import { StatusInvestData } from "@/app/components/table";
import {
  getRisk,
  calculateDPA,
  calculatePayout,
  growthOrDividend,
  calculateCagrProfit,
  calculateDamoradanGrowth,
  calculateGrowthAverage,
  calculateBazinDiscount,
  calculateBazinFairPrice,
  calculateBazinCeelingPrice,
  calculateGrahamDiscount,
  calculateGrahamFairPrice,
  calculateGrahamCeelingPrice,
  calculateGordonDiscount,
  calculateD1,
  calculateGordonFairPrice,
  calculateGordonCeelingPrice,
  convertFloatToCurrency
} from "@/utils";
import { calculatePEG } from '@/utils/calculatePEG';

export type ParsedData = StatusInvestData & {
  dy: string;
  dpa: string;
  payout: string;
  growth_or_dividend: string;
  cagr_profit: string;
  damodaram_growth: string;
  growth_average: {
    value: string;
    fieldColor: string;
  };
  bazin_discount: {
    value: string;
    fieldColor: string;
  };
  bazin_fair_price: string;
  bazin_ceeling_price: string;
  graham_discount: {
    value: string;
    fieldColor: string;
  };
  graham_fair_price: string;
  graham_ceeling_price: string;
  gordon_discount: {
    value: string;
    fieldColor: string;
  };
  d1: string;
  gordon_fair_price: string;
  gordon_ceeling_price: string;
};


export const dataParser = async (tableData: StatusInvestData[]): Promise<ParsedData[]> => {
  const risk = await getRisk(); // Busca o valor de risco uma única vez.

  return tableData.map((row) => {
    // Cálculos derivados
    const dy = getDY(row);
    const dpa = calculateDPA(row);
    const payout = calculatePayout(row);
    const growthDividend = growthOrDividend(row);
    const cagrProfit = calculateCagrProfit(row);
    const damodaramGrowth = calculateDamoradanGrowth(row);
    const growthAverage = calculateGrowthAverage(row);
    const bazinDiscount = calculateBazinDiscount(row);
    const bazinFairPrice = calculateBazinFairPrice(row);
    const bazinCeelingPrice = calculateBazinCeelingPrice(row);
    const grahamDiscount = calculateGrahamDiscount(row);
    const grahamFairPrice = calculateGrahamFairPrice(row);
    const grahamCeelingPrice = calculateGrahamCeelingPrice(row);
    const gordonDiscount = calculateGordonDiscount(row, risk!);
    const d1 = calculateD1(row);
    const gordonFairPrice = calculateGordonFairPrice(row, risk!);
    const gordonCeelingPrice = calculateGordonCeelingPrice(row, risk!);
    const peg = calculatePEG(row)

    // Aplicando formatações e lógica de exibição
    const formatPercentage = (value: number | null) =>
      value !== null && isFinite(value) ? `${value.toFixed(2)}%` : "NaN";

    const formatCurrency = (value: number | null) =>
      value !== null && isFinite(value) ? convertFloatToCurrency(value) : "NaN";

    const calculateFieldColor = (value: number, thresholds: number[]) => {
      if (value < thresholds[0]) return "text-red-600";
      if (value <= thresholds[1]) return "text-yellow-600";
      if (value <= thresholds[2]) return "text-blue-600";
      return "text-green-600";
    };

    return {
      ...row,
      risco: risk,
      discount_margin: formatPercentage(30),
      dy: formatPercentage(dy),
      dpa: dpa.toFixed(2),
      payout: formatPercentage(payout),
      growth_or_dividend: growthDividend,
      cagr_profit: formatPercentage(cagrProfit),
      damodaram_growth: formatPercentage(damodaramGrowth),
      growth_average: {
        value: formatPercentage(growthAverage),
        fieldColor: calculateFieldColor(growthAverage || 0, [0, 10, 20]),
      },
      bazin_discount: {
        value: formatPercentage(bazinDiscount),
        fieldColor: calculateFieldColor(bazinDiscount || 0, [0, 30]),
      },
      bazin_fair_price: formatCurrency(bazinFairPrice),
      bazin_ceeling_price: formatCurrency(bazinCeelingPrice),
      graham_discount: {
        value: formatPercentage(grahamDiscount),
        fieldColor: calculateFieldColor(grahamDiscount || 0, [0, 30]),
      },
      graham_fair_price: formatCurrency(grahamFairPrice),
      graham_ceeling_price: formatCurrency(grahamCeelingPrice),
      gordon_discount: {
        value: formatPercentage(gordonDiscount),
        fieldColor: calculateFieldColor(gordonDiscount || 0, [0, 30]),
      },
      d1: formatCurrency(d1),
      gordon_fair_price: formatCurrency(gordonFairPrice),
      gordon_ceeling_price: formatCurrency(gordonCeelingPrice),
      peg: peg.toFixed(2)
    };
  });
};
