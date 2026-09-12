export type ColumnKind = "string" | "number";

export type ColumnTypes = Record<string, ColumnKind>;

export class ApiFilterError extends Error {
  status = 400;
  allowedColumns: string[];

  constructor(message: string, allowedColumns: string[]) {
    super(message);
    this.name = "ApiFilterError";
    this.allowedColumns = allowedColumns;
  }
}

const OPS = new Set([
  "eq",
  "ne",
  "contains",
  "gte",
  "lte",
  "gt",
  "lt",
  "in",
  "sort",
  "limit",
]);

/** Parse formatted BR/US currency, percent and plain numbers. Null when empty. */
export function parseFormattedNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value !== "string") return null;
  let s = value.replace(/[\u00a0\s]/g, "").trim();
  if (s === "" || s === "-" || s === "--") return null;
  s = s.replace(/^(R\$|US\$|\$)/i, "");
  let isPercent = false;
  if (s.endsWith("%")) {
    isPercent = true;
    s = s.slice(0, -1);
  }
  if (s === "") return null;
  const lastDot = s.lastIndexOf(".");
  const lastComma = s.lastIndexOf(",");
  if (lastDot !== -1 && lastComma !== -1) {
    if (lastComma > lastDot) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      s = s.replace(/,/g, "");
    }
  } else if (lastComma !== -1) {
    s = s.replace(",", ".");
  }
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(s)) return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return isPercent ? n / 100 : n;
}

function parseQueryNumber(raw: string, col: string): number {
  const trimmed = raw.trim();
  if (trimmed === "") {
    throw new Error(`Empty numeric value for ${col}`);
  }
  if (trimmed.endsWith("%")) {
    const n = parseFormattedNumber(trimmed);
    if (n === null) throw new Error(`Invalid numeric value '${raw}' for ${col}`);
    return n;
  }
  const normalized = trimmed
    .replace(/^(R\$|US\$|\$)/i, "")
    .replace(/[\u00a0\s]/g, "");
  const lastDot = normalized.lastIndexOf(".");
  const lastComma = normalized.lastIndexOf(",");
  let s = normalized;
  if (lastDot !== -1 && lastComma !== -1) {
    s =
      lastComma > lastDot
        ? s.replace(/\./g, "").replace(",", ".")
        : s.replace(/,/g, "");
  } else if (lastComma !== -1) {
    s = s.replace(",", ".");
  }
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(s)) {
    throw new Error(`Invalid numeric value '${raw}' for ${col}`);
  }
  return Number(s);
}

type Condition = {
  col: string;
  op: string;
  raw: string;
  values: number[];
};

export function applyTableFilter<T extends Record<string, unknown>>(
  rows: T[],
  searchParams: URLSearchParams,
  columnTypes: ColumnTypes,
): T[] {
  const allowedColumns = Object.keys(columnTypes);
  const conditions: Condition[] = [];
  let sort: { col: string; dir: "asc" | "desc" } | null = null;
  let limit: number | null = null;

  for (const [key, value] of searchParams) {
    if (key === "sort") {
      const [col, dir = "asc"] = value.split(":");
      if (!col || !(col in columnTypes)) {
        throw new ApiFilterError(
          `Cannot sort by unknown column '${col}'. Allowed: ${allowedColumns.join(", ")}`,
          allowedColumns,
        );
      }
      if (dir !== "asc" && dir !== "desc") {
        throw new ApiFilterError(
          `Invalid sort direction '${dir}'. Use asc or desc.`,
          allowedColumns,
        );
      }
      sort = { col, dir };
      continue;
    }
    if (key === "limit") {
      const n = Number(value);
      if (!Number.isInteger(n) || n <= 0 || n > 10000) {
        throw new ApiFilterError(
          `Invalid limit '${value}'. Use an integer between 1 and 10000.`,
          allowedColumns,
        );
      }
      limit = n;
      continue;
    }
    const dot = key.lastIndexOf(".");
    let col = key;
    let op: string | null = null;
    if (dot !== -1 && OPS.has(key.slice(dot + 1))) {
      col = key.slice(0, dot);
      op = key.slice(dot + 1);
    }
    if (!(col in columnTypes)) {
      throw new ApiFilterError(
        `Unknown filter column '${col}'. Allowed: ${allowedColumns.join(", ")}`,
        allowedColumns,
      );
    }
    const kind = columnTypes[col];
    const defaultOp = kind === "number" ? "gte" : "eq";
    const finalOp = op ?? defaultOp;
    if (finalOp === "sort" || finalOp === "limit") {
      throw new ApiFilterError(
        `Invalid use of reserved word '${finalOp}' as operator.`,
        allowedColumns,
      );
    }
    if (finalOp === "contains" && kind !== "string") {
      throw new ApiFilterError(
        `Operator 'contains' only applies to string columns. '${col}' is numeric.`,
        allowedColumns,
      );
    }
    conditions.push({ col, op: finalOp, raw: value, values: [] });
  }

  for (const c of conditions) {
    if (columnTypes[c.col] !== "number") continue;
    try {
      if (c.op === "in") {
        const parts = c.raw
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== "");
        if (parts.length === 0) throw new Error("empty in list");
        c.values = parts.map((v) => parseQueryNumber(v, c.col));
      } else {
        c.values = [parseQueryNumber(c.raw, c.col)];
      }
    } catch {
      throw new ApiFilterError(
        `Invalid numeric value '${c.raw}' for column '${c.col}'.`,
        allowedColumns,
      );
    }
  }

  let out = rows.filter((row) =>
    conditions.every((c) => matches(row[c.col], c, columnTypes[c.col])),
  );

  if (sort) {
    const { col, dir } = sort;
    const kind = columnTypes[col];
    const factor = dir === "asc" ? 1 : -1;
    out = [...out].sort((a, b) => {
      const av = a[col];
      const bv = b[col];
      if (kind === "number") {
        const an = parseFormattedNumber(av);
        const bn = parseFormattedNumber(bv);
        if (an === null && bn === null) return 0;
        if (an === null) return 1;
        if (bn === null) return -1;
        return (an - bn) * factor;
      }
      const as = String(av ?? "");
      const bs = String(bv ?? "");
      if (as === "" && bs === "") return 0;
      if (as === "") return 1;
      if (bs === "") return -1;
      return as.localeCompare(bs) * factor;
    });
  }

  if (limit !== null) out = out.slice(0, limit);
  return out;
}

/**
 * Lenient variant for combined endpoints (e.g. /api/fetch-fii returns
 * {tijolo, papel}): drops conditions on columns the array doesn't have
 * instead of throwing. sort/limit still apply when valid for the array.
 */
export function applyTableFilterLenient<T extends Record<string, unknown>>(
  rows: T[],
  searchParams: URLSearchParams,
  columnTypes: ColumnTypes,
): T[] {
  const kept = new URLSearchParams();
  for (const [key, value] of searchParams) {
    if (key === "limit") {
      kept.append(key, value);
      continue;
    }
    if (key === "sort") {
      const [col] = value.split(":");
      if (col && col in columnTypes) kept.append(key, value);
      continue;
    }
    const dot = key.lastIndexOf(".");
    const base =
      dot !== -1 && OPS.has(key.slice(dot + 1)) ? key.slice(0, dot) : key;
    if (base in columnTypes) kept.append(key, value);
  }
  return applyTableFilter(rows, kept, columnTypes);
}

function matches(cell: unknown, c: Condition, kind: ColumnKind): boolean {
  if (kind === "string") {
    const s = String(cell ?? "")
      .trim()
      .toLowerCase();
    switch (c.op) {
      case "eq":
        return s === c.raw.trim().toLowerCase();
      case "ne":
        return s !== c.raw.trim().toLowerCase();
      case "contains":
        return s.includes(c.raw.trim().toLowerCase());
      case "in":
        return c.raw
          .split(",")
          .map((v) => v.trim().toLowerCase())
          .filter((v) => v !== "")
          .includes(s);
      default:
        throw new Error(`Operator '${c.op}' not supported for string columns.`);
    }
  }
  const n = parseFormattedNumber(cell);
  if (n === null) return false;
  switch (c.op) {
    case "eq":
      return n === c.values[0];
    case "ne":
      return n !== c.values[0];
    case "gte":
      return n >= c.values[0];
    case "lte":
      return n <= c.values[0];
    case "gt":
      return n > c.values[0];
    case "lt":
      return n < c.values[0];
    case "in":
      return c.values.includes(n);
    default:
      throw new Error(`Operator '${c.op}' not supported for numeric columns.`);
  }
}

const STOCK_NUMERIC = [
  "price",
  "dy",
  "pl",
  "lpa",
  "vpa",
  "dpa",
  "risk",
  "discount_margin",
  "payout",
  "roe",
  "cagrProfit",
  "damodaramGrowth",
  "growthAverage",
  "bazinDiscount",
  "bazinFairPrice",
  "bazinCeelingPrice",
  "grahamDiscount",
  "grahamFairPrice",
  "grahamCeelingPrice",
  "gordonDiscount",
  "gordonFairPrice",
  "gordonCeelingPrice",
  "d1",
  "peg",
  "psr",
] as const;

const STOCK_STRING = [
  "ticker",
  "companyname",
  "sectorname",
  "segmentname",
  "cicle",
  "growthDividend",
] as const;

function buildTypes(
  numeric: readonly string[],
  strings: readonly string[],
): ColumnTypes {
  const out: ColumnTypes = {};
  for (const c of numeric) out[c] = "number";
  for (const c of strings) out[c] = "string";
  return out;
}

export const STOCK_COLUMN_TYPES: ColumnTypes = buildTypes(
  STOCK_NUMERIC,
  STOCK_STRING,
);

export const USA_STOCK_COLUMN_TYPES: ColumnTypes = STOCK_COLUMN_TYPES;

export const USA_REIT_COLUMN_TYPES: ColumnTypes = STOCK_COLUMN_TYPES;

const FII_TIJOLO_NUMERIC = [
  "price",
  "dy",
  "pvp",
  "riskPremium",
  "discountRate",
  "growthRate",
  "dividendYear1",
  "presentValue1",
  "dividendYear2",
  "presentValue2",
  "dividendYear3",
  "presentValue3",
  "dividendYear4",
  "presentValue4",
  "dividendYear5",
  "presentValue5",
  "dividendYear6",
  "presentValue6",
  "dividendYear7",
  "presentValue7",
  "dividendYear8",
  "presentValue8",
  "dividendYear9",
  "presentValue9",
  "dividendYear10",
  "presentValue10",
  "desinvestment",
  "presentValueDesinvestment",
  "fairPrice",
  "ceelingPrice",
  "expectativaCrescimento",
  "caixa",
  "cagrDividendos3Anos",
  "cagrValorCota3Anos",
  "patrimonio",
  "qtdImoveis",
  "cotistas",
  "liquidezDiaria",
  "precoM2",
  "aluguelM2",
  "capRate",
  "vacanciaMedia",
] as const;

const FII_TIJOLO_STRING = [
  "ticker",
  "category",
  "gestao",
  "isTopManager",
  "ativos",
  "locatario",
] as const;

export const FII_TIJOLO_COLUMN_TYPES: ColumnTypes = buildTypes(
  FII_TIJOLO_NUMERIC,
  FII_TIJOLO_STRING,
);

const FII_LIST_NUMERIC = [
  "price",
  "dy",
  "pvp",
  "caixa",
  "cagrDividendos3Anos",
  "cagrValorCota3Anos",
  "patrimonio",
  "cotistas",
  "liquidezDiaria",
] as const;

const FII_LIST_STRING = [
  "ticker",
  "category",
  "gestor",
  "isTopManager",
  "gestao",
] as const;

export const FII_LIST_COLUMN_TYPES: ColumnTypes = buildTypes(
  FII_LIST_NUMERIC,
  FII_LIST_STRING,
);

export const FII_PAPEL_COLUMN_TYPES: ColumnTypes = {
  ...FII_LIST_COLUMN_TYPES,
  subcategoria: "string",
};
