import * as cheerio from "cheerio";
import { cacheTag, cacheLife } from "next/cache";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const getERPData = async () => {
  "use cache";
  cacheTag("parsed-erp-data");
  cacheLife("days");

  try {
    const erpUrl = process.env.ERP_URL!;

    const response = await fetchWithTimeout(erpUrl);

    if (!response.ok) {
      console.warn(`ERP: FGV returned status ${response.status}`);
      return 0;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const erpText = $("p")
      .filter((_, el) =>
        $(el).text().includes("o Equity Risk Premium (ERP) ficou em "),
      )
      .text()
      .trim();

    const erpMatch = erpText.match(/ficou em (\d{1,2},\d{1,2})%/);
    const erpValue = erpMatch ? parseFloat(erpMatch[1].replace(",", ".")) : 0;

    return erpValue;
  } catch (error) {
    console.warn("ERP unavailable, using fallback 0:", (error as Error).message);
    return 0;
  }
};
