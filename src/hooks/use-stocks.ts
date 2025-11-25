import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimePrices } from "./use-realtime-prices";
import { useMemo } from "react";

export type StockQuote = {
  symbol: string;
  name?: string;
  price: number;
  change?: number;
  changesPercentage?: number;
};

export type TopMover = {
  symbol: string;
  name?: string;
  price?: number;
  change?: number;
  changesPercentage?: number;
  volume?: number;
};

export function useStockQuotes(symbols: string[], options?: { enabled?: boolean; realtime?: boolean }) {
  const query = useQuery({
    queryKey: ["stocks", "quotes", symbols],
    enabled: (options?.enabled ?? true) && symbols.length > 0,
    refetchInterval: 60_000,
    queryFn: async (): Promise<StockQuote[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "quotes", symbols },
      });
      if (error) throw error;
      return ((data as any[]) || [])
        .filter((q: any) => q && q.symbol)
        .map((q: any) => ({
          symbol: q.symbol,
          name: q.name ?? q.symbol,
          price: Number(q.price ?? q.priceAvg ?? q.previousClose ?? 0),
          change: Number(q.change ?? 0),
          changesPercentage: Number(q.changesPercentage ?? q.changePercent ?? 0),
        }));
    },
  });

  // Enable realtime updates if requested
  const { prices: realtimePrices } = useRealtimePrices(symbols, options?.realtime ?? false);

  // Merge realtime prices with base data
  const data = useMemo(() => {
    if (!query.data) return query.data;
    if (!options?.realtime || Object.keys(realtimePrices).length === 0) return query.data;

    return query.data.map(quote => {
      const realtimePrice = realtimePrices[quote.symbol];
      if (realtimePrice) {
        return {
          ...quote,
          price: realtimePrice.price,
          change: realtimePrice.change,
          changesPercentage: realtimePrice.changesPercentage,
        };
      }
      return quote;
    });
  }, [query.data, realtimePrices, options?.realtime]);

  return {
    ...query,
    data,
  };
}

export function useTopMovers(type: "gainers" | "losers" | "actives" = "gainers", options?: { realtime?: boolean }) {
  const query = useQuery({
    queryKey: ["stocks", "top_movers", type],
    refetchInterval: 60_000,
    queryFn: async (): Promise<TopMover[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "top_movers", type },
      });
      if (error) throw error;
      return ((data as any[]) || [])
        .filter((q: any) => q && q.symbol)
        .map((q: any) => ({
          symbol: q.symbol,
          name: q.name ?? q.companyName ?? q.symbol,
          price: Number(q.price ?? q.priceAvg ?? q.previousClose ?? 0),
          change: Number(q.change ?? 0),
          changesPercentage: Number(q.changesPercentage ?? q.changePercent ?? 0),
          volume: Number(q.volume ?? 0),
        }));
    },
  });

  // Get symbols for realtime updates
  const symbols = useMemo(() => 
    query.data?.map(m => m.symbol) ?? [], 
    [query.data]
  );

  const { prices: realtimePrices } = useRealtimePrices(symbols, options?.realtime ?? false);

  // Merge realtime prices with base data
  const data = useMemo(() => {
    if (!query.data) return query.data;
    if (!options?.realtime || Object.keys(realtimePrices).length === 0) return query.data;

    return query.data.map(mover => {
      const realtimePrice = realtimePrices[mover.symbol];
      if (realtimePrice) {
        return {
          ...mover,
          price: realtimePrice.price,
          change: realtimePrice.change,
          changesPercentage: realtimePrice.changesPercentage,
        };
      }
      return mover;
    });
  }, [query.data, realtimePrices, options?.realtime]);

  return {
    ...query,
    data,
  };
}

export function useSymbolSearch(query: string) {
  return useQuery({
    queryKey: ["stocks", "search", query],
    enabled: (query?.length ?? 0) > 1,
    queryFn: async (): Promise<{ symbol: string; name?: string; region?: string }[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "search", q: query },
      });
      if (error) throw error;
      return ((data as any[]) || [])
        .filter((r: any) => r && r.symbol)
        .map((r: any) => ({
          symbol: r.symbol,
          name: r.name ?? r.companyName ?? r.symbol,
          region: r.region,
        }));
    },
  });
}

export function useIntraday(symbol: string, interval: "1min" | "5min" | "15min" | "30min" | "1hour" = "5min") {
  return useQuery({
    queryKey: ["stocks", "intraday", symbol, interval],
    enabled: Boolean(symbol),
    refetchInterval: 60_000,
    queryFn: async (): Promise<{ time: string; close: number }[]> => {
      const { data, error } = await supabase.functions.invoke("stocks", {
        body: { action: "intraday", symbol, interval },
      });
      if (error) throw error;
      return ((data as any[]) || [])
        .filter((p: any) => p && p.time && p.close != null)
        .map((p: any) => ({ time: String(p.time), close: Number(p.close) }));
    },
  });
}
