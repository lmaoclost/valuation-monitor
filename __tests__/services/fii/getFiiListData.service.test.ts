import { describe, it, expect, beforeEach, vi } from "vitest";
import { getFiiListData } from "@/services/getFiiListData.service";

const mockCSV = "TICKER,PRECO,DY,VALOR PATRIMONIAL COTA,P/VP,LIQUIDEZ MEDIA DIARIA,PERCENTUAL EM CAIXA,CAGR DIVIDENDOS 3 ANOS, CAGR VALOR CORA 3 ANOS,PATRIMONIO,N COTISTAS,GESTAO\nKNCA11,100.00,6.00,90.00,1.11,500000,5.00,5.00,3.00,500000000,5000,GESTORA ABC";

describe("getFiiListData Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.FII_CSV_URL = "https://example.com/fii.csv";
  });

  it("should return parsed data for agronegócio type", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce(mockCSV),
    });

    const result = await getFiiListData("agronegócio");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].ticker).toBe("KNCA11");
  });

  it("should throw when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));

    await expect(getFiiListData("agronegócio")).rejects.toThrow();
  });
});
