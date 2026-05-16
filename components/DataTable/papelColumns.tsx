"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { FiiPapelFormattedDataType } from "@/@types/FiiPapelFormattedDataType";
import { sortNullsLast } from "@/utils";
import { calculateFiiPapelFieldColor } from "@/utils/calculateFiiPapelFieldColor";
import { useTranslations } from "next-intl";

const getDyPapelColor = (val: string): string => {
  const num = parseFloat(val.replace("%", "").replace(",", "."));
  return calculateFiiPapelFieldColor("dy", num / 100);
};

const getPvpPapelColor = (val: string): string => {
  const num = parseFloat(val.replace(",", "."));
  return calculateFiiPapelFieldColor("pvp", num);
};

export const createPapelColumns =
  (): ColumnDef<FiiPapelFormattedDataType>[] => {
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
        <span className={getDyPapelColor(row.getValue("dy") as string)}>
          {row.getValue("dy")}
        </span>
      ),
    },
    {
      accessorKey: "pvp",
      header: t("pvp"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getPvpPapelColor(row.getValue("pvp") as string)}>
          {row.getValue("pvp")}
        </span>
      ),
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
            (row.original as FiiPapelFormattedDataType).cagrDividendos3AnosColor
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
            (row.original as FiiPapelFormattedDataType).cagrValorCota3AnosColor
          }
        >
          {row.getValue("cagrValorCota3Anos")}
        </span>
      ),
    },
    {
      accessorKey: "patrimonio",
      header: t("patrimonio"),
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "gestor",
      header: t("gestor"),
      sortingFn: sortNullsLast,
      cell: ({ row }) => {
        const gestor = row.getValue("gestor") as string;
        return <span title={gestor}>{gestor.substring(0, 12)}</span>;
      },
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
      accessorKey: "subcategoria",
      header: t("subcategoria"),
      sortingFn: sortNullsLast,
    },
  ]; };
