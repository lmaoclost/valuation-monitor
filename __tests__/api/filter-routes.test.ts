import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/services", () => ({
  getStocksData: vi.fn(),
  getUSAStocksData: vi.fn(),
  getUSAReitData: vi.fn(),
  getFiiTijoloData: vi.fn(),
  getFiiPapelData: vi.fn(),
  getFiiListData: vi.fn(),
}));

import { GET as getStocks } from "@/app/api/fetch-stocks/route";
import { GET as getTijolo } from "@/app/api/fetch-fii/tijolo/route";
import { GET as getFii } from "@/app/api/fetch-fii/route";
import {
  getStocksData,
  getFiiTijoloData,
  getFiiPapelData,
} from "@/services";

const req = (url: string) => new NextRequest(new URL(url));

const stockRows = [
  { ticker: "PETR4", price: "R$ 25,50", bazinDiscount: "35,00%" },
  { ticker: "VALE3", price: "R$ 65,00", bazinDiscount: "5,00%" },
];

describe("filtered API routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("filters stocks by bare bazinDiscount value (gte)", async () => {
    vi.mocked(getStocksData).mockResolvedValueOnce(stockRows as never);
    const res = await getStocks(
      req("http://localhost/api/fetch-stocks?bazinDiscount=0.3"),
    );
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.map((r: { ticker: string }) => r.ticker)).toEqual(["PETR4"]);
  });

  it("returns 400 with allowedColumns for unknown filter column", async () => {
    vi.mocked(getStocksData).mockResolvedValueOnce(stockRows as never);
    const res = await getStocks(
      req("http://localhost/api/fetch-stocks?nope=1"),
    );
    const body = await res.json();
    expect(res.status).toBe(400);
    expect(body.error).toMatch(/Unknown filter column/);
    expect(body.allowedColumns).toContain("bazinDiscount");
  });

  it("returns 400 for invalid numeric filter value", async () => {
    vi.mocked(getStocksData).mockResolvedValueOnce(stockRows as never);
    const res = await getStocks(
      req("http://localhost/api/fetch-stocks?price.gte=abc"),
    );
    expect(res.status).toBe(400);
  });

  it("filters FII tijolo by fairPrice", async () => {
    vi.mocked(getFiiTijoloData).mockResolvedValueOnce([
      { ticker: "HGLG11", fairPrice: "R$ 170,00", dy: "8,00%" },
      { ticker: "XPLG11", fairPrice: "R$ 100,00", dy: "9,00%" },
    ] as never);
    const res = await getTijolo(
      req("http://localhost/api/fetch-fii/tijolo?fairPrice.gte=150"),
    );
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.map((r: { ticker: string }) => r.ticker)).toEqual(["HGLG11"]);
  });

  it("combined FII endpoint filters each array leniently", async () => {
    vi.mocked(getFiiTijoloData).mockResolvedValueOnce([
      { ticker: "HGLG11", fairPrice: "R$ 170,00", price: "R$ 150,00" },
      { ticker: "XPLG11", fairPrice: "R$ 100,00", price: "R$ 110,00" },
    ] as never);
    vi.mocked(getFiiPapelData).mockResolvedValueOnce([
      { ticker: "KNIP11", price: "R$ 90,00" },
      { ticker: "KNCR11", price: "R$ 200,00" },
    ] as never);
    const res = await getFii(
      req("http://localhost/api/fetch-fii?price.gte=120"),
    );
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.tijolo.map((r: { ticker: string }) => r.ticker)).toEqual([
      "HGLG11",
    ]);
    expect(body.papel.map((r: { ticker: string }) => r.ticker)).toEqual([
      "KNCR11",
    ]);
  });
});
