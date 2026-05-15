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

    if (!response.ok) {
      console.warn(`IPCA: IBGE returned status ${response.status}`);
      return 0;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const ipcaElement = $("li.variavel")
      .filter((_, el) =>
        $(el)
          .find("h3.variavel-titulo")
          .text()
          .includes("IPCA acumulado de 12 meses"),
      )
      .find("p.variavel-dado")
      .text()
      .trim();

    const ipcaValue = parseFloat(ipcaElement.replace(",", ".").replace("%", ""));

    return ipcaValue;
  } catch (error) {
    console.warn("IPCA unavailable, using fallback 0:", (error as Error).message);
    return 0;
  }
};
