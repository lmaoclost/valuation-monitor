"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { FiiPapelFormattedDataType } from "@/@types/FiiPapelFormattedDataType";
import { sortNullsLast } from "@/utils";
import { calculateFiiPapelFieldColor } from "@/utils/calculateFiiPapelFieldColor";

const getDyPapelColor = (val: string): string => {
  const num = parseFloat(val.replace("%", "").replace(",", "."));
  return calculateFiiPapelFieldColor("dy", num / 100);
};

const getPvpPapelColor = (val: string): string => {
  const num = parseFloat(val.replace(",", "."));
  return calculateFiiPapelFieldColor("pvp", num);
};

export const createPapelColumns =
  (): ColumnDef<FiiPapelFormattedDataType>[] => [
    {
      accessorKey: "ticker",
      header: "CODIGO",
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
      header: "COTACAO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dy",
      header: "DY",
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getDyPapelColor(row.getValue("dy") as string)}>
          {row.getValue("dy")}
        </span>
      ),
    },
    {
      accessorKey: "pvp",
      header: "P/VP",
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getPvpPapelColor(row.getValue("pvp") as string)}>
          {row.getValue("pvp")}
        </span>
      ),
    },
    {
      accessorKey: "caixa",
      header: "CAIXA",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "cagrDividendos3Anos",
      header: "CAGR DIV 3A",
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
      header: "CAGR COTA 3A",
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
      header: "PATRIMONIO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "gestor",
      header: "GESTOR",
      sortingFn: sortNullsLast,
      cell: ({ row }) => {
        const gestor = row.getValue("gestor") as string;
        return <span title={gestor}>{gestor.substring(0, 12)}</span>;
      },
    },
    {
      accessorKey: "isTopManager",
      header: "TOP GESTORES",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "gestao",
      header: "GESTAO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "cotistas",
      header: "COTISTAS",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "liquidezDiaria",
      header: "LIQUIDEZ DIARIA",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "subcategoria",
      header: "SUBCATEGORIA",
      sortingFn: sortNullsLast,
    },
  ];
