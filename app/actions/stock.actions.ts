"use server";

import { fetchWithSecret } from "@/lib/fetchWithSecret";

export async function getStocksAndComplementary() {
  const [stocks, comp] = await Promise.all([
    fetchWithSecret("fetch-stocks"),
    fetchWithSecret("fetch-complementar-data"),
  ]);

  return { stocks, comp };
}

export async function getPresetStocks(preset: string) {
  return await fetchWithSecret(`fetch-preset-stocks/filter?preset=${preset}`);
}
