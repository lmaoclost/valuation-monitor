"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { FiiListFormattedDataType } from "@/@types/FiiListFormattedDataType";
import { sortNullsLast } from "@/utils";
import { calculateFiiPapelFieldColor } from "@/utils/calculateFiiPapelFieldColor";
import { useTranslations } from "next-intl";

const getDyListColor = (val: string): string => {
  const num = parseFloat(val.replace("%", "").replace(",", "."));
  return calculateFiiPapelFieldColor("dy", num / 100);
};

const getPvpListColor = (val: string): string => {
  const num = parseFloat(val.replace(",", "."));
  return calculateFiiPapelFieldColor("pvp", num);
};

export const createFiiListColumns =
  (): ColumnDef<FiiListFormattedDataType>[] => {
  const t = useTranslations("Columns");
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
        <span className={getDyListColor(row.getValue("dy") as string)}>
          {row.getValue("dy")}
        </span>
      ),
    },
    {
      accessorKey: "pvp",
      header: t("pvp"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getPvpListColor(row.getValue("pvp") as string)}>
          {row.getValue("pvp")}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: t("category"),
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
            (row.original as FiiListFormattedDataType).cagrDividendos3AnosColor
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
            (row.original as FiiListFormattedDataType).cagrValorCota3AnosColor
          }
        >
          {row.getValue("cagrValorCota3Anos")}
        </span>
      ),
    },
    {
      accessorKey: "gestor",
      header: t("gestor"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "isTopManager",
      header: t("topManagers"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "gestao",
      header: t("management"),
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
      accessorKey: "patrimonio",
      header: t("patrimonio"),
      sortingFn: sortNullsLast,
    },
  ]; };
