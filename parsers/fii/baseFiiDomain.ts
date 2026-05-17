import type { FiiCSVRow } from "./tijoloSchema";
import { brazilianFIIManager } from "@/constants/brazilianFIIManager";

export function baseFiiDomain(row: FiiCSVRow) {
  const ticker = row.TICKER;
  const manager = brazilianFIIManager[ticker];

  return {
    ticker,
    category: manager?.category ?? "",
    price: row.PRECO,
    dy: row.DY,
    pvp: row["P/VP"],
    caixa: row["PERCENTUAL EM CAIXA"],
    cagrDividendos3Anos: row["CAGR DIVIDENDOS 3 ANOS"],
    cagrValorCota3Anos: row[" CAGR VALOR CORA 3 ANOS"],
    patrimonio: row.PATRIMONIO,
    gestor: manager?.manager ?? "",
    isTopManager: manager?.isTopManager ?? false,
    gestao: row.GESTAO,
    cotistas: row["N COTISTAS"],
    liquidezDiaria: row["LIQUIDEZ MEDIA DIARIA"],
  };
}
