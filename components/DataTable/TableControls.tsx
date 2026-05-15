import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { stocksPresets } from "@/constants";
import type { GenericTanStackTable, GenericTanStackColumn } from "@/@types/TanStackTableTypes";

interface TableControlsProps {
  table: GenericTanStackTable;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  complementarData?: {
    risk: string;
    ipca: string;
    erp: string;
  };
  riskDisplay?: string;
  riskLabel?: string;
  onApplyPreset?: (preset: string) => void;
  presets?: Record<string, unknown>;
}

export function TableControls({
  table,
  globalFilter,
  onGlobalFilterChange,
  complementarData,
  riskDisplay,
  riskLabel = "Premio Risco",
  onApplyPreset,
  presets,
}: TableControlsProps) {
  const activePresets = presets ?? stocksPresets;
  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Filtre a ação"
        value={globalFilter ?? ""}
        onChange={(event) => onGlobalFilterChange?.(event.target.value)}
        className="max-w-sm"
      />
      {complementarData && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span>IPCA: {complementarData?.ipca} </span>
          {complementarData?.erp && <span>ERP: {complementarData?.erp}</span>}
          <span>{riskLabel}: {complementarData?.risk} </span>
        </div>
      )}
      {riskDisplay && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span>{riskLabel}: {riskDisplay} </span>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {onApplyPreset && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filtros <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.keys(activePresets).map((key) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onApplyPreset?.(key)}
                >
                  {key}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: GenericTanStackColumn) => column.getCanHide())
              .map((column: GenericTanStackColumn) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
