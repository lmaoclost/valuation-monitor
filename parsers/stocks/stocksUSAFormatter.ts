import { StocksCalculatedDataType } from "@/@types/StocksCalculatedDataType";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { usaStocksMetadata } from "@/constants/usaStocksMetadata";
import {
  calculateFieldColor,
  calculateGrowthAverageColor,
  calculatePEGColor,
  calculatePSRColor,
  formatCurrency,
  formatPercentage,
} from "@/utils";

export const stocksUSAFormatter = (
  row: StocksCalculatedDataType,
): StocksFormattedDataType => {
  const meta = usaStocksMetadata[row.ticker];

  return {
    ticker: row.ticker,
    companyname: meta?.name ?? "",
    sectorname: "",
    segmentname: "",
    cicle: "NÃO",
    price: formatCurrency(row.price, "USD"),
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
      [0, 0.1, 0.2],
    ),
    bazinDiscount: formatPercentage(row.bazinDiscount),
    bazinDiscountColor: calculateFieldColor(row.bazinDiscount, [0, 0.3]),
    bazinFairPrice: formatCurrency(row.bazinFairPrice, "USD"),
    bazinCeelingPrice: formatCurrency(row.bazinCeelingPrice, "USD"),
    grahamDiscount: formatPercentage(row.grahamDiscount),
    grahamDiscountColor: calculateFieldColor(row.grahamDiscount, [0, 0.3]),
    grahamFairPrice: formatCurrency(row.grahamFairPrice, "USD"),
    grahamCeelingPrice: formatCurrency(row.grahamCeelingPrice, "USD"),
    gordonDiscount: formatPercentage(row.gordonDiscount),
    gordonDiscountColor: calculateFieldColor(row.gordonDiscount, [0, 0.3]),
    gordonFairPrice: formatCurrency(row.gordonFairPrice, "USD"),
    gordonCeelingPrice: formatCurrency(row.gordonCeelingPrice, "USD"),
    d1: formatCurrency(row.d1, "USD"),
    peg: row.peg.toFixed(2),
    pegColor: calculatePEGColor(row.peg, [0, 0.5, 2]),
    psr: row.psr.toFixed(2),
    psrColor: calculatePSRColor(row.psr, [1]),
  };
};
