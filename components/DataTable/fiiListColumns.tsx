"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { FiiListFormattedDataType } from "@/@types/FiiListFormattedDataType";
import { sortNullsLast } from "@/utils";
import { calculateFiiPapelFieldColor } from "@/utils/calculateFiiPapelFieldColor";

const getDyListColor = (val: string): string => {
  const num = parseFloat(val.replace("%", "").replace(",", "."));
  return calculateFiiPapelFieldColor("dy", num / 100);
};

const getPvpListColor = (val: string): string => {
  const num = parseFloat(val.replace(",", "."));
  return calculateFiiPapelFieldColor("pvp", num);
};

export const createFiiListColumns =
  (): ColumnDef<FiiListFormattedDataType>[] => [
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
        <span className={getDyListColor(row.getValue("dy") as string)}>
          {row.getValue("dy")}
        </span>
      ),
    },
    {
      accessorKey: "pvp",
      header: "P/VP",
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getPvpListColor(row.getValue("pvp") as string)}>
          {row.getValue("pvp")}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: "CATEGORIA",
      sortingFn: sortNullsLast,
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
            (row.original as FiiListFormattedDataType).cagrDividendos3AnosColor
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
            (row.original as FiiListFormattedDataType).cagrValorCota3AnosColor
          }
        >
          {row.getValue("cagrValorCota3Anos")}
        </span>
      ),
    },
    {
      accessorKey: "gestor",
      header: "GESTOR",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "isTopManager",
      header: "TOP GESTORES?",
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
      accessorKey: "patrimonio",
      header: "PATRIMONIO",
      sortingFn: sortNullsLast,
    },
  ];
