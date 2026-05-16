"use client";

import { ColumnDef } from "@tanstack/react-table";
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
  (t: (key: string) => string, locale?: string): ColumnDef<FiiTijoloFormattedDataType>[] => {
  const isEn = locale === "en";
  return [
    {
      accessorKey: "ticker",
      header: t("ticker"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => {
        return (
          <Link
            className="truncate uppercase font-semibold"
            target="_blank"
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
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dy",
      header: t("dy"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getDyColor(row.getValue("dy") as string)}>
          {row.getValue("dy")}
        </span>
      ),
    },
    {
      accessorKey: "pvp",
      header: t("pvp"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getPvpColor(row.getValue("pvp") as string)}>
          {row.getValue("pvp")}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: t("category"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => {
        const val = row.getValue("category") as string;
        return <div>{isEn ? (categoryTranslations[val] ?? val) : val}</div>;
      },
    },
    {
      accessorKey: "riskPremium",
      header: t("riskPremium"),
      sortingFn: sortNullsLast,
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
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "growthRate",
      header: t("growthRate"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "fairPrice",
      header: t("fairPrice"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "ceelingPrice",
      header: t("ceilingPrice"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "expectativaCrescimento",
      header: t("growthExpectation"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "caixa",
      header: t("caixa"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "cagrDividendos3Anos",
      header: t("cagrDiv3a"),
      sortingFn: sortNullsLast,
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
      sortingFn: sortNullsLast,
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
      sortingFn: sortNullsLast,
      cell: ({ row }) => {
        const gestao = row.getValue("gestao") as string;
        return <span title={gestao}>{gestao.substring(0, 12)}</span>;
      },
    },
    {
      accessorKey: "isTopManager",
      header: t("topManagers"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => {
        const val = row.getValue("isTopManager") as string;
        const labels: Record<string, string> = { "SIM": t("yes"), "NAO": t("no") };
        return <div>{labels[val] ?? val}</div>;
      },
    },
    {
      accessorKey: "patrimonio",
      header: t("patrimonio"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "qtdImoveis",
      header: t("qtdImoveis"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "ativos",
      header: t("ativos"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "locatario",
      header: t("locatario"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "cotistas",
      header: t("cotistas"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "liquidezDiaria",
      header: t("liquidezDiaria"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "precoM2",
      header: t("precoM2"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "aluguelM2",
      header: t("aluguelM2"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "capRate",
      header: t("capRate"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "vacanciaMedia",
      header: t("vacanciaMedia"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear1",
      header: t("dividendYear1"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue1",
      header: t("presentValue1"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear2",
      header: t("dividendYear2"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue2",
      header: t("presentValue2"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear3",
      header: t("dividendYear3"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue3",
      header: t("presentValue3"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear4",
      header: t("dividendYear4"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue4",
      header: t("presentValue4"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear5",
      header: t("dividendYear5"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue5",
      header: t("presentValue5"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear6",
      header: t("dividendYear6"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue6",
      header: t("presentValue6"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear7",
      header: t("dividendYear7"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue7",
      header: t("presentValue7"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear8",
      header: t("dividendYear8"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue8",
      header: t("presentValue8"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear9",
      header: t("dividendYear9"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue9",
      header: t("presentValue9"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear10",
      header: t("dividendYear10"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue10",
      header: t("presentValue10"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "desinvestment",
      header: t("desinvestment"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValueDesinvestment",
      header: t("desinvestmentPv"),
      sortingFn: sortNullsLast,
    },
  ]; };
