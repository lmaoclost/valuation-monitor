import * as cheerio from "cheerio";
import { cacheTag, cacheLife } from "next/cache";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

const getHtmlDecoded = async (url: string): Promise<string> => {
  const response = await fetchWithTimeout(url, { timeout: 10000 });
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("iso-8859-1");
  return decoder.decode(buffer);
};

export const getFundamentusFiiData = async () => {
  "use cache";
  cacheTag("parsed-fundamentus-fii-data");
  cacheLife("days");

  const html = await getHtmlDecoded(
    "https://www.fundamentus.com.br/fii_resultado.php",
  );

  const $ = cheerio.load(html);

  const headers: string[] = [];
  const data: Record<string, string>[] = [];

  $("#tabelaResultado thead tr th").each((_, el) => {
    headers.push($(el).text().trim());
  });

  $("#tabelaResultado tbody tr").each((_, tr) => {
    const row: Record<string, string> = {};
    $(tr)
      .find("td")
      .each((i, td) => {
        row[headers[i]] = $(td).text().trim();
      });
    data.push(row);
  });

  return data;
};
