import { NextResponse } from "next/server";
import {
  fetchCSVData,
  fetchERPData,
  fetchIPCAData,
  fetchRiskData,
} from "@/services";
import { dataParser } from "@/parsers";
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
        return dataParser(csv, risk);
      },
      ["parsed-data"],
      //{ revalidate: 86400 },
      { revalidate: 2 },
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
