"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { sortNullsLast } from "@/utils";

export const createUSAColumns = (): ColumnDef<StocksFormattedDataType>[] => [
  {
    accessorKey: "ticker",
    header: "Ações",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return (
        <Link
          className="truncate uppercase font-semibold"
          target="_blank"
          href={`https://br.tradingview.com/chart/?symbol=NASDAQ%3A${row.getValue("ticker")}`}
        >
          {row.getValue("ticker")}
        </Link>
      );
    },
  },
  {
    accessorKey: "companyname",
    header: "Nome da empresa",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const companyName = row.getValue("companyname") as string;
      return (
        <div className="font-medium truncate" title={companyName}>
          {companyName.substring(0, 20)}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "dy",
    header: "DY",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("dy")}</div>,
  },
  {
    accessorKey: "pl",
    header: "P/L",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("pl")}</div>,
  },
  {
    accessorKey: "lpa",
    header: "LPA",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("lpa")}</div>,
  },
  {
    accessorKey: "vpa",
    header: "VPA",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("vpa")}</div>,
  },
  {
    accessorKey: "dpa",
    header: "DPA",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("dpa")}</div>,
  },
  {
    accessorKey: "risk",
    header: "Risco",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("risk")}</div>,
  },
  {
    accessorKey: "discount_margin",
    header: "Margem de desconto",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("discount_margin")}</div>,
  },
  {
    accessorKey: "payout",
    header: "Payout",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("payout")}</div>,
  },
  {
    accessorKey: "growthDividend",
    header: "Crescimento/Dividendos",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("growthDividend")}</div>,
  },
  {
    accessorKey: "roe",
    header: "ROE",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("roe")}</div>,
  },
  {
    accessorKey: "cagrProfit",
    header: "CAGR LUCRO 5A",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("cagrProfit")}</div>,
  },
  {
    accessorKey: "damodaramGrowth",
    header: "Crescimento Damodaram",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("damodaramGrowth")}</div>,
  },
  {
    accessorKey: "growthAverage",
    header: "Média de Crescimento",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("growthAverage") as string;
      const fieldColor = row.getValue("growthAverageColor") as string;
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "growthAverageColor",
    header: "",
    enableHiding: false,
    cell: () => null,
  },
  {
    accessorKey: "bazinDiscount",
    header: "Desc Bazin",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("bazinDiscount") as string;
      const fieldColor = row.getValue("bazinDiscountColor") as string;
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "bazinDiscountColor",
    header: "",
    enableHiding: false,
    cell: () => null,
  },
  {
    accessorKey: "bazinFairPrice",
    header: "Preço justo Bazin",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("bazinFairPrice")}</div>,
  },
  {
    accessorKey: "bazinCeelingPrice",
    header: "Preço teto Bazin",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("bazinCeelingPrice")}</div>,
  },
  {
    accessorKey: "grahamDiscount",
    header: "Desc Graham",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("grahamDiscount") as string;
      const fieldColor = row.getValue("grahamDiscountColor") as string;
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "grahamDiscountColor",
    header: "",
    enableHiding: false,
    cell: () => null,
  },
  {
    accessorKey: "grahamFairPrice",
    header: "Preço justo Graham",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("grahamFairPrice")}</div>,
  },
  {
    accessorKey: "grahamCeelingPrice",
    header: "Preço teto Graham",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("grahamCeelingPrice")}</div>,
  },
  {
    accessorKey: "gordonDiscount",
    header: "Desc Gordon",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("gordonDiscount") as string;
      const fieldColor = row.getValue("gordonDiscountColor") as string;
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "gordonDiscountColor",
    header: "",
    enableHiding: false,
    cell: () => null,
  },
  {
    accessorKey: "d1",
    header: "D1",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("d1")}</div>,
  },
  {
    accessorKey: "gordonFairPrice",
    header: "Preço justo Gordon",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("gordonFairPrice")}</div>,
  },
  {
    accessorKey: "gordonCeelingPrice",
    header: "Preço teto Gordon",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("gordonCeelingPrice")}</div>,
  },
  {
    accessorKey: "peg",
    header: "PEG",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("peg") as string;
      const fieldColor = row.getValue("pegColor") as string;
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "pegColor",
    header: "",
    enableHiding: false,
    cell: () => null,
  },
  {
    accessorKey: "psr",
    header: "PSR",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("psr") as string;
      const fieldColor = row.getValue("psrColor") as string;
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "psrColor",
    header: "",
    enableHiding: false,
    cell: () => null,
  },
];
