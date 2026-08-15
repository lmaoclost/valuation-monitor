"use client";

"use client";

import { memo } from "react";
import { flexRender, type HeaderGroup, type Header, type RowData } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AppTableFeatures } from "./tableFeatures";

interface TableHeaderProps<TData extends RowData> {
  headerGroups: HeaderGroup<AppTableFeatures, TData>[];
  sticky?: boolean;
}

function DataTableHeaderInner<TData extends RowData>({ headerGroups, sticky = false }: TableHeaderProps<TData>) {
  return (
    <TableHeader className={sticky ? "sticky top-0 z-10" : ""}>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id} className={sticky ? "bg-background" : ""}>
          {headerGroup.headers.map((header: Header<AppTableFeatures, TData>) => {
            return (
              <TableHead
                key={header.id}
                className={`cursor-pointer select-none ${sticky ? "bg-background" : ""}`}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center gap-1">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <ArrowUp
                    size={14}
                    className={`
                      transition-all duration-200
                      ${header.column.getIsSorted() === false ? "opacity-0" : "opacity-100"}
                      ${header.column.getIsSorted() === "asc"
                        ? "rotate-180"
                        : "rotate-0"
                      }
                    `}
                  />
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export const DataTableHeader = memo(DataTableHeaderInner) as typeof DataTableHeaderInner;
