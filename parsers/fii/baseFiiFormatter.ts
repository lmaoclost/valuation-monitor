import { formatCurrency, formatPercentage } from "@/utils";
import { calculateFiiPapelFieldColor } from "@/utils/calculateFiiPapelFieldColor";

export function baseFiiFormatter(row: {
  ticker: string;
  category: string;
  price: string;
  dy: string;
  pvp: number;
  caixa: number;
  cagrDividendos3Anos: string;
  cagrValorCota3Anos: string;
  patrimonio: string;
  gestor: string;
  isTopManager: boolean;
  gestao: string;
  cotistas: number;
  liquidezDiaria: string;
}) {
  return {
    ticker: row.ticker,
    category: row.category,
    price: formatCurrency(row.price),
    dy: formatPercentage(row.dy),
    pvp: row.pvp.toFixed(2),
    caixa: formatPercentage(row.caixa / 100),
    cagrDividendos3Anos: formatPercentage(row.cagrDividendos3Anos / 100),
    cagrDividendos3AnosColor: calculateFiiPapelFieldColor("cagrDiv", row.cagrDividendos3Anos / 100),
    cagrValorCota3Anos: formatPercentage(row.cagrValorCota3Anos / 100),
    cagrValorCota3AnosColor: calculateFiiPapelFieldColor("cagrCota", row.cagrValorCota3Anos / 100),
    patrimonio: formatCurrency(row.patrimonio),
    gestor: row.gestor,
    isTopManager: row.isTopManager ? "SIM" : "NAO",
    gestao: row.gestao,
    cotistas: row.cotistas.toString(),
    liquidezDiaria: formatCurrency(row.liquidezDiaria),
  };
}
