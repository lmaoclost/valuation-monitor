import type { FiiCSVRow } from "./tijoloSchema";
import type { FiiPapelCalculatedDataType } from "@/@types/FiiPapelCalculatedDataType";
import { brazilianFIIManager } from "@/constants/brazilianFIIManager";

const PAPEL_SUBCATEGORIES: Record<string, string> = {
  KNIP11: "Recebiveis >50% IPCA",
  KNCR11: "Recebiveis >50% CDI",
  KNHY11: "Recebiveis >50% CDI",
  CPTS11: "Recebiveis >50% IPCA",
  IRDM11: "Recebiveis Outros",
  HCTR11: "Recebiveis >50% CDI",
  RECR11: "Recebiveis >50% IPCA",
  MCCI11: "Recebiveis >50% CDI",
  MXRF11: "Recebiveis Outros",
  HGCR11: "Recebiveis >50% IPCA",
  KNUQ11: "Recebiveis >50% CDI",
  VGHF11: "Recebiveis Outros",
  VRTA11: "Recebiveis Outros",
  RBRR11: "Recebiveis >50% IPCA",
  VCJR11: "Recebiveis >50% CDI",
  DEVA11: "Recebiveis Outros",
  RBRY11: "Recebiveis >50% CDI",
  KNSC11: "Recebiveis >50% IPCA",
  URPR11: "Recebiveis Outros",
  VGIR11: "Recebiveis >50% CDI",
  MCHY11: "Recebiveis Outros",
  VGIP11: "Recebiveis >50% IPCA",
  CVBI11: "Recebiveis >50% IPCA",
  BTCI11: "Recebiveis >50% CDI",
  XPCI11: "Recebiveis Outros",
  HABT11: "Recebiveis Outros",
  BCRI11: "Recebiveis >50% IPCA",
  CACR11: "Recebiveis Outros",
  HREC11: "Recebiveis Outros",
  AFHI11: "Recebiveis Outros",
  CLIN11: "Recebiveis >50% IPCA",
  SNCI11: "Recebiveis Outros",
  ICRI11: "Recebiveis >50% IPCA",
  KCRE11: "Recebiveis Outros",
  PORD11: "Recebiveis Outros",
  MANA11: "Recebiveis Outros",
  RPRI11: "Recebiveis >50% IPCA",
  OUJP11: "Recebiveis Outros",
  VSLH11: "Recebiveis Outros",
  WHGR11: "Recebiveis Outros",
  RBRX11: "Recebiveis Outros",
  LIFE11: "Recebiveis Outros",
  HSAF11: "Recebiveis Outros",
  BARI11: "Recebiveis >50% IPCA",
};

export const papelDomain = (
  row: FiiCSVRow,
): FiiPapelCalculatedDataType => {
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
    subcategoria: PAPEL_SUBCATEGORIES[ticker] ?? "Recebiveis Outros",
  };
};
