import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import {
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
  calculatePEG,
  getDY,
} from "@/utils";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatPercentage } from "@/utils/formatPercentage";
import { getPL } from "@/utils/getPL";

export type ParsedData = StatusInvestDataType & {
  dy: string;
  pl: string;
  dpa: string;
  payout: string;
  growth_or_dividend: string;
  cagr_profit: string;
  damodaram_growth: string;
  growth_average: string;
  bazin_discount: string;
  bazin_fair_price: string;
  bazin_ceeling_price: string;
  graham_discount: string;
  graham_fair_price: string;
  graham_ceeling_price: string;
  gordon_discount: string;
  d1: string;
  gordon_fair_price: string;
  gordon_ceeling_price: string;
};

export const dataParser = async (
  tableData: StatusInvestDataType[],
  risk: number,
): Promise<ParsedData[]> => {
  return tableData.map((row) => {
    // Cálculos derivados
    const dy = getDY(row) / 100;
    const pl = getPL(row);
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
    const gordonDiscount = calculateGordonDiscount(row, risk);
    const d1 = calculateD1(row);
    const gordonFairPrice = calculateGordonFairPrice(row, risk);
    const gordonCeelingPrice = calculateGordonCeelingPrice(row, risk);
    const peg = calculatePEG(row);

    return {
      ...row,
      risco: formatPercentage(risk / 100),
      discount_margin: formatPercentage(0.3),
      dy: formatPercentage(dy),
      pl: pl,
      dpa: dpa.toFixed(2),
      payout: formatPercentage(payout),
      growth_or_dividend: growthDividend,
      cagr_profit: formatPercentage(cagrProfit),
      damodaram_growth: formatPercentage(damodaramGrowth),
      growth_average: formatPercentage(growthAverage),
      bazin_discount: formatPercentage(bazinDiscount),
      bazin_fair_price: formatCurrency(bazinFairPrice),
      bazin_ceeling_price: formatCurrency(bazinCeelingPrice),
      graham_discount: formatPercentage(grahamDiscount),
      graham_fair_price: formatCurrency(grahamFairPrice),
      graham_ceeling_price: formatCurrency(grahamCeelingPrice),
      gordon_discount: formatPercentage(gordonDiscount),
      d1: formatCurrency(d1),
      gordon_fair_price: formatCurrency(gordonFairPrice),
      gordon_ceeling_price: formatCurrency(gordonCeelingPrice),
      peg: peg.toFixed(2),
    };
  });
};
