import { unstable_cache } from "next/cache";
import Papa from "papaparse";
import { revalidateDay } from "@/constants";

const csvUrl = process.env.CSV_URL!;

export const getCSVData = unstable_cache(
  async () => {
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
  },
  ["parsed-csv-data"],
  { revalidate: revalidateDay },
);
