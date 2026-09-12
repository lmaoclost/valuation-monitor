import { describe, it, expect } from "vitest";
import {
  applyTableFilter,
  applyTableFilterLenient,
  parseFormattedNumber,
  STOCK_COLUMN_TYPES,
  FII_TIJOLO_COLUMN_TYPES,
  FII_PAPEL_COLUMN_TYPES,
  FII_LIST_COLUMN_TYPES,
  ApiFilterError,
} from "@/lib/api-filter";

const stocks = [
  {
    ticker: "PETR4",
    companyname: "Petrobras",
    sectorname: "Petróleo",
    price: "R$ 25,50",
    dy: "12,34%",
    bazinDiscount: "35,00%",
    grahamDiscount: "10,00%",
    pl: "",
  },
  {
    ticker: "VALE3",
    companyname: "Vale",
    sectorname: "Mineração",
    price: "R$ 65,00",
    dy: "8,00%",
    bazinDiscount: "5,00%",
    grahamDiscount: "40,00%",
    pl: "",
  },
  {
    ticker: "WEGE3",
    companyname: "Weg",
    sectorname: "Industrial",
    price: "R$ 45,00",
    dy: "2,00%",
    bazinDiscount: "",
    grahamDiscount: "",
    pl: "",
  },
];

const params = (q: string) =>
  new URLSearchParams(q.startsWith("?") ? q.slice(1) : q);

describe("parseFormattedNumber", () => {
  it("parses BR currency, BR percent and plain numbers", () => {
    expect(parseFormattedNumber("R$ 25,50")).toBeCloseTo(25.5);
    expect(parseFormattedNumber("35,00%")).toBeCloseTo(0.35);
    expect(parseFormattedNumber("0.3")).toBeCloseTo(0.3);
    expect(parseFormattedNumber("")).toBeNull();
    expect(parseFormattedNumber(12)).toBe(12);
  });

  it("parses USD currency and percent-sign query values", () => {
    expect(parseFormattedNumber("$45.50")).toBeCloseTo(45.5);
    expect(parseFormattedNumber("30%")).toBeCloseTo(0.3);
  });
});

describe("applyTableFilter", () => {
  it("returns all rows when no filter params", () => {
    expect(applyTableFilter(stocks, params(""), STOCK_COLUMN_TYPES)).toHaveLength(
      3,
    );
  });

  it("filters numeric discount with bare value as gte", () => {
    const out = applyTableFilter(
      stocks,
      params("?bazinDiscount=0.3"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["PETR4"]);
  });

  it("accepts percent-sign query values for discounts", () => {
    const out = applyTableFilter(
      stocks,
      params("?bazinDiscount.gte=30%"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["PETR4"]);
  });

  it("combines multiple filters with AND", () => {
    const out = applyTableFilter(
      stocks,
      params("?grahamDiscount.gte=0.3&price.lte=70"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["VALE3"]);
  });

  it("filters strings case-insensitively with contains", () => {
    const out = applyTableFilter(
      stocks,
      params("?companyname.contains=petro"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["PETR4"]);
  });

  it("supports in operator for tickers", () => {
    const out = applyTableFilter(
      stocks,
      params("?ticker.in=PETR4,wege3"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["PETR4", "WEGE3"]);
  });

  it("excludes empty formatted values from numeric filters", () => {
    const out = applyTableFilter(
      stocks,
      params("?bazinDiscount.gte=0"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["PETR4", "VALE3"]);
  });

  it("sorts numerically and applies limit", () => {
    const out = applyTableFilter(
      stocks,
      params("?sort=price:desc&limit=2"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["VALE3", "WEGE3"]);
  });

  it("throws 400 for unknown columns", () => {
    try {
      applyTableFilter(stocks, params("?nope=1"), STOCK_COLUMN_TYPES);
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(ApiFilterError);
      expect((e as ApiFilterError).status).toBe(400);
    }
  });

  it("throws 400 for invalid numeric values", () => {
    try {
      applyTableFilter(
        stocks,
        params("?price.gte=abc"),
        STOCK_COLUMN_TYPES,
      );
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(ApiFilterError);
      expect((e as ApiFilterError).status).toBe(400);
    }
  });

  it("exposes column type maps for FII variants", () => {
    expect(FII_TIJOLO_COLUMN_TYPES.fairPrice).toBe("number");
    expect(FII_PAPEL_COLUMN_TYPES.subcategoria).toBe("string");
    expect(FII_LIST_COLUMN_TYPES.dy).toBe("number");
  });

  it("lenient variant drops unknown columns instead of throwing", () => {
    const out = applyTableFilterLenient(
      stocks,
      params("?fairPrice.gte=10&price.gte=30"),
      STOCK_COLUMN_TYPES,
    );
    expect(out.map((r) => r.ticker)).toEqual(["VALE3", "WEGE3"]);
  });
});
