import * as cheerio from "cheerio";
import { cacheTag, cacheLife } from "next/cache";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const getIPCAData = async () => {
  "use cache";
  cacheTag("parsed-ipca-data");
  cacheLife("days");

  try {
    const ipcaUrl = process.env.IPCA_URL!;

    const response = await fetchWithTimeout(ipcaUrl);

    const html = await response.text();
    const $ = cheerio.load(html);

    const valueText = $("strong.value")
      .filter((_, el) => $(el).siblings("h2.title").text().includes("IPCA HOJE"))
      .first()
      .text()
      .trim();

    const ipcaValue = parseFloat(valueText.replace(",", "."));

    return ipcaValue;
  } catch (error) {
    console.warn("IPCA unavailable, using fallback 0:", (error as Error).message);
    return 0;
  }
};
