"use server";

import { cache } from "react";
import { fetchWithSecret } from "@/lib/fetchWithSecret";

export const getUSAStocksAndComplementary = cache(async () => {
  const stocks = await fetchWithSecret("fetch-usa-stocks");
  return { stocks, comp: null };
});

export async function getUSAStocksPreset(preset: string) {
  return await fetchWithSecret(`fetch-usa-preset-stocks/filter?preset=${preset}`);
}