import * as cheerio from "cheerio";
import { cacheTag, cacheLife } from "next/cache";

const ipcaUrl = process.env.IPCA_URL!;

export const getIPCAData = async () => {
  "use cache";
  cacheTag("parsed-ipca-data");
  cacheLife("days");

  const response = await fetch(ipcaUrl);
  if (!response.ok) {
    throw new Error(`Erro ao acessar o site do IBGE: ${response.status}`);
  }

  // Carregar o HTML na Cheerio
  const html = await response.text();
  const $ = cheerio.load(html);

  // Procurar o valor do IPCA acumulado
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
};
