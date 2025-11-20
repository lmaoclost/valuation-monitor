"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

const calculateFieldColor = (value: number, thresholds: number[]) => {
  if (value < thresholds[0]) return "text-red-600";
  if (value <= thresholds[1]) return "text-yellow-600";
  if (value <= thresholds[2]) return "text-blue-600";
  return "text-green-600";
};

const calculatePEGColor = (value: number, thresholds: number[]) => {
  if (value < thresholds[0] || value > thresholds[2]) return "text-red-600";
  if (value >= thresholds[1] || value <= thresholds[2])
    return "text-yellow-600";
  if (value >= thresholds[0] || value <= thresholds[1]) return "text-blue-600";
  return "text-green-600";
};

const calculatePSRColor = (value: number, thresholds: number[]) => {
  if (value > thresholds[0]) return "text-red-600";
  if (value === thresholds[0]) return "text-yellow-600";
  if (value < thresholds[0]) return "text-green-600";
};

const calculateGrowthAverageColor = (value: number, thresholds: number[]) => {
  if (value < thresholds[0]) return "text-red-600";
  if (value >= thresholds[0] && value < thresholds[1]) return "text-yellow-600";
  if (value >= thresholds[1] && value <= thresholds[2]) return "text-blue-600";
  return "text-green-600";
};

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
  /*{
    accessorKey: "companyname", //TODO: Enum dos dados do Mira
    header: "Nome da empresa",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("companyname")}</div>
    ),
  },
  {
    accessorKey: "sectorname", //TODO: Enum dos dados do Mira
    header: "Setor",
    cell: ({ row }) => <div>{row.getValue("sectorname")}</div>,
  },
  {
    accessorKey: "segmentname", //TODO: Enum dos dados do Mira
    header: "Segmento",
    cell: ({ row }) => <div>{row.getValue("segmentname")}</div>,
  },
  {
    accessorKey: "cicle", //TODO: Enum dos dados do Mira
    header: "Cíclico",
    cell: ({ row }) => <div>{row.getValue("segmentname")}</div>,
  },*/
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
      const raw = row.getValue("growthAverageRaw") as number;
      const fieldColor = calculateGrowthAverageColor(raw, [0, 10, 20]);

      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "growthAverageRaw",
    header: "",
    enableHiding: true,
    size: 0,
    cell: () => null,
  },
  {
    accessorKey: "bazinDiscount",
    header: "Desc Bazin",
    cell: ({ row }) => {
      const value = row.getValue("bazinDiscount") as string;
      const raw = row.getValue("bazinDiscountRaw") as number;
      const fieldColor = calculateFieldColor(raw, [0, 30]);
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "bazinDiscountRaw",
    header: "",
    enableHiding: true,
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
      const raw = row.getValue("grahamDiscountRaw") as number;
      const fieldColor = calculateFieldColor(raw, [0, 30]);

      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "grahamDiscountRaw",
    header: "",
    enableHiding: true,
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
      const raw = row.getValue("gordonDiscountRaw") as number;
      const fieldColor = calculateFieldColor(raw, [0, 30]);

      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "gordonDiscountRaw",
    header: "",
    enableHiding: true,
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
      const fieldColor = calculatePEGColor(value, [0, 0.5, 2]);
      return (
        <div className={fieldColor}>
          <>{value}</>
        </div>
      );
    },
  },
  {
    accessorKey: "psr",
    header: "PSR",
    cell: ({ row }) => {
      const value = row.getValue("psr") as number;
      const fieldColor = calculatePSRColor(value, [1]);
      return (
        <div className={fieldColor}>
          <>{value}</>
        </div>
      );
    },
  },
];
