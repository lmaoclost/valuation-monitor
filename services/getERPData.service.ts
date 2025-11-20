import { unstable_cache } from "next/cache";
import * as cheerio from "cheerio";
import { revalidateDay } from "@/constants";

const erpUrl = "https://ceqef.fgv.br/banco-de-dados";

export const getERPData = unstable_cache(
  async () => {
    const response = await fetch(erpUrl);
    if (!response.ok) {
      throw new Error(`Erro ao acessar o site da FGV: ${response.status}`);
    }

    // Carregar o HTML na Cheerio
    const html = await response.text();
    const $ = cheerio.load(html);

    // Procurar o valor do ERP
    const erpText = $("p")
      .filter((_, el) =>
        $(el).text().includes("o Equity Risk Premium (ERP) ficou em "),
      )
      .text()
      .trim();

    const erpMatch = erpText.match(/ficou em (\d{1,2},\d{1,2})%/);
    const erpValue = erpMatch ? parseFloat(erpMatch[1].replace(",", ".")) : 0;

    return erpValue;
  },
  ["parsed-erp-data"],
  { revalidate: revalidateDay },
);
