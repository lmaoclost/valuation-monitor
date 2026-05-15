"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { FiiTijoloFormattedDataType } from "@/@types/FiiTijoloFormattedDataType";
import { sortNullsLast } from "@/utils";
import { calculateFiiTijoloFieldColor } from "@/utils/calculateFiiTijoloFieldColor";

const getDyColor = (val: string): string => {
  const num = parseFloat(val.replace("%", "").replace(",", "."));
  return calculateFiiTijoloFieldColor("dy", num / 100);
};

const getPvpColor = (val: string): string => {
  const num = parseFloat(val.replace(",", "."));
  return calculateFiiTijoloFieldColor("pvp", num);
};

export const createTijoloColumns =
  (): ColumnDef<FiiTijoloFormattedDataType>[] => [
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
        <span className={getDyColor(row.getValue("dy") as string)}>
          {row.getValue("dy")}
        </span>
      ),
    },
    {
      accessorKey: "pvp",
      header: "P/VP",
      sortingFn: sortNullsLast,
      cell: ({ row }) => (
        <span className={getPvpColor(row.getValue("pvp") as string)}>
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
      accessorKey: "riskPremium",
      header: "PREMIO DE RISCO",
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
      header: "TAXA DE DESCONTO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "growthRate",
      header: "TAXA CRESCIMENTO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "fairPrice",
      header: "PRECO JUSTO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "ceelingPrice",
      header: "PRECO TETO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "expectativaCrescimento",
      header: "EXPECTATIVA DE CRESCIMENTO",
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
      header: "CAGR COTA 3A",
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
      header: "GESTAO",
      sortingFn: sortNullsLast,
      cell: ({ row }) => {
        const gestao = row.getValue("gestao") as string;
        return <span title={gestao}>{gestao.substring(0, 12)}</span>;
      },
    },
    {
      accessorKey: "isTopManager",
      header: "TOP GESTORES?",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "patrimonio",
      header: "PATRIMONIO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "qtdImoveis",
      header: "QTD IMOVEIS",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "ativos",
      header: "ATIVOS",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "locatario",
      header: "LOCATARIO",
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
      accessorKey: "precoM2",
      header: "PRECO M2",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "aluguelM2",
      header: "ALUGUEL M2",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "capRate",
      header: "CAP RATE",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "vacanciaMedia",
      header: "VACANCIA MEDIA",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear1",
      header: "DIVIDENDO ANO 1",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue1",
      header: "VALOR PRESENTE ANO 1",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear2",
      header: "DIVIDENDO ANO 2",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue2",
      header: "VALOR PRESENTE ANO 2",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear3",
      header: "DIVIDENDO ANO 3",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue3",
      header: "VALOR PRESENTE ANO 3",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear4",
      header: "DIVIDENDO ANO 4",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue4",
      header: "VALOR PRESENTE ANO 4",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear5",
      header: "DIVIDENDO ANO 5",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue5",
      header: "VALOR PRESENTE ANO 5",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear6",
      header: "DIVIDENDO ANO 6",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue6",
      header: "VALOR PRESENTE ANO 6",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear7",
      header: "DIVIDENDO ANO 7",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue7",
      header: "VALOR PRESENTE ANO 7",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear8",
      header: "DIVIDENDO ANO 8",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue8",
      header: "VALOR PRESENTE ANO 8",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear9",
      header: "DIVIDENDO ANO 9",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue9",
      header: "VALOR PRESENTE ANO 9",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "dividendYear10",
      header: "DIVIDENDO ANO 10",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValue10",
      header: "VALOR PRESENTE ANO 10",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "desinvestment",
      header: "DESINVESTIMENTO",
      sortingFn: sortNullsLast,
    },
    {
      accessorKey: "presentValueDesinvestment",
      header: "VALOR PRESENTE DO DESINVESTIMENTO",
      sortingFn: sortNullsLast,
    },
  ];
