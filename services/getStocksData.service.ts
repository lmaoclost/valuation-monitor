import { unstable_cache } from "next/cache";
import { getComplementarData } from ".";
import { stocksParser } from "@/parsers/stocks/stocksParser";
import { revalidateDay } from "@/constants";

export const getStocksData = unstable_cache(
  async () => {
    const { csv, risk } = await getComplementarData();

    return stocksParser(csv, risk);
  },
  ["parsed-stock-data"],
  { revalidate: revalidateDay },
);
