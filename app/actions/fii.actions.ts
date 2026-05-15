"use server";

import { fetchWithSecret } from "@/lib/fetchWithSecret";

export async function getFiiTijolo() {
  return await fetchWithSecret("fetch-fii/tijolo");
}

export async function getFiiPapel() {
  return await fetchWithSecret("fetch-fii/papel");
}

export async function getFiiRisk() {
  return await fetchWithSecret("fetch-fii-risk");
}

export async function getFiiPreset(type: string, preset: string) {
  return await fetchWithSecret(
    `fetch-fii-preset/filter?type=${type}&preset=${preset}`,
  );
}
