import { NextResponse } from "next/server";
import {
  fetchCSVData,
  fetchERPData,
  fetchIPCAData,
  fetchRiskData,
} from "@/services";
import { stocksParser } from "@/parsers/stocks/stocksParser";
import { unstable_cache } from "next/cache";

export async function GET() {
  try {
    const fetchData = unstable_cache(
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
      //{ revalidate: 86400 },
    );

    const parsedData = await fetchData();

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Error processing Data:", error);
    return NextResponse.json(
      { error: "Error processing Data" },
      { status: 500 },
    );
  }
}
