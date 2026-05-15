"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { Suspense } from "react";
import { getFiiTijolo, getFiiPapel, getFiiRisk, getFiiPreset } from "@/app/actions/fii.actions";
import { DataTable } from "@/components/DataTable";
import { createTijoloColumns } from "@/components/DataTable/tijoloColumns";
import { createPapelColumns } from "@/components/DataTable/papelColumns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { fiiTijoloColumnVisibility, fiiPapelColumnVisibility } from "@/constants";
import { fiiTijoloPresets, fiiPapelPresets } from "@/constants/fiiPresets";

type FiiTab = "tijolo" | "papel" | "fiagro" | "fi-infra" | "fof";

const TABS: { id: FiiTab; label: string }[] = [
  { id: "tijolo", label: "Tijolo" },
  { id: "papel", label: "Papel" },
  { id: "fiagro", label: "Fiagro" },
  { id: "fi-infra", label: "FI-Infra" },
  { id: "fof", label: "Fundo de Fundos" },
];

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

  const riskQuery = useQuery({
    queryKey: ["fii-risk"],
    queryFn: async () => await getFiiRisk(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const presets = ["Top Gestores"];
    presets.forEach((preset) => {
      queryClient.prefetchQuery({
        queryKey: ["fii-preset", "tijolo", preset],
        queryFn: () => getFiiPreset("tijolo", preset),
        staleTime: 24 * 60 * 60 * 1000,
      });
      queryClient.prefetchQuery({
        queryKey: ["fii-preset", "papel", preset],
        queryFn: () => getFiiPreset("papel", preset),
        staleTime: 24 * 60 * 60 * 1000,
      });
    });
  }, [queryClient]);

  const { mutateAsync: applyPreset, isPending: isPresetLoading } = useMutation({
    mutationFn: async ({ type, preset }: { type: string; preset: string }) =>
      await getFiiPreset(type, preset),
    onSuccess: (filtered, variables) => {
      const queryKey = variables.type === "papel" ? ["fii-papel"] : ["fii-tijolo"];
      queryClient.setQueryData(queryKey, filtered);
    },
  });

  const handleApplyPreset = useCallback(
    async (preset: string) => {
      await applyPreset({ type: activeTab, preset });
    },
    [applyPreset, activeTab],
  );

  const activePresets = activeTab === "papel" ? fiiPapelPresets : fiiTijoloPresets;

  const tijoloColumns = useMemo(() => createTijoloColumns(), []);
  const papelColumns = useMemo(() => createPapelColumns(), []);

  if (
    (activeTab === "tijolo" && (tijoloQuery.isLoading || isPresetLoading)) ||
    (activeTab === "papel" && (papelQuery.isLoading || isPresetLoading))
  ) return <LoadingState />;
  if (
    (activeTab === "tijolo" && tijoloQuery.isError) ||
    (activeTab === "papel" && papelQuery.isError)
  ) return <ErrorState error={new Error("Não foi possível carregar os dados")} />;

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
      default:
        return (
          <div className="min-h-[40vh] flex items-center justify-center text-muted-foreground font-mono text-sm">
            Em breve
          </div>
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
