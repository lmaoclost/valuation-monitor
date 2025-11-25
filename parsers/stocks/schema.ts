import { z } from "zod";

const toNumber = z.string().transform((val) => {
  if (!val || val.trim() === "") return Number();
  const parsed = parseFloat(val.replace(/\./g, "").replace(",", "."));
  return isNaN(parsed) ? Number() : parsed;
});

const toPercentage = z.string().transform((val) => {
  if (!val || val.trim() === "") return Number();
  const parsed = parseFloat(val.replace(",", "."));
  return isNaN(parsed) ? Number() : parsed / 100;
});

export const StatusInvestNormalizedSchema = z.array(
  z.object({
    TICKER: z.string(),
    PRECO: toNumber,
    DY: toPercentage,
    "P/L": toNumber,
    "P/VP": toNumber,
    "P/ATIVOS": toNumber,
    "MARGEM BRUTA": toPercentage,
    "MARGEM EBIT": toPercentage,
    "MARG. LIQUIDA": toPercentage,
    "P/EBIT": toNumber,
    "EV/EBIT": toNumber,
    "DIVIDA LIQUIDA / EBIT": toNumber,
    "DIV. LIQ. / PATRI.": toNumber,
    PSR: toNumber,
    "P/CAP. GIRO": toNumber,
    "P. AT CIR. LIQ.": toNumber,
    "LIQ. CORRENTE": toNumber,
    ROE: toPercentage,
    ROA: toPercentage,
    ROIC: toPercentage,
    "PATRIMONIO / ATIVOS": toNumber,
    "PASSIVOS / ATIVOS": toNumber,
    "GIRO ATIVOS": toNumber,
    "CAGR RECEITAS 5 ANOS": toPercentage,
    "CAGR LUCROS 5 ANOS": toPercentage,
    " LIQUIDEZ MEDIA DIARIA": toNumber,
    " VPA": toNumber,
    " LPA": toNumber,
    " PEG Ratio": toNumber,
    " VALOR DE MERCADO": toNumber,
  }),
);

export type StatusInvestNormalizedDataType = z.infer<
  typeof StatusInvestNormalizedSchema
>;
