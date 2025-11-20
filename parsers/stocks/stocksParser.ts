import { stocksDomain, stocksFormatter, stocksNormalizer } from ".";
import { StatusInvestDataType } from "@/@types/StatusInvestDataType";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export const stocksParser = async (
  stocksData: StatusInvestDataType[],
  risk: number,
): Promise<StocksFormattedDataType[]> => {
  return stocksData
    .map(stocksNormalizer)
    .map((row) => stocksDomain(row, risk))
    .map(stocksFormatter);
};
