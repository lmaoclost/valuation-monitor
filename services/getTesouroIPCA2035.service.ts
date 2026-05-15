import * as cheerio from "cheerio";
import { cacheTag, cacheLife } from "next/cache";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const getTesouroIPCA2035 = async () => {
  "use cache";
  cacheTag("parsed-tesouro-ipca2035");
  cacheLife("days");

  try {
    const url = process.env.STATUS_INVEST_IPCA2035_URL || "";

    const response = await fetchWithTimeout(url);

    const html = await response.text();
    const $ = cheerio.load(html);

    const rateText = $("strong.value")
      .filter((_, el) => $(el).text().includes("IPCA +"))
      .first()
      .text()
      .trim();
    const match = rateText.match(/(\d+[.,]\d+)/);
    if (!match) {
      console.warn("Tesouro IPCA+ 2035: rate not found on page");
      return 0;
    }

    return parseFloat(match[1].replace(",", ".")) / 100;
  } catch (error) {
    console.warn("Tesouro IPCA+ 2035 unavailable, using fallback 0:", (error as Error).message);
    return 0;
  }
};
