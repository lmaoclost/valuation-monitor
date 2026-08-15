"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AppTableFeatures } from "./tableFeatures";
import Link from "next/link";
import type { FiiTijoloFormattedDataType } from "@/@types/FiiTijoloFormattedDataType";
import { sortNullsLast } from "@/utils";
import { calculateFiiTijoloFieldColor } from "@/utils/calculateFiiTijoloFieldColor";
import { categoryTranslations } from "@/utils/domainTranslations";

const getDyColor = (val: string): string => {
  const num = parseFloat(val.replace("%", "").replace(",", "."));
  return calculateFiiTijoloFieldColor("dy", num / 100);
};

const getPvpColor = (val: string): string => {
  const num = parseFloat(val.replace(",", "."));
  return calculateFiiTijoloFieldColor("pvp", num);
};

export const createTijoloColumns =
  (t: (key: string) => string, locale?: string): ColumnDef<AppTableFeatures, FiiTijoloFormattedDataType>[] => {
  const isEn = locale === "en";
  return [
    {
      accessorKey: "ticker",
      header: t("ticker"),
      sortFn: sortNullsLast,
      cell: ({ row }) => {
        return (
          <Link
            className="truncate uppercase font-semibold"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://br.tradingview.com/chart/?symbol=BMFBOVESPA%3A${row.getValue("ticker")}`}
          >
            {row.getValue("ticker")}
          </Link>
        );
      },
    },
    {
      accessorKey: "price",
      header: t("price"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dy",
      header: t("dy"),
      sortFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getDyColor(row.getValue("dy") as string)}>
          {row.getValue("dy")}
        </span>
      ),
    },
    {
      accessorKey: "pvp",
      header: t("pvp"),
      sortFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getPvpColor(row.getValue("pvp") as string)}>
          {row.getValue("pvp")}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: t("category"),
      sortFn: sortNullsLast,
      cell: ({ row }) => {
        const val = row.getValue("category") as string;
        return <div>{isEn ? (categoryTranslations[val] ?? val) : val}</div>;
      },
    },
    {
      accessorKey: "riskPremium",
      header: t("riskPremium"),
      sortFn: sortNullsLast,
      cell: ({ row }) => (
        <span
          className={
            (row.original as FiiTijoloFormattedDataType).riskPremiumColor
          }
        >
          {row.getValue("riskPremium")}
        </span>
      ),
    },
    {
      accessorKey: "discountRate",
      header: t("discountRate"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "growthRate",
      header: t("growthRate"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "fairPrice",
      header: t("fairPrice"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "ceelingPrice",
      header: t("ceilingPrice"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "expectativaCrescimento",
      header: t("growthExpectation"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "caixa",
      header: t("caixa"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "cagrDividendos3Anos",
      header: t("cagrDiv3a"),
      sortFn: sortNullsLast,
      cell: ({ row }) => (
        <span
          className={
            (row.original as FiiTijoloFormattedDataType)
              .cagrDividendos3AnosColor
          }
        >
          {row.getValue("cagrDividendos3Anos")}
        </span>
      ),
    },
    {
      accessorKey: "cagrValorCota3Anos",
      header: t("cagrCota3a"),
      sortFn: sortNullsLast,
      cell: ({ row }) => (
        <span
          className={
            (row.original as FiiTijoloFormattedDataType).cagrValorCota3AnosColor
          }
        >
          {row.getValue("cagrValorCota3Anos")}
        </span>
      ),
    },
    {
      accessorKey: "gestao",
      header: t("management"),
      sortFn: sortNullsLast,
      cell: ({ row }) => {
        const gestao = row.getValue("gestao") as string;
        return <span title={gestao}>{gestao.substring(0, 12)}</span>;
      },
    },
    {
      accessorKey: "isTopManager",
      header: t("topManagers"),
      sortFn: sortNullsLast,
      cell: ({ row }) => {
        const val = row.getValue("isTopManager") as string;
        const labels: Record<string, string> = { "SIM": t("yes"), "NAO": t("no") };
        return <div>{labels[val] ?? val}</div>;
      },
    },
    {
      accessorKey: "patrimonio",
      header: t("patrimonio"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "qtdImoveis",
      header: t("qtdImoveis"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "ativos",
      header: t("ativos"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "locatario",
      header: t("locatario"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "cotistas",
      header: t("cotistas"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "liquidezDiaria",
      header: t("liquidezDiaria"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "precoM2",
      header: t("precoM2"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "aluguelM2",
      header: t("aluguelM2"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "capRate",
      header: t("capRate"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "vacanciaMedia",
      header: t("vacanciaMedia"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear1",
      header: t("dividendYear1"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue1",
      header: t("presentValue1"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear2",
      header: t("dividendYear2"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue2",
      header: t("presentValue2"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear3",
      header: t("dividendYear3"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue3",
      header: t("presentValue3"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear4",
      header: t("dividendYear4"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue4",
      header: t("presentValue4"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear5",
      header: t("dividendYear5"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue5",
      header: t("presentValue5"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear6",
      header: t("dividendYear6"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue6",
      header: t("presentValue6"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear7",
      header: t("dividendYear7"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue7",
      header: t("presentValue7"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear8",
      header: t("dividendYear8"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue8",
      header: t("presentValue8"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear9",
      header: t("dividendYear9"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue9",
      header: t("presentValue9"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear10",
      header: t("dividendYear10"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue10",
      header: t("presentValue10"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "desinvestment",
      header: t("desinvestment"),
      sortFn: sortNullsLast,
    },
    {
      accessorKey: "presentValueDesinvestment",
      header: t("desinvestmentPv"),
      sortFn: sortNullsLast,
    },
  ]; };
