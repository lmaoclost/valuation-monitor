import { unstable_cache } from "next/cache";
import { fetchCSVData, fetchERPData, fetchIPCAData, fetchRiskData } from ".";
import { stocksParser } from "@/parsers/stocks/stocksParser";

export const getStocksData = unstable_cache(
  async () => {
    const [csv, erp, ipca] = await Promise.all([
      fetchCSVData(),
      fetchERPData(),
      fetchIPCAData(),
    ]);

    const risk = fetchRiskData(ipca, erp);
    return stocksParser(csv, risk);
  },
  ["parsed-stock-data"],
  { revalidate: 86400 },
);
