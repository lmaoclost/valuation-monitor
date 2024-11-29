import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET() {
  const ipcaUrl = "https://www.ibge.gov.br/explica/inflacao.php";

  try {
    // Requisição ao site do IBGE
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
        $(el).find("h3.variavel-titulo").text().includes("IPCA acumulado de 12 meses")
      )
      .find("p.variavel-dado")
      .text()
      .trim();

    const ipcaValue = parseFloat(ipcaElement.replace(",", ".").replace("%", ""));

    return NextResponse.json({ ipca: ipcaValue });
  } catch (error) {
    console.error("Erro ao buscar IPCA:", error);
    return NextResponse.json({ error: "Erro ao buscar IPCA" }, { status: 500 });
  }
}
