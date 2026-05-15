import * as cheerio from "cheerio";
import { cacheTag, cacheLife } from "next/cache";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const getTesouroIPCA2035 = async () => {
  "use cache";
  cacheTag("parsed-tesouro-ipca2035");
  cacheLife("days");

  const response = await fetchWithTimeout(
    "https://statusinvest.com.br/tesouro/tesouro-ipca-2035",
    { timeout: 10000 },
  );

  const html = await response.text();
  const $ = cheerio.load(html);

  const rateText = $("strong.value")
    .filter((_, el) => $(el).text().includes("IPCA +"))
    .first()
    .text()
    .trim();
  const match = rateText.match(/(\d+[.,]\d+)/);
  if (!match) {
    throw new Error("Could not find Tesouro IPCA+ 2035 rate");
  }

  return parseFloat(match[1].replace(",", ".")) / 100;
};
