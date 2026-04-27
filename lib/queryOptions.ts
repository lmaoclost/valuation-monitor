import { queryOptions } from "@tanstack/react-query";
import { getStocksAndComplementary, getPresetStocks } from "@/app/actions/stock.actions";

/**
 * Reusable query options for type-safe queries
 * Can be used with useQuery, useSuspenseQuery, prefetchQuery, and setQueryData
 */

// Main stocks data query options
export const stocksAndComplementaryOptions = queryOptions({
  queryKey: ["stocks-and-complementary"],
  queryFn: async () => await getStocksAndComplementary(),
  staleTime: 24 * 60 * 60 * 1000,
  gcTime: 24 * 60 * 60 * 1000,
  refetchOnWindowFocus: false,
});

// Preset stocks query options factory
export const createPresetStocksOptions = (preset: string) =>
  queryOptions({
    queryKey: ["preset-stocks", preset],
    queryFn: () => getPresetStocks(preset),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
