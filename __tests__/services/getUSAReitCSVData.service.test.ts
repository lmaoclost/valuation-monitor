import { describe, it, expect, beforeEach, vi } from "vitest";
import { getUSAReitCSVData } from "@/services/getUSAReitCSVData.service";

describe("getUSAReitCSVData Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CSV_USA_REIT_URL = "https://example.com/usa-reits.csv";
  });

  it("should return array when fetch succeeds", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce("TICKER,PRECO\nPLD,120.00"),
    });
    const result = await getUSAReitCSVData();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return empty array when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));
    const result = await getUSAReitCSVData();
    expect(result).toEqual([]);
  });
});
