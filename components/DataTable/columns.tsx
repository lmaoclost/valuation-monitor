"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { sortNullsLast } from "@/utils";

export const columns: ColumnDef<StocksFormattedDataType>[] = [
  {
    accessorKey: "ticker",
    header: "Ações",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return (
        <div className="uppercase font-semibold">
          <Link
            target="_blank"
            href={`https://br.tradingview.com/chart/?symbol=BMFBOVESPA%3A${row.getValue("ticker")}`}
          >
            {row.getValue("ticker")}
          </Link>
        </div>
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
        <div className="font-medium" title={companyName}>
          {companyName.substring(0, 15)}
        </div>
      );
    },
  },
  {
    accessorKey: "sectorname",
    header: "Setor",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return <div>{row.getValue("sectorname")}</div>;
    },
  },
  {
    accessorKey: "segmentname",
    header: "Segmento",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const segmentName = row.getValue("segmentname") as string;
      return <div title={segmentName}>{segmentName.substring(0, 15)}</div>;
    },
  },
  {
    accessorKey: "cicle",
    header: "Cíclico",
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("cicle")}</div>,
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
    cell: ({ row }) => {
      return <div>{row.getValue("dy")}</div>;
    },
  },
  {
    accessorKey: "pl",
    header: "P/L",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return <div>{row.getValue("pl")}</div>;
    },
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
    cell: ({ row }) => {
      return <div>{row.getValue("payout")}</div>;
    },
  },
  {
    accessorKey: "growthDividend",
    header: "Crescimento/Dividendos",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return <div>{row.getValue("growthDividend")}</div>;
    },
  },
  {
    accessorKey: "roe",
    header: "ROE",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return <div>{row.getValue("roe")}</div>;
    },
  },
  {
    accessorKey: "cagrProfit",
    header: "CAGR LUCRO 5A",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return <div>{row.getValue("cagrProfit")}</div>;
    },
  },
  {
    accessorKey: "damodaramGrowth",
    header: "Crescimento Damodaram",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      return <div>{row.getValue("damodaramGrowth")}</div>;
    },
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
    sortingFn: sortNullsLast,
    enableHiding: false,
    size: 0,
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
    sortingFn: sortNullsLast,
    enableHiding: false,
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "bazinFairPrice",
    header: "Preço justo Bazin",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const bazinFairPrice = row.getValue("bazinFairPrice");
      return (
        <div>
          <>{bazinFairPrice}</>
        </div>
      );
    },
  },
  {
    accessorKey: "bazinCeelingPrice",
    header: "Preço teto Bazin",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const bazinCeelingPrice = row.getValue("bazinCeelingPrice");
      return (
        <div>
          <>{bazinCeelingPrice}</>
        </div>
      );
    },
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
    sortingFn: sortNullsLast,
    enableHiding: false,
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "grahamFairPrice",
    header: "Preço justo Graham",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const grahamFairPrice = row.getValue("grahamFairPrice");
      return (
        <div>
          <>{grahamFairPrice}</>
        </div>
      );
    },
  },
  {
    accessorKey: "grahamCeelingPrice",
    header: "Preço teto Graham",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const grahamCeelingPrice = row.getValue("grahamCeelingPrice");
      return (
        <div>
          <>{grahamCeelingPrice}</>
        </div>
      );
    },
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
    sortingFn: sortNullsLast,
    enableHiding: false,
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "d1",
    header: "D1",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const d1 = row.getValue("d1");
      return (
        <div>
          <>{d1}</>
        </div>
      );
    },
  },
  {
    accessorKey: "gordonFairPrice",
    header: "Preço justo Gordon",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const gordonFairPrice = row.getValue("gordonFairPrice");
      return (
        <div>
          <>{gordonFairPrice}</>
        </div>
      );
    },
  },
  {
    accessorKey: "peg",
    header: "PEG",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("peg") as number;
      const fieldColor = row.getValue("pegColor") as string;
      return (
        <div className={fieldColor}>
          <>{value}</>
        </div>
      );
    },
  },
  {
    accessorKey: "pegColor",
    header: "",
    sortingFn: sortNullsLast,
    enableHiding: false,
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "psr",
    header: "PSR",
    sortingFn: sortNullsLast,
    cell: ({ row }) => {
      const value = row.getValue("psr") as number;
      const fieldColor = row.getValue("psrColor") as string;
      return (
        <div className={fieldColor}>
          <>{value}</>
        </div>
      );
    },
  },
  {
    accessorKey: "psrColor",
    header: "",
    sortingFn: sortNullsLast,
    enableHiding: false,
    size: 0,
    cell: () => null,
  },
];
