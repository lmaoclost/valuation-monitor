import { stocksDomain, stocksFormatter } from ".";
import { StatusInvestNormalizedSchema } from "./schema";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { z } from "zod";

export const stocksParser = async (
  stocksData: z.infer<typeof StatusInvestNormalizedSchema>,
  risk: number,
): Promise<StocksFormattedDataType[]> => {
  return stocksData.map((row) => stocksDomain(row, risk)).map(stocksFormatter);
};
