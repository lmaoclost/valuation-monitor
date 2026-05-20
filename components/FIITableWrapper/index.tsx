"use client";

import { useState, useMemo, Suspense } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useTranslations, useLocale } from "next-intl";
import { getFiiTijolo, getFiiPapel, getFiiFiagro, getFiiFiInfra, getFiiFof, getFiiRisk } from "@/app/actions/fii.actions";
import { DataTable } from "@/components/DataTable";
import { createTijoloColumns } from "@/components/DataTable/tijoloColumns";
import { createPapelColumns } from "@/components/DataTable/papelColumns";
import { createFiiListColumns } from "@/components/DataTable/fiiListColumns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { fiiTijoloColumnVisibility, fiiPapelColumnVisibility } from "@/constants";
import { fiiTijoloPresets, fiiPapelPresets, fiiFiagroPresets, fiiFiInfraPresets, fiiFofPresets } from "@/constants/fiiPresets";

function filterByPresets<T>(
  data: T[],
  selectedPresets: string[],
  presets: Record<string, null | ((item: T) => boolean)>,
): T[] {
  if (selectedPresets.length === 0) return data;
  return data.filter((item) =>
    selectedPresets.every((key) => {
      const fn = presets[key];
      return fn ? fn(item) : true;
    }),
  );
}

type FiiTab = "tijolo" | "papel" | "fiagro" | "fi-infra" | "fof";

const TAB_IDS: FiiTab[] = ["tijolo", "papel", "fiagro", "fi-infra", "fof"];

const TAB_TO_PRESETS: Record<string, Record<string, null | ((item: any) => boolean)>> = {
  fiagro: fiiFiagroPresets,
  "fi-infra": fiiFiInfraPresets,
  fof: fiiFofPresets,
};

export function FIITableWrapper() {
  const [activeTab, setActiveTab] = useState<FiiTab>("tijolo");
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const t = useTranslations("Tabs");
  const tc = useTranslations("Columns");
  const locale = useLocale();

  const tijoloQuery = useQuery({
    queryKey: ["fii-tijolo"],
    enabled: activeTab === "tijolo",
    queryFn: async () => await getFiiTijolo(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const papelQuery = useQuery({
    queryKey: ["fii-papel"],
    enabled: activeTab === "papel",
    queryFn: async () => await getFiiPapel(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const fiagroQuery = useQuery({
    queryKey: ["fii-fiagro"],
    enabled: activeTab === "fiagro",
    queryFn: async () => await getFiiFiagro(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const fiInfraQuery = useQuery({
    queryKey: ["fii-fi-infra"],
    enabled: activeTab === "fi-infra",
    queryFn: async () => await getFiiFiInfra(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const fofQuery = useQuery({
    queryKey: ["fii-fof"],
    enabled: activeTab === "fof",
    queryFn: async () => await getFiiFof(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const riskQuery = useQuery({
    queryKey: ["fii-risk"],
    queryFn: async () => await getFiiRisk(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const activePresets = activeTab === "papel" ? fiiPapelPresets
    : activeTab === "tijolo" ? fiiTijoloPresets
    : TAB_TO_PRESETS[activeTab] ?? {};

  const tijoloColumns = useMemo(() => createTijoloColumns(tc, locale), [tc, locale]);
  const papelColumns = useMemo(() => createPapelColumns(tc, locale), [tc, locale]);
  const listColumns = useMemo(() => createFiiListColumns(tc, locale), [tc, locale]);

  const tabQueries: Record<string, { isLoading: boolean; isError: boolean; data: any }> = {
    tijolo: tijoloQuery,
    papel: papelQuery,
    fiagro: fiagroQuery,
    "fi-infra": fiInfraQuery,
    fof: fofQuery,
  };

  if (tabQueries[activeTab].isLoading) return <LoadingState />;
  if (tabQueries[activeTab].isError) return <ErrorState error={new Error(t("errorMsg"))} />;

  const renderTab = () => {
    switch (activeTab) {
      case "tijolo": {
        const data = tijoloQuery.data ?? [];
        const filtered = filterByPresets(data, selectedPresets, fiiTijoloPresets);
        return (
          <DataTable
            key="tijolo"
            columns={tijoloColumns}
            data={filtered}
            complementarData={{
              ipca: riskQuery.data?.ipca ?? "",
              risk: riskQuery.data?.tesouro ?? "",
              erp: "",
            }}
            riskLabel={t("tesouroLabel")}
            initialColumnVisibility={fiiTijoloColumnVisibility}
            selectedPresets={selectedPresets}
            onSelectedPresetsChange={setSelectedPresets}
            presets={activePresets}
          />
        );
      }
      case "papel": {
        const data = papelQuery.data ?? [];
        const filtered = filterByPresets(data, selectedPresets, fiiPapelPresets);
        return (
          <DataTable
            key="papel"
            columns={papelColumns}
            data={filtered}
            complementarData={{
              ipca: riskQuery.data?.ipca ?? "",
              risk: riskQuery.data?.tesouro ?? "",
              erp: "",
            }}
            riskLabel={t("tesouroLabel")}
            initialColumnVisibility={fiiPapelColumnVisibility}
            selectedPresets={selectedPresets}
            onSelectedPresetsChange={setSelectedPresets}
            presets={activePresets}
          />
        );
      }
      case "fiagro":
      case "fi-infra":
      case "fof": {
        const data = tabQueries[activeTab].data ?? [];
        const filtered = filterByPresets(data, selectedPresets, TAB_TO_PRESETS[activeTab] ?? {});
        return (
          <DataTable
            key={activeTab}
            columns={listColumns}
            data={filtered}
            complementarData={{
              ipca: riskQuery.data?.ipca ?? "",
              risk: riskQuery.data?.tesouro ?? "",
              erp: "",
            }}
            riskLabel={t("tesouroLabel")}
            selectedPresets={selectedPresets}
            onSelectedPresetsChange={setSelectedPresets}
            presets={activePresets}
          />
        );
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto flex-nowrap">
        {TAB_IDS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedPresets([]);
            }}
            className={`px-4 py-2 font-mono text-sm transition-colors ${
              activeTab === tab
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>
      <Suspense fallback={<LoadingState />}>{renderTab()}</Suspense>
    </div>
  );
}
