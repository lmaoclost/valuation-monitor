import { cacheTag, cacheLife } from "next/cache";
import Papa from "papaparse";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const getUSACSVData = async () => {
  "use cache";
  cacheTag("parsed-usa-csv-data");
  cacheLife("days");

  try {
    const csvUrl = process.env.CSV_USA_STOCKS_URL!;

    const response = await fetchWithTimeout(csvUrl);

    const csvText = await response.text();

    const parsedData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const cleanData = parsedData.data.map((row) =>
      structuredClone(row),
    );

    return cleanData;
  } catch (error) {
    console.warn("USA CSV unavailable, using fallback []:", (error as Error).message);
    return [];
  }
};
