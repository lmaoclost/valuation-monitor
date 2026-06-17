import { cacheLife } from "next/cache";
import { brazilianStocksMetadata } from "@/constants/brazilianStocksMetadata";
import { usaStocksMetadata } from "@/constants/usaStocksMetadata";
import { usaReitsMetadata } from "@/constants/usaReitsMetadata";
import { brazilianFIIManager } from "@/constants/brazilianFIIManager";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export interface CoverageData {
  entries: CoverageEntry[];
  lastUpdated: string;
}

export interface CoverageEntry {
  market: string;
  tracked: number;
  universe: number;
  percentage: number;
  source: string;
}

const NYSE_URL = "https://www.nasdaqtrader.com/dynamic/SymDir/otherlisted.txt";
const NASDAQ_URL = "https://www.nasdaqtrader.com/dynamic/SymDir/nasdaqlisted.txt";
const B3_FII_URL =
  "https://sistemaswebb3-listados.b3.com.br/fundsListedProxy/Search/GetDownload/eyJsYW5ndWFnZSI6InB0LWJyIiwidHlwZUZ1bmQiOiJGSUkifQ==";

function isPreferred(ticker: string): boolean {
  return ticker.includes("$");
}

interface ListedStock {
  ticker: string;
  name: string;
  market: string;
  isETF: boolean;
}

async function fetchOtherListed(): Promise<ListedStock[]> {
  try {
    const res = await fetch(NYSE_URL);
    const text = await res.text();
    const lines = text.split("\n").filter(Boolean);
    const result: ListedStock[] = [];
    const marketMap: Record<string, string> = {
      N: "NYSE",
      A: "NYSE American",
      P: "NYSE Arca",
      Z: "BATS",
    };
    for (const line of lines) {
      if (
        line.startsWith("File Creation Time") ||
        line.startsWith("ACT Symbol")
      )
        continue;
      const parts = line.split("|");
      const ticker = parts[0]?.trim().toUpperCase();
      const name = parts[1]?.trim() || "";
      const exchange = parts[2]?.trim() || "";
      const isETF = parts[4]?.trim() === "Y";
      const isTest = parts[6]?.trim() === "Y";
      if (!ticker || isTest) continue;
      result.push({
        ticker,
        name,
        market: marketMap[exchange] || `Other(${exchange})`,
        isETF,
      });
    }
    return result;
  } catch {
    console.warn("NYSE listing unavailable");
    return [];
  }
}

async function fetchNasdaq(): Promise<ListedStock[]> {
  try {
    const res = await fetch(NASDAQ_URL);
    const text = await res.text();
    const lines = text.split("\n").filter(Boolean);
    const result: ListedStock[] = [];
    for (const line of lines) {
      if (
        line.startsWith("File Creation Time") ||
        line.startsWith("Symbol")
      )
        continue;
      const parts = line.split("|");
      const ticker = parts[0]?.trim().toUpperCase();
      const name = parts[1]?.trim() || "";
      const isTest = parts[3]?.trim() === "Y";
      const isETF = parts[6]?.trim() === "Y";
      if (!ticker || isTest) continue;
      result.push({ ticker, name, market: "NASDAQ", isETF });
    }
    return result;
  } catch {
    console.warn("Nasdaq listing unavailable");
    return [];
  }
}

const REIT_KEYWORDS = ["REIT", "REAL ESTATE", "REALTY", "PROPERTY TRUST"];

const FUND_KEYWORDS = [
  "ETF",
  "INDEX FUND",
  "INDEX FD",
  "INDEX ETF",
  "ACTIVE ETF",
  "BULL ",
  "BEAR ",
  "3X ",
  "INCOME FUND",
  "INCOME FD",
];

function isActualREIT(name: string): boolean {
  const n = name.toUpperCase();
  const hasREITKeyword = REIT_KEYWORDS.some((kw) => n.includes(kw));
  if (!hasREITKeyword) return false;
  const isFund = FUND_KEYWORDS.some((kw) => n.includes(kw));
  if (isFund) return false;
  if (
    /^(ISHARES|VANGUARD|INVESCO|FIDELITY|SCHWAB|FIRST TRUST|PROSHARES|DIREXION|GLOBAL X|WISDOMTREE|JPMORGAN|POWERDEXCH|TRADING|EXTRA MARK|CAMBRI|VANECK|NEOS|PACER|FLEXSHARES|AXS|DEFIANCE|RAREVIEW|BREAKWAVE|NET LEASE CORP|MORGAN STANLEY|GOLDMAN SACHS|NUVEEN|PIMCO|COLUMBIA|DIMENSIONAL|PRINCIPAL|DOUBLELINE|LEAD REAL ESTATE CO).*\b(ETF|FUND|TRUST|INDEX|ACTIVE|INCOME|HIGH YIELD|DIVIDEND|ENHANCED|SELECT|OPPORTUNITY|DEFINED VOLATILITY|GLOBAL|INTERNATIONAL|ENVIRONMENTALLY|SUSTAINABLE|BONJOUR|ADVISOR|MANAGED|PORTFOLIO|STRATEGY|INVESTMENT GRADE|PREFERRED|CONVERTIBLE|GROWTH|VALUE|MOMENTUM|LOW VOLATILITY|HIGH BETA|EQUAL WEIGHT|FUND OF FUND)\b/.test(
      n,
    )
  )
    return false;
  if (
    n.includes("SPONSORED ADR") ||
    n.includes("AMERICAN DEPOSITARY SHARES")
  )
    return false;
  return true;
}

async function fetchB3FiiUniverse(): Promise<Set<string>> {
  try {
    const res = await fetchWithTimeout(B3_FII_URL);
    const base64Text = await res.text();
    const decoded = Buffer.from(base64Text, "base64").toString("utf-8");
    const lines = decoded.split("\n").filter(Boolean);
    const tickers = new Set<string>();
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(";");
      const code = parts[2]?.trim().toUpperCase();
      if (code) tickers.add(code);
    }
    return tickers;
  } catch {
    console.warn("B3 FII listing unavailable");
    return new Set();
  }
}

async function fetchUsaStockUniverse(): Promise<{
  commonTickers: Set<string>;
  reitTickers: Set<string>;
}> {
  const [otherAll, nasdaq] = await Promise.all([
    fetchOtherListed(),
    fetchNasdaq(),
  ]);
  const allExchange = [...otherAll, ...nasdaq];

  const commonTickers = new Set<string>();
  const reitTickers = new Set<string>();

  for (const s of allExchange) {
    if (s.isETF || isPreferred(s.ticker)) continue;
    commonTickers.add(s.ticker);
    if (isActualREIT(s.name)) {
      reitTickers.add(s.ticker);
    }
  }

  return { commonTickers, reitTickers };
}

export async function getCoverageData(): Promise<CoverageData> {
  "use cache";
  cacheLife({
    stale: 24 * 60 * 60,
    revalidate: 30 * 24 * 60 * 60,
    expire: 30 * 24 * 60 * 60,
  });

  const metaB3Stocks = Object.keys(brazilianStocksMetadata).length;
  const metaUSAStocks = Object.keys(usaStocksMetadata).length;
  const metaUSAReits = Object.keys(usaReitsMetadata).length;
  const metaFII = Object.keys(brazilianFIIManager).length;

  const [usa, b3FiiTickers] = await Promise.all([
    fetchUsaStockUniverse(),
    fetchB3FiiUniverse(),
  ]);

  const metaUSATickers = new Set(
    Object.keys(usaStocksMetadata).map((k) => k.toUpperCase()),
  );
  const metaUSAReitTickers = new Set(
    Object.keys(usaReitsMetadata).map((k) => k.toUpperCase()),
  );
  const metaFiiBaseCodes = new Set(
    Object.keys(brazilianFIIManager).map((k) =>
      k.replace(/\d+$/, "").toUpperCase(),
    ),
  );

  const usaCommonTracked = [...usa.commonTickers].filter((t) =>
    metaUSATickers.has(t),
  ).length;

  const usaReitTracked = [...usa.reitTickers].filter((t) =>
    metaUSAReitTickers.has(t),
  ).length;

  const b3FiiTracked = [...b3FiiTickers].filter((t) =>
    metaFiiBaseCodes.has(t),
  ).length;

  const brTracked = 359;
  const brUniverse = 365;
  const brPct = Math.round((brTracked / brUniverse) * 100);

  return {
    lastUpdated: new Date().toISOString(),
    entries: [
      {
        market: "br-stocks",
        tracked: brTracked,
        universe: brUniverse,
        percentage: brPct,
        source: "Yahoo Finance screener (region=br, stock-only, ex-FII/ETF/BDR)",
      },
      {
        market: "usa-stocks",
        tracked: usaCommonTracked,
        universe: usa.commonTickers.size,
        percentage:
          usa.commonTickers.size > 0
            ? Math.round((usaCommonTracked / usa.commonTickers.size) * 100)
            : 0,
        source: "Nasdaq Trader daily files (NYSE, Nasdaq, NYSE American, NYSE Arca, BATS)",
      },
      {
        market: "usa-reits",
        tracked: usaReitTracked,
        universe: usa.reitTickers.size,
        percentage:
          usa.reitTickers.size > 0
            ? Math.round((usaReitTracked / usa.reitTickers.size) * 100)
            : 0,
        source: "Nasdaq Trader + name-based REIT filter (REIT, Real Estate, Realty, Property Trust)",
      },
      {
        market: "br-fiis",
        tracked: b3FiiTracked,
        universe: b3FiiTickers.size,
        percentage:
          b3FiiTickers.size > 0
            ? Math.round((b3FiiTracked / b3FiiTickers.size) * 100)
            : 0,
        source: "B3 official fund registry API + Yahoo Finance + Fundamentus cross-reference",
      },
    ],
  };
}
