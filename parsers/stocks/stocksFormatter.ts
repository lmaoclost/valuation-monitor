import { StocksCalculatedDataType } from "@/@types/StocksCalculatedDataType";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import {
  calculateFieldColor,
  calculateGrowthAverageColor,
  calculatePEGColor,
  calculatePSRColor,
  formatCurrency,
  formatPercentage,
} from "@/utils";

export const stocksFormatter = (
  row: StocksCalculatedDataType,
): StocksFormattedDataType => {
  return {
    ticker: row.ticker,
    price: formatCurrency(row.price),
    dy: formatPercentage(row.dy),
    pl: formatPercentage(row.pl),
    lpa: row.lpa.toFixed(2),
    vpa: row.vpa.toFixed(2),
    dpa: row.dpa.toFixed(2),
    risk: formatPercentage(row.risk),
    discount_margin: formatPercentage(row.discount_margin),
    payout: formatPercentage(row.payout),
    growthDividend: row.growthDividend,
    roe: formatPercentage(row.roe),
    cagrProfit: formatPercentage(row.cagrProfit),
    damodaramGrowth: formatPercentage(row.damodaramGrowth),
    growthAverage: formatPercentage(row.growthAverage),
    growthAverageColor: calculateGrowthAverageColor(
      row.growthAverage,
      [0, 10, 20],
    ),
    bazinDiscount: formatPercentage(row.bazinDiscount),
    bazinDiscountColor: calculateFieldColor(row.bazinDiscount, [0, 30]),
    bazinFairPrice: formatCurrency(row.bazinFairPrice),
    bazinCeelingPrice: formatCurrency(row.bazinCeelingPrice),
    grahamDiscount: formatPercentage(row.grahamDiscount),
    grahamDiscountColor: calculateFieldColor(row.grahamDiscount, [0, 30]),
    grahamFairPrice: formatCurrency(row.grahamFairPrice),
    grahamCeelingPrice: formatCurrency(row.grahamCeelingPrice),
    gordonDiscount: formatPercentage(row.gordonDiscount),
    gordonDiscountColor: calculateFieldColor(row.gordonDiscount, [0, 30]),
    gordonFairPrice: formatCurrency(row.gordonFairPrice),
    gordonCeelingPrice: formatCurrency(row.gordonCeelingPrice),
    d1: formatCurrency(row.d1),
    peg: row.peg.toFixed(2),
    pegColor: calculatePEGColor(row.peg, [0, 0.5, 2]),
    psr: row.psr.toFixed(2),
    psrColor: calculatePSRColor(row.psr, [1]),
  };
};
