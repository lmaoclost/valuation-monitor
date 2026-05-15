import { describe, it, expect, beforeEach, vi } from "vitest";
import { getFiiCSVData } from "@/services/getFiiCSVData.service";

const mockCSV = "TICKER,PRECO,DY,VALOR PATRIMONIAL COTA,P/VP,LIQUIDEZ MEDIA DIARIA,PERCENTUAL EM CAIXA,CAGR DIVIDENDOS 3 ANOS, CAGR VALOR CORA 3 ANOS,PATRIMONIO,N COTISTAS,GESTAO\nHGLG11,150.00,8.50,120.00,1.25,500000,5.00,8.00,6.00,500000000,5000,GESTORA ABC";

describe("getFiiCSVData Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.FII_CSV_URL = "https://example.com/fii.csv";
  });

  it("should return parsed CSV data array", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce(mockCSV),
    });

    const result = await getFiiCSVData();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should call fetch with correct URL", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce(mockCSV),
    });

    await getFiiCSVData();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/fii.csv",
      expect.anything(),
    );
  });

  it("should handle empty CSV", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce(""),
    });

    const result = await getFiiCSVData();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should throw when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));

    await expect(getFiiCSVData()).rejects.toThrow();
  });
});
