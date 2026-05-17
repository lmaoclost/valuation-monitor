"use server";

import { cache } from "react";
import { fetchWithSecret } from "@/lib/fetchWithSecret";

export const getStocksAndComplementary = cache(async () => {
  const [stocks, comp] = await Promise.all([
    fetchWithSecret("fetch-stocks"),
    fetchWithSecret("fetch-complementar-data"),
  ]);

  return { stocks, comp };
});

