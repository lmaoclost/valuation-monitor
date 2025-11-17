"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ParsedData } from "@/parsers/dataParser";

const calculateFieldColor = (value: number, thresholds: number[]) => {
  if (value < thresholds[0]) return "text-red-600";
  if (value <= thresholds[1]) return "text-yellow-600";
  if (value <= thresholds[2]) return "text-blue-600";
  return "text-green-600";
};

export const columns: ColumnDef<ParsedData>[] = [
  {
    accessorKey: "TICKER",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className="uppercase font-semibold">
          <Link
            target="_blank"
            href={`https://br.tradingview.com/chart/?symbol=BMFBOVESPA%3A${row.getValue("TICKER")}`}
          >
            {row.getValue("TICKER")}
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
    accessorKey: "PRECO",
    header: "Preço",
    cell: ({ row }) => <div>R${row.getValue("PRECO")}</div>,
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
    accessorKey: " LPA",
    header: "LPA",
    cell: ({ row }) => <div>{row.getValue(" LPA")}</div>,
  },
  {
    accessorKey: " VPA",
    header: "VPA",
    cell: ({ row }) => <div>{row.getValue(" VPA")}</div>,
  },
  {
    accessorKey: "dpa",
    header: "DPA",
    cell: ({ row }) => <div>{row.getValue("dpa")}</div>,
  },
  {
    accessorKey: "risco",
    header: "Risco",
    cell: ({ row }) => <div>{row.getValue("risco")}</div>,
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
    accessorKey: "growth_or_dividend",
    header: "Crescimento/Dividendos",
    cell: ({ row }) => {
      return <div>{row.getValue("growth_or_dividend")}</div>;
    },
  },
  {
    accessorKey: "ROE",
    header: "ROE",
    cell: ({ row }) => {
      return <div>{row.getValue("ROE")}</div>;
    },
  },
  {
    accessorKey: "CAGR LUCROS 5 ANOS",
    header: "CAGR LUCRO 5A",
    cell: ({ row }) => {
      return <div>{row.getValue("CAGR LUCROS 5 ANOS")}</div>;
    },
  },
  {
    accessorKey: "damodaram_growth",
    header: "Crescimento Damodaram",
    cell: ({ row }) => {
      return <div>{row.getValue("damodaram_growth")}</div>;
    },
  },
  {
    accessorKey: "growth_average",
    header: "Média de Crescimento",
    cell: ({ row }) => {
      const value = row.getValue("growth_average") as number;
      const fieldColor = calculateFieldColor(value, [0, 10, 20]);

      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "bazin_discount",
    header: "Desc Bazin",
    cell: ({ row }) => {
      const value = row.getValue("bazin_discount") as number;
      const fieldColor = calculateFieldColor(value, [0, 30]);
      return <div className={fieldColor}>{value}</div>;
    },
  },
  {
    accessorKey: "bazin_fair_price",
    header: "Preço justo Bazin",
    cell: ({ row }) => {
      const bazinFairPrice = row.getValue("bazin_fair_price");
      return (
        <div>
          <>{bazinFairPrice ? bazinFairPrice : "NaN"}</>
        </div>
      );
    },
  },
  {
    accessorKey: "bazin_ceeling_price",
    header: "Preço teto Bazin",
    cell: ({ row }) => {
      const bazinCeelingPrice = row.getValue("bazin_ceeling_price");
      return (
        <div>
          <>{bazinCeelingPrice ? bazinCeelingPrice : "NaN"}</>
        </div>
      );
    },
  },
  {
    accessorKey: "graham_discount",
    header: "Desc Graham",
    cell: ({ row }) => {
      const value = row.getValue("graham_discount") as number;
      const fieldColor = calculateFieldColor(value, [0, 30]);

      return <div className={fieldColor}>{value ? `${value}` : "NaN"}</div>;
    },
  },
  {
    accessorKey: "graham_fair_price",
    header: "Preço justo Graham",
    cell: ({ row }) => {
      const grahamFairPrice = row.getValue("graham_fair_price");
      return (
        <div>
          <>{grahamFairPrice ? grahamFairPrice : "NaN"}</>
        </div>
      );
    },
  },
  {
    accessorKey: "graham_ceeling_price",
    header: "Preço teto Graham",
    cell: ({ row }) => {
      const grahamCeelingPrice = row.getValue("graham_ceeling_price");
      return (
        <div>
          <>{grahamCeelingPrice ? grahamCeelingPrice : "NaN"}</>
        </div>
      );
    },
  },
  {
    accessorKey: "gordon_discount",
    header: "Desc Gordon",
    cell: ({ row }) => {
      const value = row.getValue("gordon_discount") as number;
      const fieldColor = calculateFieldColor(value, [0, 30]);

      return <div className={fieldColor}>{value ? `${value}` : "NaN"}</div>;
    },
  },
  {
    accessorKey: "d1",
    header: "D1",
    cell: ({ row }) => {
      const d1 = row.getValue("d1");
      return (
        <div>
          <>{d1 ? d1 : "NaN"}</>
        </div>
      );
    },
  },
  {
    accessorKey: "gordon_fair_price",
    header: "Preço justo Gordon",
    cell: ({ row }) => {
      const gordonFairPrice = row.getValue("gordon_fair_price");
      return (
        <div>
          <>{gordonFairPrice ? gordonFairPrice : "NaN"}</>
        </div>
      );
    },
  },
  {
    accessorKey: "peg",
    header: "Preço teto Gordon",
    cell: ({ row }) => {
      const value = row.getValue("peg");
      return (
        <div>
          <>{value}</>
        </div>
      );
    },
  },
];
