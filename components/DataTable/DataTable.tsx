"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { TableControls } from "./TableControls";
import { VirtualizedTableBody } from "./VirtualizedTableBody";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  complementarData?: {
    risk: string;
    ipca: string;
    erp: string;
  };
  riskDisplay?: string;
  onApplyPreset?: (preset: string) => void;
  presets?: Record<string, unknown>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  complementarData,
  riskDisplay,
  onApplyPreset,
  presets,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    price: true,
    dy: false,
    pl: false,
    lpa: false,
    vpa: false,
    dpa: false,
    risk: false,
    discount_margin: false,
    payout: false,
    growthDividend: false,
    roe: false,
    cagrProfit: false,
    damodaramGrowth: false,
    bazinFairPrice: false,
    bazinCeelingPrice: false,
    grahamFairPrice: false,
    grahamCeelingPrice: false,
    gordonFairPrice: false,
    gordonCeelingPrice: false,
    d1: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const rowData = row.original as { ticker?: string; companyname?: string };
      const tickerValue = rowData.ticker?.toString() ?? "";
      const nameValue = rowData.companyname?.toString() ?? "";
      const searchLower = filterValue.toLowerCase();
      return (
        tickerValue.toLowerCase().includes(searchLower) ||
        nameValue.toLowerCase().includes(searchLower)
      );
    },
    enableMultiSort: false,
  });

  const handleApplyPreset = useCallback(
    (preset: string) => {
      onApplyPreset?.(preset);
    },
    [onApplyPreset],
  );

  const rows = useMemo(
    () => table.getFilteredRowModel().rows,
    [table, globalFilter, columnVisibility],
  );
  const headerGroups = useMemo(
    () => table.getHeaderGroups(),
    [table, columnVisibility],
  );

  return (
    <div className="w-full">
      <TableControls
        table={table}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        complementarData={complementarData}
        riskDisplay={riskDisplay}
        onApplyPreset={handleApplyPreset}
        presets={presets}
      />
      <div className="w-full rounded-md border">
        <VirtualizedTableBody
          table={table}
          rows={rows}
          columns={columns}
          headerGroups={headerGroups}
        />
      </div>
    </div>
  );
}
