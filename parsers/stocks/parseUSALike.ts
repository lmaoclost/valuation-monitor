import { stocksDomain } from "./stocksDomain";
import { stocksUSAFormatter } from "./stocksUSAFormatter";
import { StatusInvestNormalizedSchema } from "./schema";
import type { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { z } from "zod";

export function createUSAParser(bazinRate = 0.03) {
  return (
    stocksData: z.infer<typeof StatusInvestNormalizedSchema>,
    risk: number,
  ): StocksFormattedDataType[] => {
    return stocksData.map((row) => stocksDomain(row, risk, bazinRate)).map(stocksUSAFormatter);
  };
}
