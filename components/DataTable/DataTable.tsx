"use client";

import { useState } from "react";
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
    onApplyPreset?: (preset: string) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    complementarData,
    onApplyPreset,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        price: false,
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
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        enableMultiSort: false,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // Virtual scrolling setup
    const rows = table.getRowModel().rows;
    const headerGroups = table.getHeaderGroups();

    return (
        <div className="w-full">
            <TableControls
                table={table}
                complementarData={complementarData}
                onApplyPreset={onApplyPreset}
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
