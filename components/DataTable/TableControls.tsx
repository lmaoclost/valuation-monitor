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
import { PresetKey } from "@/constants/stocksPresets";

interface TableControlsProps {
  table: any;
  complementarData?: {
    risk: string;
    ipca: string;
    erp: string;
  };
  onApplyPreset?: (preset: string) => void;
}

export function TableControls({
  table,
  complementarData,
  onApplyPreset,
}: TableControlsProps) {
  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Filtre a ação"
        value={
          (table.getColumn("ticker")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("ticker")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      {complementarData && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span>IPCA: {complementarData?.ipca} </span>
          <span>ERP: {complementarData?.erp}</span>
          <span>Premio Risco: {complementarData?.risk} </span>
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
              {Object.keys(stocksPresets).map((key) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => onApplyPreset(key as PresetKey)}
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
              .filter((column: any) => column.getCanHide())
              .map((column: any) => {
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
