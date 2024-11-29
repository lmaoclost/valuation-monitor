"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { convertStringToCurrency } from "@/utils/convertStringToCurrency";
import { convertStringToFloat } from "@/utils/convertStringToFloat";
import { ParsedData } from "@/parsers/dataParser";

// Definição das colunas para o DataTable com base nos dados do StatusInvestData
export const columns: ColumnDef<ParsedData>[] = [
  {
    accessorKey: "TICKER",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className="uppercase font-semibold">
          <Link
            target="_blank"
            href={`https://br.tradingview.com/chart/?symbol=BMFBOVESPA3A${row.getValue("TICKER")}`}
          >
            {row.getValue("TICKER")}
          </Link>
        </div>)
    }
  },
  {
    accessorKey: "companyname", //TODO: Enum dos dados do Mira
    header: "Nome da empresa",
    cell: ({ row }) => <div className="font-medium">{row.getValue("companyname")}</div>,
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
  },
  {
    accessorKey: "PRECO",
    header: () => <div className="text-right">Preço</div>,
    cell: ({ row }) => {
      const formattedPrice = convertStringToCurrency(row.getValue("PRECO"));

      return (
        <div className="text-right">
          {formattedPrice}
        </div>
      );
    },
  },
  {
    accessorKey: "DY",
    header: "DY",
    cell: ({ row }) => {
      return (<div>{row.getValue("DY")}</div>)
    },
  },
  {
    accessorKey: "P/L",
    header: "P/L",
    cell: ({ row }) => {
      const pl = row.getValue("P/L") as string;
      const formattedPL = convertStringToFloat(pl);
      return (
        <div>{formattedPL ? formattedPL : 'NaN'}</div>
      )
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
      return (
        <div>
          {row.getValue("payout")}
        </div>
      );
    },
  },
  {
    accessorKey: "growth_or_dividend",
    header: "Crescimento/Dividendos",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("growth_or_dividend")}
        </div>
      );
    },
  },
  {
    accessorKey: "ROE",
    header: "ROE",
    cell: ({ row }) => {
      const roe = row.getValue("ROE") as string;
      const formattedROE = convertStringToFloat(roe);
      return <div className="text-right">{formattedROE}%</div>;
    },
  },
  {
    accessorKey: "CAGR LUCROS 5 ANOS",
    header: "CAGR LUCRO 5A",
    cell: ({ row }) => {
      const lucroCagr = row.getValue("CAGR LUCROS 5 ANOS") as string;
      const formattedCagr = convertStringToFloat(lucroCagr) || 0;

      return (
        <div>
          {formattedCagr}%
        </div>
      );
    },
  },
  {
    accessorKey: "damodaram_growth",
    header: "Crescimento Damodaram",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("damodaram_growth")}
        </div>
      );
    },
  },
  {
    accessorKey: "growth_average",
    header: "Média de Crescimento",
    cell: ({ row }) => {
      const { value, fieldColor } = row.getValue("growth_average");
      return (
        <div className={fieldColor}>
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "bazin_discount",
    header: "Desc Bazin",
    cell: ({ row }) => {
      const { value, fieldColor } = row.getValue("bazin_discount");
      return (
        <div className={fieldColor}>
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "bazin_fair_price",
    header: "Preço justo Bazin",
    cell: ({ row }) => {
      const bazinFairPrice = row.getValue("bazin_fair_price");
      return (
        <div>
          <>{bazinFairPrice ? bazinFairPrice : 'NaN'}</>
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
          <>{bazinCeelingPrice ? bazinCeelingPrice : 'NaN'}</>
        </div>
      );
    },
  },
  {
    accessorKey: "graham_discount",
    header: "Desc Graham",
    cell: ({ row }) => {
      const { value, fieldColor } = row.getValue("graham_discount");
      return (
        <div className={fieldColor}>
          {value ? `${value}` : 'NaN'}
        </div>
      );
    },
  },
  {
    accessorKey: "graham_fair_price",
    header: "Preço justo Graham",
    cell: ({ row }) => {
      const grahamFairPrice = row.getValue("graham_fair_price");
      return (
        <div>
          <>{grahamFairPrice ? grahamFairPrice : 'NaN'}</>
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
          <>{grahamCeelingPrice ? grahamCeelingPrice : 'NaN'}</>
        </div>
      );
    },
  },
  {
    accessorKey: "gordon_discount",
    header: "Desc Gordon",
    cell: ({ row }) => {
      const { value, fieldColor } = row.getValue("gordon_discount");
      return (
        <div className={fieldColor}>
          {value ? `${value}` : 'NaN'}
        </div>
      );
    },
  },
  {
    accessorKey: "d1",
    header: "D1",
    cell: ({ row }) => {
      const d1 = row.getValue("d1");;
      return (
        <div>
          <>{d1 ? d1 : 'NaN'}</>
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
          <>{gordonFairPrice ? gordonFairPrice : 'NaN'}</>
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(data.companyid.toString())}>
              Copiar ID da empresa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Visualizar detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
