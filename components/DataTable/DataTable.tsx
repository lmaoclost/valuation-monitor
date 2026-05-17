"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
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
  riskLabel?: string;
  selectedPresets?: string[];
  onSelectedPresetsChange?: (presets: string[]) => void;
  presets?: Record<string, unknown>;
  initialColumnVisibility?: VisibilityState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  complementarData,
  riskDisplay,
  riskLabel,
  selectedPresets,
  onSelectedPresetsChange,
  presets,
  initialColumnVisibility,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const defaultVisibility: VisibilityState = {
    ...(initialColumnVisibility ?? {}),
  };
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(defaultVisibility);
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

  const rows = useMemo(
    () => table.getFilteredRowModel().rows,
    [table, globalFilter, columnVisibility, data],
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
        riskLabel={riskLabel}
        selectedPresets={selectedPresets}
        onSelectedPresetsChange={onSelectedPresetsChange}
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
