"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/DataTable/columns";

export function TableWrapper() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["parsed-data"],
    queryFn: async () => {
      const res = await fetch("/api/fetch-stocks");
      return res.json();
    },
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const applyPreset = async (preset: string) => {
    const response = await fetch(
      `/api/fetch-preset-stocks/filter?preset=${preset}`,
    );
    const filtered = await response.json();

    queryClient.setQueryData(["parsed-data"], filtered);
  };

  if (isLoading) return "Carregando...";

  return (
    <DataTable columns={columns} data={data} onApplyPreset={applyPreset} />
  );
}
