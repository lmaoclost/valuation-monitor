import { describe, it, expect, beforeEach, vi } from "vitest";
import { getTesouroIPCA2035 } from "@/services/getTesouroIPCA2035.service";

const mockHTML = `
<div class="value-wrap">
  <h3>Taxa</h3>
  <strong class="value">IPCA + 7,47%</strong>
</div>
<div class="value-wrap">
  <strong class="value">Vencimento</strong>
  <span class="sub-value">15/08/2035</span>
</div>`;

describe("getTesouroIPCA2035 Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STATUS_INVEST_IPCA2035_URL = "https://example.com/tesouro-ipca-2035";
  });

  it("should parse tesouro IPCA+ rate from HTML", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce(mockHTML),
    });

    const result = await getTesouroIPCA2035();

    expect(typeof result).toBe("number");
  });

  it("should return a decimal rate (e.g. 0.0747 for 7.47%)", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce(mockHTML),
    });

    const result = await getTesouroIPCA2035();

    expect(result).toBe(0.0747);
  });

  it("should return 0 when rate not found in HTML", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      text: vi.fn().mockResolvedValueOnce("<html><body>No rate here</body></html>"),
    });

    const result = await getTesouroIPCA2035();
    expect(result).toBe(0);
  });

  it("should return 0 when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));

    const result = await getTesouroIPCA2035();
    expect(result).toBe(0);
  });
});
