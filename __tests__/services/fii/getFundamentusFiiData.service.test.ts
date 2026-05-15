import { describe, it, expect, beforeEach, vi } from "vitest";
import { getFundamentusFiiData } from "@/services/getFundamentusFiiData.service";

const mockHTML = `
<table id="tabelaResultado">
  <thead>
    <tr><th>Papel</th><th>Segmento</th><th>Cotação</th><th>FFO Yield</th><th>Dividend Yield</th><th>P/VP</th><th>Valor de Mercado</th><th>Liquidez</th><th>Qtd de imóveis</th><th>Preço do m2</th><th>Aluguel por m2</th><th>Cap Rate</th><th>Vacância Média</th></tr>
  </thead>
  <tbody>
    <tr><td>HGLG11</td><td>Logisticos</td><td>150,00</td><td>8,50%</td><td>6,00%</td><td>1,25</td><td>500000000</td><td>500000</td><td>10</td><td>5000,00</td><td>50,00</td><td>7,00%</td><td>5,00%</td></tr>
  </tbody>
</table>`;

describe("getFundamentusFiiData Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return parsed Fundamentus data array", async () => {
    const encoder = new TextEncoder();
    global.fetch = vi.fn().mockResolvedValueOnce({
      arrayBuffer: vi.fn().mockResolvedValueOnce(encoder.encode(mockHTML).buffer),
    });

    const result = await getFundamentusFiiData();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].Papel).toBe("HGLG11");
  });

  it("should parse segment from HTML table", async () => {
    const encoder = new TextEncoder();
    global.fetch = vi.fn().mockResolvedValueOnce({
      arrayBuffer: vi.fn().mockResolvedValueOnce(encoder.encode(mockHTML).buffer),
    });

    const result = await getFundamentusFiiData();

    expect(result[0].Segmento).toBe("Logisticos");
  });

  it("should throw when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));

    await expect(getFundamentusFiiData()).rejects.toThrow();
  });
});
