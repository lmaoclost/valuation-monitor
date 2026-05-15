import { cacheTag, cacheLife } from "next/cache";
import Papa from "papaparse";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const getFiiCSVData = async () => {
  "use cache";
  cacheTag("parsed-fii-csv-data");
  cacheLife("days");

  const csvUrl = process.env.FII_CSV_URL!;
  const response = await fetchWithTimeout(csvUrl, { timeout: 15000 });
  const csvText = await response.text();

  const parsedData = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const cleanData = parsedData.data.map((row: unknown) =>
    JSON.parse(JSON.stringify(row)),
  );

  return cleanData;
};
