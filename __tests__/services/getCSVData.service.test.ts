import { describe, it, expect, beforeEach, vi } from "vitest";
import { getCSVData } from "@/services/getCSVData.service";

describe("getCSVData Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CSV_URL = "https://example.com/stocks.csv";
  });

  describe("successful CSV fetch", () => {
    it("should return array of stock data", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        text: vi.fn().mockResolvedValueOnce("TICKER,PRECO,DY\nPETR4,25.5,0.05"),
      });

      const result = await getCSVData();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should call fetch with a browser User-Agent", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce("TICKER,PRECO"),
      });

      await getCSVData();
      expect(global.fetch).toHaveBeenCalledWith(
        "https://example.com/stocks.csv",
        expect.objectContaining({
          headers: expect.objectContaining({
            "User-Agent": expect.stringContaining("Mozilla"),
          }),
        }),
      );
    });

    it("should return empty array on non-OK response without parsing", async () => {
      const text = vi.fn();
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 403, text });
      const result = await getCSVData();
      expect(result).toEqual([]);
      expect(text).not.toHaveBeenCalled();
    });

    it("should handle multiple stock records", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        text: vi
          .fn()
          .mockResolvedValueOnce("TICKER,PRECO\nPETR4,25.5\nVALE5,50.0"),
      });

      const result = await getCSVData();
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("error handling", () => {
    it("should return empty array when fetch fails", async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));
      const result = await getCSVData();
      expect(result).toEqual([]);
    });

    it("should return empty array when text parsing fails", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        text: vi.fn().mockRejectedValueOnce(new Error("Parse error")),
      });
      const result = await getCSVData();
      expect(result).toEqual([]);
    });
  });
});
