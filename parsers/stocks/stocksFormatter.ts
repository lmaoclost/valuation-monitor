import { StocksCalculatedDataType } from "@/@types/StocksCalculatedDataType";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { formatCurrency, formatPercentage } from "@/utils";

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
    growthAverageRaw: row.growthAverage,
    bazinDiscount: formatPercentage(row.bazinDiscount),
    bazinDiscountRaw: row.bazinDiscount,
    bazinFairPrice: formatCurrency(row.bazinFairPrice),
    bazinCeelingPrice: formatCurrency(row.bazinCeelingPrice),
    grahamDiscount: formatPercentage(row.grahamDiscount),
    grahamDiscountRaw: row.grahamDiscount,
    grahamFairPrice: formatCurrency(row.grahamFairPrice),
    grahamCeelingPrice: formatCurrency(row.grahamCeelingPrice),
    gordonDiscount: formatPercentage(row.gordonDiscount),
    gordonDiscountRaw: row.gordonDiscount,
    gordonFairPrice: formatCurrency(row.gordonFairPrice),
    gordonCeelingPrice: formatCurrency(row.gordonCeelingPrice),
    d1: formatCurrency(row.d1),
    peg: row.peg.toFixed(2),
    psr: row.psr.toFixed(2),
  };
};
