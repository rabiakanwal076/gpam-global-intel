import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MarketItem = {
  symbol: string;
  name?: string;
  price: number;
  change?: number;
  changesPercentage?: number;
  marketCap?: number;
};

export function useCryptoQuotes(symbols?: string[], options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["market", "crypto", symbols ?? []],
    enabled: options?.enabled ?? true,
    refetchInterval: 60_000,
    queryFn: async (): Promise<MarketItem[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "crypto_quotes", symbols: symbols ?? [] },
      });
      if (error) throw error;
      const arr = Array.isArray(data) ? data : [];
      return arr.map((q: any) => ({
        symbol: q.symbol ?? q.ticker ?? q.symbol ?? "",
        name: q.name ?? q.coin ?? q.symbol ?? "",
        price: Number(q.price ?? q.ask ?? q.bid ?? 0),
        change: Number(q.change ?? 0),
        changesPercentage: Number(q.changesPercentage ?? q.changePercent ?? 0),
        marketCap: Number(q.marketCap ?? 0),
      }));
    },
  });
}

export function useCommodities(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["market", "commodities"],
    enabled: options?.enabled ?? true,
    refetchInterval: 60_000,
    queryFn: async (): Promise<MarketItem[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "commodities" },
      });
      if (error) throw error;
      const arr = Array.isArray(data) ? data : [];
      return arr.map((q: any) => ({
        symbol: q.symbol ?? q.ticker ?? "",
        name: q.name ?? q.symbol ?? "",
        price: Number(q.price ?? 0),
        change: Number(q.change ?? 0),
        changesPercentage: Number(q.changesPercentage ?? 0),
      }));
    },
  });
}

export function useForexPairs(pairs?: string[], options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["market", "forex", pairs ?? []],
    enabled: options?.enabled ?? true,
    refetchInterval: 60_000,
    queryFn: async (): Promise<MarketItem[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "forex", pairs: pairs ?? [] },
      });
      if (error) throw error;
      const arr = Array.isArray(data) ? data : [];
      return arr.map((q: any) => ({
        symbol: q.symbol ?? q.ticker ?? "",
        name: q.name ?? q.symbol ?? "",
        price: Number(q.price ?? q.bid ?? 0),
        change: Number(q.change ?? 0),
        changesPercentage: Number(q.changesPercentage ?? 0),
      }));
    },
  });
}

export function useIndices(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["market", "indices"],
    enabled: options?.enabled ?? true,
    refetchInterval: 60_000,
    queryFn: async (): Promise<MarketItem[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "indices" },
      });
      if (error) throw error;
      const arr = Array.isArray(data) ? data : [];
      return arr.map((q: any) => ({
        symbol: q.symbol ?? q.ticker ?? "",
        name: q.name ?? q.symbol ?? "",
        price: Number(q.price ?? 0),
        change: Number(q.change ?? 0),
        changesPercentage: Number(q.changesPercentage ?? 0),
        marketCap: Number(q.marketCap ?? 0),
      }));
    },
  });
}
