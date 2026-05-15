import { cacheTag, cacheLife } from "next/cache";
import Papa from "papaparse";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const getUSAReitCSVData = async () => {
  "use cache";
  cacheTag("parsed-usa-reit-csv-data");
  cacheLife("days");

  const csvUrl = process.env.CSV_USA_REIT_URL!;

  const response = await fetchWithTimeout(csvUrl);

  const csvText = await response.text();

  const parsedData = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const cleanData = parsedData.data.map((row) =>
    JSON.parse(JSON.stringify(row)),
  );

  return cleanData;
};
