import { cacheTag, cacheLife } from "next/cache";
import Papa from "papaparse";

export const getCSVData = async () => {
  "use cache";
  cacheTag("parsed-csv-data");
  cacheLife("days");

  const csvUrl = process.env.CSV_URL!;
  const response = await fetch(csvUrl);
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
