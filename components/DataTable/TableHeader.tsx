import { flexRender } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableHeaderProps {
  headerGroups: any[];
  sticky?: boolean;
}

export function DataTableHeader({ headerGroups, sticky = false }: TableHeaderProps) {
  return (
    <TableHeader className={sticky ? "sticky top-0 bg-background z-10" : ""}>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => {
            return (
              <TableHead
                key={header.id}
                className="cursor-pointer select-none"
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
}
