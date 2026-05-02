import { stocksDomain, stocksUSAFormatter } from ".";
import { StatusInvestNormalizedSchema } from "./schema";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { z } from "zod";

export const usaReitParser = async (
  stocksData: z.infer<typeof StatusInvestNormalizedSchema>,
  risk: number,
): Promise<StocksFormattedDataType[]> => {
  return stocksData.map((row) => stocksDomain(row, risk, 0.03)).map(stocksUSAFormatter);
};