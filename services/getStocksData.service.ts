import { cacheLife, cacheTag } from "next/cache";
import { getComplementarData } from ".";
import { stocksParser } from "@/parsers/stocks/stocksParser";

export const getStocksData = async () => {
  "use cache";
  cacheTag("parsed-stock-data");
  cacheLife("days");
  const { csv, risk } = await getComplementarData();

  return stocksParser(csv, risk);
};
