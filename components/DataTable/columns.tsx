"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export const columns: ColumnDef<StocksFormattedDataType>[] = [
  {
    accessorKey: "ticker",
    header: "Ações",
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
    cell: ({ row }) => {
      return <div>{row.getValue("sectorname")}</div>;
    },
  },
  {
    accessorKey: "segmentname",
    header: "Segmento",
    cell: ({ row }) => {
      const segmentName = row.getValue("segmentname") as string;
      return <div title={segmentName}>{segmentName.substring(0, 15)}</div>;
    },
  },
  {
    accessorKey: "cicle",
    header: "Cíclico",
    cell: ({ row }) => <div>{row.getValue("cicle")}</div>,
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "dy",
    header: "DY",
    cell: ({ row }) => {
      return <div>{row.getValue("dy")}</div>;
    },
  },
  {
    accessorKey: "pl",
    header: "P/L",
    cell: ({ row }) => {
      return <div>{row.getValue("pl")}</div>;
    },
  },
  {
    accessorKey: "lpa",
    header: "LPA",
    cell: ({ row }) => <div>{row.getValue("lpa")}</div>,
  },
  {
    accessorKey: "vpa",
    header: "VPA",
    cell: ({ row }) => <div>{row.getValue("vpa")}</div>,
  },
  {
    accessorKey: "dpa",
    header: "DPA",
    cell: ({ row }) => <div>{row.getValue("dpa")}</div>,
  },
  {
    accessorKey: "risk",
    header: "Risco",
    cell: ({ row }) => <div>{row.getValue("risk")}</div>,
  },
  {
    accessorKey: "discount_margin",
    header: "Margem de desconto",
    cell: ({ row }) => <div>{row.getValue("discount_margin")}</div>,
  },
  {
    accessorKey: "payout",
    header: "Payout",
    cell: ({ row }) => {
      return <div>{row.getValue("payout")}</div>;
    },
  },
  {
    accessorKey: "growthDividend",
    header: "Crescimento/Dividendos",
    cell: ({ row }) => {
      return <div>{row.getValue("growthDividend")}</div>;
    },
  },
  {
    accessorKey: "roe",
    header: "ROE",
    cell: ({ row }) => {
      return <div>{row.getValue("roe")}</div>;
    },
  },
  {
    accessorKey: "cagrProfit",
    header: "CAGR LUCRO 5A",
    cell: ({ row }) => {
      return <div>{row.getValue("cagrProfit")}</div>;
    },
  },
  {
    accessorKey: "damodaramGrowth",
    header: "Crescimento Damodaram",
    cell: ({ row }) => {
      return <div>{row.getValue("damodaramGrowth")}</div>;
    },
  },
  {
    accessorKey: "growthAverage",
    header: "Média de Crescimento",
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
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "bazinDiscount",
    header: "Desc Bazin",
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
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "bazinFairPrice",
    header: "Preço justo Bazin",
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
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "grahamFairPrice",
    header: "Preço justo Graham",
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
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "d1",
    header: "D1",
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
    enableHiding: false,
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "psr",
    header: "PSR",
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
    enableHiding: false,
    size: 0,
    cell: () => null,
  },
];
