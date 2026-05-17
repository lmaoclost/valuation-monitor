import { describe, it, expect } from "vitest";
import { toNumber, toPercentage } from "@/parsers/shared/transforms";

describe("toNumber", () => {
  it("parses integer string", () => {
    const result = toNumber.parse("1234");
    expect(result).toBe(1234);
  });

  it("parses Brazilian decimal format (comma)", () => {
    const result = toNumber.parse("1234,56");
    expect(result).toBe(1234.56);
  });

  it("parses Brazilian thousands format (dot groups, comma decimal)", () => {
    const result = toNumber.parse("1.234.567,89");
    expect(result).toBe(1234567.89);
  });

  it("parses plain decimal (comma as separator)", () => {
    const result = toNumber.parse("45,67");
    expect(result).toBe(45.67);
  });

  it("returns 0 for empty string", () => {
    const result = toNumber.parse("");
    expect(result).toBe(0);
  });

  it("returns 0 for whitespace", () => {
    const result = toNumber.parse("   ");
    expect(result).toBe(0);
  });

  it("returns 0 for invalid input", () => {
    const result = toNumber.parse("N/A");
    expect(result).toBe(0);
  });

  it("parses negative number", () => {
    const result = toNumber.parse("-1234,56");
    expect(result).toBe(-1234.56);
  });
});

describe("toPercentage", () => {
  it("parses percentage with % sign", () => {
    const result = toPercentage.parse("8,5%");
    expect(result).toBe(0.085);
  });

  it("parses percentage without % sign", () => {
    const result = toPercentage.parse("12,5");
    expect(result).toBe(0.125);
  });

  it("parses whole percentage", () => {
    const result = toPercentage.parse("100%");
    expect(result).toBe(1);
  });

  it("parses decimal percentage", () => {
    const result = toPercentage.parse("0,5%");
    expect(result).toBe(0.005);
  });

  it("returns 0 for empty string", () => {
    const result = toPercentage.parse("");
    expect(result).toBe(0);
  });

  it("returns 0 for invalid input", () => {
    const result = toPercentage.parse("--");
    expect(result).toBe(0);
  });

  it("parses Brazilian decimal format", () => {
    const result = toPercentage.parse("10,5%");
    expect(result).toBe(0.105);
  });
});
