/**
 * Daily BR-stocks CSV fetch via real Chromium.
 *
 * Replays the manual flow: busca-avancada -> close promo popup ->
 * Buscar -> DOWNLOAD. Validates the file loudly and never writes
 * garbage: any validation failure exits non-zero (CI fails, nothing
 * is committed).
 *
 * Usage: node scripts/fetch-br-csv.mjs [output-path]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

chromium.use(StealthPlugin());

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath =
  process.argv[2] ?? join(root, "data", "br-stocks.csv");

const SEARCH_URL = "https://statusinvest.com.br/acoes/busca-avancada";

const fail = (message) => {
  console.error(`fetch-br-csv: ${message}`);
  process.exit(1);
};

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ acceptDownloads: true });
  await page.goto(SEARCH_URL, { waitUntil: "domcontentloaded", timeout: 60000 });

  const close = page.getByRole("button", { name: "close" });
  if ((await close.count()) > 0) {
    await close.first().click().catch(() => {});
  }

  await page.getByRole("button", { name: "search Buscar" }).click({ timeout: 30000 });
  await page.waitForTimeout(5000);

  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 120000 }),
    page.getByText("cloud_download DOWNLOAD").click({ timeout: 30000 }),
  ]);

  const tmpPath = await download.path();
  if (!tmpPath) fail("download produced no file");

  const { readFileSync } = await import("node:fs");
  const csv = readFileSync(tmpPath, "utf-8");

  const lines = csv.split("\n").filter((l) => l.trim() !== "");
  if (!lines[0]?.startsWith("TICKER;PRECO;DY")) {
    fail(`unexpected header: ${lines[0]?.slice(0, 80)}`);
  }
  if (lines.length < 500) {
    fail(`too few rows: ${lines.length}`);
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, csv);
  console.log(`fetch-br-csv: wrote ${lines.length - 1} rows to ${outPath}`);
} finally {
  await browser.close();
}
