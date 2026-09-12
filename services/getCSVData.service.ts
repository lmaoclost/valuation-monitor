import { cacheTag, cacheLife } from "next/cache";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import Papa from "papaparse";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

const LOCAL_CSV_PATH = join(process.cwd(), "data", "br-stocks.csv");

const readLocalCsv = (): string | null => {
  const localPath = process.env.BR_STOCKS_CSV_PATH ?? LOCAL_CSV_PATH;
  try {
    if (!existsSync(localPath)) return null;
    return readFileSync(localPath, "utf-8");
  } catch {
    return null;
  }
};

const fetchRemoteCsv = async (csvUrl: string): Promise<string> => {
  const response = await fetchWithTimeout(csvUrl);

  if (!response.ok) {
    throw new Error(`CSV request failed with status ${response.status}`);
  }

  return response.text();
};

export const getCSVData = async () => {
  "use cache";
  cacheTag("parsed-csv-data");
  cacheLife("days");

  try {
    const csvUrl = process.env.CSV_URL!;

    const csvText = readLocalCsv() ?? (await fetchRemoteCsv(csvUrl));

    const parsedData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const cleanData = parsedData.data.map((row) =>
      structuredClone(row),
    );

    return cleanData;
  } catch (error) {
    console.warn("CSV unavailable, using fallback []:", (error as Error).message);
    return [];
  }
};
