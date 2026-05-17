"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
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
  selectedPresets?: string[];
  onSelectedPresetsChange?: (presets: string[]) => void;
  presets?: Record<string, unknown>;
}

const CLEAR_KEY = "Limpar";

export function TableControls({
  table,
  globalFilter,
  onGlobalFilterChange,
  complementarData,
  riskDisplay,
  riskLabel,
  selectedPresets = [],
  onSelectedPresetsChange,
  presets,
}: TableControlsProps) {
  const t = useTranslations("TableControls");
  const tPresets = useTranslations("Presets");
  const activePresets = presets;
  const presetKeys = activePresets ? Object.keys(activePresets).filter((k) => k !== CLEAR_KEY) : [];

  const handleToggle = (key: string, checked: boolean) => {
    if (checked) {
      onSelectedPresetsChange?.([...selectedPresets, key]);
    } else {
      onSelectedPresetsChange?.(selectedPresets.filter((k) => k !== key));
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder={t("filterPlaceholder")}
        value={globalFilter ?? ""}
        onChange={(event) => onGlobalFilterChange?.(event.target.value)}
        className="max-w-sm"
      />
      {complementarData && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span>IPCA: {complementarData?.ipca} </span>
          {complementarData?.erp && <span>ERP: {complementarData?.erp}</span>}
          <span>{riskLabel ?? t("riskLabel")}: {complementarData?.risk} </span>
        </div>
      )}
      {riskDisplay && (
        <div className="flex flex-wrap gap-4 text-sm">
          <span>{riskLabel ?? t("riskLabel")}: {riskDisplay} </span>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {onSelectedPresetsChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {t("filterButton")} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSelectedPresetsChange([])}>
                {tPresets(CLEAR_KEY)}
              </DropdownMenuItem>
              {presetKeys.length > 0 && <DropdownMenuSeparator />}
              {presetKeys.map((key) => (
                <DropdownMenuCheckboxItem
                  key={key}
                  checked={selectedPresets.includes(key)}
                  onCheckedChange={(checked) => handleToggle(key, !!checked)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {tPresets(key)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {t("columnsButton")} <ChevronDown />
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
