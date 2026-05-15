import { z } from "zod";

const toNumber = z.string().transform((val) => {
  if (!val || val.trim() === "") return 0;
  const parsed = parseFloat(val.replace(/\./g, "").replace(",", "."));
  return isNaN(parsed) ? 0 : parsed;
});

const toPercentage = z.string().transform((val) => {
  if (!val || val.trim() === "") return 0;
  const parsed = parseFloat(val.replace(",", "."));
  return isNaN(parsed) ? 0 : parsed / 100;
});

export const StatusInvestFiiSchema = z.array(
  z.object({
    TICKER: z.string(),
    PRECO: toNumber,
    DY: toPercentage,
    "VALOR PATRIMONIAL COTA": toNumber,
    "P/VP": toNumber,
    "LIQUIDEZ MEDIA DIARIA": toNumber,
    "PERCENTUAL EM CAIXA": toNumber,
    "CAGR DIVIDENDOS 3 ANOS": toNumber,
    " CAGR VALOR CORA 3 ANOS": toNumber,
    PATRIMONIO: toNumber,
    "N COTISTAS": toNumber,
    GESTAO: z.string(),
  }),
);

export type StatusInvestFiiNormalizedType = z.infer<
  typeof StatusInvestFiiSchema
>;
const FiiCSVRowSchema = StatusInvestFiiSchema.element;
export type FiiCSVRow = z.infer<typeof FiiCSVRowSchema>;
