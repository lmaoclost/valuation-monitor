import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchWithTimeout } from "@/lib/fetch-timeout";
import { BROWSER_USER_AGENT } from "@/lib/fetch-timeout";

describe("fetchWithTimeout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: true });
  });

  it("sends a browser User-Agent by default", async () => {
    await fetchWithTimeout("https://example.com/data.csv");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/data.csv",
      expect.objectContaining({
        headers: expect.objectContaining({ "User-Agent": BROWSER_USER_AGENT }),
      }),
    );
  });

  it("respects an explicit User-Agent", async () => {
    await fetchWithTimeout("https://example.com/data.csv", {
      headers: { "User-Agent": "custom-agent" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://example.com/data.csv",
      expect.objectContaining({
        headers: expect.objectContaining({ "User-Agent": "custom-agent" }),
      }),
    );
  });
});
