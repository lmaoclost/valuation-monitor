"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { sortNullsLast } from "@/utils";

export const createUSAColumns = (): ColumnDef<StocksFormattedDataType>[] => {
  const t = useTranslations("Columns");
  return [
  {
    accessorKey: "ticker",
    header: t("ticker"),
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
    header: t("companyName"),
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
    header: t("price"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    accessorKey: "dy",
    header: t("dy"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("dy")}</div>,
  },
  {
    accessorKey: "pl",
    header: t("pl"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("pl")}</div>,
  },
  {
    accessorKey: "lpa",
    header: t("lpa"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("lpa")}</div>,
  },
  {
    accessorKey: "vpa",
    header: t("vpa"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("vpa")}</div>,
  },
  {
    accessorKey: "dpa",
    header: t("dpa"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("dpa")}</div>,
  },
  {
    accessorKey: "risk",
    header: t("risk"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("risk")}</div>,
  },
  {
    accessorKey: "discount_margin",
    header: t("discountMargin"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("discount_margin")}</div>,
  },
  {
    accessorKey: "payout",
    header: t("payout"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("payout")}</div>,
  },
  {
    accessorKey: "growthDividend",
    header: t("growthDividends"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("growthDividend")}</div>,
  },
  {
    accessorKey: "roe",
    header: t("roe"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("roe")}</div>,
  },
  {
    accessorKey: "cagrProfit",
    header: t("cagrProfit5y"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("cagrProfit")}</div>,
  },
  {
    accessorKey: "damodaramGrowth",
    header: t("damodaranGrowth"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("damodaramGrowth")}</div>,
  },
  {
    accessorKey: "growthAverage",
    header: t("avgGrowth"),
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
    header: t("descBazin"),
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
    header: t("bazinFairPrice"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("bazinFairPrice")}</div>,
  },
  {
    accessorKey: "bazinCeelingPrice",
    header: t("bazinCeilingPrice"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("bazinCeelingPrice")}</div>,
  },
  {
    accessorKey: "grahamDiscount",
    header: t("descGraham"),
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
    header: t("grahamFairPrice"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("grahamFairPrice")}</div>,
  },
  {
    accessorKey: "grahamCeelingPrice",
    header: t("grahamCeilingPrice"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("grahamCeelingPrice")}</div>,
  },
  {
    accessorKey: "gordonDiscount",
    header: t("descGordon"),
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
    header: t("d1"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("d1")}</div>,
  },
  {
    accessorKey: "gordonFairPrice",
    header: t("gordonFairPrice"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("gordonFairPrice")}</div>,
  },
  {
    accessorKey: "gordonCeelingPrice",
    header: t("gordonCeilingPrice"),
    sortingFn: sortNullsLast,
    cell: ({ row }) => <div>{row.getValue("gordonCeelingPrice")}</div>,
  },
  {
    accessorKey: "peg",
    header: t("peg"),
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
    header: t("psr"),
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
]; };
