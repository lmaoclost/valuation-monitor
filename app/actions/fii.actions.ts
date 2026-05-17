"use server";

import { cache } from "react";
import { fetchWithSecret } from "@/lib/fetchWithSecret";

export const getFiiTijolo = cache(async () => {
  return await fetchWithSecret("fetch-fii/tijolo");
});

export const getFiiPapel = cache(async () => {
  return await fetchWithSecret("fetch-fii/papel");
});

export const getFiiFiagro = cache(async () => {
  return await fetchWithSecret("fetch-fii/fiagro");
});

export const getFiiFiInfra = cache(async () => {
  return await fetchWithSecret("fetch-fii/fi-infra");
});

export const getFiiFof = cache(async () => {
  return await fetchWithSecret("fetch-fii/fof");
});

export const getFiiRisk = cache(async () => {
  return await fetchWithSecret("fetch-fii-risk");
});

