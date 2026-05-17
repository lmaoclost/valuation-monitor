"use server";

import { cache } from "react";
import { fetchWithSecret } from "@/lib/fetchWithSecret";

export const getUSAReitAndComplementary = cache(async () => {
  const stocks = await fetchWithSecret("fetch-usa-reit");
  return { stocks, comp: null };
});
