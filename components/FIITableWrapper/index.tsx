"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { Suspense } from "react";
import { getFiiTijolo, getFiiPapel, getFiiFiagro, getFiiFiInfra, getFiiFof, getFiiRisk, getFiiPreset } from "@/app/actions/fii.actions";
import { DataTable } from "@/components/DataTable";
import { createTijoloColumns } from "@/components/DataTable/tijoloColumns";
import { createPapelColumns } from "@/components/DataTable/papelColumns";
import { createFiiListColumns } from "@/components/DataTable/fiiListColumns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { fiiTijoloColumnVisibility, fiiPapelColumnVisibility } from "@/constants";
import { fiiTijoloPresets, fiiPapelPresets, fiiFiagroPresets, fiiFiInfraPresets, fiiFofPresets } from "@/constants/fiiPresets";

type FiiTab = "tijolo" | "papel" | "fiagro" | "fi-infra" | "fof";

const TABS: { id: FiiTab; label: string }[] = [
  { id: "tijolo", label: "Tijolo" },
  { id: "papel", label: "Papel" },
  { id: "fiagro", label: "Fiagro" },
  { id: "fi-infra", label: "FI-Infra" },
  { id: "fof", label: "Fundo de Fundos" },
];

const TAB_TO_API_TYPE: Record<string, string> = {
  fiagro: "agronegócio",
  "fi-infra": "recebíveis de infraestrutura",
  fof: "fundo de fundos",
};

const TAB_TO_QUERY_KEY: Record<string, string[]> = {
  fiagro: ["fii-fiagro"],
  "fi-infra": ["fii-fi-infra"],
  fof: ["fii-fof"],
};

const TAB_TO_PRESETS: Record<string, Record<string, null | ((item: any) => boolean)>> = {
  fiagro: fiiFiagroPresets,
  "fi-infra": fiiFiInfraPresets,
  fof: fiiFofPresets,
};

export function FIITableWrapper() {
  const [activeTab, setActiveTab] = useState<FiiTab>("tijolo");
  const queryClient = useQueryClient();

  const tijoloQuery = useQuery({
    queryKey: ["fii-tijolo"],
    queryFn: async () => await getFiiTijolo(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const papelQuery = useQuery({
    queryKey: ["fii-papel"],
    queryFn: async () => await getFiiPapel(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const fiagroQuery = useQuery({
    queryKey: ["fii-fiagro"],
    queryFn: async () => await getFiiFiagro(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const fiInfraQuery = useQuery({
    queryKey: ["fii-fi-infra"],
    queryFn: async () => await getFiiFiInfra(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const fofQuery = useQuery({
    queryKey: ["fii-fof"],
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

  const presetTab = activeTab === "tijolo" || activeTab === "papel" ? activeTab : TAB_TO_API_TYPE[activeTab];

  useEffect(() => {
    const presets = ["Top Gestores"];
    const types = ["tijolo", "papel", "agronegócio", "recebíveis de infraestrutura", "fundo de fundos"];
    presets.forEach((preset) => {
      types.forEach((type) => {
        queryClient.prefetchQuery({
          queryKey: ["fii-preset", type, preset],
          queryFn: () => getFiiPreset(type, preset),
          staleTime: 24 * 60 * 60 * 1000,
        });
      });
    });
  }, [queryClient]);

  const { mutateAsync: applyPreset, isPending: isPresetLoading } = useMutation({
    mutationFn: async ({ type, preset }: { type: string; preset: string }) =>
      await getFiiPreset(type, preset),
    onSuccess: (filtered, variables) => {
      const queryKey = variables.type === "papel" ? ["fii-papel"]
        : variables.type === "tijolo" ? ["fii-tijolo"]
        : TAB_TO_QUERY_KEY[variables.type] ?? ["fii-tijolo"];
      queryClient.setQueryData(queryKey, filtered);
    },
  });

  const handleApplyPreset = useCallback(
    async (preset: string) => {
      await applyPreset({ type: presetTab, preset });
    },
    [applyPreset, presetTab],
  );

  const activePresets = activeTab === "papel" ? fiiPapelPresets
    : activeTab === "tijolo" ? fiiTijoloPresets
    : TAB_TO_PRESETS[activeTab] ?? {};

  const tijoloColumns = useMemo(() => createTijoloColumns(), []);
  const papelColumns = useMemo(() => createPapelColumns(), []);
  const listColumns = useMemo(() => createFiiListColumns(), []);

  const isListTab = activeTab === "fiagro" || activeTab === "fi-infra" || activeTab === "fof";
  const tabQueries: Record<string, { isLoading: boolean; isError: boolean; data: any }> = {
    tijolo: tijoloQuery,
    papel: papelQuery,
    fiagro: fiagroQuery,
    "fi-infra": fiInfraQuery,
    fof: fofQuery,
  };

  if (tabQueries[activeTab].isLoading || isPresetLoading) return <LoadingState />;
  if (tabQueries[activeTab].isError) return <ErrorState error={new Error("Não foi possível carregar os dados")} />;

  const renderTab = () => {
    switch (activeTab) {
      case "tijolo":
        return (
          <DataTable
            key="tijolo"
            columns={tijoloColumns}
            data={tijoloQuery.data ?? []}
            complementarData={{
              ipca: riskQuery.data?.ipca ?? "",
              risk: riskQuery.data?.tesouro ?? "",
              erp: "",
            }}
            riskLabel="Tesouro IPCA+2035"
            initialColumnVisibility={fiiTijoloColumnVisibility}
            onApplyPreset={handleApplyPreset}
            presets={activePresets}
          />
        );
      case "papel":
        return (
          <DataTable
            key="papel"
            columns={papelColumns}
            data={papelQuery.data ?? []}
            complementarData={{
              ipca: riskQuery.data?.ipca ?? "",
              risk: riskQuery.data?.tesouro ?? "",
              erp: "",
            }}
            riskLabel="Tesouro IPCA+2035"
            initialColumnVisibility={fiiPapelColumnVisibility}
            onApplyPreset={handleApplyPreset}
            presets={activePresets}
          />
        );
      case "fiagro":
      case "fi-infra":
      case "fof":
        return (
          <DataTable
            key={activeTab}
            columns={listColumns}
            data={tabQueries[activeTab].data ?? []}
            complementarData={{
              ipca: riskQuery.data?.ipca ?? "",
              risk: riskQuery.data?.tesouro ?? "",
              erp: "",
            }}
            riskLabel="Tesouro IPCA+2035"
            onApplyPreset={handleApplyPreset}
            presets={activePresets}
          />
        );
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-1 border-b border-border mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-mono text-sm transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Suspense fallback={<LoadingState />}>{renderTab()}</Suspense>
    </div>
  );
}
