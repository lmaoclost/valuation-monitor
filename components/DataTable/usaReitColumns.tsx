"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AppTableFeatures } from "./tableFeatures";
import Link from "next/link";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { sortNullsLast } from "@/utils";

export const createUSAReitColumns = (
  t: (key: string) => string,
): ColumnDef<AppTableFeatures, StocksFormattedDataType>[] => {
  return [
    {
      accessorKey: "ticker",
      header: t("ticker"),
      sortFn: sortNullsLast,
      cell: ({ row }) => {
        return (
          <Link
            className="truncate uppercase font-semibold"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://br.tradingview.com/chart/?symbol=NYSE%3A${row.getValue("ticker")}`}
          >
            {row.getValue("ticker")}
          </Link>
        );
      },
    },
    {
      accessorKey: "price",
      header: t("price"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("price")}</div>,
    },
    {
      accessorKey: "dy",
      header: t("dy"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("dy")}</div>,
    },
    {
      accessorKey: "pl",
      header: t("pl"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("pl")}</div>,
    },
    {
      accessorKey: "lpa",
      header: t("lpa"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("lpa")}</div>,
    },
    {
      accessorKey: "vpa",
      header: t("vpa"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("vpa")}</div>,
    },
    {
      accessorKey: "dpa",
      header: t("dpa"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("dpa")}</div>,
    },
    {
      accessorKey: "risk",
      header: t("risk"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("risk")}</div>,
    },
    {
      accessorKey: "discount_margin",
      header: t("discountMargin"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("discount_margin")}</div>,
    },
    {
      accessorKey: "payout",
      header: t("payout"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("payout")}</div>,
    },
    {
      accessorKey: "growthDividend",
      header: t("growthDividends"),
      sortFn: sortNullsLast,
      cell: ({ row }) => {
        const val = row.getValue("growthDividend") as string;
        const labels: Record<string, string> = {
          Crescimento: t("growthValue"),
          Dividendos: t("dividendsValue"),
          Indefinido: t("undefinedValue"),
        };
        return <div>{labels[val] ?? val}</div>;
      },
    },
    {
      accessorKey: "roe",
      header: t("roe"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("roe")}</div>,
    },
    {
      accessorKey: "cagrProfit",
      header: t("cagrProfit5y"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("cagrProfit")}</div>,
    },
    {
      accessorKey: "damodaramGrowth",
      header: t("damodaranGrowth"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("damodaramGrowth")}</div>,
    },
    {
      accessorKey: "growthAverage",
      header: t("avgGrowth"),
      sortFn: sortNullsLast,
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
      header: t("descBazin"),
      sortFn: sortNullsLast,
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
      header: t("bazinFairPrice"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("bazinFairPrice")}</div>,
    },
    {
      accessorKey: "bazinCeelingPrice",
      header: t("bazinCeilingPrice"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("bazinCeelingPrice")}</div>,
    },
    {
      accessorKey: "grahamDiscount",
      header: t("descGraham"),
      sortFn: sortNullsLast,
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
      header: t("grahamFairPrice"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("grahamFairPrice")}</div>,
    },
    {
      accessorKey: "grahamCeelingPrice",
      header: t("grahamCeilingPrice"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("grahamCeelingPrice")}</div>,
    },
    {
      accessorKey: "gordonDiscount",
      header: t("descGordon"),
      sortFn: sortNullsLast,
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
      header: t("d1"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("d1")}</div>,
    },
    {
      accessorKey: "gordonFairPrice",
      header: t("gordonFairPrice"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("gordonFairPrice")}</div>,
    },
    {
      accessorKey: "gordonCeelingPrice",
      header: t("gordonCeilingPrice"),
      sortFn: sortNullsLast,
      cell: ({ row }) => <div>{row.getValue("gordonCeelingPrice")}</div>,
    },
    {
      accessorKey: "peg",
      header: t("peg"),
      sortFn: sortNullsLast,
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
      header: t("psr"),
      sortFn: sortNullsLast,
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
};
