import { describe, it, expect, beforeEach, vi } from "vitest";
import { getUSACSVData } from "@/services/getUSACSVData.service";

describe("getUSACSVData Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CSV_USA_STOCKS_URL = "https://example.com/usa-stocks.csv";
  });

  it("should return array when fetch succeeds", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce("TICKER,PRECO\nAAPL,150.00"),
    });
    const result = await getUSACSVData();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return empty array when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));
    const result = await getUSACSVData();
    expect(result).toEqual([]);
  });
});
