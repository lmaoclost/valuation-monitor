"use server";

import { cache } from "react";
import { fetchWithSecret } from "@/lib/fetchWithSecret";

export const getUSAStocksAndComplementary = cache(async () => {
  const stocks = await fetchWithSecret("fetch-usa-stocks");
  return { stocks, comp: null };
});
