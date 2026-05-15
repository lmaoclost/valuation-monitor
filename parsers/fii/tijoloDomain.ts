import type { FiiCSVRow } from "./tijoloSchema";
import type { FundamentusRow } from "./fundamentusSchema";
import type { FiiTijoloCalculatedDataType } from "@/@types/FiiTijoloCalculatedDataType";
import { brazilianFIIManager } from "@/constants/brazilianFIIManager";
import { brazilianFIIAssetsRenter } from "@/constants/brazilianFIIAssetsRenter";
import {
  calculateFiiDiscountRate,
  calculateFiiDividendYear,
  calculateFiiPresentValue,
  calculateFiiFairPrice,
  calculateFiiCeelingPrice,
  calculateFiiExpectativaCrescimento,
  calculateFiiDesinvestment,
} from "@/utils";

export const tijoloDomain = (
  statusInvestRow: FiiCSVRow,
  fundamentusRow: FundamentusRow | null,
  tesouroRate: number,
  riskPremium: number,
  growthRate: number,
): FiiTijoloCalculatedDataType => {
  const ticker = statusInvestRow.TICKER;
  const manager = brazilianFIIManager[ticker];
  const assetsRenter = brazilianFIIAssetsRenter[ticker];
  const price = statusInvestRow.PRECO;
  const dy = statusInvestRow.DY;

  const discountRate = calculateFiiDiscountRate(tesouroRate, riskPremium);
  const dividendo1 = price * dy;

  const dividends: number[] = [dividendo1];
  for (let y = 2; y <= 10; y++) {
    dividends.push(calculateFiiDividendYear(dividends[y - 2], growthRate));
  }

  const presentValues: number[] = dividends.map((div, i) =>
    calculateFiiPresentValue(div, discountRate, i + 1),
  );

  const desinvestment = calculateFiiDesinvestment(dividends[9], discountRate);
  const pvDesinvestment = calculateFiiPresentValue(
    desinvestment,
    discountRate,
    10,
  );

  const fairPrice = calculateFiiFairPrice(presentValues, pvDesinvestment);
  const ceelingPrice = calculateFiiCeelingPrice(fairPrice);
  const expectativaCrescimento = calculateFiiExpectativaCrescimento(
    price,
    fairPrice,
  );

  return {
    ticker,
    category: manager?.category ?? "",
    price,
    dy,
    pvp: statusInvestRow["P/VP"],
    riskPremium,
    discountRate,
    growthRate,
    dividendYear1: dividends[0],
    presentValue1: presentValues[0],
    dividendYear2: dividends[1],
    presentValue2: presentValues[1],
    dividendYear3: dividends[2],
    presentValue3: presentValues[2],
    dividendYear4: dividends[3],
    presentValue4: presentValues[3],
    dividendYear5: dividends[4],
    presentValue5: presentValues[4],
    dividendYear6: dividends[5],
    presentValue6: presentValues[5],
    dividendYear7: dividends[6],
    presentValue7: presentValues[6],
    dividendYear8: dividends[7],
    presentValue8: presentValues[7],
    dividendYear9: dividends[8],
    presentValue9: presentValues[8],
    dividendYear10: dividends[9],
    presentValue10: presentValues[9],
    desinvestment,
    presentValueDesinvestment: pvDesinvestment,
    fairPrice,
    ceelingPrice,
    expectativaCrescimento,
    caixa: statusInvestRow["PERCENTUAL EM CAIXA"],
    cagrDividendos3Anos: statusInvestRow["CAGR DIVIDENDOS 3 ANOS"],
    cagrValorCota3Anos: statusInvestRow[" CAGR VALOR CORA 3 ANOS"],
    gestao: statusInvestRow.GESTAO,
    isTopManager: manager?.isTopManager ?? false,
    patrimonio: statusInvestRow.PATRIMONIO,
    qtdImoveis: fundamentusRow?.["Qtd de imóveis"] ?? 0,
    ativos: assetsRenter?.assets ?? "",
    locatario: assetsRenter?.renter ?? "",
    cotistas: statusInvestRow["N COTISTAS"],
    liquidezDiaria: statusInvestRow["LIQUIDEZ MEDIA DIARIA"],
    precoM2: fundamentusRow?.["Preço do m2"] ?? 0,
    aluguelM2: fundamentusRow?.["Aluguel por m2"] ?? 0,
    capRate: fundamentusRow?.["Cap Rate"] ?? 0,
    vacanciaMedia: fundamentusRow?.["Vacância Média"] ?? 0,
  };
};
