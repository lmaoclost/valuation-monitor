import { StatusInvestDataType } from "@/@types/StatusInvestData.type";
import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";

export const stocksNormalizer = (
  row: StatusInvestDataType,
): StatusInvestNormalizedDataType => {
  return {
    TICKER: row["TICKER"],
    PRECO: toNumber(row["PRECO"]),
    DY: toNumber(row["DY"]),
    "P/L": toNumber(row["P/L"]),
    "P/VP": toNumber(row["P/VP"]),
    "P/ATIVOS": toNumber(row["P/ATIVOS"]),
    "MARGEM BRUTA": toPercentage(row["MARGEM BRUTA"]),
    "MARGEM EBIT": toPercentage(row["MARGEM EBIT"]),
    "MARG. LIQUIDA": toPercentage(row["MARG. LIQUIDA"]),
    "P/EBIT": toNumber(row["P/EBIT"]),
    "EV/EBIT": toNumber(row["EV/EBIT"]),
    "DIVIDA LIQUIDA / EBIT": toNumber(row["DIVIDA LIQUIDA / EBIT"]),
    "DIV. LIQ. / PATRI.": toNumber(row["DIV. LIQ. / PATRI."]),
    PSR: toNumber(row["PSR"]),
    "P/CAP. GIRO": toNumber(row["P/CAP. GIRO"]),
    "P. AT CIR. LIQ.": toNumber(row["P. AT CIR. LIQ."]),
    "LIQ. CORRENTE": toNumber(row["LIQ. CORRENTE"]),
    ROE: toPercentage(row["ROE"]),
    ROA: toPercentage(row["ROA"]),
    ROIC: toPercentage(row["ROIC"]),
    "PATRIMONIO / ATIVOS": toNumber(row["PATRIMONIO / ATIVOS"]),
    "PASSIVOS / ATIVOS": toNumber(row["PASSIVOS / ATIVOS"]),
    "GIRO ATIVOS": toNumber(row["GIRO ATIVOS"]),
    "CAGR RECEITAS 5 ANOS": toPercentage(row["CAGR RECEITAS 5 ANOS"]),
    "CAGR LUCROS 5 ANOS": toPercentage(row["CAGR LUCROS 5 ANOS"]),
    " LIQUIDEZ MEDIA DIARIA": toNumber(row[" LIQUIDEZ MEDIA DIARIA"]),
    " VPA": toNumber(row[" VPA"]),
    " LPA": toNumber(row[" LPA"]),
    " PEG Ratio": toNumber(row[" PEG Ratio"]),
    " VALOR DE MERCADO": toNumber(row[" VALOR DE MERCADO"]),
  };
};

const toNumber = (value?: string) => {
  if (!value) return Number();
  return Number(value.replace(/\./g, "").replace(",", "."));
};

const toPercentage = (value?: string) => {
  if (!value) return Number();
  return Number(value.replace(",", ".")) / 100;
};
